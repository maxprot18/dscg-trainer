import { clearErrors, errorIssueUrl, isStaleChunkError, logError, readErrors } from './errorLog'

describe('journal des erreurs', () => {
  beforeEach(() => clearErrors())

  it('garde les 20 dernières erreurs, la plus récente en tête', () => {
    for (let i = 0; i < 25; i++) logError(new Error(`e${i}`), '/session')
    const errors = readErrors()
    expect(errors).toHaveLength(20)
    expect(errors[0]).toMatchObject({ message: 'e24', route: '/session' })
  })

  it('issue pré-remplie et détection des écrans périmés après mise à jour', () => {
    const entry = logError(new Error('boom'), '/cours/ias-16-immobilisations')
    const url = new URL(errorIssueUrl(entry))
    expect(url.searchParams.get('title')).toBe('Erreur : boom')
    expect(url.searchParams.get('body')).toContain('/cours/ias-16-immobilisations')
    expect(isStaleChunkError(new TypeError('Failed to fetch dynamically imported module: /assets/x.js'))).toBe(true)
    expect(isStaleChunkError(new Error('boom'))).toBe(false)
  })
})
