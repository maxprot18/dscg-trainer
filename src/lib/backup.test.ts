import { BACKUP_MIN_ATTEMPTS, shouldRemindBackup, snoozeBackupReminder, type StorageStatus } from './backup'

const DAY = 86_400_000
const now = Date.UTC(2026, 9, 4)
const base: StorageStatus = { persisted: false, canPersist: true, lastBackup: null }

describe('rappel de sauvegarde', () => {
  beforeEach(() => localStorage.clear())

  it('pas de rappel tant que la progression est mince ou le stockage protégé', () => {
    expect(shouldRemindBackup(BACKUP_MIN_ATTEMPTS - 1, base, now, false)).toBe(false)
    expect(shouldRemindBackup(50, { ...base, persisted: true }, now, false)).toBe(false)
  })

  it('rappel sans sauvegarde ou avec une sauvegarde de plus de 14 jours', () => {
    expect(shouldRemindBackup(50, base, now, false)).toBe(true)
    expect(shouldRemindBackup(50, { ...base, lastBackup: now - 3 * DAY }, now, false)).toBe(false)
    expect(shouldRemindBackup(50, { ...base, lastBackup: now - 15 * DAY }, now, false)).toBe(true)
  })

  it('onglet Safari sur iPhone : rappel même si le stockage est déclaré persistant', () => {
    expect(shouldRemindBackup(50, { ...base, persisted: true }, now, true)).toBe(true)
  })

  it('« Plus tard » reporte le rappel d’une semaine', () => {
    snoozeBackupReminder(now)
    expect(shouldRemindBackup(50, base, now + 6 * DAY, false)).toBe(false)
    expect(shouldRemindBackup(50, base, now + 8 * DAY, false)).toBe(true)
  })
})
