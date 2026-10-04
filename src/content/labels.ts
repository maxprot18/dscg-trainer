import type { AuditCycle, Exercise } from './schema'

export const TYPE_LABELS: Record<Exercise['type'], string> = {
  mcq: 'QCM',
  true_false: 'Vrai / faux',
  numeric: 'Calcul',
  journal_entry: 'Écriture comptable',
  case_study: 'Cas pratique',
  consolidation_case: 'Cas de consolidation',
  audit_case: "Cas d'audit",
  flashcard: 'Flashcard',
}

export const CYCLE_LABELS: Record<AuditCycle, string> = {
  'ventes-clients': 'Ventes-clients',
  'achats-fournisseurs': 'Achats-fournisseurs',
  stocks: 'Stocks',
  immobilisations: 'Immobilisations',
  tresorerie: 'Trésorerie',
  personnel: 'Personnel',
  'impots-taxes': 'Impôts et taxes',
  'capitaux-propres': 'Capitaux propres',
  provisions: 'Provisions',
  cloture: 'Clôture',
}

/** Début de l'énoncé, pour les listes (bilan de session, recherche). */
export function exerciseHeadline(ex: Exercise, max = 90): string {
  const text = 'statement' in ex ? ex.statement : 'title' in ex ? ex.title : ex.type === 'flashcard' ? ex.front : ''
  return text.length > max ? `${text.slice(0, max - 1)}…` : text
}
