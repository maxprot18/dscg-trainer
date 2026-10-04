# Audit en environnement informatisé et analyse de données

**Références :** NEP 315 révisée (système d'information et contrôles généraux informatiques ; correspondance ISA 315) ; NEP 330 ; NEP 500 (fiabilité des informations produites par l'entité) ; NEP 265 ; NEP 530 ; LPF art. L. 47 A (fichier des écritures comptables)

**Enjeu :** quand les comptes sortent d'un système, la fiabilité des comptes dépend de celle du système ; à l'examen, on attend de distinguer contrôle général et contrôle applicatif, de traiter un état édité par le progiciel et d'exploiter correctement les résultats d'une analyse de données.

- Le CAC prend connaissance du système d'information relatif à l'élaboration de l'information financière : applications (ERP, paie, facturation), flux de traitement automatisés, interfaces entre applications, écritures manuelles, sous-traitance informatique (hébergement, infogérance) et personnes habilitées.
- Contrôles généraux informatiques : gestion des accès et des habilitations (création, modification, revue périodique des droits), gestion des changements de programmes (tests, validation, séparation développement / production), exploitation (sauvegardes, traitements planifiés, incidents). Ils conditionnent le bon fonctionnement continu des contrôles applicatifs et l'intégrité des données.
- Contrôles applicatifs : intégrés aux applications (contrôles de saisie et de vraisemblance, blocage d'une facture sans bon de réception, calcul automatique de la TVA, rapprochement automatique commande / réception / facture). Un contrôle automatisé fonctionne de façon identique à chaque opération : il peut être testé sur un petit nombre de cas si les contrôles généraux sur les changements et les accès sont efficaces.
- Faiblesse des contrôles généraux (ex. accès des développeurs à la production, absence de revue des droits, compte administrateur partagé) : le CAC ne peut s'appuyer sur les contrôles automatisés sans travaux complémentaires, renforce ses procédures de substance et vérifie l'exhaustivité et l'exactitude des états produits par le système qu'il utilise comme éléments probants (paramètres d'édition, rapprochement des totaux avec la balance, test de quelques lignes jusqu'aux pièces).
- Analyse de données : traitement de la totalité d'une population (souvent le fichier des écritures comptables, FEC, dont la structure est normalisée par le LPF) pour détecter des doublons, des ruptures de séquence, des écritures manuelles atypiques (week-ends, montants ronds, après la clôture, utilisateurs inhabituels, comptes rarement mouvementés), ou pour recalculer un solde ou une balance âgée.
- Les éléments identifiés par les scripts sont des anomalies potentielles : chaque exception est analysée et justifiée par une pièce ou une explication corroborée ; les faux positifs sont écartés avant toute conclusion, et une exception sans justification est traitée comme une anomalie ou un indice de fraude (NEP 240).
- Communication des faiblesses significatives du contrôle interne relevées (accès, changements, sauvegardes) au niveau approprié de la direction et aux personnes constituant le gouvernement d'entreprise (NEP 265).

**Formules clés :** couverture d'un test = montant des éléments testés ÷ montant de la population

```diagram
{"type":"flow","title":"Analyse de données sur le FEC : de l'extraction à la conclusion","steps":[{"label":"Vérifier l'intégrité","note":"Totaux débit / crédit et soldes rapprochés de la balance"},{"label":"Appliquer les critères","note":"Manuelles, après clôture, montants ronds, utilisateur, week-end"},{"label":"Analyser chaque exception","note":"Pièce justificative, explication corroborée"},{"label":"Écarter les faux positifs","note":"Régularisations documentées"},{"label":"Conclure et communiquer","note":"Anomalies, indices de fraude, faiblesses (NEP 265)"}]}
```

## Exemple
Le FEC de Cuivre SA compte 184 000 écritures ; le CAC vérifie d'abord que ses totaux et ses soldes par compte correspondent à la balance définitive. Un script isole les écritures manuelles passées après le 31/12 par le directeur financier, d'un montant rond supérieur ou égal à 10 000 € : 23 écritures pour 1 460 000 €, sur une population d'écritures manuelles de 9 800 000 €, soit une couverture de 1 460 000 ÷ 9 800 000 ≈ 14,9 %. Sur les 23 écritures, 21 sont des régularisations de clôture documentées (factures non parvenues, charges constatées d'avance) ; 2 écritures de 190 000 € chacune reclassent des charges en immobilisations sans pièce ni validation. Le CAC les traite comme des anomalies potentielles (et un indice de contournement des contrôles par la direction) : il obtient les justificatifs ou propose la correction de 380 000 €. Aucune extrapolation : la population ciblée a été lue en totalité.

## Erreurs fréquentes
- Classer le blocage d'une facture non conforme à la commande ou le calcul automatique de la TVA parmi les contrôles généraux : ce sont des contrôles applicatifs ; les contrôles généraux portent sur les accès, les changements et l'exploitation.
- Utiliser sans vérification un état édité par le progiciel (stocks à rotation lente, balance âgée) parce qu'il est « automatique » : il faut tester l'exhaustivité et l'exactitude de l'état avant de s'en servir comme élément probant.
- Renoncer au contrôle ou formuler une réserve dès la planification quand le système est peu fiable : la réponse est d'abord d'étendre les procédures de substance.
- Extrapoler les exceptions d'un test exhaustif par analyse de données, ou au contraire les considérer toutes comme des anomalies : chaque exception est examinée une à une.

## À retenir
- Le test exhaustif par analyse de données n'est pas un sondage : pas d'extrapolation, mais toutes les exceptions sont à traiter.
- Avant d'utiliser un fichier extrait du système, en vérifier l'intégrité (totaux rapprochés de la balance).
- Faiblesse des contrôles généraux = moindre confiance dans tous les contrôles automatisés concernés.
- Contrôle automatisé efficace et contrôles généraux solides : quelques cas testés suffisent.

**Notions liées :** [Évaluation du contrôle interne](/cours/evaluation-controle-interne) · [Audit et contrôle des SI](/cours/audit-controle-si) · [Éléments probants et techniques de contrôle](/cours/elements-probants-techniques) · [Clôture : contrôles clés](/cours/cloture-controles-cles)
