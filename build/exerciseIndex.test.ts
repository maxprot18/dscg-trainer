import { mkdirSync, mkdtempSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'

import { buildExerciseIndex } from './exerciseIndex.ts'

describe('index des exercices', () => {
  const root = mkdtempSync(join(tmpdir(), 'dscg-index-'))
  const write = (path: string, data: unknown) => {
    mkdirSync(join(root, path, '..'), { recursive: true })
    writeFileSync(join(root, path), JSON.stringify(data))
  }
  write('content/taxonomy.json', { ues: [] })
  write('content/ue1-fiscal/is/a.json', { exercises: [{ id: 'a1', verified: true }, { id: 'a2', verified: false }] })
  write('content/ue1-fiscal/is/b.json', { exercises: [{ id: 'b1', verified: false }] })
  write('content/oral/sujets.json', { topics: [] })

  it('associe chaque exercice à son fichier, au format des clés de import.meta.glob', () => {
    const index = buildExerciseIndex(root, false)
    expect(index.files).toEqual(['/content/ue1-fiscal/is/a.json', '/content/ue1-fiscal/is/b.json'])
    expect(index.ids).toEqual({ a1: 0, a2: 0, b1: 1 })
  })

  it('ne garde que les exercices vérifiés au build de production', () => {
    const index = buildExerciseIndex(root, true)
    expect(index.files).toEqual(['/content/ue1-fiscal/is/a.json'])
    expect(index.ids).toEqual({ a1: 0 })
  })
})
