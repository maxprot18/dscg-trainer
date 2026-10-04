# Informatique décisionnelle et visualisation des données

**Références :** définition de l'entrepôt de données (W. Inmon) ; modélisation dimensionnelle (R. Kimball) ; PCG art. 212-1 et compte 651 (droit d'accès temporaire à une base externe) ; programme DSCG UE 5

**Enjeu :** le contrôleur de gestion et l'auditeur travaillent sur des données extraites des systèmes opérationnels ; l'examen demande de distinguer ERP et entrepôt, de dessiner un modèle en étoile (faits, dimensions, grain), de critiquer un graphique et de concevoir un tableau de bord relié aux objectifs.

**Systèmes opérationnels (OLTP)** : ERP et applications de gestion, optimisés pour de nombreuses transactions courtes ; données courantes, mises à jour en permanence, codifications propres à chaque application.

**Entrepôt de données (data warehouse)** : base dédiée à l'analyse, alimentée par les systèmes opérationnels qu'elle ne remplace pas. Données **orientées sujet** (ventes, achats), **intégrées** (codes et définitions harmonisés : un seul code produit pour la caisse, l'ERP et la fidélité), **non volatiles** (on ajoute, on ne modifie pas) et **historisées** (plusieurs années, pour comparer à N−1). **Magasin de données (data mart)** : sous-ensemble consacré à un métier (ventes, finance).

**Alimentation ETL** : **extraction** depuis les sources, **transformation** (nettoyage, dédoublonnage, harmonisation des codes, conversion des unités et devises, calculs, agrégations), **chargement** dans l'entrepôt, souvent la nuit (J+1) : l'entrepôt n'est donc pas en temps réel.

**Modèle en étoile** : une **table de faits** (mesures numériques : quantités, CA, marge, et clés étrangères vers les dimensions) entourée de **tables de dimensions** (temps, produit, magasin, client) qui portent les axes d'analyse et leurs hiérarchies (jour → mois → trimestre ; produit → famille → rayon). Le **grain** est le niveau de détail d'une ligne de faits (ex. jour × magasin × produit) ; il fixe le volume de la table et les analyses possibles (pas d'analyse par ticket si le grain est la journée). Analyse multidimensionnelle (OLAP) : forage vers le détail (drill-down) ou agrégation (roll-up), tranches, pivots.

**Visualisation (dataviz)** : choisir le graphique selon le message :
- évolution dans le temps : courbe ; comparaison entre catégories : barres triées, axe à zéro ;
- composition d'un tout : barres empilées, ou secteurs si 2 à 5 parts ; relation entre deux variables : nuage de points ;
- éviter la 3D, les axes tronqués non signalés (ils exagèrent les écarts), les couleurs sans signification, les doubles axes trompeurs.

**Tableau de bord** : peu d'indicateurs (5 à 10) reliés aux objectifs et aux leviers d'action, définitions partagées (un « CA » calculé partout de la même façon), comparaison à une cible ou à N−1, écarts et alertes, fréquence adaptée au destinataire (quotidien pour un chef de magasin, mensuel pour la direction).

**Formules clés :** lignes de faits maximales = produit des cardinalités des dimensions au grain ; écart à la cible = (réel − cible) ÷ cible ; variation = (N − N−1) ÷ N−1

## Exemple
Un réseau de 25 magasins ouverts 300 jours par an vend 1 500 références. Grain retenu : jour × magasin × produit → au plus 25 × 300 × 1 500 = **11,25 millions** de lignes de faits par an (moins en pratique, les produits non vendus un jour donné n'ayant pas de ligne) ; au grain du ticket, le volume serait bien supérieur.
Tableau de bord du directeur du réseau, trimestre : CA réel 4 820 k€, cible 5 000 k€, N−1 4 600 k€. Écart à la cible = (4 820 − 5 000) ÷ 5 000 = **−3,6 %** (alerte) ; variation = (4 820 − 4 600) ÷ 4 600 = **+4,8 %**. Présentation : barres horizontales des 25 magasins triées par CA décroissant, axe à zéro, cible matérialisée par un repère ; une courbe mensuelle pour la tendance.
Comptabilisation : un abonnement de 12 mois à une base de données externe (18 000 € HT souscrit le 1er octobre N) est une charge (651), régularisée par 486 pour les 9 mois de N+1 : 18 000 × 9 ÷ 12 = 13 500 €.

## Erreurs fréquentes
- Croire que l'entrepôt remplace les bases des applications de gestion ou qu'il est mis à jour à chaque saisie : il est alimenté périodiquement par l'ETL et ne sert qu'à l'analyse.
- Présenter 14 agences dans un camembert ou une courbe par ordre alphabétique : pour classer des catégories, des barres triées ; la courbe suggère une évolution dans le temps.
- Démarrer l'axe des valeurs au niveau de la plus petite agence : l'axe tronqué exagère les écarts ; pour des barres, il part de zéro.
- Immobiliser un droit d'accès temporaire à une base de données externe : sans contrôle d'un actif au-delà de la période, c'est une charge étalée sur la période couverte.

## À retenir
- L'entrepôt ne remplace pas l'ERP : il en historise et consolide les données pour l'analyse, avec un décalage (J+1).
- Le grain de la table de faits détermine le volume et la finesse des analyses possibles.
- La qualité des tableaux de bord dépend de la qualité des données en amont (phase de transformation de l'ETL).
- Un camembert à douze parts ne permet aucune comparaison : préférer des barres triées, axe à zéro.

**Notions liées :** [Interrogation des données : SQL](/cours/requetes-sql) · [Tableaux de bord et balanced scorecard](/cours/tableaux-bord-balanced-scorecard) · [Big data, NoSQL et API](/cours/big-data-nosql-api) · [Gouvernance et qualité des données](/cours/gouvernance-qualite-donnees)
