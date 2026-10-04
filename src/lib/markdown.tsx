/**
 * Lecture Markdown minimale partagée par `Markdown` et `CourseSheet` : découpage en blocs et rendu
 * en ligne (gras, italique, code, liens internes `[texte](/cours/id)`). Aucun HTML brut n'est interprété.
 */
import { Fragment, type ReactNode } from 'react'
import { Link } from 'react-router-dom'

/** Renvois entre parenthèses (paragraphes, articles, normes) : affichés en retrait visuel dans les fiches. */
const REFERENCE =
  /\((?:§|art\.|arts\.|NEP|IAS|IFRS|IFRIC|PCG|CGI|LPF|BOI|ISA|CRR|MAR|ESRS|C\. ?(?:com|trav|civ|mon|fin|séc)\.|[LRD]\. ?\d|règl\.|dir\.|directive|décret|ordonnance|loi |Reg\.|Regulation|Directive|s\. ?\d)[^()]*\)/g

/**
 * Typographie française : espaces insécables dans les nombres (« 725 000 »), avant les unités
 * (« 500 € », « 20 % ») et avant « : ; ? ! », pour qu'aucun montant ni signe ne soit coupé en fin de ligne.
 */
export function typeset(text: string): string {
  return text
    .replace(/(\d) (?=\d{3}(?!\d))/g, '$1\u202f')
    .replace(/(\d) (?=(?:€|%|k€|M€|Md€|\$|£)(?![\p{L}\d]))/gu, '$1\u00a0')
    .replace(/ ([:;?!])(?=\s|$)/g, '\u00a0$1')
}

function plain(raw: string, refs: boolean, key: string): ReactNode[] {
  const text = typeset(raw)
  if (!refs) return [text]
  const out: ReactNode[] = []
  let last = 0
  for (const m of text.matchAll(REFERENCE)) {
    if (m.index > last) out.push(text.slice(last, m.index))
    out.push(
      <span key={`${key}-r${m.index}`} className="text-foreground/65 text-[0.85em]">
        {m[0]}
      </span>,
    )
    last = m.index + m[0].length
  }
  if (last < text.length) out.push(text.slice(last))
  return out
}

export interface InlineOptions {
  /** Atténue les renvois entre parenthèses (« (§16-22) », « (art. L. 225-38) »). */
  refs?: boolean
}

export function inline(text: string, opts: InlineOptions = {}): ReactNode[] {
  const out: ReactNode[] = []
  const re = /(\*\*[^*]+\*\*|\*[^*\s][^*]*\*|`[^`]+`|\[[^\]]+\]\([^)\s]+\))/g
  const refs = opts.refs ?? false
  let last = 0
  let m: RegExpExecArray | null
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(...plain(text.slice(last, m.index), refs, `${m.index}p`))
    const token = m[0]
    const key = `${m.index}`
    if (token.startsWith('**')) out.push(<strong key={key}>{inline(token.slice(2, -2), opts)}</strong>)
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
  if (last < text.length) out.push(...plain(text.slice(last), refs, 'end'))
  return out
}

export type Block =
  | { kind: 'heading'; level: number; text: string }
  | { kind: 'para'; lines: string[] }
  | { kind: 'list'; ordered: boolean; items: string[] }
  | { kind: 'table'; header: string[]; rows: string[][] }
  | { kind: 'code'; lang: string; body: string }

const cells = (row: string) =>
  row
    .trim()
    .replace(/^\|/, '')
    .replace(/\|$/, '')
    .split('|')
    .map((c) => c.trim())

const LIST_ITEM = /^\s*([-*]|\d+[.)])\s+/

/** Découpe un texte Markdown en blocs. */
export function parseBlocks(source: string): Block[] {
  const lines = source.replace(/\r\n/g, '\n').split('\n')
  const blocks: Block[] = []
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
      blocks.push({ kind: 'code', lang, body: body.join('\n') })
      continue
    }
    const heading = /^(#{1,4})\s+(.*)$/.exec(line)
    if (heading) {
      blocks.push({ kind: 'heading', level: heading[1].length, text: heading[2] })
      i++
      continue
    }
    if (LIST_ITEM.test(line)) {
      const ordered = /^\s*\d+[.)]\s+/.test(line)
      const items: string[] = []
      while (i < lines.length && LIST_ITEM.test(lines[i])) items.push(lines[i++].replace(LIST_ITEM, ''))
      blocks.push({ kind: 'list', ordered, items })
      continue
    }
    if (line.trim().startsWith('|') && i + 1 < lines.length && /^\s*\|?[\s:-]+\|/.test(lines[i + 1])) {
      const header = cells(line)
      i += 2
      const rows: string[][] = []
      while (i < lines.length && lines[i].trim().startsWith('|')) rows.push(cells(lines[i++]))
      blocks.push({ kind: 'table', header, rows })
      continue
    }
    const para: string[] = []
    while (
      i < lines.length &&
      lines[i].trim() !== '' &&
      !/^(#{1,4})\s/.test(lines[i]) &&
      !LIST_ITEM.test(lines[i]) &&
      !lines[i].trim().startsWith('|') &&
      !lines[i].trim().startsWith('```')
    ) {
      para.push(lines[i].trim())
      i++
    }
    blocks.push({ kind: 'para', lines: para })
  }
  return blocks
}
