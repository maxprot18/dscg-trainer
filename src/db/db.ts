/**
 * Progression locale (IndexedDB via Dexie) : tentatives, état de répétition espacée, sessions.
 */
import Dexie, { type EntityTable } from 'dexie'

export interface Attempt {
  id?: number
  exerciseId: string
  notion: string
  date: number
  answer: unknown
  correct: boolean
  /** Score entre 0 et 1 pour les exercices à barème (cas pratiques). */
  score?: number
  durationMs: number
  sessionId?: number
}

/** État de répétition espacée (SM-2) par notion. */
export interface ReviewState {
  notion: string
  due: number
  interval: number
  ease: number
  repetitions: number
  lapses: number
  lastReview?: number
}

export interface Review extends ReviewState {
  /** État au début du jour de la dernière revue : la revue du jour est recalculée à chaque tentative. */
  prior?: ReviewState
}

export type SessionMode = 'quick' | 'theme' | 'smart' | 'exam' | 'errors'

export interface Session {
  id?: number
  mode: SessionMode
  startedAt: number
  endedAt?: number
  scope?: string
  exerciseIds: string[]
}

export class DscgDatabase extends Dexie {
  attempts!: EntityTable<Attempt, 'id'>
  reviews!: EntityTable<Review, 'notion'>
  sessions!: EntityTable<Session, 'id'>

  constructor(name = 'dscg-trainer') {
    super(name)
    this.version(1).stores({
      attempts: '++id, exerciseId, notion, date, correct, sessionId',
      reviews: 'notion, due',
      sessions: '++id, mode, startedAt',
    })
  }
}

export const db = new DscgDatabase()

export interface ProgressExport {
  app: 'dscg-trainer'
  version: 1
  exportedAt: string
  attempts: Attempt[]
  reviews: Review[]
  sessions: Session[]
}

export async function exportProgress(database: DscgDatabase = db): Promise<ProgressExport> {
  const [attempts, reviews, sessions] = await Promise.all([
    database.attempts.toArray(),
    database.reviews.toArray(),
    database.sessions.toArray(),
  ])
  return { app: 'dscg-trainer', version: 1, exportedAt: new Date().toISOString(), attempts, reviews, sessions }
}

/** Remplace toute la progression locale par le contenu d'un export. */
export async function importProgress(data: ProgressExport, database: DscgDatabase = db): Promise<void> {
  if (data.app !== 'dscg-trainer' || data.version !== 1) throw new Error('Fichier de progression non reconnu')
  await database.transaction('rw', database.attempts, database.reviews, database.sessions, async () => {
    await Promise.all([database.attempts.clear(), database.reviews.clear(), database.sessions.clear()])
    await database.attempts.bulkAdd(data.attempts)
    await database.reviews.bulkAdd(data.reviews)
    await database.sessions.bulkAdd(data.sessions)
  })
}
