/**
 * Schémas Zod du contenu (taxonomie + exercices) et types TypeScript inférés.
 *
 * Ce module est partagé par l'application (navigateur) et par le script
 * `scripts/validate-content.ts` (node) : il ne doit importer aucun module node.
 *
 * Les règles « métier » qui dépassent la forme des données (indices de réponse
 * valides, écriture équilibrée, barème cohérent…) sont factorisées dans des
 * helpers de refinement réutilisés par les exercices et les sous-questions.
 */
import { z } from '../lib/zod'

import { UE_IDS } from './ids'

// ---------------------------------------------------------------------------
// Constantes partagées
// ---------------------------------------------------------------------------

/** Identifiant kebab-case : minuscules, chiffres, tirets simples. */
export const KEBAB_RE = /^[a-z0-9]+(-[a-z0-9]+)*$/

/** Numéro de compte PCG : classe 1 à 8, 2 à 8 chiffres au total. */
export const PCG_ACCOUNT_RE = /^[1-8]\d{1,7}$/

/** Écart maximal toléré entre total des débits et total des crédits. */
export const JOURNAL_BALANCE_TOLERANCE = 0.005

/** Tolérance pour comparer une somme de points à `total_points`. */
const POINTS_EPSILON = 1e-9

export { UE_IDS }

export const EXERCISE_TYPES = [
  'mcq',
  'true_false',
  'numeric',
  'journal_entry',
  'case_study',
  'consolidation_case',
  'audit_case',
  'flashcard',
] as const

export const SUB_QUESTION_KINDS = ['mcq', 'true_false', 'numeric', 'journal_entry', 'open'] as const

export const CONSOLIDATION_STAGES = [
  'perimetre',
  'pourcentages',
  'methode',
  'retraitements',
  'ecart-acquisition',
  'impots-differes',
  'elimination-titres',
  'partage-capitaux-propres',
  'autre',
] as const

export const AUDIT_CYCLES = [
  'ventes-clients',
  'achats-fournisseurs',
  'stocks',
  'immobilisations',
  'tresorerie',
  'personnel',
  'impots-taxes',
  'capitaux-propres',
  'provisions',
  'cloture',
] as const

export const DIFFICULTIES = [1, 2, 3] as const

// ---------------------------------------------------------------------------
// Briques élémentaires
// ---------------------------------------------------------------------------

/** Chaîne non vide (au moins un caractère non blanc). */
const text = () => z.string().refine((s) => s.trim().length > 0, { message: 'Le texte ne doit pas être vide' })

const kebabId = () =>
  z.string().regex(KEBAB_RE, { message: 'Identifiant invalide : attendu en kebab-case (ex. "ias-16-immobilisations")' })

export const ueIdSchema = z.enum(UE_IDS)
export const exerciseTypeSchema = z.enum(EXERCISE_TYPES)
export const auditCycleSchema = z.enum(AUDIT_CYCLES)
export const consolidationStageSchema = z.enum(CONSOLIDATION_STAGES)
export const difficultySchema = z.literal(DIFFICULTIES)

const positiveNumber = () => z.number().positive()
const percentage = () => z.number().min(0).max(100)

export const toleranceSchema = z
  .strictObject({
    kind: z.enum(['absolute', 'relative']),
    value: z.number().min(0),
  })
  .superRefine((tol, ctx) => {
    if (tol.kind === 'relative' && tol.value >= 1) {
      ctx.addIssue({
        code: 'custom',
        path: ['value'],
        message: 'Une tolérance relative s’exprime en fraction (0.01 = ±1 %) et doit être < 1',
      })
    }
  })

export const journalLineSchema = z.strictObject({
  account: z.string().regex(PCG_ACCOUNT_RE, {
    message: 'Compte PCG invalide : 2 à 8 chiffres commençant par 1 à 8 (ex. "411", "44571")',
  }),
  label: z.string(),
  debit: z.number().min(0),
  credit: z.number().min(0),
})

// ---------------------------------------------------------------------------
// Helpers de refinement partagés
// ---------------------------------------------------------------------------

type Ctx = z.RefinementCtx
type Path = (string | number)[]

function issue(ctx: Ctx, path: Path, message: string): void {
  ctx.addIssue({ code: 'custom', path, message })
}

