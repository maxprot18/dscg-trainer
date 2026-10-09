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

test('oral d’UE 6 : tirage, préparation, entretien, auto-évaluation enregistrée', async ({ page, errors }) => {
  await page.goto('oral')
  await expect(page.getByText(/\d+ sujets disponibles/)).toBeVisible()
  await page.getByRole('button', { name: /Tirer un sujet au hasard/ }).click()
  await expect(page.getByText('Préparation', { exact: false }).first()).toBeVisible()
  await page.getByLabel(/Mes notes/).fill('Intro, two parts, conclusion')
  await page.getByRole('button', { name: /Commencer l’exposé/ }).click()
  await expect(page.getByText('Intro, two parts, conclusion')).toBeVisible()
  await page.getByRole('button', { name: /Passer à l’entretien/ }).click()
  const next = page.getByRole('button', { name: /Question suivante/ })
  while (await next.isVisible()) await next.click()
  await page.getByRole('button', { name: /Terminer et m’évaluer/ }).click()
  await expect(page.getByRole('heading', { name: 'Bilan de l’oral' })).toBeVisible()
  for (const group of await page.locator('fieldset').all()) await group.getByText('4', { exact: true }).click()
  await expect(page.getByText('Note : 20 / 20')).toBeVisible()
  await page.getByRole('button', { name: 'Enregistrer ma note' }).click()
  await page.getByRole('button', { name: 'Nouveau sujet' }).click()
  await expect(page.getByText('Mes oraux blancs')).toBeVisible()
  void errors
})

test('sujet type d’examen : listé dans S’entraîner, annexes dépliables', async ({ page, errors }) => {
  await page.goto('entrainement')
  await expect(page.getByText('Sujets type d’examen')).toBeVisible()
  await page.getByRole('link', { name: /Projet ERP/ }).click()
  await expect(page).toHaveURL(/exercice\/ue5-dossier-0001/)
  await expect(page.getByText('Sujet type d’examen')).toBeVisible()
  const annex = page.getByText(/^Annexe 1 — /)
  await annex.click()
  await expect(annex.locator('xpath=ancestor::details[1]')).toHaveAttribute('open', '')
  const width = await page.evaluate(() => document.documentElement.scrollWidth)
  expect(width).toBeLessThanOrEqual(page.viewportSize()!.width)
  void errors
})

test('sujet complet : dossiers enchaînés, chronométrés à la durée de l’épreuve', async ({ page, errors }) => {
  await page.goto('entrainement')
  await page.getByLabel('UE du sujet').selectOption('UE2')
  await page.getByRole('button', { name: /Commencer le sujet/ }).click()
  await expect(page).toHaveURL(/mode=full/)
  await expect(page.getByLabel('Temps restant')).toHaveText(/^2:5\d:\d\d$|^3:00:00$/)
  await expect(page.getByText('Sujet type d’examen').first()).toBeVisible()
  // Mode épreuve : palette des exercices, questions du dossier affichées d'emblée, annexes en panneau sur mobile.
  const palette = page.getByRole('navigation', { name: 'Exercices de l’épreuve' })
  await expect(palette.getByRole('button').first()).toBeVisible()
  await expect(page.getByText(/^Question 2\/\d+/)).toBeVisible()
  await page.getByRole('button', { name: /Annexes/ }).click()
  await expect(page.getByRole('dialog', { name: 'Annexes du sujet' })).toBeVisible()
  await page.getByRole('button', { name: 'Fermer' }).click()
  await expect(page.getByRole('dialog')).toHaveCount(0)
  void errors
})
