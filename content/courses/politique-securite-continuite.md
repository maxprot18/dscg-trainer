# Politique de sécurité, plans de continuité et de reprise d'activité

**Références :** ISO/IEC 27001:2022 (système de management de la sécurité de l'information) ; ISO/IEC 27002:2022 (mesures de sécurité, dont 8.13 sauvegardes) ; ISO 22301 (management de la continuité d'activité) ; guide d'hygiène informatique de l'ANSSI

**Enjeu :** la sécurité ne se réduit pas à des outils : une politique approuvée par la direction, des objectifs de continuité chiffrés (RTO, RPO) et des plans testés ; l'examen fait distinguer PSSI, PCA et PRA et calculer une perte de données ou une disponibilité.

**PSSI** (politique de sécurité des systèmes d'information) : document approuvé par la direction qui fixe les objectifs de sécurité, les règles (gestion des accès et moindre privilège, mots de passe et authentification multifacteur, sauvegardes, mises à jour, usage des équipements et du télétravail), les rôles (RSSI, propriétaires des données, utilisateurs) et les sanctions. Elle se décline en chartes d'utilisation signées par les utilisateurs (annexées au règlement intérieur pour être opposables) et en procédures. Elle découle de l'analyse de risques et est revue périodiquement.

**ISO 27001** : exigences d'un système de management de la sécurité de l'information (SMSI), selon la roue de Deming (planifier, déployer, contrôler, améliorer) ; norme **certifiable** par un organisme accrédité. Son annexe A liste 93 mesures en quatre thèmes (organisationnelles, humaines, physiques, technologiques), détaillées par l'**ISO 27002**, guide de bonnes pratiques qui, lui, ne donne lieu à aucune certification. La certification porte sur le système de management, pas sur l'absence de faille.

**Continuité** : le bilan d'impact sur l'activité (BIA, ISO 22301) identifie les processus critiques, les ressources dont ils dépendent et fixe pour chacun :
- le **RTO** (durée maximale d'interruption admissible) : délai dans lequel le service doit être rétabli ; il dimensionne les moyens de reprise (site de secours à chaud, à froid) ;
- le **RPO** (perte de données maximale admissible) : ancienneté maximale des données que l'on accepte de perdre, qui fixe la fréquence des sauvegardes ou de la réplication.

**PCA** (plan de continuité d'activité) : maintenir les activités critiques, éventuellement en mode dégradé, pendant la crise (site de secours, réplication, procédures manuelles). **PRA** (plan de reprise d'activité) : rétablir le SI après un sinistre (restauration, bascule sur un site de secours). Ces plans décrivent les rôles, les contacts et l'ordre de redémarrage ; ils sont testés régulièrement (exercice sur table, bascule réelle) et mis à jour après chaque test ou changement majeur.

**Sauvegardes** : règle **3-2-1** (trois copies des données, sur deux supports différents, dont une hors site), complétée par une copie hors ligne ou immuable contre les rançongiciels ; une sauvegarde n'a de valeur que si son succès est supervisé et si sa restauration est testée.

**Pérennité** : la **dette technique** est le coût futur créé par des solutions de court terme (code non documenté, développements spécifiques empilés, versions non mises à jour) ; l'**obsolescence** (matériel ou logiciel en fin de support) prive l'entreprise de correctifs de sécurité. Elles se gèrent par une cartographie des applications, un plan de renouvellement et un budget de maintien en condition opérationnelle.

**Formules clés :** perte de données = délai entre la dernière sauvegarde réussie et le sinistre ; disponibilité = (temps d'ouverture − temps d'indisponibilité) ÷ temps d'ouverture

## Exemple
Prise de commandes ouverte 24 h/24 ; BIA : RTO 8 h, RPO 6 h. Sauvegardes à 0 h, 6 h, 12 h et 18 h. Le serveur est détruit à 16 h 30 ; la sauvegarde de 12 h est valide ; le service est rétabli à 2 h 30 le lendemain. Rythme : 40 commandes par heure.
Perte de données = 16 h 30 − 12 h = **4 h 30**, soit 4,5 × 40 = **180 commandes** à ressaisir : le RPO de 6 h est respecté. Interruption = 16 h 30 → 2 h 30 = **10 h** : le RTO de 8 h est dépassé, le PRA doit être revu (délai de livraison du matériel, ordre de restauration).
Disponibilité de l'année (8 760 h) avec cette seule panne = (8 760 − 10) ÷ 8 760 = **99,89 %**. Si la sauvegarde de 12 h avait échoué sans alerte, la perte serait remontée à 10 h 30, au-delà du RPO.

## Erreurs fréquentes
- Confondre RTO et RPO : « nous ne pouvons pas perdre plus d'une heure de commandes » définit le RPO (données) ; « nous supportons une coupure d'une demi-journée » définit le RTO (durée).
- Croire qu'une entreprise peut être certifiée ISO 27002 : seule l'ISO 27001 (exigences du SMSI) est certifiable ; l'ISO 27002 n'est qu'un guide de mesures.
- Prendre la dernière sauvegarde planifiée comme point de reprise sans vérifier qu'elle a réussi : la perte réelle se mesure depuis la dernière sauvegarde valide.
- Réduire la règle 3-2-1 à trois copies au même endroit : il faut deux supports différents et une copie hors site.

## À retenir
- RTO = combien de temps on peut rester arrêté ; RPO = combien de données on peut perdre (mesuré en temps).
- Le PCA vise à ne pas s'arrêter, le PRA à redémarrer.
- Une sauvegarde en échec non détectée allonge la perte réelle de données au-delà du RPO prévu.

**Notions liées :** [Cybersécurité : menaces et analyse de risques](/cours/cybersecurite-menaces) · [Audit et contrôle du SI](/cours/audit-controle-si) · [Conformité réglementaire du SI (NIS 2, DORA)](/cours/conformite-reglementaire-si) · [Cloud, SaaS, externalisation](/cours/cloud-saas-externalisation)
