# Clôture — assertions d'audit

**Références :** NEP 500 (caractère probant des éléments collectés, assertions) ; C. com. art. L123-12 et L123-13 (comptes annuels, rattachement des charges et produits à l'exercice) ; PCG comptes 408, 418, 4286, 4481, 467, 468, 486, 487

**Enjeu :** les travaux de fin de mission portent sur des écritures d'inventaire sans flux de pièces (charges à payer, régularisations, annexe) ; l'examen demande de nommer l'assertion exacte visée par une procédure, et surtout de reconnaître le **sens du test** (de la pièce vers le compte ou du compte vers la pièce).

Les comptes de l'exercice doivent récapituler les charges et les produits de la période, sans tenir compte de leur date de facturation, d'encaissement ou de paiement (L123-13). Chaque procédure de clôture répond à une assertion précise.

Opérations de fin de période :
- **Séparation des exercices (cut-off)** : charges et produits rattachés à l'exercice de la livraison ou de la prestation, quelle que soit la date de la facture ou du paiement. C'est l'assertion transversale de la clôture, mais elle se décline toujours en exhaustivité ou en réalité selon le sens de l'erreur.
- **Exhaustivité des charges et des dettes** : toutes les charges de N sont enregistrées, y compris sans facture (charges à payer : 408, 4286, 4386, 4481, 468). Se teste en partant d'une population **extérieure au compte** : factures reçues et décaissements de début N+1, bons de réception non facturés.
- **Réalité des produits** : les produits à recevoir (418, 4482, 467) correspondent à des droits acquis à la clôture ; se teste en partant du compte vers la pièce (livraison, contrat).

Soldes de régularisation :
- **Existence et évaluation des charges constatées d'avance (486)** : la prestation reste à recevoir après la clôture et le prorata est juste ; on part des soldes du 486 vers les contrats.
- **Exhaustivité des produits constatés d'avance (487)** : tout produit facturé en N pour une prestation de N+1 est différé ; on part du registre des contrats facturés d'avance, pas des soldes du 487, qui ne peuvent révéler ce qui n'a jamais été différé.
- **Évaluation** : prorata temporis sur le montant hors taxes, ou prorata des prestations non encore exécutées.

Annexe et informations fournies : l'annexe fait partie des comptes annuels (L123-12), donc une information obligatoire omise est une anomalie. **Exhaustivité des informations** (engagements hors bilan, événements postérieurs, incertitude sur la continuité), testée à partir de sources indépendantes de l'annexe (confirmations bancaires, procès-verbaux) ; **présentation et intelligibilité** ; **mesure et évaluation** des montants donnés ; **réalité, droits et obligations** des informations communiquées.

## Exemple
Société Rigel, clôture au 31/12/N, TVA 20 %. (1) Prime d'assurance annuelle de 12 000 € HT payée le 1/10/N et enregistrée en totalité en 616 : CCA = 12 000 × 9/12 = **9 000 €** (débit 486, crédit 616) ; assertion en jeu : évaluation du 486, et au-delà la séparation des exercices. (2) Contrat de maintenance de six mois facturé le 1/11/N pour 6 000 € HT, intégralement en 706 : PCA = 6 000 × 4/6 = **4 000 €** (débit 706, crédit 487) ; l'auditeur l'a trouvé en partant du registre des contrats : exhaustivité du 487. (3) Honoraires de décembre N de 7 200 € HT, facture reçue le 20/01/N+1 et non comptabilisée : charge à payer de 7 200 € en 6226, TVA 1 440 € en 44586, 8 640 € en 408 ; détectée par l'examen des factures reçues en N+1 : exhaustivité des charges et des dettes.

## Erreurs fréquentes
- Qualifier de « réalité » l'examen des factures reçues en N+1 : partir des pièces postérieures pour trouver des charges omises teste l'exhaustivité ; la réalité va du compte vers la pièce.
- Tester l'exhaustivité des produits constatés d'avance en sélectionnant des soldes du 487 : ce test ne couvre que la réalité et l'évaluation des soldes existants.
- Appeler « classification » une charge de N enregistrée en N+1 : l'imputation au bon compte n'est pas en cause, c'est le rattachement à l'exercice.
- Ranger la vérification des engagements hors bilan dans la « présentation et intelligibilité » : partir des confirmations bancaires pour trouver des engagements absents de l'annexe vise l'exhaustivité des informations fournies.

## À retenir
- L'assertion la plus exposée en fin d'exercice est l'exhaustivité des passifs : on la teste à partir des pièces postérieures, jamais à partir de la balance.
- Charge payée d'avance : question d'existence et d'évaluation (486) ; produit encaissé d'avance : question d'exhaustivité du passif (487).
- L'annexe fait partie des comptes : ses omissions sont des anomalies au même titre qu'une erreur chiffrée.

**Notions liées :** [Clôture — risques](/cours/cloture-risques) · [Clôture — pièges classiques](/cours/cloture-pieges) · [Achats-fournisseurs — assertions](/cours/achats-fournisseurs-assertions) · [Éléments probants et techniques](/cours/elements-probants-techniques)
