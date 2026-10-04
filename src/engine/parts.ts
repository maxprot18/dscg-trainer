/**
 * Découpage d'un exercice en « parties » notées séparément.
 * Les types simples ont une partie ; cas pratiques, cas de conso et cas d'audit
 * en ont plusieurs, pondérées par leur barème.
 */
import type { ConsolidationStage, Exercise, JournalLine, SubQuestion, Tolerance } from '@/content/schema'

export interface ChoicePart {
  kind: 'choice'
  options: string[]
  answer: number[]
  multiple: boolean
}
export interface BooleanPart {
  kind: 'boolean'
  answer: boolean
}
export interface NumericPart {
  kind: 'numeric'
  expected_value: number
  tolerance: Tolerance
  unit?: string
  decimals?: number
}
export interface JournalPart {
  kind: 'journal'
  entries: JournalLine[]
  date?: string
}
export interface OpenPart {
  kind: 'open'
  model_answer: string
  key_points: string[]
}
export interface FlashcardPart {
  kind: 'flashcard'
  front: string
  back: string
}

export type PartData = ChoicePart | BooleanPart | NumericPart | JournalPart | OpenPart | FlashcardPart

export type Part = PartData & {
  id: string
  /** Consigne propre à la partie (absente quand l'énoncé de l'exercice suffit). */
  prompt?: string
  /** Poids dans la note de l'exercice (points du barème). */
  weight: number
  /** Correction propre à la partie, affichée après réponse. */
  explanation?: string
  /** Étape de consolidation, le cas échéant. */
  stage?: ConsolidationStage
}

function subQuestionData(q: SubQuestion): PartData {
  switch (q.kind) {
    case 'mcq':
      return { kind: 'choice', options: q.options, answer: q.answer, multiple: q.multiple }
    case 'true_false':
      return { kind: 'boolean', answer: q.answer }
    case 'numeric':
      return { kind: 'numeric', expected_value: q.expected_value, tolerance: q.tolerance, unit: q.unit, decimals: q.decimals }
    case 'journal_entry':
      return { kind: 'journal', entries: q.entries, date: q.date }
    case 'open':
      return { kind: 'open', model_answer: q.model_answer, key_points: q.key_points }
  }
}

export function exerciseParts(ex: Exercise): Part[] {
  switch (ex.type) {
    case 'mcq':
      return [{ id: 'main', weight: 1, kind: 'choice', options: ex.options, answer: ex.answer, multiple: ex.multiple }]
    case 'true_false':
      return [{ id: 'main', weight: 1, kind: 'boolean', answer: ex.answer, explanation: ex.justification }]
    case 'numeric':
      return [
        {
          id: 'main',
          weight: 1,
          kind: 'numeric',
          expected_value: ex.expected_value,
          tolerance: ex.tolerance,
          unit: ex.unit,
          decimals: ex.decimals,
        },
      ]
    case 'journal_entry':
      return [{ id: 'main', weight: 1, kind: 'journal', entries: ex.entries, date: ex.date }]
    case 'flashcard':
      return [{ id: 'main', weight: 1, kind: 'flashcard', front: ex.front, back: ex.back }]
    case 'case_study':
      return ex.sub_questions.map((q) => ({
        ...subQuestionData(q),
        id: q.id,
        prompt: q.prompt,
        weight: q.points,
        explanation: q.explanation,
      }))
    case 'consolidation_case':
      return ex.steps.map((q) => ({
        ...subQuestionData(q),
        id: q.id,
        prompt: q.prompt,
        weight: q.points,
        explanation: q.explanation,
        stage: q.stage,
      }))
    case 'audit_case':
      return [
        {
          id: 'procedures',
          kind: 'choice',
          prompt: 'Sélectionnez les procédures pertinentes pour répondre au risque.',
          options: ex.procedures.options,
          answer: ex.procedures.answer,
          multiple: true,
          weight: 2,
        },
        {
          id: 'risk',
          kind: 'choice',
          prompt: 'Qualifiez le risque.',
          options: ex.risk.options,
          answer: [ex.risk.answer],
          multiple: false,
          weight: 1,
          explanation: ex.risk.rationale,
        },
        {
          id: 'conclusion',
          kind: 'open',
          prompt: 'Rédigez la conclusion de vos travaux sur ce cycle.',
          model_answer: ex.conclusion.model_answer,
          key_points: ex.conclusion.key_points,
          weight: 1,
        },
      ]
  }
}

/** Libellés français des étapes de consolidation. */
export const STAGE_LABELS: Record<ConsolidationStage, string> = {
  perimetre: 'Périmètre',
  pourcentages: 'Pourcentages de contrôle et d’intérêt',
  methode: 'Méthode de consolidation',
  retraitements: 'Retraitements',
  'ecart-acquisition': 'Écart d’acquisition',
  'impots-differes': 'Impôts différés',
  'elimination-titres': 'Élimination des titres',
  'partage-capitaux-propres': 'Partage des capitaux propres',
  autre: 'Autre',
}
