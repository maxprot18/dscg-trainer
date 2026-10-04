# Investissement en avenir risqué et incertain

**Références :** théorie de la décision (Laplace, Wald, Savage, Hurwicz) ; critère espérance-variance (Markowitz) ; arbres de décision

**Enjeu :** quand les flux ne sont pas certains, la VAN unique ne suffit plus ; l'examen distingue l'avenir risqué (probabilités connues : espérance, écart-type, arbre de décision) de l'avenir incertain (matrice de résultats et critères de choix), et attend un calcul propre suivi d'une conclusion nuancée.

**Avenir risqué (probabilisable)** : les flux ou la VAN suivent une loi de probabilité connue.
- E(VAN) = Σ pᵢ × VANᵢ ; σ²(VAN) = Σ pᵢ × (VANᵢ − E)² ; coefficient de variation CV = σ / E (risque par unité d'espérance, utile pour comparer des projets d'espérances différentes).
- Critère espérance-variance : A domine B si E(A) ≥ E(B) et σ(A) ≤ σ(B), avec au moins une inégalité stricte. Sans dominance (plus d'espérance mais plus de risque), le choix dépend de l'aversion au risque du décideur.
- Autres approches : taux d'actualisation ajusté au risque (prime ajoutée au taux sans risque), équivalent certain, analyse de sensibilité et de scénarios.

**Arbre de décision** : nœuds de décision (carrés) et nœuds d'aléa (ronds). On résout **à rebours** (de la droite vers la gauche) : à chaque nœud d'aléa, espérance des valeurs ; à chaque nœud de décision, meilleure branche, les autres étant élaguées ; les investissements décidés plus tard sont actualisés à la date 0.

```diagram
{"type":"tree","title":"Arbre de décision de l'exemple (k€, valeurs actuelles)","root":{"label":"Investir 100 maintenant ?","children":[{"edge":"oui","label":"Aléa : E = 132, VAN = 32","children":[{"edge":"demande forte, p = 0,6","label":"VA des flux 180"},{"edge":"demande faible, p = 0,4","label":"VA des flux 60"}]},{"edge":"non","label":"VAN = 0"}]}}
```

**Avenir incertain (non probabilisable)** : matrice projets × états de la nature.
- Laplace : moyenne arithmétique des résultats (états équiprobables), on maximise.
- Wald (maximin) : on retient le projet dont le plus mauvais résultat est le meilleur (prudence).
- Maximax : meilleur des meilleurs résultats (optimisme).
- Hurwicz : α × max + (1 − α) × min, α = coefficient d'optimisme (α = 1 redonne le maximax, α = 0 le maximin).
- Savage (minimax regret) : regret = meilleur résultat de l'état − résultat obtenu ; on retient le projet dont le regret maximal est le plus faible.

## Exemple
Arbre : investir 100 k€ aujourd'hui ; la valeur actuelle des flux sera de 180 k€ si la demande est forte (p = 0,6) ou de 60 k€ si elle est faible (p = 0,4). E = 0,6 × 180 + 0,4 × 60 = 132 ; VAN espérée = 132 − 100 = 32 k€ > 0 : on investit.
Incertain (VAN en k€ selon trois états) : A : 180 ; 90 ; −30. B : 120 ; 100 ; 40. C : 240 ; 50 ; −60.
Laplace : A 80, B 86,7, C 76,7 → B. Wald : pires résultats −30, 40, −60 → B. Maximax : 240 → C. Hurwicz (α = 0,5) : A 75, B 80, C 90 → C.
Savage : meilleurs résultats par état 240, 100, 40 ; regrets maximaux A 70 (regrets 60, 10, 70), B 120, C 100 → A. Trois critères, trois projets différents.

## Erreurs fréquentes
- Décrire le critère de Wald comme le choix du meilleur résultat possible : c'est le maximax ; Wald retient le meilleur des pires résultats.
- Conclure qu'un projet domine parce que son coefficient de variation est plus faible : la dominance espérance-variance exige à la fois E supérieure ou égale et σ inférieur ou égal.
- Calculer le regret de Savage par rapport au meilleur résultat du projet au lieu du meilleur résultat de chaque état de la nature.
- Résoudre l'arbre de gauche à droite ou oublier d'actualiser un investissement décidé en date 1.

## À retenir
- Les critères en incertitude peuvent désigner des projets différents : le choix reflète le profil du décideur.
- Un CV plus faible ne constitue pas à lui seul une dominance.
- Dans un arbre, ne pas oublier d'actualiser les investissements décidés plus tard.

**Notions liées :** [Critères de choix d'investissement](/cours/van-tri-criteres-investissement) · [Options réelles](/cours/options-reelles) · [Théorie du portefeuille et MEDAF](/cours/theorie-portefeuille-medaf)
