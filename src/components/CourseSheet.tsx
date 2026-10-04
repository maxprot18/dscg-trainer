/**
 * Mise en page d'une fiche de cours : la structure fixe des fiches (`docs/content-guide.md`) est
 * reconnue et chaque partie a son habillage — enjeu en encadré, règles titrées, formules isolées,
 * exemple en carte avec les calculs détachés, erreurs fréquentes « erreur → bonne règle »,
 * points à retenir cochés, notions liées en pastilles, glossaire en deux colonnes (UE 6).
 * Une fiche qui s'écarte de la structure reste lisible : les blocs inconnus sont rendus tels quels.
 */
import { AlertTriangle, ArrowRight, BookMarked, Calculator, CheckCircle2, Languages, Lightbulb, Sigma, Target, XCircle } from 'lucide-react'
import { Fragment, type ReactNode } from 'react'
import { Link } from 'react-router-dom'

import { glossaryEntry, slugify, splitMistake, splitSentences, type SectionKind } from '@/content/courseText'
import { readSheet, type Node, type Section } from '@/content/courseSheet'
import { inline, type Block } from '@/lib/markdown'
import { cn } from '@/lib/utils'

import { CodeBlock, Table } from './Markdown'

const REFS = { refs: true }

function SheetList({ block, className }: { block: Extract<Block, { kind: 'list' }>; className?: string }) {
  const List = block.ordered ? 'ol' : 'ul'
  return (
    <List className={cn('flex flex-col gap-1.5 pl-5', block.ordered ? 'list-decimal' : 'marker:text-primary list-disc', className)}>
      {block.items.map((it, j) => (
        <li key={j} className="pl-1">
          {inline(it, REFS)}
        </li>
      ))}
    </List>
  )
}

/** Ligne de calcul : contient un signe égal ou une flèche de résultat. */
const isCalculation = (s: string) => /\s=\s|\s→\s|\s≈\s/.test(s)

/** Paragraphe d'exemple : une phrase par ligne, les calculs détachés et alignés. */
function ExampleParagraph({ lines }: { lines: string[] }) {
  const sentences = lines.flatMap((l) => (l.length > 140 ? splitSentences(l) : [l]))
  return (
    <div className="flex flex-col gap-1.5">
      {sentences.map((s, j) => (
        <p key={j} className={isCalculation(s) ? 'border-primary/40 border-l-2 pl-3 font-medium tabular-nums' : undefined}>
          {inline(s, REFS)}
        </p>
      ))}
    </div>
  )
}

function NodeView({ node, section }: { node: Node; section?: SectionKind }) {
  if (node.kind === 'subheading') return <p className="font-semibold">{inline(node.text, REFS)}</p>
  if (node.kind === 'formulas') {
    return (
      <div className="bg-muted/60 rounded-lg border px-3 py-2">
        <p className="text-muted-foreground mb-1 flex items-center gap-1.5 text-xs font-semibold tracking-wide uppercase">
          <Sigma aria-hidden className="size-3.5" /> {node.label}
        </p>
        <ul className="flex flex-col gap-1">
          {node.items.map((f, j) => (
            <li key={j} className="font-medium tabular-nums">
              {inline(f, REFS)}
            </li>
          ))}
        </ul>
      </div>
    )
  }
  if (node.kind === 'rule') {
    return (
      <div className="flex flex-col gap-1.5">
        <p>
          <span className="bg-primary mr-2 inline-block h-3.5 w-1 rounded-full align-[-1px]" aria-hidden />
          <strong className="font-semibold">{inline(node.label, REFS)}</strong>
          {node.text && <> : {inline(node.text, REFS)}</>}
        </p>
        {node.list?.kind === 'list' && <SheetList block={node.list} />}
      </div>
    )
  }
  const b = node.block
  if (b.kind === 'code') return <CodeBlock lang={b.lang} body={b.body} />
  if (b.kind === 'table') return <Table header={b.header} rows={b.rows} opts={REFS} />
  if (b.kind === 'list') return <SheetList block={b} />
  if (b.kind === 'heading') return <p className="font-semibold">{inline(b.text, REFS)}</p>
  if (section === 'example') return <ExampleParagraph lines={b.lines} />
  return (
    <p>
      {b.lines.map((p, j) => (
        <Fragment key={j}>
          {j > 0 && <br />}
          {inline(p, REFS)}
        </Fragment>
      ))}
    </p>
  )
}

