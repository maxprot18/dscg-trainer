/**
 * Réglages de l'utilisateur, gardés dans le navigateur (localStorage) : objectif quotidien,
 * taille des sessions par thème et des sessions de flashcards.
 */
import { useSyncExternalStore } from 'react'

export interface Settings {
  /** Exercices par jour visés (anneau de l'accueil). */
  dailyGoal: number
  /** Nombre d'exercices d'une session par thème. */
  themeSessionSize: number
  /** Nombre de cartes d'une session de flashcards. */
  cardsSessionSize: number
}

export const DEFAULT_SETTINGS: Settings = { dailyGoal: 15, themeSessionSize: 20, cardsSessionSize: 20 }
export const DAILY_GOAL_CHOICES = [5, 10, 15, 20, 30, 50] as const
export const SESSION_SIZE_CHOICES = [10, 15, 20, 30, 40] as const

export const SETTINGS_STORAGE_KEY = 'dscg-settings'
const listeners = new Set<() => void>()
let cache: Settings | null = null

function sanitize(raw: unknown): Settings {
  const r = (raw && typeof raw === 'object' ? raw : {}) as Partial<Record<keyof Settings, unknown>>
  const pick = (value: unknown, choices: readonly number[], fallback: number) =>
    typeof value === 'number' && choices.includes(value) ? value : fallback
  return {
    dailyGoal: pick(r.dailyGoal, DAILY_GOAL_CHOICES, DEFAULT_SETTINGS.dailyGoal),
    themeSessionSize: pick(r.themeSessionSize, SESSION_SIZE_CHOICES, DEFAULT_SETTINGS.themeSessionSize),
    cardsSessionSize: pick(r.cardsSessionSize, SESSION_SIZE_CHOICES, DEFAULT_SETTINGS.cardsSessionSize),
  }
}

export function readSettings(): Settings {
  if (cache) return cache
  try {
    const raw = localStorage.getItem(SETTINGS_STORAGE_KEY)
    cache = sanitize(raw ? JSON.parse(raw) : null)
  } catch {
    cache = { ...DEFAULT_SETTINGS }
  }
  return cache
}

export function saveSettings(patch: Partial<Settings>): Settings {
  cache = sanitize({ ...readSettings(), ...patch })
  try {
    localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(cache))
  } catch {
    // Stockage indisponible : le réglage vaut pour la page en cours.
  }
  for (const l of listeners) l()
  return cache
}

/** Réglages courants, mis à jour en direct dans tous les composants. */
export function useSettings(): Settings {
  return useSyncExternalStore(
    (listener) => {
      listeners.add(listener)
      return () => listeners.delete(listener)
    },
    readSettings,
    readSettings,
  )
}

/** Pour les tests : oublie le cache (le stockage est relu à la prochaine lecture). */
export function resetSettingsCache(): void {
  cache = null
}
