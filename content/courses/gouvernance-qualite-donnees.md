# Gouvernance et qualité des données

**Références :** norme ISO 8000 (qualité des données) ; ISO/IEC 25012 (modèle de qualité des données) ; RGPD art. 5 §1 d) (exactitude) ; règlement (UE) 2022/868 (Data Governance Act)

**Gouvernance des données** : organisation, règles et rôles qui font des données un actif maîtrisé (définitions communes, responsabilités, contrôles, cycle de vie, sécurité, conformité).

**Rôles** :
- **directeur des données (CDO)** : porte la stratégie data au niveau de la direction ;
- **propriétaire des données (data owner)** : responsable **métier** d'un domaine de données (définitions, règles d'accès, niveau de qualité attendu) ;
- **gestionnaire des données (data steward)** : veille au quotidien à la qualité, documente, corrige ;
- la DSI fournit et exploite les outils ; le DPO veille à la conformité des traitements de données personnelles.

**Dimensions de la qualité** : exactitude (conforme à la réalité), complétude (champs renseignés), cohérence (pas de contradiction entre sources), unicité (pas de doublon), validité (format et règles respectés, ex. clé de contrôle d'un IBAN), actualité ou fraîcheur.

**Référentiel des données de référence (MDM)** : gestion centralisée des données partagées (clients, fournisseurs, articles, plan de comptes) pour qu'une seule version fasse foi dans toutes les applications.

**Outils** : dictionnaire de données et catalogue, glossaire métier, règles de contrôle à la saisie, profilage, dédoublonnage, tableaux de bord qualité, traçabilité (lignage) des données.

**Enjeux pour la fonction finance** : fiabilité des états financiers et des reportings, prévention des fraudes (fichier fournisseurs, changement d'IBAN), obligations de conformité.

**Formules clés :** taux de complétude = fiches renseignées ÷ fiches totales ; taux de conformité = fiches sans anomalie ÷ fiches totales

## À retenir
- Le propriétaire des données est un responsable métier, pas la DSI.
- La qualité se traite à la source (contrôles de saisie, MDM) plutôt que par des corrections répétées en aval.
- Un taux global n'a de sens que si chaque fiche n'est comptée qu'une fois, même si elle cumule plusieurs anomalies.
