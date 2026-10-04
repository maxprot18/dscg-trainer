# Personnel — contrôles clés

**Références :** NEP 315 (compréhension du contrôle interne) ; NEP 330 (procédures mises en œuvre en réponse à l'évaluation des risques)

Le cycle suit la chaîne recrutement → gestion des données permanentes → saisie des temps et variables → calcul de la paie → paiement → déclarations sociales (DSN) et comptabilisation.
- **Recrutement et départs** : contrats signés par une personne habilitée ; entrées et sorties saisies par la DRH, indépendante de la paie.
- **Fichier permanent** : modifications de salaire, de taux horaire ou de RIB autorisées par écrit ; état mensuel des modifications revu et visé par un responsable.
- **Temps et variables** : heures supplémentaires et primes validées par le responsable hiérarchique avant transmission à la paie.
- **Calcul** : contrôle de cohérence mensuel (masse salariale et effectif par rapport au mois précédent) ; rapprochement effectif payé / effectif présent selon la DRH.
- **Paiement** : virement validé par une personne distincte du gestionnaire de paie, après rapprochement du fichier de virement et du journal de paie.
- **Déclarations et comptabilisation** : rapprochement journal de paie / DSN / comptes 421, 431 et 641.

**Séparation des tâches :** la même personne ne doit pas à la fois créer ou modifier un salarié dans le fichier, calculer la paie et valider les paiements.

**Tests de procédures (NEP 330) :** si le CAC s'appuie sur un contrôle, il en teste l'efficacité sur toute la période concernée. Taille d'échantillon d'un test d'attributs sans écart attendu (pratique de cabinet, la NEP 530 n'impose pas de formule) : n ≈ R / TET, arrondi à l'entier supérieur.

**Formules clés :** n = R / TET (R : facteur de confiance, ≈ 3 pour 95 %, ≈ 2,3 pour 90 % ; TET : taux d'écart tolérable)

## À retenir
- Le rapprochement effectif payé / effectif présent couvre la réalité (salariés fictifs).
- Un contrôle seulement décrit (prise de connaissance) ne permet pas de réduire les procédures substantives : il faut le tester.
- Le paiement validé par le gestionnaire de paie lui-même est une faiblesse majeure.
