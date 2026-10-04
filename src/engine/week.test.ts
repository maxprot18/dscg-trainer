/**
 * Critère de fin de la phase 4 : une semaine d'usage simulée, sur le vrai contenu de l'UE 2.
 *
 * Chaque soir, un étudiant fictif fait une révision intelligente ; le 3e jour il rejoue ses
 * erreurs, le 6e il passe un examen blanc. Sa probabilité de réussir une notion augmente avec la
 * pratique. On vérifie la répétition espacée, le mode erreurs, l'examen, les statistiques et
 * l'export / import de la progression.
 */
import taxonomyJson from '@content/taxonomy.json'

import { parseExercises } from '@/content/load'
import { taxonomySchema, type Exercise } from '@/content/schema'
import { DscgDatabase, exportProgress, importProgress } from '@/db/db'
import { loadProgress } from '@/db/progress'

import type { ExerciseResult } from './grading'
import { endSession, recordAttempt, startSession } from './recorder'
import {
  buildErrorSession,
  buildExamSession,
  buildSmartSession,
  examGrade,
  seededRandom,
  SMART_PER_NOTION,
  SMART_SESSION_SIZE,
} from './session'
import { DAY_MS } from './srs'
import { activeDays, currentStreak, failedExerciseIds, programProgress, sessionHistory } from './stats'

const pool: Exercise[] = parseExercises(import.meta.glob('/content/ue2-finance/**/*.json', { eager: true, import: 'default' }), false)
const taxonomy = taxonomySchema.parse(taxonomyJson)
/** Lundi 5 octobre 2026, 19 h (heure locale). */
const MONDAY = new Date(2026, 9, 5, 19, 0).getTime()

/** Étudiant fictif : niveau de départ propre à chaque notion, qui progresse à chaque tentative. */
function makeStudent(seed: number) {
  const random = seededRandom(seed)
  const skill = new Map<string, number>()
  return (exercise: Exercise): ExerciseResult => {
    const level = skill.get(exercise.notion) ?? 0.35 + random() * 0.3
    const correct = random() < level
    skill.set(exercise.notion, Math.min(0.95, level + 0.08))
    const score = correct ? 1 : 0
    return { score, correct, parts: [], earned: score, total: 1 }
  }
}

async function play(
  database: DscgDatabase,
  mode: 'smart' | 'errors' | 'exam',
  exercises: Exercise[],
  answer: (e: Exercise) => ExerciseResult,
  start: number,
  scope?: string,
) {
  const sessionId = await startSession(mode, exercises, scope, database, start)
  const scores = new Map<string, number>()
  let t = start
  for (const exercise of exercises) {
    const result = answer(exercise)
    t += exercise.estimated_seconds * 1000
    await recordAttempt(exercise, [], result, exercise.estimated_seconds * 1000, sessionId, database, t)
    scores.set(exercise.id, result.score)
  }
  await endSession(sessionId, database, t)
  return scores
}

