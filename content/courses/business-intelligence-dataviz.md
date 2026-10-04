# Informatique décisionnelle et visualisation des données

**Références :** définition de l'entrepôt de données (W. Inmon) ; modélisation dimensionnelle (R. Kimball) ; programme DSCG UE 5

**Systèmes opérationnels (OLTP)** : ERP et applications de gestion, optimisés pour de nombreuses transactions courtes ; données courantes, mises à jour en permanence.

**Entrepôt de données (data warehouse)** : base dédiée à l'analyse, alimentée par les systèmes opérationnels. Données **orientées sujet** (ventes, achats), **intégrées** (codes et définitions harmonisés), **non volatiles** (on ajoute, on ne modifie pas) et **historisées**. **Magasin de données (data mart)** : sous-ensemble consacré à un métier.

**Alimentation ETL** : **extraction** depuis les sources, **transformation** (nettoyage, dédoublonnage, harmonisation des codes, calculs, agrégations), **chargement** dans l'entrepôt, souvent la nuit (J+1).

**Modèle en étoile** : une **table de faits** (mesures numériques : quantités, CA, marge, et clés étrangères vers les dimensions) entourée de **tables de dimensions** (temps, produit, magasin, client) qui portent les axes d'analyse. Le **grain** est le niveau de détail d'une ligne de faits (ex. jour × magasin × produit). Analyse multidimensionnelle (OLAP) : forage vers le détail ou agrégation, tranches, pivots.

**Visualisation (dataviz)** : choisir le graphique selon le message :
- évolution dans le temps : courbe ; comparaison entre catégories : barres triées ;
- composition d'un tout : barres empilées, ou secteurs si 2 à 5 parts ; relation entre deux variables : nuage de points ;
- éviter la 3D, les axes tronqués non signalés, les couleurs sans signification.

**Tableau de bord** : peu d'indicateurs reliés aux objectifs, définitions partagées, comparaison à une cible ou à N−1, alertes.

## À retenir
- L'entrepôt ne remplace pas l'ERP : il en historise et consolide les données pour l'analyse.
- La qualité des tableaux de bord dépend de la qualité des données en amont (phase de transformation de l'ETL).
- Un camembert à douze parts ne permet aucune comparaison : préférer des barres triées.
