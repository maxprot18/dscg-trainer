/**
 * Correction des exercices, partie par partie. Fonctions pures, sans dépendance à l'UI.
 */
import type { Exercise, JournalLine, Tolerance } from '@/content/schema'

import { parseNumberInput } from './numbers'
import { exerciseParts, type Part, type PartData } from './parts'

export type ChoiceResponse = { kind: 'choice'; selected: number[] }
export type BooleanResponse = { kind: 'boolean'; value: boolean }
export type NumericResponse = { kind: 'numeric'; raw: string }
export type JournalResponseLine = { account: string; debit: number; credit: number }
export type JournalResponse = { kind: 'journal'; lines: JournalResponseLine[] }
/** Réponse rédigée, autocorrigée : l'utilisateur coche les points clés présents dans sa réponse. */
export type OpenResponse = { kind: 'open'; text: string; checked: boolean[] }
export type FlashcardResponse = { kind: 'flashcard'; known: boolean }

export type PartResponse =
  | ChoiceResponse
  | BooleanResponse
  | NumericResponse
  | JournalResponse
  | OpenResponse
  | FlashcardResponse

export type AccountStatus = 'ok' | 'wrong-amount' | 'wrong-side' | 'missing' | 'extra'

export interface AccountCheck {
  account: string
  status: AccountStatus
  expected?: { debit: number; credit: number }
  given?: { debit: number; credit: number }
}

export interface PartResult {
  /** Note entre 0 et 1. */
  score: number
  correct: boolean
  /** Nombre lu dans la saisie (calculs). */
  parsed?: number | null
  /** Correction compte par compte (écritures). */
  accounts?: AccountCheck[]
}

export interface ExerciseResult {
  score: number
  correct: boolean
  parts: PartResult[]
  /** Points obtenus / points possibles (barème des parties). */
  earned: number
  total: number
}

/** Seuil de réussite des exercices à plusieurs parties (cas pratiques, conso, audit). */
export const PASS_THRESHOLD = 0.7
const MONEY_EPSILON = 0.5

export function isWithinTolerance(value: number, expected: number, tol: Tolerance): boolean {
  const diff = Math.abs(value - expected)
  const allowed = tol.kind === 'absolute' ? tol.value : tol.value * Math.abs(expected)
  return diff <= allowed + 1e-9
}

/** Choix : réponse unique tout ou rien ; réponses multiples (bonnes − mauvaises) / nombre de bonnes. */
export function gradeChoice(answer: number[], multiple: boolean, selected: number[]): PartResult {
  const expected = new Set(answer)
  const chosen = new Set(selected)
  const exact = expected.size === chosen.size && [...expected].every((i) => chosen.has(i))
  if (!multiple) return { score: exact ? 1 : 0, correct: exact }
  const hits = [...chosen].filter((i) => expected.has(i)).length
  const misses = chosen.size - hits
  return { score: exact ? 1 : Math.max(0, (hits - misses) / expected.size), correct: exact }
}

export function gradeNumeric(expected: number, tol: Tolerance, raw: string): PartResult {
  const parsed = parseNumberInput(raw)
  const correct = parsed !== null && isWithinTolerance(parsed, expected, tol)
  return { score: correct ? 1 : 0, correct, parsed }
}

/** Solde net par compte : débit − crédit. */
function netByAccount(lines: readonly { account: string; debit: number; credit: number }[]): Map<string, number> {
  const map = new Map<string, number>()
  for (const l of lines) {
    const account = l.account.trim()
    if (!account) continue
    map.set(account, (map.get(account) ?? 0) + (l.debit || 0) - (l.credit || 0))
  }
  return map
}

function sides(net: number): { debit: number; credit: number } {
  return net >= 0 ? { debit: net, credit: 0 } : { debit: 0, credit: -net }
}

/**
 * Écriture : correction compte par compte. Un sous-compte plus détaillé que le compte
 * attendu est accepté (ex. 44566 pour 4456). Note = comptes justes / (attendus + comptes en trop).
 */
export function gradeJournal(expectedLines: readonly JournalLine[], given: readonly JournalResponseLine[]): PartResult {
  const expected = netByAccount(expectedLines)
  const remaining = netByAccount(given)
  const accounts: AccountCheck[] = []
  for (const [account, net] of expected) {
    const match = [...remaining.keys()].find((a) => a === account) ?? [...remaining.keys()].find((a) => a.startsWith(account))
    if (match === undefined) {
      accounts.push({ account, status: 'missing', expected: sides(net) })
      continue
    }
    const givenNet = remaining.get(match)!
    remaining.delete(match)
    const status: AccountStatus =
      Math.abs(givenNet - net) <= MONEY_EPSILON ? 'ok' : Math.sign(givenNet) !== Math.sign(net) ? 'wrong-side' : 'wrong-amount'
    accounts.push({ account, status, expected: sides(net), given: sides(givenNet) })
  }
  for (const [account, net] of remaining) {
    if (Math.abs(net) > MONEY_EPSILON) accounts.push({ account, status: 'extra', given: sides(net) })
  }
  const ok = accounts.filter((a) => a.status === 'ok').length
  const score = accounts.length === 0 ? 0 : ok / accounts.length
  return { score, correct: ok === accounts.length, accounts }
}

/** Réponse rédigée : part des points clés cochés par l'utilisateur. */
export function gradeOpen(keyPoints: readonly string[], checked: readonly boolean[]): PartResult {
  const n = keyPoints.filter((_, i) => checked[i]).length
  const score = keyPoints.length === 0 ? 0 : n / keyPoints.length
  return { score, correct: score >= PASS_THRESHOLD }
}

export function gradePart(part: PartData, response: PartResponse): PartResult {
  if (part.kind !== response.kind) return { score: 0, correct: false }
  switch (part.kind) {
    case 'choice':
      return gradeChoice(part.answer, part.multiple, (response as ChoiceResponse).selected)
    case 'boolean': {
      const correct = (response as BooleanResponse).value === part.answer
      return { score: correct ? 1 : 0, correct }
    }
    case 'numeric':
      return gradeNumeric(part.expected_value, part.tolerance, (response as NumericResponse).raw)
    case 'journal':
      return gradeJournal(part.entries, (response as JournalResponse).lines)
    case 'open':
      return gradeOpen(part.key_points, (response as OpenResponse).checked)
    case 'flashcard': {
      const known = (response as FlashcardResponse).known
      return { score: known ? 1 : 0, correct: known }
    }
  }
}

/** Combine les résultats des parties en une note d'exercice pondérée par le barème. */
export function combineResults(parts: readonly Part[], results: readonly PartResult[]): ExerciseResult {
  const total = parts.reduce((s, p) => s + p.weight, 0)
  const earned = parts.reduce((s, p, i) => s + p.weight * (results[i]?.score ?? 0), 0)
  const score = total === 0 ? 0 : earned / total
  const correct = parts.length === 1 ? (results[0]?.correct ?? false) : score >= PASS_THRESHOLD - 1e-9
  return { score, correct, parts: [...results], earned, total }
}

export function gradeExercise(ex: Exercise, responses: readonly PartResponse[]): ExerciseResult {
  const parts = exerciseParts(ex)
  return combineResults(
    parts,
    parts.map((p, i) => (responses[i] ? gradePart(p, responses[i]) : { score: 0, correct: false })),
  )
}
