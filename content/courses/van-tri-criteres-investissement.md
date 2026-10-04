# Critères de choix d'investissement : VAN, TRI, TRIG, indice de profitabilité, délai de récupération

**Références :** calcul financier (actualisation) ; Fisher (taux d'indifférence) ; flux en fin d'année sauf mention contraire

- **VAN** = −I₀ + Σ FNTₜ (1 + k)⁻ᵗ, k = coût du capital. Projet accepté si VAN > 0 ; entre projets exclusifs de même taille et même durée, la plus forte VAN.
- **TRI** : taux qui annule la VAN. Projet accepté si TRI > k. Calcul par encadrement puis interpolation linéaire (ou résolution numérique).
- **Indice de profitabilité** IP = Σ FNTₜ (1 + k)⁻ᵗ / I₀ = 1 + VAN / I₀. Accepté si IP > 1 ; utile pour classer des projets sous contrainte de capital.
- **Délai de récupération actualisé (DRA)** : date à laquelle le cumul des flux actualisés couvre I₀ (interpolation linéaire dans l'année). Critère de liquidité et de risque, qui ignore les flux postérieurs.
- **TRIG (taux de rendement interne global)** : les flux sont capitalisés jusqu'à l'horizon n au taux de réinvestissement r ; (1 + TRIG)ⁿ = Σ FNTₜ (1 + r)ⁿ⁻ᵗ / I₀. Corrige l'hypothèse implicite du TRI (réinvestissement au TRI lui-même).

**Conflit VAN / TRI** : pour deux projets exclusifs, les courbes de VAN peuvent se croiser au **taux d'indifférence (taux de Fisher)**, TRI du projet différentiel. Si k est inférieur à ce taux, le classement par la VAN diffère de celui par le TRI : la VAN prime (création de valeur en euros).

**Formules clés :** facteur d'annuité = [1 − (1 + k)⁻ⁿ] / k ; IP = 1 + VAN / I₀

## À retenir
- En cas de conflit entre projets exclusifs, retenir la VAN (ou la VANG / le TRIG avec un taux de réinvestissement explicite).
- Le TRI peut être multiple si les flux changent plusieurs fois de signe.
- Le délai de récupération non actualisé est plus court que le DRA ; aucun des deux ne mesure la rentabilité.
