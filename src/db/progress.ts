/**
 * Lecture de la progression locale pour les écrans et les sessions qui en dépendent.
 */
import { useLiveQuery } from 'dexie-react-hooks'

import { db as defaultDb, type Attempt, type DscgDatabase, type Mark, type Review, type Session } from './db'

export interface ProgressData {
  attempts: Attempt[]
  reviews: Review[]
  sessions: Session[]
  marks: Mark[]
}

export async function loadProgress(database: DscgDatabase = defaultDb): Promise<ProgressData> {
  const [attempts, reviews, sessions, marks] = await Promise.all([
    database.attempts.toArray(),
    database.reviews.toArray(),
    database.sessions.toArray(),
    database.marks.toArray(),
  ])
  return { attempts, reviews, sessions, marks }
}

/** Marques d'un genre, en direct : ensemble des cibles. */
export function useMarks(kind: Mark['kind'], database: DscgDatabase = defaultDb): Set<string> | undefined {
  return useLiveQuery(async () => new Set((await database.marks.where('kind').equals(kind).toArray()).map((m) => m.target)), [kind, database])
}

/** Progression tenue à jour en direct (écran Progression, compteurs) ; `undefined` pendant le chargement. */
export function useProgress(database: DscgDatabase = defaultDb): ProgressData | undefined {
  return useLiveQuery(() => loadProgress(database), [database])
}
