// @vitest-environment node
import { describe, expect, it } from 'vitest'
import {
  contentFileSchema,
  exerciseSchema,
  formatZodIssues,
  formatZodPath,
  taxonomySchema,
} from './schema.ts'
import { exampleExercises, exampleTaxonomy } from './__fixtures__/examples.ts'

type Json = Record<string, unknown>

const clone = <T>(v: T): T => structuredClone(v)

/** Exemple valide d'un type, modifié par `patch` (mutation sur une copie). */
function variant(type: keyof typeof exampleExercises, patch: (ex: Json) => void): Json {
  const ex = clone(exampleExercises[type]) as Json
  patch(ex)
  return ex
}

/** Parse et retourne les issues formatées `chemin : message`. */
function issuesOf(value: unknown): string[] {
  const r = exerciseSchema.safeParse(value)
  return r.success ? [] : formatZodIssues(r.error)
}

function expectIssueAt(value: unknown, path: string, messagePart?: string | RegExp): void {
  const issues = issuesOf(value)
  const match = issues.some((i) => {
    if (!i.startsWith(`${path} :`)) return false
    if (messagePart === undefined) return true
    return typeof messagePart === 'string' ? i.includes(messagePart) : messagePart.test(i)
  })
  expect(match, `issue attendue en "${path}" ${messagePart ?? ''}, obtenu :\n${issues.join('\n')}`).toBe(true)
}

describe('exemples valides', () => {
  for (const [type, ex] of Object.entries(exampleExercises)) {
    it(`${type} est valide`, () => {
      expect(issuesOf(ex)).toEqual([])
    })
  }

  it('applique les valeurs par défaut (tags, multiple)', () => {
    const ex = variant('mcq', (e) => {
      delete e.tags
      delete e.multiple
    })
    const parsed = exerciseSchema.parse(ex)
    expect(parsed.tags).toEqual([])
    expect(parsed.type === 'mcq' && parsed.multiple).toBe(false)
  })

  it('un fichier de contenu contenant les 8 types est valide', () => {
    const r = contentFileSchema.safeParse({ exercises: Object.values(exampleExercises) })
    expect(r.success).toBe(true)
  })
})

describe('champs communs', () => {
  it('rejette une clé inconnue (faute de frappe)', () => {
    expectIssueAt(variant('mcq', (e) => (e.explantion = 'x')), '(racine)', 'explantion')
  })
  it('id kebab-case', () => {
    expectIssueAt(variant('mcq', (e) => (e.id = 'UE4_ifrs')), 'id', 'kebab-case')
  })
  it('type inconnu', () => {
    expect(issuesOf(variant('mcq', (e) => (e.type = 'qcm'))).length).toBeGreaterThan(0)
  })
  it('ue hors UE1..UE6', () => {
    expectIssueAt(variant('mcq', (e) => (e.ue = 'UE7')), 'ue')
  })
  it('difficulty 1|2|3', () => {
    expectIssueAt(variant('mcq', (e) => (e.difficulty = 4)), 'difficulty')
  })
  it('source_ref obligatoire et non vide', () => {
    expectIssueAt(variant('mcq', (e) => delete e.source_ref), 'source_ref')
    expectIssueAt(variant('mcq', (e) => (e.source_ref = '   ')), 'source_ref', 'vide')
  })
  it('estimated_seconds entier > 0', () => {
    expectIssueAt(variant('mcq', (e) => (e.estimated_seconds = 0)), 'estimated_seconds')
    expectIssueAt(variant('mcq', (e) => (e.estimated_seconds = 1.5)), 'estimated_seconds')
  })
  it('explanation non vide', () => {
    expectIssueAt(variant('flashcard', (e) => (e.explanation = '')), 'explanation')
  })
  it('verified booléen obligatoire', () => {
    expectIssueAt(variant('mcq', (e) => delete e.verified), 'verified')
  })
})

describe('mcq', () => {
  it('2 à 6 options', () => {
    expectIssueAt(variant('mcq', (e) => (e.options = ['seule'])), 'options')
    expectIssueAt(variant('mcq', (e) => (e.options = ['a', 'b', 'c', 'd', 'e', 'f', 'g'])), 'options')
  })
  it('options uniques et non vides', () => {
    expectIssueAt(variant('mcq', (e) => (e.options = ['a', 'b', 'a ', 'c'])), 'options[2]', 'double')
    expectIssueAt(variant('mcq', (e) => (e.options = ['a', '', 'c'])), 'options[1]')
  })
  it('answer non vide, indices valides et uniques', () => {
    expectIssueAt(variant('mcq', (e) => (e.answer = [])), 'answer')
    expectIssueAt(variant('mcq', (e) => (e.answer = [4])), 'answer[0]', 'hors limites')
    expectIssueAt(variant('mcq', (e) => (e.answer = [-1])), 'answer[0]')
    expectIssueAt(
      variant('mcq', (e) => {
        e.answer = [1, 1]
        e.multiple = true
      }),
      'answer[1]',
      'double',
    )
  })
  it('plusieurs réponses => multiple: true', () => {
    expectIssueAt(variant('mcq', (e) => (e.answer = [0, 1])), 'multiple')
    expect(
      issuesOf(
        variant('mcq', (e) => {
          e.answer = [0, 1]
          e.multiple = true
        }),
      ),
    ).toEqual([])
  })
})

