/**
 * Rendu Markdown minimal pour les fiches de cours (titres, paragraphes, listes,
 * tableaux simples, gras, italique, code, liens internes `[texte](/cours/id)` et
 * blocs ```diagram). Le contenu est produit par le projet ; aucun HTML brut n'est interprété.
 */
import { Fragment, type ReactNode } from 'react'
import { Link } from 'react-router-dom'

import { parseDiagram } from '@/content/diagram'

import { Diagram } from './Diagram'

function inline(text: string): ReactNode[] {
  const out: ReactNode[] = []
  const re = /(\*\*[^*]+\*\*|\*[^*\s][^*]*\*|`[^`]+`|\[[^\]]+\]\([^)\s]+\))/g
  let last = 0
  let m: RegExpExecArray | null
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index))
    const token = m[0]
    const key = `${m.index}`
    if (token.startsWith('**')) out.push(<strong key={key}>{token.slice(2, -2)}</strong>)
    else if (token.startsWith('`')) out.push(<code key={key} className="bg-muted rounded px-1 text-[0.9em]">{token.slice(1, -1)}</code>)
    else if (token.startsWith('[')) {
      const link = /^\[([^\]]+)\]\(([^)\s]+)\)$/.exec(token)!
      const [, label, href] = link
      // Seuls les liens internes (chemin absolu de l'app) sont rendus comme liens ; le reste reste du texte.
      out.push(
        href.startsWith('/') ? (
          <Link key={key} to={href} className="text-primary underline underline-offset-2">
            {inline(label)}
          </Link>
        ) : (
          <Fragment key={key}>{label}</Fragment>
        ),
      )
    } else out.push(<em key={key}>{token.slice(1, -1)}</em>)
    last = m.index + token.length
  }
  if (last < text.length) out.push(text.slice(last))
  return out
}

const cells = (row: string) =>
  row
    .trim()
    .replace(/^\|/, '')
    .replace(/\|$/, '')
    .split('|')
    .map((c) => c.trim())

/** `pageTitle` : le titre `#` devient le titre principal de la page (`h1`) au lieu d'un `h2`. */
export function Markdown({ source, pageTitle = false }: { source: string; pageTitle?: boolean }) {
  const lines = source.replace(/\r\n/g, '\n').split('\n')
  const blocks: ReactNode[] = []
  let i = 0
  while (i < lines.length) {
    const line = lines[i]
    if (line.trim() === '') {
      i++
      continue
    }
    if (line.trim().startsWith('```')) {
      const lang = line.trim().slice(3).trim()
      const body: string[] = []
      i++
      while (i < lines.length && !lines[i].trim().startsWith('```')) body.push(lines[i++])
      i++
      if (lang === 'diagram') {
        const parsed = parseDiagram(body.join('\n'))
        blocks.push(
          parsed.ok ? (
            <Diagram key={i} spec={parsed.diagram} />
          ) : (
            <p key={i} className="text-destructive text-xs">
              Diagramme illisible : {parsed.error}
            </p>
          ),
        )
      } else {
        blocks.push(
          <pre key={i} className="bg-muted overflow-x-auto rounded-md p-3 text-xs">
            <code>{body.join('\n')}</code>
          </pre>,
        )
      }
      continue
    }
    const heading = /^(#{1,4})\s+(.*)$/.exec(line)
    if (heading) {
      const level = heading[1].length
      const cls = level === 1 ? 'text-xl font-bold' : level === 2 ? 'mt-2 text-lg font-semibold' : 'font-semibold'
      const Tag = (`h${Math.min(level + (pageTitle ? 0 : 1), 4)}`) as 'h1' | 'h2' | 'h3' | 'h4'
      blocks.push(<Tag key={i} className={cls}>{inline(heading[2])}</Tag>)
      i++
      continue
    }
    if (/^\s*[-*]\s+/.test(line) || /^\s*\d+[.)]\s+/.test(line)) {
      const ordered = /^\s*\d+[.)]\s+/.test(line)
      const items: string[] = []
      while (i < lines.length && (/^\s*[-*]\s+/.test(lines[i]) || /^\s*\d+[.)]\s+/.test(lines[i]))) {
        items.push(lines[i].replace(/^\s*([-*]|\d+[.)])\s+/, ''))
        i++
      }
      const List = ordered ? 'ol' : 'ul'
      blocks.push(
        <List key={i} className={ordered ? 'list-decimal pl-6' : 'list-disc pl-6'}>
          {items.map((it, j) => (
            <li key={j}>{inline(it)}</li>
          ))}
        </List>,
      )
      continue
    }
    if (line.trim().startsWith('|') && i + 1 < lines.length && /^\s*\|?[\s:-]+\|/.test(lines[i + 1])) {
      const header = cells(line)
      i += 2
      const rows: string[][] = []
      while (i < lines.length && lines[i].trim().startsWith('|')) rows.push(cells(lines[i++]))
      blocks.push(
        <div key={i} className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr>
                {header.map((h, j) => (
                  <th key={j} className="border-b py-1 pr-3 text-left font-semibold">
                    {inline(h)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r, j) => (
                <tr key={j}>
                  {r.map((c, k) => (
                    <td key={k} className="border-b py-1 pr-3">
                      {inline(c)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>,
      )
      continue
    }
    const para: string[] = []
    while (
      i < lines.length &&
      lines[i].trim() !== '' &&
      !/^(#{1,4})\s/.test(lines[i]) &&
      !/^\s*([-*]|\d+[.)])\s+/.test(lines[i]) &&
      !lines[i].trim().startsWith('|') &&
      !lines[i].trim().startsWith('```')
    ) {
      para.push(lines[i].trim())
      i++
    }
    blocks.push(
      <p key={i}>
        {para.map((p, j) => (
          <Fragment key={j}>
            {j > 0 && <br />}
            {inline(p)}
          </Fragment>
        ))}
      </p>,
    )
  }
  return <div className="flex flex-col gap-3 leading-relaxed">{blocks}</div>
}
