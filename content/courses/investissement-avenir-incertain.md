# Investissement en avenir risqué et incertain

**Références :** théorie de la décision (Laplace, Wald, Savage, Hurwicz) ; critère espérance-variance (Markowitz) ; arbres de décision

**Avenir risqué (probabilisable)** : les flux ou la VAN suivent une loi de probabilité connue.
- E(VAN) = Σ pᵢ × VANᵢ ; σ²(VAN) = Σ pᵢ × (VANᵢ − E)² ; coefficient de variation CV = σ / E (risque par unité d'espérance).
- Critère espérance-variance : A domine B si E(A) ≥ E(B) et σ(A) ≤ σ(B), avec au moins une inégalité stricte. Sans dominance, le choix dépend de l'aversion au risque du décideur.
- Autres approches : taux d'actualisation ajusté au risque, équivalent certain, analyse de sensibilité et de scénarios.

**Arbre de décision** : nœuds de décision (carrés) et nœuds d'aléa (ronds). On résout **à rebours** : à chaque nœud d'aléa, espérance des valeurs ; à chaque nœud de décision, meilleure branche ; les investissements ultérieurs sont actualisés à la date 0.

**Avenir incertain (non probabilisable)** : matrice projets × états de la nature.
- Laplace : moyenne arithmétique des résultats (états équiprobables), on maximise.
- Wald (maximin) : on retient le projet dont le plus mauvais résultat est le meilleur (prudence).
- Maximax : meilleur des meilleurs résultats (optimisme).
- Hurwicz : α × max + (1 − α) × min, α = coefficient d'optimisme.
- Savage (minimax regret) : regret = meilleur résultat de l'état − résultat obtenu ; on retient le projet dont le regret maximal est le plus faible.

## À retenir
- Les critères en incertitude peuvent désigner des projets différents : le choix reflète le profil du décideur.
- Un CV plus faible ne constitue pas à lui seul une dominance.
- Dans un arbre, ne pas oublier d'actualiser les investissements décidés plus tard.
