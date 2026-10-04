# Risque de taux : mesure de l'exposition

**Références :** mathématiques financières des obligations ; IFRS 7 §40-41 (analyse de sensibilité) (règl. UE 2023/1803)

**Enjeu :** savoir si une hausse des taux coûte ou rapporte à l'entreprise selon la nature fixe ou variable de ses actifs et dettes, et chiffrer l'effet d'une variation de taux sur un résultat (impasse) ou sur une valeur (duration, sensibilité) : questions classiques de calcul à l'examen.

**Deux formes de risque de taux**
- **Risque de flux** (de revenu) : sur les actifs et passifs à **taux variable** ; une hausse des taux renchérit la dette variable, une baisse réduit le rendement des placements variables. La valeur de l'élément, elle, ne bouge pratiquement pas puisque le coupon se réajuste.
- **Risque de valeur** (de cours) : sur les éléments à **taux fixe** ; une hausse des taux fait baisser la valeur d'une obligation détenue ; une baisse des taux crée un coût d'opportunité pour l'emprunteur à taux fixe (valeur actuelle de sa dette en hausse), sans effet sur ses flux d'intérêts.

**Impasse (gap) de taux** sur une période = actifs à taux variable − passifs à taux variable (de façon équivalente : passifs à taux fixe − actifs à taux fixe). Effet annuel d'une variation de taux sur le résultat ≈ impasse × Δtaux : une impasse négative (dette variable dominante) fait perdre en cas de hausse.

**Duration** (de Macaulay) : moyenne des dates des flux pondérée par leur valeur actuelle ; elle mesure la durée de vie moyenne actualisée du titre. Une obligation zéro coupon a une duration égale à sa maturité ; plus le coupon est élevé (ou le taux de marché haut), plus la duration est courte, car les flux proches pèsent davantage.

**Sensibilité** = D / (1 + r) (duration modifiée) : variation relative du prix pour une variation d'un point du taux actuariel. C'est une approximation linéaire, correcte pour de faibles variations ; la convexité explique l'écart pour les grandes.

**Immunisation** : un placement dont la duration égale l'horizon de détention est protégé contre une variation de taux immédiate et unique : l'effet sur le prix et l'effet sur le réinvestissement des coupons se compensent.

**Formules clés :** D = Σ t × Fₜ (1 + r)⁻ᵗ / P ; ΔP / P ≈ − D / (1 + r) × Δr ; effet sur le résultat ≈ impasse × Δr

## Exemple
Obligation de nominal 1 000 €, coupon annuel 5 %, 3 ans restant à courir, taux de marché 4 %.
Prix P = 50 / 1,04 + 50 / 1,04² + 1 050 / 1,04³ = 1 027,75 €. Duration D = (1 × 50 / 1,04 + 2 × 50 / 1,04² + 3 × 1 050 / 1,04³) / 1 027,75 = 2,86 ans ; sensibilité = 2,86 / 1,04 = 2,75.
Si le taux passe à 5 % : ΔP ≈ −2,75 × 1 % × 1 027,75 = −28,3 € ; le prix exact recalculé à 5 % est de 1 000 € (−27,75 €), l'écart venant de la convexité.
Impasse : une société a 2 M€ de placements à taux variable et 6 M€ d'emprunts à taux variable ; impasse = 2 − 6 = −4 M€. Une hausse de 0,5 point coûte 4 000 000 × 0,5 % = 20 000 € par an.

## Erreurs fréquentes
- Croire qu'une baisse des taux réduit les charges d'un emprunt à taux fixe : les flux sont figés ; l'emprunteur subit seulement un coût d'opportunité (valeur actuelle de la dette en hausse).
- Compter les emprunts à taux fixe dans l'impasse de taux : seuls les éléments à taux variable modifient le résultat de la période.
- Confondre duration et sensibilité : la sensibilité est la duration divisée par (1 + r), c'est elle qui donne la variation relative du prix.
- Attribuer à une obligation à coupon une duration égale à sa maturité : ce n'est vrai que pour un zéro coupon.

## À retenir
- Taux fixe = risque de valeur ; taux variable = risque de flux.
- Hausse des taux : le prix baisse, mais les coupons sont réinvestis à un taux plus élevé.
- Ne pas oublier de diviser la duration par (1 + r) pour obtenir la sensibilité.

**Notions liées :** [Couverture du risque de taux](/cours/couverture-taux) · [Évaluation des obligations et duration](/cours/evaluation-obligations-duration) · [Risque de crédit, de contrepartie et de liquidité](/cours/risque-credit-contrepartie)
