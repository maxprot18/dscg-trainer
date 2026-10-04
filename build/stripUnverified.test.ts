// @vitest-environment node
import { describe, expect, it } from 'vitest'

import { stripUnverifiedExercises } from './stripUnverified.ts'

describe('stripUnverifiedExercises', () => {
  it('ne garde que les exercices vérifiés', () => {
    const out = JSON.parse(
      stripUnverifiedExercises(JSON.stringify({ exercises: [{ id: 'a', verified: true }, { id: 'b', verified: false }, { id: 'c' }] })),
    )
    expect(out.exercises.map((e: { id: string }) => e.id)).toEqual(['a'])
  })

  it('laisse intact un JSON qui n’est pas un fichier d’exercices', () => {
    const src = JSON.stringify({ ues: [] })
    expect(stripUnverifiedExercises(src)).toBe(src)
  })
})
