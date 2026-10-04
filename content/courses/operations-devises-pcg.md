# Opérations en devises et écarts de conversion

**Références :** PCG art. 420-1 s. (règl. ANC 2014-03 modifié par le règl. ANC 2015-05) ; comptes 476, 477, 1515, 656, 756, 666, 766, 6865, 7865

**Enjeu :** une créance ou une dette en devises change de valeur en euros jusqu'à son règlement ; l'examen vérifie que l'on isole l'écart latent au bilan (476 / 477) sans toucher au résultat, que l'on provisionne la perte latente et que l'on calcule le résultat réalisé par rapport au cours historique.

**Date d'opération** : créances, dettes, achats et ventes en devises sont convertis au **cours du jour de l'opération** (ou cours moyen d'une période proche si les variations sont faibles). Le produit ou la charge reste figé à ce cours historique : seules la créance ou la dette seront réévaluées.

**Clôture** : les créances et dettes en devises non réglées sont converties au **cours de clôture**. L'écart avec la valeur historique n'est pas porté en résultat mais dans un compte de régularisation :
- hausse d'une dette ou baisse d'une créance = **perte latente** → débit du compte **476** « Différences de conversion – Actif » ;
- baisse d'une dette ou hausse d'une créance = **gain latent** → crédit du compte **477** « Différences de conversion – Passif ».
Les écarts sont **contrepassés à l'ouverture** de l'exercice suivant, ce qui remet la créance ou la dette à sa valeur historique.

**Prudence** : la perte latente donne lieu à une **provision pour perte de change (1515)** par le débit de 6865 ; le gain latent n'est jamais comptabilisé en produit. La provision peut être limitée à la perte nette lorsque créances et dettes dans la même devise ont des **échéances voisines** (position globale de change), ou réduite lorsque l'opération est couverte (couverture de change) ; pour un emprunt en devises à long terme, elle peut être étalée sur la durée restante.

**Liquidités en devises** : converties au cours de clôture, l'écart est directement porté en résultat (gain ou perte de change financier, 766 / 666), car il n'y a pas d'incertitude de réalisation.

**Règlement** : l'écart entre la valeur historique et le montant réglé est un gain ou une perte de change **réalisé** : **656 / 756** pour les créances et dettes commerciales, **666 / 766** pour les opérations financières (emprunts, prêts). La provision devenue sans objet est reprise (1515 / 7865).

```diagram
{"type":"flow","title":"Créance en devises : de la facture au règlement","steps":[{"label":"Facturation","note":"conversion au cours du jour, produit figé"},{"label":"Clôture","note":"cours de clôture : perte latente 476, gain latent 477"},{"label":"Provision","note":"1515 pour la perte latente ; rien pour le gain"},{"label":"Ouverture N+1","note":"contrepassation du 476 ou 477"},{"label":"Règlement","note":"écart / cours historique en 656 ou 756 ; reprise de la provision"}]}
```

**Formule clé :** écart de conversion = montant en devises × (cours de clôture − cours historique)

## Exemple
Le 15/11/N, la société Norma vend pour 50 000 USD à un client américain (1 USD = 0,92 €), échéance 15/02/N+1. Cours au 31/12/N : 0,90 € ; cours au 15/02/N+1 : 0,91 €.
Facturation : créance 411 = 50 000 × 0,92 = **46 000 €**. Clôture : valeur au cours de clôture 45 000 €, perte latente **1 000 €** : débit 476, crédit 411 pour 1 000 ; provision : débit 6865, crédit 1515 pour 1 000.
Ouverture N+1 : contrepassation (411 / 476), la créance revient à 46 000 €. Règlement : encaissement 50 000 × 0,91 = 45 500 € ; perte réalisée = 46 000 − 45 500 = **500 €** : débit 512 45 500 et 656 500, crédit 411 46 000 ; reprise de la provision : 1515 / 7865 pour 1 000 €.

## Erreurs fréquentes
- Constater un produit de change à la clôture sur un gain latent : il va au crédit du 477 et n'entre jamais en résultat avant le règlement.
- Inverser 476 et 477 : le 476 est un actif (perte latente, à provisionner), le 477 un passif (gain latent).
- Laisser la dette au cours historique « jusqu'au règlement » : la conversion au cours de clôture est obligatoire pour toutes les créances et dettes en devises.
- Compenser pertes et gains latents sur des créances et dettes d'échéances éloignées : la position globale de change ne vaut que pour des échéances voisines dans une même devise.

## À retenir
- 476 = perte latente (actif) ; 477 = gain latent (passif) : jamais de passage en résultat à la clôture.
- La perte réalisée au règlement se calcule par rapport au cours historique, l'écart de conversion ayant été contrepassé.
- Un compte bancaire en devises n'est pas une créance : son écart va directement en résultat.

**Notions liées :** [Couverture du risque de change](/cours/couverture-change) · [Exposition au risque de change](/cours/risque-change-exposition) · [Conversion des états financiers](/cours/conversion-etats-financiers) · [Cadre comptable et principes](/cours/cadre-comptable-principes)
