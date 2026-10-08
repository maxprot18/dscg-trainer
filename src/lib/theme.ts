/**
 * Mode sombre : préférence « système », « clair » ou « sombre », gardée dans le navigateur.
 * Le script en tête de `index.html` applique le thème avant le premier affichage (pas de flash).
 */
import { useEffect, useState } from 'react'

export type ThemePreference = 'system' | 'light' | 'dark'

export const THEME_STORAGE_KEY = 'dscg-theme'
const THEME_COLORS = { light: '#1e3a8a', dark: '#0f172a' } as const

export function readThemePreference(): ThemePreference {
  try {
    const value = localStorage.getItem(THEME_STORAGE_KEY)
    return value === 'light' || value === 'dark' ? value : 'system'
  } catch {
    return 'system'
  }
}

function systemPrefersDark(): boolean {
  return typeof window.matchMedia === 'function' && window.matchMedia('(prefers-color-scheme: dark)').matches
}

export function resolveTheme(preference: ThemePreference): 'light' | 'dark' {
  return preference === 'system' ? (systemPrefersDark() ? 'dark' : 'light') : preference
}

export function applyTheme(preference: ThemePreference): void {
  const theme = resolveTheme(preference)
  const root = document.documentElement
  root.classList.toggle('dark', theme === 'dark')
  root.style.colorScheme = theme
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', THEME_COLORS[theme])
}

export function saveThemePreference(preference: ThemePreference): void {
  try {
    if (preference === 'system') localStorage.removeItem(THEME_STORAGE_KEY)
    else localStorage.setItem(THEME_STORAGE_KEY, preference)
  } catch {
    // Stockage indisponible (navigation privée) : le choix vaut pour la page en cours.
  }
  applyTheme(preference)
}

const NEXT: Record<ThemePreference, ThemePreference> = { system: 'light', light: 'dark', dark: 'system' }

/** Préférence de thème courante et passage à la suivante (système → clair → sombre). */
export function useTheme(): [ThemePreference, () => void] {
  const [preference, setPreference] = useState<ThemePreference>(readThemePreference)
  useEffect(() => {
    applyTheme(preference)
    if (preference !== 'system' || typeof window.matchMedia !== 'function') return
    const media = window.matchMedia('(prefers-color-scheme: dark)')
    const onChange = () => applyTheme('system')
    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  }, [preference])
  const cycle = () => {
    const next = NEXT[preference]
    saveThemePreference(next)
    setPreference(next)
  }
  return [preference, cycle]
}

/**
 * Impression toujours en thème clair : texte sombre sur papier blanc, sans fonds sombres. Le thème choisi
 * est rétabli après l'impression.
 */
export function printInLightTheme(): () => void {
  const before = () => document.documentElement.classList.remove('dark')
  const after = () => applyTheme(readThemePreference())
  window.addEventListener('beforeprint', before)
  window.addEventListener('afterprint', after)
  return () => {
    window.removeEventListener('beforeprint', before)
    window.removeEventListener('afterprint', after)
  }
}
