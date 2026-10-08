/**
 * Chargement du contenu (/content) dans l'app.
 * La taxonomie est embarquée ; les exercices sont chargés fichier par fichier (un fichier JS par fichier
 * JSON, mis en cache par le service worker) ; les fiches de cours, une à une à la demande.
 * Les exercices non vérifiés (verified: false) ne sont jamais servis en production (SPEC).
 */
import { useEffect, useState } from 'react'

import taxonomyJson from '@content/taxonomy.json'

import type { ExamDurations } from '@/engine/sessionConfig'

import type { Exercise, Taxonomy, UeId } from './schema'

/**
 * Taxonomie embarquée telle quelle : elle est validée par `npm run validate` et par les tests
 * (src/content/taxonomy.test.ts), ce qui évite d'embarquer Zod dans le fichier JS principal.
 */
export const taxonomy = taxonomyJson as Taxonomy

/**
 * Nombre d'exercices publiés par UE (`UE4`), thème (`UE4/ifrs`) ou notion (`notion:ias16`), calculé
 * au build (exercices vérifiés seulement) : disponible sans charger le contenu.
 */
export function exerciseCount(key: string): number {
  return __EXERCISE_COUNTS__[key] ?? 0
}

/** Durée de l'épreuve de chaque UE (examen blanc). */
export const examDurations = Object.fromEntries(
  taxonomy.ues.map((ue) => [ue.id, ue.exam.duration_minutes]),
) as unknown as ExamDurations

/**
 * Fichiers de contenu : un fichier JS par fichier JSON, chargé à la demande et mis en cache par le service
 * worker. Une page ne charge que ce dont elle a besoin (une UE pour une session ciblée, un seul fichier
 * pour la page d'un exercice grâce à l'index `virtual:exercise-index`).
 */
const contentFiles = import.meta.glob<unknown>(['/content/**/*.json', '!/content/taxonomy.json', '!/content/oral/**'], {
  import: 'default',
})
const ueDirs = Object.fromEntries(taxonomy.ues.map((ue) => [ue.id, `/content/${ue.slug}/`])) as Record<UeId, string>

let parser: Promise<typeof import('./parse')> | null = null
const fileCache = new Map<string, Promise<Exercise[]>>()

function loadFile(path: string): Promise<Exercise[]> {
  let pending = fileCache.get(path)
  if (!pending) {
    parser ??= import('./parse')
    pending = Promise.all([parser, contentFiles[path]()]).then(([{ parseExercises }, data]) =>
      parseExercises({ [path]: data }, import.meta.env.DEV),
    )
    fileCache.set(path, pending)
  }
  return pending
}

let allCache: Promise<Exercise[]> | null = null
let loaded: Exercise[] | null = null

/** Exercices servis, de toutes les UE ou des seules UE demandées (chargés une seule fois par fichier). */
export function loadExercises(ues?: readonly UeId[]): Promise<Exercise[]> {
  if (!ues) {
    allCache ??= Promise.all(Object.keys(contentFiles).map(loadFile)).then((lists) => (loaded = lists.flat()))
    return allCache
  }
  const paths = Object.keys(contentFiles).filter((path) => ues.some((ue) => path.startsWith(ueDirs[ue])))
  return Promise.all(paths.map(loadFile)).then((lists) => lists.flat())
}

type ExerciseIndex = typeof import('virtual:exercise-index').default
let indexCache: Promise<ExerciseIndex> | null = null

/** Index des exercices publiés (fichier de chaque id, sujets type d'examen) : quelques Ko, sans le contenu. */
export function loadExerciseIndex(): Promise<ExerciseIndex> {
  indexCache ??= import('virtual:exercise-index').then((m) => m.default)
  return indexCache
}

/** Un exercice par son id, en ne chargeant que le fichier qui le contient ; `null` s'il n'existe pas. */
export async function loadExercise(id: string): Promise<Exercise | null> {
  if (loaded) return loaded.find((e) => e.id === id) ?? null
  const index = await loadExerciseIndex()
  const file = index.ids[id]
  if (file === undefined) return null
  return (await loadFile(index.files[file])).find((e) => e.id === id) ?? null
}

/** Exercices servis, ou `null` pendant le premier chargement. `enabled: false` n'en charge aucun. */
export function useExercises(enabled = true): Exercise[] | null {
  const [exercises, setExercises] = useState<Exercise[] | null>(loaded)
  useEffect(() => {
    if (exercises || !enabled) return
    let alive = true
    void loadExercises().then((list) => alive && setExercises(list))
    return () => {
      alive = false
    }
  }, [exercises, enabled])
  return exercises
}

/** Exercices d'une seule UE, ou `null` pendant leur chargement. */
export function useUeExercises(ue: UeId): Exercise[] | null {
  const [state, setState] = useState<{ ue: UeId; exercises: Exercise[] } | null>(null)
  useEffect(() => {
    let alive = true
    void loadExercises([ue]).then((exercises) => alive && setState({ ue, exercises }))
    return () => {
      alive = false
    }
  }, [ue])
  return state?.ue === ue ? state.exercises : null
}

/** Index des exercices publiés, ou `null` pendant son chargement. */
export function useExerciseIndex(): ExerciseIndex | null {
  const [index, setIndex] = useState<ExerciseIndex | null>(null)
  useEffect(() => {
    let alive = true
    void loadExerciseIndex().then((value) => alive && setIndex(value))
    return () => {
      alive = false
    }
  }, [])
  return index
}

/** Un exercice : `undefined` pendant le chargement, `null` s'il n'existe pas. */
export function useExercise(id: string): Exercise | null | undefined {
  const [state, setState] = useState<{ id: string; exercise: Exercise | null } | null>(null)
  useEffect(() => {
    let alive = true
    void loadExercise(id).then((exercise) => alive && setState({ id, exercise }))
    return () => {
      alive = false
    }
  }, [id])
  return state?.id === id ? state.exercise : undefined
}

const courseFiles = import.meta.glob<string>('/content/courses/*.md', { query: '?raw', import: 'default' })
const coursePath = (notionId: string) => `/content/courses/${notionId}.md`

export function hasCourse(notionId: string): boolean {
  return coursePath(notionId) in courseFiles
}

/** Date de dernière révision d'une fiche (AAAA-MM-JJ), ou `undefined` si elle n'est pas connue. */
export function courseReviewDate(notionId: string): string | undefined {
  return __COURSE_DATES__[notionId]
}

/** Fiche de cours (Markdown) d'une notion, ou `null` si elle n'existe pas encore. */
export async function loadCourse(notionId: string): Promise<string | null> {
  const load = courseFiles[coursePath(notionId)]
  return load ? load() : null
}

/** Toutes les fiches de cours (recherche plein texte), chargées en une fois à la demande. */
export async function loadAllCourses(): Promise<{ id: string; text: string }[]> {
  return Promise.all(
    Object.entries(courseFiles).map(async ([path, load]) => ({
      id: path.slice('/content/courses/'.length, -'.md'.length),
      text: await load(),
    })),
  )
}
