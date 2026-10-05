/**
 * Télécharge les textes officiels qui servent à vérifier le contenu (`npm run check:refs`) dans `.sources/`
 * (hors dépôt : le texte des NEP et des IFRS n'est pas librement rediffusable).
 *
 * Accès réseau nécessaires (réglages de l'environnement cloud) : www.anc.gouv.fr, h2a-france.org,
 * eur-lex.europa.eu, data.economie.gouv.fr, plus github.com et le registre npm (déjà autorisés).
 * Légifrance est protégé contre les accès automatisés : les codes viennent du miroir quotidien de la base
 * LEGI (github.com/LeMyst/Codes) et du paquet npm @socialgouv/legi-data (Code de la sécurité sociale).
 *
 * Usage : node scripts/fetch-sources.mjs [--force]
 */
import { execFileSync } from 'node:child_process'
import { existsSync, mkdirSync, readdirSync, rmSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const DIR = '.sources'
const force = process.argv.includes('--force')
mkdirSync(DIR, { recursive: true })

const run = (cmd, args, opts = {}) => execFileSync(cmd, args, { stdio: ['ignore', 'pipe', 'inherit'], ...opts })
const have = (f) => !force && existsSync(join(DIR, f))
const step = (label) => console.log(`\n▸ ${label}`)

function curl(url, file) {
  run('curl', ['-sS', '-L', '--fail', '-m', '300', '-o', join(DIR, file), url])
}
function pdfToText(pdf, txt) {
  run('pdftotext', ['-layout', join(DIR, pdf), join(DIR, txt)])
}

// 1. Codes consolidés (miroir de la base LEGI de la DILA, mis à jour chaque jour).
step('Codes (commerce, CGI, travail, civil, consommation)')
if (!have('codes')) {
  rmSync(join(DIR, 'codes'), { recursive: true, force: true })
  run('git', ['clone', '-q', '--depth', '1', '--filter=blob:none', '--no-checkout', 'https://github.com/LeMyst/Codes', join(DIR, 'codes')])
  run('git', ['-C', join(DIR, 'codes'), 'sparse-checkout', 'set', '--no-cone',
    '/Code de commerce/', '/Code général des impôts/', '/Code du travail/', '/Code civil/', '/Code de la consommation/'])
  run('git', ['-C', join(DIR, 'codes'), 'checkout', '-q'])
}
console.log('  ', run('git', ['-C', join(DIR, 'codes'), 'log', '-1', '--format=%ci']).toString().trim())

step('Code de la sécurité sociale (@socialgouv/legi-data)')
if (!have('legi-data')) {
  rmSync(join(DIR, 'legi-data'), { recursive: true, force: true })
  mkdirSync(join(DIR, 'legi-data'))
  const tgz = run('npm', ['pack', '@socialgouv/legi-data', '--silent', '--pack-destination', join(DIR, 'legi-data')]).toString().trim()
  run('tar', ['xzf', join(DIR, 'legi-data', tgz), '-C', join(DIR, 'legi-data'), 'package/data/LEGITEXT000006073189.json'])
  rmSync(join(DIR, 'legi-data', tgz))
}

// 2. Normes comptables françaises (ANC, versions consolidées au 1er janvier 2026).
step('PCG et règlement ANC 2020-01')
const ANC = 'https://www.anc.gouv.fr/files/anc/files/1_Normes_fran%C3%A7aises/'
if (!have('pcg.txt')) {
  curl(`${ANC}Plans%20comptables/2026/PCG--1er-janvier-2026.pdf`, 'pcg.pdf')
  pdfToText('pcg.pdf', 'pcg.txt')
}
if (!have('anc-2020-01.txt')) {
  curl(`${ANC}recueil/REGLT-2020_01-VERSION-RECUEIL2026.pdf`, 'anc-2020-01.pdf')
  pdfToText('anc-2020-01.pdf', 'anc-2020-01.txt')
}

// 3. Référentiel normatif de la H2A (liste des NEP homologuées).
step('NEP (H2A)')
if (!have('h2a.html')) curl('https://h2a-france.org/referentiel-normatif-et-code-de-deontologie/acceder-au-referentiel-normatif/', 'h2a.html')

// 4. BOFiP en vigueur (open data, séries utiles à l'UE 1).
step('BOFiP (IS-FUS, IS-GPE, RPPM-PVBMI)')
const BOFIP = 'https://data.economie.gouv.fr/api/explore/v2.1/catalog/datasets/bofip-vigueur/exports/json?where='
for (const s of ['IS-FUS', 'IS-GPE', 'RPPM-PVBMI']) {
  if (!have(`bofip-${s}.json`)) curl(`${BOFIP}${encodeURIComponent(`identifiant_juridique like "BOI-${s}%"`)}`, `bofip-${s}.json`)
}

// 5. EUR-Lex (IFRS consolidées, règlement 2026/338, RGPD) : protégé par un défi JavaScript, lu avec Chromium.
step('EUR-Lex (IFRS consolidées, 2026/338, RGPD)')
if (!have('ifrs.txt') || !have('rgpd.txt')) {
  const { chromium } = await import('@playwright/test')
  const browser = await chromium.launch({ channel: 'chromium', ...(process.env.HTTPS_PROXY ? { proxy: { server: process.env.HTTPS_PROXY } } : {}) })
  const page = await (await browser.newContext({ locale: 'fr-FR' })).newPage()
  const text = async (url) => {
    await page.goto(url, { timeout: 120_000, waitUntil: 'domcontentloaded' })
    await page.waitForTimeout(8000)
    return page.evaluate(() => document.body.innerText)
  }
  await page.goto('https://eur-lex.europa.eu/legal-content/FR/ALL/?uri=CELEX:32023R1803', { timeout: 120_000 })
  await page.waitForTimeout(8000)
  const hrefs = await page.evaluate(() => [...document.querySelectorAll('a')].map((a) => a.href))
  const latest = [...new Set(hrefs.flatMap((h) => h.match(/0202\dR1803-\d{8}/) ?? []))].sort().at(-1)
  if (!latest) throw new Error('Aucune version consolidée du règlement 2023/1803 trouvée')
  console.log('   IFRS consolidées :', latest)
  writeFileSync(join(DIR, 'ifrs.txt'), `CELEX ${latest}\n${await text(`https://eur-lex.europa.eu/legal-content/FR/TXT/HTML/?uri=CELEX:${latest}`)}`)
  writeFileSync(join(DIR, 'reg-2026-338.txt'), await text('https://eur-lex.europa.eu/legal-content/FR/TXT/HTML/?uri=CELEX:32026R0338'))
  writeFileSync(join(DIR, 'rgpd.txt'), await text('https://eur-lex.europa.eu/legal-content/FR/TXT/HTML/?uri=CELEX:32016R0679'))
  await browser.close()
}

console.log('\n✔ Sources dans .sources/ :', readdirSync(DIR).join(', '))
