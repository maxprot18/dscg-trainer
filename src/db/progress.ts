/**
 * Lecture de la progression locale pour les écrans et les sessions qui en dépendent.
 */
import { useLiveQuery } from 'dexie-react-hooks'

import { db as defaultDb, type Attempt, type DscgDatabase, type Review, type Session } from './db'

export interface ProgressData {
  attempts: Attempt[]
  reviews: Review[]
  sessions: Session[]
}

export async function loadProgress(database: DscgDatabase = defaultDb): Promise<ProgressData> {
  const [attempts, reviews, sessions] = await Promise.all([
    database.attempts.toArray(),
    database.reviews.toArray(),
    database.sessions.toArray(),
  ])
  return { attempts, reviews, sessions }
}

/** Progression tenue à jour en direct (écran Progression, compteurs) ; `undefined` pendant le chargement. */
export function useProgress(database: DscgDatabase = defaultDb): ProgressData | undefined {
  return useLiveQuery(() => loadProgress(database), [database])
}