function Mistakes({ nodes, english }: { nodes: Node[]; english: boolean }) {
  return (
    <>
      {nodes.map((node, i) =>
        node.kind === 'block' && node.block.kind === 'list' ? (
          <ul key={i} className="divide-warn/20 flex flex-col divide-y">
            {node.block.items.map((item, j) => {
              const { mistake, fix } = splitMistake(item)
              return (
                <li key={j} className="flex flex-col gap-1 py-2 first:pt-0 last:pb-0">
                  <p className="flex gap-2">
                    <XCircle aria-hidden className="text-destructive mt-[0.3em] size-4 shrink-0" />
                    <span>
                      <span className="sr-only">{english ? 'Mistake: ' : 'Erreur : '}</span>
                      <span className="font-medium">{inline(mistake, REFS)}</span>
                    </span>
                  </p>
                  {fix && (
                    <p className="flex gap-2">
                      <CheckCircle2 aria-hidden className="text-ok mt-[0.3em] size-4 shrink-0" />
                      <span>
                        <span className="sr-only">{english ? 'Correct rule: ' : 'Bonne règle : '}</span>
                        {inline(fix, REFS)}
                      </span>
                    </p>
                  )}
                </li>
              )
            })}
          </ul>
        ) : (
          <NodeView key={i} node={node} section="mistakes" />
        ),
      )}
    </>
  )
}

function KeyPoints({ nodes }: { nodes: Node[] }) {
  return (
    <>
      {nodes.map((node, i) =>
        node.kind === 'block' && node.block.kind === 'list' ? (
          <ul key={i} className="flex flex-col gap-2">
            {node.block.items.map((item, j) => (
              <li key={j} className="flex gap-2">
                <CheckCircle2 aria-hidden className="text-ok mt-[0.3em] size-4 shrink-0" />
                <span>{inline(item, REFS)}</span>
              </li>
            ))}
          </ul>
        ) : (
          <NodeView key={i} node={node} section="keypoints" />
        ),
      )}
    </>
  )
}

const SECTION_STYLE: Record<SectionKind, { box: string; icon: ReactNode }> = {
  example: { box: 'bg-card border shadow-xs', icon: <Calculator aria-hidden className="text-primary size-5" /> },
  mistakes: { box: 'bg-warn/8 border-warn/40 border', icon: <AlertTriangle aria-hidden className="text-warn size-5" /> },
  keypoints: { box: 'bg-ok/8 border-ok/40 border', icon: <Lightbulb aria-hidden className="text-ok size-5" /> },
  other: { box: '', icon: null },
}

function SectionView({ section, level }: { section: Section; level: 2 | 4 }) {
  const id = slugify(section.title)
  const H = `h${level}` as 'h2' | 'h4'
  const style = SECTION_STYLE[section.kind]
  const english = /^common mistakes$/i.test(section.title)
  return (
    <section aria-labelledby={id} className={cn('flex scroll-mt-4 flex-col gap-3', style.box && `rounded-xl p-4 ${style.box}`)}>
      <H id={id} className="flex items-center gap-2 text-lg font-semibold">
        {style.icon}
        {inline(section.title)}
      </H>
      {section.kind === 'mistakes' ? (
        <Mistakes nodes={section.nodes} english={english} />
      ) : section.kind === 'keypoints' ? (
        <KeyPoints nodes={section.nodes} />
      ) : (
        section.nodes.map((n, i) => <NodeView key={i} node={n} section={section.kind} />)
      )}
    </section>
  )
}

