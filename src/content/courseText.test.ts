import { glossaryEntry, leadingLabel, metaKind, sectionKind, slugify, splitDots, splitFormulas, splitMistake, splitSentences } from './courseText'

describe('courseText', () => {
  it('libellé en gras en tête de ligne, deux-points dans ou hors du gras', () => {
    expect(leadingLabel('**Références :** IAS 16 §43')).toEqual({ label: 'Références', rest: 'IAS 16 §43' })
    expect(leadingLabel("**Coût d'entrée (§16-22)** :")).toEqual({ label: "Coût d'entrée (§16-22)", rest: '' })
    expect(leadingLabel('**Key issue:** why it matters')).toEqual({ label: 'Key issue', rest: 'why it matters' })
    expect(leadingLabel('**démantèlement** et remise en état')).toBeNull()
    expect(leadingLabel('Texte simple')).toBeNull()
  })

  it('libellés et sections réservés', () => {
    expect(metaKind('Enjeu')).toBe('stake')
    expect(metaKind('Formule clé')).toBe('formulas')
    expect(metaKind('Key formulas')).toBe('formulas')
    expect(metaKind('Notions liées')).toBe('related')
    expect(metaKind('Comptabilisation (§7)')).toBeNull()
    expect(sectionKind('Erreurs fréquentes')).toBe('mistakes')
    expect(sectionKind('Common mistakes')).toBe('mistakes')
    expect(sectionKind('À retenir')).toBe('keypoints')
    expect(sectionKind('Example')).toBe('example')
    expect(slugify('Erreurs fréquentes')).toBe('erreurs-frequentes')
  })

  it('erreur fréquente : erreur puis bonne règle, deux-points hors parenthèses et gras', () => {
    expect(splitMistake('Commencer à la mise en service : il débute quand l’actif est prêt.')).toEqual({
      mistake: 'Commencer à la mise en service',
      fix: 'Il débute quand l’actif est prêt.',
    })
    expect(splitMistake('Confondre (cas : rare) les deux : la règle')).toEqual({ mistake: 'Confondre (cas : rare) les deux', fix: 'La règle' })
    expect(splitMistake('Treating it as revenue: it is a liability.')).toEqual({ mistake: 'Treating it as revenue', fix: 'It is a liability.' })
    expect(splitMistake('Sans correction explicite.')).toEqual({ mistake: 'Sans correction explicite.', fix: null })
  })

  it('phrases : pas de coupure après une abréviation, une initiale ou dans une parenthèse', () => {
    expect(splitSentences('Dotation N = 725 000 €. Après 8 ans, les moteurs sont remplacés. Si N+1, rien.')).toEqual([
      'Dotation N = 725 000 €.',
      'Après 8 ans, les moteurs sont remplacés.',
      'Si N+1, rien.',
    ])
    expect(splitSentences('Voir C. com. art. L. 225-42 et règl. ANC 2014-03. Puis la suite.')).toEqual([
      'Voir C. com. art. L. 225-42 et règl. ANC 2014-03.',
      'Puis la suite.',
    ])
    expect(splitSentences('Calcul (voir IAS 16. Paragraphe 43) correct. Fin.')).toEqual(['Calcul (voir IAS 16. Paragraphe 43) correct.', 'Fin.'])
    expect(splitSentences('Costs fell, e.g. Rent dropped. Profit rose.')).toEqual(['Costs fell, e.g. Rent dropped.', 'Profit rose.'])
  })

  it('listes séparées par « · » et formules par « ; »', () => {
    expect(splitDots('[A](/cours/a) · [B](/cours/b)')).toEqual(['[A](/cours/a)', '[B](/cours/b)'])
    expect(splitFormulas('VAN = Σ F (1 + k)⁻ᵗ ; TRI : VAN (t ; n) = 0 ; IP = 1 + VAN / I')).toEqual([
      'VAN = Σ F (1 + k)⁻ᵗ',
      'TRI : VAN (t ; n) = 0',
      'IP = 1 + VAN / I',
    ])
    expect(glossaryEntry('carrying amount — valeur nette comptable')).toEqual({ term: 'carrying amount', translation: 'valeur nette comptable' })
  })
})

describe('typeset', () => {
  it('insécables dans les nombres, avant les unités et la ponctuation haute', async () => {
    const { typeset } = await import('@/lib/markdown')
    expect(typeset('725 000 € et 1 250 000 k€ : 20 % ; fin')).toBe('725\u202f000\u00a0€ et 1\u202f250\u202f000\u00a0k€\u00a0: 20\u00a0%\u00a0; fin')
    expect(typeset('IAS 16 §43 en 2023 2024')).toBe('IAS 16 §43 en 2023 2024')
  })
})
