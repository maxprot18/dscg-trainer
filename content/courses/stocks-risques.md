# Stocks — risques

**Références :** NEP 315 (connaissance de l'entité et évaluation du risque d'anomalies significatives) ; NEP 240 (fraude) ; NEP 540 (estimations comptables) ; PCG, règles relatives au coût d'entrée des stocks (règl. ANC 2014-03)

**Enjeu :** le stock est le levier le plus simple pour manipuler un résultat sans toucher aux tiers ; l'examen attend que l'on relie des indicateurs de planification (durée de stockage, marge) à un risque sur l'évaluation ou l'existence et que l'on chiffre l'effet d'une erreur sur deux exercices.

Le stock final agit directement sur le résultat : toute surévaluation du stock final diminue le coût des ventes et augmente le résultat du même montant. C'est donc un poste sensible aux erreurs comme aux manipulations, d'autant qu'il repose sur des comptages internes et des estimations.

- **Existence** : vols, pertes, stocks fictifs, erreurs de comptage, stocks détenus par des tiers difficiles à contrôler, inventaire réalisé par les magasiniers eux-mêmes.
- **Évaluation** : obsolescence technique ou commerciale (nouvelle gamme qui remplace les références détenues), rotation lente, baisse des prix de vente, coût de production complexe (imputation des frais indirects, sous-activité incorporée à tort au lieu de rester en charges), changement de méthode (CMP / PEPS) non justifié.
- **Séparation des exercices** : entrées ou sorties de fin d'année décalées par rapport aux achats ou aux ventes correspondants.
- **Fraude (NEP 240)** : la présomption de risque de fraude porte sur la comptabilisation des produits ; pour les stocks, le risque de fraude est apprécié au cas par cas (objectif de résultat, rémunération indexée, covenants), mais le risque de contournement des contrôles par la direction s'applique aux estimations de dépréciation.
- **Facteurs de risque** : stock significatif au bilan, nombreuses références, sites multiples, changement de système d'information, production en baisse, intervention d'experts pour évaluer certains biens.

**Procédures analytiques de planification :** durée de stockage, taux de marge brute, part des références sans mouvement, comparées à N−1 et au secteur. Une marge qui progresse sans raison alors que la rotation ralentit oriente vers une surévaluation du stock final ; des dépréciations excessives produiraient l'effet inverse sur la marge.

**Formules clés :** durée de stockage (jours) = stock moyen / coût d'achat des marchandises vendues (ou coût de production des produits vendus) × 360 ; stock moyen = (stock initial + stock final) / 2

```diagram
{"type":"bars","title":"Stock final N surévalué de 30 k€ : effet sur deux exercices","unit":"k€","items":[{"label":"Résultat N","value":30},{"label":"Résultat N+1","value":-30},{"label":"Capitaux propres fin N+1","value":0}]}
```

## Exemple
Négociant : stock initial 420 k€, stock final 480 k€, coût d'achat des marchandises vendues 2 700 k€ ; en N−1, stock moyen 400 k€ pour un coût des ventes de 3 000 k€. Durée de stockage N = (420 + 480) / 2 / 2 700 × 360 = **60 jours**, contre 400 / 3 000 × 360 = 48 jours en N−1, tandis que la marge brute passe de 28 % à 32 % à prix stables.
Lecture : l'activité recule et le stock gonfle ; le risque prioritaire porte sur l'évaluation (références à rotation lente non dépréciées) et l'existence du stock final. Si le stock final était surévalué de 30 k€, le résultat N serait surévalué de 30 k€ et celui de N+1 sous-évalué d'autant, le stock initial N+1 reprenant l'erreur.

## Erreurs fréquentes
- Lire des contrôles internes (inventaire par des équipes indépendantes, accès restreint, bons de réception prénumérotés) comme des facteurs de risque : ils le réduisent, et visent l'existence ou la séparation, pas l'évaluation.
- Interpréter une marge en hausse avec une rotation qui ralentit comme des dépréciations excessives : celles-ci feraient baisser la marge ; le couple observé signale une surévaluation du stock final.
- Appliquer aux stocks la présomption de fraude de la NEP 240 : elle ne vise que les produits ; sur les stocks, le risque est apprécié d'après les facteurs relevés.
- Croire qu'une erreur de stock ne touche que le bilan : elle fausse le résultat de N puis, en sens inverse, celui de N+1.

## À retenir
- Une erreur sur le stock final N se retourne en N+1 (stock initial) : résultat N et N+1 affectés en sens inverse.
- La dépréciation des stocks est une estimation de la direction : risque de biais à apprécier (NEP 540).
- Un allongement de la durée de stockage est un signal d'alerte sur l'évaluation.

**Notions liées :** [Stocks — assertions](/cours/stocks-assertions) · [Stocks — contrôles clés](/cours/stocks-controles-cles) · [Stocks — pièges](/cours/stocks-pieges) · [Estimations comptables et parties liées](/cours/estimations-parties-liees)
