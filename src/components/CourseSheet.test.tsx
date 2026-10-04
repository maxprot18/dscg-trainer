import { render, screen, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

import { courseSections } from '@/content/courseSheet'

import { CourseSheet } from './CourseSheet'

const SHEET = [
  '# IAS 16 — Immobilisations corporelles',
  '',
  '**Références :** IAS 16 §7 (règl. UE 2023/1803)',
  '',
  '**Enjeu :** déterminer le coût d’entrée.',
  '',
  '**Coût d’entrée (§16-22)** :',
  '- prix d’achat (§16) ;',
  '- démantèlement.',
  '',
  '**Formules clés :** base = coût − valeur résiduelle ; dotation = base / durée',
  '',
  '```diagram',
  '{"type":"bars","title":"Dotations","unit":"k€","items":[{"label":"Plan unique","value":500},{"label":"Composants","value":725}]}',
  '```',
  '',
  '## Exemple',
  'Aéro acquiert un avion de 10 M€. Dotation N = 375 000 + 350 000 = 725 000 €, contre 500 000 € avec un plan unique sur vingt ans et sans composant distinct.',
  '',
  '## Erreurs fréquentes',
  '- Amortir selon un plan unique : chaque composant a son plan.',
  '',
  '## À retenir',
  '- Approche par composants.',
  '',
  '**Notions liées :** [IAS 36 — Dépréciation](/cours/ias-36-depreciation-actifs) · [Immobilisations en PCG](/cours/immobilisations-pcg)',
].join('\n')

describe('CourseSheet', () => {
  it('habille chaque partie de la fiche', () => {
    render(
      <MemoryRouter>
        <CourseSheet source={SHEET} nav />
      </MemoryRouter>,
    )
    expect(screen.getByRole('heading', { level: 1, name: /IAS 16/ })).toBeInTheDocument()
    expect(screen.getByText('Enjeu')).toBeInTheDocument()
    expect(screen.getByText((_, el) => el?.tagName === 'STRONG' && el.textContent === 'Coût d’entrée (§16-22)')).toBeInTheDocument()
    // Renvois atténués dans le texte.
    expect(screen.getByText('(§16)')).toHaveClass('text-[0.85em]')
    // Formules : une par ligne.
    expect(screen.getByText('base = coût − valeur résiduelle')).toBeInTheDocument()
    expect(screen.getByText('dotation = base / durée')).toBeInTheDocument()
    // Diagramme en barres lisible : valeurs en texte.
    expect(screen.getByText('725 k€')).toBeInTheDocument()
    // Sections titrées avec ancre, et raccourcis.
    const mistakes = screen.getByRole('region', { name: 'Erreurs fréquentes' })
    expect(within(mistakes).getByText('Amortir selon un plan unique')).toBeInTheDocument()
    expect(within(mistakes).getByText('Chaque composant a son plan.')).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 2, name: 'À retenir' })).toHaveAttribute('id', 'a-retenir')
    expect(within(screen.getByRole('navigation', { name: 'Aller à une section' })).getByRole('link', { name: 'Exemple' })).toHaveAttribute('href', '#exemple')
    // Exemple : la phrase de calcul est détachée.
    expect(screen.getByText(/Dotation N = 375 000/)).toHaveClass('tabular-nums')
    // Notions liées en liens.
    expect(screen.getByRole('link', { name: 'IAS 36 — Dépréciation' })).toHaveAttribute('href', '/cours/ias-36-depreciation-actifs')
  })

  it('glossaire UE 6 et niveau de titre pour l’impression', () => {
    render(
      <MemoryRouter>
        <CourseSheet
          titleLevel={3}
          source={['# IFRS terminology', '', '**Key issue:** words matter.', '', '## Key points', '- One.', '', '**Glossary:** carrying amount — valeur nette comptable · goodwill — écart d’acquisition'].join('\n')}
        />
      </MemoryRouter>,
    )
    expect(screen.getByRole('heading', { level: 3, name: 'IFRS terminology' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 4, name: 'Key points' })).toBeInTheDocument()
    expect(screen.getByText('carrying amount').tagName).toBe('DT')
    expect(screen.getByText('valeur nette comptable').tagName).toBe('DD')
  })

  it('sommaire des sections', () => {
    expect(courseSections(SHEET)).toEqual([
      { id: 'exemple', title: 'Exemple' },
      { id: 'erreurs-frequentes', title: 'Erreurs fréquentes' },
      { id: 'a-retenir', title: 'À retenir' },
    ])
  })
})
