# Ventes-clients — contrôles clés

**Références :** NEP 315 (compréhension du contrôle interne) ; NEP 330 (procédures mises en œuvre en réponse à l'évaluation des risques) ; NEP 530 (sondages) ; NEP 265 (communication des faiblesses du contrôle interne)

**Enjeu :** identifier le contrôle qui répond à un risque donné, repérer un cumul de fonctions dangereux et savoir comment le CAC teste un contrôle avant de s'y appuyer : trois questions récurrentes du cas d'audit.

Le cycle suit la chaîne commande → livraison → facturation → comptabilisation → encaissement et recouvrement. Chaque étape porte des contrôles clés, chacun répondant à une assertion précise :
- **Commande** : validation des commandes, ouverture de compte et plafond d'encours fixés par une fonction crédit indépendante des commerciaux (évaluation future des créances).
- **Livraison** : bons de livraison prénumérotés, signés par le client, séquence contrôlée (réalité et exhaustivité).
- **Facturation** : rapprochement systématique bons de livraison / factures (exhaustivité, séparation) ; fichier des tarifs à accès restreint et modifications validées et tracées ; blocage automatique des remises hors barème sauf validation d'un responsable (mesure).
- **Comptabilisation** : rapprochement périodique comptabilité auxiliaire clients / compte collectif 411 ; revue des écritures manuelles sur les comptes 70.
- **Encaissement et recouvrement** : séparation entre encaissement, tenue des comptes clients et émission des avoirs ; avoirs autorisés par un responsable ; lettrage, relances, revue de la balance âgée par une personne indépendante.

```diagram
{"type":"flow","title":"Cycle ventes : un contrôle clé par étape","steps":[{"label":"Commande","note":"plafond d'encours fixé par le crédit client"},{"label":"Livraison","note":"BL prénumérotés, signés par le client"},{"label":"Facturation","note":"BL ↔ factures ; tarifs protégés ; remises bloquées"},{"label":"Comptabilisation","note":"auxiliaire ↔ collectif 411"},{"label":"Encaissement","note":"encaisser, tenir les comptes, émettre les avoirs : trois personnes"}]}
```

**Séparation des tâches :** une même personne ne doit pas à la fois encaisser, tenir les comptes clients et émettre des avoirs : elle pourrait détourner un règlement puis solder la créance par un avoir fictif sans que rien n'apparaisse.

**Tests de procédures (NEP 330) :** si le CAC s'appuie sur un contrôle, il en teste l'efficacité sur toute la période (interrogation, observation, inspection, réexécution). Taille d'échantillon d'un test d'attributs sans écart attendu : n ≈ facteur de confiance / taux d'écart tolérable (facteur ≈ 3 pour 95 %, ≈ 2,3 pour 90 %). Cette approximation (loi de Poisson) est une pratique de cabinet : la NEP 530 n'impose aucune formule. Une faiblesse significative relevée est communiquée à la direction et à la gouvernance (NEP 265).

**Formules clés :** n = R / TET (R : facteur de confiance ; TET : taux d'écart tolérable) ; taux de déviation observé = écarts / taille de l'échantillon

## Exemple
Le CAC veut s'appuyer sur le rapprochement BL / facture (exhaustivité). Niveau de confiance 95 %, taux d'écart tolérable 5 %, aucun écart attendu : n = 3 / 0,05 = **60 bons de livraison**, tirés au hasard sur les douze mois. Au seuil de 90 % avec un TET de 10 %, 2,3 / 0,10 ≈ 23 BL suffiraient.
Résultat : 0 écart sur 60 → le contrôle est jugé efficace et les tests substantifs d'exhaustivité sont allégés. Avec 1 écart, le taux observé (1,7 %) reste sous 5 %, mais la limite supérieure du taux d'écart à 95 % (facteur de Poisson 4,74 pour un écart : 4,74 / 60 ≈ 7,9 %) dépasse le TET : l'auditeur étend l'échantillon ou renonce à s'appuyer sur le contrôle.

## Erreurs fréquentes
- Classer la confirmation de solde parmi les contrôles internes : c'est une procédure substantive de l'auditeur ; les contrôles internes sont ceux de l'entité.
- Attribuer la prénumérotation des BL à la mesure : elle couvre l'exhaustivité (aucune livraison perdue) ; le prix facturé relève du fichier des tarifs et du contrôle des remises.
- Juger dangereux le cumul « saisie des commandes + préparation des livraisons » : il ne donne pas accès aux fonds ; le cumul critique est encaissement + comptes clients + avoirs.
- Traiter un contrôle défaillant comme une anomalie dans les comptes : il modifie l'évaluation du risque et l'étendue des travaux substantifs, et se communique selon la NEP 265.

## À retenir
- Un contrôle couvre une assertion précise : BL prénumérotés → exhaustivité ; tarifs protégés → mesure.
- Plus le taux d'écart tolérable est faible ou le niveau de confiance élevé, plus l'échantillon est grand.
- Une confirmation de solde n'est pas un contrôle interne : c'est une procédure substantive de l'auditeur.

**Notions liées :** [Évaluation du contrôle interne](/cours/evaluation-controle-interne) · [Réponses aux risques évalués](/cours/reponses-risques-evalues) · [Achats-fournisseurs — contrôles clés](/cours/achats-fournisseurs-controles-cles) · [Trésorerie — contrôles clés](/cours/tresorerie-controles-cles)
