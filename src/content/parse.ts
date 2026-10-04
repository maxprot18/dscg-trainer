/**
 * Lecture des fichiers d'exercices avec les schémas Zod (valeurs par défaut comprises).
 * Module séparé, chargé avec le contenu, pour garder Zod hors du fichier JS principal.
 */
import { contentFileSchema, type Exercise } from './schema'

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
