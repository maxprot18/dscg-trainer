# Évaluation des options : parité call-put, modèle binomial, Black-Scholes

**Références :** Cox, Ross et Rubinstein (1979), modèle binomial ; Black et Scholes (1973) et Merton (1973) ; IFRS 2 §B4-B41 (règl. UE 2023/1803) pour l'usage de ces modèles dans l'évaluation des stock-options

**Enjeu :** chiffrer la valeur d'une option et comprendre ses déterminants ; à l'examen, on applique la parité call-put ou le modèle binomial à une période, on lit un résultat de Black-Scholes et on détermine les points morts d'une stratégie.

- **Valeur d'une option** = valeur intrinsèque + valeur temps. Valeur intrinsèque d'un call : max(S − K ; 0) ; d'un put : max(K − S ; 0). La valeur temps rémunère la chance que l'option gagne encore de la valeur avant l'échéance ; elle est maximale à la monnaie (S ≈ K) et nulle à l'échéance.
- **Déterminants** : le call augmente avec S, la volatilité σ, la durée T et le taux r ; il diminue avec K et les dividendes. Le put augmente avec K, σ et (en général) T ; il diminue avec S et r. La hausse de la volatilité augmente la valeur du call **et** du put : l'acheteur profite des variations extrêmes dans le bon sens et sa perte est bornée par la prime dans l'autre.
- **Parité call-put** (options européennes, même sous-jacent, même K, même échéance, sans dividende) : C + K (1 + r)⁻ᵀ = P + S, soit en temps continu C − P = S − K e^(−rT). Elle découle de l'absence d'opportunité d'arbitrage : détenir le call et placer K actualisé donne le même flux à l'échéance que détenir l'action et le put.
- **Modèle binomial à une période** : le cours monte à S × u ou baisse à S × d ; probabilité risque-neutre p = (1 + r − d)/(u − d) ; valeur C = [p × C_u + (1 − p) × C_d]/(1 + r). Ratio de couverture (delta) = (C_u − C_d)/(S_u − S_d) : nombre d'actions à détenir pour répliquer l'option. Sur plusieurs périodes, on remonte l'arbre de l'échéance vers aujourd'hui.
- **Black-Scholes (call européen, sans dividende)** : C = S × N(d₁) − K e^(−rT) × N(d₂), avec d₁ = [ln(S/K) + (r + σ²/2) T]/(σ√T) et d₂ = d₁ − σ√T ; N = fonction de répartition de la loi normale centrée réduite. Put : P = K e^(−rT) N(−d₂) − S N(−d₁). N(d₁) est le delta du call ; N(d₂) s'interprète comme la probabilité risque-neutre d'exercice.
- **Stratégies** : straddle (achat d'un call et d'un put de même K) : pari sur une forte variation ; points morts K ± (somme des primes). Pour K = 50 €, primes 3 € et 2,50 €, le straddle gagne si le cours sort de l'intervalle [44,50 € ; 55,50 €].
- **Option américaine** : un call américain sur action ne versant pas de dividende n'est jamais exercé avant l'échéance (sa valeur temps est toujours positive) ; il vaut le call européen. Un put américain peut en revanche valoir plus que le put européen.

```diagram
{"type":"tree","title":"Arbre binomial à une période de l'exemple (S = 100, K = 100)","root":{"label":"S = 100 ; C = 8,97 €","note":"p = 0,4667 ; delta = 0,667","children":[{"edge":"hausse ×1,2","label":"S = 120 ; C_u = 20"},{"edge":"baisse ×0,9","label":"S = 90 ; C_d = 0"}]}}
```

**Formules clés :** C + K(1 + r)⁻ᵀ = P + S ; p = (1 + r − d)/(u − d) ; C = S N(d₁) − K e^(−rT) N(d₂)

## Exemple
Action à 100 €, qui vaudra 120 € ou 90 € dans un an ; call européen K = 100 €, taux sans risque 4 %.
p = (1,04 − 0,9)/(1,2 − 0,9) = 0,4667 ; C_u = 20, C_d = 0 ; C = (0,4667 × 20 + 0,5333 × 0)/1,04 = 8,97 €. Delta = (20 − 0)/(120 − 90) = 0,667 : le call se réplique en achetant 2/3 d'action financés par un emprunt.
Parité : P = C + K/(1 + r) − S = 8,97 + 96,15 − 100 = 5,13 € ; le calcul direct du put (P_u = 0, P_d = 10) donne (0,5333 × 10)/1,04 = 5,13 € : les deux approches concordent.

## Erreurs fréquentes
- Oublier d'actualiser K dans la parité call-put (P = C + K − S = 8,97 € au lieu de 5,13 €).
- Penser qu'une hausse de la volatilité diminue la valeur du put ou « augmente le risque, donc baisse les deux options » : elle augmente les deux.
- Calculer les points morts d'un straddle avec une seule prime (K ± 3 €) au lieu de la somme des deux primes.
- Remplacer p par une probabilité réelle de hausse estimée par l'investisseur : la valeur de l'option n'en dépend pas, c'est tout l'intérêt du raisonnement par réplication.

## À retenir
- Dans le modèle binomial, p n'est pas une probabilité réelle : la valeur ne dépend pas des anticipations de hausse.
- Dans Black-Scholes, r est un taux continu et le prix d'exercice est actualisé par e^(−rT).
- Oublier d'actualiser K dans la parité call-put est l'erreur la plus fréquente.
- Call américain sans dividende = call européen ; ce n'est pas vrai pour le put.

**Notions liées :** [Produits dérivés](/cours/produits-derives) · [Options réelles](/cours/options-reelles) · [Couverture du risque de change](/cours/couverture-change)
