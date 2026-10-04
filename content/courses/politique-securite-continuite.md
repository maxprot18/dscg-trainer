# Politique de sécurité, plans de continuité et de reprise d'activité

**Références :** ISO/IEC 27001:2022 (système de management de la sécurité de l'information) ; ISO/IEC 27002:2022 (mesures de sécurité) ; ISO 22301 (management de la continuité d'activité) ; guide d'hygiène informatique de l'ANSSI

**PSSI** (politique de sécurité des systèmes d'information) : document approuvé par la direction qui fixe les objectifs de sécurité, les règles (gestion des accès, mots de passe et authentification multifacteur, sauvegardes, mises à jour, usage des équipements), les rôles (RSSI, propriétaires des données) et les sanctions. Elle se décline en chartes d'utilisation signées par les utilisateurs et en procédures. Elle découle de l'analyse de risques et est revue périodiquement.

**ISO 27001** : exigences d'un système de management de la sécurité de l'information (SMSI), selon la roue de Deming (planifier, déployer, contrôler, améliorer) ; norme **certifiable**. Son annexe A liste 93 mesures en quatre thèmes (organisationnelles, humaines, physiques, technologiques), détaillées par l'**ISO 27002**, guide de bonnes pratiques non certifiable.

**Continuité** : le bilan d'impact sur l'activité (BIA) identifie les processus critiques et fixe pour chacun :
- le **RTO** (durée maximale d'interruption admissible) : délai dans lequel le service doit être rétabli ;
- le **RPO** (perte de données maximale admissible) : ancienneté maximale des données que l'on accepte de perdre, qui fixe la fréquence des sauvegardes ou de la réplication.

**PCA** (plan de continuité d'activité) : maintenir les activités critiques, éventuellement en mode dégradé, pendant la crise (site de secours, réplication, procédures manuelles). **PRA** (plan de reprise d'activité) : rétablir le SI après un sinistre (restauration, bascule sur un site de secours). Ces plans sont testés régulièrement et mis à jour.

**Sauvegardes** : règle **3-2-1** (trois copies des données, sur deux supports différents, dont une hors site), complétée par une copie hors ligne ou immuable contre les rançongiciels ; une sauvegarde n'a de valeur que si sa restauration est testée.

**Pérennité** : la **dette technique** est le coût futur créé par des solutions de court terme (code non documenté, développements spécifiques empilés, versions non mises à jour) ; l'**obsolescence** (matériel ou logiciel en fin de support) prive l'entreprise de correctifs de sécurité. Elles se gèrent par une cartographie des applications, un plan de renouvellement et un budget de maintien en condition opérationnelle.

**Formules clés :** perte de données maximale ≈ intervalle entre deux sauvegardes réussies (sans réplication) ; disponibilité = (temps d'ouverture − temps d'indisponibilité) ÷ temps d'ouverture

## À retenir
- RTO = combien de temps on peut rester arrêté ; RPO = combien de données on peut perdre (mesuré en temps).
- Le PCA vise à ne pas s'arrêter, le PRA à redémarrer.
- Une sauvegarde en échec non détectée allonge la perte réelle de données au-delà du RPO prévu.
