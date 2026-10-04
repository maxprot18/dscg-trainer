# Contrats à long terme : avancement et pertes à terminaison

**Références :** PCG art. 622-1 à 622-7 (règl. ANC 2014-03 modifié ; transférés sans changement de fond aux art. 523-1 à 523-8 du titre V par le règl. ANC 2026-03 du 6 mars 2026, homologué par arrêté du 12 août 2026 et applicable aux exercices ouverts à compter du 1er janvier 2027) ; comptes 1516, 335, 345, 4181, 487, 704, 6815, 6817, 7133

**Enjeu :** un contrat qui s'étale sur plusieurs exercices pose la question du rattachement du chiffre d'affaires et de la marge ; l'examen demande le calcul du résultat de l'exercice selon la méthode retenue et le traitement intégral de la perte à terminaison.

Un **contrat à long terme** porte sur la réalisation d'un bien, d'un service ou d'un ensemble de biens et services dont l'exécution s'étend sur au moins deux exercices et dont la date de démarrage et la date d'achèvement se situent dans deux exercices différents (construction, ingénierie, logiciels sur mesure).

**Deux méthodes** :
- **Méthode à l'avancement** (méthode de référence) : chiffre d'affaires et marge reconnus au fur et à mesure de l'avancement, à condition que le résultat à terminaison puisse être estimé de façon fiable (prix de vente acceptés, coûts totaux et coûts restant à engager évalués, degré d'avancement mesurable). Si cette fiabilité manque, le produit est limité aux coûts engagés, sans marge.
- **Méthode à l'achèvement** : aucun chiffre d'affaires ni marge avant la fin du contrat ; les coûts engagés figurent en **travaux en cours (335 ou 345)** via la production stockée (7133 ou 7134), pour leur coût et sans marge.

**Mesure de l'avancement** : rapport des coûts engagés aux coûts totaux estimés, ou mesure physique ou technique des travaux exécutés. À chaque clôture, on réestime le coût total : le résultat cumulé est recalculé et la part de l'exercice = résultat cumulé à date − résultat déjà constaté (changement d'estimation, sans retraitement du passé).

**Écart avec la facturation** : produit à l'avancement supérieur au facturé → **4181** « Clients – Factures à établir » ; facturation excédentaire → **487** « Produits constatés d'avance ». Le chiffre d'affaires du compte 704 est ainsi ajusté au niveau de l'avancement, indépendamment du rythme de facturation.

**Perte à terminaison** : dès qu'elle devient probable, elle est constatée **en totalité**, quelle que soit la méthode. En méthode à l'achèvement : dépréciation des travaux en cours (6817 / 39) puis, pour le surplus, **provision pour pertes sur contrats (6815 / 1516)**. En méthode à l'avancement : la perte déjà acquise passe par le résultat de l'avancement, le reste (part non encore exécutée) par la provision 1516.

**Formules clés :** CA cumulé = prix × % d'avancement ; résultat cumulé = résultat à terminaison × % d'avancement (sauf perte, constatée à 100 %) ; provision = perte totale × (1 − % d'avancement) en méthode à l'avancement

## Exemple
La société Granit signe en N un contrat de 1 200 000 € HT ; coût total estimé 1 000 000 €. Coûts engagés en N : 400 000 € ; facturation N : 450 000 €. Méthode à l'avancement.
N : avancement = 400 000 / 1 000 000 = 40 % ; CA = 1 200 000 × 40 % = **480 000 €**, marge 80 000 € ; 480 000 − 450 000 = 30 000 € en 4181 « Factures à établir ».
N+1 : surcoûts, coût total réestimé 1 300 000 € (perte à terminaison 100 000 €) ; coûts engagés cumulés 910 000 € soit 70 %. CA cumulé = 840 000 €, CA de N+1 = 360 000 € ; coûts de N+1 = 510 000 € ; résultat opérationnel N+1 = −150 000 €. Perte totale constatée à 100 % : provision 1516 = 100 000 × 30 % = **30 000 €**. Résultat du contrat en N+1 = −150 000 − 30 000 = **−180 000 €**, soit −100 000 (cumul) − 80 000 (déjà reconnu en N).

```diagram
{"type":"bars","title":"Contrat Granit : résultat reconnu par exercice","unit":"k€","items":[{"label":"N (marge à 40 %)","value":80},{"label":"N+1 (révision + provision)","value":-180},{"label":"Cumul = perte totale","value":-100}]}
```

## Erreurs fréquentes
- Reconnaître du chiffre d'affaires et de la marge en méthode à l'achèvement : seuls les travaux en cours apparaissent, pour leur coût (300 000 € de coûts = 300 000 € de stock), sans marge.
- Laisser les coûts engagés en charges sans production stockée : la méthode à l'achèvement neutralise les coûts via le compte 7133, sinon le résultat de l'exercice est faussé.
- Étaler la perte à terminaison au rythme de l'avancement, ou ne pas la constater en méthode à l'achèvement : elle est reconnue en totalité, dans les deux méthodes, dès qu'elle est probable.
- Corriger le résultat de N après la révision du coût total en N+1 : il s'agit d'un changement d'estimation, traité prospectivement.

## À retenir
- L'avancement est la méthode de référence : l'adopter est toujours possible, revenir ensuite à l'achèvement ne l'est plus.
- Une révision du coût total se traite en résultat de l'exercice de révision.
- La perte à terminaison ne s'étale pas : elle est entièrement constatée dès qu'elle est connue, en dépréciation des en-cours puis en provision 1516.

**Notions liées :** [IFRS 15 — Produits des activités ordinaires](/cours/ifrs-15-produits-activites-ordinaires) · [Provisions pour risques et charges](/cours/provisions-risques-charges) · [Stocks et en-cours](/cours/stocks-evaluation-pcg) · [Annexe et changements comptables](/cours/annexe-changements-comptables)
