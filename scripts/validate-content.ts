/**
 * Validation du contenu pédagogique (`content/`).
 *
 *   npm run validate                 # exercices non vérifiés = avertissements
 *   npm run validate:strict          # exercices non vérifiés = erreurs (--require-verified)
 *   tsx scripts/validate-content.ts --content-dir <dossier>
 *
 * Importable : `validateContent(contentDir, { requireVerified })` ne fait aucune
 * sortie console ; le CLI ne s'exécute que si le fichier est lancé directement.
 */
import { existsSync, readdirSync, readFileSync, realpathSync, statSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { z } from 'zod'
import {
  contentFileEnvelopeSchema,
  EXERCISE_TYPES,
  exerciseSchema,
  formatZodIssues,
  formatZodPath,
  taxonomySchema,
  UE_IDS,
  type Exercise,
  type ExerciseType,
  type Taxonomy,
  type UeId,
} from '../src/content/schema.ts'
import { extractDiagramBlocks, parseDiagram } from '../src/content/diagram.ts'
import { buildTaxonomyIndex, checkPlacement, describePlacementProblem } from '../src/content/taxonomy.ts'

// Messages Zod génériques en français (les messages métier du schéma le sont déjà).
z.config(z.locales.fr())

export interface ValidateOptions {
  requireVerified: boolean
}

export interface ValidationStats {
  files: number
  exercises: number
  /** Exercices rejetés par le schéma (non comptés dans `exercises`). */
  invalidExercises: number
  verified: number
  byUe: Record<UeId, number>
  byType: Record<ExerciseType, number>
  notionsCovered: number
  notionsTotal: number
  courses: number
  diagrams: number
}

export interface ValidationResult {
  errors: string[]
  warnings: string[]
  stats: ValidationStats
}

const TAXONOMY_FILE = 'taxonomy.json'
/** Longueur attendue d'une fiche de cours (lignes non vides, SPEC : 10 à 30 lignes). */
const COURSE_MIN_LINES = 10
const COURSE_MAX_LINES = 30
/** Fichiers de documentation tolérés à la racine de content/. */
const ROOT_DOC_FILES = new Set(['LICENSE', 'README.md'])
const COURSES_DIR = 'courses'

function emptyStats(): ValidationStats {
  return {
    files: 0,
    exercises: 0,
    invalidExercises: 0,
    verified: 0,
    byUe: Object.fromEntries(UE_IDS.map((u) => [u, 0])) as Record<UeId, number>,
    byType: Object.fromEntries(EXERCISE_TYPES.map((t) => [t, 0])) as Record<ExerciseType, number>,
    notionsCovered: 0,
    notionsTotal: 0,
    courses: 0,
    diagrams: 0,
  }
}

/** Chemin relatif au dossier de contenu, toujours avec des `/`. */
function rel(contentDir: string, file: string): string {
  return path.relative(contentDir, file).split(path.sep).join('/')
}

/** Fichiers JSON d'exercices (récursif, hors taxonomy.json et courses/), triés. */
function listContentFiles(contentDir: string, warnings: string[]): string[] {
  const out: string[] = []
  const walk = (dir: string) => {
    const entries = readdirSync(dir, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name))
    for (const entry of entries) {
      if (entry.name.startsWith('.')) continue
      const full = path.join(dir, entry.name)
      const relPath = rel(contentDir, full)
      if (entry.isDirectory()) {
        if (relPath === COURSES_DIR) continue
        walk(full)
      } else if (relPath === TAXONOMY_FILE || ROOT_DOC_FILES.has(relPath)) {
        continue
      } else if (entry.name.endsWith('.json')) {
        out.push(full)
      } else {
        warnings.push(`${relPath} : fichier ignoré (seuls les .json sont lus hors de courses/)`)
      }
    }
  }
  walk(contentDir)
  return out
}

function readJson(file: string): { ok: true; value: unknown } | { ok: false; message: string } {
  try {
    return { ok: true, value: JSON.parse(readFileSync(file, 'utf8')) }
  } catch (e) {
    return { ok: false, message: e instanceof Error ? e.message : String(e) }
  }
}

function loadTaxonomy(contentDir: string, errors: string[]): Taxonomy | null {
  const file = path.join(contentDir, TAXONOMY_FILE)
  if (!existsSync(file)) {
    errors.push(`${TAXONOMY_FILE} : fichier introuvable (attendu : ${file})`)
    return null
  }
  const json = readJson(file)
  if (!json.ok) {
    errors.push(`${TAXONOMY_FILE} : JSON invalide — ${json.message}`)
    return null
  }
  const parsed = taxonomySchema.safeParse(json.value)
  if (!parsed.success) {
    for (const line of formatZodIssues(parsed.error)) errors.push(`${TAXONOMY_FILE} › ${line}`)
    return null
  }
  return parsed.data
}

