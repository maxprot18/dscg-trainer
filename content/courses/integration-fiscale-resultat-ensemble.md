# Intégration fiscale : résultat d'ensemble, neutralisations et sortie du groupe

**Références :** CGI art. 223 B, 223 B bis, 223 D, 223 F, 223 I, 223 R et 223 S ; PCG (règl. ANC 2014-03), comptes 444, 451, 695, 6981 et 6989

**Enjeu :** calculer l'IS dû par le groupe à partir des résultats individuels, en appliquant les rectifications du résultat d'ensemble, puis répartir la charge d'impôt entre les sociétés ; cas chiffré fréquent en UE 1, avec incidences comptables.

**Détermination** : chaque société calcule son résultat fiscal comme si elle était imposée séparément (déclaration 2058-A individuelle). La mère fait la **somme algébrique** des résultats (bénéfices et déficits) et y applique des **rectifications** (223 B, imprimé 2058-ER) ; elle seule paie l'IS sur le **résultat d'ensemble**, en verse les acomptes et le solde, et les filiales restent solidaires du paiement à hauteur de l'impôt qu'elles auraient dû.

**Principales rectifications** :
- plus-values ou moins-values de **cession d'immobilisations ou de titres entre sociétés du groupe** : neutralisées (déduites ou réintégrées) du résultat d'ensemble, puis « déneutralisées » lors de la sortie du bien ou de l'une des deux sociétés du groupe (223 F) ; le supplément d'amortissement pratiqué par le cessionnaire est réintégré chaque année ;
- **dotations et reprises de provisions** entre sociétés du groupe (créances douteuses, dépréciation de titres, risques) : la dotation est réintégrée et la reprise ultérieure déduite (223 B et 223 D) ;
- **abandons de créances et subventions** intra-groupe : depuis les exercices ouverts en 2019, ils ne sont plus neutralisés ; ils suivent le droit commun (déductibles seulement s'ils ont un caractère commercial) ;
- dividendes intra-groupe sous régime mère-fille : QPFC limitée à **1 %**, sans autre neutralisation ; dividendes intra-groupe hors régime mère-fille : neutralisés à 99 % ;
- charges financières liées au rachat d'une société au groupe par une société du groupe (« amendement Charasse ») : réintégration forfaitaire pendant neuf exercices.

**Déficits** : les déficits subis pendant l'intégration sont imputés sur le résultat d'ensemble et appartiennent au groupe (la mère seule les reporte). Les déficits **antérieurs à l'entrée** d'une filiale ne sont imputables que sur son **propre bénéfice** (223 I), après neutralisation des opérations intra-groupe ; ils ne remontent jamais au résultat d'ensemble.

**Convention d'intégration** : facultative et libre, sous réserve de l'intérêt social de chaque société. Le plus souvent, chaque filiale verse à la mère l'IS qu'elle aurait payé sans intégration (méthode de la neutralité) ; l'économie d'impôt liée aux déficits des filiales reste acquise à la mère, sauf clause de réallocation ou d'indemnisation de la filiale déficitaire.

**Écritures** : chez la filiale, débit 695 « Impôts sur les bénéfices » / crédit 451 « Groupe » (compte courant de la mère). Chez la mère : IS du groupe au débit du 695 par le crédit du 444 ; contributions des filiales au crédit du 6989 « Intégration fiscale – produits » par le débit du 451 (ou 6981 « Intégration fiscale – charges » pour une indemnisation versée).

**Sortie du groupe** (223 S) : une filiale qui ne remplit plus les conditions (détention inférieure à 95 %, changement de date de clôture, absorption par une société extérieure) sort rétroactivement **au premier jour de l'exercice** au cours duquel la condition cesse d'être remplie. Les déficits d'ensemble restent à la mère ; les neutralisations antérieures liées à cette société (plus-values 223 F, provisions) sont réintégrées (223 R) ; la convention prévoit souvent une indemnisation de la filiale sortante pour les déficits qu'elle a apportés.

```diagram
{"type":"flow","title":"Du résultat individuel à l'IS du groupe","steps":[{"label":"Résultats fiscaux individuels","note":"chaque société, comme si elle était imposée seule"},{"label":"Somme algébrique","note":"bénéfices et déficits de l'exercice"},{"label":"Rectifications 223 B à 223 F","note":"plus-values et provisions intra-groupe, QPFC 1 %, Charasse"},{"label":"Résultat d'ensemble","note":"imputation des déficits d'ensemble antérieurs"},{"label":"IS payé par la mère","note":"filiales : contribution selon la convention (695 / 451)"}]}
```

**Formules clés :** résultat d'ensemble = Σ résultats individuels ± rectifications ; économie d'impôt = IS en imposition séparée − IS d'ensemble

## Exemple
Groupe intégré au taux de 25 % : M réalise un bénéfice fiscal de 500 000 €, F1 de 300 000 €, F2 un déficit de 200 000 € ; M a cédé à F1 un terrain avec une plus-value de 50 000 €. Somme algébrique : 500 000 + 300 000 − 200 000 = 600 000 € ; neutralisation de la plus-value intra-groupe : −50 000 € ; résultat d'ensemble : 550 000 € ; IS du groupe : 137 500 €.
Sans intégration, M et F1 auraient payé (500 000 + 300 000) × 25 % = 200 000 € et F2 aurait reporté son déficit : économie immédiate de 62 500 €. Convention de neutralité : F1 verse 75 000 € à M (débit 695, crédit 451) ; M comptabilise 137 500 € en 695/444 et 75 000 € en 451/6989. La plus-value de 50 000 € sera réintégrée si le terrain ou F1 sort du groupe.

## Erreurs fréquentes
- Imputer les déficits antérieurs à l'entrée d'une filiale sur le résultat d'ensemble : ils ne s'imputent que sur le bénéfice propre de cette filiale.
- Croire que les déficits nés pendant l'intégration sont perdus ou transférés à la filiale sortante : ils restent à la mère.
- Neutraliser encore les abandons de créances et subventions intra-groupe : cette neutralisation a été supprimée pour les exercices ouverts depuis 2019.
- Faire sortir la filiale à la date de l'événement : la sortie remonte au premier jour de l'exercice au cours duquel la condition de 95 % est perdue.

## À retenir
- La mère est seule redevable de l'IS d'ensemble ; les filiales lui versent une contribution selon la convention.
- Déficits antérieurs à l'entrée : imputation sur le seul bénéfice de la filiale.
- La sortie prend effet dès l'ouverture de l'exercice où la condition de 95 % est perdue, avec déneutralisation (223 R).

**Notions liées :** [Intégration fiscale : conditions, périmètre, option](/cours/integration-fiscale-perimetre) · [Régime mère-fille](/cours/regime-mere-filiale) · [IS : taux et déficits](/cours/is-taux-deficits) · [Fiscalité du financement](/cours/fiscalite-financement-interets)
