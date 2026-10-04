import { render, screen } from '@testing-library/react'

import { Markdown } from './Markdown'

describe('Markdown', () => {
  it('rend titres, paragraphes, listes, tableaux et mise en forme', () => {
    const { container } = render(
      <Markdown
        source={[
          '# IAS 16',
          '',
          '**Références :** IAS 16 §43',
          'suite du paragraphe avec `code` et *italique*',
          '',
          '## À retenir',
          '- premier point',
          '- second point',
          '',
          '| Compte | Sens |',
          '| --- | --- |',
          '| 6811 | Débit |',
          '<script>alert(1)</script>',
        ].join('\n')}
      />,
    )
    expect(screen.getByRole('heading', { name: 'IAS 16' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'À retenir' })).toBeInTheDocument()
    expect(screen.getByText('Références :').tagName).toBe('STRONG')
    expect(screen.getByText('code').tagName).toBe('CODE')
    expect(screen.getAllByRole('listitem')).toHaveLength(2)
    expect(screen.getByRole('cell', { name: '6811' })).toBeInTheDocument()
    expect(container.querySelector('script')).toBeNull()
    expect(screen.getByText('<script>alert(1)</script>')).toBeInTheDocument()
  })
})
