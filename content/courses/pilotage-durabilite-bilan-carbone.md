# Pilotage de la durabilité : double matérialité, bilan carbone, indicateurs ESG

**Références :** directive (UE) 2022/2464 (CSRD) ; ESRS 1, chapitre 3, et ESRS E1 (règl. délégué (UE) 2023/2772) ; C. env. art. L. 229-25 et R. 229-47 ; GHG Protocol, *Corporate Standard* (WRI/WBCSD, 2004)

**Enjeu :** le contrôleur de gestion produit désormais des indicateurs extra-financiers vérifiés ; à l'examen, on classe des émissions par scope, on calcule une intensité ou une trajectoire et on applique le principe de double matérialité.

**CSRD** : les entreprises concernées publient un état de durabilité dans le rapport de gestion, selon les normes ESRS, vérifié par un tiers (assurance limitée). Le calendrier a été reporté (directive « stop-the-clock » (UE) 2025/794) et le champ d'application resserré par la directive « Omnibus I » (UE) 2026/470 aux entreprises de plus de 1 000 salariés et 450 M€ de chiffre d'affaires net (transposition au plus tard le 19 mars 2027) : vérifier les seuils et dates applicables à l'exercice.

**Double matérialité** (ESRS 1) : une question de durabilité est matérielle si elle l'est d'un point de vue :
- d'impact (inside-out) : incidences réelles ou potentielles de l'entreprise et de sa chaîne de valeur sur les personnes et l'environnement ;
- ou financier (outside-in) : risques et opportunités qui affectent ou pourraient affecter la performance, la situation financière ou les flux de trésorerie.
Il suffit qu'un des deux points de vue soit atteint ; une question matérielle du seul point de vue de l'impact doit donc être publiée.

**Bilan des émissions de gaz à effet de serre** : émissions = donnée d'activité × facteur d'émission (en tCO₂e). Scopes du GHG Protocol :
- scope 1 : émissions directes de sources détenues ou contrôlées (combustion sur site, véhicules de la flotte, procédés, fuites de fluides frigorigènes) ;
- scope 2 : émissions indirectes liées à l'énergie achetée (électricité, chaleur, vapeur) ;
- scope 3 : autres émissions indirectes, amont (achats de matières, transport amont, déplacements des salariés) et aval (utilisation et fin de vie des produits vendus). Souvent le poste le plus important, et le moins maîtrisé.
En France, le BEGES réglementaire (C. env. art. L. 229-25) concerne notamment les entreprises de plus de 500 salariés (250 outre-mer) ; il est joint à un plan de transition et mis à jour tous les quatre ans. Les émissions indirectes significatives (scope 3) n'y sont obligatoires que pour les entreprises soumises au rapport de durabilité ; pour les autres, les émissions indirectes obligatoires se limitent à l'énergie achetée (C. env. art. R. 229-47). L'entreprise qui publie son bilan et son plan de transition dans son état de durabilité est dispensée du BEGES distinct.

**Pilotage** : trajectoire de réduction (année de référence, cible, réduction annuelle), plan de transition (ESRS E1), intensité carbone (tCO₂e par M€ de chiffre d'affaires ou par unité produite), intégration des indicateurs ESG au tableau de bord, aux budgets (prix interne du carbone appliqué aux projets) et aux rémunérations variables.

**Formules clés :** émissions = activité × facteur d'émission ; cible = émissions de référence × (1 − taux de réduction visé) ; intensité = émissions ÷ CA

## Exemple
PME industrielle (facteurs d'émission : hypothèses de l'énoncé) : gaz naturel brûlé sur site 400 000 kWh × 0,227 kgCO₂e/kWh = 90,8 t (scope 1) ; électricité achetée 1 200 000 kWh × 0,052 = 62,4 t (scope 2) ; acier acheté 500 t × 1,9 tCO₂e/t = 950 t (scope 3 amont).
Total = 1 103,2 tCO₂e, dont 86 % en scope 3. Chiffre d'affaires 8 M€ : intensité = 137,9 tCO₂e/M€. Cible −30 % à l'horizon 2030 : 1 103,2 × 0,70 = 772,2 tCO₂e ; l'action prioritaire porte sur les achats d'acier, pas sur la chaudière.

```diagram
{"type":"bars","title":"Émissions de l'exemple par scope","unit":"tCO₂e","items":[{"label":"Scope 1 (gaz)","value":90.8},{"label":"Scope 2 (électricité)","value":62.4},{"label":"Scope 3 (acier acheté)","value":950}]}
```

## Erreurs fréquentes
- Classer l'électricité achetée en scope 1 : la combustion a lieu chez le producteur, c'est du scope 2 ; les trajets domicile-travail des salariés sont du scope 3.
- Croire qu'un contrat d'électricité renouvelable ou le remplacement de la chaudière réduisent le scope 3 : ils agissent sur les scopes 2 et 1 ; le scope 3 amont se réduit par le choix des fournisseurs et des matières.
- Exiger que la matérialité d'impact et la matérialité financière soient toutes deux atteintes : l'une des deux suffit.

## À retenir
- Électricité achetée = scope 2, pas scope 1 ; déplacements domicile-travail = scope 3.
- Une baisse de l'intensité carbone peut coexister avec une hausse des émissions absolues si l'activité croît : la trajectoire se fixe en valeur absolue.
- Double matérialité : impact **ou** financière, pas les deux cumulativement.

**Notions liées :** [ESRS et double matérialité](/cours/esrs-double-materialite) · [Cadre CSRD et périmètre](/cours/cadre-csrd-perimetre) · [Performance globale](/cours/performance-globale) · [Critères ESG et notation](/cours/criteres-esg-notation)
