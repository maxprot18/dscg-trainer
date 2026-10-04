# Personnel — procédures substantives

**Références :** NEP 330 ; NEP 520 (procédures analytiques) ; NEP 530 (sondages) ; C. trav. art. L3121-33 et L3121-36 (majoration des heures supplémentaires) ; C. trav. art. L3141-3 et L3141-24 (congés payés) ; PCG comptes 421, 4282, 4286, 431, 4382, 4386, 641, 645

**Enjeu :** après les tests de procédures, le CAC doit obtenir des éléments probants sur les montants eux-mêmes ; l'examen fait construire une attente de masse salariale, recalculer un bulletin ou une dette de congés et proposer l'écriture d'ajustement.

- **Procédure analytique substantive (NEP 520)** : l'auditeur construit une attente de masse salariale à partir de données fiables (effectif moyen issu des DSN, salaire moyen N−1, augmentations au prorata de leur date d'effet), fixe un seuil d'écart acceptable, puis investigue tout écart supérieur : explication de la direction **corroborée** par des éléments probants. Un écart inférieur au seuil apporte l'assurance recherchée sans investigation supplémentaire.
- **Rapprochements** : journal de paie annuel / comptes 641 et 645 / DSN ; solde 421 / virement des salaires de décembre ; soldes 431 et 437 / DSN de décembre et règlement de janvier N+1 (relevé bancaire, source externe).
- **Tests de détail sur un échantillon de salariés** : contrat, convention collective, bulletin recalculé (base, heures supplémentaires, cotisations), preuve de présence, virement sur un compte au nom du salarié.
- **Congés payés à payer** : 2,5 jours ouvrables acquis par mois de travail effectif (L3141-3) ; période de référence, à défaut d'accord, du 1er juin au 31 mai. Au 31/12, la dette couvre le reliquat de la période close et les droits acquis depuis le 1er juin. Indemnité : la plus favorable entre le dixième de la rémunération de la période de référence et le maintien de salaire (L3141-24).

```diagram
{"type":"timeline","title":"Dette de congés payés au 31/12/N : deux périodes à additionner","items":[{"when":"1er juin N−1","label":"Début de la période de référence","note":"2,5 jours ouvrables acquis par mois"},{"when":"31 mai N","label":"Clôture de la période","note":"Jours acquis non pris = reliquat"},{"when":"1er juin N","label":"Nouvelle période","note":"Droits en cours d'acquisition"},{"when":"31/12/N","label":"Dette = reliquat + 7 mois × 2,5 jours","note":"× indemnité journalière, + charges sociales (4382)"}]}
```

- **Écritures** : débit 6412 / crédit 4282 (congés) ; débit 645 / crédit 4382 (charges sociales sur congés) ; débit 6413 / crédit 4286 (primes acquises) ; débit 645 / crédit 4386 (charges sur primes). Quand les comptes portent encore le solde de N−1, seul le complément est enregistré.
- **Indemnités de fin de carrière** : si l'entité les provisionne (méthode de référence du PCG, irréversible), contrôle des hypothèses actuarielles et de la dotation (6815 / 153) ; sinon, contrôle du montant indiqué en annexe.

**Formules clés :** masse salariale attendue = effectif moyen N × salaire moyen N−1 × (1 + taux d'augmentation × mois d'application / 12) ; dette de congés = jours acquis non pris × indemnité journalière ; charges sur congés = dette × taux de charges patronales ; taux horaire = salaire mensuel / 151,67

## Exemple
Test de détail sur le bulletin de novembre d'un salarié : salaire de base 2 600 € pour 151,67 h, 10 heures supplémentaires majorées de 25 % (hypothèse conforme à la convention) ; cotisations salariales 22 % et patronales 42 % du brut (taux d'hypothèse).
Taux horaire = 2 600 / 151,67 = 17,14 € ; heures supplémentaires = 10 × 17,14 × 1,25 = 214,28 € ; brut = **2 814,28 €** ; cotisations salariales = 619,14 €, net à payer = **2 195,14 €** ; cotisations patronales = **1 182,00 €**, coût total 3 996,28 €. Le bulletin porte un brut de 2 771,42 € : les heures supplémentaires ont été payées sans majoration (10 × 17,142 = 171,42 €), anomalie à extrapoler à la population des salariés concernés (NEP 530).

## Erreurs fréquentes
- Accepter l'explication écrite de la direction comme justification suffisante d'un écart analytique : elle doit être corroborée par des éléments probants.
- Refuser toute valeur probante à une procédure analytique : utilisée en phase substantive avec une attente fiable, elle apporte des éléments probants (NEP 520).
- Préférer une attestation du responsable de la paie ou l'addition du journal pour vérifier le 431 : la DSN de décembre et le règlement de janvier sont plus probants.
- Appliquer une augmentation du 1er avril sur douze mois : elle ne pèse que neuf mois dans l'attente.

## À retenir
- L'explication de la direction ne suffit pas : elle se corrobore.
- Une augmentation au 1er juillet ne joue que sur 6 mois de l'exercice.
- Les charges sociales sur congés et sur primes sont souvent oubliées.

**Notions liées :** [Personnel — assertions](/cours/personnel-assertions) · [Personnel — pièges classiques](/cours/personnel-pieges) · [Éléments probants et techniques](/cours/elements-probants-techniques) · [IAS 19 — Avantages du personnel](/cours/ias-19-avantages-personnel)