function isNumber(v: unknown): v is number {
  return typeof v === 'number' && Number.isFinite(v)
}

/** Signale les doublons d'une liste de chaînes (comparaison insensible aux espaces de bord). */
export function checkUniqueStrings(ctx: Ctx, values: readonly unknown[], path: Path, what: string): void {
  const seen = new Map<string, number>()
  values.forEach((v, i) => {
    if (typeof v !== 'string') return
    const key = v.trim()
    const first = seen.get(key)
    if (first !== undefined) {
      issue(ctx, [...path, i], `${what} en double (identique à l'élément ${first}) : "${v}"`)
    } else {
      seen.set(key, i)
    }
  })
}

/** Vérifie qu'un indice désigne bien une option existante. */
function checkIndex(ctx: Ctx, index: unknown, optionCount: number, path: Path): void {
  if (isNumber(index) && (index < 0 || index >= optionCount)) {
    issue(ctx, path, `Indice de réponse ${index} hors limites : ${optionCount} option(s), indices valides 0 à ${optionCount - 1}`)
  }
}

/** Vérifie une liste d'indices de réponse : valides, uniques (la non-vacuité est portée par le schéma). */
function checkIndexList(ctx: Ctx, answer: readonly unknown[], optionCount: number, path: Path): void {
  const seen = new Set<number>()
  answer.forEach((a, i) => {
    checkIndex(ctx, a, optionCount, [...path, i])
    if (isNumber(a)) {
      if (seen.has(a)) issue(ctx, [...path, i], `Indice de réponse ${a} en double`)
      seen.add(a)
    }
  })
}

/** Règles d'un choix multiple (QCM ou sous-question QCM). */
export function checkChoice(
  ctx: Ctx,
  value: { options: readonly unknown[]; answer: readonly unknown[]; multiple?: boolean; option_explanations?: readonly unknown[] },
  path: Path = [],
): void {
  checkUniqueStrings(ctx, value.options, [...path, 'options'], 'Option')
  checkIndexList(ctx, value.answer, value.options.length, [...path, 'answer'])
  if (value.option_explanations && value.option_explanations.length !== value.options.length) {
    issue(ctx, [...path, 'option_explanations'], 'Une explication par option, dans le même ordre')
  }
  if (value.answer.length > 1 && value.multiple !== true) {
    issue(ctx, [...path, 'multiple'], 'Plusieurs bonnes réponses : "multiple" doit valoir true')
  }
}

/** Règles d'une écriture comptable : un seul côté par ligne, équilibre, au moins un débit et un crédit. */
export function checkJournalEntries(
  ctx: Ctx,
  entries: readonly { debit?: unknown; credit?: unknown }[],
  path: Path = ['entries'],
): void {
  let totalDebit = 0
  let totalCredit = 0
  let debitLines = 0
  let creditLines = 0
  entries.forEach((line, i) => {
    if (!line || typeof line !== 'object') return
    const debit = isNumber(line.debit) ? line.debit : 0
    const credit = isNumber(line.credit) ? line.credit : 0
    if ((debit > 0) === (credit > 0)) {
      issue(
        ctx,
        [...path, i],
        debit > 0
          ? 'Une ligne d’écriture ne peut pas être à la fois au débit et au crédit'
          : 'Une ligne d’écriture doit avoir un montant au débit ou au crédit (> 0)',
      )
    }
    totalDebit += debit
    totalCredit += credit
    if (debit > 0) debitLines++
    if (credit > 0) creditLines++
  })
  if (Math.abs(totalDebit - totalCredit) > JOURNAL_BALANCE_TOLERANCE) {
    issue(
      ctx,
      path,
      `Écriture déséquilibrée : total débit ${round2(totalDebit)} ≠ total crédit ${round2(totalCredit)}`,
    )
  }
  if (debitLines === 0) issue(ctx, path, 'L’écriture doit comporter au moins une ligne au débit')
  if (creditLines === 0) issue(ctx, path, 'L’écriture doit comporter au moins une ligne au crédit')
}

function round2(n: number): string {
  return (Math.round(n * 100) / 100).toString()
}

