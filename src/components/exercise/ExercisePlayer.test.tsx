import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'

import { exampleExercises } from '@/content/__fixtures__/examples'
import { exerciseSchema, type Exercise } from '@/content/schema'
import { formatNumber } from '@/engine/numbers'

import { ExercisePlayer } from './ExercisePlayer'

const ex = (type: keyof typeof exampleExercises): Exercise => exerciseSchema.parse(exampleExercises[type])

function setup(exercise: Exercise) {
  const onComplete = vi.fn()
  render(
    <MemoryRouter>
      <ExercisePlayer exercise={exercise} onComplete={onComplete} />
    </MemoryRouter>,
  )
  return { onComplete, user: userEvent.setup() }
}

describe('ExercisePlayer', () => {
  it('QCM : sélection, validation, correction et explication', async () => {
    const e = ex('mcq')
    const { onComplete, user } = setup(e)
    await user.click(screen.getAllByRole('radio')[1])
    await user.click(screen.getByRole('button', { name: 'Valider' }))
    expect(screen.getByRole('status')).toHaveTextContent('Bonne réponse')
    expect(screen.getByText(e.explanation)).toBeInTheDocument()
    expect(onComplete).toHaveBeenCalledWith(expect.objectContaining({ correct: true }), [{ kind: 'choice', selected: [1] }])
  })

  it('QCM : explication de chaque option après la réponse', async () => {
    const e = { ...ex('mcq'), option_explanations: ['Un seul plan ignore les composants.', 'Approche par composants.', 'Pas de choix.', 'Moyenne interdite.'] }
    const { user } = setup(e as Exercise)
    expect(screen.queryByText('Approche par composants.')).not.toBeInTheDocument()
    await user.click(screen.getAllByRole('radio')[0])
    await user.click(screen.getByRole('button', { name: 'Valider' }))
    expect(screen.getByText('Un seul plan ignore les composants.')).toBeInTheDocument()
    expect(screen.getByText('Approche par composants.')).toBeInTheDocument()
  })

  it('lien « signaler une erreur » vers une issue GitHub pré-remplie, après la correction', async () => {
    const e = ex('mcq')
    const { user } = setup(e)
    expect(screen.queryByRole('link', { name: /Signaler une erreur/ })).not.toBeInTheDocument()
    await user.click(screen.getAllByRole('radio')[1])
    await user.click(screen.getByRole('button', { name: 'Valider' }))
    const href = screen.getByRole('link', { name: /Signaler une erreur/ }).getAttribute('href')!
    const url = new URL(href)
    expect(url.origin + url.pathname).toBe('https://github.com/maxprot18/dscg-trainer/issues/new')
    expect(url.searchParams.get('title')).toContain(e.id)
    expect(url.searchParams.get('body')).toContain(e.source_ref)
  })

  it('QCM : raccourcis clavier 1-4 et Entrée', async () => {
    const { onComplete, user } = setup(ex('mcq'))
    await user.keyboard('1{Enter}')
    expect(onComplete).toHaveBeenCalledWith(expect.objectContaining({ correct: false }), [{ kind: 'choice', selected: [0] }])
  })

  it('vrai / faux : affiche la justification', async () => {
    const e = ex('true_false')
    const { onComplete, user } = setup(e)
    await user.click(screen.getByRole('button', { name: /Faux/ }))
    expect(onComplete).toHaveBeenCalledWith(expect.objectContaining({ correct: true }), expect.anything())
    if (e.type === 'true_false') expect(screen.getByText(e.justification)).toBeInTheDocument()
  })

  it('calcul : accepte la saisie à la française dans la tolérance', async () => {
    const { onComplete, user } = setup(ex('numeric'))
    await user.type(screen.getByLabelText('Votre réponse'), '41,1{Enter}')
    expect(onComplete).toHaveBeenCalledWith(expect.objectContaining({ correct: true }), [{ kind: 'numeric', raw: '41,1' }])
    expect(screen.getByText(/Réponse attendue/)).toBeInTheDocument()
  })

  it('écriture : saisie ligne à ligne et correction compte par compte', async () => {
    const { onComplete, user } = setup(ex('journal_entry'))
    await user.click(screen.getByRole('button', { name: /Ligne/ }))
    const rows: [string, string, string][] = [
      ['607', '1000', ''],
      ['44566', '200', ''],
      ['401', '', '1 200'],
    ]
    for (const [i, [account, debit, credit]] of rows.entries()) {
      await user.type(screen.getByLabelText(`Compte ligne ${i + 1}`), account)
      if (debit) await user.type(screen.getByLabelText(`Débit ligne ${i + 1}`), debit)
      if (credit && i < 2) await user.type(screen.getByLabelText(`Crédit ligne ${i + 1}`), credit)
    }
    // Libellé du compte affiché sous la saisie, puis « Équilibrer » complète le crédit manquant (1 200).
    expect(screen.getByLabelText('Compte ligne 1').parentElement).toHaveTextContent('Achats de marchandises')
    expect(screen.getByLabelText('Compte ligne 3').parentElement).toHaveTextContent('Fournisseurs')
    await user.click(screen.getByRole('button', { name: /Équilibrer/ }))
    expect(screen.getByLabelText('Crédit ligne 3')).toHaveValue(formatNumber(1200, 2))
    expect(screen.getByRole('button', { name: /Équilibrer/ })).toBeDisabled()
    await user.click(screen.getByRole('button', { name: 'Valider l’écriture' }))
    expect(onComplete).toHaveBeenCalledWith(expect.objectContaining({ correct: true, score: 1 }), expect.anything())
    expect(screen.getAllByText('Juste')).toHaveLength(3)
  })

  it('flashcard : retourner puis s’auto-évaluer', async () => {
    const { onComplete, user } = setup(ex('flashcard'))
    await user.click(screen.getByRole('button', { name: 'Retourner la carte' }))
    await user.click(screen.getByRole('button', { name: /À revoir/ }))
    expect(onComplete).toHaveBeenCalledWith(expect.objectContaining({ correct: false }), [{ kind: 'flashcard', known: false }])
  })

  it('cas pratique : sous-questions enchaînées et barème', async () => {
    const { onComplete, user } = setup(ex('case_study'))
    // L'énoncé est repliable (ouvert par défaut).
    expect(screen.getByText('Replier').closest('details')).toHaveAttribute('open')
    expect(screen.getByText(/Question 1\/4/)).toBeInTheDocument()
    expect(screen.queryByText(/Question 2\/4/)).not.toBeInTheDocument()
    await user.click(screen.getAllByRole('radio')[0])
    await user.click(screen.getByRole('button', { name: 'Valider' }))
    await user.type(screen.getByLabelText('Votre réponse'), '20000{Enter}')
    await user.type(screen.getByLabelText('Compte ligne 1'), '68112')
    await user.type(screen.getByLabelText('Débit ligne 1'), '20000')
    await user.type(screen.getByLabelText('Compte ligne 2'), '28154')
    await user.type(screen.getByLabelText('Crédit ligne 2'), '20000')
    await user.click(screen.getByRole('button', { name: 'Valider l’écriture' }))
    await user.type(screen.getByLabelText('Votre réponse rédigée'), 'Rythme de consommation des avantages')
    await user.click(screen.getByRole('button', { name: 'Voir le corrigé' }))
    // Correction guidée : le point clé dont les mots figurent dans la copie est pré-coché.
    expect(screen.getAllByRole('checkbox')[0]).toBeChecked()
    expect(screen.getByText('repéré dans votre copie')).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Valider mon auto-évaluation' }))
    expect(onComplete).toHaveBeenCalledWith(expect.objectContaining({ earned: 9, total: 10, correct: true }), expect.anything())
    expect(screen.getByText(/Réussi : 9 \/ 10 points/)).toBeInTheDocument()
  })

  it('examen : réponse rédigée enregistrée sans afficher le corrigé, notée sur les points clés repérés', async () => {
    const onComplete = vi.fn()
    render(
      <MemoryRouter>
        <ExercisePlayer exercise={ex('case_study')} onComplete={onComplete} deferFeedback />
      </MemoryRouter>,
    )
    const user = userEvent.setup()
    // En examen, toutes les questions du cas sont affichées d'emblée et se traitent dans n'importe quel ordre.
    expect(screen.getByText(/Question 4\/4/)).toBeInTheDocument()
    await user.click(screen.getAllByRole('radio')[0])
    await user.click(screen.getAllByRole('button', { name: 'Valider' })[0])
    // Le bouton de la réponse enregistrée est masqué : reste celui du calcul.
    expect(screen.getAllByRole('button', { name: 'Valider' })).toHaveLength(1)
    await user.type(screen.getByLabelText('Votre réponse'), '20000{Enter}')
    await user.type(screen.getByLabelText('Compte ligne 1'), '68112')
    await user.type(screen.getByLabelText('Débit ligne 1'), '20000')
    await user.type(screen.getByLabelText('Compte ligne 2'), '28154')
    await user.type(screen.getByLabelText('Crédit ligne 2'), '20000')
    await user.click(screen.getByRole('button', { name: 'Valider l’écriture' }))
    await user.type(screen.getByLabelText('Votre réponse rédigée'), 'Rythme de consommation des avantages')
    expect(screen.queryByRole('button', { name: 'Voir le corrigé' })).not.toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Enregistrer ma réponse' }))
    expect(screen.queryByText('Corrigé type')).not.toBeInTheDocument()
    expect(onComplete).toHaveBeenCalledWith(expect.objectContaining({ earned: 9, total: 10 }), expect.anything())
  })

  it('cas de consolidation : organigramme et étapes', async () => {
    const e = ex('consolidation_case')
    const { onComplete, user } = setup(e)
    expect(screen.getByText('Organigramme du groupe')).toBeInTheDocument()
    await user.click(screen.getAllByRole('radio')[0])
    await user.click(screen.getByRole('button', { name: 'Valider' }))
    await user.type(screen.getByLabelText('Votre réponse'), '48{Enter}')
    await user.click(screen.getByRole('button', { name: /Vrai/ }))
    expect(onComplete).toHaveBeenCalledWith(expect.objectContaining({ correct: true, score: 1 }), expect.anything())
  })

  it('cas d’audit : procédures, risque puis conclusion', async () => {
    const { onComplete, user } = setup(ex('audit_case'))
    const procedures = screen.getAllByRole('checkbox')
    for (const i of [0, 1, 3]) await user.click(procedures[i])
    await user.click(screen.getByRole('button', { name: 'Valider' }))
    await user.click(screen.getAllByRole('radio')[2])
    await user.click(screen.getByRole('button', { name: 'Valider' }))
    await user.click(screen.getByRole('button', { name: 'Voir le corrigé' }))
    await user.click(screen.getByRole('button', { name: 'Valider mon auto-évaluation' }))
    expect(onComplete).toHaveBeenCalledWith(expect.objectContaining({ score: 0.75, correct: true }), expect.anything())
  })

  it('examen blanc : réponse verrouillée, aucune correction pendant l’épreuve', async () => {
    const e = ex('mcq')
    const onComplete = vi.fn()
    render(
      <MemoryRouter>
        <ExercisePlayer exercise={e} onComplete={onComplete} deferFeedback />
      </MemoryRouter>,
    )
    const user = userEvent.setup()
    await user.click(screen.getAllByRole('radio')[0])
    await user.click(screen.getByRole('button', { name: 'Valider' }))
    expect(onComplete).toHaveBeenCalledWith(expect.objectContaining({ correct: false }), [{ kind: 'choice', selected: [0] }])
    expect(screen.queryByText(e.explanation)).not.toBeInTheDocument()
    expect(screen.queryByText('Réponse incorrecte')).not.toBeInTheDocument()
    expect(screen.getAllByRole('radio')[0]).toBeDisabled()
    expect(screen.getAllByRole('radio')[0]).toHaveAttribute('aria-checked', 'true')
    expect(screen.getAllByText(/correction .* fin de l’examen/).length).toBeGreaterThan(0)
  })

  it('relecture : exercice affiché corrigé avec les réponses données', () => {
    const e = ex('mcq')
    render(
      <MemoryRouter>
        <ExercisePlayer exercise={e} review={[{ kind: 'choice', selected: [0] }]} />
      </MemoryRouter>,
    )
    expect(screen.getByRole('status')).toHaveTextContent('Réponse incorrecte')
    expect(screen.getByText(e.explanation)).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Valider' })).not.toBeInTheDocument()
  })
})
