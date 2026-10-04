// @vitest-environment node
import { exampleExercises } from '@/content/__fixtures__/examples'
import { exerciseSchema } from '@/content/schema'

import { exerciseSearchable, normalizeWithMap, queryTokens, search } from './search'

const courses = [
  { id: 'ias16', head: 'Immobilisations corporelles (IAS 16)', body: 'Approche par composants : chaque élément significatif est amorti séparément.' },
  { id: 'van', head: 'Valeur actuelle nette', body: 'La VAN actualise les flux au coût du capital. Les immobilisations sont…' },
  { id: 'tva', head: 'TVA déductible', body: 'Droit à déduction : facture, exigibilité chez le fournisseur.' },
]
const toSearchable = (c: (typeof courses)[number]) => ({ head: c.head, body: c.body })

describe('recherche plein texte', () => {
  it('ignore accents et casse, garde les nombres, retire les mots d’une lettre', () => {
    expect(queryTokens('Écart d’ACQUISITION, IAS 16 à')).toEqual(['ecart', 'acquisition', 'ias', '16'])
    const { text, map } = normalizeWithMap('Élément')
    expect(text).toBe('element')
    expect(map).toHaveLength(7)
  })

  it('tous les mots doivent être présents ; le titre pèse plus que le corps', () => {
    expect(search(courses, 'immobilisations', toSearchable).map((h) => h.item.id)).toEqual(['ias16', 'van'])
    expect(search(courses, 'immobilisations composants', toSearchable).map((h) => h.item.id)).toEqual(['ias16'])
    expect(search(courses, 'deduction', toSearchable).map((h) => h.item.id)).toEqual(['tva'])
    expect(search(courses, 'x', toSearchable)).toEqual([])
  })

  it('extrait autour du premier mot trouvé', () => {
    const [hit] = search(courses, 'exigibilite', toSearchable)
    expect(hit.snippet).toContain('exigibilité')
  })

  it('cherche dans tout le texte d’un exercice (options, explication, référence)', () => {
    const ex = exerciseSchema.parse(exampleExercises.mcq)
    expect(search([ex], ex.source_ref.split(' ')[0], exerciseSearchable)).toHaveLength(1)
    expect(search([ex], 'motintrouvable', exerciseSearchable)).toHaveLength(0)
  })
})
