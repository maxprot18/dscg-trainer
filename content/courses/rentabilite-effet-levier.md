# Rentabilité économique, rentabilité financière et effet de levier

**Références :** relation de l'effet de levier (analyse financière classique) ; IFRS 10 §22 et IAS 1 §81B (règl. UE 2023/1803) pour la part du groupe

**Enjeu :** l'effet de levier explique comment le financement par dette transforme la rentabilité de l'outil économique en rentabilité pour l'actionnaire ; question quasi systématique du diagnostic financier, elle sert aussi à juger un choix de financement.

**Actif économique (AE)** = immobilisations d'exploitation + BFR d'exploitation, égal aux capitaux investis = capitaux propres + endettement net. La trésorerie disponible et les actifs hors exploitation n'en font pas partie ; en pratique, l'endettement net retenu est net de cette trésorerie.

**Rentabilité économique** Re = résultat d'exploitation après impôt / AE. Elle mesure la performance de l'outil économique, indépendamment de son mode de financement : deux entreprises identiques financées différemment ont la même Re.
- Décomposition : Re = (résultat d'exploitation après impôt / CA) × (CA / AE) = taux de marge économique × rotation de l'actif économique. Une marge faible peut être compensée par une rotation rapide (distribution) et inversement (industrie lourde).

**Rentabilité financière** Rf = résultat net / capitaux propres. Elle mesure la rémunération comptable des actionnaires. En consolidé, on rapporte le résultat part du groupe aux capitaux propres part du groupe (ou l'ensemble au total), jamais un mélange des deux.

**Effet de levier** (taux après impôt, i = coût de la dette après impôt) :
Rf = Re + (Re − i) × D/CP
- (Re − i) est le différentiel, D/CP le bras de levier (endettement net / capitaux propres).
- Avec des taux avant impôt : Rf = [Re + (Re − i) × D/CP] × (1 − t), ce qui revient à multiplier chaque taux par (1 − t).
- Re > i : l'endettement accroît la Rf (effet de levier positif). Re < i : l'endettement la réduit (effet de massue). Re = i : la structure financière est sans effet.

**Risque** : l'endettement amplifie la variabilité de la Rf quand Re fluctue (risque financier s'ajoutant au risque d'exploitation) ; plus le bras de levier est grand, plus la Rf est sensible à une baisse de Re.

## Exemple
Données : AE = 15 M€ financé par CP = 10 M€ et D = 5 M€ (D/CP = 0,5) ; coût de la dette après impôt i = 4 %.
Si Re = 8 % : Rf = 8 % + (8 % − 4 %) × 0,5 = 10 %. Vérification : résultat net = 0,08 × 15 − 0,04 × 5 = 1,2 − 0,2 = 1,0 M€, soit 1,0 / 10 = 10 %. Sans dette, Rf serait égale à Re = 8 %.
Si Re chute à 3 % : Rf = 3 % + (3 % − 4 %) × 0,5 = 2,5 %, inférieure à Re (effet de massue) : la dette a amplifié la baisse.

```diagram
{"type":"bars","title":"Rentabilité financière selon Re et l'endettement (i = 4 %)","unit":"%","items":[{"label":"Re 8 %, sans dette","value":8},{"label":"Re 8 %, D/CP = 0,5","value":10},{"label":"Re 3 %, sans dette","value":3},{"label":"Re 3 %, D/CP = 0,5","value":2.5}]}
```

## Erreurs fréquentes
- Multiplier le différentiel par D/(D + CP) au lieu de D/CP : le bras de levier rapporte la dette aux capitaux propres.
- Oublier le facteur (1 − t) quand les taux donnés sont avant impôt, ou l'appliquer deux fois.
- Croire que l'endettement crée du levier dès que la Rf est positive ou que D/CP > 1 : la seule condition est Re > i.
- Calculer Re à partir du résultat net : le résultat d'exploitation après impôt (avant frais financiers) est le bon numérateur.

## À retenir
- Le bras de levier est D/CP, pas D/(D + CP).
- Un projet moins rentable que la Re actuelle peut accroître la Rf s'il est financé par une dette moins chère que lui.
- Ne pas mélanger taux avant et après impôt dans la même formule.

**Notions liées :** [Analyse de l'activité et de la rentabilité](/cours/analyse-activite-rentabilite) · [Structure financière et endettement net](/cours/structure-financiere-endettement) · [Coût du capital (CMPC, MEDAF)](/cours/cout-capital-cmpc-medaf) · [Structure du capital et dividendes](/cours/structure-capital-dividendes)