export function validateContent(contentDir: string | URL, opts: ValidateOptions): ValidationResult {
  const dir = typeof contentDir === 'string' ? path.resolve(contentDir) : fileURLToPath(contentDir)
  const errors: string[] = []
  const warnings: string[] = []
  const stats = emptyStats()

  if (!existsSync(dir) || !statSync(dir).isDirectory()) {
    errors.push(`Dossier de contenu introuvable : ${dir}`)
    return { errors, warnings, stats }
  }

  const taxonomy = loadTaxonomy(dir, errors)
  if (!taxonomy) return { errors, warnings, stats }
  const index = buildTaxonomyIndex(taxonomy)
  stats.notionsTotal = index.notions.size

  // --- Exercices -----------------------------------------------------------
  const seenIds = new Map<string, string>() // id → emplacement de la 1re occurrence
  const coveredNotions = new Set<string>()

  for (const file of listContentFiles(dir, warnings)) {
    const relPath = rel(dir, file)
    stats.files++
    const json = readJson(file)
    if (!json.ok) {
      errors.push(`${relPath} : JSON invalide — ${json.message}`)
      continue
    }
    const envelope = contentFileEnvelopeSchema.safeParse(json.value)
    if (!envelope.success) {
      for (const line of formatZodIssues(envelope.error)) errors.push(`${relPath} › ${line}`)
      continue
    }
    if (envelope.data.exercises.length === 0) warnings.push(`${relPath} : aucun exercice`)
    const topDir = relPath.split('/')[0]

    // Validation exercice par exercice : un exercice invalide ne masque pas les autres.
    const exercises: [number, Exercise][] = []
    envelope.data.exercises.forEach((raw, i) => {
      const parsed = exerciseSchema.safeParse(raw)
      if (parsed.success) {
        exercises.push([i, parsed.data])
        return
      }
      stats.invalidExercises++
      for (const iss of parsed.error.issues) {
        errors.push(`${relPath} › ${formatZodPath(['exercises', i, ...iss.path])} : ${iss.message}`)
      }
    })

    for (const [i, ex] of exercises) {
      const where = `${relPath} › exercises[${i}] (${ex.id})`
      stats.exercises++
      stats.byUe[ex.ue]++
      stats.byType[ex.type]++
      if (ex.verified) stats.verified++

      const first = seenIds.get(ex.id)
      if (first !== undefined) errors.push(`${where} : identifiant en double (déjà utilisé dans ${first})`)
      else seenIds.set(ex.id, `${relPath} › exercises[${i}]`)

      const problem = checkPlacement(index, ex)
      if (problem) {
        errors.push(`${where} : ${describePlacementProblem(problem)}`)
      } else {
        coveredNotions.add(ex.notion)
      }

      const ue = index.ues.get(ex.ue)
      if (ue && topDir !== ue.slug) {
        errors.push(`${where} : un exercice ${ex.ue} doit être rangé sous content/${ue.slug}/ (fichier : content/${relPath})`)
      }

      if (ex.type === 'audit_case') {
        const group = index.notions.get(ex.notion)?.notion.group
        if (group !== undefined && group !== ex.cycle) {
          warnings.push(`${where} : cycle "${ex.cycle}" différent du groupe de la notion "${group}"`)
        }
      }

      if (!ex.verified) {
        const msg = `${where} : exercice non vérifié (verified: false)`
        if (opts.requireVerified) errors.push(msg)
        else warnings.push(msg)
      }
    }
  }
  stats.notionsCovered = coveredNotions.size

  // --- Fiches de cours -----------------------------------------------------
  const coursesDir = path.join(dir, COURSES_DIR)
  if (existsSync(coursesDir) && statSync(coursesDir).isDirectory()) {
    const entries = readdirSync(coursesDir, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name))
    for (const entry of entries) {
      if (entry.name.startsWith('.')) continue
      const relPath = `${COURSES_DIR}/${entry.name}`
      if (!entry.isFile() || !entry.name.endsWith('.md')) {
        warnings.push(`${relPath} : ignoré (seuls les fichiers .md sont attendus dans courses/)`)
        continue
      }
      const notionId = entry.name.slice(0, -'.md'.length)
      if (!index.notions.has(notionId)) {
        errors.push(`${relPath} : "${notionId}" n'est pas un identifiant de notion de la taxonomie`)
      } else {
        stats.courses++
        const lines = readFileSync(path.join(coursesDir, entry.name), 'utf8')
          .split(/\r?\n/)
          .filter((l) => l.trim() !== '')
        if (!lines[0]?.startsWith('# ')) errors.push(`${relPath} : la fiche doit commencer par un titre « # … »`)
        const source = readFileSync(path.join(coursesDir, entry.name), 'utf8')
        extractDiagramBlocks(source).forEach((block, k) => {
          const parsed = parseDiagram(block)
          if (!parsed.ok) errors.push(`${relPath} : diagramme ${k + 1} invalide (${parsed.error})`)
          else stats.diagrams++
        })
        for (const m of source.matchAll(/\]\((\/cours\/([a-z0-9-]+))\)/g)) {
          if (!index.notions.has(m[2])) errors.push(`${relPath} : lien vers une notion inconnue « ${m[2]} »`)
        }
        if (lines.length < COURSE_MIN_LINES || lines.length > COURSE_MAX_LINES) {
          warnings.push(
            `${relPath} : ${lines.length} lignes non vides (attendu : ${COURSE_MIN_LINES} à ${COURSE_MAX_LINES})`,
          )
        }
      }
    }
  }

  return { errors, warnings, stats }
}

