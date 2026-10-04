# Stocks — contrôles clés

**Références :** NEP 315 (compréhension du contrôle interne) ; NEP 330 (procédures en réponse à l'évaluation des risques) ; NEP 530 (sondages) ; C. com. art. L. 123-12 (inventaire au moins une fois tous les douze mois)

**Enjeu :** les stocks sont un poste à la fois matériel (vols, pertes, erreurs de comptage) et estimatif (coût, dépréciation) ; connaître les contrôles de chaque étape du cycle permet au CAC de décider s'il peut s'appuyer sur le contrôle interne et d'alléger ses travaux de clôture. À l'examen, on demande surtout de rattacher un contrôle à l'assertion qu'il couvre et de repérer le cumul de fonctions.

Le cycle suit la chaîne réception → stockage → sortie (production ou vente) → inventaire → valorisation. Contrôles clés :
- **Réception** : bons de réception prénumérotés, rapprochés des commandes et des factures fournisseurs ; la séquence numérique permet de repérer une réception non facturée ou non enregistrée (exhaustivité, séparation des exercices).
- **Protection physique** : accès au magasin réservé, gardiennage, assurance ; séparation entre la garde des biens (magasinier), la tenue de l'inventaire permanent et la comptabilité, faute de quoi un vol peut être masqué par une correction des quantités.
- **Sorties** : bons de sortie ou de livraison prénumérotés et signés, saisis dans l'inventaire permanent ; toute sortie sans bon est une anomalie.
- **Inventaire** : instructions écrites, équipes de comptage indépendantes du magasin, comptage en double, arrêt ou maîtrise des mouvements, identification des biens de tiers et des articles abîmés.
- **Inventaire tournant** : admis si l'inventaire permanent est fiable, si chaque référence est comptée au moins une fois par exercice et si les écarts sont analysés et régularisés par une personne indépendante du magasin.
- **Valorisation** : calcul automatique du coût (CMP ou PEPS), fiches de coût de revient revues, revue périodique des articles à rotation lente par une personne compétente, ajustements d'inventaire autorisés.

```diagram
{"type":"flow","title":"Cycle stocks : un contrôle clé par étape","steps":[{"label":"Réception","note":"Bon prénuméroté rapproché commande / facture"},{"label":"Stockage","note":"Accès réservé ; magasinier ≠ inventaire permanent"},{"label":"Sortie","note":"Bon de sortie signé, saisi dans l'inventaire permanent"},{"label":"Inventaire","note":"Équipes indépendantes, double comptage, écarts analysés"},{"label":"Valorisation","note":"CMP / PEPS automatique, revue des rotations lentes"}]}
```

**Tests de procédures (NEP 330) :** si le CAC s'appuie sur un contrôle, il en teste l'efficacité sur la période (inspection des bons signés, observation d'un comptage, réexécution du rapprochement). Taille d'échantillon d'un test d'attributs sans écart attendu : n ≈ facteur de confiance / taux d'écart tolérable (facteur ≈ 3 pour 95 %, ≈ 2,3 pour 90 %), pratique de cabinet non imposée par la NEP 530. Un contrôle testé à l'intérim doit être couvert jusqu'à la clôture (changements intervenus, tests complémentaires).

**Formules clés :** n = R / TET, arrondi à l'entier supérieur (R : facteur de confiance ; TET : taux d'écart tolérable)

## Exemple
Chez Sirius, chaque bon de sortie d'atelier doit être visé par le chef d'atelier avant saisie dans l'inventaire permanent. L'auditeur veut s'appuyer sur ce contrôle : confiance 95 % (R = 3), taux d'écart tolérable 5 %, aucun écart attendu. Taille de l'échantillon : n = 3 / 0,05 = **60 bons**, tirés sur toute la période.
Résultat : 60 bons visés → le contrôle est jugé efficace, l'étendue des comptages de clôture peut être réduite. Un seul bon non visé suffit à remettre en cause la conclusion : l'échantillon a été dimensionné pour zéro écart, le CAC ne s'appuie plus sur le contrôle et étend ses procédures substantives sur l'existence des stocks.

## Erreurs fréquentes
- Confier les comptages d'inventaire tournant aux magasiniers de chaque zone « parce qu'ils connaissent les références » : c'est un cumul garde / contrôle qui permet de masquer un vol ; les compteurs doivent être indépendants du magasin.
- Passer en charges sans analyse les écarts d'inventaire inférieurs à un seuil : l'absence d'analyse empêche de détecter vols et erreurs d'enregistrement ; chaque écart est expliqué puis régularisé après autorisation.
- Croire que la revue des articles à rotation lente ou le calcul automatique du CMP protège contre le vol : ces contrôles portent sur l'évaluation, pas sur l'existence ni sur la protection physique.
- Cibler les comptages sur les références de faible valeur, plus nombreuses : les références significatives restent sans contrôle ; on couvre d'abord la valeur.

## À retenir
- Le magasinier ne doit ni tenir l'inventaire permanent ni valider les écarts d'inventaire.
- Un inventaire permanent fiable, testé, permet de limiter les travaux de fin d'année ; il ne dispense jamais de procédures substantives sur un stock significatif.
- L'assistance du CAC à l'inventaire est une procédure de l'auditeur, pas un contrôle interne.

**Notions liées :** [Stocks — assertions](/cours/stocks-assertions) · [Stocks — procédures substantives](/cours/stocks-procedures-substantives) · [Évaluation du contrôle interne](/cours/evaluation-controle-interne) · [Réponses aux risques évalués](/cours/reponses-risques-evalues)
