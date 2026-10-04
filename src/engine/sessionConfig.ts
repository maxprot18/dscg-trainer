/**
 * Configuration d'une session encodée dans l'URL (/session?mode=…&seed=…), pour qu'un
 * rechargement de page redonne la même série d'exercices.
 */
import type { Exercise } from '@/content/schema'
import { UE_IDS, type UeId } from '@/content/schema'

import { buildQuickSession, buildThemeSession, QUICK_SESSION_SECONDS, type ThemeScope } from './session'

export type SessionConfig =
  | { mode: 'quick'; seed: number }
  | { mode: 'theme'; seed: number; scope: ThemeScope }

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
  return `?${p.toString()}`
}

export function parseSessionSearch(params: URLSearchParams): SessionConfig | null {
  const seed = Number(params.get('seed'))
  if (!Number.isInteger(seed)) return null
  const mode = params.get('mode')
  if (mode === 'quick') return { mode, seed }
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

export function buildSession(config: SessionConfig, pool: readonly Exercise[]): Exercise[] {
  return config.mode === 'quick' ? buildQuickSession(pool, config.seed) : buildThemeSession(pool, config.scope, config.seed)
}

/** Durée limite en secondes (session rapide : 5 minutes ; par thème : pas de limite). */
export function timeLimit(config: SessionConfig): number | null {
  return config.mode === 'quick' ? QUICK_SESSION_SECONDS : null
}

export function scopeKey(scope: ThemeScope): string {
  return [scope.ue, scope.theme, scope.notion].filter(Boolean).join('/')
}
