/**
 * Recherche plein texte dans les fiches de cours et les exercices (fonctions pures).
 * Accents et casse ignorés ; tous les mots de la requête doivent apparaître ; un mot trouvé dans
 * le titre pèse plus qu'un mot trouvé dans le corps.
 */
import { exerciseHeadline } from '@/content/labels'
import type { Exercise } from '@/content/schema'

export const MIN_TOKEN_LENGTH = 2

/** Texte sans accents, en minuscules, avec la position de chaque caractère dans le texte d'origine. */
export function normalizeWithMap(text: string): { text: string; map: number[] } {
  let out = ''
  const map: number[] = []
  for (let i = 0; i < text.length; i++) {
    const n = text[i].normalize('NFD').replace(/\p{M}/gu, '').toLowerCase()
    for (const ch of n) {
      out += ch
      map.push(i)
    }
  }
  return { text: out, map }
}

export function normalize(text: string): string {
  return text.normalize('NFD').replace(/\p{M}/gu, '').toLowerCase()
}

export function queryTokens(query: string): string[] {
  return [...new Set(normalize(query).split(/[^\p{L}\p{N}]+/u).filter((t) => t.length >= MIN_TOKEN_LENGTH))]
}

export interface Searchable {
  /** Titre (énoncé, intitulé de la notion). */
  head: string
  /** Reste du texte. */
  body: string
}

export interface SearchHit<T> {
  item: T
  score: number
  /** Extrait du corps autour du premier mot trouvé. */
  snippet: string
}

function collectStrings(value: unknown, out: string[]): string[] {
  if (typeof value === 'string') out.push(value)
  else if (Array.isArray(value)) for (const v of value) collectStrings(v, out)
  else if (value && typeof value === 'object') for (const v of Object.values(value)) collectStrings(v, out)
  return out
}

export function exerciseSearchable(ex: Exercise): Searchable {
  return { head: exerciseHeadline(ex, 10_000), body: collectStrings(ex, []).join(' \n') }
}

function snippet(body: string, tokens: readonly string[], radius = 70): string {
  const { text, map } = normalizeWithMap(body)
  const positions = tokens.map((t) => text.indexOf(t)).filter((p) => p >= 0)
  const at = positions.length > 0 ? map[Math.min(...positions)] : 0
  const start = Math.max(0, at - radius)
  const end = Math.min(body.length, at + radius * 2)
  const raw = body.slice(start, end).replace(/[#*`>|]/g, '').replace(/\s+/g, ' ').trim()
  return `${start > 0 ? '…' : ''}${raw}${end < body.length ? '…' : ''}`
}

/** Document préparé une fois (texte normalisé), pour ne pas tout renormaliser à chaque frappe. */
export interface PreparedDoc<T> {
  item: T
  head: string
  body: string
  rawBody: string
}

export function prepare<T>(items: readonly T[], toSearchable: (item: T) => Searchable): PreparedDoc<T>[] {
  return items.map((item) => {
    const { head, body } = toSearchable(item)
    return { item, head: normalize(head), body: normalize(body), rawBody: body }
  })
}

/** Résultats triés par pertinence (score décroissant), `limit` au plus. */
export function searchPrepared<T>(docs: readonly PreparedDoc<T>[], query: string, limit = 30): SearchHit<T>[] {
  const tokens = queryTokens(query)
  if (tokens.length === 0) return []
  const scored: { doc: PreparedDoc<T>; score: number }[] = []
  for (const doc of docs) {
    let score = 0
    let all = true
    for (const t of tokens) {
      const inHead = doc.head.includes(t)
      if (!inHead && !doc.body.includes(t)) {
        all = false
        break
      }
      score += inHead ? 3 : 1
    }
    if (all) scored.push({ doc, score })
  }
  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ doc, score }) => ({ item: doc.item, score, snippet: snippet(doc.rawBody, tokens) }))
}

export function search<T>(
  items: readonly T[],
  query: string,
  toSearchable: (item: T) => Searchable,
  limit = 30,
): SearchHit<T>[] {
  return searchPrepared(prepare(items, toSearchable), query, limit)
}
