# Coût du capital : MEDAF, coût de la dette, CMPC

**Références :** modèle d'équilibre des actifs financiers (MEDAF, Sharpe-Lintner) ; relation de Hamada (bêta endetté et désendetté) ; déductibilité des intérêts (CGI art. 39, 1-3° et 212 bis) ; méthodes d'évaluation usuelles

**Enjeu :** le CMPC est le taux d'actualisation du DCF et le seuil de rentabilité exigé d'un investissement ; à l'examen, il faut le reconstruire pas à pas (taux sans risque, prime, bêta, coût de la dette net d'impôt, pondérations) et savoir ajuster le bêta à la structure financière.

**Coût des capitaux propres (MEDAF)** : k_CP = r_f + β × [E(R_M) − r_f] ; c'est la rentabilité qu'un actionnaire diversifié exige pour détenir le titre.
- r_f : taux sans risque (emprunt d'État à long terme, OAT 10 ans) ; E(R_M) − r_f : prime de risque du marché (historiquement 4 à 6 %) ; β : sensibilité de la rentabilité du titre à celle du marché, seul le risque systématique (non diversifiable) étant rémunéré.
- Une prime de taille ou de risque spécifique (illiquidité, dépendance à un dirigeant) est parfois ajoutée pour une PME non cotée ; elle se justifie par l'impossibilité pour l'actionnaire de diversifier.

**Coût de la dette après impôt** : k_D × (1 − t), car les intérêts sont déductibles du résultat imposable ; k_D est le taux auquel l'entreprise pourrait s'endetter aujourd'hui (taux de marché), pas le taux historique de ses emprunts.

**CMPC** = k_CP × CP / (CP + D) + k_D × (1 − t) × D / (CP + D), pondérations en valeurs de marché (capitalisation, valeur de la dette) ou selon la structure financière cible ; des valeurs comptables faussent le résultat.

**Bêta désendetté / réendetté (Hamada, dette supposée sans risque)**
- β_CP = β_A × [1 + (1 − t) × D / CP] ; β_A = β_CP / [1 + (1 − t) × D / CP] ; β_A (bêta de l'actif économique) mesure le seul risque d'exploitation.
- Société non cotée : désendetter les bêtas des comparables cotés avec leur propre ratio D / CP, retenir la moyenne ou la médiane des β_A, puis réendetter avec le ratio D / CP de la cible.

**Formules clés :** k_CP = r_f + β × prime ; CMPC = k_CP × CP/V + k_D (1 − t) × D/V ; β_CP = β_A [1 + (1 − t) D/CP]

## Exemple
Société non cotée ; comparables cotés : β_A médian 0,8. Cible : D / CP = 0,5, dette au taux de marché 4 %, IS 25 % ; r_f = 3 %, prime de marché 5 %.
β_CP = 0,8 × [1 + 0,75 × 0,5] = 1,10 ; k_CP = 3 % + 1,10 × 5 % = 8,5 %. Coût de la dette net : 4 % × 0,75 = 3 %.
Pondérations : CP / V = 1 / 1,5 = 66,7 % et D / V = 33,3 %. **CMPC = 8,5 % × 0,667 + 3 % × 0,333 = 6,67 %.**

## Erreurs fréquentes
- Multiplier β par la rentabilité du marché E(R_M) au lieu de la prime E(R_M) − r_f : avec β = 1,1, 3 % + 1,1 × 8 % = 11,8 % au lieu de 8,5 %.
- Réendetter avec D / V au lieu de D / CP dans la formule de Hamada : 0,8 × (1 + 0,75 × 0,333) = 1,0 au lieu de 1,10.
- Retenir directement la moyenne des bêtas des capitaux propres des comparables, ou un bêta de 1 « parce que la société n'est pas cotée » : il faut désendetter puis réendetter.
- Oublier (1 − t) sur le coût de la dette, ou l'appliquer aussi au coût des capitaux propres : seuls les intérêts sont déductibles.

## À retenir
- Le ratio de Hamada est D / CP (dette sur capitaux propres), pas D / (D + CP).
- À risque économique égal, plus l'endettement est élevé, plus β_CP et k_CP augmentent ; le CMPC ne baisse pas mécaniquement avec la dette.
- Ne pas multiplier β par la rentabilité du marché : β s'applique à la prime de risque.
- Pondérations du CMPC en valeurs de marché, coût de la dette au taux actuel du marché.

**Notions liées :** [Actualisation des flux (DCF)](/cours/actualisation-flux-dcf) · [Théorie du portefeuille et MEDAF](/cours/theorie-portefeuille-medaf) · [Rentabilité et effet de levier](/cours/rentabilite-effet-levier) · [Structure du capital et dividendes](/cours/structure-capital-dividendes)
