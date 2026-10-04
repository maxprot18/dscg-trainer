# Couverture du risque de taux : FRA, swaps, caps et floors

**Références :** IFRS 9 §6.1-6.5 (règl. UE 2023/1803) ; PCG art. 628-1 s. (règl. ANC 2014-03 modifié par le règl. ANC 2015-05)

**FRA (Forward Rate Agreement)** : contrat de gré à gré qui garantit un taux pour une période future (FRA 3 × 9 : départ dans 3 mois, fin dans 9 mois). Pas d'échange de capital : seul un différentiel est réglé. L'**acheteur** (futur emprunteur) se protège contre la hausse ; il reçoit si le taux de référence dépasse le taux garanti.

**Swap de taux** : échange, sur un nominal notionnel non échangé, d'un taux fixe contre un taux variable ; seul le différentiel net est payé à chaque échéance. Un emprunteur à taux variable qui conclut un swap **payeur du fixe / receveur du variable** transforme sa dette en dette à taux fixe (coût = taux fixe du swap + marge de son emprunt).

**Options de taux** (prime payée d'avance)
- **Cap** : taux plafond ; l'acheteur reçoit (taux de référence − taux plafond) × nominal × durée de la période, si positif. Protège l'emprunteur à taux variable.
- **Floor** : taux plancher ; protège le prêteur ou le placeur à taux variable contre la baisse.
- **Tunnel (collar)** : achat d'un cap et vente d'un floor ; la prime reçue sur le floor réduit le coût, mais l'emprunteur renonce à la baisse sous le plancher.

**Comptabilité** : PCG, symétrie avec l'élément couvert (le différentiel d'un swap de couverture ajuste la charge d'intérêts) ; IFRS 9, un swap qui fixe les intérêts d'une dette variable est une couverture de flux de trésorerie, un swap qui rend variable une dette à taux fixe une couverture de juste valeur.

**Formules clés :** différentiel FRA réglé en début de période = N × (r_réf − r_FRA) × d/360 / (1 + r_réf × d/360) ; compensation cap = N × max(r_réf − r_cap ; 0) × d/360

## À retenir
- Le FRA et le swap ferment le risque dans les deux sens ; le cap protège en laissant profiter de la baisse.
- Le nominal d'un swap de taux n'est jamais échangé : le risque de contrepartie porte sur la valeur de remplacement.
- Le règlement du FRA est actualisé car il intervient au début de la période garantie.
