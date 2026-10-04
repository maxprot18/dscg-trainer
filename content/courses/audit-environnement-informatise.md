# Audit en environnement informatisé et analyse de données

**Références :** NEP 315 ; NEP 330 ; NEP 500 ; NEP 265 ; LPF art. L. 47 A (fichier des écritures comptables)

- Le CAC prend connaissance du système d'information relatif à l'élaboration de l'information financière : applications, flux de traitement automatisés, interfaces, écritures manuelles, sous-traitance informatique.
- Contrôles généraux informatiques : gestion des accès et des habilitations, gestion des changements de programmes (tests, validation, séparation développement / production), exploitation (sauvegardes, traitements planifiés, incidents). Ils conditionnent le bon fonctionnement continu des contrôles applicatifs.
- Contrôles applicatifs : intégrés aux applications (contrôles de saisie, blocage d'une facture sans bon de réception, calcul automatique). Un contrôle automatisé peut être testé sur un petit nombre de cas si les contrôles généraux sur les changements et les accès sont efficaces.
- Faiblesse des contrôles généraux (ex. accès des développeurs à la production, absence de revue des droits) : le CAC ne peut s'appuyer sur les contrôles automatisés sans travaux complémentaires, renforce ses procédures de substance et vérifie l'exhaustivité et l'exactitude des états produits par le système qu'il utilise comme éléments probants.
- Analyse de données : traitement de la totalité d'une population (souvent le fichier des écritures comptables, FEC) pour détecter des doublons, des ruptures de séquence, des écritures manuelles atypiques (week-ends, montants ronds, après la clôture, utilisateurs inhabituels), ou pour recalculer un solde.
- Les éléments identifiés par les scripts sont des anomalies potentielles : chaque exception est analysée et justifiée ; les faux positifs sont écartés avant toute conclusion.
- Communication des faiblesses significatives du contrôle interne relevées au niveau approprié de la direction et aux personnes constituant le gouvernement d'entreprise (NEP 265).

**Formules clés :** couverture d'un test = montant des éléments testés ÷ montant de la population

## À retenir
- Le test exhaustif par analyse de données n'est pas un sondage : pas d'extrapolation, mais toutes les exceptions sont à traiter.
- Avant d'utiliser un fichier extrait du système, en vérifier l'intégrité (totaux rapprochés de la balance).
- Faiblesse des contrôles généraux = moindre confiance dans tous les contrôles automatisés concernés.
