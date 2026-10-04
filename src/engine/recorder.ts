/**
 * Enregistrement des sessions et des tentatives dans IndexedDB. Chaque tentative met aussi à
 * jour l'état de répétition espacée (SM-2) de la notion de l'exercice.
 */
import type { Exercise } from '@/content/schema'
import { db as defaultDb, type DscgDatabase, type SessionMode } from '@/db/db'

import type { ExerciseResult, PartResponse } from './grading'
import { applyReview, qualityFromScore } from './srs'

export async function startSession(
  mode: SessionMode,
  exercises: readonly Exercise[],
  scope?: string,
  database: DscgDatabase = defaultDb,
  now = Date.now(),
): Promise<number> {
  const id = await database.sessions.add({ mode, scope, startedAt: now, exerciseIds: exercises.map((e) => e.id) })
  return id as number
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
    const previous = await database.reviews.get(exercise.notion)
    await database.reviews.put(
      applyReview(previous, exercise.notion, qualityFromScore(result.score, result.correct), now),
    )
    return id as number
  })
}

export async function endSession(sessionId: number, database: DscgDatabase = defaultDb, now = Date.now()): Promise<void> {
  await database.sessions.update(sessionId, { endedAt: now })
}
