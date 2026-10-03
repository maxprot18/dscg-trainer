/**
 * Helpers purs autour de la taxonomie (UE > thème > notion).
 * Aucun import node : utilisable dans l'app comme dans les scripts.
 */
import type { Taxonomy, TaxonomyNotion, TaxonomyTheme, TaxonomyUe, UeId } from './schema.ts'

/** Notion replacée dans son contexte (UE et thème parents). */
export interface NotionEntry {
  ue: TaxonomyUe
  theme: TaxonomyTheme
  notion: TaxonomyNotion
}

export interface TaxonomyIndex {
  /** UE par identifiant (`UE4`). */
  ues: Map<UeId, TaxonomyUe>
  /** UE par slug de dossier (`ue4-compta-audit`). */
  uesBySlug: Map<string, TaxonomyUe>
  /** Thème par clé `UE4/ifrs` (les ids de thème ne sont uniques que dans leur UE). */
  themes: Map<string, { ue: TaxonomyUe; theme: TaxonomyTheme }>
  /** Notion par identifiant (unique dans toute la taxonomie). */
  notions: Map<string, NotionEntry>
}

export function themeKey(ue: UeId, themeId: string): string {
  return `${ue}/${themeId}`
}

export function buildTaxonomyIndex(taxonomy: Taxonomy): TaxonomyIndex {
  const index: TaxonomyIndex = { ues: new Map(), uesBySlug: new Map(), themes: new Map(), notions: new Map() }
  for (const ue of taxonomy.ues) {
    index.ues.set(ue.id, ue)
    index.uesBySlug.set(ue.slug, ue)
    for (const theme of ue.themes) {
      index.themes.set(themeKey(ue.id, theme.id), { ue, theme })
      for (const notion of theme.notions) {
        index.notions.set(notion.id, { ue, theme, notion })
      }
    }
  }
  return index
}

/** Toutes les notions, dans l'ordre de la taxonomie. */
export function listNotions(taxonomy: Taxonomy): NotionEntry[] {
  return taxonomy.ues.flatMap((ue) => ue.themes.flatMap((theme) => theme.notions.map((notion) => ({ ue, theme, notion }))))
}

export type PlacementProblem =
  | { kind: 'unknown-ue'; ue: string }
  | { kind: 'unknown-theme'; ue: string; theme: string }
  | { kind: 'unknown-notion'; notion: string }
  | { kind: 'notion-elsewhere'; notion: string; actualUe: UeId; actualTheme: string }

/**
 * Vérifie qu'un triplet (ue, theme, notion) d'exercice est cohérent avec la
 * taxonomie : l'UE existe, le thème appartient à l'UE, la notion au thème.
 * Retourne `null` si tout est cohérent.
 */
export function checkPlacement(
  index: TaxonomyIndex,
  ref: { ue: string; theme: string; notion: string },
): PlacementProblem | null {
  if (!index.ues.has(ref.ue as UeId)) return { kind: 'unknown-ue', ue: ref.ue }
  if (!index.themes.has(themeKey(ref.ue as UeId, ref.theme))) {
    return { kind: 'unknown-theme', ue: ref.ue, theme: ref.theme }
  }
  const entry = index.notions.get(ref.notion)
  if (!entry) return { kind: 'unknown-notion', notion: ref.notion }
  if (entry.ue.id !== ref.ue || entry.theme.id !== ref.theme) {
    return { kind: 'notion-elsewhere', notion: ref.notion, actualUe: entry.ue.id, actualTheme: entry.theme.id }
  }
  return null
}

/** Message français pour un problème de rattachement. */
export function describePlacementProblem(p: PlacementProblem): string {
  switch (p.kind) {
    case 'unknown-ue':
      return `UE inconnue "${p.ue}"`
    case 'unknown-theme':
      return `Thème "${p.theme}" inexistant dans ${p.ue}`
    case 'unknown-notion':
      return `Notion "${p.notion}" absente de la taxonomie`
    case 'notion-elsewhere':
      return `La notion "${p.notion}" appartient à ${p.actualUe} > ${p.actualTheme}, pas au thème indiqué`
  }
}
