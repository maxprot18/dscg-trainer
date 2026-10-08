/**
 * Module virtuel `virtual:exercise-index` : pour chaque exercice publié, le fichier de contenu qui le
 * contient. La page d'un exercice charge ainsi ce seul fichier au lieu de toute l'UE. L'index est un
 * fichier JS à part, chargé à la demande (quelques Ko compressés).
 * Au build de production, seuls les exercices vérifiés y figurent (comme dans le contenu publié).
 */
import { readdirSync, readFileSync } from 'node:fs'
import { join, relative } from 'node:path'
import type { Plugin } from 'vite'

const ID = 'virtual:exercise-index'
const RESOLVED = `\0${ID}`

/** `{ files: [chemin], ids: { id: indice du fichier } }`, chemins au format des clés de import.meta.glob. */
export function buildExerciseIndex(root: string, verifiedOnly: boolean): { files: string[]; ids: Record<string, number> } {
  const contentDir = join(root, 'content')
  const files: string[] = []
  const ids: Record<string, number> = {}
  const walk = (dir: string) => {
    for (const entry of readdirSync(dir, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name))) {
      const path = join(dir, entry.name)
      if (entry.isDirectory()) {
        if (entry.name !== 'oral' && entry.name !== 'courses') walk(path)
        continue
      }
      if (!entry.name.endsWith('.json') || entry.name === 'taxonomy.json') continue
      const data = JSON.parse(readFileSync(path, 'utf8')) as { exercises?: { id: string; verified?: boolean }[] }
      const list = (data.exercises ?? []).filter((e) => !verifiedOnly || e.verified === true)
      if (!list.length) continue
      const index = files.push(`/${relative(root, path).replace(/\\/g, '/')}`) - 1
      for (const e of list) ids[e.id] = index
    }
  }
  walk(contentDir)
  return { files, ids }
}

export function exerciseIndex(root: string): Plugin {
  let verifiedOnly = false
  return {
    name: 'dscg:exercise-index',
    configResolved(config) {
      verifiedOnly = config.command === 'build'
    },
    resolveId(id) {
      return id === ID ? RESOLVED : null
    },
    load(id) {
      if (id !== RESOLVED) return null
      return `export default ${JSON.stringify(buildExerciseIndex(root, verifiedOnly))}`
    },
  }
}