describe('true_false', () => {
  it('justification obligatoire', () => {
    expectIssueAt(variant('true_false', (e) => delete e.justification), 'justification')
  })
  it('answer booléen', () => {
    expectIssueAt(variant('true_false', (e) => (e.answer = 'vrai')), 'answer')
  })
})

describe('numeric', () => {
  it('expected_value fini', () => {
    expectIssueAt(variant('numeric', (e) => (e.expected_value = Number.POSITIVE_INFINITY)), 'expected_value')
    expectIssueAt(variant('numeric', (e) => (e.expected_value = '12')), 'expected_value')
  })
  it('tolérance : kind, valeur >= 0, relative en fraction', () => {
    expectIssueAt(variant('numeric', (e) => (e.tolerance = { kind: 'percent', value: 1 })), 'tolerance.kind')
    expectIssueAt(variant('numeric', (e) => (e.tolerance = { kind: 'absolute', value: -1 })), 'tolerance.value')
    expectIssueAt(variant('numeric', (e) => (e.tolerance = { kind: 'relative', value: 1 })), 'tolerance.value', 'fraction')
  })
  it('decimals entier', () => {
    expectIssueAt(variant('numeric', (e) => (e.decimals = 1.5)), 'decimals')
  })
})

describe('journal_entry', () => {
  const line = (account: string, debit: number, credit: number) => ({ account, label: 'x', debit, credit })
  it('au moins 2 lignes', () => {
    expectIssueAt(variant('journal_entry', (e) => (e.entries = [line('607', 100, 0)])), 'entries')
  })
  it('compte PCG valide', () => {
    expectIssueAt(
      variant('journal_entry', (e) => (e.entries = [line('9001', 100, 0), line('401', 0, 100)])),
      'entries[0].account',
      'PCG',
    )
    expectIssueAt(
      variant('journal_entry', (e) => (e.entries = [line('6', 100, 0), line('401', 0, 100)])),
      'entries[0].account',
    )
  })
  it('exactement un côté > 0 par ligne', () => {
    expectIssueAt(
      variant('journal_entry', (e) => (e.entries = [line('607', 100, 100), line('401', 0, 0)])),
      'entries[0]',
      'à la fois',
    )
    expectIssueAt(
      variant('journal_entry', (e) => (e.entries = [line('607', 100, 100), line('401', 0, 0)])),
      'entries[1]',
      'doit avoir',
    )
  })
  it('montants >= 0', () => {
    expectIssueAt(
      variant('journal_entry', (e) => (e.entries = [line('607', -100, 0), line('401', 0, 100)])),
      'entries[0].debit',
    )
  })
  it('équilibre débit = crédit (tolérance 0.005)', () => {
    expectIssueAt(
      variant('journal_entry', (e) => (e.entries = [line('607', 100, 0), line('401', 0, 99.99)])),
      'entries',
      'déséquilibrée',
    )
    expect(
      issuesOf(variant('journal_entry', (e) => (e.entries = [line('607', 0.1, 0), line('6061', 0.2, 0), line('401', 0, 0.3)]))),
    ).toEqual([])
  })
  it('au moins un débit et un crédit', () => {
    expectIssueAt(
      variant('journal_entry', (e) => (e.entries = [line('607', 100, 0), line('6061', 100, 0)])),
      'entries',
      'au crédit',
    )
  })
})

