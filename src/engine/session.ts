/**
 * Construction des sessions d'entraînement (session rapide, session par thème).
 */
import type { Exercise, UeId } from '@/content/schema'

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
