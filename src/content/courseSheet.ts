/**
 * Lecture de la structure d'une fiche de cours (`docs/content-guide.md`) : titre, références, enjeu,
 * règles titrées, formules, sections `##`, notions liées et glossaire. Rendu : `CourseSheet`.
 */
import { leadingLabel, metaKind, sectionKind, slugify, splitDots, splitFormulas, type SectionKind } from '@/content/courseText'
import { parseBlocks, type Block } from '@/lib/markdown'

export type Node =
  | { kind: 'block'; block: Block }
  | { kind: 'rule'; label: string; text: string; list?: Block }
  | { kind: 'formulas'; label: string; items: string[] }
  | { kind: 'subheading'; text: string }

export interface Section {
  title: string
  kind: SectionKind
  nodes: Node[]
}

export interface Sheet {
  title: string | null
  references: { label: string; text: string } | null
  stake: { label: string; text: string } | null
  body: Node[]
  sections: Section[]
  related: { label: string; items: string[] } | null
  glossary: { label: string; items: string[] } | null
}

/** Regroupe les blocs Markdown d'une fiche selon sa structure. */
export function readSheet(source: string): Sheet {
  const blocks = parseBlocks(source)
  const sheet: Sheet = { title: null, references: null, stake: null, body: [], sections: [], related: null, glossary: null }
  const target = () => (sheet.sections.length ? sheet.sections[sheet.sections.length - 1].nodes : sheet.body)
  for (let i = 0; i < blocks.length; i++) {
    const b = blocks[i]
    if (b.kind === 'heading') {
      if (b.level === 1 && !sheet.title) sheet.title = b.text
      else if (b.level <= 2) sheet.sections.push({ title: b.text, kind: sectionKind(b.text), nodes: [] })
      else target().push({ kind: 'subheading', text: b.text })
      continue
    }
    if (b.kind === 'para') {
      const head = leadingLabel(b.lines[0])
      if (head) {
        const text = [head.rest, ...b.lines.slice(1)].filter(Boolean).join(' ')
        const meta = metaKind(head.label)
        if (meta === 'references') sheet.references = { label: head.label, text }
        else if (meta === 'stake') sheet.stake = { label: head.label, text }
        else if (meta === 'related') sheet.related = { label: head.label, items: splitDots(text) }
        else if (meta === 'glossary') sheet.glossary = { label: head.label, items: splitDots(text) }
        else if (meta === 'formulas') target().push({ kind: 'formulas', label: head.label, items: splitFormulas(text) })
        else {
          const next = blocks[i + 1]
          // « **Coût d'entrée (§16-22)** : » suivi d'une liste : la liste appartient à la règle.
          if (!text && next?.kind === 'list') {
            target().push({ kind: 'rule', label: head.label, text, list: next })
            i++
          } else target().push({ kind: 'rule', label: head.label, text })
        }
        continue
      }
    }
    target().push({ kind: 'block', block: b })
  }
  return sheet
}

/** Titres des sections `##` d'une fiche, avec leur ancre (sommaire). */
export function courseSections(source: string): { id: string; title: string }[] {
  return readSheet(source).sections.map((s) => ({ id: slugify(s.title), title: s.title }))
}
