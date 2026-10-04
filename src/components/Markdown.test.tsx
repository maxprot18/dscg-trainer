import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

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

  it('liens internes et diagrammes', () => {
    render(
      <MemoryRouter>
        <Markdown
          source={[
            '# T',
            '',
            'Voir [IAS 36](/cours/ias-36-depreciation) et [externe](https://exemple.org).',
            '',
            '```diagram',
            '{"type":"flow","title":"Étapes du cash pooling","steps":[{"label":"Remontée"},{"label":"Placement"}]}',
            '```',
            '',
            '```diagram',
            '{"type":"org","title":"Groupe","nodes":[{"id":"M","label":"Mère"},{"id":"F","label":"Fille"}],"links":[{"from":"M","to":"F","label":"80 %"}]}',
            '```',
            '',
            '```diagram',
            'pas du json',
            '```',
          ].join('\n')}
        />
      </MemoryRouter>,
    )
    expect(screen.getByRole('link', { name: 'IAS 36' })).toHaveAttribute('href', '/cours/ias-36-depreciation')
    expect(screen.queryByRole('link', { name: 'externe' })).not.toBeInTheDocument()
    expect(screen.getByText(/et externe\./)).toBeInTheDocument()
    expect(screen.getByText('Étapes du cash pooling')).toBeInTheDocument()
    expect(screen.getByText('Remontée')).toBeInTheDocument()
    expect(screen.getByRole('img', { name: /Groupe\. Mère détient 80 % de Fille/ })).toBeInTheDocument()
    expect(screen.getByText(/Diagramme illisible/)).toBeInTheDocument()
  })
})
