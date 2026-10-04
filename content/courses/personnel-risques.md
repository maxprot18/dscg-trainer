# Personnel — risques

**Références :** NEP 315 (connaissance de l'entité et évaluation du risque d'anomalies significatives) ; NEP 240 (fraude) ; NEP 250 (prise en compte du risque d'anomalies significatives résultant du non-respect des textes légaux et réglementaires) ; NEP 520 (procédures analytiques)

**Enjeu :** identifier où la paie peut être fausse ou détournée pour cibler les tests ; l'examen attend que l'on relie chaque constat de prise de connaissance à un risque précis (fraude, erreur de calcul, dette omise, non-conformité) et à sa gravité.

- **Détournements (NEP 240)** : salariés fictifs, salariés sortis maintenus dans le fichier de paie, modification frauduleuse d'un RIB ou d'un taux horaire, heures supplémentaires non effectuées, avances non récupérées. Ils supposent presque toujours qu'une même personne accède au fichier permanent et au paiement.
- **Erreurs de calcul** : paramétrage du logiciel de paie (taux, plafonds, convention collective), changement de logiciel en cours d'exercice ; l'erreur est systématique et se répète sur chaque bulletin.
- **Dettes sociales minorées** : congés payés, primes et charges sociales correspondantes omis ou sous-évalués à la clôture ; cotisations de décembre non comptabilisées.
- **Risques juridiques** : redressement de cotisations à la suite d'un contrôle URSSAF, litiges prud'homaux, travail dissimulé ; ils peuvent nécessiter une provision (compte 151) ou une information en annexe.
- **Facteurs de risque** : séparation des tâches insuffisante entre gestion du personnel, paie et paiement ; forte rotation ; nombreux intérimaires ; rémunérations variables complexes ; effectif payé supérieur à l'effectif présent selon le registre unique du personnel.

**NEP 250 :** pour les textes ayant une incidence directe sur les comptes (droit social pour le calcul des cotisations, par exemple), le CAC collecte des éléments suffisants et appropriés sur leur respect. Pour les autres textes (santé et sécurité au travail, par exemple), il se limite à s'enquérir auprès de la direction et à consulter la correspondance avec les autorités administratives et de contrôle ; il ne mène ni audit de conformité ni confirmation auprès de l'inspection du travail.

**Procédures analytiques de planification (NEP 520) :** masse salariale rapportée à l'effectif moyen, taux global de charges sociales (645 / 641) comparé à N−1 ; un écart inexpliqué devient un risque identifié qui oriente les procédures substantives.

**Formules clés :** charges sociales attendues = salaires bruts × taux moyen de cotisations patronales N−1 ; écart = montant attendu − montant comptabilisé ; taux apparent N = 645 / 641

## Exemple
Société Sirius, planification de l'audit N : salaires bruts (641) 3 600 000 € ; taux de charges patronales observé en N−1 : 42 % ; charges sociales comptabilisées (645) : 1 404 000 €. Aucun changement de structure annoncé par la direction.
Charges attendues = 3 600 000 × 42 % = 1 512 000 € ; écart = **108 000 €**, soit un taux apparent de 1 404 000 / 3 600 000 = **39 %**. L'auditeur ne conclut pas : il identifie un risque de sous-évaluation des charges et dettes sociales (cotisations de décembre ou charges sur congés omises, paramétrage) ou un allègement de cotisations non documenté, et programme des rapprochements 645 / DSN.

```diagram
{"type":"bars","title":"Charges sociales N chez Sirius : attente contre comptabilisé","unit":"k€","items":[{"label":"Attendu (42 %)","value":1512},{"label":"Comptabilisé","value":1404},{"label":"Écart","value":108}]}
```

## Erreurs fréquentes
- Voir un facteur de risque dans un logiciel de paie du marché mis à jour par l'éditeur : c'est au contraire un facteur de fiabilité ; le risque naît du cumul de fonctions et des écarts effectif payé / effectif présent.
- Écarter une lettre d'observations de l'URSSAF reçue en février N+1 parce qu'elle est postérieure à la clôture : elle porte sur des faits antérieurs, c'est un événement qui éclaire la situation au 31/12/N (provision ou annexe).
- Exiger du CAC un audit de conformité aux règles d'hygiène et de sécurité : la NEP 250 limite ses diligences, pour les textes sans incidence directe sur les comptes, aux demandes d'information et à la lecture de la correspondance des autorités.
- Appliquer le taux de N−1 sans se demander s'il reste pertinent (changement de structure des effectifs, allègements) : l'attente doit reposer sur des données fiables et actualisées.

## À retenir
- Une masse salariale qui augmente alors que l'effectif baisse sans hausse de salaires appelle une investigation.
- Un contrôle URSSAF portant sur des exercices clos concerne des faits antérieurs à la clôture.
- Le cumul de fonctions (saisie des entrées, calcul de la paie, paiement) est le premier facteur de risque de fraude.

**Notions liées :** [Personnel — contrôles clés](/cours/personnel-controles-cles) · [Fraudes, lois et règlements](/cours/fraudes-lois-reglements) · [Approche par les risques](/cours/approche-par-risques) · [Provisions — risques](/cours/provisions-risques)