describe('case_study', () => {
  it('dossier de type examen : annexes, 6 à 15 sous-questions, barème et durée', () => {
    const many = (e: Json) => {
      const qs = e.sub_questions as Json[]
      e.sub_questions = Array.from({ length: 8 }, (_, i) => ({ ...qs[1], id: `q${i + 1}`, points: 2.5 }))
      e.total_points = 20
    }
    const dossier = variant('case_study', (e) => {
      many(e)
      e.dossier = true
      e.estimated_seconds = 3600
      e.annexes = [
        { title: 'Bilan', content: '| Poste | N |\n| --- | --- |\n| Actif | 100 |' },
        { title: 'Contrat', content: 'Extrait du contrat.' },
      ]
    })
    expect(exerciseSchema.safeParse(dossier).success).toBe(true)
    expectIssueAt(variant('case_study', (e) => (many(e), (e.dossier = true), (e.estimated_seconds = 3600))), 'annexes')
    expectIssueAt(variant('case_study', many), 'sub_questions')
    expectIssueAt(variant('case_study', (e) => (e.annexes = [{ title: 'A', content: 'B' }])), 'annexes')
  })

  it('3 à 5 sous-questions', () => {
    expectIssueAt(variant('case_study', (e) => (e.sub_questions = (e.sub_questions as Json[]).slice(0, 2))), 'sub_questions')
  })
  it('ids de sous-questions uniques', () => {
    expectIssueAt(
      variant('case_study', (e) => ((e.sub_questions as Json[])[1].id = (e.sub_questions as Json[])[0].id)),
      'sub_questions[1]',
      'double',
    )
  })
  it('points > 0', () => {
    expectIssueAt(variant('case_study', (e) => ((e.sub_questions as Json[])[0].points = 0)), 'sub_questions[0].points')
  })
  it('total_points = somme des points', () => {
    expectIssueAt(variant('case_study', (e) => (e.total_points = 99)), 'total_points', 'somme')
    expect(issuesOf(variant('case_study', (e) => delete e.total_points))).toEqual([])
  })
  it('kind inconnu', () => {
    expect(issuesOf(variant('case_study', (e) => ((e.sub_questions as Json[])[0].kind = 'essay'))).length).toBeGreaterThan(0)
  })
  it('règles QCM appliquées aux sous-questions', () => {
    expectIssueAt(
      variant('case_study', (e) => {
        const q = (e.sub_questions as Json[]).find((s) => s.kind === 'mcq') as Json
        q.answer = [0, 7]
      }),
      'sub_questions[0].answer[1]',
      'hors limites',
    )
    expectIssueAt(
      variant('case_study', (e) => ((e.sub_questions as Json[])[0].answer = [0, 1])),
      'sub_questions[0].multiple',
    )
  })
  it('règles d’écriture appliquées aux sous-questions', () => {
    expectIssueAt(
      variant('case_study', (e) => {
        const q = (e.sub_questions as Json[])[2]
        ;(q.entries as Json[])[0].debit = 1
      }),
      'sub_questions[2].entries',
      'déséquilibrée',
    )
  })
  it('sous-question open : key_points >= 1', () => {
    expectIssueAt(variant('case_study', (e) => ((e.sub_questions as Json[])[3].key_points = [])), 'sub_questions[3].key_points')
  })
  it('pas de statement sur un cas pratique', () => {
    expectIssueAt(variant('case_study', (e) => (e.statement = 'x')), '(racine)', 'statement')
  })
})

describe('consolidation_case', () => {
  it('au moins 2 entités, exactement une mère', () => {
    expectIssueAt(variant('consolidation_case', (e) => (e.entities = (e.entities as Json[]).slice(0, 1))), 'entities')
    expectIssueAt(
      variant('consolidation_case', (e) => ((e.entities as Json[])[1].is_parent = true)),
      'entities',
      'exactement une société mère',
    )
    expectIssueAt(
      variant('consolidation_case', (e) => delete (e.entities as Json[])[0].is_parent),
      'entities',
      'trouvé : 0',
    )
  })
  it('ids d’entités uniques', () => {
    expectIssueAt(
      variant('consolidation_case', (e) => ((e.entities as Json[])[2].id = 'mere')),
      'entities[2]',
      'double',
    )
  })
  it('liens vers des entités existantes, pourcentages 0..100', () => {
    expectIssueAt(variant('consolidation_case', (e) => ((e.links as Json[])[0].to = 'inconnue')), 'links[0].to', 'inconnue')
    expectIssueAt(variant('consolidation_case', (e) => ((e.links as Json[])[0].ownership_pct = 120)), 'links[0].ownership_pct')
    expectIssueAt(variant('consolidation_case', (e) => ((e.links as Json[])[0].voting_pct = -5)), 'links[0].voting_pct')
    expectIssueAt(variant('consolidation_case', (e) => ((e.links as Json[])[0].to = 'mere')), 'links[0]', 'elle-même')
  })
  it('steps : stage obligatoire et valide', () => {
    expectIssueAt(variant('consolidation_case', (e) => delete (e.steps as Json[])[0].stage), 'steps[0].stage')
    expectIssueAt(variant('consolidation_case', (e) => ((e.steps as Json[])[0].stage = 'goodwill')), 'steps[0].stage')
    expectIssueAt(variant('consolidation_case', (e) => (e.steps = [])), 'steps')
  })
  it('règles des sous-questions appliquées aux étapes', () => {
    expectIssueAt(
      variant('consolidation_case', (e) => ((e.steps as Json[])[0].answer = [5])),
      'steps[0].answer[0]',
      'hors limites',
    )
  })
})

