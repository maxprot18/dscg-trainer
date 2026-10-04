# Stocks — assertions d'audit

**Références :** NEP 500 (caractère probant des éléments collectés) ; NEP 501 (applications spécifiques : inventaire physique) ; PCG, comptes 31 à 37, 39, 603, 713

**Enjeu :** le stock final fait directement le résultat ; l'examen teste la lecture de l'inventaire physique (quel sens de comptage pour quelle assertion) et le tri des biens à inclure ou exclure (propriété, transit, dépôt).

Les assertions sont les affirmations de la direction sur les comptes ; le commissaire aux comptes s'en sert pour cibler ses procédures sur les stocks et en-cours. L'assistance à l'inventaire physique (NEP 501) en est la procédure centrale, mais elle ne couvre pas toutes les assertions.

Soldes de clôture (comptes 31 à 37 et dépréciations 39) :
- **Existence** : les stocks inscrits au bilan existent physiquement à la clôture (risque : stocks fictifs, vols non constatés, erreurs de comptage).
- **Exhaustivité** : tous les stocks détenus sont recensés, y compris ceux en transit dont la propriété est transférée et ceux déposés chez des tiers (confirmation du tiers ou inspection).
- **Droits et obligations** : l'entité est propriétaire des biens (exclure les marchandises reçues en dépôt ou en consignation, qui restent au fournisseur jusqu'à la revente ; signaler en annexe les biens sous clause de réserve de propriété ou donnés en gage).
- **Évaluation et imputation** : coût d'entrée correctement calculé (coût d'acquisition ou de production, CMP ou PEPS, frais fixes imputés sur la capacité normale) et dépréciation constatée si la valeur actuelle est inférieure au coût.

Opérations de l'exercice (achats consommés, variation de stocks, production stockée) :
- **Séparation des exercices** : les entrées et sorties proches de la clôture sont rattachées au bon exercice, de façon cohérente avec les achats et les ventes (derniers bons de réception et de livraison).
- **Mesure et classification** : variation comptabilisée au bon compte (6031, 6037, 713) et au bon montant.

**Sens des tests de comptage :** existence → du listing d'inventaire vers le stock physique ; exhaustivité → du stock physique vers le listing. L'évaluation se teste à part : recalcul des coûts, comparaison du coût aux prix de vente postérieurs à la clôture.

```diagram
{"type":"tree","title":"Un bien doit-il figurer au stock de l'entité ?","root":{"label":"Le bien est-il présent dans l'entrepôt ?","children":[{"edge":"oui","label":"L'entité en est-elle propriétaire ?","children":[{"edge":"oui","label":"Inclure","note":"vérifier aussi l'achat enregistré"},{"edge":"non","label":"Exclure","note":"dépôt, consignation"}]},{"edge":"non","label":"Propriété déjà transférée à l'entité ?","children":[{"edge":"oui","label":"Inclure","note":"transit, dépôt chez un tiers"},{"edge":"non","label":"Exclure"}]}]}}
```

## Exemple
Inventaire au 31/12/N : le listing indique 1 250 unités de la référence A à 40 €, soit 50 000 € ; le comptage de l'auditeur donne 1 180 unités. Le listing comprend aussi 12 000 € de marchandises reçues en dépôt d'un fournisseur ; des marchandises achetées pour 8 000 €, expédiées le 29/12 avec transfert de propriété au départ, arrivent le 03/01 et ne figurent pas au listing.
Corrections : existence : − 70 × 40 = − 2 800 € ; droits et obligations : − 12 000 € ; exhaustivité : + 8 000 € (et vérifier que la facture de 8 000 € est en 401 ou 408). Stock corrigé : 50 000 − 2 800 − 12 000 + 8 000 = **43 200 €** pour ces trois éléments, soit une surévaluation de 6 800 € du résultat si l'achat de 8 000 € est bien enregistré en N ; s'il ne l'est pas, l'ajout du stock et celui de l'achat se compensent et la surévaluation du résultat est de 14 800 €.

## Erreurs fréquentes
- Confondre le sens du comptage : du listing vers le physique on prouve l'existence ; du physique vers le listing, l'exhaustivité.
- Rattacher des marchandises en consignation à l'exhaustivité ou à la classification : l'entité n'en est pas propriétaire, c'est l'assertion droits et obligations qui est en défaut.
- Croire que des biens en transit non comptés ne peuvent pas figurer au stock : l'inscription suit la propriété et le contrôle, pas la présence physique.
- Attribuer à l'évaluation un comptage par sondage : il ne dit rien du coût ni de la dépréciation ; l'évaluation se teste par le recalcul du CMP et les prix de vente postérieurs.

## À retenir
- L'observation de l'inventaire couvre surtout l'existence et l'exhaustivité ; elle ne prouve ni la propriété ni la valeur.
- L'évaluation se teste par le recalcul des coûts et la comparaison avec les prix de vente (souvent postérieurs à la clôture).
- Une erreur de séparation n'affecte pas le résultat si le mouvement de stock et l'achat (ou la vente) correspondant sont décalés ensemble ; elle l'affecte dès que l'un est rattaché à N et l'autre à N+1.

**Notions liées :** [Stocks — risques](/cours/stocks-risques) · [Stocks — procédures substantives](/cours/stocks-procedures-substantives) · [Évaluation des stocks en PCG](/cours/stocks-evaluation-pcg) · [Achats-fournisseurs — assertions](/cours/achats-fournisseurs-assertions)
