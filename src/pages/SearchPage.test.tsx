import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router-dom'

import { loadExercises } from '@/content/load'
import { db } from '@/db/db'

import { ExercisePage } from './ExercisePage'
import { SearchPage } from './SearchPage'

function renderAt(url: string) {
  render(
    <MemoryRouter initialEntries={[url]}>
      <Routes>
        <Route path="/recherche" element={<SearchPage />} />
        <Route path="/exercice/:exerciseId" element={<ExercisePage />} />
      </Routes>
    </MemoryRouter>,
  )
}

describe('recherche', () => {
  it('trouve fiches et exercices sans tenir compte des accents, puis ouvre un exercice', async () => {
    await loadExercises()
    renderAt('/recherche?q=ecart%20d%27acquisition')
    const courses = await screen.findByRole('region', { name: 'Fiches de cours' }, { timeout: 10_000 })
    expect(within(courses).getAllByRole('link').length).toBeGreaterThan(0)
    const exercises = screen.getByRole('region', { name: 'Exercices' })
    const links = within(exercises).getAllByRole('link')
    expect(links.length).toBeGreaterThan(0)

    await db.attempts.clear()
    await userEvent.click(links[0])
    expect(await screen.findByRole('article')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /S’entraîner sur cette notion/ })).toBeInTheDocument()
  }, 30_000)

  it('requête vide ou sans résultat', async () => {
    renderAt('/recherche')
    expect(screen.getByText(/Tapez au moins un mot/)).toBeInTheDocument()
    await userEvent.type(screen.getByRole('searchbox'), 'zzqqxx')
    expect(await screen.findByText(/Aucun résultat/, undefined, { timeout: 10_000 })).toBeInTheDocument()
    await loadExercises()
  }, 30_000)

  it('exercice introuvable', async () => {
    renderAt('/exercice/inexistant')
    expect(await screen.findByText('Exercice introuvable.', undefined, { timeout: 10_000 })).toBeInTheDocument()
  }, 30_000)
})
