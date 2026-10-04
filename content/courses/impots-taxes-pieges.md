# Impôts et taxes — pièges classiques

**Références :** CGI art. 223 A (intégration fiscale) ; CGI art. 220 quinquies (report en arrière des déficits) ; CGI art. 269 (exigibilité de la TVA) ; CGI art. 1668 (acomptes d'IS) ; C. com. art. L123-19 (non-compensation) ; NEP 250 ; PCG comptes 444, 4452, 44566, 455, 695, 699

**Enjeu :** les QCM du cycle testent moins le calcul de l'impôt que son enregistrement et sa présentation (acompte en charge, compensation, sens d'un écart de TVA, redevable dans un groupe intégré) ; chaque piège a une réponse qui tombe sous le sens et une réponse exacte.

- **Acomptes d'IS** : les quatre acomptes (15 mars, juin, septembre, décembre) sont des avances sur l'impôt de l'exercice : débit 444, crédit 512, jamais en charge 695. Comptabilisés en charge, ils doublent l'IS lorsque l'impôt dû est enregistré (695 / 444) et transforment une créance éventuelle en dette fictive.
- **Non-compensation** : un solde débiteur du 444 (acomptes supérieurs à l'IS dû) est une créance présentée à l'actif ; il ne se compense pas avec une dette de TVA ou de taxes, même si le créancier est le même (L123-19). Une mention en annexe ne régularise pas une compensation.
- **Exigibilité de la TVA** : livraisons de biens, à la livraison (et, depuis le 1er janvier 2023, dès l'encaissement d'un acompte) ; prestations de services, à l'encaissement (sauf option pour les débits), y compris pour les acomptes reçus. La TVA facturée sur des prestations non encaissées reste dans un sous-compte d'attente du 4457 (44574 « TVA collectée sur encaissements » en pratique, subdivision non prévue par le PCG) et n'est pas encore déclarée : elle explique une TVA déclarée **inférieure** à la TVA théorique, tandis qu'un acompte encaissé sur une prestation non encore facturée explique une TVA déclarée **supérieure**.
- **Autoliquidation intracommunautaire** : TVA due (4452) et TVA déductible (44566) du même montant ; son omission ne change pas la TVA nette si la déduction est totale, mais reste une non-conformité déclarative sanctionnable à relever (NEP 250).
- **Intégration fiscale** : la mère est seule redevable de l'IS du groupe ; les filiales intégrées lui versent leur contribution selon la convention d'intégration (compte courant 455 ou 451), pas au Trésor. Chez la mère, la charge 695 est l'IS du groupe diminué des contributions reçues ; l'économie d'intégration née des déficits d'une filiale lui revient, sauf clause contraire.
- **Report en arrière (carry-back)** : sur option, le déficit s'impute sur le bénéfice de l'exercice précédent, dans la limite de ce bénéfice (minoré des distributions et des fractions exonérées ou payées par crédits d'impôt) et de 1 000 000 € ; le solde reste reportable en avant. La créance se comptabilise au débit du 444 par le crédit du 699 (produit, non une diminution du 695) ; elle est remboursable à défaut d'imputation au bout de cinq ans.
- **Provision pour redressement** : elle couvre les droits, les intérêts de retard et les majorations probables, même si la direction conteste ; ne retenir que les droits sous-évalue la provision.

```diagram
{"type":"bars","title":"Carry-back Alnitak : la plus petite des trois limites s'impute","unit":"k€","items":[{"label":"Déficit N","value":1500},{"label":"Bénéfice N−1","value":1200},{"label":"Plafond légal","value":1000},{"label":"Déficit imputé","value":1000},{"label":"Reportable en avant","value":500}]}
```

**Formules clés :** créance de carry-back = min(déficit, bénéfice N−1, 1 000 000 €) × taux d'IS supporté par le bénéfice d'imputation de N−1 (la créance égale l'impôt effectivement payé sur ce bénéfice ; imputation d'abord sur la fraction taxée au taux normal de 25 %) ; économie d'intégration = Σ IS des sociétés bénéficiaires − IS du groupe ; solde du 444 = acomptes versés − IS dû (débiteur = créance)

## Exemple
Société Alnitak, N−1 : bénéfice fiscal 1 200 000 €, aucune distribution. N : déficit fiscal 1 500 000 €, option pour le report en arrière. Le comptable a par ailleurs enregistré en N les quatre acomptes de 30 000 € au débit du 695 et aucune créance de carry-back.
Carry-back : déficit imputé = min(1 500 000 ; 1 200 000 ; 1 000 000) = 1 000 000 € ; créance = 1 000 000 × 25 % = **250 000 €** (débit 444, crédit 699) ; 500 000 € restent reportables en avant. Acomptes : 120 000 € passés en charge à tort ; correction par débit 444 et crédit 695 de 120 000 €, qui ramène le 695 à zéro (exercice déficitaire) et fait apparaître une créance au 444 de 120 000 + 250 000 = **370 000 €**, à présenter à l'actif sans compensation avec la TVA à décaisser.

## Erreurs fréquentes
- Imputer l'acompte d'IS en 695 ou en 6351 (impôts directs autres que l'IS) ou en 4486 (charges à payer) : c'est une avance, donc le débit du 444.
- Présenter une « dette fiscale nette » (dette de TVA − créance d'IS) au motif que l'État est l'unique créancier : la compensation est interdite, même mentionnée en annexe.
- Expliquer une TVA déclarée supérieure à la TVA théorique par des exportations ou des livraisons intracommunautaires exonérées incluses à tort dans la base : ce sens d'erreur produit l'écart inverse.
- Retenir le plafond de 1 000 000 € sans le limiter au bénéfice de N−1, ou imputer tout le déficit : la créance est calculée sur la plus petite des trois limites.
- Croire chaque filiale intégrée redevable de son IS envers le Trésor : seule la mère l'est (CGI art. 223 A).

## À retenir
- Acompte d'IS = 444, jamais 695 ; solde débiteur du 444 = créance à l'actif, sans compensation.
- TVA déclarée supérieure à la TVA théorique calculée sur le CA : penser aux acomptes encaissés sur prestations.
- Carry-back : plus petite des trois limites × taux, produit en 699 ; intégration : contribution des filiales à la mère, économie chez la mère.

**Notions liées :** [IS : taux, acomptes et déficits](/cours/is-taux-deficits) · [Intégration fiscale : résultat d'ensemble](/cours/integration-fiscale-resultat-ensemble) · [TVA — droits à déduction](/cours/tva-droits-deduction) · [Impôts et taxes — procédures substantives](/cours/impots-taxes-procedures-substantives)
