# Trésorerie — contrôles clés

**Références :** NEP 315 (compréhension du contrôle interne) ; NEP 330 (tests de procédures) ; NEP 265 (communication des faiblesses) ; NEP 530 (sondages)

**Enjeu :** sur la trésorerie, le contrôle interne vaut autant que les procédures substantives : un rapprochement bancaire indépendant et un contre-appel sur les changements de RIB arrêtent la plupart des fraudes ; l'examen demande de reconnaître un cumul de fonctions et de choisir la mesure corrective adaptée.

- **Séparation des fonctions** : autorisation de la dépense, émission du paiement, enregistrement comptable et rapprochement bancaire sont confiés à des personnes différentes ; celui qui paie ne rapproche jamais.
- **Autorisation des paiements** : liste des signataires à jour et notifiée aux banques ; double signature ou double validation électronique au-delà d'un seuil ; paiement sur facture validée (« bon à payer »).
- **Banque en ligne** : habilitations nominatives revues périodiquement, authentification forte, plafonds par utilisateur, suppression immédiate des droits des partants.
- **Fichier des tiers** : toute modification de RIB fournisseur est vérifiée par contre-appel à un interlocuteur connu, au numéro figurant au dossier (jamais celui du courriel reçu) ; la personne qui modifie le RIB ne paie pas et la modification est tracée.
- **Rapprochements bancaires** : mensuels, pour tous les comptes, établis par une personne sans accès aux paiements, revus et visés par un responsable qui examine les suspens pièces à l'appui ; un visa sans examen est une revue de pure forme.
- **Encaissements** : liste des chèques reçus dès l'ouverture du courrier par deux personnes, remise en banque rapide, rapprochement liste / remises.
- **Caisse et moyens de paiement** : plafond d'encaisse, comptages inopinés par une personne indépendante, chéquiers vierges sous clé.

```diagram
{"type":"flow","title":"Changement de RIB fournisseur : qui fait quoi","steps":[{"label":"Demande reçue","note":"Courriel ou courrier du « fournisseur »"},{"label":"Contre-appel","note":"Interlocuteur connu, numéro du dossier"},{"label":"Modification tracée","note":"Par un agent sans accès aux paiements"},{"label":"Paiement","note":"Par un autre agent, double validation"},{"label":"Rapprochement","note":"Personne indépendante ; détecte a posteriori"}]}
```

**Tests de procédures (NEP 330) :** interrogation, observation, inspection, réexécution. Un contrôle testé à l'intérim ne couvre pas la période restant à courir : l'auditeur recueille des éléments sur cette période (changements intervenus : logiciel, signataires, procédures ; tests complémentaires). Taille d'échantillon d'un test d'attributs sans écart attendu : n ≈ R / TET, approximation de pratique de cabinet (la NEP 530 n'impose aucune formule) ; un contrôle mensuel se teste sur un petit nombre d'occurrences et une petite population se teste en totalité.

**Formules clés :** n = R / TET, arrondi à l'entier supérieur (R ≈ 3 pour 95 % de confiance, ≈ 2,3 pour 90 %)

## Exemple
Chez Canopus, la procédure prévoit un contre-appel documenté avant toute modification de RIB fournisseur. Sur l'exercice, 18 modifications ont été enregistrées : population réduite, l'auditeur inspecte les 18 dossiers. Deux ne comportent aucune trace de contre-appel ; les paiements effectués sur ces deux nouveaux RIB totalisent 86 000 €.
Conclusion : le contrôle n'est pas appliqué de façon constante, l'auditeur ne s'appuie pas sur lui ; il vérifie directement les deux RIB auprès des fournisseurs (confirmation), s'assure que les 86 000 € ont bien été reçus par eux et communique la faiblesse à la direction (NEP 265). Pour le contrôle de double validation des virements, il aurait au contraire sondé : n = 2,3 / 0,04 = 57,5, soit 58 virements à 90 % de confiance.

## Erreurs fréquentes
- Compter sur le rapprochement bancaire pour détecter une fraude au RIB : le virement vers le faux compte figure normalement sur le relevé ; seul le contre-appel, préventif, l'empêche.
- Corriger un cumul paiement / rapprochement en augmentant la fréquence du rapprochement par la même personne, ou en relevant le seuil de double signature : la séparation des fonctions n'est pas rétablie, le contrôle est même affaibli.
- Demander au CAC d'établir lui-même les rapprochements : c'est une tâche de gestion, incompatible avec son indépendance.
- S'appuyer sur un test d'intérim pour tout l'exercice sans travaux sur la période résiduelle.

## À retenir
- Le rapprochement bancaire est le contrôle clé du cycle, à condition d'être indépendant et revu.
- Le contre-appel est le contrôle préventif contre la fraude au changement de RIB ; le rapprochement ne la détecte qu'a posteriori.
- Un changement de logiciel ou le départ d'un signataire après l'intérim impose de retester les contrôles.

**Notions liées :** [Trésorerie — risques](/cours/tresorerie-risques) · [Trésorerie — procédures substantives](/cours/tresorerie-procedures-substantives) · [Achats-fournisseurs — contrôles clés](/cours/achats-fournisseurs-controles-cles) · [Indépendance et déontologie](/cours/independance-deontologie)
