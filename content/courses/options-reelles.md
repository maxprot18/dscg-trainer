# Options réelles et flexibilité des projets

**Références :** Myers (1977) ; modèle binomial (Cox, Ross, Rubinstein, 1979) ; Black et Scholes (1973)

Une **option réelle** est le droit, non l'obligation, de modifier un projet après l'obtention d'informations nouvelles. La VAN classique, qui suppose une décision figée, la sous-estime.

**Principales options**
- Option de **développement** (extension) : investir plus si les résultats sont bons → assimilable à un call.
- Option de **différer** (attendre) : lancer plus tard si les conditions sont favorables → call.
- Option d'**abandon** : arrêter et revendre les actifs si le projet déçoit → put dont le prix d'exercice est la valeur de revente.
- Options de flexibilité : changer d'intrant, de produit, d'échelle.

**Analogie avec les options financières** : sous-jacent = valeur actuelle des flux du projet ; prix d'exercice = investissement (ou valeur de revente pour l'abandon) ; échéance = date limite de décision ; volatilité = incertitude sur la valeur du projet.

**Évaluation**
- Arbre de décision (probabilités données, actualisation au coût du capital) : valeur de l'option = VAN avec flexibilité − VAN sans flexibilité.
- Modèle binomial : probabilité risque-neutre p = [(1 + r) × S₀ − S_bas] / (S_haut − S_bas) ; valeur = [p × gain haut + (1 − p) × gain bas] / (1 + r), r = taux sans risque.

**Formules clés :** VAN globale = VAN classique + valeur des options réelles

## À retenir
- La valeur d'une option augmente avec la volatilité et l'échéance : l'incertitude crée de la valeur quand on peut l'exploiter.
- Un projet à VAN classique négative peut être accepté si ses options valent plus que ce déficit.
- Différer a un coût : les flux perdus pendant l'attente et le risque d'entrée d'un concurrent.
