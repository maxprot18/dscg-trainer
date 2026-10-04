// @vitest-environment node
import { exampleExercises } from '@/content/__fixtures__/examples'
import { exerciseSchema, type Exercise } from '@/content/schema'

import {
  combineResults,
  gradeChoice,
  gradeExercise,
  gradeJournal,
  gradeNumeric,
  gradeOpen,
  isWithinTolerance,
  PASS_THRESHOLD,
  type PartResponse,
} from './grading'
import { exerciseParts } from './parts'

const ex = (type: keyof typeof exampleExercises): Exercise => exerciseSchema.parse(exampleExercises[type])

describe('QCM', () => {
  it('réponse unique : tout ou rien', () => {
    expect(gradeChoice([1], false, [1])).toEqual({ score: 1, correct: true })
    expect(gradeChoice([1], false, [2])).toEqual({ score: 0, correct: false })
    expect(gradeChoice([1], false, [])).toEqual({ score: 0, correct: false })
  })

  it('réponses multiples : crédit partiel, mauvaises réponses pénalisées', () => {
    expect(gradeChoice([0, 1, 3], true, [0, 1, 3]).correct).toBe(true)
    expect(gradeChoice([0, 1, 3], true, [0, 1]).score).toBeCloseTo(2 / 3)
    expect(gradeChoice([0, 1, 3], true, [0, 1, 2]).score).toBeCloseTo(1 / 3)
    expect(gradeChoice([0, 1], true, [2, 3]).score).toBe(0)
  })
})

describe('calculs', () => {
  it('tolérance relative et absolue', () => {
    expect(isWithinTolerance(19900, 19781.3, { kind: 'relative', value: 0.01 })).toBe(true)
    expect(isWithinTolerance(20000, 19781.3, { kind: 'relative', value: 0.01 })).toBe(false)
    expect(isWithinTolerance(48.1, 48, { kind: 'absolute', value: 0.1 })).toBe(true)
    expect(isWithinTolerance(48.2, 48, { kind: 'absolute', value: 0.1 })).toBe(false)
    expect(isWithinTolerance(48, 48, { kind: 'absolute', value: 0 })).toBe(true)
  })

  it('lit la saisie au format français', () => {
    expect(gradeNumeric(19781.3, { kind: 'relative', value: 0.01 }, '19 781,30 €')).toMatchObject({ correct: true, parsed: 19781.3 })
    expect(gradeNumeric(19781.3, { kind: 'relative', value: 0.01 }, 'beaucoup')).toMatchObject({ correct: false, parsed: null })
  })
})

describe('écritures : correction compte par compte', () => {
  const expected = [
    { account: '607', label: '', debit: 1000, credit: 0 },
    { account: '4456', label: '', debit: 200, credit: 0 },
    { account: '401', label: '', debit: 0, credit: 1200 },
  ]

  it('accepte une écriture juste, dans n’importe quel ordre, avec sous-compte plus détaillé', () => {
    const r = gradeJournal(expected, [
      { account: '401', debit: 0, credit: 1200 },
      { account: '44566', debit: 200, credit: 0 },
      { account: '607', debit: 1000, credit: 0 },
    ])
    expect(r.correct).toBe(true)
    expect(r.score).toBe(1)
  })

  it('agrège les lignes d’un même compte', () => {
    const r = gradeJournal(expected, [
      { account: '607', debit: 600, credit: 0 },
      { account: '607', debit: 400, credit: 0 },
      { account: '4456', debit: 200, credit: 0 },
      { account: '401', debit: 0, credit: 1200 },
    ])
    expect(r.correct).toBe(true)
  })

  it('signale montant faux, sens inversé, compte manquant et compte en trop', () => {
    const r = gradeJournal(expected, [
      { account: '607', debit: 900, credit: 0 },
      { account: '4456', debit: 0, credit: 200 },
      { account: '411', debit: 0, credit: 1200 },
    ])
    const status = Object.fromEntries(r.accounts!.map((a) => [a.account, a.status]))
    expect(status).toEqual({ '607': 'wrong-amount', '4456': 'wrong-side', '401': 'missing', '411': 'extra' })
    expect(r.correct).toBe(false)
    expect(r.score).toBe(0)
  })

  it('note la part des comptes justes', () => {
    const r = gradeJournal(expected, [
      { account: '607', debit: 1000, credit: 0 },
      { account: '4456', debit: 200, credit: 0 },
      { account: '401', debit: 0, credit: 1000 },
    ])
    expect(r.score).toBeCloseTo(2 / 3)
  })

  it('n’accepte pas un compte moins détaillé que l’attendu', () => {
    const r = gradeJournal([{ account: '6815', label: '', debit: 10, credit: 0 }, { account: '1511', label: '', debit: 0, credit: 10 }], [
      { account: '681', debit: 10, credit: 0 },
      { account: '1511', debit: 0, credit: 10 },
    ])
    expect(r.correct).toBe(false)
  })
})

