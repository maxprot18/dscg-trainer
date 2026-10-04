// @vitest-environment node
import { exampleExercises } from '@/content/__fixtures__/examples'
import { exerciseSchema, type Exercise } from '@/content/schema'
import type { Attempt, Review } from '@/db/db'

import {
  buildErrorSession,
  buildExamSession,
  buildSmartSession,
  EXAM_SHARES,
  examGrade,
  SMART_PER_NOTION,
  smartNotionOrder,
} from './session'
import { buildSession, parseSessionSearch, sessionSearch, timeLimit, type ExamDurations } from './sessionConfig'
import { DAY_MS } from './srs'

const mcq = exerciseSchema.parse(exampleExercises.mcq)
const T0 = new Date(2026, 9, 5, 9, 0).getTime()
const durations: ExamDurations = { UE1: 240, UE2: 180, UE3: 240, UE4: 240, UE5: 180, UE6: 30 }

function ex(id: string, over: Partial<Exercise> = {}): Exercise {
  return { ...mcq, id, ...over } as Exercise
}
/** 6 notions de 5 exercices chacune. */
const pool = ['n1', 'n2', 'n3', 'n4', 'n5', 'n6'].flatMap((n) =>
  Array.from({ length: 5 }, (_, i) => ex(`${n}-${i}`, { notion: n })),
)
const review = (notion: string, due: number): Review => ({ notion, due, interval: 1, ease: 2.5, repetitions: 1, lapses: 0 })
const attempt = (exerciseId: string, notion: string, correct: boolean, date: number): Attempt => ({
  exerciseId,
  notion,
  correct,
  date,
  answer: [],
  durationMs: 1000,
})

describe('révision intelligente', () => {
  it('ordre : révisions échues (les plus en retard d’abord), puis notions nouvelles, puis à venir', () => {
    const snapshot = {
      reviews: [review('n1', T0 - DAY_MS), review('n2', T0 - 3 * DAY_MS), review('n3', T0 + DAY_MS)],
      attempts: [attempt('n1-0', 'n1', true, T0 - 2 * DAY_MS)],
    }
    const order = smartNotionOrder(pool, snapshot, T0, 1)
    expect(order.slice(0, 2)).toEqual(['n2', 'n1'])
    expect(order.slice(2, 5).sort()).toEqual(['n4', 'n5', 'n6'])
    expect(order[5]).toBe('n3')
  })

  it('au plus 3 exercices par notion, jamais faits puis ratés avant réussis, série de 20', () => {
    const attempts = [
      attempt('n2-0', 'n2', true, T0 - 3 * DAY_MS),
      attempt('n2-1', 'n2', true, T0 - 3 * DAY_MS),
      attempt('n2-2', 'n2', false, T0 - 3 * DAY_MS),
      attempt('n2-3', 'n2', true, T0 - 3 * DAY_MS),
    ]
    const s = buildSmartSession(pool, { attempts, reviews: [review('n2', T0 - DAY_MS)] }, T0, 7)
    expect(s).toHaveLength(18)
    const n2 = s.filter((e) => e.notion === 'n2').map((e) => e.id).sort()
    // n2-4 (jamais fait) et n2-2 (raté) passent avant les exercices réussis.
    expect(n2).toHaveLength(3)
    expect(n2).toEqual(expect.arrayContaining(['n2-2', 'n2-4']))
    for (const n of new Set(s.map((e) => e.notion))) expect(s.filter((e) => e.notion === n).length).toBeLessThanOrEqual(SMART_PER_NOTION)
    expect(buildSmartSession(pool, { attempts, reviews: [] }, T0, 7, 20)).toHaveLength(18)
  })

  it('déterministe pour une graine et un historique donnés', () => {
    const snap = { attempts: [], reviews: [review('n3', T0)] }
    expect(buildSmartSession(pool, snap, T0, 3).map((e) => e.id)).toEqual(buildSmartSession(pool, snap, T0, 3).map((e) => e.id))
  })
})

describe('mode erreurs', () => {
  it('ne garde que les exercices dont la dernière tentative est ratée, filtrable par UE', () => {
    const p = [...pool, ex('ue2-x', { ue: 'UE2' })]
    const attempts = [
      attempt('n1-0', 'n1', false, T0),
      attempt('n1-1', 'n1', false, T0),
      attempt('n1-1', 'n1', true, T0 + 1),
      attempt('ue2-x', 'n1', false, T0),
      attempt('supprime', 'n1', false, T0),
    ]
    expect(buildErrorSession(p, attempts, 1).map((e) => e.id).sort()).toEqual(['n1-0', 'ue2-x'])
    expect(buildErrorSession(p, attempts, 1, 'UE2').map((e) => e.id)).toEqual(['ue2-x'])
    expect(buildErrorSession(p, [], 1)).toEqual([])
  })
})

