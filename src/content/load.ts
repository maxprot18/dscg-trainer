/**
 * Chargement du contenu (/content) dans l'app.
 * La taxonomie est embarquée ; les exercices sont chargés UE par UE (un fichier JS par UE,
 * mis en cache par le service worker) ; les fiches de cours, une à une à la demande.
 * Les exercices non vérifiés (verified: false) ne sont jamais servis en production (SPEC).
 */
import { useEffect, useState } from 'react'

import taxonomyJson from '@content/taxonomy.json'

import type { ExamDurations } from '@/engine/sessionConfig'

import { contentFileSchema, taxonomySchema, type Exercise, type Taxonomy, type UeId } from './schema'

export const taxonomy: Taxonomy = taxonomySchema.parse(taxonomyJson)

/** Durée de l'épreuve de chaque UE (examen blanc). */
export const examDurations = Object.fromEntries(
  taxonomy.ues.map((ue) => [ue.id, ue.exam.duration_minutes]),
) as unknown as ExamDurations

type Modules = Record<string, unknown>

const bundles: Record<UeId, () => Promise<{ default: Modules }>> = {
  UE1: () => import('./bundles/ue1'),
  UE2: () => import('./bundles/ue2'),
  UE3: () => import('./bundles/ue3'),
  UE4: () => import('./bundles/ue4'),
  UE5: () => import('./bundles/ue5'),
  UE6: () => import('./bundles/ue6'),
}

export function parseExercises(modules: Modules, includeUnverified: boolean): Exercise[] {
  return Object.entries(modules)
    .flatMap(([path, data]) => {
      const parsed = contentFileSchema.safeParse(data)
      if (!parsed.success) {
        console.error(`Contenu invalide ignoré : ${path}`, parsed.error.issues)
        return []
      }
      return parsed.data.exercises
    })
    .filter((ex) => includeUnverified || ex.verified)
}

let cache: Promise<Exercise[]> | null = null
let loaded: Exercise[] | null = null

/** Tous les exercices servis (chargés une seule fois). */
export function loadExercises(): Promise<Exercise[]> {
  cache ??= Promise.all(Object.values(bundles).map((load) => load())).then((mods) => {
    loaded = mods.flatMap((m) => parseExercises(m.default, import.meta.env.DEV))
    return loaded
  })
  return cache
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

const courseFiles = import.meta.glob<string>('/content/courses/*.md', { query: '?raw', import: 'default' })
const coursePath = (notionId: string) => `/content/courses/${notionId}.md`

export function hasCourse(notionId: string): boolean {
  return coursePath(notionId) in courseFiles
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
