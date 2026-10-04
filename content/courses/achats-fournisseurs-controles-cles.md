# Achats-fournisseurs — contrôles clés

**Références :** NEP 315 (compréhension du contrôle interne) ; NEP 330 (tests de procédures) ; NEP 265 (communication des faiblesses du contrôle interne)

Le cycle suit la chaîne besoin → commande → réception → facture → comptabilisation → paiement.
- **Commande** : bon de commande autorisé selon des délégations de signature, fournisseurs référencés.
- **Réception** : bons de réception prénumérotés, établis par le magasin, indépendant des acheteurs ; suivi des réceptions non encore facturées (base du 408).
- **Facture** : rapprochement à trois (commande / réception / facture : quantités, prix, conditions) avant le bon à payer ; contrôle arithmétique.
- **Fichier fournisseurs** : création et modification des fournisseurs et RIB réservées à une personne qui ne paie pas ; changement de RIB confirmé par contre-appel au numéro connu du fournisseur ; revue du journal des modifications.
- **Paiement** : règlement sur facture approuvée uniquement, double signature au-delà d’un seuil, mention « payé » ou blocage informatique (doubles paiements).
- **Comptabilisation** : rapprochement auxiliaire / collectif 401, rapprochement des relevés fournisseurs, revue des soldes débiteurs.

**Séparation des tâches :** commande, réception, comptabilisation, gestion du fichier fournisseurs et paiement sont des fonctions incompatibles.

**Tests de procédures (NEP 330) :** si le CAC s’appuie sur un contrôle, il teste son fonctionnement sur la période. Il compare le taux de déviation observé au taux de déviation tolérable ; s’il le dépasse, il ne s’appuie pas sur le contrôle et étend ses procédures substantives.

**Formules clés :** taux de déviation observé = nombre d’écarts / taille de l’échantillon

## À retenir
- Le rapprochement à trois couvre la réalité et la mesure ; le suivi des réceptions non facturées couvre l’exhaustivité.
- Un contrôle défaillant n’est pas une anomalie dans les comptes : il modifie l’étendue des travaux.
