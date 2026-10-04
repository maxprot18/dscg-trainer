import { render, screen, within } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'

import { taxonomy } from '@/content/load'
import { db, setMark } from '@/db/db'

import { CoursesPage } from './CoursesPage'
import { CourseUePage } from './CourseUePage'

function renderAt(url: string) {
  render(
    <MemoryRouter initialEntries={[url]}>
      <Routes>
        <Route path="/cours" element={<CoursesPage />} />
        <Route path="/cours/ue/:ueId" element={<CourseUePage />} />
      </Routes>
    </MemoryRouter>,
  )
}

describe('écrans Cours', () => {
  beforeEach(async () => {
    await Promise.all([db.attempts.clear(), db.reviews.clear(), db.marks.clear()])
  })

  it('liste les UE avec leur avancement', async () => {
    renderAt('/cours')
    expect(await screen.findByRole('link', { name: /UE4 — Comptabilité et audit/ })).toHaveAttribute('href', '/cours/ue/UE4')
    expect(await screen.findByRole('progressbar', { name: /UE4 : 0 notions travaillées sur 129/ })).toBeInTheDocument()
  })

  it('page d’une UE : thèmes, notions avec maîtrise et fiche lue', async () => {
    const ue = taxonomy.ues[3]
    const notion = ue.themes[0].notions[0]
    await setMark('read', `notion:${notion.id}`)
    await db.attempts.bulkAdd(
      [true, true, true].map((correct, i) => ({ exerciseId: `x${i}`, notion: notion.id, date: i, answer: [], correct, durationMs: 1 })),
    )
    renderAt('/cours/ue/UE4')
    expect(await screen.findByRole('heading', { level: 1, name: ue.title })).toBeInTheDocument()
    const link = await screen.findByRole('link', { name: (n) => n.includes(notion.title) && n.includes('(Maîtrisé)') })
    expect(link).toHaveAttribute('href', `/cours/${notion.id}`)
    expect(within(link).getByLabelText('fiche lue')).toBeInTheDocument()
    expect(screen.getAllByRole('link', { name: /\(Non travaillé\)/ }).length).toBeGreaterThan(50)
  })

  it('UE inconnue', () => {
    renderAt('/cours/ue/UE9')
    expect(screen.getByText('UE introuvable.')).toBeInTheDocument()
  })
})
