// @vitest-environment node
import { exampleExercises } from '@/content/__fixtures__/examples'
import { exerciseSchema, type Exercise } from '@/content/schema'

import { buildQuickSession, buildThemeSession, QUICK_MAX_SECONDS, seededRandom, shuffle } from './session'

const base = exerciseSchema.parse(exampleExercises.mcq)
function make(n: number, over: Partial<Exercise> = {}): Exercise[] {
  return Array.from({ length: n }, (_, i) => ({ ...base, id: `ex-${over.theme ?? 't'}-${i}`, ...over }) as Exercise)
}

describe('sessions', () => {
  it('le mélange est déterministe pour une graine donnée et conserve les éléments', () => {
    const items = Array.from({ length: 20 }, (_, i) => i)
    expect(shuffle(items, seededRandom(42))).toEqual(shuffle(items, seededRandom(42)))
    expect(shuffle(items, seededRandom(42))).not.toEqual(shuffle(items, seededRandom(43)))
    expect([...shuffle(items, seededRandom(1))].sort((a, b) => a - b)).toEqual(items)
  })

  it('session rapide : 10 exercices, les courts d’abord', () => {
    const pool = [...make(8, { estimated_seconds: 60 }), ...make(8, { estimated_seconds: 600, theme: 'long' })]
    const s = buildQuickSession(pool, 7)
    expect(s).toHaveLength(10)
    expect(s.filter((e) => e.estimated_seconds <= QUICK_MAX_SECONDS)).toHaveLength(8)
    expect(new Set(s.map((e) => e.id)).size).toBe(10)
  })

  it('session rapide : renvoie tout le stock s’il est inférieur à 10', () => {
    expect(buildQuickSession(make(3), 1)).toHaveLength(3)
  })

  it('session par thème : filtre UE / thème / notion et trie par difficulté', () => {
    const pool = [
      ...make(3, { theme: 'ifrs', notion: 'a', difficulty: 3 }),
      ...make(2, { theme: 'conso', notion: 'b', difficulty: 1 }),
      { ...base, id: 'autre-ue', ue: 'UE2' } as Exercise,
    ]
    expect(buildThemeSession(pool, { ue: 'UE4' }, 1)).toHaveLength(5)
    expect(buildThemeSession(pool, { ue: 'UE4' }, 1).map((e) => e.difficulty)).toEqual([1, 1, 3, 3, 3])
    expect(buildThemeSession(pool, { ue: 'UE4', theme: 'conso' }, 1)).toHaveLength(2)
    expect(buildThemeSession(pool, { ue: 'UE4', theme: 'ifrs', notion: 'zzz' }, 1)).toHaveLength(0)
    expect(buildThemeSession(pool, { ue: 'UE2' }, 1).map((e) => e.id)).toEqual(['autre-ue'])
  })
})
