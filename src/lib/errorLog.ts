/**
 * Suivi des erreurs sans service tiers : les erreurs non gérées sont gardées dans le navigateur
 * (20 dernières) et peuvent être signalées par une issue GitHub pré-remplie. Rien n'est envoyé
 * automatiquement.
 */
import { REPO_URL } from '@/lib/report'

export interface LoggedError {
  date: number
  message: string
  stack?: string
  route: string
}

const KEY = 'dscg-errors'
const MAX = 20

export function readErrors(): LoggedError[] {
  try {
    const raw = JSON.parse(localStorage.getItem(KEY) ?? '[]') as unknown
    return Array.isArray(raw) ? (raw as LoggedError[]) : []
  } catch {
    return []
  }
}

export function logError(error: unknown, route = typeof location !== 'undefined' ? location.pathname : ''): LoggedError {
  const e = error instanceof Error ? error : new Error(typeof error === 'string' ? error : JSON.stringify(error))
  const entry: LoggedError = { date: Date.now(), message: e.message.slice(0, 500), stack: e.stack?.split('\n').slice(0, 8).join('\n'), route }
  try {
    localStorage.setItem(KEY, JSON.stringify([entry, ...readErrors()].slice(0, MAX)))
  } catch {
    // Stockage indisponible : l'erreur reste affichée à l'écran.
  }
  return entry
}

export function clearErrors(): void {
  try {
    localStorage.removeItem(KEY)
  } catch {
    // rien à effacer
  }
}

/** Erreur de chargement d'un écran après une mise à jour (ancien fichier JS disparu) : un rechargement suffit. */
export function isStaleChunkError(error: unknown): boolean {
  const message = error instanceof Error ? error.message : String(error)
  return /dynamically imported module|Importing a module script failed|Failed to fetch|error loading dynamically/i.test(message)
}

/** Issue GitHub pré-remplie avec l'erreur (message, page, version, navigateur). */
export function errorIssueUrl(entry: LoggedError): string {
  const body = [
    `- Page : \`${entry.route}\``,
    `- Date : ${new Date(entry.date).toISOString()}`,
    `- Version de l'application : ${__APP_VERSION__}`,
    `- Navigateur : ${typeof navigator !== 'undefined' ? navigator.userAgent : ''}`,
    '',
    '```',
    entry.message,
    entry.stack ?? '',
    '```',
    '',
    '**Ce que je faisais :**',
    '',
  ].join('\n')
  const params = new URLSearchParams({ title: `Erreur : ${entry.message.slice(0, 80)}`, body, labels: 'bug' })
  return `${REPO_URL}/issues/new?${params.toString()}`
}

/** Enregistre les erreurs non gérées de la page (scripts et promesses). */
export function installErrorLogging(): void {
  if (typeof window === 'undefined') return
  window.addEventListener('error', (e) => logError(e.error ?? e.message))
  window.addEventListener('unhandledrejection', (e) => logError(e.reason))
}
