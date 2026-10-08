import { describe, expect, it } from 'vitest'

import { parseCourseDates } from './courseDates.ts'

describe('dates de révision des fiches', () => {
  it('garde la date du commit le plus récent de chaque fiche', () => {
    const log = [
      '2026-10-08',
      '',
      'content/courses/ias-16-immobilisations.md',
      '2026-09-01',
      '',
      'content/courses/ias-16-immobilisations.md',
      'content/courses/ifrs-16-contrats-location.md',
    ].join('\n')
    expect(parseCourseDates(log)).toEqual({ 'ias-16-immobilisations': '2026-10-08', 'ifrs-16-contrats-location': '2026-09-01' })
  })
})