describe('réponses rédigées', () => {
  it('note selon les points clés cochés', () => {
    expect(gradeOpen(['a', 'b'], [true, true])).toEqual({ score: 1, correct: true })
    expect(gradeOpen(['a', 'b', 'c'], [true, false, false]).correct).toBe(false)
  })
})

describe('gradeExercise, pour chacun des 8 types', () => {
  it('mcq, true_false, numeric, journal_entry, flashcard : une seule partie', () => {
    expect(gradeExercise(ex('mcq'), [{ kind: 'choice', selected: [1] }]).correct).toBe(true)
    expect(gradeExercise(ex('true_false'), [{ kind: 'boolean', value: true }]).correct).toBe(false)
    expect(gradeExercise(ex('numeric'), [{ kind: 'numeric', raw: '41,3' }]).correct).toBe(true)
    expect(
      gradeExercise(ex('journal_entry'), [
        {
          kind: 'journal',
          lines: [
            { account: '607', debit: 1000, credit: 0 },
            { account: '44566', debit: 200, credit: 0 },
            { account: '401', debit: 0, credit: 1200 },
          ],
        },
      ]).correct,
    ).toBe(true)
    expect(gradeExercise(ex('flashcard'), [{ kind: 'flashcard', known: false }]).score).toBe(0)
  })

  it('case_study : note pondérée par le barème', () => {
    const responses: PartResponse[] = [
      { kind: 'choice', selected: [0] }, // 2 pts
      { kind: 'numeric', raw: '20000' }, // 3 pts
      { kind: 'journal', lines: [] }, // 0 / 3 pts
      { kind: 'open', text: '', checked: [true, true] }, // 2 pts
    ]
    const r = gradeExercise(ex('case_study'), responses)
    expect(r.total).toBe(10)
    expect(r.earned).toBe(7)
    expect(r.correct).toBe(true)
  })

  it('consolidation_case : étapes avec stage', () => {
    const e = ex('consolidation_case')
    expect(exerciseParts(e).every((p) => p.stage !== undefined)).toBe(true)
    const r = gradeExercise(e, [
      { kind: 'choice', selected: [0] },
      { kind: 'numeric', raw: '50' },
      { kind: 'boolean', value: true },
    ])
    expect(r.earned).toBe(3)
    expect(r.correct).toBe(false)
  })

  it('audit_case : procédures (50 %), risque (25 %), conclusion (25 %)', () => {
    const e = ex('audit_case')
    const parts = exerciseParts(e)
    expect(parts.map((p) => p.id)).toEqual(['procedures', 'risk', 'conclusion'])
    const r = gradeExercise(e, [
      { kind: 'choice', selected: [0, 1, 3] },
      { kind: 'choice', selected: [2] },
      { kind: 'open', text: 'cut-off', checked: [true, false] },
    ])
    expect(r.score).toBeCloseTo(0.875)
    expect(r.correct).toBe(true)
  })

  it('une réponse d’un autre genre que la partie vaut zéro', () => {
    expect(gradeExercise(ex('mcq'), [{ kind: 'boolean', value: true }]).score).toBe(0)
  })

  it('le seuil de réussite des exercices composites est inclusif', () => {
    const parts = exerciseParts(ex('consolidation_case'))
    const r = combineResults(parts, [
      { score: 1, correct: true },
      { score: 1, correct: true },
      { score: 0, correct: false },
    ])
    expect(r.score).toBeCloseTo(0.8)
    expect(r.score >= PASS_THRESHOLD).toBe(r.correct)
  })
})
