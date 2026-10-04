// @vitest-environment node
import { exampleTaxonomy } from '@/content/__fixtures__/examples'
import { taxonomySchema } from '@/content/schema'
import type { Attempt, Session } from '@/db/db'

import { DAY_MS } from './srs'
import {
  currentStreak,
  failedExerciseIds,
  masteryOf,
  notionProgress,
  programProgress,
  sessionHistory,
  notionsToReview,
  totalTimeMs,
} from './stats'

const T0 = new Date(2026, 9, 5, 9, 0).getTime()
let seq = 0
function attempt(notion: string, correct: boolean, date: number, over: Partial<Attempt> = {}): Attempt {
  seq++
  return { id: seq, exerciseId: `${notion}-${seq}`, notion, correct, date, answer: [], durationMs: 60_000, ...over }
}

describe('statistiques de progression', () => {
  it('niveau de maîtrise', () => {
    expect(masteryOf(0, null)).toBe('new')
    expect(masteryOf(4, 0.25)).toBe('review')
    expect(masteryOf(2, 1)).toBe('progress')
    expect(masteryOf(5, 0.6)).toBe('progress')
    expect(masteryOf(3, 0.8)).toBe('mastered')
  })

  it('taux de réussite d’une notion sur ses 10 dernières tentatives', () => {
    const list = [
      ...Array.from({ length: 5 }, (_, i) => attempt('a', false, T0 + i)),
      ...Array.from({ length: 10 }, (_, i) => attempt('a', true, T0 + 10 + i)),
    ]
    const p = notionProgress(list).get('a')!
    expect(p).toMatchObject({ attempts: 15, recent: 10, recentCorrect: 10, rate: 1, mastery: 'mastered' })
  })

  it('progression du programme : toutes les notions, agrégats par thème et UE', () => {
    const taxonomy = taxonomySchema.parse(exampleTaxonomy)
    const firstNotion = taxonomy.ues[0].themes[0].notions[0].id
    const ues = programProgress(taxonomy, [attempt(firstNotion, true, T0), attempt(firstNotion, false, T0 + 1)])
    const notions = ues.flatMap((u) => u.themes.flatMap((t) => t.notions))
    expect(notions).toHaveLength(taxonomy.ues.flatMap((u) => u.themes.flatMap((t) => t.notions)).length)
    expect(ues[0]).toMatchObject({ attempts: 2, rate: 0.5, covered: 1 })
    expect(ues[0].counts.progress).toBe(1)
  })

  it('série de jours consécutifs, qui tient jusqu’au lendemain', () => {
    const days = [0, 1, 2, 4, 5, 6].map((d) => attempt('a', true, T0 + d * DAY_MS))
    expect(currentStreak(days, T0 + 6 * DAY_MS)).toBe(3)
    expect(currentStreak(days, T0 + 7 * DAY_MS)).toBe(3)
    expect(currentStreak(days, T0 + 8 * DAY_MS)).toBe(0)
    expect(currentStreak([], T0)).toBe(0)
  })

  it('erreurs : exercices dont la dernière tentative est ratée', () => {
    const list = [
      attempt('a', false, T0, { exerciseId: 'x' }),
      attempt('a', true, T0 + 1, { exerciseId: 'x' }),
      attempt('a', true, T0, { exerciseId: 'y' }),
      attempt('a', false, T0 + 2, { exerciseId: 'y' }),
      attempt('a', false, T0 + 3, { exerciseId: 'z' }),
    ]
    expect(failedExerciseIds(list)).toEqual(['z', 'y'])
  })

  it('historique des sessions et temps passé', () => {
    const sessions: Session[] = [
      { id: 1, mode: 'quick', startedAt: T0, exerciseIds: ['a', 'b'] },
      { id: 2, mode: 'exam', scope: 'UE4', startedAt: T0 + DAY_MS, exerciseIds: ['c'] },
    ]
    const list = [attempt('n', true, T0, { sessionId: 1 }), attempt('n', false, T0, { sessionId: 1 })]
    const h = sessionHistory(sessions, list)
    expect(h.map((s) => s.id)).toEqual([2, 1])
    expect(h[1]).toMatchObject({ planned: 2, answered: 2, correct: 1, durationMs: 120_000 })
    expect(totalTimeMs(list)).toBe(120_000)
  })

  it('notions à revoir après une session : ratées d’abord, les plus ratées en tête', () => {
    const e = (notion: string, correct: boolean) => ({ exercise: { notion }, result: { correct } })
    expect(notionsToReview([e('a', true), e('b', false), e('b', true), e('c', false), e('c', false)])).toEqual([
      { notion: 'c', failed: 2, total: 2 },
      { notion: 'b', failed: 1, total: 2 },
    ])
  })
})
