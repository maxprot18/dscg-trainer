# Évaluation des obligations : taux actuariel, duration, sensibilité, convexité

**Références :** mathématiques financières (actualisation des flux) ; PCG (règl. ANC 2014-03), comptes 506 « Obligations », 5088 « Intérêts courus sur obligations, bons et valeurs assimilées » et 764 « Revenus des valeurs mobilières de placement »

**Enjeu :** mesurer et gérer le risque de taux d'un portefeuille obligataire ; à l'examen, on calcule un prix, une duration et une sensibilité, puis on compare l'effet d'une variation des taux à l'approximation linéaire.

- **Prix** : P = Σ F_t (1 + r)⁻ᵗ, où F_t = coupons puis remboursement, r = taux actuariel du marché. Les cotations se font en pourcentage du nominal, **pied de coupon** (hors coupon couru) ; prix payé = cours × nominal + coupon couru.
- **Taux actuariel (rendement à l'échéance)** : taux r qui égalise le prix et la valeur actuelle des flux restants ; calcul par interpolation ou tableur. Coupon < taux du marché ⇒ prix sous le pair (décote) ; coupon > taux ⇒ prime ; coupon = taux ⇒ prix au pair. Si les taux du marché montent après l'émission, le coupon fixe devient moins attractif et le prix baisse jusqu'à ce que l'acheteur obtienne le nouveau taux.
- **Relation prix-taux** : décroissante et convexe. La hausse des taux fait baisser le prix (risque de taux, qui ne se réalise qu'en cas de vente avant l'échéance) mais améliore le taux de replacement des coupons (risque de réinvestissement).
- **Duration de Macaulay** : D = Σ t × F_t (1 + r)⁻ᵗ / P ; durée de vie moyenne des flux pondérée par leurs valeurs actuelles, en années. Pour une obligation in fine à coupons, D < maturité ; pour un zéro-coupon, D = maturité. D diminue quand le coupon ou le taux augmente (les flux proches pèsent davantage).
- **Sensibilité (duration modifiée)** : S = D / (1 + r) ; variation relative du prix ≈ −S × Δr. Une sensibilité de 4 signifie qu'une hausse de 1 point des taux fait baisser le prix d'environ 4 %.
- **Convexité** : l'approximation par la sensibilité est linéaire ; elle sous-estime le prix réel quand les taux baissent comme quand ils montent. À duration égale, l'obligation la plus convexe gagne plus à la baisse des taux et perd moins à la hausse : la convexité est un avantage pour le porteur, pas un risque supplémentaire.
- **Immunisation** : un portefeuille dont la duration égale l'horizon de placement neutralise en première approximation le risque de taux (effet prix et effet réinvestissement se compensent) ; il faut le rééquilibrer à mesure que le temps passe et que les taux bougent.
- **Comptabilisation** : à l'achat, le coupon couru n'entre pas dans le coût d'entrée du titre : il est débité au 5088 ; à l'encaissement du coupon, le 5088 est soldé et le reste est un produit (764).

**Formules clés :** P = Σ F_t (1 + r)⁻ᵗ ; D = Σ t F_t (1 + r)⁻ᵗ / P ; ΔP/P ≈ −D/(1 + r) × Δr

## Exemple
Obligation de nominal 1 000 €, coupon annuel 4 %, remboursée au pair dans 3 ans ; taux du marché 5 %.
Prix = 40/1,05 + 40/1,05² + 1 040/1,05³ = 38,10 + 36,28 + 898,39 = 972,77 € (sous le pair : coupon 4 % < taux 5 %).
Duration = (1 × 38,10 + 2 × 36,28 + 3 × 898,39) / 972,77 = 2,884 ans ; sensibilité = 2,884 / 1,05 = 2,747.
Si le taux passe à 6 %, l'approximation donne 972,77 × (1 − 2,747 × 0,01) = 946,05 € ; le prix exact est 40/1,06 + 40/1,06² + 1 040/1,06³ = 946,54 €. L'écart de 0,49 € est l'effet de convexité, favorable au porteur. À 4 %, le prix revient au pair (1 000 €) ; à 3 %, il vaut 1 028,29 €.

```diagram
{"type":"bars","title":"Prix de l'obligation (coupon 4 %, 3 ans) selon le taux du marché","unit":"€","items":[{"label":"Taux 3 %","value":1028.29},{"label":"Taux 4 %","value":1000},{"label":"Taux 5 %","value":972.77},{"label":"Taux 6 %","value":946.54}]}
```

## Erreurs fréquentes
- Penser qu'une hausse des taux laisse le prix au pair « puisque le coupon ne change pas » : c'est précisément parce que le coupon est fixe que le prix doit baisser pour offrir le nouveau rendement.
- Utiliser la duration D comme sensibilité : la sensibilité est D / (1 + r) ; l'oubli surestime la variation de prix.
- Voir dans une convexité élevée un risque accru : à duration égale, l'obligation plus convexe se comporte mieux dans les deux sens de variation des taux.
- Inclure le coupon couru dans le coût d'entrée du titre (compte 506) : il va au 5088 et sera récupéré au prochain détachement.

## À retenir
- Ne pas confondre taux nominal (calcul du coupon) et taux actuariel (actualisation).
- Sensibilité = D/(1 + r), pas D ; la variation de prix approchée est −S × Δr.
- L'écart entre prix réel et approximation par la sensibilité mesure l'effet de convexité, toujours favorable au porteur.
- Zéro-coupon : duration = maturité ; obligation à coupons : duration < maturité.

**Notions liées :** [Risque de taux : exposition](/cours/risque-taux-exposition) · [Couverture du risque de taux](/cours/couverture-taux) · [Financement par fonds propres et emprunt obligataire](/cours/financement-fonds-propres-obligataire) · [Instruments financiers en PCG](/cours/instruments-financiers-pcg)
