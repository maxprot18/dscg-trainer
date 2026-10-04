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
})