/** Ids de sous-questions uniques + `total_points` (s'il est présent) égal à la somme des points. */
function checkSubQuestionList(
  ctx: Ctx,
  items: readonly { id?: unknown; points?: unknown }[],
  totalPoints: number | undefined,
  key: string,
): void {
  checkUniqueStrings(
    ctx,
    items.map((q) => q?.id),
    [key],
    'Identifiant de sous-question',
  )
  if (totalPoints !== undefined) {
    const sum = items.reduce((acc, q) => acc + (isNumber(q?.points) ? q.points : 0), 0)
    if (Math.abs(sum - totalPoints) > POINTS_EPSILON) {
      issue(ctx, ['total_points'], `total_points (${totalPoints}) ≠ somme des points des sous-questions (${sum})`)
    }
  }
}

// ---------------------------------------------------------------------------
// Sous-questions (cas pratique, cas de consolidation)
// ---------------------------------------------------------------------------

const subQuestionBase = {
  id: kebabId(),
  prompt: text(),
  points: positiveNumber(),
  explanation: text().optional(),
}

const choiceFields = {
  options: z.array(text()).min(2).max(6),
  answer: z.array(z.int().min(0)).min(1),
  multiple: z.boolean().default(false),
  /** Pourquoi chaque option est juste ou fausse, dans l'ordre des options (affiché après réponse). */
  option_explanations: z.array(text()).optional(),
}

const numericFields = {
  expected_value: z.number(),
  tolerance: toleranceSchema,
  unit: z.string().optional(),
  decimals: z.int().min(0).max(10).optional(),
}

const journalFields = {
  date: z.string().optional(),
  entries: z.array(journalLineSchema).min(2),
}

const openFields = {
  model_answer: text(),
  key_points: z.array(text()).min(1),
}

const subQuestionVariants = [
  z
    .strictObject({ ...subQuestionBase, kind: z.literal('mcq'), ...choiceFields })
    .superRefine((q, ctx) => checkChoice(ctx, q)),
  z.strictObject({ ...subQuestionBase, kind: z.literal('true_false'), answer: z.boolean() }),
  z.strictObject({ ...subQuestionBase, kind: z.literal('numeric'), ...numericFields }),
  z
    .strictObject({ ...subQuestionBase, kind: z.literal('journal_entry'), ...journalFields })
    .superRefine((q, ctx) => checkJournalEntries(ctx, q.entries)),
  z.strictObject({ ...subQuestionBase, kind: z.literal('open'), ...openFields }),
] as const

/** Sous-question de cas pratique, union discriminée sur `kind`. */
export const subQuestionSchema = z.discriminatedUnion('kind', [...subQuestionVariants])

/**
 * Étape de cas de consolidation = sous-question + `stage`.
 * `.extend()` conserve les refinements (on ajoute une clé, on n'en écrase aucune).
 */
const stageShape = { stage: consolidationStageSchema }
export const consolidationStepSchema = z.discriminatedUnion('kind', [
  subQuestionVariants[0].extend(stageShape),
  subQuestionVariants[1].extend(stageShape),
  subQuestionVariants[2].extend(stageShape),
  subQuestionVariants[3].extend(stageShape),
  subQuestionVariants[4].extend(stageShape),
])

// ---------------------------------------------------------------------------
// Exercices
// ---------------------------------------------------------------------------

const exerciseBase = {
  id: kebabId(),
  ue: ueIdSchema,
  theme: kebabId(),
  notion: kebabId(),
  difficulty: difficultySchema,
  tags: z.array(text()).default([]),
  source_ref: text(),
  verified: z.boolean(),
  estimated_seconds: z.int().positive(),
  explanation: text(),
}

export const mcqExerciseSchema = z
  .strictObject({ ...exerciseBase, type: z.literal('mcq'), statement: text(), ...choiceFields })
  .superRefine((ex, ctx) => checkChoice(ctx, ex))

export const trueFalseExerciseSchema = z.strictObject({
  ...exerciseBase,
  type: z.literal('true_false'),
  statement: text(),
  answer: z.boolean(),
  justification: text(),
})

export const numericExerciseSchema = z.strictObject({
  ...exerciseBase,
  type: z.literal('numeric'),
  statement: text(),
  ...numericFields,
})

