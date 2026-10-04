# Ventes-clients — contrôles clés

**Références :** NEP 315 (compréhension du contrôle interne) ; NEP 330 (procédures mises en œuvre en réponse à l'évaluation des risques)

Le cycle suit la chaîne commande → livraison → facturation → comptabilisation → encaissement et recouvrement. Chaque étape porte des contrôles clés :
- **Commande** : validation des commandes, ouverture de compte et plafond d'encours fixés par une fonction crédit indépendante des commerciaux.
- **Livraison** : bons de livraison prénumérotés, signés par le client.
- **Facturation** : rapprochement systématique bons de livraison / factures (exhaustivité, séparation) ; fichier des tarifs à accès restreint et modifications validées ; contrôle automatique des remises accordées (mesure).
- **Comptabilisation** : rapprochement périodique comptabilité auxiliaire clients / compte collectif 411.
- **Encaissement et recouvrement** : séparation entre encaissement, tenue des comptes clients et émission des avoirs ; avoirs autorisés par un responsable ; lettrage, relances, revue de la balance âgée.

**Séparation des tâches :** une même personne ne doit pas à la fois encaisser, tenir les comptes clients et émettre des avoirs (risque de détournement masqué).

**Tests de procédures (NEP 330) :** si le CAC s'appuie sur un contrôle, il en teste l'efficacité sur la période (interrogation, observation, inspection, réexécution). Taille d'échantillon d'un test d'attributs sans écart attendu : n ≈ facteur de confiance / taux d'écart tolérable (facteur ≈ 3 pour 95 %, ≈ 2,3 pour 90 %). Cette approximation (loi de Poisson) est une pratique de cabinet : la NEP 530 n’impose aucune formule.

**Formules clés :** n = R / TET (R : facteur de confiance ; TET : taux d'écart tolérable)

## À retenir
- Un contrôle couvre une assertion précise : BL prénumérotés → exhaustivité ; tarifs protégés → mesure.
- Plus le taux d'écart tolérable est faible ou le niveau de confiance élevé, plus l'échantillon est grand.
- Une confirmation de solde n'est pas un contrôle interne : c'est une procédure substantive de l'auditeur.
