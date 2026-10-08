/**
 * Diagrammes déclaratifs des fiches de cours : un bloc ```diagram contenant un JSON validé ici,
 * dessiné par `src/components/Diagram.tsx`. Cinq formes suffisent au programme :
 * - timeline : étapes datées ou ordonnées (procédures collectives, calendrier fiscal) ;
 * - tree : arbre de décision (IFRS 15, IFRS 16, méthode de consolidation) ;
 * - org : organigramme de groupe (périmètre, pourcentages de détention) ;
 * - flow : enchaînement d'étapes ou de flux (cash pooling, affacturage) ;
 * - bars : comparaison de grandeurs (effet de levier, VAN selon le taux).
 */
import { z } from '../lib/zod'

const label = z.string().trim().min(1).max(80)
const note = z.string().trim().min(1).max(160)

export const timelineSchema = z.object({
  type: z.literal('timeline'),
  title: label,
  items: z.array(z.object({ when: z.string().trim().max(24).optional(), label, note: note.optional() })).min(2).max(10),
})

type TreeNodeInput = { label: string; edge?: string; note?: string; children?: TreeNodeInput[] }
export const treeNodeSchema: z.ZodType<TreeNodeInput> = z.lazy(() =>
  z.object({
    label,
    /** Libellé de la branche qui mène à ce nœud (« oui », « > 50 % »). */
    edge: z.string().trim().max(30).optional(),
    note: note.optional(),
    children: z.array(treeNodeSchema).max(6).optional(),
  }),
)

export const treeSchema = z.object({ type: z.literal('tree'), title: label, root: treeNodeSchema })

export const orgSchema = z
  .object({
    type: z.literal('org'),
    title: label,
    nodes: z.array(z.object({ id: z.string().trim().min(1).max(12), label: z.string().trim().min(1).max(22) })).min(2).max(10),
    links: z.array(z.object({ from: z.string(), to: z.string(), label: z.string().trim().max(14).optional() })).min(1).max(14),
  })
  .superRefine((d, ctx) => {
    const ids = new Set(d.nodes.map((n) => n.id))
    if (ids.size !== d.nodes.length) ctx.addIssue({ code: 'custom', message: 'ids de nœuds en double' })
    for (const l of d.links) {
      if (!ids.has(l.from) || !ids.has(l.to)) ctx.addIssue({ code: 'custom', message: `lien ${l.from} → ${l.to} : nœud inconnu` })
    }
  })

export const flowSchema = z.object({
  type: z.literal('flow'),
  title: label,
  steps: z.array(z.object({ label, note: note.optional() })).min(2).max(8),
})

export const barsSchema = z.object({
  type: z.literal('bars'),
  title: label,
  unit: z.string().trim().max(12).optional(),
  items: z.array(z.object({ label: z.string().trim().min(1).max(32), value: z.number().finite() })).min(2).max(8),
})

export const diagramSchema = z.discriminatedUnion('type', [timelineSchema, treeSchema, orgSchema, flowSchema, barsSchema])

export type Diagram = z.infer<typeof diagramSchema>
export type TreeNode = z.infer<typeof treeNodeSchema>

/** Analyse stricte (validateur, tests) du JSON d'un bloc ```diagram. */
export function parseDiagram(source: string): { ok: true; diagram: Diagram } | { ok: false; error: string } {
  let json: unknown
  try {
    json = JSON.parse(source)
  } catch (e) {
    return { ok: false, error: `JSON invalide : ${e instanceof Error ? e.message : String(e)}` }
  }
  const parsed = diagramSchema.safeParse(json)
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues.map((i) => `${i.path.join('.') || '(racine)'} : ${i.message}`).join(' ; ') }
  }
  return { ok: true, diagram: parsed.data }
}

export { extractDiagramBlocks } from './diagram'
