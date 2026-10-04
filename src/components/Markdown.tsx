/**
 * Rendu Markdown minimal (titres, paragraphes, listes, tableaux simples, gras, italique, code,
 * liens internes `[texte](/cours/id)` et blocs ```diagram). Le contenu est produit par le projet ;
 * aucun HTML brut n'est interprété. Les fiches de cours ont leur propre mise en page (`CourseSheet`).
 */
import { Fragment } from 'react'

import { parseDiagram } from '@/content/diagram'
import { inline, parseBlocks, type InlineOptions } from '@/lib/markdown'

import { Diagram } from './Diagram'

/** Bloc de code ou diagramme. */
export function CodeBlock({ lang, body }: { lang: string; body: string }) {
  if (lang === 'diagram') {
    const parsed = parseDiagram(body)
    return parsed.ok ? <Diagram spec={parsed.diagram} /> : <p className="text-destructive text-xs">Diagramme illisible : {parsed.error}</p>
  }
  return (
    <pre className="bg-muted overflow-x-auto rounded-md p-3 text-xs">
      <code>{body}</code>
    </pre>
  )
}

export function Table({ header, rows, opts }: { header: string[]; rows: string[][]; opts?: InlineOptions }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr>
            {header.map((h, j) => (
              <th key={j} className="border-b py-1 pr-3 text-left font-semibold">
                {inline(h, opts)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, j) => (
            <tr key={j}>
              {r.map((c, k) => (
                <td key={k} className="border-b py-1 pr-3">
                  {inline(c, opts)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

/** `pageTitle` : le titre `#` devient le titre principal de la page (`h1`) au lieu d'un `h2`. */
export function Markdown({ source, pageTitle = false }: { source: string; pageTitle?: boolean }) {
  return (
    <div className="flex flex-col gap-3 leading-relaxed">
      {parseBlocks(source).map((b, i) => {
        if (b.kind === 'code') return <CodeBlock key={i} lang={b.lang} body={b.body} />
        if (b.kind === 'heading') {
          const cls = b.level === 1 ? 'text-xl font-bold' : b.level === 2 ? 'mt-2 text-lg font-semibold' : 'font-semibold'
          const Tag = `h${Math.min(b.level + (pageTitle ? 0 : 1), 4)}` as 'h1' | 'h2' | 'h3' | 'h4'
          return (
            <Tag key={i} className={cls}>
              {inline(b.text)}
            </Tag>
          )
        }
        if (b.kind === 'list') {
          const List = b.ordered ? 'ol' : 'ul'
          return (
            <List key={i} className={b.ordered ? 'list-decimal pl-6' : 'list-disc pl-6'}>
              {b.items.map((it, j) => (
                <li key={j}>{inline(it)}</li>
              ))}
            </List>
          )
        }
        if (b.kind === 'table') return <Table key={i} header={b.header} rows={b.rows} />
        return (
          <p key={i}>
            {b.lines.map((p, j) => (
              <Fragment key={j}>
                {j > 0 && <br />}
                {inline(p)}
              </Fragment>
            ))}
          </p>
        )
      })}
    </div>
  )
}
