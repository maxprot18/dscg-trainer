import { render, screen } from '@testing-library/react'

import { clearErrors, readErrors } from '@/lib/errorLog'

import { ErrorBoundary } from './ErrorBoundary'

function Boom(): never {
  throw new Error('écran cassé')
}

describe('ErrorBoundary', () => {
  it('affiche un message, propose de recharger et de signaler, et journalise l’erreur', () => {
    clearErrors()
    vi.spyOn(console, 'error').mockImplementation(() => {})
    const { rerender } = render(
      <ErrorBoundary resetKey="/a">
        <Boom />
      </ErrorBoundary>,
    )
    expect(screen.getByRole('alert')).toHaveTextContent('Une erreur est survenue')
    expect(screen.getByRole('button', { name: /Recharger/ })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Signaler l’erreur/ })).toHaveAttribute('href', expect.stringContaining('/issues/new'))
    expect(readErrors()[0].message).toBe('écran cassé')
    // Changer d'écran efface l'erreur.
    rerender(
      <ErrorBoundary resetKey="/b">
        <p>autre écran</p>
      </ErrorBoundary>,
    )
    expect(screen.getByText('autre écran')).toBeInTheDocument()
  })
})
