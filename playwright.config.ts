/**
 * Tests de bout en bout (Chromium, mobile) sur le build de production servi par `vite preview`.
 * Lancer : `npm run build && npm run test:e2e`.
 */
import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: 'e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 0,
  reporter: process.env.CI ? 'github' : 'list',
  use: {
    baseURL: 'http://localhost:4173/dscg-trainer/',
    ...devices['Pixel 7'],
    trace: 'retain-on-failure',
  },
  projects: [{ name: 'chromium-mobile', use: { browserName: 'chromium' } }],
  webServer: {
    command: 'npx vite preview --port 4173 --strictPort',
    url: 'http://localhost:4173/dscg-trainer/',
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
  },
})
