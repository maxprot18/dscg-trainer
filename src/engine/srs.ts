/**
 * Répétition espacée par notion, algorithme SM-2 (SuperMemo 2, P. Woźniak, 1987).
 *
 * Chaque tentative sur un exercice d'une notion donne une qualité de 0 à 5 tirée de la note.
 * Qualité ≥ 3 : la notion est revue avec succès, l'intervalle s'allonge (1 jour, 6 jours, puis
 * intervalle × facilité). Qualité < 3 : la notion repart à 1 jour. Plusieurs tentatives le même
 * jour ne comptent qu'une fois pour allonger l'intervalle (un échec le même jour reste pris en compte).
 */
import type { Review } from '@/db/db'

export const DAY_MS = 24 * 60 * 60 * 1000
export const INITIAL_EASE = 2.5
export const MIN_EASE = 1.3
/** Qualité minimale d'une revue réussie. */
export const PASS_QUALITY = 3

/** Qualité SM-2 (0 à 5) d'une note entre 0 et 1. Le seuil de 3 correspond à la réussite (70 %). */
export function qualityFromScore(score: number, correct: boolean): number {
  if (correct) return score >= 0.95 ? 5 : score >= 0.85 ? 4 : 3
  if (score >= 0.4) return 2
  return score > 0 ? 1 : 0
}

/** Début du jour local d'un instant (pour reconnaître deux revues le même jour). */
export function startOfDay(t: number): number {
  const d = new Date(t)
  d.setHours(0, 0, 0, 0)
  return d.getTime()
}

export function sameDay(a: number, b: number): boolean {
  return startOfDay(a) === startOfDay(b)
}

export function newReview(notion: string, now: number): Review {
  return { notion, due: now, interval: 0, ease: INITIAL_EASE, repetitions: 0, lapses: 0 }
}

/** Nouvel état de la notion après une revue de qualité `quality` à l'instant `now`. */
export function applyReview(previous: Review | undefined, notion: string, quality: number, now: number): Review {
  const prev = previous ?? newReview(notion, now)
  const q = Math.max(0, Math.min(5, Math.round(quality)))
  const reviewedToday = prev.lastReview !== undefined && sameDay(prev.lastReview, now)

  if (q < PASS_QUALITY) {
    // Échec : la notion repart à 1 jour ; la facilité baisse une seule fois par jour.
    const alreadyFailedToday = reviewedToday && prev.repetitions === 0 && prev.interval <= 1
    return {
      notion,
      due: now + DAY_MS,
      interval: 1,
      ease: alreadyFailedToday ? prev.ease : nextEase(prev.ease, q),
      repetitions: 0,
      lapses: prev.lapses + (prev.repetitions > 0 ? 1 : 0),
      lastReview: now,
    }
  }

  // Succès le même jour qu'une revue précédente : l'intervalle n'est pas allongé une seconde fois.
  if (reviewedToday) return { ...prev, lastReview: now }

  const repetitions = prev.repetitions + 1
  const interval = repetitions === 1 ? 1 : repetitions === 2 ? 6 : Math.round(prev.interval * prev.ease)
  return {
    notion,
    due: now + interval * DAY_MS,
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

export function isDue(review: Review, now: number): boolean {
  return review.due <= now
}
