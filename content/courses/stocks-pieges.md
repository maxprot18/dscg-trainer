# Stocks — pièges classiques

**Références :** NEP 501 ; NEP 450 (évaluation des anomalies relevées) ; PCG, règles relatives au coût d'entrée des stocks (règl. ANC 2014-03) et règles de dépréciation des stocks (règl. ANC 2014-03) ; PCG comptes 37, 397, 408, 44586, 607, 6037, 713

**Enjeu :** la plupart des anomalies sur les stocks ne viennent pas d'un mauvais comptage mais d'un raisonnement erroné sur la propriété, la coupure, le coût ou la dépréciation ; ces pièges forment l'essentiel des QCM et des cas d'audit du cycle.

- **Biens de tiers** : marchandises reçues en dépôt ou en consignation à exclure du stock, même si elles sont dans les locaux ; les biens remis en dépôt chez un tiers restent au stock du déposant.
- **Biens en transit** : inclus dans le stock de celui qui en a la propriété à la clôture, selon les conditions contractuelles de transfert (départ usine, rendu destination), et non selon leur présence physique ; un bien en transit propriété de l'entité s'ajoute au stock compté.
- **Séparation des exercices** : marchandises comptées dont la facture d'achat n'est pas comptabilisée → facture non parvenue (607 / 44586 / 408), sinon le résultat N est surévalué du montant HT ; marchandises vendues et livrées en N mais encore comptées par erreur → stock final à réduire.
- **Sous-activité** : frais fixes de production imputés sur la base de la capacité normale ; les imputer sur la production réelle, en baisse, surévalue le stock et reporte le coût de la sous-activité sur l'exercice suivant.
- **Coûts exclus** : frais de stockage (sauf nécessaires à la production), frais administratifs non liés à la production, frais de commercialisation.
- **Dépréciation** : appréciée référence par référence ; une plus-value latente sur un article ne compense pas une moins-value sur un autre. La valeur actuelle s'apprécie à partir du prix de vente probable, hors taxes, diminué des coûts d'achèvement (en-cours) et des frais de commercialisation restant à engager (approche voisine de la valeur nette de réalisation d'IAS 2, § 6).
- **Double effet** : une erreur sur le stock final N fausse le résultat N, puis le résultat N+1 en sens inverse ; les capitaux propres de fin N+1 sont justes mais chaque résultat annuel est faux.

```diagram
{"type":"tree","title":"Le bien compté entre-t-il dans le stock de l'entité ?","root":{"label":"L'entité en est-elle propriétaire à la clôture ?","children":[{"edge":"non","label":"Exclu du stock","note":"Dépôt, consignation : même présent dans l'entrepôt"},{"edge":"oui","label":"La facture d'achat est-elle comptabilisée en N ?","children":[{"edge":"oui","label":"Stock et achat cohérents"},{"edge":"non","label":"Facture non parvenue","note":"607 / 44586 / 408, sinon résultat N surévalué"}]}]}}
```

**Formules clés :** dépréciation d'une référence = quantité × max(0 ; coût unitaire − (prix de vente HT − frais de vente unitaires))

## Exemple
Lors du suivi de l'inventaire de Fomalhaut au 31/12/N, l'auditeur relève : (1) un bon de réception du 30/12/N de 18 000 € HT (TVA 20 %) de marchandises comptées, dont la facture datée du 06/01/N+1 a été enregistrée en N+1 ; (2) la référence Z : 300 unités au coût unitaire de 42 €, prix de vente probable 48 € HT, frais de vente 9 € par unité ; (3) la référence W présente une plus-value latente de 2 500 €.
(1) Facture non parvenue à constater : débit 607 pour 18 000 €, débit 44586 pour 3 600 €, crédit 408 pour 21 600 € ; sans elle, le résultat N est surévalué de **18 000 €**. (2) Valeur actuelle = 48 − 9 = 39 € < 42 € → dépréciation 300 × 3 = **900 €** (débit 6817, crédit 397). (3) La plus-value de W ne compense rien : aucune écriture.

## Erreurs fréquentes
- Écarter du stock des marchandises en transit « parce qu'elles n'ont pas pu être comptées » : si la propriété est transférée à la clôture, elles s'ajoutent au stock et la facture (ou une facture non parvenue) est enregistrée en N.
- Penser qu'une surévaluation du stock final N ne touche que le bilan ou seulement le résultat N : le résultat N est surévalué et le résultat N+1 sous-évalué du même montant.
- Imputer la totalité des frais fixes sur une production inférieure à la capacité normale et invoquer la permanence des méthodes : la méthode est non conforme, le stock est surévalué.
- Raisonner sur un prix de vente TTC ou oublier les frais de vente dans la valeur actuelle : la dépréciation est sous-estimée.

## À retenir
- La présence physique ne prouve pas la propriété.
- Les frais de commercialisation sont exclus du coût mais déduits pour calculer la valeur actuelle.
- Correction d'un stock final surévalué : débit 6037 (ou 713), crédit 37 (ou 35).

**Notions liées :** [Stocks — assertions](/cours/stocks-assertions) · [Évaluation des stocks en PCG](/cours/stocks-evaluation-pcg) · [IAS 2 — Stocks](/cours/ias-2-stocks) · [Achats-fournisseurs — pièges](/cours/achats-fournisseurs-pieges)