export const journalEntryExerciseSchema = z
  .strictObject({ ...exerciseBase, type: z.literal('journal_entry'), statement: text(), ...journalFields })
  .superRefine((ex, ctx) => checkJournalEntries(ctx, ex.entries))

/** Annexe d'un dossier de type examen (Markdown : texte, tableaux). */
export const annexSchema = z.strictObject({ title: text(), content: text() })

/** Sous-questions d'un cas pratique : 3 à 5 ; un dossier de type examen va jusqu'à 15. */
export const CASE_MAX_SUB_QUESTIONS = 5
export const DOSSIER_MAX_SUB_QUESTIONS = 15

export const caseStudyExerciseSchema = z
  .strictObject({
    ...exerciseBase,
    type: z.literal('case_study'),
    title: text(),
    context: text(),
    sub_questions: z.array(subQuestionSchema).min(3).max(DOSSIER_MAX_SUB_QUESTIONS),
    total_points: positiveNumber().optional(),
    /** Dossier de type examen : long sujet avec annexes, servi dans l'examen blanc et la liste des sujets type. */
    dossier: z.boolean().optional(),
    annexes: z.array(annexSchema).max(10).optional(),
  })
  .superRefine((ex, ctx) => {
    checkSubQuestionList(ctx, ex.sub_questions, ex.total_points, 'sub_questions')
    if (ex.dossier) {
      if (ex.sub_questions.length < 6) issue(ctx, ['sub_questions'], 'Un dossier de type examen compte au moins 6 sous-questions')
      if ((ex.annexes?.length ?? 0) < 2) issue(ctx, ['annexes'], 'Un dossier de type examen compte au moins 2 annexes')
      if (ex.estimated_seconds < 2700) issue(ctx, ['estimated_seconds'], 'Un dossier de type examen dure au moins 45 minutes (2 700 s)')
      if (ex.total_points === undefined) issue(ctx, ['total_points'], 'Un dossier de type examen indique son barème (total_points)')
    } else {
      if (ex.sub_questions.length > CASE_MAX_SUB_QUESTIONS)
        issue(ctx, ['sub_questions'], `Un cas pratique compte au plus ${CASE_MAX_SUB_QUESTIONS} sous-questions (sinon : dossier: true)`)
      if (ex.annexes?.length) issue(ctx, ['annexes'], 'Les annexes sont réservées aux dossiers de type examen (dossier: true)')
    }
  })

export const consolidationEntitySchema = z.strictObject({
  id: kebabId(),
  name: text(),
  is_parent: z.boolean().optional(),
})

export const consolidationLinkSchema = z.strictObject({
  from: kebabId(),
  to: kebabId(),
  ownership_pct: percentage(),
  voting_pct: percentage().optional(),
})

export const consolidationCaseExerciseSchema = z
  .strictObject({
    ...exerciseBase,
    type: z.literal('consolidation_case'),
    title: text(),
    context: text(),
    entities: z.array(consolidationEntitySchema).min(2),
    links: z.array(consolidationLinkSchema),
    steps: z.array(consolidationStepSchema).min(1),
    total_points: positiveNumber().optional(),
  })
  .superRefine((ex, ctx) => {
    checkUniqueStrings(
      ctx,
      ex.entities.map((e) => e?.id),
      ['entities'],
      'Identifiant d’entité',
    )
    const parents = ex.entities.filter((e) => e?.is_parent === true).length
    if (parents !== 1) {
      issue(ctx, ['entities'], `Il faut exactement une société mère (is_parent: true), trouvé : ${parents}`)
    }
    const ids = new Set(ex.entities.map((e) => e?.id))
    const pairs = new Set<string>()
    ex.links.forEach((link, i) => {
      if (!link) return
      for (const end of ['from', 'to'] as const) {
        if (typeof link[end] === 'string' && !ids.has(link[end])) {
          issue(ctx, ['links', i, end], `Entité inconnue "${link[end]}" (absente de "entities")`)
        }
      }
      if (link.from === link.to) issue(ctx, ['links', i], 'Un lien ne peut pas relier une entité à elle-même')
      const key = `${link.from}->${link.to}`
      if (pairs.has(key)) issue(ctx, ['links', i], `Lien ${link.from} → ${link.to} en double`)
      pairs.add(key)
    })
    checkSubQuestionList(ctx, ex.steps, ex.total_points, 'steps')
  })

