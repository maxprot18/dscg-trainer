// @vitest-environment node
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { afterAll, describe, expect, it } from 'vitest'
import { exampleExercises, exampleTaxonomy } from '../src/content/__fixtures__/examples.ts'
import { validateContent } from './validate-content.ts'

const root = mkdtempSync(path.join(tmpdir(), 'dscg-validate-'))
afterAll(() => rmSync(root, { recursive: true, force: true }))

/** Crée un dossier de contenu à partir d'un dictionnaire chemin → contenu (objet = JSON). */
function makeContentDir(name: string, files: Record<string, unknown>): string {
  const dir = path.join(root, name)
  for (const [rel, content] of Object.entries(files)) {
    const full = path.join(dir, rel)
    mkdirSync(path.dirname(full), { recursive: true })
    writeFileSync(full, typeof content === 'string' ? content : JSON.stringify(content, null, 2))
  }
  mkdirSync(dir, { recursive: true })
  return dir
}

const ex = exampleExercises

/** Fiche de cours valide : un titre et 10 lignes non vides. */
const course = (title: string) => [`# ${title}`, ...Array.from({ length: 9 }, (_, i) => `Ligne ${i + 1}`)].join('\n')

describe('validateContent — dossier valide', () => {
  const dir = makeContentDir('valid', {
    'taxonomy.json': exampleTaxonomy,
    'ue4-compta-audit/ifrs/ias-16-immobilisations.json': {
      exercises: [ex.mcq, ex.true_false, ex.case_study, ex.flashcard],
    },
    'ue4-compta-audit/pcg/achats.json': { exercises: [ex.journal_entry] },
    'ue4-compta-audit/consolidation/perimetre-et-methodes.json': { exercises: [ex.consolidation_case] },
    'ue4-compta-audit/audit/cycle-ventes-clients.json': { exercises: [ex.audit_case] },
    'ue2-finance/van-tri.json': { exercises: [ex.numeric] },
    'courses/ias-16-immobilisations.md': course('IAS 16'),
    'courses/van-tri.md': course('VAN'),
  })

  it('ne remonte ni erreur ni avertissement, en mode normal comme strict', () => {
    for (const requireVerified of [false, true]) {
      const r = validateContent(dir, { requireVerified })
      expect(r.errors).toEqual([])
      expect(r.warnings).toEqual([])
    }
  })

  it('calcule les statistiques', () => {
    const { stats } = validateContent(dir, { requireVerified: false })
    expect(stats.files).toBe(5)
    expect(stats.exercises).toBe(8)
    expect(stats.verified).toBe(8)
    expect(stats.byUe).toMatchObject({ UE4: 7, UE2: 1, UE1: 0 })
    expect(stats.byType).toEqual({
      mcq: 1,
      true_false: 1,
      numeric: 1,
      journal_entry: 1,
      case_study: 1,
      consolidation_case: 1,
      audit_case: 1,
      flashcard: 1,
    })
    expect(stats.notionsCovered).toBe(5)
    expect(stats.notionsTotal).toBe(6)
    expect(stats.courses).toBe(2)
  })

  it('accepte une URL file://', () => {
    const r = validateContent(new URL(`file://${dir}`), { requireVerified: false })
    expect(r.errors).toEqual([])
  })
})