// ---------------------------------------------------------------------------
// CLI
// ---------------------------------------------------------------------------

export function formatSummary(stats: ValidationStats): string {
  const pct = (n: number, d: number) => (d === 0 ? '—' : `${Math.round((n / d) * 100)} %`)
  const byUe = UE_IDS.map((u) => `${u} ${stats.byUe[u]}`).join(' · ')
  const byType = EXERCISE_TYPES.filter((t) => stats.byType[t] > 0)
    .map((t) => `${t} ${stats.byType[t]}`)
    .join(' · ')
  const total = stats.notionsTotal
  return [
    'Résumé',
    `  Fichiers d'exercices : ${stats.files}`,
    `  Exercices valides   : ${stats.exercises} (vérifiés : ${stats.verified}, ${pct(stats.verified, stats.exercises)})` +
      (stats.invalidExercises > 0 ? ` — ${stats.invalidExercises} invalide(s)` : ''),
    `  Par UE              : ${byUe}`,
    `  Par type            : ${byType || '—'}`,
    `  Notions couvertes   : ${stats.notionsCovered} / ${total} (${pct(stats.notionsCovered, total)})`,
    `  Fiches de cours     : ${stats.courses} / ${total} (${stats.diagrams} diagrammes)`,
  ].join('\n')
}

function parseArgs(argv: string[]): { contentDir: string; requireVerified: boolean } {
  let contentDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'content')
  let requireVerified = false
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i]
    if (arg === '--require-verified') requireVerified = true
    else if (arg === '--content-dir') {
      const value = argv[++i]
      if (!value) throw new Error('--content-dir attend un chemin')
      contentDir = path.resolve(value)
    } else if (arg.startsWith('--content-dir=')) contentDir = path.resolve(arg.slice('--content-dir='.length))
    else throw new Error(`Option inconnue : ${arg}`)
  }
  return { contentDir, requireVerified }
}

function main(): number {
  let args: ReturnType<typeof parseArgs>
  try {
    args = parseArgs(process.argv.slice(2))
  } catch (e) {
    console.error(e instanceof Error ? e.message : String(e))
    console.error('Usage : tsx scripts/validate-content.ts [--require-verified] [--content-dir <chemin>]')
    return 2
  }
  const { errors, warnings, stats } = validateContent(args.contentDir, { requireVerified: args.requireVerified })
  console.log(`Validation du contenu : ${args.contentDir}${args.requireVerified ? ' (mode strict)' : ''}\n`)
  if (warnings.length > 0) {
    console.warn(`⚠ ${warnings.length} avertissement(s)`)
    for (const w of warnings) console.warn(`  - ${w}`)
    console.warn('')
  }
  if (errors.length > 0) {
    console.error(`✖ ${errors.length} erreur(s)`)
    for (const e of errors) console.error(`  - ${e}`)
    console.error('')
  }
  console.log(formatSummary(stats))
  console.log(errors.length > 0 ? '\n✖ Contenu invalide' : '\n✔ Contenu valide')
  return errors.length > 0 ? 1 : 0
}

function isMain(): boolean {
  const entry = process.argv[1]
  if (!entry) return false
  try {
    return realpathSync(entry) === realpathSync(fileURLToPath(import.meta.url))
  } catch {
    return false
  }
}

if (isMain()) {
  process.exitCode = main()
}
