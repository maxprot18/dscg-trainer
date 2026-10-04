# Audit et contrôle du système d'information

**Références :** NEP 315 (connaissance de l'entité et évaluation du risque) ; COBIT 2019 (ISACA) ; ISO/IEC 27001:2022 (audit de certification) ; ISAE 3402 et rapports SOC 1 / SOC 2 (contrôles d'un prestataire) ; LPF art. L. 47 A et A. 47 A-1 (fichier des écritures comptables) ; CGI art. 289, VII (piste d'audit fiable des factures)

**Enjeu :** l'auditeur (interne, externe ou commissaire aux comptes) ne peut se fier à une donnée produite par le SI qu'après avoir évalué les contrôles qui l'entourent ; l'examen demande de classer un contrôle (général ou applicatif), de repérer un cumul de droits incompatibles et de bâtir un plan d'audit fondé sur les risques.

**Objectifs de l'audit du SI** : apprécier si le SI protège les actifs, garantit l'intégrité et la fiabilité des données (notamment financières), atteint les objectifs de l'organisation et utilise ses ressources efficacement. Il est mené par l'audit interne, un prestataire spécialisé, le commissaire aux comptes (pour la partie utile à l'information financière, NEP 315) ou un organisme certificateur. **COBIT 2019** fournit le référentiel le plus utilisé : des objectifs de gouvernance (évaluer, diriger, surveiller) et de gestion (planifier, construire, exploiter, contrôler), chacun assorti de pratiques et d'indicateurs qui servent de grille d'audit.

**Contrôles généraux informatiques (CGI)** : portent sur l'environnement de l'ensemble des applications.
- gestion des accès : création, modification et suppression des comptes, revue périodique des habilitations, comptes à privilèges et comptes génériques ;
- gestion des changements : tests, recette par les utilisateurs, séparation des environnements de développement et de production, interdiction pour un développeur de modifier seul la production ;
- exploitation : sauvegardes supervisées, traitements planifiés, gestion des incidents.

**Contrôles applicatifs** : intégrés à une application et portant sur les transactions (contrôles de saisie, champs obligatoires, rapprochement automatique commande / réception / facture, blocage au-delà d'un seuil, calculs automatiques). Ils ne sont fiables dans la durée que si les CGI le sont : un paramétrage modifiable sans recette ou un compte administrateur partagé rend tout blocage automatique contournable.

**Séparation des tâches** : un même utilisateur ne doit pas cumuler des droits incompatibles (création d'un fournisseur ou modification de son RIB et validation des paiements ; saisie et validation d'une écriture ; paramétrage de la paie et validation des virements de salaires). La matrice des droits est revue au moins une fois par an par les responsables métier, et les comptes des salariés partis sont désactivés le jour du départ.

**Techniques** : entretiens et revue documentaire, revue des habilitations, tests de cheminement et tests de contrôles sur échantillon, tests d'intrusion, analyse des journaux (logs), analyse de données sur toute une population (FEC, écritures manuelles passées le week-end, doublons de factures). Pour un prestataire (SaaS, infogérance), l'auditeur s'appuie sur un rapport d'assurance **ISAE 3402 / SOC 1** (contrôles utiles à l'information financière) ou **SOC 2** (sécurité, disponibilité, confidentialité) : un rapport de **type 1** décrit la conception des contrôles à une date, un rapport de **type 2** teste leur efficacité sur une période, seul utile pour couvrir un exercice.

**Obligations légales liées** : remise du **FEC** à l'administration lors d'un contrôle de comptabilité informatisée (LPF L. 47 A, format fixé par l'A. 47 A-1) ; **piste d'audit fiable** (CGI 289, VII) : contrôles documentés et permanents qui relient chaque facture à la livraison ou à la prestation. **Certification ISO 27001** : délivrée par un organisme accrédité pour trois ans, avec audits de surveillance annuels ; l'ISO 27002 n'est qu'un guide de mesures, non certifiable.

```diagram
{"type":"flow","title":"Cycle d'une mission d'audit du SI","steps":[{"label":"Cartographie et analyse de risques","note":"Applications, flux, prestataires"},{"label":"Plan d'audit","note":"Priorité aux risques élevés"},{"label":"Préparation","note":"Référentiel (COBIT, ISO 27001), lettre de mission"},{"label":"Travaux sur place","note":"Entretiens, tests, analyse de données"},{"label":"Rapport","note":"Constats, recommandations hiérarchisées"},{"label":"Suivi des plans d'action","note":"Clôture des recommandations"}]}
```

**Formules clés :** taux de comptes à supprimer = comptes actifs sans titulaire présent ÷ comptes actifs revus ; score de risque d'une application = vraisemblance × gravité (matrice des risques)

## Exemple
Revue des accès à l'ERP d'une PME : 480 comptes actifs ; le rapprochement avec le registre du personnel révèle 22 comptes de salariés partis encore actifs et 9 utilisateurs qui cumulent la modification du RIB fournisseur et la validation des virements ; le développeur de l'intégrateur dispose d'un accès administrateur à la production.
Taux de comptes à supprimer = 22 ÷ 480 = **4,6 %** ; cumuls incompatibles = 9 ÷ 480 = 1,9 % des comptes, mais sur la tâche la plus sensible.
Conclusion : les CGI « accès » et « changements » sont défaillants ; le blocage automatique des factures hors commande ne peut pas être considéré comme fiable sur l'exercice. L'auditeur étend ses tests substantifs sur les paiements fournisseurs (RIB modifiés dans l'année, virements validés par les 9 utilisateurs) et recommande une revue trimestrielle des droits, la suppression immédiate des 22 comptes et un compte développeur sans accès à la production.

## Erreurs fréquentes
- Classer le blocage automatique d'une facture qui dépasse la commande parmi les contrôles généraux : il porte sur une transaction, c'est un contrôle applicatif ; les CGI sont les accès, les changements et l'exploitation.
- Juger le plus risqué un cumul « saisie des commandes + consultation des stocks » : sans mouvement de fonds ni validation, le risque est faible ; le cumul critique est RIB fournisseur + validation des virements.
- Croire qu'une entreprise peut être certifiée ISO 27002 : seule l'ISO 27001 (exigences du SMSI) est certifiable.
- Se contenter d'un rapport SOC 1 de type 1 pour couvrir l'exercice : il ne décrit les contrôles qu'à une date ; seul un rapport de type 2 teste leur fonctionnement sur une période.

## À retenir
- Une faiblesse des CGI (développeur ayant accès à la production, absence de revue des droits) fragilise tous les contrôles automatisés.
- Les comptes des salariés partis doivent être désactivés dès leur départ ; les cumuls de droits incompatibles sont la première cible d'une revue d'habilitations.
- L'entreprise doit pouvoir remettre son FEC à l'administration fiscale et documenter sa piste d'audit fiable.

**Notions liées :** [Audit en environnement informatisé et analyse de données](/cours/audit-environnement-informatise) · [Évaluation du contrôle interne](/cours/evaluation-controle-interne) · [Politique de sécurité et continuité](/cours/politique-securite-continuite) · [Cloud, SaaS, externalisation](/cours/cloud-saas-externalisation)
