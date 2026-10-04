/**
 * Configuration d'une session encodée dans l'URL (/session?mode=…&seed=…), pour qu'un
 * rechargement de page redonne la même série d'exercices.
 */
import type { Exercise } from '@/content/schema'
import { UE_IDS, type UeId } from '@/content/schema'

import {
  buildErrorSession,
  buildExamSession,
  buildQuickSession,
  buildSmartSession,
  buildThemeSession,
  QUICK_SESSION_SECONDS,
  type ProgressSnapshot,
  type ThemeScope,
} from './session'

export type SessionConfig =
  | { mode: 'quick'; seed: number }
  | { mode: 'theme'; seed: number; scope: ThemeScope }
  | { mode: 'smart'; seed: number }
  | { mode: 'errors'; seed: number; ue?: UeId }
  | { mode: 'exam'; seed: number; ue: UeId }

/** Durée de l'épreuve de chaque UE, en minutes (taxonomie). */
export type ExamDurations = Readonly<Record<UeId, number>>

export function newSeed(): number {
  return Math.floor(Math.random() * 2 ** 31)
}

export function sessionSearch(config: SessionConfig): string {
  const p = new URLSearchParams({ mode: config.mode, seed: String(config.seed) })
  if (config.mode === 'theme') {
    p.set('ue', config.scope.ue)
    if (config.scope.theme) p.set('theme', config.scope.theme)
    if (config.scope.notion) p.set('notion', config.scope.notion)
  }
  if ((config.mode === 'errors' || config.mode === 'exam') && config.ue) p.set('ue', config.ue)
  return `?${p.toString()}`
}

export function parseSessionSearch(params: URLSearchParams): SessionConfig | null {
  const seed = Number(params.get('seed'))
  if (!Number.isInteger(seed)) return null
  const mode = params.get('mode')
  const ueParam = params.get('ue')
  const ue = ueParam && (UE_IDS as readonly string[]).includes(ueParam) ? (ueParam as UeId) : undefined
  if (mode === 'quick' || mode === 'smart') return { mode, seed }
  if (mode === 'errors') return ueParam && !ue ? null : { mode, seed, ue }
  if (mode === 'exam') return ue ? { mode, seed, ue } : null
  if (mode === 'theme') {
    const ue = params.get('ue')
    if (!ue || !(UE_IDS as readonly string[]).includes(ue)) return null
    return {
      mode,
      seed,
      scope: { ue: ue as UeId, theme: params.get('theme') ?? undefined, notion: params.get('notion') ?? undefined },
    }
  }
  return null
}

/** Les modes révision intelligente et erreurs se construisent à partir de l'historique. */
export function needsProgress(config: SessionConfig): boolean {
  return config.mode === 'smart' || config.mode === 'errors'
}

const EMPTY_SNAPSHOT: ProgressSnapshot = { attempts: [], reviews: [] }

export function buildSession(
  config: SessionConfig,
  pool: readonly Exercise[],
  durations: ExamDurations,
  snapshot: ProgressSnapshot = EMPTY_SNAPSHOT,
  now = Date.now(),
): Exercise[] {
  switch (config.mode) {
    case 'quick':
      return buildQuickSession(pool, config.seed)
    case 'theme':
      return buildThemeSession(pool, config.scope, config.seed)
    case 'smart':
      return buildSmartSession(pool, snapshot, now, config.seed)
    case 'errors':
      return buildErrorSession(pool, snapshot.attempts, config.seed, config.ue)
    case 'exam':
      return buildExamSession(pool, config.ue, durations[config.ue], config.seed)
  }
}

/** Durée limite en secondes : 5 minutes en session rapide, la durée de l'épreuve en examen blanc. */
export function timeLimit(config: SessionConfig, durations: ExamDurations): number | null {
  if (config.mode === 'quick') return QUICK_SESSION_SECONDS
  if (config.mode === 'exam') return durations[config.ue] * 60
  return null
}

/** Périmètre enregistré avec la session (historique). */
export function sessionScope(config: SessionConfig): string | undefined {
  if (config.mode === 'theme') return scopeKey(config.scope)
  if (config.mode === 'errors' || config.mode === 'exam') return config.ue
  return undefined
}

export function scopeKey(scope: ThemeScope): string {
  return [scope.ue, scope.theme, scope.notion].filter(Boolean).join('/')
}
