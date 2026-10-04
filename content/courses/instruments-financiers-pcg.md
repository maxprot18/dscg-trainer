# Titres et instruments financiers dans les comptes individuels

**Références :** PCG art. 221-1 s. (titres, coût d'entrée et évaluation) et 213-8 (option sur les frais d'acquisition) (règl. ANC 2014-03 modifié) ; comptes 261, 271, 273, 50, 296, 590, 6866, 7866, 6671, 7671, 6673, 7673 (plan de comptes issu du règl. ANC 2022-06) ; CGI art. 209 VII (frais d'acquisition des titres de participation)

**Enjeu :** le classement d'un titre commande son évaluation à la clôture et le traitement de sa cession ; à l'examen, on attend le bon compte, la bonne valeur d'inventaire et le respect de la règle « ligne par ligne, sans compensation ».

**Classement** selon l'intention de détention à l'acquisition :
- **Titres de participation (261)** : possession durable estimée utile à l'activité, notamment parce qu'elle permet d'exercer une influence sur la société émettrice ou d'en assurer le contrôle ; présumés au-delà de 10 % du capital, mais la présomption cède devant l'intention réelle.
- **TIAP (273)** : portefeuille destiné à dégager une rentabilité satisfaisante à plus ou moins long terme sans intervention dans la gestion (activité de capital-investissement).
- **Autres titres immobilisés (271)** : détention durable sans les caractéristiques précédentes (par exemple titres que l'entité n'a pas la possibilité de revendre à court terme).
- **Valeurs mobilières de placement (503 actions, 506 obligations)** : acquises pour réaliser un gain à brève échéance ou placer un excédent de trésorerie.

```diagram
{"type":"tree","title":"Classer un titre acquis selon l'intention de détention","root":{"label":"Détention durable ?","children":[{"edge":"non","label":"VMP (503, 506)","note":"gain à brève échéance, placement de trésorerie"},{"edge":"oui","label":"Utile à l'activité (influence, contrôle) ?","children":[{"edge":"oui","label":"Titres de participation (261)","note":"présomption au-delà de 10 % du capital"},{"edge":"non","label":"Rentabilité de portefeuille sans gestion ?","children":[{"edge":"oui","label":"TIAP (273)"},{"edge":"non","label":"Autres titres immobilisés (271)"}]}]}]}}
```

**Coût d'entrée** : prix d'achat + frais d'acquisition (honoraires, commissions, droits de mutation). Sur option, ces frais peuvent être passés en charges (627) ; le choix est distinct de celui retenu pour les immobilisations et s'applique de façon permanente. Fiscalement, les frais d'acquisition des titres de participation sont obligatoirement incorporés au coût et déduits sur 5 ans : s'ils sont incorporés en comptabilité, la déduction passe par un amortissement dérogatoire (6872 / 145) ; s'ils sont en charges, elle se fait par réintégration puis déductions extra-comptables.

**Évaluation à la clôture** : comparaison **ligne à ligne** du coût d'entrée et de la valeur d'inventaire :
- titres de participation : **valeur d'utilité**, ce que l'entité accepterait de décaisser pour les obtenir si elle devait les acquérir (rentabilité, perspectives, quote-part de capitaux propres, cours de bourse parmi d'autres indices) ;
- titres cotés de placement et autres titres : **cours moyen du dernier mois** de l'exercice ; titres non cotés : valeur probable de négociation.
Moins-value latente → dépréciation (6866 / 296x ou 590) ; plus-value latente → rien ; aucune compensation entre lignes de titres différents, sauf cas limité d'une baisse anormale et momentanée des titres cotés (hors participations) que l'entité n'envisage pas de céder.

**Cession** : les titres sortent au coût moyen pondéré ou selon l'ordre d'entrée (PEPS) pour des titres de même nature, méthode appliquée de façon permanente ; le résultat de cession des VMP se constate en net (6673 ou 7673), celui des TIAP en net (6672 / 7672) et celui des autres titres immobilisés en brut (6671 valeur comptable cédée / 7671 produit de cession) ; depuis le règl. ANC 2022-06 (exercices ouverts à compter de 2025), ces cessions relèvent du résultat financier et non plus de l'exceptionnel (anciens 675 / 775 et 667 / 767). La dépréciation attachée aux titres cédés est reprise. Dividendes : produits financiers dès que la distribution est décidée par l'assemblée (761 pour les participations, 764 pour les VMP).

## Exemple
Le 05/12/N, la société Lyra achète 1 000 actions cotées Alpha à 50 € pour placer un excédent de trésorerie, plus 500 € de commissions (option « charges » : 627). Au 31/12/N, cours moyen de décembre 46 €, cours du 31/12 47 € ; une autre ligne (Beta, coût 20 000 €) vaut 23 000 €.
Clôture N : dépréciation Alpha = 1 000 × (50 − 46) = **4 000 €** (6866 / 590) ; rien sur Beta, et aucune compensation : la plus-value latente de 3 000 € ne réduit pas la dotation.
Le 10/03/N+1, Lyra cède 600 actions Alpha à 55 € : prix 33 000 €, coût 600 × 50 = 30 000 €, plus-value de cession **3 000 €** (débit 512 33 000 ; crédit 503 30 000 et 7673 3 000). La dépréciation attachée aux titres cédés, 600 × 4 = 2 400 €, est reprise (590 / 7866).

## Erreurs fréquentes
- Compenser la plus-value latente d'une ligne avec la moins-value latente d'une autre : l'évaluation est ligne par ligne et seule la moins-value est constatée.
- Retenir le cours du 31/12 pour les titres cotés de placement : c'est le cours moyen du dernier mois de l'exercice qui sert de valeur d'inventaire.
- Classer en 271 une participation de 35 % acquise pour influer sur la gestion d'un sous-traitant : l'utilité pour l'activité en fait des titres de participation (261).
- Déduire que des titres détenus en deçà de 10 % ne peuvent pas être des titres de participation : le seuil n'est qu'une présomption, l'intention et l'utilité priment.

## À retenir
- Un même titre peut changer de catégorie si l'intention de détention change (reclassement à la valeur nette comptable).
- Pas de compensation : une plus-value latente sur une ligne ne couvre pas une moins-value sur une autre.
- La dépréciation des titres de participation se fonde sur la valeur d'utilité, pas seulement sur le cours de bourse.

**Notions liées :** [IFRS 9 — Instruments financiers](/cours/ifrs-9-instruments-financiers) · [Régime mère-fille](/cours/regime-mere-filiale) · [Placements à court terme](/cours/placements-court-terme) · [Audit du cycle trésorerie : assertions](/cours/tresorerie-assertions)
