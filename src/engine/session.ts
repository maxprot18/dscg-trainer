/**
 * Construction des sessions d'entraînement : session rapide, par thème, révision intelligente,
 * mode erreurs et examen blanc.
 */
import type { Exercise, UeId } from '@/content/schema'
import type { Attempt, Review } from '@/db/db'

import { failedExerciseIds } from './stats'

export const QUICK_SESSION_SIZE = 10
export const QUICK_SESSION_SECONDS = 5 * 60
export const THEME_SESSION_SIZE = 20
/** Exercices jugés assez courts pour la session rapide. */
export const QUICK_MAX_SECONDS = 180

export interface ThemeScope {
  ue: UeId
  theme?: string
  notion?: string
}

/** Générateur pseudo-aléatoire déterministe (mulberry32) : une même graine redonne la même session. */
export function seededRandom(seed: number): () => number {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export function shuffle<T>(items: readonly T[], random: () => number): T[] {
  const out = [...items]
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1))
    ;[out[i], out[j]] = [out[j], out[i]]
  }
  return out
}

/**
 * Session rapide : 10 exercices mélangés, en priorité courts (≤ 3 min estimées),
 * complétés par des exercices plus longs si le stock de courts ne suffit pas.
 */
export function buildQuickSession(pool: readonly Exercise[], seed: number, size = QUICK_SESSION_SIZE): Exercise[] {
  const random = seededRandom(seed)
  const short = shuffle(
    pool.filter((e) => e.estimated_seconds <= QUICK_MAX_SECONDS),
    random,
  )
  const long = shuffle(
    pool.filter((e) => e.estimated_seconds > QUICK_MAX_SECONDS),
    random,
  )
  return [...short, ...long].slice(0, size)
}

export function inScope(ex: Exercise, scope: ThemeScope): boolean {
  return (
    ex.ue === scope.ue &&
    (scope.theme === undefined || ex.theme === scope.theme) &&
    (scope.notion === undefined || ex.notion === scope.notion)
  )
}

/** Session par thème : exercices de l'UE / du thème / de la notion, du plus facile au plus difficile. */
export function buildThemeSession(
  pool: readonly Exercise[],
  scope: ThemeScope,
  seed: number,
  size = THEME_SESSION_SIZE,
): Exercise[] {
  const picked = shuffle(
    pool.filter((e) => inScope(e, scope)),
    seededRandom(seed),
  ).slice(0, size)
  return picked.sort((a, b) => a.difficulty - b.difficulty)
}

// ——— Révision intelligente, mode erreurs, examen blanc (phase 4) ———

export const SMART_SESSION_SIZE = 20
/** Exercices tirés au plus par notion dans une révision intelligente. */
export const SMART_PER_NOTION = 3
export const ERROR_SESSION_SIZE = 20

/** Données de progression nécessaires aux sessions qui dépendent de l'historique. */
export interface ProgressSnapshot {
  attempts: readonly Attempt[]
  reviews: readonly Review[]
}

/**
 * Ordre de priorité des notions à réviser : d'abord celles dont la révision est échue (les plus en
 * retard d'abord), puis des notions jamais travaillées, puis celles dont la révision approche.
 */
export function smartNotionOrder(
  pool: readonly Exercise[],
  snapshot: ProgressSnapshot,
  now: number,
  seed: number,
): string[] {
  const notions = [...new Set(pool.map((e) => e.notion))]
  // Échéance de chaque notion travaillée. Une notion travaillée sans état de révision (tentatives
  // antérieures à la répétition espacée) est échue depuis sa dernière tentative.
  const dueAt = new Map<string, number>()
  for (const a of snapshot.attempts) dueAt.set(a.notion, Math.max(dueAt.get(a.notion) ?? 0, a.date))
  for (const r of snapshot.reviews) dueAt.set(r.notion, r.due)
  const byDue = (a: string, b: string) => dueAt.get(a)! - dueAt.get(b)!
  const due = notions.filter((n) => dueAt.has(n) && dueAt.get(n)! <= now).sort(byDue)
  const fresh = shuffle(
    notions.filter((n) => !dueAt.has(n)),
    seededRandom(seed),
  )
  const upcoming = notions.filter((n) => dueAt.has(n) && dueAt.get(n)! > now).sort(byDue)
  return [...due, ...fresh, ...upcoming]
}

/**
 * Révision intelligente : les notions choisies par la répétition espacée, jusqu'à 3 exercices par
 * notion (jamais faits d'abord, puis ratés, puis les moins récemment faits), mélangés.
 */
