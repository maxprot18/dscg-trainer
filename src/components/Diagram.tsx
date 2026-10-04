/**
 * Rendu des diagrammes déclaratifs des fiches (voir `src/content/diagram.ts`).
 * Les formes textuelles (frise, arbre, flux) sont en HTML pour que le texte se replie sur mobile ;
 * l'organigramme et les barres sont en SVG. Couleurs : jetons du thème (clair et sombre),
 * texte toujours dans la couleur du texte.
 */
import { ArrowDown } from 'lucide-react'
import { Fragment } from 'react'

import type { Diagram as DiagramSpec, TreeNode } from '@/content/diagram'
import { formatNumber } from '@/engine/numbers'

export function Diagram({ spec }: { spec: DiagramSpec }) {
  return (
    <figure className="bg-muted/40 my-1 rounded-xl border p-3 text-sm">
      <figcaption className="text-muted-foreground mb-2 text-xs font-semibold tracking-wide uppercase">{spec.title}</figcaption>
      {spec.type === 'timeline' && <Timeline spec={spec} />}
      {spec.type === 'tree' && <Tree spec={spec} />}
      {spec.type === 'flow' && <Flow spec={spec} />}
      {spec.type === 'org' && <Org spec={spec} />}
      {spec.type === 'bars' && <Bars spec={spec} />}
    </figure>
  )
}

function Timeline({ spec }: { spec: Extract<DiagramSpec, { type: 'timeline' }> }) {
  return (
    <ol className="relative flex flex-col gap-3 border-l-2 pl-4">
      {spec.items.map((item, i) => (
        <li key={i} className="relative">
          <span aria-hidden className="bg-primary border-background absolute top-1.5 -left-[23px] size-3 rounded-full border-2" />
          {item.when && <span className="text-muted-foreground block text-xs">{item.when}</span>}
          <span className="font-medium">{item.label}</span>
          {item.note && <span className="text-muted-foreground block text-xs">{item.note}</span>}
        </li>
      ))}
    </ol>
  )
}

function TreeBranch({ node, depth }: { node: TreeNode; depth: number }) {
  return (
    <li className="flex flex-col gap-1">
      <div className="flex flex-wrap items-baseline gap-x-2">
        {node.edge && (
          <span className="bg-background rounded border px-1.5 py-0.5 text-xs font-medium">{node.edge}</span>
        )}
        <span className={node.children?.length ? 'font-medium' : 'text-primary font-semibold'}>{node.label}</span>
        {node.note && <span className="text-muted-foreground text-xs">{node.note}</span>}
      </div>
      {node.children && node.children.length > 0 && (
        <ul className={depth >= 3 ? 'ml-3 flex flex-col gap-1 border-l pl-3' : 'ml-2 flex flex-col gap-1 border-l-2 pl-3'}>
          {node.children.map((c, i) => (
            <TreeBranch key={i} node={c} depth={depth + 1} />
          ))}
        </ul>
      )}
    </li>
  )
}

function Tree({ spec }: { spec: Extract<DiagramSpec, { type: 'tree' }> }) {
  return (
    <ul className="flex flex-col gap-1">
      <TreeBranch node={spec.root} depth={0} />
    </ul>
  )
}

function Flow({ spec }: { spec: Extract<DiagramSpec, { type: 'flow' }> }) {
  return (
    <ol className="flex flex-col gap-1 sm:flex-row sm:flex-wrap sm:items-stretch sm:gap-2">
      {spec.steps.map((step, i) => (
        <Fragment key={i}>
          <li className="bg-background flex min-w-0 flex-1 flex-col rounded-lg border px-3 py-2 sm:basis-36">
            <span className="text-muted-foreground text-xs">{i + 1}</span>
            <span className="font-medium">{step.label}</span>
            {step.note && <span className="text-muted-foreground text-xs">{step.note}</span>}
          </li>
          {i < spec.steps.length - 1 && (
            <li aria-hidden className="text-muted-foreground flex items-center justify-center self-center">
              <ArrowDown className="size-4 sm:-rotate-90" />
            </li>
          )}
        </Fragment>
      ))}
    </ol>
  )
}

