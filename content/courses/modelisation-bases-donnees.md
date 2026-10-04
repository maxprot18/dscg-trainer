# Modélisation des données et bases de données relationnelles

**Références :** méthode Merise (MCD, MLD) ; modèle entité-association (P. Chen, 1976) ; modèle relationnel de Codd (1970) ; norme ISO/IEC 9075 (SQL)

**Enjeu :** lire ou compléter un schéma de données est un classique de l'UE 5 : passer du MCD au modèle relationnel, placer les clés étrangères, repérer une table mal normalisée. Les erreurs de modélisation produisent doublons et incohérences que le comptable retrouve ensuite dans ses états.

**MCD (modèle conceptuel des données)** : représentation des données indépendante de toute technique.
- **Entité** : objet du domaine (CLIENT, FACTURE) décrit par des propriétés, dont un **identifiant** unique.
- **Association** : lien entre entités ; elle peut porter des propriétés (ex. quantité commandée), qui dépendent du couple d'occurrences reliées et non d'une seule entité.
- **Cardinalités** (min, max) de chaque entité dans l'association : combien de fois au minimum et au maximum une occurrence y participe (0,1 ; 1,1 ; 0,n ; 1,n). Le minimum 1 exprime une obligation (toute facture a un client), le maximum n une multiplicité.

**MLD (modèle logique relationnel)** : tables (relations), clé primaire soulignée, clé étrangère précédée de #. Règles de passage :
- chaque entité devient une table, son identifiant devient la clé primaire ;
- association **père-fils** (cardinalité maximale 1 d'un côté, n de l'autre) : l'identifiant du « père » (côté n) migre comme **clé étrangère** dans la table de l'entité côté (0,1) ou (1,1) ; pas de table pour l'association ;
- association **n-n** (cardinalités maximales n des deux côtés) : nouvelle table dont la clé primaire est composée des clés des entités reliées, et qui reçoit les propriétés de l'association.

**Contraintes d'intégrité** : clé primaire unique et non nulle (intégrité d'entité) ; une clé étrangère doit correspondre à une clé primaire existante (**intégrité référentielle**) : le **SGBD relationnel**, logiciel qui gère la base (stockage, accès concurrents, transactions, droits, sauvegardes), refuse une facture rattachée à un client inexistant et la suppression d'un client qui a encore des factures.

**Normalisation** (supprimer redondances et anomalies de mise à jour) :
- **1FN** : attributs atomiques, pas de groupe répétitif (pas de colonne « téléphones » contenant trois numéros) ;
- **2FN** : 1FN + tout attribut non clé dépend de **toute** la clé (problème seulement avec une clé composée) ;
- **3FN** : 2FN + aucun attribut non clé ne dépend d'un autre attribut non clé (pas de dépendance transitive) : on sort l'attribut dans une table dédiée reliée par clé étrangère.

## Exemple
MCD : CLIENT (0,n) — passe — (1,1) COMMANDE ; COMMANDE (1,n) — comporte (quantité) — (0,n) ARTICLE. Passage au relationnel :
CLIENT (id_client, nom, ville) ; ARTICLE (ref_article, libelle, prix_unitaire) ; COMMANDE (num_cde, date_cde, #id_client) : père-fils, la clé du client migre dans COMMANDE ; LIGNE_COMMANDE (#num_cde, #ref_article, quantite) : association n-n, clé primaire composée, elle porte la quantité.
Stocker nom et ville du client dans COMMANDE violerait la 3FN (num_cde → id_client → nom) : un client qui déménage devrait être corrigé sur toutes ses commandes.

```diagram
{"type":"org","title":"Schéma relationnel : clés étrangères du MLD","nodes":[{"id":"CL","label":"CLIENT"},{"id":"CO","label":"COMMANDE"},{"id":"LC","label":"LIGNE_COMMANDE"},{"id":"AR","label":"ARTICLE"}],"links":[{"from":"CL","to":"CO","label":"#id_client"},{"from":"CO","to":"LC","label":"#num_cde"},{"from":"AR","to":"LC","label":"#ref_article"}]}
```

## Erreurs fréquentes
- Attribuer à la clé étrangère le rôle de garantir l'unicité des factures : c'est la clé primaire ; la clé étrangère garantit que le client référencé existe (intégrité référentielle).
- Juger une table hors 2FN alors que sa clé primaire est simple : avec une clé d'un seul attribut, il ne peut pas y avoir de dépendance partielle ; le défaut éventuel est une dépendance transitive (3FN).
- Créer une table pour une association père-fils, ou faire migrer la clé dans le mauvais sens : seule la clé du côté n migre, dans la table de l'entité à cardinalité maximale 1 (le « fils ») ; une table n'apparaît que pour une association n-n.

## À retenir
- Une association n-n donne toujours une table ; une association père-fils, jamais.
- Stocker le nom du client dans la table des commandes viole la 3FN (il dépend de l'identifiant client, pas du numéro de commande).
- Une table avec une clé primaire simple est automatiquement en 2FN si elle est en 1FN.

**Notions liées :** [Interrogation des données : SQL](/cours/requetes-sql) · [Gouvernance et qualité des données](/cours/gouvernance-qualite-donnees) · [Big data, NoSQL et API](/cours/big-data-nosql-api) · [Informatique décisionnelle et dataviz](/cours/business-intelligence-dataviz)
