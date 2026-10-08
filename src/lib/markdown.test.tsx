import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'

import { inline } from './markdown'

function renderInline(text: string) {
  return render(<MemoryRouter>{inline(text)}</MemoryRouter>)
}

describe('liens Markdown', () => {
  it('rend un lien interne vers une fiche', () => {
    renderInline('Voir [IAS 16](/cours/ias-16-immobilisations).')
    expect(screen.getByRole('link', { name: 'IAS 16' })).toHaveAttribute('href', '/cours/ias-16-immobilisations')
  })

  it('laisse en texte un lien externe ou « //domaine »', () => {
    renderInline('[externe](https://exemple.fr) et [piège](//exemple.fr)')
    expect(screen.queryByRole('link')).toBeNull()
    expect(screen.getByText(/piège/)).toBeInTheDocument()
  })
})