export const auditCaseExerciseSchema = z
  .strictObject({
    ...exerciseBase,
    type: z.literal('audit_case'),
    title: text(),
    cycle: auditCycleSchema,
    situation: text(),
    assertions: z.array(text()).optional(),
    procedures: z.strictObject({
      options: z.array(text()).min(3),
      answer: z.array(z.int().min(0)).min(1),
    }),
    risk: z.strictObject({
      options: z.array(text()).min(2),
      answer: z.int().min(0),
      rationale: text(),
    }),
    conclusion: z.strictObject({
      model_answer: text(),
      key_points: z.array(text()).min(1),
    }),
    points: positiveNumber().optional(),
  })
  .superRefine((ex, ctx) => {
    checkUniqueStrings(ctx, ex.procedures.options, ['procedures', 'options'], 'Procédure')
    checkIndexList(ctx, ex.procedures.answer, ex.procedures.options.length, ['procedures', 'answer'])
    checkUniqueStrings(ctx, ex.risk.options, ['risk', 'options'], 'Niveau de risque')
    checkIndex(ctx, ex.risk.answer, ex.risk.options.length, ['risk', 'answer'])
  })

export const flashcardExerciseSchema = z.strictObject({
  ...exerciseBase,
  type: z.literal('flashcard'),
  front: text(),
  back: text(),
})

export const exerciseSchema = z.discriminatedUnion('type', [
  mcqExerciseSchema,
  trueFalseExerciseSchema,
  numericExerciseSchema,
  journalEntryExerciseSchema,
  caseStudyExerciseSchema,
  consolidationCaseExerciseSchema,
  auditCaseExerciseSchema,
  flashcardExerciseSchema,
])

/** Contenu d'un fichier `content/<ue>/**.json`. */
export const contentFileSchema = z.strictObject({
  exercises: z.array(exerciseSchema),
})

/**
 * Enveloppe seule (exercices non validés) : permet de valider les exercices un
 * par un, pour qu'un exercice invalide ne masque pas les autres du même fichier.
 */
export const contentFileEnvelopeSchema = z.strictObject({
  exercises: z.array(z.unknown()),
})

// ---------------------------------------------------------------------------
// Taxonomie (content/taxonomy.json)
// ---------------------------------------------------------------------------

export const taxonomyNotionSchema = z
  .strictObject({
    id: kebabId(),
    title: text(),
    refs: z.array(text()),
    group: kebabId().optional(),
    group_title: text().optional(),
  })
  .superRefine((n, ctx) => {
    if (n.group !== undefined && n.group_title === undefined) {
      issue(ctx, ['group_title'], '"group_title" est obligatoire quand "group" est renseigné')
    }
    if (n.group === undefined && n.group_title !== undefined) {
      issue(ctx, ['group'], '"group_title" sans "group"')
    }
  })

export const taxonomyThemeSchema = z.strictObject({
  id: kebabId(),
  title: text(),
  official: z.boolean(),
  notions: z.array(taxonomyNotionSchema),
})

export const taxonomyExamSchema = z.strictObject({
  duration_minutes: z.int().positive().nullable(),
  coefficient: positiveNumber().nullable(),
  ects: positiveNumber().nullable(),
  format: text().nullable(),
})

export const taxonomyUeSchema = z
  .strictObject({
    id: ueIdSchema,
    slug: kebabId(),
    title: text(),
    weight: positiveNumber(),
    target_v1: z.int().min(0),
    exam: taxonomyExamSchema,
    themes: z.array(taxonomyThemeSchema),
  })
  .superRefine((ue, ctx) => {
    checkUniqueStrings(
      ctx,
      ue.themes.map((t) => t?.id),
      ['themes'],
      `Identifiant de thème (dans ${ue.id})`,
    )
  })

