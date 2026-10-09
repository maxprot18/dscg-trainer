import type { JournalResponseLine } from '@/engine/grading'
import { formatNumber, parseNumberInput } from '@/engine/numbers'

/** Ligne d'écriture en cours de saisie (valeurs brutes des champs). */
export type DraftLine = { account: string; debit: string; credit: string }

export const emptyLine = (): DraftLine => ({ account: '', debit: '', credit: '' })

/** Convertit la saisie en lignes d'écriture ; les lignes vides sont ignorées. */
export function toJournalLines(draft: readonly DraftLine[]): JournalResponseLine[] {
  return draft
    .filter((l) => l.account.trim() !== '' || l.debit.trim() !== '' || l.credit.trim() !== '')
    .map((l) => ({
      account: l.account.trim(),
      debit: parseNumberInput(l.debit) ?? 0,
      credit: parseNumberInput(l.credit) ?? 0,
    }))
}

/** Saisie reconstituée à partir d'une écriture déjà enregistrée (retour sur un exercice d'examen). */
export function fromJournalLines(lines: readonly JournalResponseLine[]): DraftLine[] {
  const draft = lines.map((l) => ({
    account: l.account,
    debit: l.debit ? formatNumber(l.debit, 2) : '',
    credit: l.credit ? formatNumber(l.credit, 2) : '',
  }))
  return draft.length >= 2 ? draft : [...draft, ...Array.from({ length: 2 - draft.length }, emptyLine)]
}
