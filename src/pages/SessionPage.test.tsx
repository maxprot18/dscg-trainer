import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router-dom'

import { exampleExercises } from '@/content/__fixtures__/examples'
import { exerciseSchema, type Exercise } from '@/content/schema'
import { db } from '@/db/db'

import { SessionPage } from './SessionPage'

const mcq = exerciseSchema.parse(exampleExercises.mcq)
const tf = exerciseSchema.parse(exampleExercises.true_false)
const pool: Exercise[] = [mcq, tf]

function renderAt(url: string) {
  render(
    <MemoryRouter initialEntries={[url]}>
      <Routes>
        <Route path="/session" element={<SessionPage pool={pool} />} />
        <Route path="/entrainement" element={<p>Choix des sessions</p>} />
      </Routes>
    </MemoryRouter>,
  )
}

describe('SessionPage', () => {
  beforeEach(async () => {
    await db.attempts.clear()
    await db.sessions.clear()
    await db.reviews.clear()
  })

  it('examen blanc : pas de correction pendant l’épreuve, note sur 20 et correction à la fin', async () => {
    const user = userEvent.setup()
    renderAt('/session?mode=exam&seed=1&ue=UE4')
    expect(await screen.findByLabelText('Temps restant')).toHaveTextContent('4:00:00')
    for (let i = 0; i < 2; i++) {
      if (screen.queryAllByRole('radio').length > 0) {
        await user.click(screen.getAllByRole('radio')[1])
        await user.click(screen.getByRole('button', { name: 'Valider' }))
      } else {
        await user.click(screen.getByRole('button', { name: /Faux/ }))
      }
      expect(screen.queryByText('Bonne réponse')).not.toBeInTheDocument()
      await user.click(screen.getByRole('button', { name: /Suivant|Voir le bilan/ }))
    }
    expect(screen.getByRole('heading', { name: /Examen blanc UE4/ })).toBeInTheDocument()
    expect(screen.getByText(/Note : 20(,00)? \/ 20/)).toBeInTheDocument()
    await waitFor(async () => expect(await db.attempts.count()).toBe(2))
    expect((await db.sessions.toArray())[0]).toMatchObject({ mode: 'exam', scope: 'UE4' })
    // La note est gardée avec la session (note prévisionnelle).
    await waitFor(async () => expect((await db.sessions.toArray())[0].grade).toBe(20))
    expect(await db.reviews.count()).toBeGreaterThan(0)
  })

  it('examen blanc interrompu : proposé à la reprise avec le même sujet, chrono conservé', async () => {
    const user = userEvent.setup()
    const { unmount } = render(
      <MemoryRouter initialEntries={['/session?mode=exam&seed=1&ue=UE4']}>
        <Routes>
          <Route path="/session" element={<SessionPage pool={pool} />} />
        </Routes>
      </MemoryRouter>,
    )
    expect(await screen.findByText('1 / 2')).toBeInTheDocument()
    if (screen.queryAllByRole('radio').length > 0) {
      await user.click(screen.getAllByRole('radio')[1])
      await user.click(screen.getByRole('button', { name: 'Valider' }))
    } else {
      await user.click(screen.getByRole('button', { name: /Faux/ }))
    }
    await waitFor(async () => expect(await db.attempts.count()).toBe(1))
    unmount()

    renderAt('/session?mode=exam&seed=1&ue=UE4')
    expect(await screen.findByText('Examen interrompu')).toBeInTheDocument()
    expect(screen.getByText(/répondu à 1 exercice sur 2/)).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Reprendre l’examen' }))
    expect(await screen.findByText('2 / 2')).toBeInTheDocument()
    expect(await db.sessions.count()).toBe(1)
  })

  it('passer un exercice et confirmer l’arrêt', async () => {
    const user = userEvent.setup()
    vi.spyOn(window, 'confirm').mockReturnValue(false)
    renderAt('/session?mode=theme&seed=1&ue=UE4')
    expect(screen.getByLabelText('Durée de la session')).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: /Passer/ }))
    expect(screen.getByText('2 / 2')).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Terminer la session' }))
    expect(window.confirm).toHaveBeenCalled()
    expect(screen.queryByRole('heading', { name: 'Bilan de la session' })).not.toBeInTheDocument()
    vi.mocked(window.confirm).mockReturnValue(true)
    await user.click(screen.getByRole('button', { name: 'Terminer la session' }))
    expect(screen.getByRole('heading', { name: 'Bilan de la session' })).toBeInTheDocument()
    expect(screen.getByText(/0 exercice traité sur 2/)).toBeInTheDocument()
  })

  it('mode erreurs : rejoue seulement les exercices ratés', async () => {
    await db.attempts.bulkAdd([
      { exerciseId: mcq.id, notion: mcq.notion, date: 1, answer: [], correct: false, durationMs: 1 },
      { exerciseId: tf.id, notion: tf.notion, date: 1, answer: [], correct: true, durationMs: 1 },
    ])
    renderAt('/session?mode=errors&seed=1')
    expect(await screen.findByText('1 / 1')).toBeInTheDocument()
    expect(screen.getAllByRole('radio').length).toBeGreaterThan(0)
  })

  it('mode erreurs sans erreur : message', async () => {
    renderAt('/session?mode=errors&seed=1')
    expect(await screen.findByText(/Aucune erreur à rejouer/)).toBeInTheDocument()
  })

  it('joue une session par thème de bout en bout et enregistre tentatives et session', async () => {
    const user = userEvent.setup()
    renderAt('/session?mode=theme&seed=1&ue=UE4')
    expect(screen.getByText('1 / 2')).toBeInTheDocument()

    for (let i = 0; i < 2; i++) {
      if (screen.queryAllByRole('radio').length > 0) {
        await user.click(screen.getAllByRole('radio')[1])
        await user.click(screen.getByRole('button', { name: 'Valider' }))
      } else {
        await user.click(screen.getByRole('button', { name: /Faux/ }))
      }
      await user.click(screen.getByRole('button', { name: /Suivant|Voir le bilan/ }))
    }

    expect(screen.getByRole('heading', { name: 'Bilan de la session' })).toBeInTheDocument()
    expect(screen.getByText(/2 \/ 2 réussis/)).toBeInTheDocument()
    expect(screen.queryByText('Notions à revoir')).not.toBeInTheDocument()
    await waitFor(async () => expect(await db.attempts.count()).toBe(2))
    const sessions = await db.sessions.toArray()
    expect(sessions).toHaveLength(1)
    expect(sessions[0]).toMatchObject({ mode: 'theme', scope: 'UE4' })
    await waitFor(async () => expect((await db.sessions.toArray())[0].endedAt).toBeGreaterThan(0))
  })

  it('session rapide : chronomètre de 5 minutes qui arrête la session', async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true })
    try {
      renderAt('/session?mode=quick&seed=3')
      expect(screen.getByLabelText('Temps restant')).toHaveTextContent('5:00')
      await vi.advanceTimersByTimeAsync(5 * 60 * 1000 + 1000)
      expect(await screen.findByText(/Temps écoulé/)).toBeInTheDocument()
    } finally {
      vi.useRealTimers()
    }
  })

  it('URL invalide ou sélection vide : renvoie vers le choix des sessions', () => {
    renderAt('/session?mode=autre')
    expect(screen.getByText('Session introuvable.')).toBeInTheDocument()
  })

  it('examen : un cas commencé puis arrêté compte au prorata des questions traitées', async () => {
    const user = userEvent.setup()
    const caseStudy = exerciseSchema.parse(exampleExercises.case_study)
    vi.spyOn(window, 'confirm').mockReturnValue(true)
    render(
      <MemoryRouter initialEntries={['/session?mode=exam&seed=1&ue=UE4']}>
        <Routes>
          <Route path="/session" element={<SessionPage pool={[caseStudy]} />} />
        </Routes>
      </MemoryRouter>,
    )
    await screen.findByText(/Question 1\/4/)
    await user.click(screen.getAllByRole('radio')[0])
    await user.click(screen.getByRole('button', { name: 'Valider' }))
    // Réponse verrouillée : plus de bouton de validation, aucune correction.
    expect(screen.queryByText('Bonne réponse')).not.toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Terminer la session' }))
    expect(await screen.findByText(/1 exercice traité sur 1/)).toBeInTheDocument()
    expect(screen.queryByText(/Note : 0(,00)? \/ 20/)).not.toBeInTheDocument()
    await waitFor(async () => expect(await db.attempts.count()).toBe(1))
    vi.restoreAllMocks()
  })

  it('sujet complet sans assez de dossiers : message', async () => {
    renderAt('/session?mode=full&seed=1&ue=UE4')
    expect(await screen.findByText(/Pas encore assez de sujets type d’examen/)).toBeInTheDocument()
  })

  it('sélection sans exercice', () => {
    renderAt('/session?mode=theme&seed=1&ue=UE5')
    expect(screen.getByText(/Aucun exercice disponible/)).toBeInTheDocument()
  })
})
