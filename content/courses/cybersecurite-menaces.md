# Cybersécurité : menaces, vulnérabilités et analyse de risques

**Références :** méthode EBIOS Risk Manager (ANSSI, 2018) ; ISO/IEC 27005 (gestion des risques liés à la sécurité de l'information) ; Code pénal art. 323-1 et suivants (atteintes aux systèmes de traitement automatisé de données) ; Code des assurances art. L. 12-10-1 (loi LOPMI du 24 janvier 2023)

**Critères de sécurité (DICP)** : **D**isponibilité (le service est accessible quand on en a besoin), **I**ntégrité (l'information n'est ni altérée ni modifiée sans autorisation), **C**onfidentialité (seules les personnes autorisées y accèdent), **P**reuve ou traçabilité (on peut retrouver qui a fait quoi et quand, sans contestation possible).

**Vocabulaire** : un **risque** naît de la rencontre d'une **menace** (source et action malveillante ou accidentelle) et d'une **vulnérabilité** (faiblesse exploitable : logiciel non mis à jour, mot de passe faible, utilisateur non sensibilisé) ; il se mesure par sa vraisemblance et la gravité de son impact.

**Menaces courantes** : hameçonnage (phishing) et ingénierie sociale, dont la fraude au président et au faux changement de RIB ; **rançongiciel** (chiffrement des données et souvent exfiltration, avec double extorsion) ; déni de service distribué (DDoS) ; compromission d'un fournisseur ou d'un prestataire (chaîne d'approvisionnement) ; menace interne ; exploitation d'un système obsolète qui ne reçoit plus de correctifs.

**EBIOS Risk Manager** (cinq ateliers) : 1. cadrage et socle de sécurité ; 2. sources de risque et objectifs visés ; 3. scénarios stratégiques (chemins d'attaque par l'écosystème) ; 4. scénarios opérationnels (modes opératoires techniques) ; 5. traitement du risque (réduire, transférer, éviter, accepter) et risques résiduels.

**Approche quantitative** : valeur de l'actif (AV) × facteur d'exposition (EF, part de la valeur perdue) = perte unitaire (SLE) ; SLE × taux annuel d'occurrence (ARO) = espérance de perte annuelle (ALE). Une mesure est justifiée si la baisse d'ALE dépasse son coût annuel.

**Réponse à un rançongiciel** : isoler les machines touchées du réseau (sans les éteindre, pour préserver les traces), alerter la cellule de crise, ne pas payer (recommandation des autorités), déposer plainte (dans les 72 heures pour pouvoir être indemnisé par l'assurance, Code des assurances art. L. 12-10-1), notifier la CNIL en cas de violation de données personnelles (RGPD art. 33), restaurer depuis des sauvegardes saines.

**Formules clés :** SLE = AV × EF ; ALE = SLE × ARO ; gain net annuel d'une mesure = ALE avant − ALE après − coût annuel de la mesure

## À retenir
- Une fausse demande de changement de RIB qui aboutit porte atteinte à l'intégrité des données ; une fuite de fichier clients, à la confidentialité.
- Le maillon humain reste la première porte d'entrée : la sensibilisation est une mesure de sécurité à part entière.
- Payer la rançon ne garantit ni la récupération des données ni leur non-divulgation.
