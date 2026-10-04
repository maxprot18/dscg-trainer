import { applyTheme, readThemePreference, resolveTheme, saveThemePreference, THEME_STORAGE_KEY } from './theme'

function mockSystem(dark: boolean) {
  window.matchMedia = ((query: string) => ({
    matches: dark && query.includes('dark'),
    addEventListener: () => {},
    removeEventListener: () => {},
  })) as unknown as typeof window.matchMedia
}

describe('thème', () => {
  beforeEach(() => {
    localStorage.clear()
    document.documentElement.className = ''
    document.head.innerHTML = '<meta name="theme-color" content="#1e3a8a">'
  })

  it('suit le système par défaut', () => {
    mockSystem(true)
    expect(readThemePreference()).toBe('system')
    expect(resolveTheme('system')).toBe('dark')
    applyTheme('system')
    expect(document.documentElement).toHaveClass('dark')
    expect(document.querySelector('meta[name="theme-color"]')).toHaveAttribute('content', '#0f172a')
  })

  it('garde un choix explicite et revient au système', () => {
    mockSystem(true)
    saveThemePreference('light')
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe('light')
    expect(document.documentElement).not.toHaveClass('dark')
    expect(readThemePreference()).toBe('light')
    saveThemePreference('system')
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBeNull()
    expect(document.documentElement).toHaveClass('dark')
  })
})
