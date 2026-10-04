import { expect, test } from './fixtures'

test('accueil puis écran S’entraîner', async ({ page, errors }) => {
  await page.goto('./')
  await expect(page.getByRole('heading', { name: 'DSCG Trainer' })).toBeVisible()
  await page.getByRole('link', { name: 'S\'entraîner' }).first().click()
  await expect(page).toHaveURL(/entrainement/)
  await expect(page.getByText(/Session rapide/).first()).toBeVisible()
  void errors
})

test('répondre à un QCM : correction, puis tentative comptée dans la progression', async ({ page, errors }) => {
  await page.goto('exercice/ue4-ifrs-ias16-0001')
  await page.getByText('Deux plans distincts : les moteurs sur 8 ans, la cellule sur 20 ans').click()
  await page.getByRole('button', { name: 'Valider' }).click()
  await expect(page.getByLabel('bonne réponse')).toBeVisible()
  await page.getByRole('link', { name: 'Progression' }).click()
  await expect(page.getByRole('heading', { name: 'Progression' })).toBeVisible()
  await expect(page.getByText('exercices faits', { exact: true }).locator('..')).toContainText('1')
  void errors
})

test('fiche de cours : sections habillées, diagramme lisible, lien vers les exercices', async ({ page, errors }) => {
  await page.goto('cours/ias-16-immobilisations')
  await expect(page.getByRole('heading', { level: 1, name: /IAS 16/ })).toBeVisible()
  await expect(page.getByRole('region', { name: 'Exemple' })).toBeVisible()
  await expect(page.getByRole('region', { name: 'Erreurs fréquentes' })).toBeVisible()
  await expect(page.getByText('725 k€').first()).toBeVisible()
  await expect(page.getByRole('button', { name: /S’entraîner sur cette notion/ })).toBeEnabled()
  // Aucun débordement horizontal sur mobile.
  const width = await page.evaluate(() => document.documentElement.scrollWidth)
  expect(width).toBeLessThanOrEqual(page.viewportSize()!.width)
  void errors
})

test('organigramme : schéma de hauteur raisonnable avec ses pourcentages', async ({ page, errors }) => {
  await page.goto('cours/pourcentages-controle-interet')
  const chart = page.getByRole('img', { name: /Groupe Alpha/ })
  await expect(chart).toBeVisible()
  const box = await chart.boundingBox()
  expect(box!.height).toBeLessThan(600)
  void errors
})

test('réglages : export de la progression en fichier JSON', async ({ page, errors }) => {
  await page.goto('reglages')
  const download = page.waitForEvent('download')
  await page.getByRole('button', { name: /Exporter ma progression/ }).click()
  expect((await download).suggestedFilename()).toMatch(/^dscg-progression-\d{4}-\d{2}-\d{2}\.json$/)
  await expect(page.getByText(/Dernière sauvegarde depuis cet appareil/)).toBeVisible()
  void errors
})

test('lien profond : page d’UE et recherche', async ({ page, errors }) => {
  await page.goto('cours/ue/UE4')
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  await page.goto('recherche')
  await page.getByRole('searchbox').fill('carry-back')
  await expect(page.getByText(/carry-back/i).first()).toBeVisible()
  void errors
})