export function buildSmartSession(
  pool: readonly Exercise[],
  snapshot: ProgressSnapshot,
  now: number,
  seed: number,
  size = SMART_SESSION_SIZE,
): Exercise[] {
  const random = seededRandom(seed)
  const lastAttempt = new Map<string, Attempt>()
  for (const a of [...snapshot.attempts].sort((x, y) => x.date - y.date)) lastAttempt.set(a.exerciseId, a)
  const byNotion = new Map<string, Exercise[]>()
  for (const e of pool) {
    const list = byNotion.get(e.notion)
    if (list) list.push(e)
    else byNotion.set(e.notion, [e])
  }
  // Rang d'un exercice dans sa notion : jamais fait (0), raté (1), réussi (2) ; puis le moins récent.
  const rank = (e: Exercise): [number, number] => {
    const last = lastAttempt.get(e.id)
    if (!last) return [0, 0]
    return [last.correct ? 2 : 1, last.date]
  }
  const picked: Exercise[] = []
  for (const notion of smartNotionOrder(pool, snapshot, now, seed)) {
    if (picked.length >= size) break
    const candidates = shuffle(byNotion.get(notion) ?? [], random).sort((a, b) => {
      const [ra, da] = rank(a)
      const [rb, db] = rank(b)
      return ra - rb || da - db
    })
    picked.push(...candidates.slice(0, Math.min(SMART_PER_NOTION, size - picked.length)))
  }
  return shuffle(picked, random)
}

/** Mode « erreurs » : les exercices dont la dernière tentative est ratée (les plus récents d'abord). */
export function buildErrorSession(
  pool: readonly Exercise[],
  attempts: readonly Attempt[],
  seed: number,
  ue?: UeId,
  size = ERROR_SESSION_SIZE,
): Exercise[] {
  const byId = new Map(pool.map((e) => [e.id, e]))
  const failed = failedExerciseIds(attempts)
    .map((id) => byId.get(id))
    .filter((e): e is Exercise => e !== undefined && (ue === undefined || e.ue === ue))
  return shuffle(failed.slice(0, size), seededRandom(seed))
}

const CASE_TYPES: readonly Exercise['type'][] = ['case_study', 'consolidation_case', 'audit_case']
const CALC_TYPES: readonly Exercise['type'][] = ['numeric', 'journal_entry']
const QUESTION_TYPES: readonly Exercise['type'][] = ['mcq', 'true_false']
/** Part du temps de l'examen consacrée aux cas, aux calculs et écritures, aux questions. */
export const EXAM_SHARES = { cases: 0.55, calc: 0.25, questions: 0.2 } as const

/**
 * Examen blanc d'une UE : un sujet dont la durée estimée remplit la durée de l'épreuve, composé
 * de questions de cours (≈ 20 % du temps), de calculs et écritures (≈ 25 %) et de cas (≈ 55 %),
 * présentés dans cet ordre. Les flashcards sont exclues.
 */
export function buildExamSession(pool: readonly Exercise[], ue: UeId, durationMinutes: number, seed: number): Exercise[] {
  const random = seededRandom(seed)
  const budget = durationMinutes * 60
  const inUe = pool.filter((e) => e.ue === ue && e.type !== 'flashcard')
  const buckets = [
    { types: QUESTION_TYPES, share: EXAM_SHARES.questions },
    { types: CALC_TYPES, share: EXAM_SHARES.calc },
    { types: CASE_TYPES, share: EXAM_SHARES.cases },
  ].map((b) => ({ ...b, items: shuffle(inUe.filter((e) => b.types.includes(e.type)), random), picked: [] as Exercise[] }))

  let used = 0
  const take = (bucket: (typeof buckets)[number], limit: number) => {
    let spent = bucket.picked.reduce((s, e) => s + e.estimated_seconds, 0)
    for (const e of bucket.items) {
      if (bucket.picked.includes(e)) continue
      if (spent + e.estimated_seconds > limit || used + e.estimated_seconds > budget) continue
      bucket.picked.push(e)
      spent += e.estimated_seconds
      used += e.estimated_seconds
    }
  }
  for (const b of buckets) take(b, budget * b.share)
  // Le temps laissé libre (type absent de l'UE, exercices trop longs) est complété par les autres blocs.
  for (const b of [...buckets].reverse()) take(b, budget)
  return buckets.flatMap((b) => b.picked)
}

/** Note sur 20 d'un examen blanc : chaque exercice pèse sa durée estimée ; un exercice non traité vaut 0. */
export function examGrade(exercises: readonly Exercise[], scores: ReadonlyMap<string, number>): number {
  const total = exercises.reduce((s, e) => s + e.estimated_seconds, 0)
  if (total === 0) return 0
  const earned = exercises.reduce((s, e) => s + (scores.get(e.id) ?? 0) * e.estimated_seconds, 0)
  return Math.round((earned / total) * 20 * 100) / 100
}
