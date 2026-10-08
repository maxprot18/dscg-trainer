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

export type SessionMode = 'quick' | 'theme' | 'smart' | 'exam' | 'full' | 'errors' | 'cards' | 'diagnostic'

export interface Session {
  id?: number
  mode: SessionMode
  startedAt: number
  endedAt?: number
  scope?: string
  exerciseIds: string[]
  /** Paramètres d'URL de la session (`mode=exam&seed=…&ue=…`), pour reprendre un examen interrompu. */
  search?: string
  /** Note sur 20 d'un examen blanc ou d'un sujet complet terminé (note prévisionnelle). */
  grade?: number
}

export type MarkKind = 'bookmark' | 'read'

/** Marque posée par l'utilisateur : exercice ou fiche « à revoir plus tard », fiche lue. */
export interface Mark {
  id?: number
  kind: MarkKind
  /** Id d'exercice (marque-page) ou de notion (fiche lue ou marque-page de fiche, préfixé `notion:`). */
  target: string
  date: number
}

export class DscgDatabase extends Dexie {
  attempts!: EntityTable<Attempt, 'id'>
  reviews!: EntityTable<Review, 'notion'>
  sessions!: EntityTable<Session, 'id'>
  marks!: EntityTable<Mark, 'id'>

  constructor(name = 'dscg-trainer') {
    super(name)
    this.version(1).stores({
      attempts: '++id, exerciseId, notion, date, correct, sessionId',
      reviews: 'notion, due',
      sessions: '++id, mode, startedAt',
    })
    // v2 (phase 7) : marque-pages et fiches lues ; `search` sur les sessions (pas d'index).
    this.version(2).stores({
      attempts: '++id, exerciseId, notion, date, correct, sessionId',
      reviews: 'notion, due',
      sessions: '++id, mode, startedAt',
      marks: '++id, kind, target, [kind+target]',
    })
  }
}

export const db = new DscgDatabase()

export interface ProgressExport {
  app: 'dscg-trainer'
  /** 1 : trois tables (phases 0 à 6) ; 2 : avec les marques. */
  version: 1 | 2
  exportedAt: string
  attempts: Attempt[]
  reviews: Review[]
  sessions: Session[]
  marks?: Mark[]
}

export async function exportProgress(database: DscgDatabase = db): Promise<ProgressExport> {
  const [attempts, reviews, sessions, marks] = await Promise.all([
    database.attempts.toArray(),
    database.reviews.toArray(),
    database.sessions.toArray(),
    database.marks.toArray(),
  ])
  return { app: 'dscg-trainer', version: 2, exportedAt: new Date().toISOString(), attempts, reviews, sessions, marks }
}

/** Remplace toute la progression locale par le contenu d'un export (versions 1 et 2). */
export async function importProgress(data: ProgressExport, database: DscgDatabase = db): Promise<void> {
  if (data.app !== 'dscg-trainer' || (data.version !== 1 && data.version !== 2)) {
    throw new Error('Fichier de progression non reconnu')
  }
  await database.transaction('rw', database.attempts, database.reviews, database.sessions, database.marks, async () => {
    await clearProgress(database)
    await database.attempts.bulkAdd(data.attempts)
    await database.reviews.bulkAdd(data.reviews)
    await database.sessions.bulkAdd(data.sessions)
    if (data.marks) await database.marks.bulkAdd(data.marks)
  })
}

/** Efface toute la progression locale (remise à zéro). */
export async function clearProgress(database: DscgDatabase = db): Promise<void> {
  await Promise.all([database.attempts.clear(), database.reviews.clear(), database.sessions.clear(), database.marks.clear()])
}

/** Pose ou retire une marque ; renvoie l'état final. */
export async function toggleMark(kind: MarkKind, target: string, database: DscgDatabase = db): Promise<boolean> {
  const existing = await database.marks.where('[kind+target]').equals([kind, target]).first()
  if (existing) {
    await database.marks.delete(existing.id!)
    return false
  }
  await database.marks.add({ kind, target, date: Date.now() })
  return true
}

/** Pose une marque si elle n'existe pas encore (fiche lue). */
export async function setMark(kind: MarkKind, target: string, database: DscgDatabase = db): Promise<void> {
  const existing = await database.marks.where('[kind+target]').equals([kind, target]).first()
  if (!existing) await database.marks.add({ kind, target, date: Date.now() })
}
