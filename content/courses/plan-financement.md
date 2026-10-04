# Plan de financement pluriannuel

**Références :** analyse financière (tableau emplois-ressources prévisionnel) ; horizon usuel de 3 à 5 ans

**Enjeu :** vérifier qu'une stratégie d'investissement est finançable année après année ; à l'examen, on construit le plan à partir d'un programme d'investissement, d'une CAF prévisionnelle et d'un schéma de financement, puis on propose les ajustements qui rétablissent l'équilibre.

Le plan de financement recense, année par année, les **emplois** et les **ressources** prévisionnels, pour vérifier que la stratégie (investissements, croissance) est finançable. C'est aussi un document de négociation avec les banques, qui y lisent la capacité de remboursement.

**Emplois** : investissements (acquisitions d'immobilisations, hors TVA récupérable), augmentation du BFR (liée à la croissance du chiffre d'affaires), remboursements d'emprunts (part en capital seulement), dividendes à verser (ceux de l'exercice précédent, décaissés dans l'année).

**Ressources** : CAF prévisionnelle, prix de cession d'immobilisations, augmentation de capital en numéraire (libérée), nouveaux emprunts, subventions d'investissement reçues, diminution du BFR.

**Construction**
- CAF prévisionnelle calculée **après frais financiers et après IS** (contrairement aux flux de la VAN, dont on exclut les frais financiers) : CAF = (EBE − intérêts) × (1 − t) + t × DA si l'IS porte sur EBE − intérêts − DA. Un nouvel emprunt modifie donc la CAF des années suivantes par ses intérêts.
- Solde annuel = ressources − emplois ; trésorerie cumulée = trésorerie initiale + soldes cumulés. Le plan se construit souvent en deux temps : d'abord sans financement externe pour mesurer le besoin, puis avec les emprunts et apports qui le couvrent.

**Équilibre** : un plan est équilibré quand la trésorerie cumulée reste positive chaque année, avec des soldes annuels positifs mais modérés (un excédent important signale des ressources mal employées ou un emprunt surdimensionné). En cas de déficit : emprunt complémentaire, augmentation de capital, crédit-bail, réduction des dividendes, étalement des investissements, réduction du BFR.

**Formules clés :** trésorerie finale = trésorerie initiale + Σ (ressources − emplois)

## Exemple
Trésorerie initiale 50 k€. Année 1 : investissement 500, hausse du BFR 60, remboursement 50 ; CAF 180, emprunt nouveau 300, augmentation de capital 100. Année 2 : hausse du BFR 20, remboursement 50, dividendes 20 ; CAF 220. Année 3 : hausse du BFR 10, remboursement 50, dividendes 30 ; CAF 240.
Année 1 : ressources 580 − emplois 610 = −30 ; trésorerie 50 − 30 = 20. Année 2 : 220 − 90 = +130 ; trésorerie 150. Année 3 : 240 − 90 = +150 ; trésorerie 300.
Le plan est équilibré (trésorerie toujours positive) mais tendu en année 1 : 20 k€ de marge seulement ; un emprunt de 330 k€ ou un report partiel de l'investissement sécuriserait le démarrage. L'excédent croissant ensuite autorise d'augmenter les dividendes ou de rembourser plus vite.

```diagram
{"type":"bars","title":"Trésorerie cumulée en fin d'année dans l'exemple (k€)","unit":"k€","items":[{"label":"Départ","value":50},{"label":"Fin année 1","value":20},{"label":"Fin année 2","value":150},{"label":"Fin année 3","value":300}]}
```

## Erreurs fréquentes
- Inscrire les dotations aux amortissements en emplois : charges non décaissées, elles sont déjà intégrées dans la CAF.
- Porter l'annuité entière de l'emprunt en emploi : seule la part en capital l'est, les intérêts ayant déjà réduit la CAF.
- Exiger un solde annuel nul pour conclure à l'équilibre : il suffit que la trésorerie cumulée reste positive, avec des excédents raisonnables.
- Calculer la CAF du plan avant frais financiers comme pour une VAN : dans le plan, les intérêts sont des décaissements réels à déduire.

## À retenir
- Les dotations aux amortissements ne sont pas des emplois : elles n'interviennent que via la CAF.
- Seule la part en capital des échéances est un emploi ; les intérêts sont déjà dans la CAF.
- Le plan se termine par le contrôle des ratios (endettement, capacité de remboursement).

**Notions liées :** [Plan de trésorerie prévisionnel](/cours/plan-tresorerie-previsionnel) · [Flux de trésorerie d'un projet](/cours/flux-tresorerie-projet) · [Choix des modalités de financement](/cours/choix-modalites-financement) · [Analyse de l'activité et de la rentabilité (CAF)](/cours/analyse-activite-rentabilite)
