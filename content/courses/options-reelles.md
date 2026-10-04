# Options réelles et flexibilité des projets

**Références :** Myers (1977) ; modèle binomial (Cox, Ross, Rubinstein, 1979) ; Black et Scholes (1973)

**Enjeu :** la VAN classique traite le projet comme un engagement figé ; les options réelles valorisent la liberté d'attendre, d'étendre ou d'abandonner. À l'examen : identifier l'option, la rapprocher d'un call ou d'un put, et la chiffrer par un arbre ou un modèle binomial à une période.

Une **option réelle** est le droit, non l'obligation, de modifier un projet après l'obtention d'informations nouvelles. La VAN classique, qui suppose une décision figée, sous-estime un projet flexible ; l'écart est d'autant plus grand que l'incertitude est forte.

**Principales options**
- Option de **développement** (extension) : investir plus si les résultats sont bons → assimilable à un call sur les flux additionnels.
- Option de **différer** (attendre) : lancer plus tard si les conditions sont favorables → call dont le prix d'exercice est l'investissement ; on n'investit que dans les états favorables.
- Option d'**abandon** : arrêter et revendre les actifs si le projet déçoit → put dont le prix d'exercice est la valeur de revente.
- Options de flexibilité : changer d'intrant, de produit, d'échelle ; option d'apprentissage (phase pilote avant déploiement).

**Analogie avec les options financières** : sous-jacent = valeur actuelle des flux du projet ; prix d'exercice = investissement (ou valeur de revente pour l'abandon) ; échéance = date limite de décision ; volatilité = incertitude sur la valeur du projet ; taux sans risque pour l'actualisation en univers risque-neutre.

**Évaluation**
- Arbre de décision (probabilités données, actualisation au coût du capital) : valeur de l'option = VAN avec flexibilité − VAN sans flexibilité.
- Modèle binomial : probabilité risque-neutre p = [(1 + r) × S₀ − S_bas] / (S_haut − S_bas) ; valeur = [p × gain haut + (1 − p) × gain bas] / (1 + r), r = taux sans risque. Les probabilités réelles ne servent pas : p est déduit des cours.

**Formules clés :** VAN globale = VAN classique + valeur des options réelles

## Exemple
Valeur actuelle des flux d'un projet S₀ = 800 k€, investissement I = 850 k€ : VAN immédiate = −50 k€, le projet serait refusé. L'entreprise peut attendre un an ; la valeur du projet sera alors de 1 100 k€ (état haut) ou de 600 k€ (état bas) ; taux sans risque 4 %.
p = (1,04 × 800 − 600) / (1 100 − 600) = 232 / 500 = 0,464. Dans l'état haut on investit : gain = 1 100 − 850 = 250 ; dans l'état bas on renonce : gain = 0.
Valeur du projet avec option de différer = (0,464 × 250 + 0,536 × 0) / 1,04 = 111,5 k€. Valeur de l'option = 111,5 − max(−50 ; 0) = 111,5 k€ : attendre vaut mieux qu'investir maintenant ou qu'abandonner l'idée.

## Erreurs fréquentes
- Qualifier l'option d'abandon de call : c'est un put, le prix d'exercice étant la valeur de revente des actifs.
- Penser qu'une hausse de la volatilité réduit la valeur de l'option parce que le projet devient plus risqué : elle l'augmente, les pertes étant plafonnées par le droit de ne pas exercer.
- Rejeter un projet dès que la VAN immédiate est négative : la valeur de l'option de différer peut être positive, comme dans l'exemple.
- Utiliser les probabilités réelles ou le coût du capital dans le modèle binomial : on actualise au taux sans risque avec la probabilité risque-neutre.

## À retenir
- La valeur d'une option augmente avec la volatilité et l'échéance : l'incertitude crée de la valeur quand on peut l'exploiter.
- Un projet à VAN classique négative peut être accepté si ses options valent plus que ce déficit.
- Différer a un coût : les flux perdus pendant l'attente et le risque d'entrée d'un concurrent.

**Notions liées :** [Évaluation des options](/cours/evaluation-options) · [Investissement en avenir risqué et incertain](/cours/investissement-avenir-incertain) · [Critères de choix d'investissement](/cours/van-tri-criteres-investissement)
