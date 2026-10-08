/**
 * Configuration d'une session encodée dans l'URL (/session?mode=…&seed=…), pour qu'un
 * rechargement de page redonne la même série d'exercices.
 */
import type { Exercise } from '@/content/schema'
import { UE_IDS } from '@/content/ids'
import type { UeId } from '@/content/schema'

import {
  buildCardsSession,
  buildDiagnosticSession,
  buildErrorSession,
  buildExamSession,
  buildFullExamSession,
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
  | { mode: 'smart'; seed: number; ues?: UeId[] }
  | { mode: 'errors'; seed: number; ue?: UeId }
  | { mode: 'exam'; seed: number; ue: UeId }
  | { mode: 'full'; seed: number; ue: UeId }
  | { mode: 'cards'; seed: number; scope?: ThemeScope }
  | { mode: 'diagnostic'; seed: number; ue: UeId }

/** Tailles de session réglables par l'utilisateur. */
export interface SessionSizes {
  theme: number
  cards: number
}

/** Durée de l'épreuve de chaque UE, en minutes (taxonomie). */
export type ExamDurations = Readonly<Record<UeId, number>>

export function newSeed(): number {
  return Math.floor(Math.random() * 2 ** 31)
}

export function sessionSearch(config: SessionConfig): string {
  const p = new URLSearchParams({ mode: config.mode, seed: String(config.seed) })
  if (config.mode === 'theme' || (config.mode === 'cards' && config.scope)) {
    const scope = config.scope!
    p.set('ue', scope.ue)
    if (scope.theme) p.set('theme', scope.theme)
    if (scope.notion) p.set('notion', scope.notion)
  }
  if ((config.mode === 'errors' || isExamMode(config) || config.mode === 'diagnostic') && config.ue) p.set('ue', config.ue)
  if (config.mode === 'smart' && config.ues?.length) p.set('ues', config.ues.join(','))
  return `?${p.toString()}`
}

export function parseSessionSearch(params: URLSearchParams): SessionConfig | null {
  const seed = Number(params.get('seed'))
  if (!Number.isInteger(seed)) return null
  const mode = params.get('mode')
  const ueParam = params.get('ue')
  const ue = ueParam && (UE_IDS as readonly string[]).includes(ueParam) ? (ueParam as UeId) : undefined
  if (mode === 'quick') return { mode, seed }
  if (mode === 'smart') {
    const ues = (params.get('ues') ?? '').split(',').filter((u): u is UeId => (UE_IDS as readonly string[]).includes(u))
    return ues.length ? { mode, seed, ues } : { mode, seed }
  }
  if (mode === 'diagnostic') return ue ? { mode, seed, ue } : null
  if (mode === 'errors') return ueParam && !ue ? null : { mode, seed, ue }
  if (mode === 'exam' || mode === 'full') return ue ? { mode, seed, ue } : null
  if (mode === 'cards') {
    if (ueParam && !ue) return null
    return ue ? { mode, seed, scope: { ue, theme: params.get('theme') ?? undefined } } : { mode, seed }
  }
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

/** Examen blanc ou sujet complet : chronométré, correction à la fin, note sur 20. */
export function isExamMode(config: SessionConfig): config is Extract<SessionConfig, { mode: 'exam' | 'full' }> {
  return config.mode === 'exam' || config.mode === 'full'
}

/** UE dont le contenu suffit pour construire la session (toutes si `undefined`). */
export function sessionUes(config: SessionConfig): UeId[] | undefined {
  switch (config.mode) {
    case 'theme':
      return [config.scope.ue]
    case 'cards':
      return config.scope ? [config.scope.ue] : undefined
    case 'smart':
      return config.ues?.length ? config.ues : undefined
    case 'errors':
      return config.ue ? [config.ue] : undefined
    case 'exam':
    case 'full':
    case 'diagnostic':
      return [config.ue]
    case 'quick':
      return undefined
  }
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
  sizes: SessionSizes = { theme: 20, cards: 20 },
): Exercise[] {
  switch (config.mode) {
    case 'quick':
      return buildQuickSession(pool, config.seed)
    case 'theme':
      return buildThemeSession(pool, config.scope, config.seed, sizes.theme)
    case 'cards':
      return buildCardsSession(pool, config.scope, config.seed, sizes.cards)
    case 'smart':
      return buildSmartSession(config.ues?.length ? pool.filter((e) => config.ues!.includes(e.ue)) : pool, snapshot, now, config.seed)
    case 'diagnostic':
      return buildDiagnosticSession(pool, config.ue, config.seed)
    case 'errors':
      return buildErrorSession(pool, snapshot.attempts, config.seed, config.ue)
    case 'exam':
      return buildExamSession(pool, config.ue, durations[config.ue], config.seed)
    case 'full':
      return buildFullExamSession(pool, config.ue, durations[config.ue], config.seed)
  }
}

/** Durée limite en secondes : 5 minutes en session rapide, la durée de l'épreuve en examen blanc ou sujet complet. */
export function timeLimit(config: SessionConfig, durations: ExamDurations): number | null {
  if (config.mode === 'quick') return QUICK_SESSION_SECONDS
  if (isExamMode(config)) return durations[config.ue] * 60
  return null
}

/** Périmètre enregistré avec la session (historique). */
export function sessionScope(config: SessionConfig): string | undefined {
  if (config.mode === 'theme') return scopeKey(config.scope)
  if (config.mode === 'cards') return config.scope ? scopeKey(config.scope) : undefined
  if (config.mode === 'errors' || isExamMode(config) || config.mode === 'diagnostic') return config.ue
  if (config.mode === 'smart' && config.ues?.length) return config.ues.join(',')
  return undefined
}

export function scopeKey(scope: ThemeScope): string {
  return [scope.ue, scope.theme, scope.notion].filter(Boolean).join('/')
}