describe('validateContent — dossier avec erreurs', () => {
  const badOptions = { ...ex.mcq, id: 'ue4-bad-options', options: ['a', 'a'] }
  const dir = makeContentDir('invalid', {
    'taxonomy.json': exampleTaxonomy,
    'ue4-compta-audit/ifrs/broken.json': '{ "exercises": [ ',
    'ue4-compta-audit/ifrs/schema.json': { exercises: [ex.mcq, badOptions] },
    'ue4-compta-audit/ifrs/misc.json': {
      exercises: [
        ex.true_false,
        { ...ex.flashcard, id: 'ue4-notion-inconnue', notion: 'ias-99' },
        { ...ex.flashcard, id: 'ue4-mauvais-theme', notion: 'perimetre-et-methodes' },
        { ...ex.flashcard, id: 'ue4-theme-inconnu', theme: 'fiscalite' },
        { ...ex.flashcard, id: 'ue4-non-verifie', verified: false },
        { ...ex.audit_case, id: 'ue4-audit-cycle', cycle: 'stocks' },
      ],
    },
    'ue4-compta-audit/ifrs/dup.json': { exercises: [{ ...ex.flashcard, id: 'ue4-misc-dup' }] },
    'ue4-compta-audit/ifrs/dup2.json': { exercises: [{ ...ex.flashcard, id: 'ue4-misc-dup' }] },
    'ue2-finance/mal-range.json': { exercises: [{ ...ex.flashcard, id: 'ue4-mal-range' }] },
    'orphelin.json': { exercises: [{ ...ex.numeric, id: 'ue2-orphelin' }] },
    'notes.txt': 'brouillon',
    'courses/notion-fantome.md': '# ?\n',
    'courses/van-tri.md': 'VAN sans titre\n',
    'courses/ias-16-immobilisations.md': '# IAS 16\n',
  })

  const r = validateContent(dir, { requireVerified: false })
  const has = (list: string[], ...parts: string[]) =>
    expect(list.some((m) => parts.every((p) => m.includes(p))), `attendu : ${parts.join(' + ')}\n${list.join('\n')}`).toBe(true)

  it('signale le JSON invalide avec le chemin du fichier', () => {
    has(r.errors, 'ue4-compta-audit/ifrs/broken.json', 'JSON invalide')
  })

  it('signale les erreurs de schéma avec le chemin Zod', () => {
    has(r.errors, 'ue4-compta-audit/ifrs/schema.json', 'exercises[1].options[1]', 'double')
  })

  it('signale les identifiants en double entre fichiers', () => {
    has(r.errors, 'dup2.json', 'ue4-misc-dup', 'en double', 'dup.json')
  })

  it('vérifie le rattachement à la taxonomie', () => {
    has(r.errors, 'ue4-notion-inconnue', 'ias-99', 'absente')
    has(r.errors, 'ue4-mauvais-theme', 'appartient à UE4 > consolidation')
    has(r.errors, 'ue4-theme-inconnu', 'fiscalite')
  })

  it('vérifie le rangement sous content/<slug de l’UE>/', () => {
    has(r.errors, 'ue4-mal-range', 'content/ue4-compta-audit/')
    has(r.errors, 'orphelin.json', 'content/ue2-finance/')
  })

  it('vérifie les fiches de cours', () => {
    has(r.errors, 'courses/notion-fantome.md', 'notion')
    has(r.errors, 'courses/van-tri.md', 'titre')
    expect(r.warnings.some((m) => m.includes('courses/ias-16-immobilisations.md') && m.includes('lignes'))).toBe(true)
    expect(r.errors.some((m) => m.includes('courses/ias-16-immobilisations.md'))).toBe(false)
  })

  it('avertit : cycle ≠ groupe, non vérifié, fichier non JSON', () => {
    has(r.warnings, 'ue4-audit-cycle', 'stocks', 'ventes-clients')
    has(r.warnings, 'ue4-non-verifie', 'non vérifié')
    has(r.warnings, 'notes.txt')
    expect(r.errors.some((m) => m.includes('ue4-non-verifie'))).toBe(false)
  })

  it('--require-verified transforme les non vérifiés en erreurs', () => {
    const strict = validateContent(dir, { requireVerified: true })
    has(strict.errors, 'ue4-non-verifie', 'non vérifié')
    expect(strict.warnings.some((m) => m.includes('ue4-non-verifie'))).toBe(false)
  })

  it('compte les fichiers même invalides ; un exercice invalide ne masque pas les autres', () => {
    expect(r.stats.files).toBe(7)
    expect(r.stats.invalidExercises).toBe(1)
    // schema.json : exercises[0] valide reste compté (et sa notion couverte).
    expect(r.stats.byType.mcq).toBe(1)
  })
})

describe('validateContent — taxonomie', () => {
  it('erreur bloquante si taxonomy.json manque', () => {
    const dir = makeContentDir('no-taxonomy', { 'ue2-finance/a.json': { exercises: [] } })
    const r = validateContent(dir, { requireVerified: false })
    expect(r.errors).toHaveLength(1)
    expect(r.errors[0]).toMatch(/taxonomy\.json : fichier introuvable/)
  })

  it('erreur bloquante si taxonomy.json est invalide', () => {
    const dir = makeContentDir('bad-taxonomy', {
      'taxonomy.json': { ...exampleTaxonomy, ues: [{ ...exampleTaxonomy.ues[0], weight: 0 }] },
    })
    const r = validateContent(dir, { requireVerified: false })
    expect(r.errors).toEqual([expect.stringMatching(/^taxonomy\.json › ues\[0\]\.weight : /)])
  })

  it('erreur si le dossier n’existe pas', () => {
    const r = validateContent(path.join(root, 'absent'), { requireVerified: false })
    expect(r.errors[0]).toMatch(/introuvable/)
  })
})