/**
 * `titleLevel` : 1 sur la page de la fiche (titre `h1`, sections `h2`), 3 dans la page d'impression
 * d'une UE (titre `h3`, sections `h4`). `nav` : raccourcis vers les sections, sur petit écran.
 */
export function CourseSheet({ source, titleLevel = 1, nav = false }: { source: string; titleLevel?: 1 | 3; nav?: boolean }) {
  const sheet = readSheet(source)
  const Title = `h${titleLevel}` as 'h1' | 'h3'
  const sectionLevel = titleLevel === 1 ? 2 : 4
  // Fiches de l'UE 6 en anglais : langue déclarée (lecteurs d'écran, coupure des mots).
  const english = sheet.stake?.label.toLowerCase() === 'key issue' || sheet.references?.label === 'References'
  return (
    <div lang={english ? 'en' : undefined} className="flex flex-col gap-4 text-[15px] leading-[1.7] sm:text-base">
      {sheet.title && <Title className={titleLevel === 1 ? 'text-2xl leading-tight font-bold' : 'text-lg font-bold'}>{inline(sheet.title)}</Title>}
      {sheet.references && (
        <p className="text-muted-foreground flex gap-1.5 text-xs leading-5">
          <BookMarked aria-hidden className="mt-0.5 size-3.5 shrink-0" />
          <span>
            <span className="font-semibold">{sheet.references.label}</span> · {inline(sheet.references.text)}
          </span>
        </p>
      )}
      {sheet.stake && (
        <div className="border-primary bg-primary/6 rounded-r-lg border-l-4 px-4 py-3">
          <p className="flex gap-2">
            <Target aria-hidden className="text-primary mt-[0.35em] size-4 shrink-0" />
            <span>
              <strong className="font-semibold">{sheet.stake.label}</strong> — {inline(sheet.stake.text, REFS)}
            </span>
          </p>
        </div>
      )}
      {nav && sheet.sections.length > 0 && (
        <nav aria-label="Aller à une section" className="no-print flex flex-wrap gap-2 lg:hidden">
          {sheet.sections.map((s) => (
            <a key={s.title} href={`#${slugify(s.title)}`} className="hover:bg-accent rounded-full border px-3 py-0.5 text-sm">
              {s.title}
            </a>
          ))}
        </nav>
      )}
      {sheet.body.map((n, i) => (
        <NodeView key={i} node={n} />
      ))}
      {sheet.sections.map((s, i) => (
        <SectionView key={i} section={s} level={sectionLevel} />
      ))}
      {sheet.glossary && (
        <section aria-label={sheet.glossary.label} className="flex flex-col gap-2">
          <p className="flex items-center gap-2 font-semibold">
            <Languages aria-hidden className="text-primary size-4" /> {sheet.glossary.label}
          </p>
          <dl className="grid grid-cols-1 gap-x-6 gap-y-1 text-sm sm:grid-cols-[max-content_1fr]">
            {sheet.glossary.items.map((item, i) => {
              const { term, translation } = glossaryEntry(item)
              return (
                <Fragment key={i}>
                  <dt className="font-medium">{term}</dt>
                  <dd className="text-muted-foreground mb-1 sm:mb-0">{translation}</dd>
                </Fragment>
              )
            })}
          </dl>
        </section>
      )}
      {sheet.related && (
        <nav aria-label={sheet.related.label} className="no-print flex flex-col gap-2">
          <p className="text-sm font-semibold">{sheet.related.label}</p>
          <ul className="flex flex-wrap gap-2">
            {sheet.related.items.map((item, i) => {
              const link = /^\[([^\]]+)\]\((\/[^)\s]+)\)$/.exec(item)
              return (
                <li key={i}>
                  {link ? (
                    <Link to={link[2]} className="hover:bg-accent inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-sm">
                      <ArrowRight aria-hidden className="text-primary size-3.5" />
                      {link[1]}
                    </Link>
                  ) : (
                    <span className="text-sm">{inline(item)}</span>
                  )}
                </li>
              )
            })}
          </ul>
        </nav>
      )}
    </div>
  )
}
