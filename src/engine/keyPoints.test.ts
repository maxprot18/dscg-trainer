// @vitest-environment node
import { keyPointCoverage, keywordStems, normalizeText, suggestKeyPoints } from './keyPoints'

describe('correction guidée des réponses rédigées', () => {
  it('normalise accents, casse et ponctuation', () => {
    expect(normalizeText('Écart sur coût — L. 225-38 !')).toBe('ecart sur cout l 225 38')
  })

  it('garde les mots significatifs (racine) et les nombres', () => {
    expect(keywordStems('La convention réglementée est soumise à l’article L. 225-38')).toEqual([
      'conven',
      'reglem',
      'soumis',
      '225',
      '38',
    ])
  })

  it('mesure la part des mots-clés du point retrouvés dans la copie, accents et pluriels compris', () => {
    const point = 'Autorisation préalable du conseil d’administration'
    expect(keyPointCoverage(point, 'Il faut une autorisation prealable du conseil.')).toBe(1 - 1 / 4)
    expect(keyPointCoverage(point, 'Les autorisations du conseil sont préalables à la signature.')).toBe(3 / 4)
    expect(keyPointCoverage(point, 'Rien à voir.')).toBe(0)
  })

  it('pré-coche les points dont la moitié des mots-clés est présente', () => {
    const points = ['Autorisation préalable du conseil', 'Rapport spécial des commissaires aux comptes', 'Vote en assemblée']
    expect(suggestKeyPoints(points, 'Le conseil donne son autorisation préalable ; vote ensuite en assemblée générale.')).toEqual([
      true,
      false,
      true,
    ])
    expect(suggestKeyPoints(points, '')).toEqual([false, false, false])
  })
})
