// @vitest-environment node
import { exampleExercises } from '@/content/__fixtures__/examples'
import { exerciseSchema, type Exercise } from '@/content/schema'
import type { Attempt, Review } from '@/db/db'

import {
  buildCardsSession,
  buildErrorSession,
  buildExamSession,
  buildSmartSession,
  EXAM_SHARES,
  examGrade,
  SMART_PER_NOTION,
  smartNotionOrder,
  targetDifficulty,
} from './session'
import {
  buildSession,
  parseSessionSearch,
  QUICK_SESSION_FILES,
  sessionFiles,
  sessionSearch,
  timeLimit,
  type ExamDurations,
} from './sessionConfig'
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

  it('difficulté adaptative : le niveau visé monte avec la réussite récente sur la notion', () => {
    const tries = (results: boolean[]) => results.map((ok, i) => attempt(`x${i}`, 'n', ok, T0 + i))
    expect(targetDifficulty([])).toBe(1)
    expect(targetDifficulty(tries([false, false, true]))).toBe(1)
    expect(targetDifficulty(tries([true, false, true]))).toBe(2)
    // Seules les 5 dernières tentatives comptent.
    expect(targetDifficulty(tries([false, false, false, true, true, true, true, true]))).toBe(3)

    // Notion nouvelle : les exercices de niveau 1 d'abord ; notion bien réussie : niveau 3 d'abord.
    const levels = [1, 2, 3, 1, 2, 3].map((d, i) => ex(`m${i}`, { notion: 'm', difficulty: d as 1 | 2 | 3 }))
    const fresh = buildSmartSession(levels, { attempts: [], reviews: [] }, T0, 5)
    expect(fresh.map((e) => e.difficulty).sort()).toEqual([1, 1, 2])
    const strong = Array.from({ length: 5 }, (_, i) => attempt(`old${i}`, 'm', true, T0 - DAY_MS + i))
    const advanced = buildSmartSession(levels, { attempts: strong, reviews: [review('m', T0 - 1)] }, T0, 5)
    expect(advanced.map((e) => e.difficulty).sort()).toEqual([2, 3, 3])
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

describe('mode flashcards', () => {
  it('cartes de l’UE ou du thème, mélangées, limitées', () => {
    const cards = [
      ...Array.from({ length: 5 }, (_, i) => ex(`c${i}`, { type: 'flashcard', theme: 'ifrs' } as Partial<Exercise>)),
      ...Array.from({ length: 3 }, (_, i) => ex(`d${i}`, { type: 'flashcard', theme: 'conso' } as Partial<Exercise>)),
      ex('ue2', { type: 'flashcard', ue: 'UE2' } as Partial<Exercise>),
    ]
    const p = [...pool, ...cards]
    expect(buildCardsSession(p, undefined, 1)).toHaveLength(9)
    expect(buildCardsSession(p, { ue: 'UE4' }, 1)).toHaveLength(8)
    expect(buildCardsSession(p, { ue: 'UE4', theme: 'conso' }, 1).map((e) => e.id).sort()).toEqual(['d0', 'd1', 'd2'])
    expect(buildCardsSession(p, undefined, 1, 4)).toHaveLength(4)
    expect(buildCardsSession(pool, undefined, 1)).toEqual([])
    expect(parseSessionSearch(new URLSearchParams(sessionSearch({ mode: 'cards', seed: 3, scope: { ue: 'UE4', theme: 'conso' } })))).toEqual({
      mode: 'cards',
      seed: 3,
      scope: { ue: 'UE4', theme: 'conso' },
    })
    expect(parseSessionSearch(new URLSearchParams('mode=cards&seed=1'))).toEqual({ mode: 'cards', seed: 1 })
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

describe('test de positionnement et séance du jour', () => {
  const themed = [
    ...['t1', 't2', 't3'].flatMap((theme) => [
      ex(`${theme}-a`, { theme, difficulty: 1 }),
      ex(`${theme}-b`, { theme, difficulty: 2 }),
      ex(`${theme}-c`, { theme, type: 'flashcard' } as Partial<Exercise>),
    ]),
    ex('autre-ue', { ue: 'UE1', theme: 't9' }),
  ]

  it('une question par thème de l’UE, de préférence de niveau 2, sans flashcard', () => {
    const picked = buildSession({ mode: 'diagnostic', seed: 3, ue: mcq.ue }, themed, durations)
    expect(picked.map((e) => e.id)).toEqual(['t1-b', 't2-b', 't3-b'])
  })

  it('séance du jour limitée aux UE de l’examen ; configuration dans l’URL', () => {
    const picked = buildSession({ mode: 'smart', seed: 1, ues: ['UE1'] }, themed, durations)
    expect(picked.map((e) => e.id)).toEqual(['autre-ue'])
    const search = sessionSearch({ mode: 'smart', seed: 7, ues: ['UE1', 'UE4'] })
    expect(parseSessionSearch(new URLSearchParams(search))).toEqual({ mode: 'smart', seed: 7, ues: ['UE1', 'UE4'] })
    expect(parseSessionSearch(new URLSearchParams('mode=diagnostic&seed=2&ue=UE4'))).toEqual({ mode: 'diagnostic', seed: 2, ue: 'UE4' })
    expect(parseSessionSearch(new URLSearchParams('mode=diagnostic&seed=2'))).toBeNull()
    expect(timeLimit({ mode: 'diagnostic', seed: 2, ue: 'UE4' }, durations)).toBeNull()
  })
})

describe('examen blanc avec dossiers de type examen', () => {
  const dossier = (id: string, seconds: number) => ex(id, { type: 'case_study', dossier: true, estimated_seconds: seconds } as Partial<Exercise>)

  it('dossiers en tête, dans la limite de 60 % du temps, exclus des autres sessions', () => {
    const shorts = Array.from({ length: 40 }, (_, i) => ex(`q${i}`, { estimated_seconds: 120 }))
    const pool = [dossier('d1', 4800), dossier('d2', 4800), dossier('d3', 4800), ...shorts]
    const exam = buildSession({ mode: 'exam', seed: 1, ue: mcq.ue }, pool, durations)
    const ds = exam.filter((e) => e.id.startsWith('d'))
    expect(ds).toHaveLength(1) // 240 min × 60 % = 144 min : un seul dossier de 80 min… et pas deux (160 min)
    expect(exam[0].id).toBe(ds[0].id)
    expect(exam.reduce((s, e) => s + e.estimated_seconds, 0)).toBeLessThanOrEqual(240 * 60)
    for (const config of [{ mode: 'quick', seed: 1 }, { mode: 'smart', seed: 1 }, { mode: 'theme', seed: 1, scope: { ue: mcq.ue } }] as const) {
      expect(buildSession(config, pool, durations).some((e) => e.id.startsWith('d'))).toBe(false)
    }
  })
})

describe('sujet complet', () => {
  const dossier = (id: string, seconds: number) => ex(id, { type: 'case_study', dossier: true, estimated_seconds: seconds } as Partial<Exercise>)
  const caseStudy = (id: string, seconds: number) => ex(id, { type: 'case_study', estimated_seconds: seconds } as Partial<Exercise>)

  it('des dossiers jusqu’à la durée de l’épreuve, complétés par des cas, sans questions courtes', () => {
    const pool = [dossier('d1', 4800), dossier('d2', 5400), dossier('d3', 5400), caseStudy('c1', 600), caseStudy('c2', 900), ...pool6()]
    const full = buildSession({ mode: 'full', seed: 3, ue: mcq.ue }, pool, durations)
    const ds = full.filter((e) => e.id.startsWith('d'))
    expect(ds).toHaveLength(2) // 240 min : deux dossiers de 80-90 min, pas trois
    expect(full.slice(0, 2).every((e) => e.id.startsWith('d'))).toBe(true)
    expect(full.every((e) => e.type === 'case_study')).toBe(true)
    expect(full.reduce((s, e) => s + e.estimated_seconds, 0)).toBeLessThanOrEqual(240 * 60)
  })

  it('vide s’il y a moins de deux dossiers dans l’UE', () => {
    expect(buildSession({ mode: 'full', seed: 3, ue: mcq.ue }, [dossier('d1', 4800), ...pool6()], durations)).toEqual([])
  })

  it('URL, chrono et périmètre comme l’examen blanc', () => {
    const config = { mode: 'full', seed: 4, ue: 'UE2' } as const
    expect(parseSessionSearch(new URLSearchParams(sessionSearch(config).slice(1)))).toEqual(config)
    expect(parseSessionSearch(new URLSearchParams('mode=full&seed=4'))).toBeNull()
    expect(timeLimit(config, durations)).toBe(180 * 60)
  })

  function pool6() {
    return Array.from({ length: 6 }, (_, i) => ex(`q${i}`, { estimated_seconds: 120 }))
  }
})

describe('fichiers chargés par une session', () => {
  const slugs = { UE1: 'ue1-j', UE2: 'ue2-f', UE3: 'ue3-m', UE4: 'ue4-c', UE5: 'ue5-s', UE6: 'ue6-e' } as const
  const paths = [
    '/content/ue4-c/ifrs/ias-16.json',
    '/content/ue4-c/ifrs/ias-36.json',
    '/content/ue4-c/consolidation/perimetre.json',
    '/content/ue4-c/sujets-examen.json',
    '/content/ue4-c/sujets-examen-2.json',
    '/content/ue2-f/van.json',
    ...Array.from({ length: 30 }, (_, i) => `/content/ue1-j/t${i}/n.json`),
  ]
  const files = (config: Parameters<typeof sessionFiles>[0]) => sessionFiles(config, paths, slugs)

  it('thème : son dossier et les fichiers à la racine de l’UE ; examen : toute l’UE', () => {
    expect(files({ mode: 'theme', seed: 1, scope: { ue: 'UE4', theme: 'ifrs' } })).toEqual([
      '/content/ue4-c/ifrs/ias-16.json',
      '/content/ue4-c/ifrs/ias-36.json',
      '/content/ue4-c/sujets-examen.json',
      '/content/ue4-c/sujets-examen-2.json',
    ])
    expect(files({ mode: 'full', seed: 1, ue: 'UE4' })).toHaveLength(5)
    expect(files({ mode: 'theme', seed: 1, scope: { ue: 'UE2' } })).toEqual(['/content/ue2-f/van.json'])
  })

  it('session rapide : quelques fichiers tirés avec la graine, sans sujets d’examen ; sinon tout', () => {
    const quick = files({ mode: 'quick', seed: 9 })!
    expect(quick).toHaveLength(QUICK_SESSION_FILES)
    expect(quick.some((p) => p.includes('sujets-examen'))).toBe(false)
    expect(files({ mode: 'quick', seed: 9 })).toEqual(quick)
    expect(files({ mode: 'smart', seed: 9 })).toBeUndefined()
    expect(files({ mode: 'errors', seed: 9 })).toBeUndefined()
    expect(files({ mode: 'smart', seed: 9, ues: ['UE2'] })).toEqual(['/content/ue2-f/van.json'])
  })
})
