# Immobilisations — contrôles clés

**Références :** NEP 315 (compréhension du contrôle interne) ; NEP 330 (réponses aux risques, tests de procédures) ; NEP 265 (communication des faiblesses du contrôle interne)

**Enjeu :** les acquisitions d'immobilisations sont peu nombreuses mais unitairement lourdes ; un dispositif d'autorisation et de suivi fiable permet au CAC d'alléger ses tests de détail, et son absence est une faiblesse à communiquer. À l'examen, on distingue contrôles préventifs et contrôles de détection et l'on relie chaque contrôle à une assertion.

Le cycle suit la chaîne demande d'investissement → autorisation → commande → réception → comptabilisation → suivi → sortie. Contrôles clés :
- **Autorisation** : budget d'investissement approuvé ; demandes validées selon une délégation de pouvoirs à seuils, avant l'engagement de la dépense (réalité, prévention des acquisitions non autorisées).
- **Séparation des tâches** : la personne qui commande ne réceptionne pas, ne tient pas le fichier et ne règle pas les fournisseurs d'immobilisations (404).
- **Fichier des immobilisations** : tenu à jour (date de mise en service, durée, mode, composants), rapproché périodiquement des comptes 20 à 28 de la balance ; tout écart est expliqué et visé.
- **Inventaire physique périodique** : biens étiquetés, comparés au fichier ; les écarts sont analysés (détection des sorties non comptabilisées, donc existence).
- **Sorties** : bon de cession ou de mise au rebut autorisé et transmis à la comptabilité, qui sort le bien du fichier et arrête les dotations.
- **Distinction charge / immobilisation** : règle écrite (seuil, critères) et revue des factures importantes imputées en charges (exhaustivité des immobilisations).
- **Paramétrage du logiciel** : durées et modes d'amortissement validés, accès restreint ; revue annuelle des indices de perte de valeur.

**Tests de procédures (NEP 330) :** si l'auditeur s'appuie sur un contrôle, il en teste l'efficacité sur la période : inspection des autorisations signées, réexécution du rapprochement fichier / balance, observation de l'inventaire. Un contrôle mensuel se teste sur un petit nombre d'occurrences ; un contrôle testé à l'intérim doit être couvert jusqu'à la clôture.

## Exemple
Chez Deneb, le rapprochement mensuel fichier / balance est visé par le chef comptable. En réexécutant celui de décembre, l'auditeur trouve un fichier à 2 845 000 € pour une balance des comptes 21 à 2 893 000 €, soit **48 000 €** d'écart, signé sans commentaire. Il s'agit d'une machine facturée en juillet N et imputée directement en 2154 sans création de fiche : aucune dotation n'a été calculée.
Conséquences : le contrôle existe mais n'est pas efficace (revue de pure forme), l'auditeur ne s'appuie pas sur lui et étend ses procédures substantives (rapprochement exhaustif fichier / balance, recalcul des dotations) ; dotation omise sur 5 ans = 48 000 / 5 × 6 / 12 = **4 800 €** ; la faiblesse est communiquée à la direction (NEP 265).

## Erreurs fréquentes
- Attendre de l'inventaire physique ou du rapprochement fichier / balance qu'il prévienne les acquisitions non autorisées : ce sont des contrôles de détection sur des biens déjà acquis ; seule l'autorisation préalable prévient.
- Croire que le calcul automatique des dotations détecte les mises au rebut : il continue au contraire d'amortir les biens disparus tant qu'ils restent au fichier ; c'est l'inventaire physique qui les révèle.
- Supprimer toute procédure substantive parce que les contrôles sont efficaces : la NEP 330 impose des procédures substantives sur chaque solde significatif, les contrôles ne font qu'en réduire l'étendue.
- Confondre la revue des factures d'entretien (exhaustivité) avec un contrôle des sorties (existence).

## À retenir
- Autorisation préalable → prévient ; inventaire et rapprochement → détectent.
- Même avec des contrôles efficaces, des procédures substantives restent obligatoires sur les soldes significatifs (NEP 330).
- Les faiblesses significatives relevées sont communiquées à la direction et à la gouvernance (NEP 265).

**Notions liées :** [Immobilisations — risques](/cours/immobilisations-risques) · [Immobilisations — procédures substantives](/cours/immobilisations-procedures-substantives) · [Évaluation du contrôle interne](/cours/evaluation-controle-interne) · [Achats-fournisseurs — contrôles clés](/cours/achats-fournisseurs-controles-cles)
