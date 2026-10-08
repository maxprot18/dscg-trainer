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

export interface PredictedGrade {
  /** Note prévisionnelle sur 20. */
  grade: number
  /** Nombre d'examens retenus (trois au plus). */
  exams: number
  /** Note du dernier examen. */
  last: number
}

/** Poids des trois derniers examens, du plus récent au plus ancien. */
const PREDICTION_WEIGHTS = [3, 2, 1]

/**
 * Note prévisionnelle par UE : moyenne pondérée des trois derniers examens blancs ou sujets complets
 * terminés (le plus récent compte trois fois, le précédent deux fois).
 */
export function predictedGrades(sessions: readonly Session[]): Map<string, PredictedGrade> {
  const byUe = new Map<string, Session[]>()
  for (const s of sessions) {
    if ((s.mode !== 'exam' && s.mode !== 'full') || s.grade === undefined || s.endedAt === undefined || !s.scope) continue
    byUe.set(s.scope, [...(byUe.get(s.scope) ?? []), s])
  }
  const result = new Map<string, PredictedGrade>()
  for (const [ue, list] of byUe) {
    const recent = list.sort((a, b) => b.endedAt! - a.endedAt!).slice(0, PREDICTION_WEIGHTS.length)
    const weights = PREDICTION_WEIGHTS.slice(0, recent.length)
    const total = weights.reduce((a, b) => a + b, 0)
    const grade = recent.reduce((sum, s, i) => sum + s.grade! * weights[i], 0) / total
    result.set(ue, { grade: Math.round(grade * 10) / 10, exams: recent.length, last: recent[0].grade! })
  }
  return result
}

/** Notions des exercices ratés, avec le nombre d'échecs, les plus ratées d'abord. */
export function notionsToReview(entries: readonly { exercise: { notion: string }; result: { correct: boolean } }[]): { notion: string; failed: number; total: number }[] {
  const byNotion = new Map<string, { failed: number; total: number }>()
  for (const { exercise, result } of entries) {
    const n = byNotion.get(exercise.notion) ?? { failed: 0, total: 0 }
    n.total++
    if (!result.correct) n.failed++
    byNotion.set(exercise.notion, n)
  }
  return [...byNotion.entries()]
    .filter(([, n]) => n.failed > 0)
    .map(([notion, n]) => ({ notion, ...n }))
    .sort((a, b) => b.failed - a.failed || a.notion.localeCompare(b.notion))
}

export interface WeekActivity {
  /** Début de la semaine (lundi 0 h, heure locale). */
  start: number
  attempts: number
  correct: number
  rate: number | null
}

/** Début de la semaine (lundi) d'un instant. */
export function startOfWeek(t: number): number {
  const d = new Date(startOfDay(t))
  const shift = (d.getDay() + 6) % 7
  return startOfDay(d.getTime() - shift * DAY_MS + DAY_MS / 2 - DAY_MS / 2)
}

/** Activité des `weeks` dernières semaines (la plus ancienne d'abord, la semaine en cours en dernier). */
export function weeklyActivity(attempts: readonly Attempt[], now: number, weeks = 8): WeekActivity[] {
  const current = startOfWeek(now)
  const starts = Array.from({ length: weeks }, (_, i) => startOfDay(current - (weeks - 1 - i) * 7 * DAY_MS + DAY_MS / 2))
  const out = starts.map((start) => ({ start, attempts: 0, correct: 0, rate: null as number | null }))
  for (const a of attempts) {
    const w = startOfWeek(a.date)
    const bucket = out.find((o) => o.start === w)
    if (!bucket) continue
    bucket.attempts++
    if (a.correct) bucket.correct++
  }
  for (const o of out) o.rate = o.attempts === 0 ? null : o.correct / o.attempts
  return out
}

export interface TypeStat {
  type: string
  attempts: number
  correct: number
  rate: number
}

/** Réussite par type d'exercice (types connus seulement), du moins réussi au mieux réussi. */
export function statsByType(attempts: readonly Attempt[], typeOf: (exerciseId: string) => string | undefined): TypeStat[] {
  const map = new Map<string, { attempts: number; correct: number }>()
  for (const a of attempts) {
    const type = typeOf(a.exerciseId)
    if (!type) continue
    const s = map.get(type) ?? { attempts: 0, correct: 0 }
    s.attempts++
    if (a.correct) s.correct++
    map.set(type, s)
  }
  return [...map.entries()]
    .map(([type, s]) => ({ type, ...s, rate: s.correct / s.attempts }))
    .sort((a, b) => a.rate - b.rate || b.attempts - a.attempts)
}
