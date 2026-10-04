# Évaluation des obligations : taux actuariel, duration, sensibilité, convexité

**Références :** mathématiques financières (actualisation des flux) ; PCG (règl. ANC 2014-03), comptes 506 « Obligations » et 5088 « Intérêts courus sur obligations, bons et valeurs assimilées »

- **Prix** : P = Σ F_t (1 + r)⁻ᵗ, où F_t = coupons puis remboursement, r = taux actuariel du marché. Les cotations se font en pourcentage du nominal, **pied de coupon** (hors coupon couru) ; prix payé = cours × nominal + coupon couru.
- **Taux actuariel (rendement à l'échéance)** : taux r qui égalise le prix et la valeur actuelle des flux restants ; calcul par interpolation ou tableur. Coupon < taux du marché ⇒ prix sous le pair (décote) ; coupon > taux ⇒ prime.
- **Relation prix-taux** : décroissante et convexe. La hausse des taux fait baisser le prix (risque de taux) mais améliore le taux de replacement des coupons (risque de réinvestissement).
- **Duration de Macaulay** : D = Σ t × F_t (1 + r)⁻ᵗ / P ; durée de vie moyenne des flux pondérée par leurs valeurs actuelles. Pour une obligation in fine à coupons, D < maturité ; pour un zéro-coupon, D = maturité. D diminue quand le coupon ou le taux augmente.
- **Sensibilité (duration modifiée)** : S = D / (1 + r) ; variation relative du prix ≈ −S × Δr. Une sensibilité de 4 signifie qu'une hausse de 1 point des taux fait baisser le prix d'environ 4 %.
- **Convexité** : l'approximation par la sensibilité est linéaire ; elle sous-estime le prix réel quand les taux baissent comme quand ils montent. À duration égale, l'obligation la plus convexe gagne plus à la baisse des taux et perd moins à la hausse.
- **Immunisation** : un portefeuille dont la duration égale l'horizon de placement neutralise en première approximation le risque de taux (effet prix et effet réinvestissement se compensent).
- **Comptabilisation** : à l'achat, le coupon couru n'entre pas dans le coût d'entrée du titre : il est débité au 5088 ; à l'encaissement du coupon, le 5088 est soldé et le reste est un produit (764).

**Formules clés :** P = Σ F_t (1 + r)⁻ᵗ ; D = Σ t F_t (1 + r)⁻ᵗ / P ; ΔP/P ≈ −D/(1 + r) × Δr

## À retenir
- Ne pas confondre taux nominal (calcul du coupon) et taux actuariel (actualisation).
- Sensibilité = D/(1 + r), pas D.
- L'écart entre prix réel et approximation par la sensibilité mesure l'effet de convexité, toujours favorable au porteur.