describe('examen blanc', () => {
  const examPool: Exercise[] = [
    ...Array.from({ length: 60 }, (_, i) => ex(`q${i}`, { estimated_seconds: 60 })),
    ...Array.from({ length: 30 }, (_, i) => ex(`c${i}`, { type: 'numeric', estimated_seconds: 240 } as Partial<Exercise>)),
    ...Array.from({ length: 30 }, (_, i) => ex(`k${i}`, { type: 'case_study', estimated_seconds: 600 } as Partial<Exercise>)),
    ex('f', { type: 'flashcard', estimated_seconds: 30 } as Partial<Exercise>),
    ex('autre', { ue: 'UE2' }),
  ]

  it('remplit la durée de l’épreuve avec la répartition questions / calculs / cas, sans flashcard', () => {
    const s = buildExamSession(examPool, 'UE4', 240, 5)
    const time = (t: string[]) => s.filter((e) => t.includes(e.type)).reduce((n, e) => n + e.estimated_seconds, 0)
    const total = s.reduce((n, e) => n + e.estimated_seconds, 0)
    expect(total).toBeLessThanOrEqual(240 * 60)
    expect(total).toBeGreaterThan(240 * 60 * 0.95)
    // Part des questions : 20 % du temps, plus le reliquat comblé en fin de tirage.
    expect(time(['mcq', 'true_false'])).toBeGreaterThanOrEqual(240 * 60 * EXAM_SHARES.questions - 60)
    expect(time(['mcq', 'true_false'])).toBeLessThanOrEqual(240 * 60 * 0.25)
    expect(time(['case_study'])).toBeGreaterThan(240 * 60 * 0.5)
    expect(s.some((e) => e.type === 'flashcard' || e.ue !== 'UE4')).toBe(false)
    // Questions, puis calculs, puis cas.
    expect(s[0].type).toBe('mcq')
    expect(s[s.length - 1].type).toBe('case_study')
  })

  it('complète avec les autres types quand une catégorie manque', () => {
    const onlyQuestions = Array.from({ length: 300 }, (_, i) => ex(`q${i}`, { estimated_seconds: 60 }))
    expect(buildExamSession(onlyQuestions, 'UE4', 180, 1)).toHaveLength(180)
  })

  it('note sur 20 pondérée par la durée estimée, exercice non traité = 0', () => {
    const exs = [ex('a', { estimated_seconds: 100 }), ex('b', { estimated_seconds: 300 })]
    expect(examGrade(exs, new Map([['a', 1], ['b', 1]]))).toBe(20)
    expect(examGrade(exs, new Map([['b', 0.5]]))).toBe(7.5)
    expect(examGrade([], new Map())).toBe(0)
  })
})

describe('configuration des nouveaux modes', () => {
  it('aller-retour URL et durée limite', () => {
    for (const config of [
      { mode: 'smart', seed: 4 } as const,
      { mode: 'errors', seed: 5 } as const,
      { mode: 'errors', seed: 5, ue: 'UE2' } as const,
      { mode: 'exam', seed: 6, ue: 'UE4' } as const,
    ]) {
      expect(parseSessionSearch(new URLSearchParams(sessionSearch(config)))).toEqual(config)
    }
    expect(parseSessionSearch(new URLSearchParams('mode=exam&seed=1'))).toBeNull()
    expect(parseSessionSearch(new URLSearchParams('mode=errors&seed=1&ue=UE9'))).toBeNull()
    expect(timeLimit({ mode: 'exam', seed: 1, ue: 'UE2' }, durations)).toBe(180 * 60)
    expect(timeLimit({ mode: 'smart', seed: 1 }, durations)).toBeNull()
  })

  it('construit chaque mode', () => {
    const snapshot = { attempts: [attempt('n1-0', 'n1', false, T0)], reviews: [] }
    expect(buildSession({ mode: 'errors', seed: 1 }, pool, durations, snapshot).map((e) => e.id)).toEqual(['n1-0'])
    expect(buildSession({ mode: 'smart', seed: 1 }, pool, durations, snapshot, T0).length).toBeGreaterThan(0)
    expect(buildSession({ mode: 'exam', seed: 1, ue: 'UE4' }, pool, durations).length).toBe(pool.length)
  })
})
