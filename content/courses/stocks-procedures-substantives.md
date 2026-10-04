# Stocks — procédures substantives

**Références :** NEP 501 (applications spécifiques : inventaire physique, stocks détenus par des tiers) ; NEP 505 (confirmations externes) ; NEP 520 (procédures analytiques) ; NEP 530 (sondages) ; NEP 450 (évaluation des anomalies) ; PCG comptes 31 à 37, 39, 6031, 6037, 713, 6817, 7817

**Enjeu :** le stock de clôture pèse directement sur le résultat ; l'assistance à l'inventaire est la seule procédure qui donne au CAC un élément probant direct sur l'existence et l'état des stocks, et l'extrapolation des écarts relevés décide si l'anomalie est significative. L'examen attend la démarche NEP 501 (avant, pendant, après l'inventaire) et le calcul de l'anomalie projetée.

- **Assistance à l'inventaire physique (NEP 501)** : obligatoire lorsque les stocks sont significatifs, sauf impossibilité. Le CAC apprécie les instructions et leur application, observe les comptages, réalise des comptages par sondage dans les deux sens (du listing vers le rayon : existence ; du rayon vers le listing : exhaustivité), relève les derniers documents d'entrée et de sortie pour le test de séparation, repère les articles abîmés ou obsolètes.
- **Impossibilité d'assister** (nomination tardive, site inaccessible) : procédures alternatives, par exemple comptages à une autre date et contrôle des mouvements intermédiaires ; à défaut d'éléments suffisants, incidence sur l'opinion (réserve ou impossibilité de certifier selon le caractère généralisé).
- **Inventaire avant la clôture** : possible si le contrôle interne des mouvements est fiable ; le CAC teste les entrées et sorties entre la date d'inventaire et la clôture (stock clôture = stock inventorié + entrées − sorties).
- **Stocks détenus par des tiers** : confirmation directe auprès du dépositaire et, si le montant est significatif ou la fiabilité du tiers douteuse, inspection ou assistance à l'inventaire chez le tiers ; une déclaration de la direction ne suffit pas.
- **Suivi de l'inventaire** : rapprocher les feuilles de comptage du listing final valorisé, vérifier la prise en compte des écarts de comptage et l'absence d'ajouts après l'inventaire.
- **Évaluation** : recalcul du CMP ou du PEPS sur factures, revue des fiches de coût de production (frais fixes imputés sur la capacité normale), comparaison du coût avec les prix de vente postérieurs à la clôture, analyse de l'état de rotation et des dépréciations (397, 391, 395).
- **Procédures analytiques (NEP 520)** : durée de stockage, marge brute par famille, comparaison avec N−1 ; un allongement de la rotation oriente vers la dépréciation.

```diagram
{"type":"timeline","title":"Assistance à l'inventaire physique (NEP 501)","items":[{"when":"J−15","label":"Instructions","note":"Lire et apprécier les instructions, planifier les sites"},{"when":"Jour J","label":"Comptages","note":"Observer, compter par sondage dans les deux sens, relever les derniers bons"},{"when":"J+5","label":"Suivi","note":"Feuilles de comptage → listing valorisé, écarts régularisés"},{"when":"31/12","label":"Clôture","note":"Mouvements entre inventaire et clôture si J ≠ 31/12"},{"when":"N+1","label":"Évaluation","note":"Prix de vente postérieurs, rotation, dépréciations"}]}
```

**Formules clés :** anomalie projetée = anomalie de l'échantillon × valeur de la population sondée / valeur de l'échantillon ; anomalie totale estimée = anomalies des éléments testés à 100 % + anomalie projetée

## Exemple
Stock de marchandises d'Altaïr au 31/12/N : 3 700 000 € ; seuil de signification 150 000 €, seuil de remontée des anomalies 7 500 €. L'auditeur a vérifié à 100 % les 15 références les plus importantes (700 000 €) et relevé une surévaluation de 6 000 €. Sur le reste (3 000 000 €), il a sondé 250 000 € de références et constaté une surévaluation nette de 4 000 €.
Anomalie projetée = 4 000 × 3 000 000 / 250 000 = **48 000 €** ; anomalie totale estimée = 6 000 + 48 000 = **54 000 €**. Inférieure au seuil de signification mais supérieure au seuil de remontée, elle est portée au récapitulatif des anomalies (NEP 450) et cumulée avec celles des autres cycles ; la direction est invitée à corriger les 6 000 € identifiés.

## Erreurs fréquentes
- Extrapoler le taux d'erreur de l'échantillon à la totalité du stock, éléments clés compris : les références testées à 100 % s'ajoutent telles quelles, sinon elles sont comptées deux fois.
- Se contenter d'une déclaration écrite de la direction pour des stocks chez un tiers ou en cas d'inventaire non observé : c'est un élément interne ; la NEP 501 exige confirmation du tiers, inspection ou procédures alternatives.
- Croire qu'un CAC nommé après l'inventaire doit refuser de certifier : il tente d'abord des procédures alternatives ; seule leur insuffisance pèse sur l'opinion.
- Recalculer le CMP pour prouver l'existence : le recalcul vise l'évaluation ; l'existence se prouve par le comptage.

## À retenir
- Les comptages du CAC prouvent l'existence et l'exhaustivité, pas l'évaluation.
- Les écarts relevés sur un sondage s'extrapolent ; ceux des éléments testés exhaustivement s'ajoutent sans extrapolation.
- Une dépréciation devenue sans objet se reprend (7817) ; une nouvelle dépréciation se dote (6817).

**Notions liées :** [Stocks — contrôles clés](/cours/stocks-controles-cles) · [Stocks — pièges classiques](/cours/stocks-pieges) · [Évaluation des stocks en PCG](/cours/stocks-evaluation-pcg) · [Éléments probants et techniques](/cours/elements-probants-techniques)
