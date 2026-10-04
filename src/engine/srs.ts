/**
 * Répétition espacée par notion, algorithme SM-2 (SuperMemo 2, P. Woźniak, 1987).
 *
 * Une notion est revue au plus une fois par jour : la qualité de la revue (0 à 5) est tirée de la
 * note moyenne des tentatives du jour sur la notion, et l'état est recalculé à chaque tentative à
 * partir de l'état du début de journée. Revue réussie (moyenne ≥ 70 %, qualité ≥ 3) : l'intervalle
 * s'allonge (1 jour, 6 jours, puis intervalle × facilité). Revue ratée : la notion repart à 1 jour.
 * L'échéance est le début du jour prévu, pour qu'une notion revue un soir soit proposée dès le
 * matin du jour de révision.
 */
import type { Review, ReviewState } from '@/db/db'

export const DAY_MS = 24 * 60 * 60 * 1000
export const INITIAL_EASE = 2.5
export const MIN_EASE = 1.3
/** Qualité minimale d'une revue réussie. */
export const PASS_QUALITY = 3
/** Note moyenne du jour à partir de laquelle la revue de la notion est réussie. */
export const PASS_SCORE = 0.7

/** Qualité SM-2 (0 à 5) d'une note entre 0 et 1. Le seuil de 3 correspond à la réussite (70 %). */
export function qualityFromScore(score: number, correct: boolean): number {
  if (correct) return score >= 0.95 ? 5 : score >= 0.85 ? 4 : 3
  if (score >= 0.4) return 2
  return score > 0 ? 1 : 0
}

/** Début du jour local d'un instant. */
export function startOfDay(t: number): number {
  const d = new Date(t)
  d.setHours(0, 0, 0, 0)
  return d.getTime()
}

export function sameDay(a: number, b: number): boolean {
  return startOfDay(a) === startOfDay(b)
}

/** Début du jour situé `days` jours après `now` (robuste aux changements d'heure). */
export function dueDate(now: number, days: number): number {
  return startOfDay(startOfDay(now) + days * DAY_MS + DAY_MS / 2)
}

/** Une étape SM-2 : nouvel état après une revue de qualité `quality` à l'instant `now`. */
export function applySm2(previous: ReviewState | undefined, notion: string, quality: number, now: number): ReviewState {
  const prev = previous ?? { notion, due: now, interval: 0, ease: INITIAL_EASE, repetitions: 0, lapses: 0 }
  const q = Math.max(0, Math.min(5, Math.round(quality)))
  if (q < PASS_QUALITY) {
    return {
      notion,
      due: dueDate(now, 1),
      interval: 1,
      ease: nextEase(prev.ease, q),
      repetitions: 0,
      lapses: prev.lapses + (prev.repetitions > 0 ? 1 : 0),
      lastReview: now,
    }
  }
  const repetitions = prev.repetitions + 1
  const interval = repetitions === 1 ? 1 : repetitions === 2 ? 6 : Math.round(prev.interval * prev.ease)
  return {
    notion,
    due: dueDate(now, interval),
    interval,
    ease: nextEase(prev.ease, q),
    repetitions,
    lapses: prev.lapses,
    lastReview: now,
  }
}

function nextEase(ease: number, q: number): number {
  const next = ease + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02))
  return Math.max(MIN_EASE, Math.round(next * 1000) / 1000)
}

function stateOf(review: Review | undefined): ReviewState | undefined {
  if (!review) return undefined
  const { prior: _prior, ...state } = review
  return state
}

/**
 * État de la notion après une tentative, `dayScores` étant les notes (0 à 1) de toutes les
 * tentatives du jour sur la notion, celle-ci comprise.
 */
export function reviewAfterAttempt(
  current: Review | undefined,
  notion: string,
  dayScores: readonly number[],
  now: number,
): Review {
  const reviewedToday = current?.lastReview !== undefined && sameDay(current.lastReview, now)
  const base = reviewedToday ? current?.prior : stateOf(current)
  const mean = dayScores.length === 0 ? 0 : dayScores.reduce((s, x) => s + x, 0) / dayScores.length
  const next = applySm2(base, notion, qualityFromScore(mean, mean >= PASS_SCORE), now)
  return base ? { ...next, prior: base } : next
}

export function isDue(review: ReviewState, now: number): boolean {
  return review.due <= now
}
