# Impôts et taxes — procédures substantives

**Références :** NEP 500 ; NEP 520 (procédures analytiques) ; NEP 580 (déclarations de la direction) ; CGI art. 39, 1 et 39, 2 (charges déductibles, sanctions exclues) ; CGI art. 219, I (taux d'IS) ; PCG comptes 444, 445, 447, 4486, 155, 63, 695

**Enjeu :** la preuve d'impôt est l'exercice type du cycle : reconstituer l'IS attendu à partir du résultat comptable, expliquer l'écart avec la charge comptabilisée et proposer l'écriture d'ajustement ; l'examen y ajoute souvent une taxe non liquidée ou un crédit de TVA à justifier.

- **Preuve d'impôt** : recalculer l'IS à partir du résultat comptable avant impôt, des réintégrations et des déductions (tableau de passage), appliquer les taux, comparer à la charge 695 ; expliquer l'écart par les différences permanentes (charges non déductibles, produits non imposables, crédits d'impôt). C'est une procédure analytique substantive qui vise l'exactitude de la charge, pas un test de procédures ni une confirmation externe.
- **Compte 444** : débit = acomptes versés ; crédit = IS dû de l'exercice (695 / 444). Le solde final est une dette (créditeur) ou une créance (débiteur), rapprochée de la liquidation (relevé de solde) et du paiement de N+1.
- **TVA** : rapprocher les soldes des comptes 4455 / 44567 de la dernière déclaration ; recalculer une TVA collectée théorique ; examiner la TVA déductible sur un échantillon de factures (mentions obligatoires, droit à déduction, exclusions).
- **Autres impôts et taxes** : rapprocher les charges du compte 63 des avis d'imposition et des déclarations ; vérifier les charges à payer (4486) pour les taxes de l'exercice non encore liquidées (taxes assises sur les salaires de N déclarées en N+1).
- **Risque fiscal** : lire la correspondance avec l'administration (avis de vérification, propositions de rectification), interroger le conseil fiscal, apprécier la provision pour impôts (155) et l'information en annexe ; obtenir une déclaration écrite de la direction (NEP 580), qui complète mais ne remplace pas les éléments probants.
- **Crédits d'impôt** : examen du dossier justificatif (dépenses éligibles, agréments) et recalcul.

```diagram
{"type":"tree","title":"Preuve d'impôt : cette charge comptable est-elle déductible ?","root":{"label":"Charge comptabilisée en N","children":[{"edge":"hors intérêt de l'exploitation","label":"Réintégrer","note":"Acte anormal de gestion"},{"edge":"exclue par un texte","label":"Réintégrer","note":"Amendes et pénalités (39, 2), IS, dépenses somptuaires"},{"edge":"non justifiée ou non admise","label":"Réintégrer","note":"Provision non déductible : différence temporaire si déductible plus tard"},{"edge":"justifiée et rattachée à N","label":"Déductible","note":"Aucun retraitement"}]}}
```

**Formules clés :** IS = résultat fiscal × taux (taux réduit de 15 % sur la première tranche de 42 500 € si conditions PME remplies) ; résultat fiscal = résultat comptable avant IS + réintégrations − déductions ; IS théorique = résultat comptable avant IS × taux ; écart de preuve = IS comptabilisé − IS théorique

## Exemple
Société Mizar, taux unique 25 % : résultat comptable avant IS 800 000 € ; charge d'IS comptabilisée (695) 212 500 €. Les réintégrations de la liasse comprennent 10 000 € d'amendes et 40 000 € de dotation à une provision non déductible ; aucune déduction.
IS théorique = 800 000 × 25 % = 200 000 € ; écart = 12 500 €. Explication : (10 000 + 40 000) × 25 % = **12 500 €**, l'écart est entièrement justifié par les différences entre résultat comptable et fiscal ; résultat fiscal = 850 000 €, IS = 212 500 €. Si la charge comptabilisée avait été de 200 000 €, l'IS serait sous-évalué de 12 500 € (ajustement : débit 695, crédit 444).

## Erreurs fréquentes
- Partir du résultat net pour la preuve d'impôt sans réintégrer la charge d'IS passée en 695 : on raisonne sur le résultat avant impôt.
- Qualifier la preuve d'impôt de test de procédures ou de confirmation externe : c'est une procédure analytique substantive, dotée d'une valeur probante.
- Créditer le 444 pour une taxe assise sur les salaires non liquidée : ce compte est réservé à l'IS ; la taxe de l'exercice va en charge à payer (4486).
- Appliquer le taux normal à tout le bénéfice d'une PME éligible : la première tranche de 42 500 € est taxée à 15 %.

## À retenir
- L'IS n'est pas déductible : on part du résultat comptable avant IS ; si l'on part du résultat net, la charge d'IS passée en 695 est réintégrée.
- Ajustement type : IS omis = débit 695, crédit 444 ; taxe de l'exercice non liquidée = débit 63x, crédit 4486.
- Les dividendes relevant du régime mère-fille sont déduits, sous réserve de la réintégration d'une quote-part de frais et charges de 5 %.

**Notions liées :** [IS — résultat fiscal](/cours/is-resultat-fiscal) · [IS — taux et déficits](/cours/is-taux-deficits) · [Régime mère-filiale](/cours/regime-mere-filiale) · [Impôts et taxes — assertions](/cours/impots-taxes-assertions)
