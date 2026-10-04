import { render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'

import { taxonomy } from '@/content/load'
import { db, type Attempt } from '@/db/db'
import type { ProgressData } from '@/db/progress'
import { DAY_MS } from '@/engine/srs'

import { ProgressView } from './ProgressPage'
import { SettingsPage } from './SettingsPage'

const NOW = new Date(2026, 9, 12, 18, 0).getTime()
const [n1, n2] = taxonomy.ues[3].themes[0].notions.map((n) => n.id)

function attempts(notion: string, results: boolean[], day: number): Attempt[] {
  return results.map((correct, i) => ({
    exerciseId: `${notion}-${i}`,
    notion,
    correct,
    date: NOW - day * DAY_MS + i,
    answer: [],
    durationMs: 90_000,
    sessionId: 1,
  }))
}

const data: ProgressData = {
  attempts: [...attempts(n1, [true, true, true, true], 0), ...attempts(n2, [false, false, true], 1)],
  reviews: [{ notion: n2, due: NOW - 1000, interval: 1, ease: 2.3, repetitions: 0, lapses: 0 }],
  sessions: [{ id: 1, mode: 'smart', startedAt: NOW - DAY_MS, endedAt: NOW, exerciseIds: [] }],
  marks: [],
}

function renderView(progress: ProgressData) {
  render(
    <MemoryRouter>
      <ProgressView progress={progress} now={NOW} />
    </MemoryRouter>,
  )
}

describe('écran Progression', () => {
  it('chiffres clés, carte du programme, réussite par notion et historique', () => {
    renderView(data)
    expect(screen.getByText('7')).toBeInTheDocument() // exercices faits
    expect(screen.getByText('71 %')).toBeInTheDocument() // 5 réussites sur 7
    expect(screen.getByText('2 j')).toBeInTheDocument() // série
    expect(screen.getAllByText(/^11 min$/).length).toBeGreaterThan(0) // 7 × 1 min 30 = 10,5 min
    expect(screen.getByRole('link', { name: /Réviser les 1 notion du jour/ })).toBeInTheDocument()

    const map = screen.getByRole('region', { name: 'Carte UE4' })
    const cells = within(map).getAllByRole('link')
    expect(cells.filter((c) => c.dataset.mastery === 'mastered')).toHaveLength(1)
    expect(cells.filter((c) => c.dataset.mastery === 'review')).toHaveLength(1)
    expect(cells.filter((c) => c.dataset.mastery === 'new').length).toBeGreaterThan(50)
    expect(screen.getAllByRole('link', { name: /Maîtrisé : 100 % sur 4 tentatives/ })).toHaveLength(1)

    expect(screen.getAllByText('Révision intelligente').length).toBeGreaterThan(0)
    expect(screen.getByText(/5\/7 réussis/)).toBeInTheDocument()
  })

  it('sans historique : tout est non travaillé', () => {
    renderView({ attempts: [], reviews: [], sessions: [], marks: [] })
    expect(screen.getByText('Aucune session pour l’instant.')).toBeInTheDocument()
    expect(screen.queryByRole('link', { name: /Réviser les/ })).not.toBeInTheDocument()
    expect(screen.getByText(`0 / ${taxonomy.ues.flatMap((u) => u.themes.flatMap((t) => t.notions)).length}`)).toBeInTheDocument()
  })

  it('import d’une progression depuis un fichier JSON', async () => {
    await Promise.all([db.attempts.clear(), db.reviews.clear(), db.sessions.clear()])
    vi.spyOn(window, 'confirm').mockReturnValue(true)
    render(
      <MemoryRouter>
        <SettingsPage />
      </MemoryRouter>,
    )
    const exported = { app: 'dscg-trainer', version: 1, exportedAt: new Date(NOW).toISOString(), ...data }
    const file = new File([JSON.stringify(exported)], 'progression.json', { type: 'application/json' })
    await userEvent.upload(await screen.findByLabelText('Fichier de progression', undefined, { timeout: 10_000 }), file)
    // Lecture du fichier et écriture IndexedDB : plus lentes sur les machines de CI, d'où le délai élargi.
    expect(
      await screen.findByText(/Progression importée : 7 tentatives, 1 sessions/, undefined, { timeout: 10_000 }),
    ).toBeInTheDocument()
    await waitFor(async () => expect(await db.attempts.count()).toBe(7), { timeout: 10_000 })
  }, 30_000)
})
