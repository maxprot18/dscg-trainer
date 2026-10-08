/// <reference types="vitest/config" />
import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath, URL } from 'node:url'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

import pkg from './package.json' with { type: 'json' }
import { contentSecurityPolicy } from './build/contentSecurityPolicy.ts'
import { stripUnverified } from './build/stripUnverified.ts'

/**
 * Nombre d'exercices vérifiés par UE (`UE4`), thème (`UE4/ifrs`) et notion (`notion:ias16`), et au
 * total : les écrans l'affichent sans attendre le chargement de tout le contenu.
 */
function countVerifiedExercises(dir: string, counts: Record<string, number> = { total: 0 }): Record<string, number> {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name)
    if (entry.isDirectory()) countVerifiedExercises(path, counts)
    else if (entry.name.endsWith('.json') && entry.name !== 'taxonomy.json') {
      type Ex = { verified?: boolean; ue: string; theme: string; notion: string }
      const data = JSON.parse(readFileSync(path, 'utf8')) as { exercises?: Ex[] }
      for (const e of data.exercises ?? []) {
        if (e.verified !== true) continue
        for (const key of ['total', e.ue, `${e.ue}/${e.theme}`, `notion:${e.notion}`]) counts[key] = (counts[key] ?? 0) + 1
      }
    }
  }
  return counts
}

// GitHub Pages sert le site sous /dscg-trainer/ ; en dev on reste à la racine.
const base = process.env.VITE_BASE ?? (process.env.NODE_ENV === 'production' ? '/dscg-trainer/' : '/')

export default defineConfig({
  base,
  define: {
    __APP_VERSION__: JSON.stringify(pkg.version),
    __EXERCISE_COUNTS__: JSON.stringify(countVerifiedExercises(fileURLToPath(new URL('./content', import.meta.url)))),
  },
  plugins: [
    stripUnverified(),
    contentSecurityPolicy(),
    react(),
    tailwindcss(),
    VitePWA({
      // Mise à jour sur demande : un bandeau « nouvelle version » propose de recharger (PwaBanner).
      registerType: 'prompt',
      includeAssets: ['favicon.svg', 'favicon.ico', 'apple-touch-icon-180x180.png'],
      manifest: {
        name: 'DSCG Trainer',
        short_name: 'DSCG',
        description: "Entraînement au DSCG : audit, comptabilité, IFRS, consolidation, finance, droit, fiscalité.",
        lang: 'fr',
        start_url: '.',
        scope: '.',
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#ffffff',
        theme_color: '#1e3a8a',
        icons: [
          { src: 'pwa-192x192.png', sizes: '192x192', type: 'image/png' },
          { src: 'pwa-512x512.png', sizes: '512x512', type: 'image/png' },
          { src: 'maskable-icon-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,ico,json,woff2}'],
        navigateFallback: 'index.html',
        // Le contenu d'une UE tient dans un seul fichier JS (UE 4 : ~1,3 Mo) : on relève la limite
        // de précache (2 Mo par défaut) pour que tout reste disponible hors ligne.
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
      },
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@content': fileURLToPath(new URL('./content', import.meta.url)),
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
    include: ['src/**/*.test.{ts,tsx}', 'scripts/**/*.test.ts', 'build/**/*.test.ts'],
  },
})