describe('une semaine d’usage simulée', () => {
  it('répétition espacée, erreurs, examen blanc, statistiques et sauvegarde sur 7 jours', async () => {
    expect(pool.length).toBeGreaterThan(200)
    const database = new DscgDatabase('test-week')
    const answer = makeStudent(2026)
    const coverage: number[] = []
    let examScore = 0

    for (let day = 0; day < 7; day++) {
      const evening = MONDAY + day * DAY_MS
      const before = await loadProgress(database)
      const session = buildSmartSession(pool, before, evening, 100 + day)

      // La révision du soir : 20 exercices, 3 au plus par notion, qui reprennent d'abord les
      // notions échues (les plus en retard en premier).
      expect(session).toHaveLength(SMART_SESSION_SIZE)
      const notions = new Set(session.map((e) => e.notion))
      for (const n of notions) expect(session.filter((e) => e.notion === n).length).toBeLessThanOrEqual(SMART_PER_NOTION)
      const due = before.reviews
        .filter((r) => r.due <= evening)
        .sort((a, b) => a.due - b.due || a.ease - b.ease || a.notion.localeCompare(b.notion))
      const capacity = Math.floor(SMART_SESSION_SIZE / SMART_PER_NOTION)
      for (const r of due.slice(0, capacity)) expect(notions).toContain(r.notion)
      if (day >= 1) expect(due.length).toBeGreaterThan(0)
      // Une notion dont la révision n'est pas échue n'est reprise que s'il reste de la place.
      if (due.length >= capacity + 1) {
        for (const r of before.reviews.filter((x) => x.due > evening)) expect(notions).not.toContain(r.notion)
      }

      await play(database, 'smart', session, answer, evening)

      if (day === 2) {
        // Mode erreurs : uniquement les exercices dont la dernière tentative est ratée.
        const { attempts } = await loadProgress(database)
        const failed = new Set(failedExerciseIds(attempts))
        const errors = buildErrorSession(pool, attempts, 7)
        expect(errors.length).toBeGreaterThan(0)
        for (const e of errors) expect(failed.has(e.id)).toBe(true)
        await play(database, 'errors', errors, answer, evening + 2 * 60 * 60 * 1000)
      }

      if (day === 5) {
        // Examen blanc de l'UE 2 : 3 heures de sujet, note sur 20.
        const exam = buildExamSession(pool, 'UE2', 180, 9)
        const planned = exam.reduce((s, e) => s + e.estimated_seconds, 0)
        expect(planned).toBeLessThanOrEqual(180 * 60)
        expect(planned).toBeGreaterThan(180 * 60 * 0.9)
        const scores = await play(database, 'exam', exam, answer, evening + 60 * 60 * 1000, 'UE2')
        examScore = examGrade(exam, scores)
        expect(examScore).toBeGreaterThan(0)
        expect(examScore).toBeLessThan(20)
      }

      const ues = programProgress(taxonomy, (await loadProgress(database)).attempts)
      coverage.push(ues.find((u) => u.id === 'UE2')!.covered)
    }

    const end = MONDAY + 6 * DAY_MS + 23 * 60 * 60 * 1000
    const progress = await loadProgress(database)

    // Une session par soir, plus le mode erreurs et l'examen blanc.
    const history = sessionHistory(progress.sessions, progress.attempts)
    expect(history).toHaveLength(9)
    expect(history.filter((s) => s.mode === 'smart')).toHaveLength(7)
    expect(history.find((s) => s.mode === 'exam')).toMatchObject({ scope: 'UE2' })
    expect(history.every((s) => s.answered === s.planned && s.endedAt !== undefined)).toBe(true)

    // Série et régularité.
    expect(currentStreak(progress.attempts, end)).toBe(7)
    expect(activeDays(progress.attempts)).toBe(7)

    // De nouvelles notions sont abordées au fil de la semaine.
    for (let d = 1; d < 7; d++) expect(coverage[d]).toBeGreaterThanOrEqual(coverage[d - 1])
    expect(coverage[6]).toBeGreaterThan(coverage[0])

    // Répétition espacée : chaque notion travaillée a un état ; les notions revues avec succès deux
    // jours de suite sont programmées à 6 jours, les notions ratées le dernier soir reviennent le lendemain.
    const reviewed = new Set(progress.attempts.map((a) => a.notion))
    expect(progress.reviews.map((r) => r.notion).sort()).toEqual([...reviewed].sort())
    expect(progress.reviews.some((r) => r.interval >= 6)).toBe(true)
    for (const r of progress.reviews) {
      expect(r.due).toBeGreaterThan(r.lastReview!)
      if (r.repetitions === 0) expect(r.interval).toBe(1)
    }

    // Statistiques : des notions maîtrisées, d'autres à revoir.
    const ue2 = programProgress(taxonomy, progress.attempts, progress.reviews).find((u) => u.id === 'UE2')!
    expect(ue2.counts.mastered + ue2.counts.progress + ue2.counts.review).toBe(ue2.covered)
    expect(ue2.counts.mastered).toBeGreaterThan(0)
    expect(ue2.rate).toBeGreaterThan(0.3)

    // Sauvegarde : l'export réimporté sur un autre appareil redonne exactement la même progression.
    const exported = JSON.parse(JSON.stringify(await exportProgress(database)))
    const other = new DscgDatabase('test-week-import')
    await importProgress(exported, other)
    const restored = await loadProgress(other)
    expect(restored.attempts).toHaveLength(progress.attempts.length)
    expect(restored.reviews).toEqual(progress.reviews)
    expect(programProgress(taxonomy, restored.attempts, restored.reviews)).toEqual(
      programProgress(taxonomy, progress.attempts, progress.reviews),
    )
    expect(currentStreak(restored.attempts, end)).toBe(7)
  }, 60_000)
})
