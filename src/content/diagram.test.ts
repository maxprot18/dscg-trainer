// @vitest-environment node
import { extractDiagramBlocks, parseDiagram } from './diagramSchema'

describe('diagrammes des fiches', () => {
  it('accepte les cinq formes et refuse un lien vers un nœud inconnu', () => {
    expect(parseDiagram('{"type":"timeline","title":"T","items":[{"label":"a"},{"label":"b","when":"J+30"}]}').ok).toBe(true)
    expect(parseDiagram('{"type":"tree","title":"T","root":{"label":"r","children":[{"label":"a","edge":"oui"}]}}').ok).toBe(true)
    expect(parseDiagram('{"type":"flow","title":"T","steps":[{"label":"a"},{"label":"b"}]}').ok).toBe(true)
    expect(parseDiagram('{"type":"bars","title":"T","unit":"€","items":[{"label":"a","value":1},{"label":"b","value":-2}]}').ok).toBe(true)
    const org = parseDiagram('{"type":"org","title":"T","nodes":[{"id":"M","label":"Mère"},{"id":"A","label":"A"}],"links":[{"from":"M","to":"A","label":"60 %"}]}')
    expect(org.ok).toBe(true)
    const bad = parseDiagram('{"type":"org","title":"T","nodes":[{"id":"M","label":"Mère"},{"id":"A","label":"A"}],"links":[{"from":"M","to":"Z"}]}')
    expect(bad.ok).toBe(false)
    expect(parseDiagram('{').ok).toBe(false)
  })

  it('extrait les blocs d’une fiche', () => {
    const md = '# T\n\n```diagram\n{"a":1}\n```\n\ntexte\n\n```diagram\n{"b":2}\n```\n'
    expect(extractDiagramBlocks(md)).toEqual(['{"a":1}', '{"b":2}'])
  })
})
