# Tableau des flux de trésorerie consolidé

**Références :** IAS 7 §10, §18-20, §28, §31-38, §39-42A et §43 (règl. UE 2023/1803, dans sa version modifiée par IFRS 18) ; règl. ANC 2020-01 art. 282-41 et 282-43

**Enjeu :** le tableau consolidé reprend la logique d'IAS 7 avec trois pièges propres au groupe (minoritaires, mises en équivalence, variations de périmètre) ; à l'examen, on reconstitue le flux opérationnel par la méthode indirecte et l'on classe les opérations sur le périmètre.

Le tableau consolidé reprend les trois catégories de flux (opérationnels, investissement, financement) et explique la variation de la trésorerie de l'ensemble consolidé. Seuls les flux avec des tiers extérieurs au groupe y figurent : les flux intragroupe (dividendes versés à la mère, prêts entre filiales intégrées) sont éliminés comme dans le compte de résultat.

**Méthode indirecte, spécificités du consolidé**
- Règles françaises (art. 282-43) : point de départ = résultat net des sociétés intégrées (part du groupe **et** minoritaires, car la trésorerie des filiales appartient en totalité à l'ensemble consolidé) ; la quote-part de résultat des sociétés mises en équivalence en est exclue (aucun flux) et les dividendes qu'elles versent s'ajoutent aux flux liés à l'activité.
- IFRS (IAS 7 modifiée par IFRS 18, exercices ouverts à compter du 1er janvier 2027) : point de départ = résultat d'exploitation (§20), qui exclut la quote-part des sociétés mises en équivalence (catégorie « investissement ») ; l'impôt payé est un flux opérationnel (§35) ; dividendes et intérêts reçus vont en investissement, intérêts versés en financement (§34A, sauf entité dont l'activité principale est d'investir ou de financer).
- Charges et produits calculés retraités : amortissements, dépréciations, provisions, impôts différés (si l'on part du résultat net), plus ou moins-values de cession (le prix de cession est un flux d'investissement).

**Variations de périmètre**
- Prise de contrôle : flux d'investissement net = prix payé en trésorerie − trésorerie de la filiale acquise (IAS 7 §39 et §42 ; « incidence des variations de périmètre » en règles françaises) ; un complément de prix non encore versé n'est pas un flux de l'exercice.
- Perte de contrôle : prix encaissé − trésorerie cédée, en investissement.
- Achat ou cession de titres d'une filiale sans changement de contrôle : flux de financement (IAS 7 §42A), car il s'agit d'une transaction entre actionnaires.

**Financement** : dividendes versés aux actionnaires de la mère et aux minoritaires des filiales (IAS 7 §33A ; art. 282-43), émissions et remboursements d'emprunts, remboursement du principal des dettes locatives.

**Opérations non monétaires** (acquisition d'un actif par contrat de location, paiement en actions, conversion d'obligations) : exclues du tableau, décrites en annexe (IAS 7 §43).

**Change** : l'incidence des variations de cours sur la trésorerie libellée en devises est présentée sur une ligne distincte (IAS 7 §28).

**Formule clé :** trésorerie de clôture = trésorerie d'ouverture + flux opérationnels + flux d'investissement + flux de financement + incidence des variations de change

## Exemple
Groupe IFRS (IAS 7 modifiée par IFRS 18), N (k€) : résultat d'exploitation consolidé 1 300, après dotations nettes 500 et plus-value de cession 30 ; impôt sur le résultat payé 150 ; augmentation du BFR 110 ; dividendes reçus des sociétés mises en équivalence 40.
Flux opérationnel = 1 300 + 500 − 30 − 110 − 150 = 1 510. Investissement : prise de contrôle payée 2 000 pour une trésorerie acquise de 300, soit −1 700, cession d'immobilisation encaissée 150 et dividendes des sociétés mises en équivalence 40 → −1 510. Financement : rachat de 10 % de minoritaires −250, dividendes de la mère −300 et des minoritaires −60, emprunt +500 → −110. Incidence du change +20.
Variation de trésorerie = 1 510 − 1 510 − 110 + 20 = −90.

```diagram
{"type":"bars","title":"Flux consolidés de l'exemple","unit":"k€","items":[{"label":"Opérationnel","value":1510},{"label":"Investissement","value":-1510},{"label":"Financement","value":-110},{"label":"Change","value":20},{"label":"Variation trésorerie","value":-90}]}
```

## Erreurs fréquentes
- Inscrire le prix total payé pour une filiale en investissement et sa trésorerie en flux opérationnel : on présente un seul flux d'investissement, net de la trésorerie acquise (ici 1 700, pas 2 000).
- En règles françaises, retirer la quote-part des sociétés mises en équivalence sans ajouter les dividendes reçus : la quote-part ne génère aucun flux, le dividende encaissé s'ajoute aux flux d'activité ; en IFRS, ce dividende est un flux d'investissement (IAS 7 §34A).
- Classer le rachat de minoritaires d'une filiale déjà contrôlée en investissement : sans changement de contrôle, c'est un flux de financement (IAS 7 §42A).

## À retenir
- Partir du résultat part du groupe est une erreur : les minoritaires appartiennent à l'ensemble consolidé.
- La trésorerie de la filiale acquise vient en déduction du prix payé.
- Le rachat de minoritaires d'une filiale déjà contrôlée relève du financement, pas de l'investissement.

**Notions liées :** [IAS 7 — Tableau des flux de trésorerie](/cours/ias-7-tableau-flux-tresorerie) · [Variations de périmètre](/cours/variations-perimetre) · [Diagnostic par les flux de trésorerie](/cours/flux-tresorerie-diagnostic) · [Présentation des états financiers consolidés](/cours/etats-financiers-consolides-presentation)
