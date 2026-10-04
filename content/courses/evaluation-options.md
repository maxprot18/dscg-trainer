# Évaluation des options : parité call-put, modèle binomial, Black-Scholes

**Références :** Cox, Ross et Rubinstein (1979), modèle binomial ; Black et Scholes (1973) et Merton (1973)

- **Valeur d'une option** = valeur intrinsèque + valeur temps. Valeur intrinsèque d'un call : max(S − K ; 0) ; d'un put : max(K − S ; 0).
- **Déterminants** : le call augmente avec S, la volatilité σ, la durée T et le taux r ; il diminue avec K et les dividendes. Le put augmente avec K, σ et (en général) T ; il diminue avec S et r. La hausse de la volatilité augmente la valeur du call **et** du put.
- **Parité call-put** (options européennes, même sous-jacent, même K, même échéance, sans dividende) : C + K (1 + r)⁻ᵀ = P + S, soit en temps continu C − P = S − K e^(−rT). Elle découle de l'absence d'opportunité d'arbitrage.
- **Modèle binomial à une période** : le cours monte à S × u ou baisse à S × d ; probabilité risque-neutre p = (1 + r − d)/(u − d) ; valeur C = [p × C_u + (1 − p) × C_d]/(1 + r). Ratio de couverture (delta) = (C_u − C_d)/(S_u − S_d) : nombre d'actions à détenir pour répliquer l'option.
- **Black-Scholes (call européen, sans dividende)** : C = S × N(d₁) − K e^(−rT) × N(d₂), avec d₁ = [ln(S/K) + (r + σ²/2) T]/(σ√T) et d₂ = d₁ − σ√T ; N = fonction de répartition de la loi normale centrée réduite. Put : P = K e^(−rT) N(−d₂) − S N(−d₁). N(d₁) est le delta du call.
- **Stratégies** : straddle (achat d'un call et d'un put de même K) : pari sur une forte variation ; points morts K ± (somme des primes).
- **Option américaine** : un call américain sur action ne versant pas de dividende n'est jamais exercé avant l'échéance ; il vaut le call européen.

**Formules clés :** C + K(1 + r)⁻ᵀ = P + S ; p = (1 + r − d)/(u − d) ; C = S N(d₁) − K e^(−rT) N(d₂)

## À retenir
- Dans le modèle binomial, p n'est pas une probabilité réelle : la valeur ne dépend pas des anticipations de hausse.
- Dans Black-Scholes, r est un taux continu et le prix d'exercice est actualisé par e^(−rT).
- Oublier d'actualiser K dans la parité call-put est l'erreur la plus fréquente.
