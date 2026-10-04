// @vitest-environment node
import taxonomyJson from '@content/taxonomy.json'

import { taxonomy } from './load'
import { taxonomySchema } from './schema'

describe('taxonomie embarquée', () => {
  it('est valide et identique à sa lecture par le schéma (pas de valeur par défaut perdue)', () => {
    expect(taxonomySchema.parse(taxonomyJson)).toEqual(taxonomy)
  })
})
