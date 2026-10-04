import { test as base, expect } from '@playwright/test'

/** Chaque test échoue si la page journalise une erreur (console ou exception non gérée). */
export const test = base.extend<{ errors: string[] }>({
  errors: async ({ page }, provide) => {
    const errors: string[] = []
    page.on('pageerror', (e) => errors.push(String(e)))
    page.on('console', (m) => {
      if (m.type() === 'error') errors.push(m.text())
    })
    await provide(errors)
    expect(errors, 'erreurs dans la page').toEqual([])
  },
})

export { expect }
