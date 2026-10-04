# Pilotage des processus : ABC/ABM, coûts cibles, qualité

**Références :** programme DSCG UE3 (arrêté du 4 août 2025) ; R. Cooper et R.S. Kaplan (1988), méthode ABC ; T. Ohno, système de production Toyota (lean) ; norme NF EN ISO 9001:2015 (approche processus)

**Enjeu :** piloter transversalement ce qui crée la valeur (activités, processus) plutôt que les seuls services de l'organigramme ; à l'examen, on calcule un coût par la méthode ABC, un coût cible ou un coût de la qualité et on en tire des leviers d'action (ABM).

Un **processus** est un enchaînement d'activités qui transforme des intrants en un résultat destiné à un client (interne ou externe). Gérer par les processus, c'est repérer et piloter ces enchaînements au-delà des frontières fonctionnelles.

**Coûts complets classiques** : les charges indirectes sont réparties dans des centres d'analyse (sections homogènes), puis imputées aux produits par des unités d'œuvre souvent volumiques (heures machine, heures de main-d'œuvre). Cette logique sous-évalue le coût des produits en petites séries ou complexes (qui consomment beaucoup de lancements, de références, de commandes) et surévalue celui des grandes séries, qui les subventionnent.

**Méthode ABC (Activity-Based Costing)** : les ressources sont consommées par des **activités**, elles-mêmes consommées par les produits. On regroupe les activités ayant le même **inducteur** (cause de la consommation : nombre de lots, de références, de commandes) dans un centre de regroupement.
- Coût unitaire de l'inducteur = coût du centre de regroupement ÷ volume de l'inducteur.
- Coût d'un produit = charges directes + Σ (nombre d'inducteurs consommés × coût unitaire de l'inducteur).

```diagram
{"type":"flow","title":"Logique de la méthode ABC","steps":[{"label":"Ressources","note":"charges indirectes"},{"label":"Activités","note":"consomment les ressources"},{"label":"Inducteurs","note":"lots, commandes, références"},{"label":"Produits","note":"consomment les activités"}]}
```

**ABM (Activity-Based Management)** : exploiter l'analyse par activités pour piloter : supprimer ou réduire les activités sans valeur ajoutée, agir sur les inducteurs (moins de lots, de références, de commandes), reconfigurer les processus.

**Coût cible (target costing)** : le coût est déduit du marché. Coût cible = prix de vente accepté par le marché − marge cible. L'écart entre le coût estimé (avec les processus actuels) et le coût cible se comble dès la conception, par l'analyse de la valeur et la décomposition du coût par fonction ou composant, car l'essentiel du coût d'un produit est figé avant son lancement.

**Lean et qualité** : éliminer les gaspillages (muda : surproduction, attentes, transports, opérations inutiles, stocks, mouvements, défauts), produire en flux tiré (juste-à-temps), amélioration continue (kaizen, roue de Deming PDCA). La maintenance préventive n'est pas un gaspillage : elle fiabilise le flux.
- Coûts d'obtention de la qualité : prévention (formation, conception, étalonnage) + détection (contrôles, essais) + défaillances internes (rebuts, retouches avant livraison) + défaillances externes (retours, garanties, pénalités, après livraison).
- Coûts de la non-qualité au sens strict = défaillances internes + défaillances externes. Investir en prévention réduit en général les défaillances, surtout externes, les plus coûteuses (pénalités, image).

**Formules clés :** coût inducteur = coût du centre ÷ nombre d'inducteurs ; coût cible = prix de marché − marge cible ; écart à réduire = coût estimé − coût cible

## Exemple
Trois centres de regroupement : approvisionnement 36 000 € pour 300 commandes (120 € par commande) ; lancement 54 000 € pour 150 lots (360 € par lot) ; contrôle qualité 30 000 € pour 200 contrôles (150 € par contrôle). Le produit P (1 000 unités, charges directes 20 € l'unité) a consommé 10 commandes, 5 lots et 8 contrôles : charges indirectes = 10 × 120 + 5 × 360 + 8 × 150 = 1 200 + 1 800 + 1 200 = 4 200 €, soit 4,20 € par unité ; coût ABC = 24,20 €. Si P était fabriqué en 20 lots de 50 au lieu de 5 lots de 200, le seul coût de lancement passerait de 1,80 € à 7,20 € par unité : l'ABM pousse à réduire le nombre de lots.
Coût cible : prix de marché accepté 24 €, marge cible 15 % du prix, soit 3,60 € : coût cible = 20,40 € ; écart à combler par rapport au coût estimé de 24,20 € : 3,80 € par unité, à chercher dès la conception.

## Erreurs fréquentes
- Attendre une baisse du coût unitaire des petites séries en passant à l'ABC : avec un inducteur « nombre de lots », chaque lot supporte le même coût de lancement réparti sur peu d'unités, donc leur coût augmente.
- Obtenir le coût cible en ajoutant la marge au coût de revient prévisionnel : c'est l'inverse, prix de marché − marge cible.
- Classer la maintenance préventive parmi les muda du lean : c'est un investissement dans la fiabilité du flux, pas un gaspillage.
- Ranger une indemnité versée à un client ou une formation qualité dans les défaillances internes : l'indemnité est une défaillance externe ; la formation, un coût de prévention.

## À retenir
- En ABC, un coût lié aux lots se répartit par lot puis entre les unités du lot : les petites séries supportent un coût unitaire plus élevé.
- Le coût cible part du prix de marché, pas du coût de revient (logique inverse du « coût + marge »).
- Prévention et détection ne sont pas des coûts de non-qualité au sens strict ; ils s'ajoutent aux défaillances dans le coût d'obtention de la qualité.

**Notions liées :** [Centres de responsabilité et prix de cession](/cours/centres-responsabilite-prix-cession) · [Gestion prévisionnelle et budgets](/cours/gestion-previsionnelle-budgets) · [Tableaux de bord et balanced scorecard](/cours/tableaux-bord-balanced-scorecard) · [Pilotage des projets](/cours/pilotage-projets)
