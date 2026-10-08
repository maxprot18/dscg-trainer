/**
 * Enregistrement des sessions et des tentatives dans IndexedDB. Chaque tentative met aussi à
 * jour l'état de répétition espacée (SM-2) de la notion de l'exercice.
 */
import type { Exercise } from '@/content/schema'
import { db as defaultDb, type Attempt, type DscgDatabase, type SessionMode } from '@/db/db'

import type { ExerciseResult, PartResponse } from './grading'
import { reviewAfterAttempt, sameDay } from './srs'

export async function startSession(
  mode: SessionMode,
  exercises: readonly Exercise[],
  scope?: string,
  database: DscgDatabase = defaultDb,
  now = Date.now(),
  search?: string,
): Promise<number> {
  const id = await database.sessions.add({ mode, scope, startedAt: now, exerciseIds: exercises.map((e) => e.id), search })
  return id as number
}

/** Délai au-delà duquel un examen interrompu n'est plus proposé à la reprise. */
export const RESUME_WINDOW_MS = 24 * 60 * 60 * 1000

export interface ResumableSession {
  sessionId: number
  startedAt: number
  attempts: Attempt[]
}

/**
 * Examen blanc ou sujet complet interrompu pour les mêmes paramètres d'URL (même sujet) : session non terminée,
 * commencée depuis moins de 24 h, dont la série d'exercices est identique.
 */
export async function findResumableSession(
  search: string,
  exerciseIds: readonly string[],
  database: DscgDatabase = defaultDb,
  now = Date.now(),
): Promise<ResumableSession | null> {
  const candidates = await database.sessions
    .where('mode')
    .anyOf('exam', 'full')
    .filter((s) => s.search === search && s.endedAt === undefined && now - s.startedAt < RESUME_WINDOW_MS)
    .toArray()
  const session = candidates.sort((a, b) => b.startedAt - a.startedAt)[0]
  if (!session || session.id === undefined) return null
  if (session.exerciseIds.length !== exerciseIds.length || session.exerciseIds.some((id, i) => id !== exerciseIds[i])) return null
  const attempts = await database.attempts.where('sessionId').equals(session.id).sortBy('date')
  return { sessionId: session.id, startedAt: session.startedAt, attempts }
}

export async function recordAttempt(
  exercise: Exercise,
  responses: readonly PartResponse[],
  result: ExerciseResult,
  durationMs: number,
  sessionId?: number,
  database: DscgDatabase = defaultDb,
  now = Date.now(),
): Promise<number> {
  return database.transaction('rw', database.attempts, database.reviews, async () => {
    const id = await database.attempts.add({
      exerciseId: exercise.id,
      notion: exercise.notion,
      date: now,
      answer: responses,
      correct: result.correct,
      score: result.score,
      durationMs: Math.round(durationMs),
      sessionId,
    })
    // La revue du jour porte sur toutes les tentatives du jour sur la notion.
    const today = await database.attempts
      .where('notion')
      .equals(exercise.notion)
      .filter((a) => sameDay(a.date, now))
      .toArray()
    const previous = await database.reviews.get(exercise.notion)
    await database.reviews.put(
      reviewAfterAttempt(
        previous,
        exercise.notion,
        today.map((a) => a.score ?? (a.correct ? 1 : 0)),
        now,
      ),
    )
    return id as number
  })
}

/** Clôt une session ; `grade` : note sur 20 d'un examen blanc ou d'un sujet complet. */
export async function endSession(
  sessionId: number,
  database: DscgDatabase = defaultDb,
  now = Date.now(),
  grade?: number,
): Promise<void> {
  await database.sessions.update(sessionId, grade === undefined ? { endedAt: now } : { endedAt: now, grade })
}