describe('audit_case', () => {
  it('cycle valide', () => {
    expectIssueAt(variant('audit_case', (e) => (e.cycle = 'ventes')), 'cycle')
  })
  it('procédures : >= 3 options, indices valides', () => {
    expectIssueAt(variant('audit_case', (e) => ((e.procedures as Json).options = ['a', 'b'])), 'procedures.options')
    expectIssueAt(variant('audit_case', (e) => ((e.procedures as Json).answer = [9])), 'procedures.answer[0]', 'hors limites')
    expectIssueAt(variant('audit_case', (e) => ((e.procedures as Json).answer = [])), 'procedures.answer')
  })
  it('risque : >= 2 options, indice valide, rationale', () => {
    expectIssueAt(variant('audit_case', (e) => ((e.risk as Json).answer = 3)), 'risk.answer', 'hors limites')
    expectIssueAt(variant('audit_case', (e) => ((e.risk as Json).options = ['élevé'])), 'risk.options')
    expectIssueAt(variant('audit_case', (e) => delete (e.risk as Json).rationale), 'risk.rationale')
  })
  it('conclusion : key_points >= 1', () => {
    expectIssueAt(variant('audit_case', (e) => ((e.conclusion as Json).key_points = [])), 'conclusion.key_points')
  })
})

describe('flashcard', () => {
  it('front et back obligatoires, pas de statement', () => {
    expectIssueAt(variant('flashcard', (e) => delete e.back), 'back')
    expectIssueAt(variant('flashcard', (e) => (e.statement = 'x')), '(racine)', 'statement')
  })
})

describe('taxonomie', () => {
  it('exemple valide', () => {
    const r = taxonomySchema.safeParse(exampleTaxonomy)
    expect(r.success ? [] : formatZodIssues(r.error)).toEqual([])
  })

  const taxIssues = (patch: (t: Json) => void) => {
    const t = clone(exampleTaxonomy) as unknown as Json
    patch(t)
    const r = taxonomySchema.safeParse(t)
    return r.success ? [] : formatZodIssues(r.error)
  }
  type T = { ues: { id: string; slug: string; themes: { id: string; notions: Json[] }[] }[] }

  it('clé inconnue rejetée (schéma strict)', () => {
    expect(taxIssues((t) => (t.programme = 'x')).join('\n')).toMatch(/programme/)
  })
  it('ids kebab-case', () => {
    expect(taxIssues((t) => ((t as unknown as T).ues[0].themes[0].id = 'IFRS'))).toContainEqual(
      expect.stringMatching(/^ues\[0\]\.themes\[0\]\.id :/),
    )
  })
  it('UE ids uniques', () => {
    expect(taxIssues((t) => ((t as unknown as T).ues[1].id = 'UE4'))).toContainEqual(expect.stringMatching(/^ues\[1\] : Identifiant d’UE en double/))
  })
  it('theme ids uniques dans l’UE', () => {
    expect(
      taxIssues((t) => {
        const ue = (t as unknown as T).ues[0]
        ue.themes.push({ ...ue.themes[0], notions: [] })
      }),
    ).toContainEqual(expect.stringMatching(/^ues\[0\]\.themes\[\d\] : Identifiant de thème/))
  })
  it('notion ids uniques dans tout le fichier', () => {
    expect(
      taxIssues((t) => {
        const tt = t as unknown as T
        tt.ues[1].themes[0].notions[0].id = tt.ues[0].themes[0].notions[0].id as string
      }),
    ).toContainEqual(expect.stringMatching(/^ues\[1\]\.themes\[0\]\.notions\[0\]\.id : Identifiant de notion .* en double/))
  })
  it('group => group_title', () => {
    expect(
      taxIssues((t) => {
        const n = (t as unknown as T).ues[0].themes[1].notions[0]
        delete n.group_title
      }),
    ).toContainEqual(expect.stringMatching(/group_title : /))
  })
  it('weight > 0, target_v1 entier >= 0, exam nullable', () => {
    const issues = taxIssues((t) => {
      const ue = (t as unknown as { ues: Json[] }).ues[0]
      ue.weight = 0
      ue.target_v1 = 1.5
      ue.exam = { duration_minutes: null, coefficient: null, ects: null, format: null }
    })
    expect(issues).toHaveLength(2)
  })
})

describe('formatZodPath', () => {
  it('formate les chemins', () => {
    expect(formatZodPath(['exercises', 3, 'options'])).toBe('exercises[3].options')
    expect(formatZodPath([0, 'a'])).toBe('[0].a')
    expect(formatZodPath([])).toBe('(racine)')
  })
})
