/**
 * Diagrammes déclaratifs des fiches de cours : un bloc ```diagram contenant un JSON, dessiné par
 * `src/components/Diagram.tsx`. Cinq formes suffisent au programme :
 * - timeline : étapes datées ou ordonnées (procédures collectives, calendrier fiscal) ;
 * - tree : arbre de décision (IFRS 15, IFRS 16, méthode de consolidation) ;
 * - org : organigramme de groupe (périmètre, pourcentages de détention) ;
 * - flow : enchaînement d'étapes ou de flux (cash pooling, affacturage) ;
 * - bars : comparaison de grandeurs (effet de levier, VAN selon le taux).
 *
 * Le schéma Zod complet est dans `diagramSchema.ts` (validateur `npm run validate` et tests) ;
 * à l'exécution, le contenu ayant été validé au build, une lecture légère suffit (sans Zod).
 */

export interface TreeNode {
  label: string
  /** Libellé de la branche qui mène à ce nœud (« oui », « > 50 % »). */
  edge?: string
  note?: string
  children?: TreeNode[]
}

export type Diagram =
  | { type: 'timeline'; title: string; items: { when?: string; label: string; note?: string }[] }
  | { type: 'tree'; title: string; root: TreeNode }
  | {
      type: 'org'
      title: string
      nodes: { id: string; label: string }[]
      links: { from: string; to: string; label?: string }[]
    }
  | { type: 'flow'; title: string; steps: { label: string; note?: string }[] }
  | { type: 'bars'; title: string; unit?: string; items: { label: string; value: number }[] }

export const DIAGRAM_TYPES = ['timeline', 'tree', 'org', 'flow', 'bars'] as const

/** Lecture légère d'un bloc ```diagram (contenu validé au build) : JSON et forme connue. */
export function parseDiagram(source: string): { ok: true; diagram: Diagram } | { ok: false; error: string } {
  let json: unknown
  try {
    json = JSON.parse(source)
  } catch (e) {
    return { ok: false, error: `JSON invalide : ${e instanceof Error ? e.message : String(e)}` }
  }
  const d = json as Partial<Diagram> | null
  if (!d || typeof d !== 'object' || !(DIAGRAM_TYPES as readonly string[]).includes(String(d.type)) || typeof d.title !== 'string') {
    return { ok: false, error: 'forme inconnue' }
  }
  return { ok: true, diagram: d as Diagram }
}

/** Blocs ```diagram d'une fiche Markdown (contenu brut, sans les clôtures). */
export function extractDiagramBlocks(markdown: string): string[] {
  const out: string[] = []
  const re = /```diagram\s*\n([\s\S]*?)\n```/g
  let m: RegExpExecArray | null
  while ((m = re.exec(markdown))) out.push(m[1])
  return out
}
