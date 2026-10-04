import { daysUntil, examPlan } from './plan'
import type { NotionProgress } from './stats'

const now = new Date(2026, 9, 4, 18).getTime()
const np = (notion: string, attempts: number, mastery: NotionProgress['mastery']): NotionProgress => ({
  notion,
  attempts,
  recent: attempts,
  recentCorrect: 0,
  rate: attempts ? 0.5 : null,
  mastery,
})
const notionsByUe = new Map([
  ['UE1' as const, Array.from({ length: 40 }, (_, i) => `a${i}`)],
  ['UE4' as const, Array.from({ length: 120 }, (_, i) => `b${i}`)],
])

describe('plan de révision', () => {
  it('jours restants en jours civils', () => {
    expect(daysUntil('2026-10-04', now)).toBe(0)
    expect(daysUntil('2026-10-05', now)).toBe(1)
    expect(daysUntil('2026-10-01', now)).toBe(-3)
  })

  it('découverte : notions restantes réparties avant les 14 derniers jours', () => {
    const progress = new Map([np('a0', 4, 'mastered'), np('a1', 2, 'review'), np('b0', 1, 'progress')].map((p) => [p.notion, p]))
    const plan = examPlan('2027-01-11', ['UE1', 'UE4'], notionsByUe, progress, now) // 99 jours
    expect(plan).toMatchObject({ daysLeft: 99, phase: 'learn', total: 160, seen: 3, mastered: 1, unseen: 157, fragile: 2 })
    expect(plan.newPerDay).toBe(Math.ceil(157 / 85))
    expect(plan.exercisesPerDay).toBe(plan.newPerDay * 5 + 5)
    expect(plan.perUe[0]).toEqual({ ue: 'UE1', total: 40, seen: 2, mastered: 1 })
  })

  it('consolidation quand tout est vu, dernière ligne droite à 14 jours, puis examen passé', () => {
    const all = new Map([...notionsByUe.get('UE1')!].map((n) => [n, np(n, 3, 'progress')]))
    expect(examPlan('2027-01-11', ['UE1'], notionsByUe, all, now)).toMatchObject({ phase: 'consolidate', newPerDay: 0, exercisesPerDay: 10 })
    expect(examPlan('2026-10-18', ['UE1'], notionsByUe, all, now)).toMatchObject({ phase: 'final', exercisesPerDay: 15 })
    expect(examPlan('2026-10-01', ['UE1'], notionsByUe, all, now)).toMatchObject({ phase: 'past', exercisesPerDay: 0 })
  })
})
