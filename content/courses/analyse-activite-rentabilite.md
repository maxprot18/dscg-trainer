# Analyse de l'activité et de la rentabilité (SIG, EBE, EBITDA, CAF)

**Références :** méthode PCG des soldes intermédiaires de gestion (système développé) ; IAS 1 §82, §85 et §97 (règl. UE 2023/1803) ; orientations ESMA sur les indicateurs alternatifs de performance (2015)

**Enjeu :** le tableau des SIG et la CAF sont le point de départ de tout diagnostic ; à l'examen, on les reconstitue à partir d'un compte de résultat, puis on commente l'évolution des marges (effet ciseau, partage de la valeur ajoutée).

**Soldes intermédiaires de gestion** (comptes individuels ou consolidés en normes françaises) :
- marge commerciale = ventes de marchandises − coût d'achat des marchandises vendues (achats + stock initial − stock final) ; elle ne concerne que l'activité de négoce ;
- production de l'exercice = production vendue + production stockée + production immobilisée ; la production stockée peut être négative (déstockage) ;
- valeur ajoutée (VA) = marge commerciale + production − consommations en provenance des tiers (matières consommées, autres achats et charges externes) ; elle mesure la richesse créée par l'entreprise elle-même ;
- **EBE** = VA + subventions d'exploitation − impôts, taxes et versements assimilés − charges de personnel ; il est calculé avant dotations, charges financières, éléments exceptionnels et impôt sur les bénéfices, donc indépendant des choix d'amortissement et de financement ;
- résultat d'exploitation = EBE + reprises et autres produits − dotations et autres charges ; puis résultat courant avant impôt (après résultat financier), résultat exceptionnel, résultat net.

```diagram
{"type":"flow","title":"Enchaînement des SIG de l'exemple (k€)","steps":[{"label":"Marge commerciale 220 + production 1 230","note":"négoce et production réunis"},{"label":"− consommations tiers 650","note":"matières, autres achats et charges externes"},{"label":"Valeur ajoutée 800"},{"label":"+ subventions 10 − impôts et taxes 40 − personnel 450","note":"partage de la VA"},{"label":"EBE 320","note":"avant dotations, financier, exceptionnel, IS"},{"label":"− dotations 120"},{"label":"Résultat d'exploitation 200"}]}
```

**En IFRS**, aucun SIG n'est imposé : le groupe présente un résultat opérationnel (courant) et souvent un **EBITDA** (résultat opérationnel courant + dotations aux amortissements et dépréciations), indicateur alternatif de performance défini par le groupe lui-même et rapproché des agrégats IFRS (orientations ESMA). Sa composition varie d'un groupe à l'autre (loyers IFRS 16, éléments « non courants »).

**Capacité d'autofinancement (CAF)** : ressource interne dégagée par l'activité, avant toute décision de distribution.
- additive : résultat net + dotations − reprises − quote-part des subventions d'investissement virée au résultat − produits de cession d'actifs + valeur nette comptable des actifs cédés ;
- soustractive : EBE + autres produits encaissables − autres charges décaissables − charges financières − impôt sur les bénéfices. En consolidé : on part du résultat de l'ensemble consolidé, on retire la quote-part de résultat des sociétés mises en équivalence (sans flux, seuls les dividendes reçus en sont un) et les impôts différés.

**Ratios d'analyse :** taux de marge d'EBE (EBE / CA), taux de VA (VA / CA), partage de la VA (charges de personnel / VA), croissance du CA à périmètre et change constants.

## Exemple
Données (k€) : ventes de marchandises 500 ; achats de marchandises 300 ; stock de marchandises initial 40, final 60 ; production vendue 1 200 ; production stockée +30 ; consommations en provenance des tiers 650 ; subventions d'exploitation 10 ; impôts et taxes 40 ; charges de personnel 450 ; dotations 120.
Coût d'achat des marchandises vendues = 300 + 40 − 60 = 280 ; marge commerciale = 500 − 280 = 220. Production = 1 200 + 30 = 1 230. VA = 220 + 1 230 − 650 = 800.
EBE = 800 + 10 − 40 − 450 = 320 ; résultat d'exploitation = 320 − 120 = 200. CA = 500 + 1 200 = 1 700 : taux de marge d'EBE = 320 / 1 700 = 18,8 % ; taux de VA = 47,1 % ; le personnel absorbe 450 / 800 = 56,3 % de la VA.

## Erreurs fréquentes
- Retrancher les dotations aux amortissements pour obtenir l'EBE : elles interviennent seulement au résultat d'exploitation.
- Oublier la variation de stock dans le coût d'achat des marchandises vendues, ou l'ajouter dans le mauvais sens (un stock final supérieur au stock initial réduit le coût).
- Dans la CAF additive, ne retraiter que la part des minoritaires dans la quote-part des sociétés mises en équivalence : c'est la totalité de cette quote-part qui est retirée.

## À retenir
- Le coût d'achat des marchandises vendues intègre la variation de stock : un stock qui augmente réduit ce coût.
- L'EBE ne dépend ni de la politique d'amortissement ni du coût de l'endettement financier ; l'effet ciseau (charges croissant plus vite que le CA) dégrade son taux malgré la croissance.
- L'EBITDA n'a pas de définition normalisée : vérifier sa composition avant toute comparaison entre groupes.

**Notions liées :** [Rentabilité économique et effet de levier](/cours/rentabilite-effet-levier) · [Diagnostic par les flux de trésorerie](/cours/flux-tresorerie-diagnostic) · [IAS 1 — Présentation des états financiers](/cours/ias-1-presentation-etats-financiers) · [Key ratios (UE 6)](/cours/key-ratios-english)
