import { describe, expect, it } from 'vitest'

import { parseProgressExport } from './exportSchema'

const valid = {
  app: 'dscg-trainer',
  version: 2,
  exportedAt: '2026-10-08T10:00:00.000Z',
  attempts: [{ id: 1, exerciseId: 'ue4-ifrs-ias16-0001', notion: 'ias-16-immobilisations', date: 1, answer: 2, correct: true, durationMs: 4000 }],
  reviews: [{ notion: 'ias-16-immobilisations', due: 2, interval: 1, ease: 2.5, repetitions: 1, lapses: 0 }],
  sessions: [{ id: 1, mode: 'quick', startedAt: 1, exerciseIds: ['ue4-ifrs-ias16-0001'] }],
  marks: [{ kind: 'read', target: 'ias-16-immobilisations', date: 1 }],
}

describe('parseProgressExport', () => {
  it('accepte un export valide', () => {
    expect(parseProgressExport(JSON.stringify(valid)).attempts).toHaveLength(1)
  })

  it('refuse un texte qui n’est pas du JSON', () => {
    expect(() => parseProgressExport('pas du json')).toThrow(/JSON valide/)
  })

  it('refuse un autre fichier JSON', () => {
    expect(() => parseProgressExport(JSON.stringify({ app: 'autre' }))).toThrow(/non reconnu/)
  })

  it('refuse un enregistrement abîmé en indiquant où', () => {
    const broken = { ...valid, attempts: [{ ...valid.attempts[0], correct: 'oui' }] }
    expect(() => parseProgressExport(JSON.stringify(broken))).toThrow(/attempts\.0\.correct/)
  })
})
