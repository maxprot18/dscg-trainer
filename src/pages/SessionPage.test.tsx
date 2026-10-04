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

  it('sélection sans exercice', () => {
    renderAt('/session?mode=theme&seed=1&ue=UE5')
    expect(screen.getByText(/Aucun exercice disponible/)).toBeInTheDocument()
  })
})
