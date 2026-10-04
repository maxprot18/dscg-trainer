# Achats-fournisseurs — assertions d’audit

**Références :** NEP 500 (caractère probant des éléments collectés : assertions) ; PCG comptes 401, 408, 4098, 60, 61-62

Le CAC décline les risques du cycle par assertion pour choisir des procédures adaptées.

- **Flux d’achats et de charges (opérations de l’exercice)** : réalité (les achats correspondent à des biens reçus ou des services rendus à l’entité), exhaustivité (tous les achats sont enregistrés), mesure (montants exacts, remises déduites), séparation des exercices (rattachement à la bonne période selon la date de réception ou de service rendu), classification (bon compte : charge ou immobilisation, nature de charge).
- **Soldes des dettes fournisseurs à la clôture** : existence, droits et obligations (la dette est bien une obligation de l’entité), exhaustivité, évaluation et imputation (conversion des dettes en devises, avoirs à recevoir).
- **Présentation** : soldes débiteurs reclassés à l’actif, dettes d’immobilisations (404) distinctes des dettes d’exploitation, informations sur les délais de paiement.

**Sens des tests :**
- Exhaustivité : partir de sources indépendantes de la comptabilité (bons de réception, factures et décaissements postérieurs, relevés des fournisseurs) et remonter vers les comptes.
- Réalité : partir des écritures comptabilisées et descendre vers les pièces (commande, réception, facture).

## À retenir
- Pour le passif, le risque dominant est la minoration : l’exhaustivité prime sur l’existence.
- Un test qui part des factures comptabilisées ne détecte pas une facture omise.
- Une même anomalie peut toucher plusieurs assertions : un achat de N enregistré en N+1 est à la fois une erreur de séparation et un défaut d’exhaustivité des dettes N.
