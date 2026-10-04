# Critères de choix d'investissement : VAN, TRI, TRIG, indice de profitabilité, délai de récupération

**Références :** calcul financier (actualisation) ; Fisher (taux d'indifférence) ; flux en fin d'année sauf mention contraire

**Enjeu :** une fois les flux construits, il faut conclure : accepter ou non, et classer des projets concurrents ; l'examen attend le calcul des critères, leur interprétation et la résolution d'un conflit VAN / TRI en faveur de la VAN.

- **VAN** = −I₀ + Σ FNTₜ (1 + k)⁻ᵗ, k = coût du capital. Projet accepté si VAN > 0 : il rapporte plus que le rendement exigé par les apporteurs de fonds et crée de la valeur pour cet écart. Entre projets exclusifs de même taille et même durée, la plus forte VAN.
- **TRI** : taux qui annule la VAN. Projet accepté si TRI > k. Calcul par encadrement puis interpolation linéaire (ou résolution numérique). Il suppose implicitement le réinvestissement des flux au TRI lui-même, hypothèse optimiste si le TRI est élevé.
- **Indice de profitabilité** IP = Σ FNTₜ (1 + k)⁻ᵗ / I₀ = 1 + VAN / I₀. Accepté si IP > 1 ; utile pour classer des projets de tailles différentes sous contrainte de capital (valeur créée par euro investi).
- **Délai de récupération actualisé (DRA)** : date à laquelle le cumul des flux actualisés couvre I₀ (interpolation linéaire dans l'année). Critère de liquidité et de risque, qui ignore les flux postérieurs et ne mesure pas la rentabilité.
- **TRIG (taux de rendement interne global)** : les flux sont capitalisés jusqu'à l'horizon n au taux de réinvestissement r ; (1 + TRIG)ⁿ = Σ FNTₜ (1 + r)ⁿ⁻ᵗ / I₀. Corrige l'hypothèse implicite du TRI ; la VANG applique la même logique à la VAN.

**Conflit VAN / TRI** : pour deux projets exclusifs, les courbes de VAN peuvent se croiser au **taux d'indifférence (taux de Fisher)**, TRI du projet différentiel (flux de A − flux de B). Si k est inférieur à ce taux, le classement par la VAN diffère de celui par le TRI : la VAN prime (création de valeur en euros, hypothèse de réinvestissement au coût du capital). Le conflit vient de tailles ou de profils de flux différents (flux tardifs favorisés par la VAN à taux bas).

**Formules clés :** facteur d'annuité = [1 − (1 + k)⁻ⁿ] / k ; IP = 1 + VAN / I₀

## Exemple
Investissement de 200 000 € en date 0, flux nets de 60 000 € en fin d'année pendant 5 ans, coût du capital 8 %.
Facteur d'annuité = (1 − 1,08⁻⁵) / 0,08 = 3,9927 ; VAN = 60 000 × 3,9927 − 200 000 = 39 563 € ; IP = 239 563 / 200 000 = 1,198 (1,20 € récupéré par euro investi).
TRI : 60 000 × a(TRI, 5) = 200 000 d'où a = 3,3333 ; par encadrement (a = 3,3522 à 15 %, 3,2743 à 16 %), TRI ≈ 15,2 % > 8 %.
DRA : flux actualisés cumulés 55 556 ; 106 996 ; 154 626 ; 198 728 ; 239 563. I₀ est couvert entre les années 4 et 5 : DRA = 4 + (200 000 − 198 728) / 40 835 = 4,03 ans (contre 200 000 / 60 000 = 3,33 ans non actualisé).

```diagram
{"type":"bars","title":"VAN du projet de l'exemple selon le taux d'actualisation (€)","unit":"€","items":[{"label":"0 %","value":100000},{"label":"8 % (coût du capital)","value":39563},{"label":"15,2 % (TRI)","value":0},{"label":"20 %","value":-20563}]}
```

## Erreurs fréquentes
- Confondre l'indice de profitabilité avec VAN / I₀ : IP = 1 + VAN / I₀ ; ici 1,198 et non 0,198.
- Classer deux projets exclusifs par le TRI quand la VAN désigne l'autre : au coût du capital de l'entreprise, c'est la VAN qui mesure la valeur créée.
- Croire que le taux d'indifférence est le TRI du meilleur projet : c'est le TRI des flux différentiels, point où les deux VAN sont égales.
- Lire le délai de récupération comme un critère de rentabilité : il mesure la vitesse de retour des fonds et néglige les flux au-delà.

## À retenir
- En cas de conflit entre projets exclusifs, retenir la VAN (ou la VANG / le TRIG avec un taux de réinvestissement explicite).
- Le TRI peut être multiple si les flux changent plusieurs fois de signe.
- Le délai de récupération non actualisé est plus court que le DRA ; aucun des deux ne mesure la rentabilité.

**Notions liées :** [Flux de trésorerie d'un projet](/cours/flux-tresorerie-projet) · [Coût du capital, CMPC et MEDAF](/cours/cout-capital-cmpc-medaf) · [Investissement en avenir risqué et incertain](/cours/investissement-avenir-incertain) · [Options réelles](/cours/options-reelles)
