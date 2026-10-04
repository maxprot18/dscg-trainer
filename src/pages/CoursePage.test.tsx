import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes, useLocation } from 'react-router-dom'

import { exampleExercises } from '@/content/__fixtures__/examples'
import { exerciseSchema } from '@/content/schema'

import { CoursePage } from './CoursePage'

const mcq = exerciseSchema.parse(exampleExercises.mcq)

vi.mock('@/content/load', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/content/load')>()
  return {
    ...actual,
    useExercises: () => [mcq],
    exerciseCount: (key: string) => (key === `notion:${mcq.notion}` ? 1 : 0),
    loadCourse: async (id: string) =>
      id === 'ias-16-immobilisations' ? '# IAS 16 — Immobilisations corporelles\n\n**Références :** IAS 16 §43' : null,
  }
})

function Where() {
  const loc = useLocation()
  return <p data-testid="where">{loc.pathname + loc.search}</p>
}

function renderAt(url: string) {
  render(
    <MemoryRouter initialEntries={[url]}>
      <Routes>
        <Route path="/cours/:notionId" element={<CoursePage />} />
        <Route path="/session" element={<Where />} />
      </Routes>
    </MemoryRouter>,
  )
}

describe('CoursePage', () => {
  it('affiche la fiche puis lance une session sur la notion', async () => {
    renderAt('/cours/ias-16-immobilisations')
    expect(await screen.findByRole('heading', { name: /IAS 16/ })).toBeInTheDocument()
    await userEvent.click(screen.getByRole('button', { name: /S’entraîner sur cette notion \(1\)/ }))
    expect(screen.getByTestId('where')).toHaveTextContent('mode=theme')
    expect(screen.getByTestId('where')).toHaveTextContent('notion=ias-16-immobilisations')
  })

  it('notion sans fiche ni exercice', async () => {
    renderAt('/cours/ias-19-avantages-personnel')
    expect(await screen.findByText(/pas encore rédigée/)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Pas encore d’exercice/ })).toBeDisabled()
  })

  it('notion inconnue', () => {
    renderAt('/cours/inconnue')
    expect(screen.getByText('Notion introuvable.')).toBeInTheDocument()
  })
})
