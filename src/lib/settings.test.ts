import { DEFAULT_SETTINGS, readSettings, resetSettingsCache, saveSettings, SETTINGS_STORAGE_KEY } from './settings'

describe('réglages', () => {
  beforeEach(() => {
    localStorage.clear()
    resetSettingsCache()
  })

  it('valeurs par défaut, sauvegarde et valeurs hors liste ignorées', () => {
    expect(readSettings()).toEqual(DEFAULT_SETTINGS)
    expect(saveSettings({ dailyGoal: 30 }).dailyGoal).toBe(30)
    expect(JSON.parse(localStorage.getItem(SETTINGS_STORAGE_KEY)!)).toMatchObject({ dailyGoal: 30 })
    resetSettingsCache()
    expect(readSettings().dailyGoal).toBe(30)
    localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify({ dailyGoal: 7, themeSessionSize: 'x' }))
    resetSettingsCache()
    expect(readSettings()).toEqual(DEFAULT_SETTINGS)
    localStorage.setItem(SETTINGS_STORAGE_KEY, '{')
    resetSettingsCache()
    expect(readSettings()).toEqual(DEFAULT_SETTINGS)
  })

  it('date d’examen, UE et heure de rappel validées', () => {
    saveSettings({ examDate: '2027-05-12', examUes: ['UE4', 'UE1'], reminderTime: '07:30' })
    resetSettingsCache()
    expect(readSettings()).toMatchObject({ examDate: '2027-05-12', examUes: ['UE1', 'UE4'], reminderTime: '07:30' })
    localStorage.setItem('dscg-settings', JSON.stringify({ examDate: '12/05/2027', examUes: ['UE9'], reminderTime: '25:00' }))
    resetSettingsCache()
    expect(readSettings()).toMatchObject({ examDate: null, examUes: [], reminderTime: '19:00' })
  })
})
