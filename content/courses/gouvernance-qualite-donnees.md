# Gouvernance et qualité des données

**Références :** norme ISO 8000 (qualité des données) ; ISO/IEC 25012 (modèle de qualité des données) ; RGPD art. 5 §1 d) (exactitude) ; règlement (UE) 2022/868 (Data Governance Act) ; COBIT 2019, objectif APO14 (gestion des données)

**Enjeu :** des états financiers et des reportings fiables supposent des données de référence justes dès la saisie ; l'examen demande de nommer la dimension de qualité en cause, de répartir les rôles (propriétaire, gestionnaire, DSI) et de calculer un taux de conformité sur un fichier.

**Gouvernance des données** : organisation, règles et rôles qui font des données un actif maîtrisé (définitions communes, responsabilités, contrôles, cycle de vie, sécurité, conformité). Elle relève de la direction et des métiers, la DSI n'étant que le fournisseur des outils ; COBIT la range dans le domaine de management APO (objectif APO14).

**Rôles** :
- **directeur des données (CDO)** : porte la stratégie data au niveau de la direction et arbitre entre métiers ;
- **propriétaire des données (data owner)** : responsable **métier** d'un domaine de données (définitions, règles d'accès, niveau de qualité attendu) : le directeur commercial pour les clients, le directeur des achats pour les fournisseurs ;
- **gestionnaire des données (data steward)** : veille au quotidien à la qualité, documente, corrige, instruit les demandes de création ou de modification ;
- la DSI fournit et exploite les outils ; le DPO veille à la conformité des traitements de données personnelles.

**Dimensions de la qualité** : exactitude (conforme à la réalité), complétude (champs renseignés), cohérence (pas de contradiction entre sources), unicité (pas de doublon), validité (format et règles respectés, ex. clé de contrôle d'un IBAN, SIREN à 9 chiffres), actualité ou fraîcheur (mise à jour dans le délai utile). Une même fiche peut cumuler plusieurs défauts ; on qualifie chacun séparément.

**Référentiel des données de référence (MDM)** : gestion centralisée des données partagées (clients, fournisseurs, articles, plan de comptes) pour qu'une seule version fasse foi et soit diffusée à l'ERP, au CRM et à l'entrepôt de données. Il suppose un circuit de création et de modification contrôlé (demande, validation par le propriétaire, pièce justificative).

**Outils** : dictionnaire de données et catalogue, glossaire métier, règles de contrôle à la saisie (champ obligatoire, format, liste de valeurs), profilage, dédoublonnage, tableaux de bord qualité, traçabilité (lignage) des données de la source jusqu'au reporting.

**Enjeux pour la fonction finance** : fiabilité des états financiers et des reportings, prévention des fraudes (fichier fournisseurs, changement d'IBAN validé par rappel du fournisseur), obligations de conformité (RGPD, facturation électronique, piste d'audit fiable).

**Formules clés :** taux de complétude = fiches renseignées ÷ fiches totales ; taux de conformité = fiches sans anomalie ÷ fiches totales ; fiches en anomalie = Σ anomalies seulement si elles sont disjointes

## Exemple
Avant une migration, le fichier fournisseurs (3 000 fiches) est profilé : 240 fiches sans IBAN (complétude), 90 fiches dont la clé de contrôle de l'IBAN est fausse (validité) et 45 doublons à supprimer (unicité), chaque fiche ne présentant qu'une seule anomalie.
Fiches en anomalie = 240 + 90 + 45 = 375 ; fiches conformes = 3 000 − 375 = 2 625 ; taux de conformité = 2 625 ÷ 3 000 = **87,5 %**. Le seul taux de complétude de l'IBAN serait de (3 000 − 240) ÷ 3 000 = 92,0 % : il surestime la qualité du fichier. Plan d'action : corriger à la source (IBAN obligatoire et clé contrôlée à la saisie, détection de doublon sur le SIREN) plutôt que nettoyer le fichier après chaque clôture.

## Erreurs fréquentes
- Qualifier un fournisseur présent trois fois sous trois codes de défaut de complétude ou de fraîcheur : c'est un défaut d'**unicité** (doublon), qui fausse les encours et contourne les limites de crédit.
- Calculer un taux de conformité sur une seule dimension (l'IBAN renseigné) : toutes les anomalies comptent, et une fiche cumulant plusieurs défauts n'est comptée qu'une fois.
- Désigner la DSI comme propriétaire des données clients : le propriétaire est un responsable métier ; la DSI gère l'infrastructure et les applications.
- Traiter la qualité par des corrections répétées en aval (retraitements dans le tableur du contrôleur) au lieu de contrôles à la saisie et d'un référentiel unique.

## À retenir
- Le propriétaire des données est un responsable métier, pas la DSI ; le gestionnaire (steward) assure le quotidien.
- La qualité se traite à la source (contrôles de saisie, MDM) plutôt que par des corrections répétées en aval.
- Un taux global n'a de sens que si chaque fiche n'est comptée qu'une fois, même si elle cumule plusieurs anomalies.
- Une donnée de référence : une source, un propriétaire, des copies synchronisées.

**Notions liées :** [Modélisation des données et bases relationnelles](/cours/modelisation-bases-donnees) · [Urbanisation et architecture du SI](/cours/urbanisation-architecture-si) · [Protection des données personnelles (RGPD)](/cours/protection-donnees-rgpd-si) · [Audit en environnement informatisé](/cours/audit-environnement-informatise)
