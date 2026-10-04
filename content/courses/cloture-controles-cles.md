# Clôture — contrôles clés

**Références :** NEP 315 (compréhension du contrôle interne) ; NEP 330 (procédures mises en œuvre en réponse à l'évaluation des risques) ; NEP 450 (évaluation des anomalies relevées au cours de l'audit) ; NEP 320 (seuil de signification) ; NEP 580 (déclarations de la direction)

**Enjeu :** le processus de clôture est un contrôle interne à lui seul (calendrier, recensements, revue des écritures manuelles) ; l'examen demande de désigner le contrôle qui couvre une assertion donnée et, côté auditeur, de manier correctement le cumul des anomalies non corrigées de la NEP 450.

Contrôles de l'entité sur le processus de clôture, dans l'ordre où ils interviennent :
- **Calendrier et instructions de clôture** formalisés : dates d'arrêté, liste des régularisations à passer, responsables désignés. Un calendrier raccourci sans instructions renforcées est une faiblesse.
- **Recensement des factures non parvenues** : rapprochement à la clôture des bons de réception et des commandes livrées non encore facturées, relance des services pour les prestations reçues (honoraires, énergie, sous-traitance). Ce contrôle part des biens et services réellement reçus : il couvre directement l'**exhaustivité** des charges à payer (408).
- **Revue des contrats et abonnements** pour identifier les charges et produits constatés d'avance (486, 487) et calculer les prorata.
- **Justification des comptes** : chaque solde de bilan est justifié par une pièce ou un état de rapprochement (banques, auxiliaires / collectifs, comptes d'attente soldés, TVA rapprochée des déclarations).
- **Revue et autorisation des écritures manuelles** d'inventaire par un responsable distinct de leur auteur : réponse au risque de contournement des contrôles par la direction.
- **Recensement des litiges, engagements hors bilan et événements postérieurs** auprès des services juridique, commercial et financier, pour alimenter les provisions et l'annexe.

```diagram
{"type":"flow","title":"Processus de clôture et contrôle clé à chaque étape","steps":[{"label":"Instructions de clôture","note":"calendrier, régularisations, responsables"},{"label":"Recensement des FNP","note":"réceptions non facturées → 408"},{"label":"Régularisations","note":"contrats → 486 et 487 au prorata"},{"label":"Écritures manuelles","note":"revues par un responsable distinct"},{"label":"Justification des comptes","note":"pièce ou rapprochement par solde"},{"label":"Litiges et événements","note":"juridique, commercial → provisions, annexe"}]}
```

Côté auditeur (NEP 450) : synthèse des anomalies relevées en fin de mission.
- Les anomalies supérieures au **seuil des anomalies manifestement insignifiantes** sont cumulées et communiquées en temps utile à la direction, qui est invitée à les corriger ; celles qui sont inférieures à ce seuil, fixé par le CAC à un niveau tel que leur cumul ne peut être significatif, ne sont pas récapitulées (une anomalie révélatrice d'une fraude n'est jamais « insignifiante », quel que soit son montant).
- Les anomalies non corrigées sont appréciées individuellement et cumulées, par rapport au seuil de signification (NEP 320) et compte tenu de leur nature (franchissement d'un covenant, passage d'une perte à un bénéfice, incidence sur la rémunération des dirigeants).
- Le CAC obtient de la direction une déclaration écrite indiquant qu'elle estime l'incidence des anomalies non corrigées non significative, la liste étant jointe (NEP 580) ; un cumul proche du seuil l'incite à revoir sa stratégie et à étendre ses travaux.

**Formules clés :** cumul des anomalies non corrigées = Σ anomalies > seuil des anomalies manifestement insignifiantes, non corrigées par la direction

## Exemple
SA Altaïr, seuil de signification 100 000 €, seuil des anomalies manifestement insignifiantes 5 000 €. Feuille de synthèse : facture d'électricité de décembre N non provisionnée, 42 000 € HT ; abonnements facturés en N pour N+1 non différés, 18 000 € HT ; charges constatées d'avance surévaluées de 12 000 € ; erreur d'imputation entre deux comptes de charges de 3 000 €.
L'erreur de 3 000 € est inférieure à 5 000 € : non cumulée. Les trois autres surévaluent toutes le résultat : cumul = 42 000 + 18 000 + 12 000 = **72 000 €** < 100 000 €. La direction accepte de comptabiliser la facture d'électricité : reliquat non corrigé = 72 000 − 42 000 = **30 000 €**, listé dans la lettre d'affirmation. Le CAC vérifie que ces 30 000 € ne font pas basculer un covenant ou le signe du résultat avant de conclure à l'absence d'incidence sur l'opinion.

## Erreurs fréquentes
- Attribuer l'exhaustivité des charges à payer à la revue mensuelle du compte de résultat, à l'autorisation des règlements ou au lettrage fournisseurs : ces contrôles ne voient que ce qui est déjà enregistré ou payé ; seul le rapprochement des réceptions non facturées va chercher ce qui manque.
- Cumuler une anomalie inférieure au seuil des anomalies manifestement insignifiantes, ou exiger sa correction sous peine de réserve.
- Laisser dans le cumul une anomalie entièrement corrigée par la direction avant l'arrêté : elle n'affecte plus les comptes.
- Comparer les anomalies une à une au seuil de signification sans les additionner : l'appréciation est individuelle **et** cumulée.

## À retenir
- Un contrôle de clôture testé efficace réduit l'étendue des tests de détail mais ne les supprime pas pour les risques significatifs.
- Les anomalies inférieures au seuil des anomalies manifestement insignifiantes ne sont pas cumulées ; une anomalie corrigée sort du cumul, une correction partielle laisse le reliquat.
- La revue des écritures manuelles par une personne distincte de leur auteur est le contrôle central de la clôture.

**Notions liées :** [Clôture — risques](/cours/cloture-risques) · [Clôture — procédures substantives](/cours/cloture-procedures-substantives) · [Seuil de signification](/cours/seuil-signification) · [Évaluation du contrôle interne](/cours/evaluation-controle-interne)
