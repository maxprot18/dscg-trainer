# IS : taux, acomptes et régime des déficits

**Références :** CGI art. 219, I ; art. 235 ter ZC ; art. 1668 ; art. 209, I ; art. 220 quinquies ; PCG compte 699

**Enjeu :** une fois le résultat fiscal connu, il faut liquider l'impôt (taux, acomptes, solde) et savoir ce que devient un déficit ; le calcul du plafond d'imputation et de la créance de carry-back est un classique de l'examen.

**Taux** : taux normal de 25 %. Taux réduit de 15 % sur les 42 500 premiers euros de bénéfice (montant pour 12 mois, ajusté prorata temporis) pour les PME : CA HT ≤ 10 M€, capital entièrement libéré et détenu de manière continue à 75 % au moins par des personnes physiques (ou par des sociétés remplissant elles-mêmes ces conditions). Contribution sociale de 3,3 % (art. 235 ter ZC) sur la fraction de l'IS qui excède 763 000 €, due par les entreprises dont le CA atteint 7,63 M€. Les très grandes entreprises supportent en outre une contribution exceptionnelle temporaire sur l'IS, créée par la LF 2025 et prorogée d'un exercice par la LF 2026 (art. 12) : due pour les deux premiers exercices clos à compter du 31 décembre 2025, seuil de CA de 1 Md€ pour le premier et de 1,5 Md€ pour le second, taux de 20,6 % ou 41,2 % de l'IS selon le CA ; elle reste hors du périmètre des calculs de l'examen.

**Paiement** (art. 1668) : quatre acomptes de 25 % chacun de l'IS de référence (impôt du dernier exercice clos, au taux normal et au taux réduit), payables le 15 mars, le 15 juin, le 15 septembre et le 15 décembre pour un exercice calé sur l'année civile. Dispense si l'IS de référence est inférieur à 3 000 € et pour le premier exercice d'une société nouvelle. Le solde est liquidé au plus tard le 15 du 4e mois suivant la clôture (15 mai pour une clôture au 31 décembre) ; un excédent d'acomptes est restitué dans les 30 jours du dépôt du relevé de solde.

```diagram
{"type":"timeline","title":"Calendrier de l'IS pour un exercice clos le 31 décembre N","items":[{"when":"15 mars N","label":"1er acompte","note":"25 % de l'IS de référence (exercice N−1, ou N−2 à titre provisoire)"},{"when":"15 juin N","label":"2e acompte","note":"25 %, avec régularisation du 1er acompte sur l'IS de N−1"},{"when":"15 sept. N","label":"3e acompte","note":"25 %"},{"when":"15 déc. N","label":"4e acompte","note":"25 %"},{"when":"15 mai N+1","label":"Solde de l'IS de N","note":"IS dû − acomptes versés ; excédent restitué"}]}
```

**Report en avant** (art. 209, I) : sans limite de durée, mais l'imputation sur le bénéfice d'un exercice est plafonnée à 1 M€ majoré de 50 % du bénéfice excédant 1 M€. Le reliquat reste reportable sur les exercices suivants, avec le même plafond chaque année.

**Report en arrière (carry-back)** (art. 220 quinquies) : sur option exercée dans le délai de dépôt de la déclaration de résultats, le déficit est imputé sur le bénéfice de l'exercice précédent, dans la limite du plus faible de ce bénéfice (hors fraction distribuée, hors bénéfice exonéré et hors fraction dont l'IS a été payé par crédits d'impôt ; les plus-values à long terme imposées à taux réduit n'en font pas partie) et de 1 M€. Il naît une **créance** égale à l'excédent d'IS ainsi dégagé sur l'exercice précédent : déficit reporté × taux auquel ce bénéfice a été imposé (25 % au taux normal, 15 % pour la fraction imposée au taux réduit), utilisable pour payer l'IS des cinq exercices suivants et remboursable à l'issue de ce délai (ou immédiatement en cas de procédure collective). Comptabilisation : débit 444 (créance sur l'État) / crédit 699 « Produits – Reports en arrière des déficits ». Ce produit n'est pas imposable : il est déduit extra-comptablement.

**Formules clés :** déficit imputable = min(déficit reportable ; 1 M€ + 50 % × (bénéfice − 1 M€)) ; créance de carry-back = min(déficit ; bénéfice précédent non distribué ; 1 M€) × 25 %

## Exemple
La SA Rozel a un stock de déficits reportables de 3 000 000 € au 1er janvier N et réalise en N un bénéfice fiscal de 2 200 000 €. Plafond d'imputation = 1 000 000 + 50 % × (2 200 000 − 1 000 000) = 1 600 000 €. Bénéfice imposable = 2 200 000 − 1 600 000 = 600 000 € ; IS = 600 000 × 25 % = 150 000 € ; reliquat reportable = 3 000 000 − 1 600 000 = 1 400 000 €.
Variante carry-back : la SA Ty Mad dégage en N un déficit de 1 400 000 € après un bénéfice N−1 de 1 500 000 € imposé au taux normal et mis en réserve. Elle opte pour le report en arrière : déficit imputé = min(1 400 000 ; 1 500 000 ; 1 000 000) = 1 000 000 € ; créance = 1 000 000 × 25 % = **250 000 €** (débit 444 / crédit 699) ; les 400 000 € restants sont reportables en avant.

## Erreurs fréquentes
- Imputer la totalité des déficits à hauteur du bénéfice : le plafond de 1 M€ + 50 % de l'excédent s'applique dès que le bénéfice dépasse 1 M€.
- Appliquer 50 % à la totalité du bénéfice (au lieu de la seule fraction au-delà de 1 M€), ou oublier la majoration de 50 %.
- Confondre la date du solde (15 mai pour une clôture au 31 décembre) avec celle du premier acompte (15 mars) ou avec le 15 avril, qui ne tient pas compte du report au 15 mai.
- Imputer le carry-back sur plusieurs exercices antérieurs ou sur un bénéfice distribué : un seul exercice, le précédent, pour sa fraction non distribuée, et 1 M€ au plus.

## À retenir
- Le plafond du report en avant s'applique au bénéfice de l'exercice d'imputation, pas au stock de déficits.
- Carry-back limité à 1 M€ et au seul exercice précédent ; la fraction non reportée en arrière reste reportable en avant.
- La créance de carry-back est un produit non imposable : elle est déduite extra-comptablement.
- Taux réduit de 15 % : trois conditions cumulatives (CA, libération du capital, détention à 75 % par des personnes physiques).

**Notions liées :** [IS : résultat fiscal](/cours/is-resultat-fiscal) · [Intégration fiscale : résultat d'ensemble](/cours/integration-fiscale-resultat-ensemble) · [Impôts différés en consolidation](/cours/impots-differes-consolidation)
