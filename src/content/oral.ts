/**
 * Sujets d'oral de l'UE 6 (anglais des affaires) : types partagés par l'application et le validateur.
 * L'épreuve : 1 h de préparation, 15 min d'exposé, 15 min d'entretien avec le jury, en anglais.
 * Le fichier `content/oral/ue6-sujets.json` est validé au build (`src/content/oralSchema.ts`).
 */
export interface OralTopic {
  id: string
  /** Thème de l'UE 6 dans la taxonomie. */
  theme: string
  /** Notions de la taxonomie mobilisées par le sujet. */
  notions: string[]
  title: string
  /** Document à présenter (Markdown), rédigé en propre : article, note, tableau de données. */
  document: string
  /** Consigne donnée au candidat. */
  task: string
  /** Plan type de l'exposé (introduction, parties, conclusion). */
  outline: string[]
  /** Vocabulaire utile : terme anglais et traduction. */
  vocabulary: { term: string; translation: string }[]
  /** Questions probables du jury pendant l'entretien. */
  jury_questions: string[]
  verified: boolean
}

export const ORAL_PREP_MINUTES = 60
export const ORAL_TALK_MINUTES = 15
export const ORAL_INTERVIEW_MINUTES = 15

/** Grille d'auto-évaluation (inspirée des attentes du jury) : chaque critère sur 4 points, total sur 20. */
export const ORAL_CRITERIA = [
  { id: 'structure', label: 'Structure', hint: 'Introduction avec problématique, plan annoncé et suivi, conclusion.' },
  { id: 'content', label: 'Compréhension du document', hint: 'Idées principales restituées sans paraphrase, chiffres exploités.' },
  { id: 'analysis', label: 'Analyse et ouverture', hint: 'Prise de recul, lien avec le cours (comptabilité, finance, droit, gestion), exemples.' },
  { id: 'language', label: 'Langue', hint: 'Vocabulaire technique juste, grammaire, faux amis évités.' },
  { id: 'interaction', label: 'Aisance et interaction', hint: 'Débit, regard, réponses précises et développées aux questions.' },
] as const

export const ORAL_CRITERION_MAX = 4
