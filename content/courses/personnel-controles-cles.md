# Personnel — contrôles clés

**Références :** NEP 315 (compréhension du contrôle interne) ; NEP 330 (procédures mises en œuvre en réponse à l'évaluation des risques, tests de procédures) ; NEP 530 (sondages)

**Enjeu :** repérer, à chaque étape de la chaîne de paie, le contrôle qui empêche une rémunération non autorisée ou mal calculée, puis savoir ce que le CAC doit faire pour s'appuyer dessus (le tester, sur toute la période) ; l'examen aime les cas de cumul de fonctions.

Le cycle suit la chaîne recrutement → gestion des données permanentes → saisie des temps et variables → calcul de la paie → paiement → déclarations sociales (DSN) et comptabilisation.
- **Recrutement et départs** : contrats signés par une personne habilitée ; entrées et sorties saisies par la DRH, indépendante de la paie, à partir du registre unique du personnel.
- **Fichier permanent** : modifications de salaire, de taux horaire ou de RIB autorisées par écrit ; état mensuel des modifications édité par le logiciel, rapproché des pièces (avenants, demandes signées) et visé par un responsable : c'est le contrôle qui bloque le salarié fictif et le RIB détourné.
- **Temps et variables** : heures supplémentaires et primes validées par le responsable hiérarchique avant transmission à la paie.
- **Calcul** : contrôle de cohérence mensuel (masse salariale et effectif par rapport au mois précédent) ; rapprochement effectif payé / effectif présent selon la DRH ; mise à jour des paramètres (taux, plafonds) tracée.
- **Paiement** : virement validé par une personne distincte du gestionnaire de paie, après rapprochement du fichier de virement et du journal de paie (nombre de virements, total net).
- **Déclarations et comptabilisation** : rapprochement journal de paie / DSN / comptes 421, 431 et 641 ; la DSN transmise à l'URSSAF constitue une source externe utile aux tests substantifs.

```diagram
{"type":"flow","title":"Flux de la paie, du pointage à la DSN : un contrôle clé par étape","steps":[{"label":"Entrée du salarié","note":"Contrat signé, saisie par la DRH"},{"label":"Fichier permanent","note":"État mensuel des modifications visé"},{"label":"Temps et variables","note":"Validation hiérarchique"},{"label":"Calcul de la paie","note":"Effectif payé = effectif présent"},{"label":"Virement","note":"Validé par un tiers, rapproché du journal"},{"label":"DSN et comptabilité","note":"Journal de paie = DSN = 421 / 431 / 641"}]}
```

**Séparation des tâches :** la même personne ne doit pas à la fois créer ou modifier un salarié dans le fichier, calculer la paie et valider les paiements ; un seul de ces cumuls suffit à rendre la fraude possible sans complicité.

**Tests de procédures (NEP 330) :** si le CAC s'appuie sur un contrôle, il en teste l'efficacité sur toute la période concernée (demande d'informations, inspection des visas, réexécution) ; une simple prise de connaissance par test de cheminement ne suffit pas. Taille d'échantillon d'un test d'attributs sans écart attendu (pratique de cabinet, la NEP 530 n'impose pas de formule) : n ≈ R / TET, arrondi à l'entier supérieur.

**Formules clés :** n = R / TET (R : facteur de confiance, ≈ 3 pour 95 %, ≈ 2,3 pour 90 % ; TET : taux d'écart tolérable) ; taux d'écart observé = écarts constatés / n

## Exemple
Le CAC veut s'appuyer sur la validation hiérarchique des heures supplémentaires. Niveau de confiance 95 % (R = 3), taux d'écart tolérable 5 %, aucun écart attendu : n = 3 / 0,05 = **60 saisies** à tester, réparties sur les douze mois de N.
Deux saisies sur 60 sont dépourvues de validation, soit un taux observé de 3,3 % alors que la conclusion favorable supposait zéro écart : le contrôle n'est pas jugé efficace ; le CAC ne réduit pas ses procédures substantives et recalcule un échantillon élargi d'heures supplémentaires à partir des relevés de temps.

## Erreurs fréquentes
- Juger grave le cumul « valider les heures supplémentaires et évaluer ses collaborateurs » : il est normal pour un responsable hiérarchique ; le cumul critique est création du salarié + calcul + validation du virement.
- Penser que l'état mensuel des modifications du fichier permanent prévient l'omission des congés à payer ou les retards de DSN : il cible le paiement de rémunérations non autorisées.
- S'appuyer sur un contrôle après un seul test de cheminement : le cheminement sert à comprendre, le test de procédures sur la période sert à s'appuyer.
- Arrondir n à l'entier inférieur : 57,5 devient 58, sinon le niveau de confiance recherché n'est pas atteint.

## À retenir
- Le rapprochement effectif payé / effectif présent couvre la réalité (salariés fictifs).
- Un contrôle seulement décrit (prise de connaissance) ne permet pas de réduire les procédures substantives : il faut le tester.
- Le paiement validé par le gestionnaire de paie lui-même est une faiblesse majeure.

**Notions liées :** [Personnel — risques](/cours/personnel-risques) · [Évaluation du contrôle interne](/cours/evaluation-controle-interne) · [Réponses aux risques évalués](/cours/reponses-risques-evalues) · [Achats-fournisseurs — contrôles clés](/cours/achats-fournisseurs-controles-cles)
