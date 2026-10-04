/**
 * Enregistrement des sessions et des tentatives dans IndexedDB.
 */
import type { Exercise } from '@/content/schema'
import { db as defaultDb, type DscgDatabase, type SessionMode } from '@/db/db'

import type { ExerciseResult, PartResponse } from './grading'

export async function startSession(
  mode: SessionMode,
  exercises: readonly Exercise[],
  scope?: string,
  database: DscgDatabase = defaultDb,
): Promise<number> {
  const id = await database.sessions.add({ mode, scope, startedAt: Date.now(), exerciseIds: exercises.map((e) => e.id) })
  return id as number
}

export async function recordAttempt(
  exercise: Exercise,
  responses: readonly PartResponse[],
  result: ExerciseResult,
  durationMs: number,
  sessionId?: number,
  database: DscgDatabase = defaultDb,
): Promise<number> {
  const id = await database.attempts.add({
    exerciseId: exercise.id,
    notion: exercise.notion,
    date: Date.now(),
    answer: responses,
    correct: result.correct,
    score: result.score,
    durationMs: Math.round(durationMs),
    sessionId,
  })
  return id as number
}

export async function endSession(sessionId: number, database: DscgDatabase = defaultDb): Promise<void> {
  await database.sessions.update(sessionId, { endedAt: Date.now() })
}
