# Trésorerie — contrôles clés

**Références :** NEP 315 (compréhension du contrôle interne) ; NEP 330 (tests de procédures) ; NEP 265 (communication des faiblesses)

- **Séparation des fonctions** : autorisation de la dépense, émission du paiement, enregistrement comptable et rapprochement bancaire sont confiés à des personnes différentes.
- **Autorisation des paiements** : liste des signataires à jour et notifiée aux banques ; double signature ou double validation électronique au-delà d'un seuil ; paiement sur facture validée (« bon à payer »).
- **Banque en ligne** : habilitations nominatives revues périodiquement, authentification forte, plafonds par utilisateur, suppression immédiate des droits des partants.
- **Fichier des tiers** : toute modification de RIB fournisseur est vérifiée par contre-appel à un interlocuteur connu, au numéro figurant au dossier (jamais celui du courriel reçu) ; la personne qui modifie le RIB ne paie pas.
- **Rapprochements bancaires** : mensuels, pour tous les comptes, établis par une personne sans accès aux paiements, revus et visés par un responsable qui examine les suspens.
- **Encaissements** : liste des chèques reçus dès l'ouverture du courrier, remise en banque rapide.
- **Caisse et moyens de paiement** : plafond d'encaisse, comptages inopinés par une personne indépendante, chéquiers vierges sous clé.

**Tests de procédures (NEP 330) :** interrogation, observation, inspection, réexécution. Un contrôle testé à l'intérim ne couvre pas la période restant à courir : l'auditeur recueille des éléments sur cette période (changements intervenus, tests complémentaires). Taille d'échantillon d'un test d'attributs sans écart attendu : n ≈ R / TET, approximation de pratique de cabinet (la NEP 530 n'impose aucune formule) ; un contrôle mensuel se teste sur un petit nombre d'occurrences.

**Formules clés :** n = R / TET, arrondi à l'entier supérieur (R ≈ 3 pour 95 % de confiance, ≈ 2,3 pour 90 %)

## À retenir
- Le rapprochement bancaire est le contrôle clé du cycle, à condition d'être indépendant et revu.
- Le contre-appel est le contrôle préventif contre la fraude au changement de RIB ; le rapprochement ne la détecte qu'a posteriori.
- Un changement de logiciel ou le départ d'un signataire après l'intérim impose de retester les contrôles.
