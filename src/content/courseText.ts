/**
 * Découpage du texte des fiches de cours pour leur mise en page (fonctions pures, testées).
 * Les fiches suivent la structure fixe de `docs/content-guide.md` : libellés en gras en tête de
 * paragraphe (« **Enjeu :** … »), sections `##` Exemple / Erreurs fréquentes / À retenir.
 */

/** Libellé en gras en tête de ligne, suivi de deux-points (dans ou hors du gras) : `**Coût (§16)** : texte`. */
export function leadingLabel(line: string): { label: string; rest: string } | null {
  const m = /^\*\*([^*]+?)\s*(:?)\s*\*\*\s*(:?)\s*(.*)$/.exec(line.trim())
  if (!m) return null
  const [, label, colonIn, colonOut, rest] = m
  if (!colonIn && !colonOut) return null
  return { label: label.trim(), rest: rest.trim() }
}

export type MetaKind = 'references' | 'stake' | 'formulas' | 'related' | 'glossary'

const META: [RegExp, MetaKind][] = [
  [/^(références|references)$/i, 'references'],
  [/^(enjeu|key issue)$/i, 'stake'],
  [/^(formules? clés?|key formulas?)$/i, 'formulas'],
  [/^(notions liées|related topics)$/i, 'related'],
  [/^glossary$/i, 'glossary'],
]

/** Libellés réservés de la structure des fiches. */
export function metaKind(label: string): MetaKind | null {
  return META.find(([re]) => re.test(label))?.[1] ?? null
}

export type SectionKind = 'example' | 'mistakes' | 'keypoints' | 'other'

export function sectionKind(title: string): SectionKind {
  if (/^(exemples?|examples?)$/i.test(title)) return 'example'
  if (/^(erreurs fréquentes|common mistakes)$/i.test(title)) return 'mistakes'
  if (/^(à retenir|key points)$/i.test(title)) return 'keypoints'
  return 'other'
}

/** Ancre stable d'un titre de section (`Erreurs fréquentes` → `erreurs-frequentes`). */
export function slugify(title: string): string {
  return title
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

/** Vrai si la position `i` de `text` est hors parenthèses, hors gras et hors lien Markdown. */
function atTopLevel(text: string, i: number): boolean {
  let depth = 0
  let bold = 0
  let bracket = 0
  for (let k = 0; k < i; k++) {
    const c = text[k]
    if (c === '(') depth++
    else if (c === ')') depth = Math.max(0, depth - 1)
    else if (c === '[') bracket++
    else if (c === ']') bracket = Math.max(0, bracket - 1)
    else if (c === '*' && text[k + 1] === '*') {
      bold++
      k++
    }
  }
  return depth === 0 && bracket === 0 && bold % 2 === 0
}

/**
 * Erreur fréquente « erreur : bonne règle » → les deux parties (premier deux-points hors parenthèses,
 * gras et liens). Sans deux-points, toute la phrase est l'erreur.
 */
export function splitMistake(item: string): { mistake: string; fix: string | null } {
  const re = /\s?:\s/g
  let m: RegExpExecArray | null
  while ((m = re.exec(item))) {
    if (atTopLevel(item, m.index)) {
      const mistake = item.slice(0, m.index).trim()
      const fix = item.slice(m.index + m[0].length).trim()
      if (mistake && fix) return { mistake, fix: fix.charAt(0).toUpperCase() + fix.slice(1) }
    }
  }
  return { mistake: item.trim(), fix: null }
}

/** Abréviations après lesquelles un point ne termine pas la phrase (droit, normes, anglais). */
const ABBREVIATIONS = new Set(
  [
    'art', 'arts', 'al', 'anc', 'cf', 'ex', 'env', 'règl', 'dir', 'déc', 'ord', 'coll', 'max', 'min', 'mme', 'mr', 'mrs', 'ms',
    'dr', 'st', 'vs', 'approx', 'inc', 'ltd', 'co', 'corp', 'no', 'nos', 'n°', 'p', 'pp', 's', 'ss', 'sect', 'chap', 'vol',
    'fig', 'cass', 'com', 'civ', 'soc', 'crim', 'trav', 'cons', 'fisc', 'mon', 'fin', 'éd', 'e.g', 'i.e', 'ibid', 'cie', 'sté',
    'resp', 'hab', 'env', 'fr', 'av', 'apr', 'eur',
  ].map((a) => a.toLowerCase()),
)

/**
 * Découpe un paragraphe en phrases (point suivi d'une espace et d'une majuscule, d'un chiffre ou d'une
 * parenthèse), sans couper après une abréviation, une initiale (« L. 225-42 »), ni à l'intérieur
 * d'une parenthèse, d'un gras ou d'un lien.
 */
export function splitSentences(text: string): string[] {
  const out: string[] = []
  const re = /([.!?])\s+(?=[A-ZÀ-ÖØ-Þ0-9«"(])/g
  let start = 0
  let m: RegExpExecArray | null
  while ((m = re.exec(text))) {
    const end = m.index + 1
    if (m[1] === '.') {
      const word = /([^\s(]+)$/.exec(text.slice(start, m.index))?.[1] ?? ''
      const bare = word.replace(/^[«"(]+/, '').toLowerCase()
      if (ABBREVIATIONS.has(bare) || /^\p{L}$/u.test(bare) || /^\p{Lu}\.?\p{Lu}?$/u.test(word)) continue
    }
    if (!atTopLevel(text, m.index)) continue
    out.push(text.slice(start, end).trim())
    start = end
  }
  const last = text.slice(start).trim()
  if (last) out.push(last)
  return out
}

/** Éléments séparés par « · » (notions liées, glossaire). */
export const splitDots = (text: string) =>
  text
    .split(/\s+·\s+/)
    .map((s) => s.trim())
    .filter(Boolean)

/** Formules séparées par « ; » hors parenthèses. */
export function splitFormulas(text: string): string[] {
  const parts: string[] = []
  let start = 0
  const re = /\s;\s/g
  let m: RegExpExecArray | null
  while ((m = re.exec(text))) {
    if (!atTopLevel(text, m.index)) continue
    parts.push(text.slice(start, m.index).trim())
    start = m.index + m[0].length
  }
  parts.push(text.slice(start).trim())
  return parts.filter(Boolean)
}

/** Entrée de glossaire `term — traduction`. */
export function glossaryEntry(item: string): { term: string; translation: string } {
  const i = item.indexOf(' — ')
  return i < 0 ? { term: item, translation: '' } : { term: item.slice(0, i).trim(), translation: item.slice(i + 3).trim() }
}
