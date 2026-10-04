# Couverture du risque de taux : FRA, swaps, caps et floors

**Références :** IFRS 9 §6.1-6.5 (règl. UE 2023/1803) ; PCG art. 628-1 s. (règl. ANC 2014-03 modifié par le règl. ANC 2015-05)

**Enjeu :** choisir l'instrument qui correspond au risque (hausse ou baisse, période unique ou plusieurs échéances, protection ferme ou optionnelle) et chiffrer son règlement : le calcul du différentiel d'un FRA ou d'un cap et le coût d'une dette swapée sont des questions récurrentes.

**FRA (Forward Rate Agreement)** : contrat de gré à gré qui garantit un taux pour une période future unique (FRA 3 × 9 : départ dans 3 mois, fin dans 9 mois, soit 6 mois garantis). Pas d'échange de capital : seul un différentiel est réglé, au début de la période garantie, donc actualisé au taux constaté. L'**acheteur** (futur emprunteur) se protège contre la hausse ; il reçoit si le taux de référence dépasse le taux garanti et paie dans le cas inverse.

**Swap de taux** : échange, sur un nominal notionnel non échangé, d'un taux fixe contre un taux variable ; seul le différentiel net est payé à chaque échéance, sur toute la durée du contrat. Un emprunteur à taux variable qui conclut un swap **payeur du fixe / receveur du variable** transforme sa dette en dette à taux fixe (coût = taux fixe du swap + marge de son emprunt) ; le swap inverse rend variable une dette à taux fixe.

**Options de taux** (prime payée d'avance)
- **Cap** : taux plafond ; l'acheteur reçoit (taux de référence − taux plafond) × nominal × durée de la période, si positif. Protège l'emprunteur à taux variable, qui garde le bénéfice d'une baisse ; la marge de l'emprunt n'entre pas dans la comparaison.
- **Floor** : taux plancher ; protège le prêteur ou le placeur à taux variable contre la baisse.
- **Tunnel (collar)** : achat d'un cap et vente d'un floor ; la prime reçue sur le floor réduit le coût, mais l'emprunteur renonce à la baisse sous le plancher.

```diagram
{"type":"tree","title":"Emprunteur à taux variable : quel instrument contre la hausse ?","root":{"label":"Veut-il garder le bénéfice d'une baisse ?","children":[{"edge":"non (ferme)","label":"Une seule période future ?","children":[{"edge":"oui","label":"Achat de FRA"},{"edge":"non","label":"Swap payeur du fixe"}]},{"edge":"oui (option)","label":"Accepte-t-il de payer toute la prime ?","children":[{"edge":"oui","label":"Achat d'un cap"},{"edge":"non","label":"Collar : cap acheté + floor vendu"}]}]}}
```

**Comptabilité** : PCG, symétrie avec l'élément couvert (le différentiel d'un swap de couverture ajuste la charge d'intérêts) ; IFRS 9, un swap qui fixe les intérêts d'une dette variable est une couverture de flux de trésorerie, un swap qui rend variable une dette à taux fixe une couverture de juste valeur.

**Formules clés :** différentiel FRA réglé en début de période = N × (r_réf − r_FRA) × d/360 / (1 + r_réf × d/360) ; compensation cap = N × max(r_réf − r_cap ; 0) × d/360

## Exemple
FRA : une société empruntera 5 M€ dans 3 mois pour 6 mois (180 jours) ; elle achète un FRA 3 × 9 au taux garanti de 3 %. Dans 3 mois, l'Euribor 6 mois est à 4 %.
Différentiel = 5 000 000 × (4 % − 3 %) × 180/360 / (1 + 4 % × 180/360) = 25 000 / 1,02 = 24 510 €, reçus au début de la période ; placés à 4 % sur 6 mois, ils redonnent 25 000 €, soit exactement le surcoût de l'emprunt.
Swap : un emprunt de 10 M€ à Euribor 6 mois + 1 %, swapé payeur du fixe 3,5 % / receveur Euribor. Semestre où l'Euribor vaut 2 % : intérêts 10 M€ × 3 % / 2 = 150 000 €, swap net versé 10 M€ × (3,5 % − 2 %) / 2 = 75 000 € ; total 225 000 €, soit 4,5 % l'an quel que soit l'Euribor.

## Erreurs fréquentes
- Pour fixer le coût d'une dette variable, conclure un swap receveur du fixe : c'est le swap payeur du fixe / receveur du variable qui la transforme en dette fixe.
- Comparer l'Euribor au taux plafond majoré de la marge de l'emprunt : le cap porte sur le taux de référence seul ; la marge reste due dans tous les cas.
- Régler le différentiel du FRA sans l'actualiser : il est payé au début de la période garantie, donc divisé par (1 + r_réf × d/360).
- Vendre un cap pour se protéger de la hausse : le vendeur encaisse la prime et supporte le risque ; la protection s'achète.

## À retenir
- Le FRA et le swap ferment le risque dans les deux sens ; le cap protège en laissant profiter de la baisse.
- Le nominal d'un swap de taux n'est jamais échangé : le risque de contrepartie porte sur la valeur de remplacement.
- Le règlement du FRA est actualisé car il intervient au début de la période garantie.

**Notions liées :** [Risque de taux : mesure de l'exposition](/cours/risque-taux-exposition) · [Produits dérivés](/cours/produits-derives) · [Couverture du risque de change](/cours/couverture-change) · [IFRS 9 — Instruments financiers](/cours/ifrs-9-instruments-financiers)
