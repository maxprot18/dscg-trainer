# Cybersécurité : menaces, vulnérabilités et analyse de risques

**Références :** méthode EBIOS Risk Manager (ANSSI, 2018) ; ISO/IEC 27005 (gestion des risques liés à la sécurité de l'information) ; Code pénal art. 323-1 et suivants (atteintes aux systèmes de traitement automatisé de données) ; Code des assurances art. L. 12-10-1 (loi LOPMI du 24 janvier 2023) ; RGPD art. 33

**Enjeu :** qualifier une attaque (quel critère de sécurité est atteint), hiérarchiser les risques (vraisemblance × gravité) et justifier une mesure de sécurité par un calcul d'espérance de perte : trois questions récurrentes du cas pratique.

**Critères de sécurité (DICP)** : **D**isponibilité (le service est accessible quand on en a besoin), **I**ntégrité (l'information n'est ni altérée ni modifiée sans autorisation), **C**onfidentialité (seules les personnes autorisées y accèdent), **P**reuve ou traçabilité (on peut retrouver qui a fait quoi et quand, sans contestation possible). Une même attaque peut toucher plusieurs critères : un rançongiciel chiffre (disponibilité) et exfiltre (confidentialité).

**Vocabulaire** : un **risque** naît de la rencontre d'une **menace** (source et action malveillante ou accidentelle) et d'une **vulnérabilité** (faiblesse exploitable : logiciel non mis à jour, mot de passe faible, utilisateur non sensibilisé) ; il se mesure par sa vraisemblance et la gravité de son impact. La **matrice des risques** (vraisemblance × gravité, souvent sur 4 niveaux) classe les scénarios et désigne ceux à traiter en priorité ; le risque qui subsiste après traitement est le **risque résiduel**, accepté formellement par la direction.

**Menaces courantes** : hameçonnage (phishing) et ingénierie sociale, dont la fraude au président et au faux changement de RIB ; **rançongiciel** (chiffrement des données et souvent exfiltration, avec double extorsion) ; déni de service distribué (DDoS) ; compromission d'un fournisseur ou d'un prestataire (chaîne d'approvisionnement) ; menace interne (salarié négligent ou malveillant) ; exploitation d'un système obsolète qui ne reçoit plus de correctifs.

**EBIOS Risk Manager** (cinq ateliers) : 1. cadrage et socle de sécurité ; 2. sources de risque et objectifs visés ; 3. scénarios stratégiques (chemins d'attaque par l'écosystème) ; 4. scénarios opérationnels (modes opératoires techniques) ; 5. traitement du risque (réduire, transférer notamment par l'assurance, éviter, accepter) et risques résiduels.

**Approche quantitative** : valeur de l'actif (AV) × facteur d'exposition (EF, part de la valeur perdue) = perte unitaire (SLE) ; SLE × taux annuel d'occurrence (ARO) = espérance de perte annuelle (ALE). Une mesure est justifiée si la baisse d'ALE qu'elle procure dépasse son coût annuel ; une mesure peut agir sur l'ARO (prévention) ou sur l'EF (limitation des dégâts, sauvegardes).

**Réponse à un rançongiciel** : isoler les machines touchées du réseau (sans les éteindre, pour préserver les traces en mémoire), alerter la cellule de crise et le RSSI, ne pas payer (recommandation des autorités), déposer plainte (dans les 72 heures pour pouvoir être indemnisé par l'assurance, Code des assurances art. L. 12-10-1), notifier la CNIL sous 72 heures en cas de violation de données personnelles (RGPD art. 33), restaurer depuis des sauvegardes saines après avoir éliminé la cause, puis tirer le retour d'expérience.

```diagram
{"type":"flow","title":"Gestion d'un incident de rançongiciel","steps":[{"label":"Détecter et qualifier","note":"Fichiers chiffrés, message de rançon"},{"label":"Isoler du réseau sans éteindre","note":"Préserver les traces"},{"label":"Alerter la cellule de crise","note":"RSSI, direction, prestataire"},{"label":"Plainte et notifications sous 72 h","note":"Assurance (L. 12-10-1), CNIL (art. 33)"},{"label":"Restaurer depuis des sauvegardes saines","note":"Après suppression de la cause"},{"label":"Retour d'expérience","note":"Corriger la vulnérabilité"}]}
```

**Formules clés :** SLE = AV × EF ; ALE = SLE × ARO ; gain net annuel d'une mesure = ALE avant − ALE après − coût annuel de la mesure

## Exemple
Base clients et ERP valorisés 600 000 €. Sans mesure : facteur d'exposition 30 %, taux annuel d'occurrence 0,5. Avec une solution de détection sur les postes (25 000 € par an) : facteur d'exposition 20 %, taux d'occurrence 0,1.
ALE avant = 600 000 × 30 % × 0,5 = 180 000 × 0,5 = **90 000 €** ; ALE après = 600 000 × 20 % × 0,1 = 120 000 × 0,1 = **12 000 €**.
Gain net = 90 000 − 12 000 − 25 000 = **53 000 € par an** : la mesure est justifiée. Elle le resterait tant que son coût annuel est inférieur à 78 000 €.

## Erreurs fréquentes
- Qualifier le faux changement de RIB d'atteinte à la confidentialité : la donnée (coordonnées bancaires) a été modifiée sans autorisation, c'est l'intégrité qui est atteinte en premier.
- Éteindre tous les serveurs ou restaurer immédiatement la dernière sauvegarde : on isole d'abord le poste sans l'éteindre, puis on alerte ; restaurer sans analyse réinstalle parfois le logiciel malveillant.
- Payer la rançon en comptant sur l'assurance : le paiement n'est ni recommandé ni garanti efficace, et l'indemnisation suppose une plainte sous 72 heures.
- Comparer le coût de la mesure à l'ALE avant seulement : il faut raisonner sur la baisse d'ALE (avant − après).

## À retenir
- Une fausse demande de changement de RIB qui aboutit porte atteinte à l'intégrité des données ; une fuite de fichier clients, à la confidentialité.
- Le maillon humain reste la première porte d'entrée : la sensibilisation est une mesure de sécurité à part entière.
- Payer la rançon ne garantit ni la récupération des données ni leur non-divulgation.

**Notions liées :** [Politique de sécurité et continuité](/cours/politique-securite-continuite) · [Protection des données personnelles dans le SI](/cours/protection-donnees-rgpd-si) · [Gestion des risques et contrôle interne](/cours/gestion-risques-controle-interne) · [Conformité réglementaire du SI (NIS 2, DORA)](/cours/conformite-reglementaire-si)
