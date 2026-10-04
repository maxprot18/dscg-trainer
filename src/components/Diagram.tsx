/**
 * Rendu des diagrammes déclaratifs des fiches (voir `src/content/diagram.ts`).
 * Les formes textuelles (frise, arbre, flux) sont en HTML pour que le texte se replie sur mobile ;
 * l'organigramme et les barres sont en SVG. Couleurs : jetons du thème (clair et sombre),
 * texte toujours dans la couleur du texte.
 */
import { ArrowDown } from 'lucide-react'
import { Fragment, useId, useLayoutEffect, useRef, useState } from 'react'

import type { Diagram as DiagramSpec, TreeNode } from '@/content/diagram'
import { formatNumber } from '@/engine/numbers'
import { cn } from '@/lib/utils'

export function Diagram({ spec }: { spec: DiagramSpec }) {
  return (
    <figure className="bg-muted/40 my-1 rounded-xl border p-3 text-sm leading-snug sm:p-4">
      <figcaption className="mb-3 font-semibold">{spec.title}</figcaption>
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
    <ol className="relative ml-1 flex flex-col gap-3 border-l-2 pl-4">
      {spec.items.map((item, i) => (
        <li key={i} className="relative">
          <span aria-hidden className="bg-primary border-background absolute top-1.5 -left-[23px] size-3 rounded-full border-2" />
          {item.when && <span className="text-primary block text-xs font-semibold">{item.when}</span>}
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
        <span className={node.children?.length ? 'font-medium' : 'bg-primary/10 text-foreground rounded-md px-2 py-0.5 font-semibold'}>{node.label}</span>
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
            <span className="flex items-start gap-2">
              <span aria-hidden className="bg-primary text-primary-foreground mt-px flex size-5 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold">
                {i + 1}
              </span>
              <span className="font-medium">{step.label}</span>
            </span>
            {step.note && <span className="text-muted-foreground mt-0.5 pl-7 text-xs">{step.note}</span>}
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

/**
 * Organigramme : un niveau par ligne (niveaux calculés depuis les nœuds sans détenteur), boîtes en HTML
 * pour que le texte garde sa taille sur téléphone ; les liens sont tracés en SVG sous les boîtes à
 * partir de leurs positions mesurées, et les pourcentages posés en pastilles.
 */
function Org({ spec }: { spec: Extract<DiagramSpec, { type: 'org' }> }) {
  const { level, back } = orgLevels(spec)
  const depth = Math.max(...level.values()) + 1
  // Ordre dans chaque ligne : celui du premier détenteur, pour limiter les croisements.
  const rows: string[][] = []
  for (let d = 0; d < depth; d++) {
    const ids = spec.nodes.filter((n) => level.get(n.id) === d).map((n) => n.id)
    if (d > 0) {
      const prev = rows.flat()
      const parentRank = (id: string) => {
        const ranks = spec.links.filter((l) => l.to === id).map((l) => prev.indexOf(l.from)).filter((r) => r >= 0)
        return ranks.length ? Math.min(...ranks) : Number.MAX_SAFE_INTEGER
      }
      ids.sort((x, y) => parentRank(x) - parentRank(y))
    }
    rows.push(ids)
  }
  const labels = new Map(spec.nodes.map((n) => [n.id, n.label]))
  const description = spec.links
    .map((l) => `${labels.get(l.from)} détient ${l.label ? `${l.label} de ` : ''}${labels.get(l.to)}`)
    .join(' ; ')

  const markerId = useId().replace(/:/g, '')
  const container = useRef<HTMLDivElement>(null)
  const boxes = useRef(new Map<string, HTMLDivElement>())
  const [geo, setGeo] = useState<{ w: number; h: number; lines: OrgLine[] } | null>(null)
  useLayoutEffect(() => {
    const el = container.current
    if (!el) return
    const measure = () => {
      const base = el.getBoundingClientRect()
      const rect = (id: string) => {
        const r = boxes.current.get(id)?.getBoundingClientRect()
        return r && { left: r.left - base.left, right: r.right - base.left, top: r.top - base.top, bottom: r.bottom - base.top }
      }
      type Box = NonNullable<ReturnType<typeof rect>>
      const cx = (r: Box) => (r.left + r.right) / 2
      // Premier passage : sens de tracé (du haut vers le bas) et couloir de contournement éventuel.
      const plans = spec.links.map((l, i) => {
        const isBack = back.has(i)
        const [up, down] = isBack ? [l.to, l.from] : [l.from, l.to]
        const a = rect(up)
        const b = rect(down)
        if (!a || !b) return null
        const lo = level.get(up) ?? 0
        const hi = level.get(down) ?? 0
        const between = spec.nodes
          .filter((n) => (level.get(n.id) ?? 0) > lo && (level.get(n.id) ?? 0) < hi)
          .map((n) => rect(n.id))
          .filter((r): r is Box => !!r)
        const hits = (x: number) => between.filter((r) => r.right > x - 8 && r.left < x + 8)
        const blockers = between.filter((r) => r.right > Math.min(cx(a), cx(b)) - 8 && r.left < Math.max(cx(a), cx(b)) + 8)
        let side: number | null = null
        if (blockers.length) {
          // Couloir vertical libre au-delà des boîtes traversées et de la cible (repoussé tant qu'une boîte
          // intermédiaire gêne) ; du côté le plus proche de la source, s'il tient dans le cadre.
          let right = Math.max(...blockers.map((r) => r.right), b.right) + 18
          for (let h = hits(right); h.length; h = hits(right)) right = Math.max(...h.map((r) => r.right)) + 18
          let left = Math.min(...blockers.map((r) => r.left), b.left) - 18
          for (let h = hits(left); h.length; h = hits(left)) left = Math.min(...h.map((r) => r.left)) - 18
          const fits = (x: number) => x >= 4 && x <= base.width - 4
          const options = [right, left].filter(fits).sort((p, q) => Math.abs(p - cx(a)) - Math.abs(q - cx(a)))
          side = options[0] ?? Math.min(right, base.width - 4)
        }
        return { l, i, isBack, up, down, a, b, side }
      })
      const lines: OrgLine[] = []
      for (const plan of plans) {
        if (!plan) continue
        const { l, i, isBack, down, a, b, side } = plan
        if (side !== null) {
          // Contournement : sortie sous la source, couloir vertical, entrée par le côté de la cible.
          const right = side > cx(b)
          const xa = cx(a)
          const ya = a.bottom
          const yg = a.bottom + 14
          const xb = right ? b.right : b.left
          const yb = (b.top + b.bottom) / 2
          const r = 8
          const s1 = side > xa ? 1 : -1
          const s2 = right ? 1 : -1
          const path = `M${xa},${ya} L${xa},${yg - r} Q${xa},${yg} ${xa + s1 * r},${yg} L${side - s1 * r},${yg} Q${side},${yg} ${side},${yg + r} L${side},${yb - r} Q${side},${yb} ${side - s2 * r},${yb} L${xb},${yb}`
          lines.push({ path, label: l.label, lx: side, ly: (yg + yb) / 2, arrowAtTop: isBack })
          continue
        }
        // Liens réciproques (apport et rémunération, dividendes) : deux traits parallèles.
        const paired = spec.links.some((o, j) => j !== i && o.from === l.to && o.to === l.from)
        const dx = paired ? (isBack ? 10 : -10) : 0
        // Plusieurs liens directs arrivant sur la même boîte : arrivées réparties sur sa largeur.
        const incoming = plans.filter((q) => q && q.side === null && !q.isBack && q.down === down && !paired)
        const k = incoming.findIndex((q) => q?.i === i)
        const x1 = cx(a) + dx
        const y1 = a.bottom
        const x2 = (!isBack && incoming.length > 1 && k >= 0 ? b.left + ((b.right - b.left) * (k + 1)) / (incoming.length + 1) : cx(b)) + dx
        const y2 = b.top
        // Pastille posée le long du trait, à la première position qui ne chevauche pas une pastille déjà posée
        // (liens réciproques : positions décalées dès le départ).
        const tries = paired ? (isBack ? [0.62, 0.75] : [0.38, 0.25]) : [0.5, 0.32, 0.68, 0.22, 0.78]
        const at = (t: number) => ({ lx: x1 + (x2 - x1) * t + (paired ? dx * 3 : 0), ly: y1 + (y2 - y1) * t })
        const free = l.label ? tries.map(at).find((p) => !lines.some((o) => o.label && collide(o, p, l.label!))) : undefined
        lines.push({ path: `M${x1},${y1} L${x2},${y2}`, label: l.label, ...(free ?? at(tries[0])), arrowAtTop: isBack })
      }
      setGeo({ w: base.width, h: base.height, lines })
    }
    measure()
    if (typeof ResizeObserver === 'undefined') return
    const observer = new ResizeObserver(measure)
    observer.observe(el)
    return () => observer.disconnect()
    // La géométrie ne dépend que du diagramme et de la taille du conteneur.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [spec])

  return (
    <div role="img" aria-label={`${spec.title}. ${description}`} className="relative">
      <div ref={container} className="relative flex flex-col gap-y-14 py-1">
        {geo && (
          <svg aria-hidden className="pointer-events-none absolute inset-0 z-0 overflow-visible" width={geo.w} height={geo.h}>
            <defs>
              <marker id={`${markerId}-end`} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                <path d="M0,0 L10,5 L0,10 z" className="fill-muted-foreground" />
              </marker>
            </defs>
            {geo.lines.map((l, i) => (
              <path
                key={i}
                d={l.path}
                fill="none"
                className="stroke-muted-foreground"
                strokeWidth={1.5}
                markerEnd={l.arrowAtTop ? undefined : `url(#${markerId}-end)`}
                markerStart={l.arrowAtTop ? `url(#${markerId}-end)` : undefined}
              />
            ))}
          </svg>
        )}
        {rows.map((ids, d) => (
          <div key={d} className={cn('flex items-start justify-around gap-2 sm:gap-3', ids.length >= 4 && 'text-xs sm:text-sm [&>div]:px-1 sm:[&>div]:px-3')}>
            {ids.map((id) => (
              <div
                key={id}
                ref={(node) => {
                  if (node) boxes.current.set(id, node)
                  else boxes.current.delete(id)
                }}
                className={
                  d === 0
                    ? 'bg-primary text-primary-foreground border-primary relative z-10 max-w-[11rem] min-w-0 flex-1 basis-0 rounded-lg border px-2 py-1.5 text-center hyphens-auto break-words sm:px-3 font-semibold'
                    : 'bg-background relative z-10 max-w-[11rem] min-w-0 flex-1 basis-0 rounded-lg border px-2 py-1.5 text-center hyphens-auto break-words sm:px-3 font-medium'
                }
              >
                {labels.get(id)}
              </div>
            ))}
          </div>
        ))}
        {geo?.lines.map(
          (l, i) =>
            l.label && (
              <span
                key={i}
                aria-hidden
                className="bg-background absolute z-20 -translate-x-1/2 -translate-y-1/2 rounded-md border px-1.5 text-xs font-semibold whitespace-nowrap tabular-nums"
                style={{ left: l.lx, top: l.ly }}
              >
                {l.label}
              </span>
            ),
        )}
      </div>
    </div>
  )
}

/** Chevauchement approximatif de deux pastilles (largeur estimée d'après le nombre de caractères). */
function collide(o: OrgLine, p: { lx: number; ly: number }, label: string): boolean {
  const width = (text: string) => text.length * 7 + 14
  return Math.abs(o.lx - p.lx) < (width(o.label ?? '') + width(label)) / 2 + 4 && Math.abs(o.ly - p.ly) < 22
}

interface OrgLine {
  path: string
  label?: string
  lx: number
  ly: number
  /** Lien remontant (dividendes, rémunération d'un apport) : flèche côté haut. */
  arrowAtTop: boolean
}

/**
 * Niveaux de l'organigramme : plus long chemin depuis les nœuds sans détenteur, en ignorant les liens
 * qui ferment un cycle (A apporte à B, B rémunère A) ; ces liens « remontants » sont renvoyés à part.
 */
function orgLevels(spec: Extract<DiagramSpec, { type: 'org' }>): { level: Map<string, number>; back: Set<number> } {
  const back = new Set<number>()
  const state = new Map<string, 'open' | 'done'>()
  const visit = (id: string) => {
    state.set(id, 'open')
    spec.links.forEach((l, i) => {
      if (l.from !== id) return
      const s = state.get(l.to)
      if (s === 'open') back.add(i)
      else if (!s) visit(l.to)
    })
    state.set(id, 'done')
  }
  const targets = new Set(spec.links.map((l) => l.to))
  for (const n of spec.nodes) if (!targets.has(n.id) && !state.has(n.id)) visit(n.id)
  for (const n of spec.nodes) if (!state.has(n.id)) visit(n.id)
  const level = new Map(spec.nodes.map((n) => [n.id, 0]))
  // Relaxation sur le graphe sans cycle (au plus autant de passes que de nœuds).
  for (let pass = 0; pass < spec.nodes.length; pass++) {
    let changed = false
    spec.links.forEach((l, i) => {
      if (back.has(i)) return
      const next = (level.get(l.from) ?? 0) + 1
      if ((level.get(l.to) ?? 0) < next) {
        level.set(l.to, next)
        changed = true
      }
    })
    if (!changed) break
  }
  return { level, back }
}

/**
 * Barres horizontales en HTML (le texte garde sa taille sur téléphone) : libellé et valeur au-dessus,
 * barre en dessous, une seule teinte. Valeurs négatives : barre à gauche d'un axe central.
 */
function Bars({ spec }: { spec: Extract<DiagramSpec, { type: 'bars' }> }) {
  const max = Math.max(...spec.items.map((i) => Math.abs(i.value)), 1e-9)
  const hasNegative = spec.items.some((i) => i.value < 0)
  const fmt = (v: number) => `${formatNumber(v)}${spec.unit ? ` ${spec.unit}` : ''}`
  const bar = (v: number) => (
    <div className={hasNegative && v < 0 ? 'bg-primary h-full rounded-l-full' : 'bg-primary h-full rounded-r-full'} style={{ width: `${Math.max((Math.abs(v) / max) * 100, 1.5)}%` }} />
  )
  return (
    <ul className="flex flex-col gap-3">
      {spec.items.map((item, i) => (
        <li key={i} className="flex flex-col gap-1">
          <div className="flex items-baseline justify-between gap-3">
            <span>{item.label}</span>
            <span className="font-semibold whitespace-nowrap tabular-nums">{fmt(item.value)}</span>
          </div>
          {hasNegative ? (
            <div aria-hidden className="bg-muted flex h-2.5 overflow-hidden rounded-full">
              <div className="flex flex-1 justify-end">{item.value < 0 && bar(item.value)}</div>
              <div className="bg-muted-foreground/60 w-px" />
              <div className="flex-1">{item.value >= 0 && bar(item.value)}</div>
            </div>
          ) : (
            <div aria-hidden className="bg-muted h-2.5 overflow-hidden rounded-full">
              <div className="bg-primary h-full rounded-full" style={{ width: `${Math.max((item.value / max) * 100, 1.5)}%` }} />
            </div>
          )}
        </li>
      ))}
    </ul>
  )
}
