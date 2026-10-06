# Provisions — risques

**Références :** NEP 315 (évaluation du risque d'anomalies significatives) ; NEP 540 (estimations comptables) ; NEP 240 (fraude)

**Enjeu :** la provision est l'outil de pilotage du résultat le plus accessible à une direction ; l'examen demande de déduire le sens probable de l'anomalie (sous- ou surévaluation) des incitations décrites dans le cas, puis de proposer la réponse adaptée.

Les provisions reposent sur des estimations : le risque inhérent dépend de l'**incertitude d'estimation**, de la **complexité** (modèles statistiques, actualisation, calculs actuariels) et de la **subjectivité** des hypothèses retenues par la direction (facteurs de risque inhérent retenus par la NEP 540 révisée, homologuée par arrêté du 13 novembre 2024). Plus ces trois facteurs sont élevés, plus le risque peut être qualifié de significatif et appeler des procédures spécifiques.
- **Sous-évaluation** (exhaustivité, évaluation) : incitation à présenter un résultat plus élevé (covenants bancaires proches de leur seuil, objectifs de résultat, cession envisagée, introduction en bourse).
- **Surévaluation** (existence, évaluation) : constitution de « réserves cachées » les bonnes années, reprises les mauvaises années (lissage du résultat), provisions pour risques généraux non justifiées, grand nettoyage lors d'un changement de dirigeant.
- **Biais de la direction** : hypothèses systématiquement favorables ou changement de méthode non justifié ; il s'apprécie sur l'ensemble des estimations, pas provision par provision, car chaque écart pris isolément peut paraître raisonnable.
- **Facteurs de risque** : litiges nombreux ou significatifs, nouvelle réglementation (environnement, démantèlement), restructuration, garanties sur un nouveau produit, contrats à long terme déficitaires, reprises importantes sans objet.

**Revue rétrospective (NEP 540) :** l'auditeur compare le dénouement des provisions de l'exercice précédent avec les montants provisionnés. Un écart ne prouve pas une anomalie de N−1 (l'estimation dépendait de l'information alors disponible) mais renseigne sur la fiabilité du processus d'estimation et sur un éventuel biais ; un écart toujours dans le même sens est le signal à retenir.

**Formules clés :** écart de dénouement = coûts réels − provision initiale ; écart relatif = écart / provision initiale

## Exemple
Revue rétrospective des provisions au 31/12/N−1 de la société Antarès : litiges 120 000 € → dénouement 95 000 € (écart −25 000 €, soit −20,8 %) ; garanties 80 000 € → coûts réels 112 000 € (écart +32 000 €, +40 %) ; restructuration 50 000 € → 48 000 € (−4 %).
Lecture : les litiges et la restructuration sont estimés de façon raisonnable. Les garanties sont sous-évaluées de 40 % ; si le même sens se retrouve en N−2, le processus présente un biais. La direction ayant un covenant dette nette / EBE tendu, l'auditeur qualifie le risque sur la provision pour garanties d'élevé, recalcule l'estimation N avec le taux de coût réel observé et n'en conclut pas pour autant que les comptes N−1 étaient erronés.

```diagram
{"type":"bars","title":"Antarès : provisions N−1 et coûts réels constatés en N","unit":"k€","items":[{"label":"Litiges — provision","value":120},{"label":"Litiges — réel","value":95},{"label":"Garanties — provision","value":80},{"label":"Garanties — réel","value":112},{"label":"Restructuration — provision","value":50},{"label":"Restructuration — réel","value":48}]}
```

## Erreurs fréquentes
- Expliquer le risque inhérent élevé par un montant toujours supérieur au seuil de signification ou par une confirmation externe obligatoire : il tient à l'estimation et au jugement, pas au montant.
- Voir un risque de sous-évaluation là où le résultat dépasse largement le budget : l'incitation va alors vers la surévaluation (lissage) ; c'est le covenant tendu qui pousse à sous-provisionner.
- Conclure d'une reprise sans objet importante en N que les comptes N−1 comportaient une anomalie : l'estimation s'apprécie avec l'information disponible à l'époque.
- Prendre un registre des litiges rapproché chaque trimestre pour un facteur de risque : c'est un contrôle qui le réduit.

## À retenir
- L'incitation oriente le sens du risque : covenant tendu → sous-provisionnement ; résultat très supérieur aux attentes → surprovisionnement.
- Des reprises sans objet récurrentes sont un signal de provisions excessives ou de lissage.
- Le contournement des contrôles par la direction passe souvent par des écritures manuelles de provisions en fin d'exercice.

**Notions liées :** [Provisions — assertions](/cours/provisions-assertions) · [Provisions — contrôles clés](/cours/provisions-controles-cles) · [Estimations et parties liées](/cours/estimations-parties-liees) · [Fraudes, lois et règlements](/cours/fraudes-lois-reglements)
