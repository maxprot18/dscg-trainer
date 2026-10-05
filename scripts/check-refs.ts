/**
 * Vérifie les références officielles citées dans le contenu contre les textes de `.sources/`
 * (`node scripts/fetch-sources.mjs` d'abord) : articles des codes, du PCG et du règlement ANC 2020-01,
 * numéros de NEP, normes IFRS et leurs paragraphes, comptes des écritures.
 *
 * Sorties : résumé dans la console, rapport détaillé dans `.sources/rapport-references.md` et
 * `.sources/rapport-references.json` (une ligne par référence introuvable, à faire trier par un relecteur).
 * Une référence introuvable n'est pas forcément fausse (article abrogé cité comme « ancien », annexe du CGI
 * absente du miroir, numérotation propre à un texte non chargé) : le rapport sert de liste de contrôle.
 *
 * Usage : npm run check:refs
 */
import { existsSync, readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs'
import { join, relative } from 'node:path'

const SRC = '.sources'
const CONTENT = 'content'
if (!existsSync(join(SRC, 'codes'))) {
  console.error('Sources absentes : lancer `node scripts/fetch-sources.mjs` (voir l’en-tête du script).')
  process.exit(1)
}

// ---------- Index des textes ----------

type Code = 'com' | 'trav' | 'civ' | 'cgi' | 'consom' | 'css'
const CODE_DIRS: Record<Exclude<Code, 'css'>, string> = {
  com: 'Code de commerce',
  trav: 'Code du travail',
  civ: 'Code civil',
  cgi: 'Code général des impôts',
  consom: 'Code de la consommation',
}
const CODE_LABEL: Record<Code, string> = {
  com: 'C. com.',
  trav: 'C. trav.',
  civ: 'C. civ.',
  cgi: 'CGI',
  consom: 'C. consom.',
  css: 'CSS',
}

function walk(dir: string, out: string[] = []): string[] {
  for (const f of readdirSync(dir)) {
    const p = join(dir, f)
    if (statSync(p).isDirectory()) walk(p, out)
    else out.push(p)
  }
  return out
}

/** Forme normalisée d'un numéro d'article : « L. 233-16 » → « L233-16 », espaces simples. */
const norm = (s: string) =>
  s
    .replace(/^([LRDA])\.?\s*/, '$1')
    .replace(/\s+/g, ' ')
    .trim()

const articles = {} as Record<Code, Set<string>>
for (const [code, dir] of Object.entries(CODE_DIRS) as [Exclude<Code, 'css'>, string][]) {
  articles[code] = new Set(
    walk(join(SRC, 'codes', dir))
      .map((p) => p.match(/Article (.+)\.md$/)?.[1])
      .filter((x): x is string => !!x)
      .map(norm),
  )
}
{
  // Code de la sécurité sociale : arbre unist de @socialgouv/legi-data, articles en vigueur seulement.
  const css = JSON.parse(readFileSync(join(SRC, 'legi-data/package/data/LEGITEXT000006073189.json'), 'utf8'))
  articles.css = new Set()
  const visit = (n: { type?: string; data?: { num?: string; etat?: string }; children?: unknown[] }) => {
    if (n.type === 'article' && n.data?.num && /^(VIGUEUR|ABROGE_DIFF)/.test(n.data.etat ?? '')) articles.css.add(norm(n.data.num))
    for (const c of (n.children ?? []) as (typeof n)[]) visit(c)
  }
  visit(css)
}

const pcgText = readFileSync(join(SRC, 'pcg.txt'), 'utf8')
const pcgArticles = new Set([...pcgText.matchAll(/^\s*(?:Art\.?|Article)\s+(\d{3}-\d+(?:\/\d+)?(?:-\d+)?)/gm)].map((m) => m[1]))
/** Comptes de la nomenclature du PCG (liste des comptes, deuxième moitié du recueil). */
const pcgAccounts = new Set([...pcgText.matchAll(/^\s*(\d{2,7})\s{1,10}[A-ZÉÈÀ«(]/gm)].map((m) => m[1]))
// Plages « 471 à 473 » de la nomenclature.
for (const m of pcgText.matchAll(/^\s*(\d{3,4})\s+à\s+(\d{3,4})\b/gm)) for (let n = Number(m[1]); n <= Number(m[2]); n++) pcgAccounts.add(String(n))
/** Comptes dont la nomenclature prévoit une subdivision calquée sur une autre classe (« même ventilation que… »). */
const pcgVentilated = new Set([...pcgText.matchAll(/^\s*(\d{2,7})\s+[^\n]*même ventilation/gm)].map((m) => m[1]))

const ancText = readFileSync(join(SRC, 'anc-2020-01.txt'), 'utf8')
const ancArticles = new Set([...ancText.matchAll(/^\s*(?:Art\.?|Article)\s+(\d{3}-\d+)/gm)].map((m) => m[1]))

const h2a = readFileSync(join(SRC, 'h2a.html'), 'utf8')
const nepNumbers = new Set([...h2a.matchAll(/NEP\s*(\d{3,4})/g)].map((m) => m[1]))

/** IFRS : texte de chaque norme du règlement consolidé, pour retrouver les paragraphes. */
const ifrsText = readFileSync(join(SRC, 'ifrs.txt'), 'utf8')
const ifrsCelex = ifrsText.match(/^CELEX (\S+)/)?.[1] ?? '?'
const standards = new Map<string, string>()
{
  const re = /^(NORME COMPTABLE INTERNATIONALE|NORME INTERNATIONALE D.INFORMATION FINANCIÈRE|INTERPRÉTATION IFRIC|INTERPRÉTATION SIC)[\s\u00a0-]+(\d+)[\s\u00a0]*$/gm
  const heads = [...ifrsText.matchAll(re)]
  heads.forEach((h, i) => {
    const kind = h[1].startsWith('NORME COMPTABLE') ? 'IAS' : h[1].startsWith('NORME INTERNATIONALE') ? 'IFRS' : h[1].includes('IFRIC') ? 'IFRIC' : 'SIC'
    const body = ifrsText.slice(h.index!, heads[i + 1]?.index ?? ifrsText.length)
    const key = `${kind} ${h[2]}`
    // Une norme peut apparaître plusieurs fois (texte, puis amendements) : on concatène.
    standards.set(key, (standards.get(key) ?? '') + body)
  })
}
const hasParagraph = (std: string, para: string) => {
  const body = standards.get(std)
  if (!body) return false
  const p = para.replace(/\s+/g, '')
  return new RegExp(`^\\s*${p.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}[\\s.]`, 'm').test(body)
}

// ---------- Extraction des références ----------

interface Finding {
  where: string
  id: string
  kind: string
  ref: string
  problem: string
  context: string
}
const findings: Finding[] = []
const stats = { refs: 0, ok: 0 }

/** Repères de code dans une référence, dans l'ordre où ils apparaissent. */
const MARKERS: [RegExp, Code | 'skip' | 'pcg' | 'anc'][] = [
  [/C\.\s?com\.|Code de commerce|\bC\.com\b/g, 'com'],
  [/C\.\s?trav\.|Code du travail/g, 'trav'],
  [/C\.\s?civ\.|Code civil/g, 'civ'],
  [/CGI\s+ann\.|annexe (II|III|IV) (au|du) CGI/g, 'skip'],
  [/\bCGI\b|Code général des impôts/g, 'cgi'],
  [/C\.\s?consom\.|Code de la consommation/g, 'consom'],
  [/\bCSS\b|C\.\s?séc\.\s?soc\.|Code de la sécurité sociale/g, 'css'],
  [/C\.\s?mon\.\s?fin\.|\bCMF\b|C\.\s?ass(?:ur)?\.|Code des assurances|\bCPP\b|C\.\s?pén\.|Code pénal|\bLPF\b|C\.\s?pr\.\s?civ\.|\bCPC\b|C\.\s?env\.|C\.\s?rur\.|\bCCH\b/g, 'skip'],
  [/[Ll]oi n°|[Oo]rdonnance|[Dd]écret|[Dd]irective|[Rr]èglement \(UE\)|règl\. \(UE\)|\bRGPD\b|\bTFUE\b|[Aa]rrêté/g, 'skip'],
  [/règl(?:ement|\.)?\s+ANC\s+(?:n°\s*)?2020-01|ANC\s+2020-01/g, 'anc'],
  [/\bPCG\b|règl(?:ement|\.)?\s+ANC\s+(?:n°\s*)?2014-03/g, 'pcg'],
]

const SUFFIX = '(?:\\s(?:bis|ter|quater|quinquies|sexies|septies|octies|nonies|decies|undecies|duodecies))?'
const CGI_NUM = new RegExp(`\\b(\\d{1,4}(?:-\\d+)*(?:\\s[A-H]{1,2}(?=[\\s,;.)]|$))?${SUFFIX}(?:\\s[A-H](?=[\\s,;.)]|$))?)`, 'g')
const L_NUM = /(?<![\w-])(?:ancien(?:s)?\s+(?:art\.\s*)?)?([LRDA])\.?\s?(\d{3,4}(?:-\d+)+)/g

/** Candidats du plus précis au plus général : « 39-1-3 » → 39-1-3, 39-1, 39. */
function candidates(num: string): string[] {
  const out = [num]
  let n = num
  while (/-\d+$/.test(n.split(' ')[0])) {
    const [head, ...rest] = n.split(' ')
    n = [head.replace(/-\d+$/, ''), ...rest].join(' ')
    out.push(n)
  }
  // « 150-0 B ter » existe ; « 219 I » non : on essaie aussi sans les lettres finales.
  out.push(num.replace(/\s[A-H]{1,2}$/, ''), num.split(' ')[0])
  return [...new Set(out)]
}

function check(where: string, id: string, text: string) {
  if (!text) return
  // Une référence par segment « ; », sans les parenthèses (commentaires, montants, dates).
  for (const line of text.split('\n')) checkLine(where, id, line)
}

/** Une ligne (le contexte d'un code ne passe pas d'une ligne de fiche à la suivante). */
function checkLine(where: string, id: string, line: string) {
  const text = line
  let context: Code | 'skip' | 'pcg' | 'anc' | null = null
  for (const rawSeg of line.split(';')) {
    const seg = rawSeg.replace(/\([^()]*\)/g, ' ')
    // Numéros d'avant une renumérotation (« ancien art. L. 823-16 », « anc. art. »), ou annexes du CGI : non contrôlés.
    const historical = /\banc(?:ien(?:ne)?s?|\.)\s/i.test(rawSeg)
    const cgiAnnex = /annexe\s+(?:II|III|IV)\b|CGI\s+ann\./i.test(rawSeg)
    // Découpe le segment à chaque repère de code.
    const marks: { at: number; code: (typeof MARKERS)[number][1] }[] = []
    for (const [re, code] of MARKERS) for (const m of seg.matchAll(re)) marks.push({ at: m.index!, code })
    marks.sort((a, b) => a.at - b.at)
    const parts: { code: typeof context; text: string }[] = []
    if (!marks.length || marks[0].at > 0) parts.push({ code: context, text: seg.slice(0, marks[0]?.at ?? seg.length) })
    marks.forEach((m, i) => parts.push({ code: m.code, text: seg.slice(m.at, marks[i + 1]?.at ?? seg.length) }))
    if (marks.length) context = marks[marks.length - 1].code

    for (const part of parts) {
      let code = part.code
      if (code === 'skip' || historical) continue
      if (!code) {
        // Sans repère : L. + 3 chiffres = Code de commerce, L. + 4 chiffres = Code du travail (convention du contenu).
        const l = part.text.match(/(?<![\w-])L\.?\s?(\d{3,4})-\d/)
        if (!l) continue
        code = l[1].length === 3 ? 'com' : 'trav'
      }
      if (code === 'cgi' && cgiAnnex) continue
      if (code === 'pcg' || code === 'anc') {
        const set = code === 'pcg' ? pcgArticles : ancArticles
        for (const m of part.text.matchAll(/\b(?:art(?:icle)?s?\.?|§)\s*((?:\d{3}-\d+(?:\/\d+)?(?:\s*(?:,|et|à)\s*)?)+)/g)) {
          for (const num of m[1].match(/\d{3}-\d+(?:\/\d+)?/g) ?? []) {
            stats.refs++
            if (set.has(num) || set.has(num.replace(/\/\d+$/, ''))) stats.ok++
            else findings.push({ where, id, kind: code === 'pcg' ? 'PCG' : 'ANC 2020-01', ref: `art. ${num}`, problem: 'article absent du texte consolidé 2026', context: rawSeg.trim() })
          }
        }
        continue
      }
      // Articles L./R./D./A. des codes (le CGI n'en a pas : ceux-là relèvent du LPF).
      if (code !== 'cgi' && code !== 'civ') {
        for (const m of part.text.matchAll(L_NUM)) {
          if (/^ancien/.test(m[0])) continue
          const num = `${m[1]}${m[2]}`
          stats.refs++
          if (articles[code].has(num)) stats.ok++
          else findings.push({ where, id, kind: CODE_LABEL[code], ref: num, problem: 'article absent du code en vigueur (abrogé, renuméroté ou inexistant)', context: rawSeg.trim() })
        }
        continue
      }
      // CGI et Code civil : numéros après « art. », en liste « 145 et 216 », « 1843-4, 1844 ».
      const after = part.text.match(/\bart(?:icle)?s?\.?\s+(.*)$/s)
      if (!after) continue
      const list = after[1].split(/(,\s*(?=\d)|\s+et\s+(?=\d)|\s+à\s+(?=\d))/)
      let inParagraphs = false
      for (let i = 0; i < list.length; i += 2) {
        const item = list[i]
        // « art. 39, 1 », « art. 145, 1, b », « art. 201, 1 et 3 » : un chiffre seul après une virgule (ou après un
        // paragraphe) est un paragraphe de l'article, pas un autre article.
        if (i > 0 && (list[i - 1].startsWith(',') || inParagraphs) && /^\s*\d(?!\d)/.test(item)) {
          inParagraphs = true
          continue
        }
        inParagraphs = false
        const m = item.match(new RegExp(`^\\s*${CGI_NUM.source}`))
        if (!m) continue
        const num = norm(m[1])
        stats.refs++
        if (candidates(num).some((c) => articles[code].has(c))) stats.ok++
        else findings.push({ where, id, kind: CODE_LABEL[code], ref: num, problem: 'article absent du code en vigueur (abrogé, renuméroté ou inexistant)', context: rawSeg.trim() })
      }
    }
  }

  // NEP : numéro dans le référentiel de la H2A.
  for (const m of text.matchAll(/\bNEP\s*(?:n°\s*)?(\d{3,4})\b/g)) {
    stats.refs++
    if (nepNumbers.has(m[1])) stats.ok++
    else findings.push({ where, id, kind: 'NEP', ref: `NEP ${m[1]}`, problem: 'absente du référentiel normatif de la H2A', context: excerpt(text, m.index!) })
  }
  // IFRS : norme présente dans le règlement consolidé, paragraphe retrouvé dans la norme.
  for (const m of text.matchAll(/\b(IAS|IFRS|IFRIC|SIC)\s?(\d{1,2})\b(?:\s*(?:§|par\.|paragraphes?)\s*([A-Z]{0,2}\d+[A-Z]?(?:\.\d+)?))?/g)) {
    const std = `${m[1]} ${m[2]}`
    stats.refs++
    if (std === 'IAS 1') {
      // Supprimée de l'annexe par le règl. (UE) 2026/338 au profit d'IFRS 18, au plus tard pour les exercices ouverts dès 2027.
      findings.push({ where, id, kind: 'IFRS', ref: 'IAS 1', problem: 'supprimée par le règl. 2026/338 (IFRS 18 obligatoire dès 2027) : vérifier que le texte le dit', context: excerpt(text, m.index!) })
      continue
    }
    if (!standards.has(std)) {
      findings.push({ where, id, kind: 'IFRS', ref: std, problem: `norme absente du règlement 2023/1803 consolidé (${ifrsCelex})`, context: excerpt(text, m.index!) })
      continue
    }
    if (m[3] && !hasParagraph(std, m[3])) {
      findings.push({ where, id, kind: 'IFRS', ref: `${std} §${m[3]}`, problem: 'paragraphe non retrouvé dans la norme (à vérifier)', context: excerpt(text, m.index!) })
      continue
    }
    stats.ok++
  }
}

const excerpt = (t: string, at: number) => t.slice(Math.max(0, at - 60), at + 90).replace(/\s+/g, ' ').trim()

// ---------- Comptes des écritures ----------

const accountFindings = new Map<string, string[]>()
function checkAccounts(id: string, lines: { account: string }[] | undefined) {
  for (const l of lines ?? []) {
    const a = String(l.account)
    // Compte de la nomenclature 2026, ou subdivision d'un compte dont la nomenclature prévoit la ventilation
    // (« même ventilation que celle du compte 21 »). Les autres subdivisions (4486, 6788…) correspondent le plus
    // souvent à d'anciens comptes supprimés par le règl. ANC 2022-06 : elles sont signalées.
    const ok = pcgAccounts.has(a) || [...pcgVentilated].some((v) => a.startsWith(v) && a.length > v.length)
    if (!ok) accountFindings.set(a, [...(accountFindings.get(a) ?? []), id])
  }
}

// ---------- Parcours du contenu ----------

for (const file of walk(CONTENT)) {
  const rel = relative(CONTENT, file)
  if (file.endsWith('.md') && rel.startsWith('courses')) {
    const id = rel.replace(/^courses\/|\.md$/g, '')
    check(`fiche ${id}`, id, readFileSync(file, 'utf8'))
    continue
  }
  if (!file.endsWith('.json') || rel === 'taxonomy.json' || rel.startsWith('oral')) continue
  for (const e of JSON.parse(readFileSync(file, 'utf8')).exercises as Record<string, unknown>[]) {
    const id = e.id as string
    // Toutes les chaînes de l'exercice : source_ref, énoncé, corrigé, sous-questions, annexes.
    const strings: string[] = []
    const collect = (v: unknown) => {
      if (typeof v === 'string') strings.push(v)
      else if (Array.isArray(v)) v.forEach(collect)
      else if (v && typeof v === 'object') Object.values(v).forEach(collect)
    }
    collect(e)
    for (const s of strings) check(rel, id, s)
    const entries: { account: string }[][] = []
    const findLines = (v: unknown) => {
      if (Array.isArray(v) && v.length && typeof v[0] === 'object' && v[0] && 'account' in v[0]) entries.push(v as { account: string }[])
      else if (Array.isArray(v)) v.forEach(findLines)
      else if (v && typeof v === 'object') Object.values(v).forEach(findLines)
    }
    findLines(e)
    entries.forEach((lines) => checkAccounts(id, lines))
  }
}

// ---------- Rapport ----------

const uniq = new Map<string, Finding & { count: number; ids: string[] }>()
for (const f of findings) {
  const key = `${f.kind}|${f.ref}`
  const u = uniq.get(key)
  if (u) {
    u.count++
    if (!u.ids.includes(f.id)) u.ids.push(f.id)
  } else uniq.set(key, { ...f, count: 1, ids: [f.id] })
}
const rows = [...uniq.values()].sort((a, b) => a.kind.localeCompare(b.kind) || a.ref.localeCompare(b.ref, 'fr', { numeric: true }))

const md = [
  '# Vérification des références officielles',
  '',
  `Textes : codes LEGI du ${new Date(statSync(join(SRC, 'codes')).mtime).toISOString().slice(0, 10)}, PCG et ANC 2020-01 au 1er janvier 2026, référentiel H2A, IFRS ${ifrsCelex}.`,
  `Références contrôlées : ${stats.refs} ; retrouvées : ${stats.ok} ; introuvables : ${findings.length} (${rows.length} distinctes).`,
  '',
  '| Texte | Référence | Problème | Occurrences | Où (ids) | Contexte |',
  '| --- | --- | --- | --- | --- | --- |',
  ...rows.map((r) => `| ${r.kind} | ${r.ref} | ${r.problem} | ${r.count} | ${r.ids.slice(0, 6).join(', ')}${r.ids.length > 6 ? '…' : ''} | ${r.context.replace(/\|/g, '/').slice(0, 140)} |`),
  '',
  '## Comptes absents de la nomenclature du PCG 2026',
  '',
  ...[...accountFindings].sort().map(([a, ids]) => `- ${a} : ${[...new Set(ids)].slice(0, 8).join(', ')}`),
]
writeFileSync(join(SRC, 'rapport-references.md'), md.join('\n'))
writeFileSync(join(SRC, 'rapport-references.json'), JSON.stringify({ stats, findings: rows, accounts: Object.fromEntries(accountFindings) }, null, 2))

console.log(`Références contrôlées : ${stats.refs} · retrouvées : ${stats.ok} · introuvables : ${findings.length} (${rows.length} distinctes)`)
const byKind = new Map<string, number>()
for (const r of rows) byKind.set(r.kind, (byKind.get(r.kind) ?? 0) + 1)
console.log('Par texte :', [...byKind].map(([k, n]) => `${k} ${n}`).join(' · '))
console.log(`Comptes hors nomenclature : ${accountFindings.size}`)
console.log(`Index : C. com. ${articles.com.size} · CGI ${articles.cgi.size} · C. trav. ${articles.trav.size} · C. civ. ${articles.civ.size} · CSS ${articles.css.size} · PCG ${pcgArticles.size} art. / ${pcgAccounts.size} comptes · ANC 2020-01 ${ancArticles.size} · NEP ${nepNumbers.size} · normes IFRS ${standards.size}`)
console.log('Rapport : .sources/rapport-references.md')
