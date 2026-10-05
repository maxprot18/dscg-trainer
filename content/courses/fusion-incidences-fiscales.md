# Incidences fiscales des fusions (régime de faveur, plus-values en sursis)

**Références :** CGI art. 210 A et 210 B ; PCG titre VII (règl. ANC 2014-03 modifié par le règl. ANC 2017-01) ; tableau 2058-A

**Enjeu :** le régime de faveur neutralise l'imposition immédiate de la cessation d'entreprise de l'absorbée, mais en reportant la charge sur l'absorbante ; le cas demande de chiffrer les réintégrations étalées et les plus-values en sursis, et de distinguer ce qui s'écrit en comptabilité de ce qui reste extra-comptable.

**Régime de droit commun** : la fusion entraîne la cessation d'entreprise de l'absorbée ; ses plus-values latentes (y compris fonds commercial) et ses provisions sont imposées immédiatement, et ses déficits sont perdus.

**Régime de faveur** (CGI art. 210 A) : les plus-values nettes et profits dégagés sur l'ensemble des éléments apportés ne sont pas imposés chez l'absorbée. En contrepartie, l'absorbante prend dans le traité les engagements suivants :
- reprendre à son passif les provisions dont l'imposition est différée (ex. amortissements dérogatoires, provisions réglementées) ;
- calculer les plus-values de cession ultérieure des immobilisations **non amortissables** (terrain, fonds commercial non amorti, titres) d'après leur valeur fiscale chez l'absorbée : sursis d'imposition jusqu'à la cession ;
- réintégrer dans ses résultats imposables les plus-values sur biens **amortissables**, par parts égales sur 15 ans pour les constructions (et plantations, agencements de terrains de longue durée) et sur 5 ans pour les autres biens (règle de la durée moyenne pondérée si les constructions représentent plus de 90 % de la plus-value nette sur biens amortissables) ; en contrepartie, ses amortissements fiscaux sont calculés sur la valeur d'apport ;
- en cas de cession d'un bien amortissable, imposer immédiatement la fraction de plus-value non encore réintégrée ;
- inscrire les éléments autres que les immobilisations (stocks) pour leur valeur fiscale chez l'absorbée, ou à défaut imposer le profit correspondant.

```diagram
{"type":"tree","title":"Sort fiscal d'une plus-value d'apport (CGI art. 210 A)","root":{"label":"Élément apporté","children":[{"edge":"non amortissable","label":"Sursis jusqu'à la cession","note":"PV calculée sur la valeur fiscale chez l'absorbée"},{"edge":"amortissable","label":"Réintégration étalée","children":[{"edge":"construction","label":"15 ans par parts égales"},{"edge":"autre bien","label":"5 ans par parts égales"}]},{"edge":"stock","label":"Valeur fiscale de l'absorbée","note":"sinon profit imposé"}]}}
```

**Apport partiel d'actif** (CGI art. 210 B) : le régime de faveur s'applique de plein droit à l'apport d'une branche complète d'activité (agrément sinon). L'apporteuse calcule la plus-value de cession ultérieure des titres reçus d'après la valeur fiscale qu'avaient les biens apportés dans ses écritures.

**Droits d'enregistrement** : les fusions, scissions et APA auxquels ne participent que des sociétés passibles de l'IS sont enregistrés gratuitement (CGI art. 816, depuis la loi de finances pour 2019) ; l'ancien droit fixe n'existe plus.

**Apports à la valeur comptable** : aucune plus-value n'est constatée ; l'absorbante reprend les valeurs fiscales et poursuit les plans d'amortissement. Pour respecter l'engagement de reprise, les provisions réglementées de l'absorbée (incluses dans l'actif net apporté) sont en pratique reconstituées au passif par prélèvement sur la prime de fusion.

**Formules clés :** réintégration annuelle = PV constructions ÷ 15 + PV autres biens amortissables ÷ 5 ; PV fiscale de cession d'un bien non amortissable = prix de cession − valeur fiscale chez l'absorbée

## Exemple
Fusion à la valeur réelle sous le régime de faveur. Plus-values d'apport : construction 300 000 €, matériel 100 000 €, terrain 80 000 € (valeur fiscale chez l'absorbée 120 000 €, valeur d'apport 200 000 €).
Réintégrations extra-comptables de l'absorbante : 300 000 / 15 = 20 000 € par an pendant 15 ans et 100 000 / 5 = 20 000 € par an pendant 5 ans, soit **40 000 € par an** les cinq premières années puis 20 000 €. Le terrain : rien tant qu'il n'est pas cédé.
Si le matériel est cédé en année 3, après deux réintégrations, le solde 100 000 − 40 000 = **60 000 €** est imposé immédiatement. Si le terrain est vendu 230 000 €, la plus-value comptable est de 30 000 € mais la plus-value fiscale de 230 000 − 120 000 = 110 000 € : réintégration extra-comptable de 80 000 €.

## Erreurs fréquentes
- Croire que l'absorbante doit acquitter immédiatement l'impôt sur les plus-values des biens non amortissables : elles sont en sursis, imposées seulement à la cession, sur la base de la valeur fiscale de l'absorbée.
- Calculer la plus-value de cession des titres reçus en APA à partir de leur valeur d'apport : la valeur fiscale de ces titres est celle qu'avaient les biens apportés chez l'apporteuse, ce qui majore la plus-value imposable de la plus-value d'apport placée en sursis.
- Comptabiliser les réintégrations ou le sursis par des écritures : ce sont des retraitements du tableau 2058-A, sans impact sur les comptes sociaux (hors impôt).
- Étaler sur 5 ans la plus-value sur une construction, ou réintégrer en une fois : constructions sur 15 ans, autres biens amortissables sur 5 ans.

## À retenir
- Non amortissables : sursis jusqu'à la cession ; amortissables : réintégration étalée (15 ou 5 ans), avec amortissement sur la valeur d'apport en contrepartie.
- Les retraitements fiscaux sont extra-comptables (tableau 2058-A) : pas d'écriture.
- APA : la valeur fiscale des titres reçus est celle des biens apportés, pas la valeur d'apport.

**Notions liées :** [Régime fiscal de faveur des fusions et APA](/cours/regime-fiscal-faveur-fusions) · [Conséquences fiscales de la cessation d'activité](/cours/cessation-activite-fiscalite) · [Évaluation des apports](/cours/evaluation-apports) · [Rétroactivité des fusions](/cours/retroactivite-fusion)
