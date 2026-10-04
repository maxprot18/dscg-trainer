/**
 * Plan de révision à rebours de la date d'examen (fonctions pures).
 *
 * Trois périodes : découverte (des notions jamais travaillées restent), consolidation (tout a été vu,
 * on travaille les notions fragiles), dernière ligne droite (14 derniers jours : examens blancs,
 * révision intelligente, erreurs). Le rythme conseillé répartit les notions restantes sur les jours
 * qui précèdent la dernière ligne droite.
 */
import type { UeId } from '@/content/ids'

import { DAY_MS, startOfDay } from './srs'
import type { NotionProgress } from './stats'

/** Jours réservés avant l'épreuve aux examens blancs et aux révisions. */
export const FINAL_STRETCH_DAYS = 14
/** Exercices par notion nouvelle lors d'un premier passage, plus les révisions du jour. */
const EXERCISES_PER_NEW_NOTION = 5
const DAILY_REVIEW_EXERCISES = 5

export type PlanPhase = 'learn' | 'consolidate' | 'final' | 'past'

export interface UePlan {
  ue: UeId
  total: number
  seen: number
  mastered: number
}

export interface ExamPlan {
  /** Jours restants jusqu'au jour de l'examen (0 : c'est aujourd'hui). */
  daysLeft: number
  phase: PlanPhase
  total: number
  seen: number
  mastered: number
  /** Notions jamais travaillées. */
  unseen: number
  /** Notions travaillées mais pas encore maîtrisées. */
  fragile: number
  /** Notions nouvelles à découvrir par jour pour avoir tout vu avant la dernière ligne droite. */
  newPerDay: number
  /** Exercices conseillés par jour. */
  exercisesPerDay: number
  perUe: UePlan[]
}

/** Jours entre aujourd'hui et la date d'examen (AAAA-MM-JJ, jour civil local). */
export function daysUntil(examDate: string, now: number): number {
  const [y, m, d] = examDate.split('-').map(Number)
  const exam = new Date(y, m - 1, d).getTime()
  return Math.round((exam - startOfDay(now)) / DAY_MS)
}

export function examPlan(
  examDate: string,
  ues: readonly UeId[],
  notionsByUe: ReadonlyMap<UeId, readonly string[]>,
  progress: ReadonlyMap<string, NotionProgress>,
  now: number,
): ExamPlan {
  const daysLeft = daysUntil(examDate, now)
  const perUe = ues.map((ue) => {
    const notions = notionsByUe.get(ue) ?? []
    const seen = notions.filter((n) => (progress.get(n)?.attempts ?? 0) > 0).length
    const mastered = notions.filter((n) => progress.get(n)?.mastery === 'mastered').length
    return { ue, total: notions.length, seen, mastered }
  })
  const total = perUe.reduce((s, u) => s + u.total, 0)
  const seen = perUe.reduce((s, u) => s + u.seen, 0)
  const mastered = perUe.reduce((s, u) => s + u.mastered, 0)
  const unseen = total - seen
  const fragile = seen - mastered
  const phase: PlanPhase = daysLeft < 0 ? 'past' : daysLeft <= FINAL_STRETCH_DAYS ? 'final' : unseen > 0 ? 'learn' : 'consolidate'
  const learnDays = Math.max(1, daysLeft - FINAL_STRETCH_DAYS)
  const newPerDay = phase === 'learn' ? Math.ceil(unseen / learnDays) : phase === 'final' && unseen > 0 ? Math.ceil(unseen / Math.max(1, daysLeft)) : 0
  const exercisesPerDay =
    phase === 'past' ? 0 : Math.min(60, Math.max(10, newPerDay * EXERCISES_PER_NEW_NOTION + DAILY_REVIEW_EXERCISES + (phase === 'final' ? 10 : 0)))
  return { daysLeft, phase, total, seen, mastered, unseen, fragile, newPerDay, exercisesPerDay, perUe }
}
