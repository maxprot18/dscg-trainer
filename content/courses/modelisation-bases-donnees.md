# Modélisation des données et bases de données relationnelles

**Références :** méthode Merise (MCD, MLD) ; modèle relationnel de Codd (1970) ; norme ISO/IEC 9075 (SQL)

**MCD (modèle conceptuel des données)** : représentation des données indépendante de toute technique.
- **Entité** : objet du domaine (CLIENT, FACTURE) décrit par des propriétés, dont un **identifiant** unique.
- **Association** : lien entre entités ; elle peut porter des propriétés (ex. quantité commandée).
- **Cardinalités** (min, max) de chaque entité dans l'association : combien de fois au minimum et au maximum une occurrence y participe (0,1 ; 1,1 ; 0,n ; 1,n).

**MLD (modèle logique relationnel)** : tables (relations), clé primaire soulignée, clé étrangère précédée de #. Règles de passage :
- chaque entité devient une table, son identifiant devient la clé primaire ;
- association **père-fils** (cardinalité maximale 1 d'un côté, n de l'autre) : l'identifiant du « père » migre comme **clé étrangère** dans la table de l'entité côté (0,1) ou (1,1) ; pas de table pour l'association ;
- association **n-n** (cardinalités maximales n des deux côtés) : nouvelle table dont la clé primaire est composée des clés des entités reliées, et qui reçoit les propriétés de l'association.

**Contraintes d'intégrité** : clé primaire unique et non nulle (intégrité d'entité) ; une clé étrangère doit correspondre à une clé primaire existante (**intégrité référentielle**).

**Normalisation** (supprimer redondances et anomalies de mise à jour) :
- **1FN** : attributs atomiques, pas de groupe répétitif ;
- **2FN** : 1FN + tout attribut non clé dépend de **toute** la clé (problème seulement avec une clé composée) ;
- **3FN** : 2FN + aucun attribut non clé ne dépend d'un autre attribut non clé (pas de dépendance transitive).

**SGBD relationnel** : logiciel qui gère la base (stockage, accès concurrents, transactions, droits, sauvegardes).

## À retenir
- Une association n-n donne toujours une table ; une association père-fils, jamais.
- Stocker le nom du client dans la table des commandes viole la 3FN (il dépend de l'identifiant client, pas du numéro de commande).
- Une table avec une clé primaire simple est automatiquement en 2FN si elle est en 1FN.