export const taxonomySchema = z
  .strictObject({
    version: text(),
    program_ref: text(),
    sources: z.array(z.strictObject({ label: text(), url: z.url() })),
    ues: z.array(taxonomyUeSchema).min(1),
  })
  .superRefine((tax, ctx) => {
    checkUniqueStrings(
      ctx,
      tax.ues.map((u) => u?.id),
      ['ues'],
      'Identifiant d’UE',
    )
    checkUniqueStrings(
      ctx,
      tax.ues.map((u) => u?.slug),
      ['ues'],
      'Slug d’UE',
    )
    // Les notions sont identifiées globalement (progression, fiches de cours).
    const seen = new Map<string, string>()
    tax.ues.forEach((ue, u) => {
      ue?.themes?.forEach((theme, t) => {
        theme?.notions?.forEach((notion, n) => {
          if (typeof notion?.id !== 'string') return
          const where = `${ue.id} > ${theme.id}`
          const first = seen.get(notion.id)
          if (first !== undefined) {
            issue(
              ctx,
              ['ues', u, 'themes', t, 'notions', n, 'id'],
              `Identifiant de notion "${notion.id}" en double (déjà utilisé dans ${first})`,
            )
          } else {
            seen.set(notion.id, where)
          }
        })
      })
    })
  })

// ---------------------------------------------------------------------------
// Types inférés
// ---------------------------------------------------------------------------

export type UeId = z.infer<typeof ueIdSchema>
export type ExerciseType = z.infer<typeof exerciseTypeSchema>
export type AuditCycle = z.infer<typeof auditCycleSchema>
export type ConsolidationStage = z.infer<typeof consolidationStageSchema>
export type Difficulty = z.infer<typeof difficultySchema>
export type Tolerance = z.infer<typeof toleranceSchema>
export type JournalLine = z.infer<typeof journalLineSchema>

export type SubQuestion = z.infer<typeof subQuestionSchema>
export type SubQuestionKind = SubQuestion['kind']
export type ConsolidationStep = z.infer<typeof consolidationStepSchema>
export type ConsolidationEntity = z.infer<typeof consolidationEntitySchema>
export type ConsolidationLink = z.infer<typeof consolidationLinkSchema>

export type McqExercise = z.infer<typeof mcqExerciseSchema>
export type TrueFalseExercise = z.infer<typeof trueFalseExerciseSchema>
export type NumericExercise = z.infer<typeof numericExerciseSchema>
export type JournalEntryExercise = z.infer<typeof journalEntryExerciseSchema>
export type CaseStudyExercise = z.infer<typeof caseStudyExerciseSchema>
export type ConsolidationCaseExercise = z.infer<typeof consolidationCaseExerciseSchema>
export type AuditCaseExercise = z.infer<typeof auditCaseExerciseSchema>
export type FlashcardExercise = z.infer<typeof flashcardExerciseSchema>

/** Exercice après parsing (valeurs par défaut appliquées : `tags`, `multiple`). */
export type Exercise = z.infer<typeof exerciseSchema>
/** Exercice tel qu'écrit dans le JSON (avant valeurs par défaut). */
export type ExerciseInput = z.input<typeof exerciseSchema>
export type ExerciseOfType<T extends ExerciseType> = Extract<Exercise, { type: T }>
export type ContentFile = z.infer<typeof contentFileSchema>

export type TaxonomyNotion = z.infer<typeof taxonomyNotionSchema>
export type TaxonomyTheme = z.infer<typeof taxonomyThemeSchema>
export type TaxonomyExam = z.infer<typeof taxonomyExamSchema>
export type TaxonomyUe = z.infer<typeof taxonomyUeSchema>
export type Taxonomy = z.infer<typeof taxonomySchema>

// ---------------------------------------------------------------------------
// Formatage des erreurs
// ---------------------------------------------------------------------------

/** Chemin Zod lisible : `["exercises", 3, "options"]` → `exercises[3].options`. */
export function formatZodPath(path: readonly PropertyKey[]): string {
  let out = ''
  for (const seg of path) {
    if (typeof seg === 'number') out += `[${seg}]`
    else out += out === '' ? String(seg) : `.${String(seg)}`
  }
  return out === '' ? '(racine)' : out
}

/** Une ligne par issue : `exercises[3].options : message`. */
export function formatZodIssues(error: z.ZodError): string[] {
  return error.issues.map((i) => `${formatZodPath(i.path)} : ${i.message}`)
}
