/**
 * Chargement des sujets d'oral de l'UE 6 (un fichier JS à part, chargé seulement sur l'écran d'oral).
 * Les sujets non vérifiés sont retirés au build (build/stripUnverified.ts) et filtrés ici en seconde ligne.
 */
import type { OralTopic } from './oral'

const files = import.meta.glob<{ topics: OralTopic[] }>('/content/oral/*.json', { import: 'default' })

export async function loadOralTopics(): Promise<OralTopic[]> {
  const mods = await Promise.all(Object.values(files).map((load) => load()))
  const all = mods.flatMap((m) => m.topics).sort((a, b) => a.id.localeCompare(b.id))
  return import.meta.env.DEV ? all : all.filter((t) => t.verified)
}
