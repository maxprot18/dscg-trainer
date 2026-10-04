# Produits dérivés : contrats à terme, swaps, options

**Références :** marchés dérivés organisés (Euronext, Eurex) et de gré à gré ; règlement (UE) 648/2012 (EMIR) pour la compensation et la déclaration des dérivés de gré à gré ; PCG art. 628-1 s. (instruments financiers à terme, règl. ANC 2015-05)

**Enjeu :** choisir l'instrument qui couvre un risque de taux, de change ou de prix et en calculer le résultat ; à l'examen, on demande le sens de la position (acheteur ou vendeur, payeur ou receveur du fixe), le flux net et le profil de gain à l'échéance.

- **Contrat à terme ferme** : engagement d'acheter (position longue) ou de vendre (position courte) un sous-jacent à une date future, à un prix fixé aujourd'hui. Les deux parties sont engagées : le résultat est symétrique, gain de l'un = perte de l'autre.
  - **Forward** : gré à gré, sur mesure (montant, date, sous-jacent), risque de contrepartie, dénoué en général à l'échéance ; EMIR impose la déclaration à un référentiel central et, pour certains contrats standardisés, la compensation centrale.
  - **Future** : standardisé, négocié sur un marché organisé, garanti par une **chambre de compensation** ; dépôt de garantie initial et **appels de marge quotidiens** (gain ou perte du jour = variation du cours de compensation × multiplicateur × nombre de contrats). La plupart des positions sont soldées avant l'échéance par une opération inverse.
- **Swap de taux** : échange, sur un nominal notionnel non échangé, de flux d'intérêts à taux fixe contre des flux à taux variable (Euribor, €STR). Un emprunteur à taux variable qui craint une hausse des taux conclut un swap **payeur du fixe / receveur du variable** ; il transforme sa dette en dette à taux fixe. Inversement, un prêteur ou un investisseur à taux variable qui craint une baisse des taux reçoit le fixe. Seul le différentiel d'intérêts est réglé.
- **Option** : droit (et non obligation) d'acheter (**call**) ou de vendre (**put**) un sous-jacent à un prix d'exercice K, contre paiement d'une **prime**. Européenne : exercice à l'échéance seulement ; américaine : à tout moment. Un cap (plafond de taux) est une série de calls sur taux ; un floor (plancher), une série de puts.
- **Profils à l'échéance** (S_T = cours du sous-jacent) : achat de call : max(S_T − K ; 0) − prime ; achat de put : max(K − S_T ; 0) − prime. L'acheteur a une perte limitée à la prime ; le vendeur encaisse la prime et supporte un risque potentiellement illimité (vente de call) ou très élevé (vente de put).
- **Usages** : couverture (neutraliser un risque existant), spéculation (effet de levier), arbitrage (exploiter un écart de prix). En PCG, les résultats d'une couverture sont rattachés à l'élément couvert, de façon symétrique (art. 628-1 s.).

```diagram
{"type":"flow","title":"Emprunt à taux variable couvert par un swap payeur du fixe","steps":[{"label":"Emprunt bancaire 10 M€","note":"l'entreprise paie Euribor + marge au prêteur"},{"label":"Swap : reçoit Euribor","note":"la contrepartie du swap verse le taux variable"},{"label":"Swap : paie 3 % fixe","note":"sur le notionnel de 10 M€, jamais échangé"},{"label":"Coût net = 3 % + marge","note":"la dette est devenue à taux fixe, quel que soit l'Euribor"}]}
```

**Formules clés :** résultat d'un future = (F_vente − F_achat) × multiplicateur × nombre de contrats ; flux net reçu par le payeur du fixe = (taux variable − taux fixe) × notionnel × durée

## Exemple
Swap : notionnel 10 M€, l'entreprise paie 3 % fixe et reçoit l'Euribor 6 mois, règlement semestriel. Si l'Euribor du semestre est fixé à 3,5 %, le flux net reçu = (3,5 % − 3 %) × 10 000 000 × 6/12 = 25 000 €, qui compense le surcoût d'intérêts de l'emprunt ; si l'Euribor tombe à 2,5 %, l'entreprise verse 25 000 €, mais son emprunt lui coûte moins cher : dans les deux cas, le coût total reste 3 % plus la marge.
Future : achat de 5 contrats sur obligation d'État à 118,50, revendus à 118,90, multiplicateur 1 000 € par point : résultat = (118,90 − 118,50) × 1 000 × 5 = +2 000 €, versé par appels de marge au fil des jours.

## Erreurs fréquentes
- Inverser le sens du swap : un emprunteur à taux variable se couvre en **payant** le fixe ; un investisseur à taux variable qui redoute une baisse des taux le **reçoit**.
- Croire que le future confère un droit : c'est un engagement ferme ; seul l'option laisse le choix d'exercer.
- Penser qu'un future est forcément dénoué par livraison physique : la plupart des positions sont closes par une opération inverse ou par règlement en espèces.
- Compter le notionnel d'un swap comme un flux : seuls les intérêts nets sont échangés, le capital ne l'est jamais.

## À retenir
- Ferme (future, forward, swap) : gains et pertes symétriques ; optionnel : asymétrie, coût de la prime.
- La chambre de compensation supprime le risque de contrepartie entre opérateurs, au prix des appels de marge (besoin de liquidité).
- Se couvrir contre une hausse des taux d'emprunt : payer le fixe dans le swap ou acheter un cap.
- L'acheteur d'option ne perd jamais plus que la prime ; le vendeur porte le risque.

**Notions liées :** [Couverture du risque de taux](/cours/couverture-taux) · [Couverture du risque de change](/cours/couverture-change) · [Évaluation des options](/cours/evaluation-options) · [Instruments financiers en PCG](/cours/instruments-financiers-pcg)
