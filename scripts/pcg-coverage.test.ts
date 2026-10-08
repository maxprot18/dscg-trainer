// @vitest-environment node
import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'

import { pcgLabel } from '../src/content/pcg.ts'

type Line = { account: string | number }
type Item = { entries?: Line[]; sub_questions?: Item[]; steps?: Item[] }

/** Comptes des écritures attendues dans tout le contenu. */
function contentAccounts(dir: string, found = new Set<string>()): Set<string> {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name)
    if (entry.isDirectory()) {
      if (entry.name !== 'oral' && entry.name !== 'courses') contentAccounts(path, found)
    } else if (entry.name.endsWith('.json') && entry.name !== 'taxonomy.json') {
      const data = JSON.parse(readFileSync(path, 'utf8')) as { exercises?: Item[] }
      for (const ex of data.exercises ?? [])
        for (const item of [ex, ...(ex.sub_questions ?? []), ...(ex.steps ?? [])])
          for (const line of item.entries ?? []) found.add(String(line.account))
    }
  }
  return found
}

describe('comptes PCG de l’aide à la saisie', () => {
  it('chaque compte attendu par un corrigé a un libellé (pas de « Compte hors liste » sur une bonne réponse)', () => {
    const missing = [...contentAccounts(join(process.cwd(), 'content'))].filter((a) => pcgLabel(a) === undefined)
    expect(missing).toEqual([])
  })
})