/** Organigramme : niveaux calculés depuis les nœuds sans détenteur, un niveau par ligne. */
function Org({ spec }: { spec: Extract<DiagramSpec, { type: 'org' }> }) {
  const level = new Map<string, number>()
  const targets = new Set(spec.links.map((l) => l.to))
  const queue = spec.nodes.filter((n) => !targets.has(n.id)).map((n) => n.id)
  for (const id of queue) level.set(id, 0)
  for (let guard = 0; queue.length > 0 && guard < 200; guard++) {
    const id = queue.shift()!
    for (const l of spec.links) {
      if (l.from !== id) continue
      const next = (level.get(id) ?? 0) + 1
      if ((level.get(l.to) ?? -1) < next) {
        level.set(l.to, next)
        queue.push(l.to)
      }
    }
  }
  for (const n of spec.nodes) if (!level.has(n.id)) level.set(n.id, 0)
  const rows = new Map<number, string[]>()
  for (const n of spec.nodes) rows.set(level.get(n.id)!, [...(rows.get(level.get(n.id)!) ?? []), n.id])
  const depth = Math.max(...rows.keys()) + 1
  const W = 600
  const BOX_W = 112
  const BOX_H = 34
  const ROW_H = 84
  const pos = new Map<string, { x: number; y: number }>()
  for (const [lvl, ids] of rows) {
    const gap = W / (ids.length + 1)
    ids.forEach((id, i) => pos.set(id, { x: gap * (i + 1), y: lvl * ROW_H + BOX_H / 2 + 6 }))
  }
  const H = (depth - 1) * ROW_H + BOX_H + 12
  const labels = new Map(spec.nodes.map((n) => [n.id, n.label]))
  const description = spec.links
    .map((l) => `${labels.get(l.from)} détient ${l.label ? `${l.label} de ` : ''}${labels.get(l.to)}`)
    .join(' ; ')
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="img" aria-label={`${spec.title}. ${description}`}>
      <title>{spec.title}</title>
      {spec.links.map((l, i) => {
        const a = pos.get(l.from)!
        const b = pos.get(l.to)!
        const x1 = a.x
        const y1 = a.y + BOX_H / 2
        const x2 = b.x
        const y2 = b.y - BOX_H / 2
        const mx = (x1 + x2) / 2
        const my = (y1 + y2) / 2
        return (
          <g key={i}>
            <line x1={x1} y1={y1} x2={x2} y2={y2} className="stroke-muted-foreground" strokeWidth={1.5} />
            {l.label && (
              <>
                <rect x={mx - 24} y={my - 9} width={48} height={18} rx={4} className="fill-background stroke-border" />
                <text x={mx} y={my + 4} textAnchor="middle" className="fill-foreground text-[11px] font-medium">
                  {l.label}
                </text>
              </>
            )}
          </g>
        )
      })}
      {spec.nodes.map((n) => {
        const p = pos.get(n.id)!
        const root = level.get(n.id) === 0
        return (
          <g key={n.id}>
            <rect
              x={p.x - BOX_W / 2}
              y={p.y - BOX_H / 2}
              width={BOX_W}
              height={BOX_H}
              rx={6}
              className={root ? 'fill-primary stroke-primary' : 'fill-background stroke-border'}
              strokeWidth={1.5}
            />
            <text
              x={p.x}
              y={p.y + 4}
              textAnchor="middle"
              className={root ? 'fill-primary-foreground text-[12px] font-semibold' : 'fill-foreground text-[12px]'}
            >
              {n.label}
            </text>
          </g>
        )
      })}
    </svg>
  )
}

/** Barres horizontales, une seule teinte (grandeur), libellés en couleur de texte. */
function Bars({ spec }: { spec: Extract<DiagramSpec, { type: 'bars' }> }) {
  const max = Math.max(...spec.items.map((i) => Math.abs(i.value)), 1e-9)
  const hasNegative = spec.items.some((i) => i.value < 0)
  const LABEL_W = 150
  const W = 600
  const ROW = 26
  const plotW = W - LABEL_W - 70
  const zero = hasNegative ? LABEL_W + plotW / 2 : LABEL_W
  const scale = (hasNegative ? plotW / 2 : plotW) / max
  const H = spec.items.length * ROW + 6
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="img" aria-label={spec.title}>
      <title>{spec.title}</title>
      <desc>{spec.items.map((i) => `${i.label} : ${formatNumber(i.value)}${spec.unit ? ` ${spec.unit}` : ''}`).join(' ; ')}</desc>
      <line x1={zero} y1={0} x2={zero} y2={H} className="stroke-border" strokeWidth={1} />
      {spec.items.map((item, i) => {
        const y = i * ROW + 4
        const w = Math.abs(item.value) * scale
        const x = item.value >= 0 ? zero : zero - w
        return (
          <g key={i}>
            <title>{`${item.label} : ${formatNumber(item.value)}${spec.unit ? ` ${spec.unit}` : ''}`}</title>
            <text x={LABEL_W - 8} y={y + 14} textAnchor="end" className="fill-foreground text-[12px]">
              {item.label}
            </text>
            <rect x={x} y={y} width={Math.max(w, 1)} height={ROW - 8} rx={3} className="fill-primary" />
            <text
              x={item.value >= 0 ? x + w + 6 : x - 6}
              y={y + 14}
              textAnchor={item.value >= 0 ? 'start' : 'end'}
              className="fill-muted-foreground text-[11px]"
            >
              {formatNumber(item.value)}
              {spec.unit ? ` ${spec.unit}` : ''}
            </text>
          </g>
        )
      })}
    </svg>
  )
}
