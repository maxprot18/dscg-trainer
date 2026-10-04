# Produits dérivés : contrats à terme, swaps, options

**Références :** marchés dérivés organisés (Euronext, Eurex) et de gré à gré ; règlement (UE) 648/2012 (EMIR) pour la compensation et la déclaration des dérivés de gré à gré

- **Contrat à terme ferme** : engagement d'acheter (position longue) ou de vendre (position courte) un sous-jacent à une date future, à un prix fixé aujourd'hui.
  - **Forward** : gré à gré, sur mesure, risque de contrepartie, dénoué en général à l'échéance.
  - **Future** : standardisé, négocié sur un marché organisé, garanti par une **chambre de compensation** ; dépôt de garantie initial et **appels de marge quotidiens** (gain ou perte du jour = variation du cours de compensation × multiplicateur × nombre de contrats). La plupart des positions sont soldées avant l'échéance.
- **Swap de taux** : échange, sur un nominal notionnel non échangé, de flux d'intérêts à taux fixe contre des flux à taux variable. Un emprunteur à taux variable qui craint une hausse des taux conclut un swap **payeur du fixe / receveur du variable** ; il transforme sa dette en dette à taux fixe. Seul le différentiel d'intérêts est réglé.
- **Option** : droit (et non obligation) d'acheter (**call**) ou de vendre (**put**) un sous-jacent à un prix d'exercice K, contre paiement d'une **prime**. Européenne : exercice à l'échéance seulement ; américaine : à tout moment.
- **Profils à l'échéance** (S_T = cours du sous-jacent) : achat de call : max(S_T − K ; 0) − prime ; achat de put : max(K − S_T ; 0) − prime. L'acheteur a une perte limitée à la prime ; le vendeur encaisse la prime et supporte un risque potentiellement illimité (vente de call) ou très élevé (vente de put).
- **Usages** : couverture (neutraliser un risque existant), spéculation (effet de levier), arbitrage (exploiter un écart de prix).

**Formules clés :** résultat d'un future = (F_vente − F_achat) × multiplicateur × nombre de contrats ; flux net d'un swap payeur fixe = (taux variable − taux fixe) × notionnel × durée

## À retenir
- Ferme (future, forward, swap) : gains et pertes symétriques ; optionnel : asymétrie, coût de la prime.
- La chambre de compensation supprime le risque de contrepartie entre opérateurs, au prix des appels de marge (besoin de liquidité).
- Se couvrir contre une hausse des taux d'emprunt : payer le fixe dans le swap.
