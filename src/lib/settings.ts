/**
 * Réglages de l'utilisateur, gardés dans le navigateur (localStorage) : objectif quotidien,
 * taille des sessions par thème et des sessions de flashcards, date d'examen et UE préparées,
 * heure du rappel quotidien.
 */
import { useSyncExternalStore } from 'react'

import { UE_IDS, type UeId } from '@/content/ids'

export interface Settings {
  /** Exercices par jour visés (anneau de l'accueil). */
  dailyGoal: number
  /** Nombre d'exercices d'une session par thème. */
  themeSessionSize: number
  /** Nombre de cartes d'une session de flashcards. */
  cardsSessionSize: number
  /** Date de l'examen (AAAA-MM-JJ), `null` si non renseignée. */
  examDate: string | null
  /** UE passées à cette session d'examen. */
  examUes: UeId[]
  /** Heure du rappel quotidien (HH:MM). */
  reminderTime: string
}

export const DEFAULT_SETTINGS: Settings = {
  dailyGoal: 15,
  themeSessionSize: 20,
  cardsSessionSize: 20,
  examDate: null,
  examUes: [],
  reminderTime: '19:00',
}
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
    examDate: typeof r.examDate === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(r.examDate) ? r.examDate : null,
    examUes: Array.isArray(r.examUes) ? UE_IDS.filter((u) => (r.examUes as unknown[]).includes(u)) : [],
    reminderTime: typeof r.reminderTime === 'string' && /^([01]\d|2[0-3]):[0-5]\d$/.test(r.reminderTime) ? r.reminderTime : DEFAULT_SETTINGS.reminderTime,
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
