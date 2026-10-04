/**
 * Statistiques de progression calculées à partir des tentatives (fonctions pures).
 *
 * Le taux de réussite d'une notion porte sur ses 10 dernières tentatives, pour refléter le niveau
 * actuel plutôt que l'historique. Une notion est « maîtrisée » à 80 % de réussite récente et au
 * moins 3 tentatives, « à revoir » sous 50 %, « en cours » entre les deux.
 */
import type { Taxonomy, UeId } from '@/content/schema'
import type { Attempt, Review, Session, SessionMode } from '@/db/db'

import { DAY_MS, startOfDay } from './srs'

export type Mastery = 'new' | 'review' | 'progress' | 'mastered'

export const MASTERY_LABELS: Record<Mastery, string> = {
  new: 'Non travaillé',
  review: 'À revoir',
  progress: 'En cours',
  mastered: 'Maîtrisé',
}

export const RECENT_WINDOW = 10
export const MASTERED_RATE = 0.8
export const REVIEW_RATE = 0.5
export const MASTERED_MIN_ATTEMPTS = 3

export interface NotionProgress {
  notion: string
  /** Nombre total de tentatives. */
  attempts: number
  /** Tentatives récentes prises en compte dans le taux, et réussites parmi elles. */
  recent: number
  recentCorrect: number
  /** Taux de réussite récent, `null` sans tentative. */
  rate: number | null
  mastery: Mastery
  lastDate?: number
  /** Prochaine révision prévue (répétition espacée). */
  due?: number
}

export interface GroupProgress {
  attempts: number
  rate: number | null
  /** Notions travaillées / notions du groupe. */
  covered: number
  total: number
  counts: Record<Mastery, number>
}

export interface ThemeProgress extends GroupProgress {
  id: string
  title: string
  notions: (NotionProgress & { title: string })[]
}

export interface UeProgress extends GroupProgress {
  id: UeId
  title: string
  themes: ThemeProgress[]
}

export function masteryOf(attempts: number, rate: number | null): Mastery {
  if (attempts === 0 || rate === null) return 'new'
  if (rate < REVIEW_RATE) return 'review'
  if (rate >= MASTERED_RATE && attempts >= MASTERED_MIN_ATTEMPTS) return 'mastered'
  return 'progress'
}

export function emptyNotion(notion: string, due?: number): NotionProgress {
  return { notion, attempts: 0, recent: 0, recentCorrect: 0, rate: null, mastery: 'new', due }
}

/** Progression de chaque notion travaillée. */
export function notionProgress(attempts: readonly Attempt[], reviews: readonly Review[] = []): Map<string, NotionProgress> {
  const byNotion = new Map<string, Attempt[]>()
  for (const a of attempts) {
    const list = byNotion.get(a.notion)
    if (list) list.push(a)
    else byNotion.set(a.notion, [a])
  }
  const due = new Map(reviews.map((r) => [r.notion, r.due]))
  const out = new Map<string, NotionProgress>()
  for (const [notion, list] of byNotion) {
    list.sort((a, b) => a.date - b.date)
    const recent = list.slice(-RECENT_WINDOW)
    const recentCorrect = recent.filter((a) => a.correct).length
    const rate = recentCorrect / recent.length
    out.set(notion, {
      notion,
      attempts: list.length,
      recent: recent.length,
      recentCorrect,
      rate,
      mastery: masteryOf(list.length, rate),
      lastDate: list[list.length - 1].date,
      due: due.get(notion),
    })
  }
  for (const [notion, d] of due) if (!out.has(notion)) out.set(notion, emptyNotion(notion, d))
  return out
}

function aggregate(notions: readonly NotionProgress[]): GroupProgress {
  const counts: Record<Mastery, number> = { new: 0, review: 0, progress: 0, mastered: 0 }
  let attempts = 0
  let recent = 0
  let recentCorrect = 0
  for (const n of notions) {
    counts[n.mastery]++
    attempts += n.attempts
    recent += n.recent
    recentCorrect += n.recentCorrect
  }
  return {
    attempts,
    rate: recent === 0 ? null : recentCorrect / recent,
    covered: notions.filter((n) => n.attempts > 0).length,
    total: notions.length,
    counts,
  }
}

/** Progression de tout le programme, UE par UE et thème par thème (notions non travaillées comprises). */
export function programProgress(
  taxonomy: Taxonomy,
  attempts: readonly Attempt[],
  reviews: readonly Review[] = [],
): UeProgress[] {
  const byNotion = notionProgress(attempts, reviews)
  return taxonomy.ues.map((ue) => {
    const themes = ue.themes.map((t) => {
      const notions = t.notions.map((n) => ({ ...(byNotion.get(n.id) ?? emptyNotion(n.id)), title: n.title }))
      return { id: t.id, title: t.title, notions, ...aggregate(notions) }
    })
    return { id: ue.id, title: ue.title, themes, ...aggregate(themes.flatMap((t) => t.notions)) }
  })
}

/** Jours consécutifs avec au moins une tentative, jusqu'à aujourd'hui (ou hier si rien aujourd'hui). */
export function currentStreak(attempts: readonly Attempt[], now: number): number {
  const days = new Set(attempts.map((a) => startOfDay(a.date)))
  let day = startOfDay(now)
  if (!days.has(day)) day = startOfDay(day - DAY_MS / 2)
  let streak = 0
  while (days.has(day)) {
    streak++
    // Reculer d'un jour en restant robuste aux changements d'heure (journées de 23 h ou 25 h).
    day = startOfDay(day - DAY_MS / 2)
  }
  return streak
}

export function activeDays(attempts: readonly Attempt[]): number {
  return new Set(attempts.map((a) => startOfDay(a.date))).size
}

export function totalTimeMs(attempts: readonly Attempt[]): number {
  return attempts.reduce((s, a) => s + a.durationMs, 0)
}

/** Exercices dont la dernière tentative est un échec (mode « erreurs »), du plus récent au plus ancien. */
export function failedExerciseIds(attempts: readonly Attempt[]): string[] {
  const last = new Map<string, Attempt>()
  for (const a of [...attempts].sort((x, y) => x.date - y.date)) last.set(a.exerciseId, a)
  return [...last.values()]
    .filter((a) => !a.correct)
    .sort((a, b) => b.date - a.date)
    .map((a) => a.exerciseId)
}

export interface SessionRecap {
  id: number
  mode: SessionMode
  scope?: string
  startedAt: number
  endedAt?: number
  planned: number
  answered: number
  correct: number
  durationMs: number
}

/** Historique des sessions, de la plus récente à la plus ancienne. */
export function sessionHistory(sessions: readonly Session[], attempts: readonly Attempt[]): SessionRecap[] {
  const bySession = new Map<number, Attempt[]>()
  for (const a of attempts) {
    if (a.sessionId === undefined) continue
    const list = bySession.get(a.sessionId)
    if (list) list.push(a)
    else bySession.set(a.sessionId, [a])
  }
  return sessions
    .filter((s): s is Session & { id: number } => s.id !== undefined)
    .map((s) => {
      const list = bySession.get(s.id) ?? []
      return {
        id: s.id,
        mode: s.mode,
        scope: s.scope,
        startedAt: s.startedAt,
        endedAt: s.endedAt,
        planned: s.exerciseIds.length,
        answered: list.length,
        correct: list.filter((a) => a.correct).length,
        durationMs: totalTimeMs(list),
      }
    })
    .sort((a, b) => b.startedAt - a.startedAt)
}
