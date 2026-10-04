/**
 * Plugin Vite : au build de production, retire des fichiers de contenu (content/**.json)
 * les exercices non vérifiés, pour qu'ils ne soient jamais publiés (SPEC). En dev, tout
 * est conservé ; le filtre à l'exécution (src/content/load.ts) reste en seconde ligne.
 */
import type { Plugin } from 'vite'

export function stripUnverifiedExercises(json: string): string {
  const data = JSON.parse(json) as { exercises?: { verified?: unknown }[] }
  if (!Array.isArray(data.exercises)) return json
  return JSON.stringify({ ...data, exercises: data.exercises.filter((e) => e.verified === true) })
}

export function stripUnverified(): Plugin {
  return {
    name: 'dscg:strip-unverified',
    apply: 'build',
    enforce: 'pre',
    transform(code, id) {
      const path = id.split('?')[0].replace(/\\/g, '/')
      if (!/\/content\/.+\.json$/.test(path) || path.endsWith('/content/taxonomy.json')) return null
      return { code: stripUnverifiedExercises(code), map: null }
    },
  }
}
