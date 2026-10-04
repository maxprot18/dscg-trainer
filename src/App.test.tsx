import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'

import { loadExercises } from '@/content/load'

import { AppRoutes } from './App'

describe('navigation', () => {
  it("affiche l'accueil puis navigue vers les cours", async () => {
    render(
      <MemoryRouter>
        <AppRoutes />
      </MemoryRouter>,
    )
    expect(screen.getByRole('heading', { name: 'DSCG Trainer' })).toBeInTheDocument()
    await userEvent.click(screen.getByRole('link', { name: 'Cours' }))
    expect(screen.getByRole('heading', { name: 'Cours' })).toBeInTheDocument()
    expect(screen.getByText(/UE4 — Comptabilité et audit/)).toBeInTheDocument()
    // Les pages lancent le chargement du contenu : l'attendre avant la fin du test,
    // sinon les imports des fichiers UE se terminent après la destruction de l'environnement.
    await loadExercises()
  }, 30_000)
})
