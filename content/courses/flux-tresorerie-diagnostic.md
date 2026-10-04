# Diagnostic par les flux de trésorerie

**Références :** IAS 7 §10, §18-20, §31-35 (règl. UE 2023/1803) ; règl. ANC 2020-01 (tableau des flux de trésorerie consolidé)

**Enjeu :** le tableau des flux montre si le résultat se transforme en trésorerie et comment le groupe finance ses investissements et ses distributions ; à l'examen, on reconstitue les flux opérationnels par la méthode indirecte puis on calcule et commente le flux de trésorerie disponible.

Le tableau des flux explique la variation de trésorerie par trois blocs : activité (opérationnels), investissement, financement (IAS 7 §10). Il complète l'analyse du compte de résultat : un groupe rentable peut consommer de la trésorerie (croissance du BFR, investissements lourds), et un groupe en perte peut en dégager (désinvestissement, déstockage).

**Flux opérationnels** (méthode indirecte, §18-20) = résultat net + charges calculées (amortissements, dépréciations, provisions) − plus-values de cession − quote-part de résultat des sociétés mises en équivalence + dividendes reçus de ces sociétés − variation du BFR. Une hausse du BFR consomme de la trésorerie, une baisse en libère. Approche par l'EBITDA : EBITDA − variation du BFR − impôt payé.

**Flux de trésorerie disponible** (FTD, free cash flow) = flux opérationnels − acquisitions d'immobilisations + cessions d'immobilisations. Il mesure la trésorerie disponible pour rémunérer les apporteurs de capitaux (dividendes, rachats d'actions, remboursements de dettes). Définition non normée : vérifier la place des intérêts versés et des loyers IFRS 16 (le remboursement de la dette locative est un flux de financement, §50, donc hors FTD sauf retraitement).

**Lecture du tableau :**
- FTD positif et durable : capacité à se désendetter ou à distribuer ;
- FTD négatif : à rapprocher de la nature des investissements (capacité, croissance) et de l'évolution du BFR ;
- distributions supérieures au FTD : financées par la dette ou la trésorerie, situation non durable.

**Comparabilité (IAS 7 §31-34)** : intérêts versés classés en activité ou en financement, au choix permanent du groupe ; reclasser avant de comparer deux groupes. En normes françaises, le modèle de tableau du règl. ANC 2020-01 part du résultat net des entités intégrées : les intérêts versés restent en principe dans le flux d'activité.

**Ratios :** taux de conversion = FTD / EBITDA ; flux opérationnels / CA ; capex / dotations aux amortissements (supérieur à 1 : outil en développement).

## Exemple
Données consolidées (M€) : résultat net 150 ; dotations 90 ; plus-value sur cession d'une usine 20 (prix encaissé 50) ; quote-part de résultat des entreprises associées 15, dividendes reçus d'elles 5 ; hausse du BFR 40 ; acquisitions d'immobilisations 120 ; dividendes versés 60 ; remboursements d'emprunts 70.
Flux opérationnels = 150 + 90 − 20 − 15 + 5 − 40 = 170. Flux d'investissement = −120 + 50 = −70. FTD = 170 − 70 = 100.
Flux de financement = −60 − 70 = −130 : variation de trésorerie = 100 − 130 = −30. Le FTD couvre les dividendes mais pas, en plus, le désendettement : la trésorerie baisse de 30.

```diagram
{"type":"flow","title":"Du résultat à la variation de trésorerie (M€)","steps":[{"label":"Résultat net 150"},{"label":"+ dotations 90 − plus-value 20 − QP MEE 15 + dividendes reçus 5","note":"éléments sans flux neutralisés"},{"label":"− hausse du BFR 40"},{"label":"Flux opérationnels 170"},{"label":"− acquisitions 120 + cessions 50","note":"flux d'investissement −70"},{"label":"Flux de trésorerie disponible 100"},{"label":"− dividendes 60 − remboursements 70","note":"flux de financement −130"},{"label":"Variation de trésorerie −30"}]}
```

## Erreurs fréquentes
- Calculer le FTD comme CAF − remboursements d'emprunts, ou comme résultat net + dotations : il part des flux opérationnels (après BFR) et retire les investissements nets des cessions.
- Comparer les flux opérationnels de deux groupes dont l'un classe ses intérêts versés en financement : il faut d'abord reclasser.
- Laisser la plus-value dans le résultat et ajouter le prix de cession : la plus-value serait comptée deux fois.
- Conclure d'un FTD négatif à une détresse financière : il peut traduire des investissements de croissance.

## À retenir
- Le remboursement du capital d'un emprunt est un flux de financement, jamais une charge.
- La plus-value de cession est retirée du résultat ; le prix encaissé est un flux d'investissement.
- Un FTD négatif n'est pas en soi un signal de détresse.

**Notions liées :** [IAS 7 — Tableau des flux de trésorerie](/cours/ias-7-tableau-flux-tresorerie) · [Tableau des flux consolidé](/cours/tableau-flux-consolide) · [Plan de financement](/cours/plan-financement) · [Flux de trésorerie d'un projet](/cours/flux-tresorerie-projet)
