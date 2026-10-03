import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'

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
  })
})
