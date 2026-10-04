# Audit et contrôle du système d'information

**Références :** NEP 315 (connaissance de l'entité et évaluation du risque) ; COBIT 2019 (ISACA) ; ISO/IEC 27001:2022 (audit de certification) ; LPF art. L. 47 A (fichier des écritures comptables) ; CGI art. 289, VII (piste d'audit fiable des factures)

**Objectifs de l'audit du SI** : apprécier si le SI protège les actifs, garantit l'intégrité et la fiabilité des données (notamment financières), atteint les objectifs de l'organisation et utilise ses ressources efficacement. Il est mené par l'audit interne, un prestataire spécialisé, le commissaire aux comptes (pour la partie utile à l'information financière) ou un organisme certificateur.

**Contrôles généraux informatiques (CGI)** : portent sur l'environnement de l'ensemble des applications.
- gestion des accès : création, modification et suppression des comptes, revue périodique des habilitations, comptes à privilèges ;
- gestion des changements : tests, recette par les utilisateurs, séparation des environnements de développement et de production ;
- exploitation : sauvegardes, traitements planifiés, gestion des incidents.

**Contrôles applicatifs** : intégrés à une application (contrôles de saisie, champs obligatoires, rapprochement automatique commande / réception / facture, blocage au-delà d'un seuil, calculs automatiques). Ils ne sont fiables que si les CGI le sont.

**Séparation des tâches** : un même utilisateur ne doit pas cumuler des droits incompatibles (création d'un fournisseur ou modification de son RIB et validation des paiements ; saisie et validation d'une écriture). La matrice des droits est revue au moins annuellement.

**Techniques** : entretiens et revue documentaire, revue des habilitations, tests d'intrusion, analyse de journaux (logs), analyse de données sur toute une population (FEC), audit d'un prestataire (rapport d'assurance sur ses contrôles).

**Certification ISO 27001** : délivrée par un organisme accrédité pour trois ans, avec des audits de surveillance annuels.

**Formules clés :** taux de comptes à supprimer = comptes actifs sans titulaire présent ÷ comptes actifs revus

## À retenir
- Une faiblesse des CGI (développeur ayant accès à la production, absence de revue des droits) fragilise tous les contrôles automatisés.
- Les comptes des salariés partis doivent être désactivés dès leur départ.
- L'entreprise doit pouvoir remettre son FEC à l'administration fiscale lors d'un contrôle de comptabilité informatisée.
