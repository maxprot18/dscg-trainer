/**
 * Protection de la progression, stockée seulement dans le navigateur :
 * - stockage persistant (`navigator.storage.persist()`), demandé une fois l'utilisateur engagé, pour que
 *   le navigateur n'efface pas la base locale quand l'espace manque ;
 * - date de la dernière sauvegarde (export JSON) et rappel quand elle manque ou date, surtout sur iPhone :
 *   Safari efface les données d'un site non installé après 7 jours sans visite.
 */
import { useSyncExternalStore } from 'react'

import { exportProgress } from '@/db/db'

const LAST_BACKUP_KEY = 'dscg-last-backup'
const REMINDER_SNOOZE_KEY = 'dscg-backup-reminder-snooze'
const PERSIST_ASKED_KEY = 'dscg-persist-asked'

/** Nombre de tentatives à partir duquel la progression vaut d'être sauvegardée. */
export const BACKUP_MIN_ATTEMPTS = 20
/** Ancienneté (jours) au-delà de laquelle une sauvegarde est rappelée. */
export const BACKUP_MAX_AGE_DAYS = 14
/** Report du rappel après « Plus tard » (jours). */
export const BACKUP_SNOOZE_DAYS = 7
const DAY = 86_400_000

function read(key: string): string | null {
  try {
    return localStorage.getItem(key)
  } catch {
    return null
  }
}
function write(key: string, value: string): void {
  try {
    localStorage.setItem(key, value)
  } catch {
    // Stockage indisponible (navigation privée) : rien à mémoriser.
  }
}

export interface StorageStatus {
  /** `null` tant que l'état n'est pas connu, ou si le navigateur n'expose pas l'API. */
  persisted: boolean | null
  /** Le navigateur sait demander le stockage persistant. */
  canPersist: boolean
  /** Date (ms) de la dernière sauvegarde exportée depuis cet appareil. */
  lastBackup: number | null
}

const listeners = new Set<() => void>()
let status: StorageStatus = { persisted: null, canPersist: false, lastBackup: Number(read(LAST_BACKUP_KEY)) || null }
function set(patch: Partial<StorageStatus>) {
  status = { ...status, ...patch }
  for (const l of listeners) l()
}

const storage = () => (typeof navigator !== 'undefined' ? navigator.storage : undefined)

/** Lit l'état du stockage (au démarrage). */
export async function refreshStorageStatus(): Promise<StorageStatus> {
  const s = storage()
  if (!s?.persisted) {
    set({ persisted: null, canPersist: false })
    return status
  }
  try {
    set({ persisted: await s.persisted(), canPersist: typeof s.persist === 'function' })
  } catch {
    set({ persisted: null, canPersist: false })
  }
  return status
}

/** Demande le stockage persistant (Firefox affiche une autorisation ; Chrome décide seul). */
export async function requestPersistence(): Promise<boolean> {
  const s = storage()
  write(PERSIST_ASKED_KEY, '1')
  if (!s?.persist) return false
  try {
    const granted = await s.persist()
    set({ persisted: granted, canPersist: true })
    return granted
  } catch {
    return false
  }
}

/** Demande une seule fois, automatiquement, quand l'utilisateur a commencé à s'entraîner. */
export async function requestPersistenceOnce(attempts: number): Promise<void> {
  if (attempts < 1 || read(PERSIST_ASKED_KEY) || status.persisted !== false) return
  await requestPersistence()
}

/** Exporte la progression dans un fichier JSON et mémorise la date de sauvegarde. */
export async function downloadBackup(): Promise<void> {
  const data = await exportProgress()
  const url = URL.createObjectURL(new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' }))
  const a = document.createElement('a')
  a.href = url
  a.download = `dscg-progression-${data.exportedAt.slice(0, 10)}.json`
  a.click()
  URL.revokeObjectURL(url)
  const now = Date.now()
  write(LAST_BACKUP_KEY, String(now))
  set({ lastBackup: now })
}

export function snoozeBackupReminder(now = Date.now()): void {
  write(REMINDER_SNOOZE_KEY, String(now + BACKUP_SNOOZE_DAYS * DAY))
  for (const l of listeners) l()
}

/** Safari sur iPhone ou iPad, hors application installée : données effacées après 7 jours sans visite. */
export function isIosBrowserTab(): boolean {
  if (typeof navigator === 'undefined' || typeof window === 'undefined') return false
  const ios = /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
  const standalone = window.matchMedia?.('(display-mode: standalone)').matches || (navigator as { standalone?: boolean }).standalone === true
  return ios && !standalone
}

/**
 * Faut-il rappeler de sauvegarder ? Oui si la progression compte (au moins 20 tentatives), que le
 * stockage n'est pas garanti (non persistant, ou onglet Safari sur iPhone) et que la dernière
 * sauvegarde manque ou a plus de 14 jours, sauf rappel reporté.
 */
export function shouldRemindBackup(attempts: number, s: StorageStatus, now = Date.now(), iosTab = isIosBrowserTab()): boolean {
  if (attempts < BACKUP_MIN_ATTEMPTS) return false
  if (s.persisted === true && !iosTab) return false
  const snooze = Number(read(REMINDER_SNOOZE_KEY)) || 0
  if (snooze > now) return false
  return s.lastBackup === null || now - s.lastBackup > BACKUP_MAX_AGE_DAYS * DAY
}

export function useStorageStatus(): StorageStatus {
  return useSyncExternalStore(
    (l) => {
      listeners.add(l)
      return () => listeners.delete(l)
    },
    () => status,
    () => status,
  )
}
