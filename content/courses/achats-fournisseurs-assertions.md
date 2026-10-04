# Achats-fournisseurs — assertions d’audit

**Références :** NEP 500 (caractère probant des éléments collectés : assertions) ; NEP 315 (évaluation du risque au niveau des assertions) ; PCG comptes 401, 404, 408, 4098, 60, 61-62

**Enjeu :** sur les dettes, le sens du risque s’inverse par rapport aux créances : l’entité a intérêt à minorer ses charges et ses dettes, donc l’exhaustivité domine et les tests partent de l’extérieur de la comptabilité. L’examen vérifie que l’on a compris ce renversement.

Le CAC décline les risques du cycle par assertion pour choisir des procédures adaptées (NEP 315) ; chaque élément collecté est jugé probant par rapport à l’assertion qu’il couvre (NEP 500).

- **Flux d’achats et de charges (opérations de l’exercice)** : réalité (les achats correspondent à des biens reçus ou des services rendus à l’entité, pas à des factures fictives), exhaustivité (tous les achats de l’exercice sont enregistrés), mesure (montants exacts, remises déduites, TVA correcte), séparation des exercices (rattachement à la période de la réception ou du service rendu, non à la date de facture ou de paiement), classification (bon compte : charge ou immobilisation, nature de charge).
- **Soldes des dettes fournisseurs à la clôture** : existence, droits et obligations (la dette est bien une obligation de l’entité), exhaustivité (y compris factures non parvenues en 408), évaluation et imputation (conversion des dettes en devises au cours de clôture, avoirs à recevoir en 4098).
- **Présentation** : soldes débiteurs reclassés à l’actif (4091, créances sur fournisseurs), dettes d’immobilisations (404) distinctes des dettes d’exploitation, informations sur les délais de paiement dans le rapport de gestion.

**Sens des tests :**
- Exhaustivité : partir de sources indépendantes de la comptabilité (bons de réception, factures et décaissements postérieurs à la clôture, relevés des fournisseurs) et remonter vers les comptes.
- Réalité : partir des écritures comptabilisées et descendre vers les pièces (commande, réception ou procès-verbal de prestation, facture).
- Une même anomalie touche souvent deux assertions : un achat de N enregistré en N+1 est une erreur de séparation des exercices (flux) et un défaut d’exhaustivité des dettes au 31/12/N (solde).

## Exemple
Le bon de réception n° 7812 du 29/12/N porte sur 10 000 € HT de marchandises, inventoriées au 31/12/N ; la facture, datée du 08/01/N+1, a été comptabilisée en N+1. Aucune facture non parvenue n’a été enregistrée.
Assertions en défaut : séparation des exercices des achats et exhaustivité des dettes. Les marchandises sont au stock final (produit) sans l’achat correspondant (charge) : le résultat N est surévalué de **10 000 € HT** et les dettes sont sous-évaluées de 12 000 € TTC. Correction en N : débit 607 pour 10 000 € et 44586 pour 2 000 €, crédit 408 pour 12 000 €.

## Erreurs fréquentes
- Tester l’exhaustivité des dettes en partant des factures comptabilisées : une facture omise n’y figure pas. On part des bons de réception, des décaissements de N+1 ou des relevés fournisseurs.
- Répondre à un risque de charges fictives par le rapprochement bons de réception → factures : ce sens vise l’exhaustivité ; pour la réalité, on part des factures comptabilisées vers les contrats, commandes et preuves de prestation.
- Rattacher la séparation des exercices ou la mesure au solde des dettes : ce sont des assertions sur les flux ; le solde relève de l’existence, des droits et obligations, de l’exhaustivité et de l’évaluation.
- Traiter la présentation des soldes débiteurs par compensation : un acompte versé est une créance (4091), jamais une dette négative.

## À retenir
- Pour le passif, le risque dominant est la minoration : l’exhaustivité prime sur l’existence.
- Un test qui part des factures comptabilisées ne détecte pas une facture omise.
- Une même anomalie peut toucher plusieurs assertions : un achat de N enregistré en N+1 est à la fois une erreur de séparation et un défaut d’exhaustivité des dettes N.

**Notions liées :** [Ventes-clients — assertions](/cours/ventes-clients-assertions) · [Stocks — assertions](/cours/stocks-assertions) · [Éléments probants et techniques](/cours/elements-probants-techniques) · [Achats-fournisseurs — procédures substantives](/cours/achats-fournisseurs-procedures-substantives)
