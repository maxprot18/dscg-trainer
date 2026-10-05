# TVA : territorialité et opérations internationales

**Références :** CGI art. 256 bis, 258 A, 259, 259 A, 259 D, 262 I, 262 ter I, 283-2, 287 et 1695 I ; PCG comptes 4452 et 44566

**Enjeu :** déterminer dans quel État une opération est taxée et qui doit la TVA (vendeur, acquéreur ou preneur) ; à l'examen, la déclaration de TVA d'une entreprise qui vend et achète dans l'Union et hors de l'Union est un cas récurrent.

**Livraisons de biens dans l'Union** : la livraison intracommunautaire (LIC) d'un bien expédié vers un autre État membre à un acquéreur assujetti identifié à la TVA dans cet État est **exonérée** en France (art. 262 ter I). L'exonération suppose que l'acquéreur ait communiqué un numéro d'identification valide et que la LIC figure dans l'état récapitulatif ; la facture est établie HT avec les numéros d'identification du vendeur et de l'acquéreur et la mention de l'exonération. Le vendeur conserve la preuve du transport (documents de transport, bon de livraison).

**Acquisitions intracommunautaires** (AIC, art. 256 bis) : imposables en France à l'arrivée du bien ; l'acquéreur **autoliquide** la TVA : il la déclare (compte 4452 « TVA due intracommunautaire ») et la déduit sur la même déclaration dans les conditions de droit commun (44566). Opération neutre en trésorerie si le droit à déduction est total ; si le coefficient de déduction est inférieur à 1, seule la part déductible est récupérée.

**Échanges avec les pays tiers** : les exportations sont exonérées (art. 262 I), sous réserve de la preuve de la sortie du bien (déclaration d'exportation visée par la douane). Les importations sont taxables ; depuis le 1er janvier 2022, l'assujetti identifié en France **autoliquide** la TVA à l'importation sur sa déclaration au lieu de la payer en douane (art. 287, 5), les montants étant préremplis à partir des déclarations douanières ; le paiement en douane est réservé aux importateurs non assujettis et non identifiés (art. 1695 I).

**Prestations de services** (art. 259) :
- entre assujettis (B to B) : lieu d'imposition = lieu d'établissement du **preneur** ; si le prestataire n'est pas établi en France, le preneur français autoliquide la TVA (art. 283-2) et la déduit selon son droit à déduction ;
- envers un non-assujetti (B to C) : en principe, lieu d'établissement du prestataire ;
- exceptions notables : services se rattachant à un immeuble (lieu de l'immeuble), restauration et transport de passagers (lieu d'exécution) (art. 259 A) ; services électroniques, de télécommunications et de télévision à des particuliers (lieu du preneur, art. 259 D).

**Ventes à distance à des particuliers de l'Union** (art. 258 A et 259 D) : TVA de l'État d'arrivée au-delà d'un seuil annuel de 10 000 € HT (apprécié pour l'ensemble de l'Union, ventes à distance et services électroniques confondus), avec déclaration possible via le guichet unique (OSS) ; en dessous, TVA française.

**Recodification (ord. n° 2025-1247)** : à compter du 1er janvier 2027, ces règles sont reprises à droit constant dans le code des impositions sur les biens et services (ord. n° 2025-1247 du 17 décembre 2025) : les numéros du CGI cités ici changent, pas le fond.

```diagram
{"type":"tree","title":"Où et par qui la TVA est-elle due ? (vendeur français, client assujetti)","root":{"label":"Nature de l'opération","children":[{"edge":"livraison de bien","label":"Destination du bien","children":[{"edge":"autre État membre","label":"LIC exonérée en France","note":"AIC autoliquidée par l'acquéreur dans l'État d'arrivée"},{"edge":"pays tiers","label":"Exportation exonérée","note":"preuve douanière de la sortie"},{"edge":"France","label":"TVA française collectée"}]},{"edge":"prestation de services","label":"Lieu d'établissement du preneur","children":[{"edge":"preneur en France","label":"TVA française","note":"autoliquidée par le preneur si le prestataire est étranger"},{"edge":"preneur hors de France","label":"Non imposable en France","note":"facture HT, TVA due par le preneur dans son État"}]}]}}
```

## Exemple
La SA Kerver (droit à déduction intégral, taux de 20 %) réalise en juin N : ventes en France 150 000 € HT ; LIC à des assujettis italiens 40 000 € ; exportations vers le Maroc 30 000 € ; AIC de marchandises allemandes 50 000 € ; prestation de conseil reçue d'un cabinet belge 10 000 € ; TVA déductible sur achats internes 12 000 €.
TVA collectée : 150 000 × 20 % = 30 000 € (LIC et exportations exonérées). TVA autoliquidée : (50 000 + 10 000) × 20 % = 12 000 €, due **et** déductible. TVA nette = 30 000 + 12 000 − (12 000 + 12 000) = **18 000 €**, soit la seule TVA collectée sur les ventes françaises moins la TVA interne déductible.

## Erreurs fréquentes
- Facturer la TVA française à un client assujetti d'un autre État membre : la LIC est exonérée dès que les conditions sont réunies.
- Qualifier d'exportation une vente vers un État membre : l'exportation suppose une sortie de l'Union.
- Déclarer la TVA autoliquidée sans la déduire (TVA nette surévaluée) ou, à l'inverse, oublier de la déclarer en TVA due.
- Appliquer la règle B to C (lieu du prestataire) à une prestation entre assujettis : c'est le lieu du preneur qui compte.

## À retenir
- LIC exonérée en France, AIC taxée chez l'acquéreur : chaque bien n'est taxé qu'une fois, dans l'État de consommation.
- Autoliquidation = TVA due et TVA déductible du même montant ; ne pas oublier la déduction.
- Exonération ≠ hors champ : une LIC ou une exportation ouvre droit à déduction de la TVA d'amont.

**Notions liées :** [TVA : droit à déduction](/cours/tva-droits-deduction) · [Opérations en devises (PCG)](/cours/operations-devises-pcg) · [Prix de transfert et fiscalité internationale](/cours/prix-transfert-fiscalite-internationale)
