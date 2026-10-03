/**
 * Chargement du contenu (/content) dans l'app.
 * Les exercices non vérifiés (verified: false) ne sont jamais servis en production (SPEC).
 */
import taxonomyJson from '@content/taxonomy.json'
import { contentFileSchema, taxonomySchema, type Exercise, type Taxonomy } from './schema'

const files = import.meta.glob<unknown>(['/content/**/*.json', '!/content/taxonomy.json'], {
  eager: true,
  import: 'default',
})

export const taxonomy: Taxonomy = taxonomySchema.parse(taxonomyJson)

export function parseExercises(modules: Record<string, unknown>, includeUnverified: boolean): Exercise[] {
  return Object.entries(modules)
    .flatMap(([path, data]) => {
      const parsed = contentFileSchema.safeParse(data)
      if (!parsed.success) {
        console.error(`Contenu invalide ignoré : ${path}`, parsed.error.issues)
        return []
      }
      return parsed.data.exercises
    })
    .filter((ex) => includeUnverified || ex.verified)
}

export const exercises: Exercise[] = parseExercises(files, import.meta.env.DEV)
