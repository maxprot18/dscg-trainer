# Tableau des flux de trésorerie consolidé

**Références :** IAS 7 §10, §18-20, §28, §31-38, §39-42A et §43 (règl. UE 2023/1803) ; règl. ANC 2020-01 (tableau des flux de trésorerie consolidé)

**Enjeu :** le tableau consolidé reprend la logique d'IAS 7 avec trois pièges propres au groupe (minoritaires, mises en équivalence, variations de périmètre) ; à l'examen, on reconstitue le flux opérationnel par la méthode indirecte et l'on classe les opérations sur le périmètre.

Le tableau consolidé reprend les trois catégories de flux (opérationnels, investissement, financement) et explique la variation de la trésorerie de l'ensemble consolidé. Seuls les flux avec des tiers extérieurs au groupe y figurent : les flux intragroupe (dividendes versés à la mère, prêts entre filiales intégrées) sont éliminés comme dans le compte de résultat.

**Méthode indirecte, spécificités du consolidé**
- Point de départ : résultat net de l'ensemble consolidé (part du groupe **et** minoritaires), car la trésorerie des filiales appartient en totalité à l'ensemble consolidé.
- La quote-part de résultat des sociétés mises en équivalence est retranchée (aucun flux) ; les dividendes reçus de ces sociétés sont des flux réels, classés selon la convention retenue par le groupe (IAS 7 §37-38 : opérationnels ou investissement).
- Charges et produits calculés retraités : amortissements, dépréciations, provisions, impôts différés, plus ou moins-values de cession (le prix de cession est un flux d'investissement).

**Variations de périmètre**
- Prise de contrôle : flux d'investissement net = prix payé en trésorerie − trésorerie de la filiale acquise (IAS 7 §39 et §42) ; un complément de prix non encore versé n'est pas un flux de l'exercice.
- Perte de contrôle : prix encaissé − trésorerie cédée, en investissement.
- Achat ou cession de titres d'une filiale sans changement de contrôle : flux de financement (IAS 7 §42A), car il s'agit d'une transaction entre actionnaires.

**Financement** : dividendes versés aux actionnaires de la mère et aux minoritaires des filiales (si la convention les classe en financement), émissions et remboursements d'emprunts, remboursement du principal des dettes locatives.

**Opérations non monétaires** (acquisition d'un actif par contrat de location, paiement en actions, conversion d'obligations) : exclues du tableau, décrites en annexe (IAS 7 §43).

**Change** : l'incidence des variations de cours sur la trésorerie libellée en devises est présentée sur une ligne distincte (IAS 7 §28).

**Formule clé :** trésorerie de clôture = trésorerie d'ouverture + flux opérationnels + flux d'investissement + flux de financement + incidence des variations de change

## Exemple
Groupe IFRS, N (k€) : résultat net de l'ensemble consolidé 1 200 (dont PNC 200) ; dotations nettes 500 ; quote-part de résultat des sociétés mises en équivalence 90 et dividendes reçus d'elles 40 (classés en opérationnel) ; plus-value de cession 30 ; augmentation du BFR 110.
Flux opérationnel = 1 200 + 500 − 90 + 40 − 30 − 110 = 1 510. Investissement : prise de contrôle payée 2 000 pour une trésorerie acquise de 300, soit −1 700, et cession d'immobilisation encaissée 150 → −1 550. Financement : rachat de 10 % de minoritaires −250, dividendes de la mère −300 et des minoritaires −60, emprunt +500 → −110. Incidence du change +20.
Variation de trésorerie = 1 510 − 1 550 − 110 + 20 = −130.

```diagram
{"type":"bars","title":"Flux consolidés de l'exemple","unit":"k€","items":[{"label":"Opérationnel","value":1510},{"label":"Investissement","value":-1550},{"label":"Financement","value":-110},{"label":"Change","value":20},{"label":"Variation trésorerie","value":-130}]}
```

## Erreurs fréquentes
- Inscrire le prix total payé pour une filiale en investissement et sa trésorerie en flux opérationnel : on présente un seul flux d'investissement, net de la trésorerie acquise (ici 1 700, pas 2 000).
- Retraiter la quote-part des sociétés mises en équivalence sans ajouter les dividendes reçus (ou n'en retrancher que la part du groupe) : la quote-part s'annule en totalité et le dividende encaissé s'ajoute.
- Classer le rachat de minoritaires d'une filiale déjà contrôlée en investissement : sans changement de contrôle, c'est un flux de financement (IAS 7 §42A).

## À retenir
- Partir du résultat part du groupe est une erreur : les minoritaires appartiennent à l'ensemble consolidé.
- La trésorerie de la filiale acquise vient en déduction du prix payé.
- Le rachat de minoritaires d'une filiale déjà contrôlée relève du financement, pas de l'investissement.

**Notions liées :** [IAS 7 — Tableau des flux de trésorerie](/cours/ias-7-tableau-flux-tresorerie) · [Variations de périmètre](/cours/variations-perimetre) · [Diagnostic par les flux de trésorerie](/cours/flux-tresorerie-diagnostic) · [Présentation des états financiers consolidés](/cours/etats-financiers-consolides-presentation)
