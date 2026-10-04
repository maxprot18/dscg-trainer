# Ventes-clients — assertions d'audit

**Références :** NEP 500 (caractère probant des éléments collectés) ; NEP 315 (évaluation du risque au niveau des assertions) ; PCG, comptes 411, 416, 418, 4198, 70

**Enjeu :** l'examen demande presque toujours « quelle assertion ce test couvre-t-il ? » ou « quelle procédure pour cette assertion ? » : la réponse dépend du sens du test, du flux (chiffre d'affaires) ou du solde (créances) visé.

Les assertions sont les affirmations, implicites ou explicites, de la direction sur les comptes. Le commissaire aux comptes évalue le risque d'anomalies significatives assertion par assertion (NEP 315), puis choisit la procédure qui répond à chacune.

Opérations de l'exercice (chiffre d'affaires, compte 70) :
- **Réalité** : chaque vente enregistrée correspond à une livraison ou une prestation effective (risque : ventes fictives, facturation sans livraison).
- **Exhaustivité** : toutes les livraisons de l'exercice sont facturées et comptabilisées (risque : oubli de facturation, avoirs non enregistrés).
- **Mesure** : prix, remises et TVA correctement calculés ; le chiffre d'affaires net tient compte des ristournes acquises.
- **Séparation des exercices** : la vente est rattachée à l'exercice du transfert de contrôle des biens (date de livraison, incoterm), et non à la date de facture ou d'encaissement.
- **Classification** : imputation au bon compte (70 et non 75 ou 76 ; ventes de produits ou de marchandises).

Soldes de clôture (créances 411, 416, 418) :
- **Existence** : la créance existe réellement à la clôture.
- **Droits et obligations** : l'entité détient la créance (attention aux créances cédées en affacturage ou par bordereau Dailly, qui ne lui appartiennent plus).
- **Exhaustivité** : toutes les créances sont enregistrées, y compris les factures à établir (418) pour les livraisons non encore facturées.
- **Évaluation et imputation** : créance dépréciée si le recouvrement est compromis, convertie au cours de clôture si elle est en devises.

**Sens des tests :** réalité → partir de la comptabilité vers les pièces (facture → bon de livraison signé) ; exhaustivité → partir des pièces source (bons de livraison prénumérotés) vers les factures et la comptabilité. Une population tirée de la balance clients ne peut jamais révéler une vente non enregistrée.

```diagram
{"type":"tree","title":"Quel test pour quelle assertion sur les ventes ?","root":{"label":"Que veut-on prouver ?","children":[{"edge":"réalité du CA","label":"Facture → BL signé","note":"de la comptabilité vers la pièce"},{"edge":"exhaustivité du CA","label":"BL prénuméroté → facture","note":"de la pièce vers la comptabilité"},{"edge":"existence du solde","label":"Confirmation directe","note":"ou encaissement postérieur"},{"edge":"évaluation du solde","label":"Balance âgée","note":"règlements postérieurs, dépréciations"}]}}
```

## Exemple
La facture n° 2318 du 30/12/N (20 000 € HT, TVA 20 %, soit 24 000 € TTC) est sélectionnée dans le journal des ventes ; le bon de livraison correspondant est daté du 03/01/N+1 et les biens (coût 14 000 €) étaient encore dans l'entrepôt au 31/12, mais exclus de l'inventaire car « vendus ».
Assertions en défaut : séparation des exercices (vente anticipée) et exhaustivité des stocks. Correction : débit 707 pour 20 000 € et 44571 pour 4 000 €, crédit 411 pour 24 000 € ; réintégration des biens au stock pour 14 000 €. Le résultat N était surévalué de 20 000 − 14 000 = **6 000 €**.

## Erreurs fréquentes
- Croire que la confirmation directe teste l'exhaustivité ou la recouvrabilité : les clients interrogés sont tirés de la balance, une créance non enregistrée n'y figure pas, et un client peut reconnaître sa dette sans pouvoir la payer. Elle prouve l'existence ; l'évaluation se teste par la balance âgée et les règlements postérieurs.
- Tester la réalité en partant des bons de livraison : ce sens vérifie l'exhaustivité. Pour la réalité, on part des factures comptabilisées.
- Attribuer la séparation des exercices au solde des créances : c'est une assertion sur les flux ; le solde relève de l'existence, des droits, de l'exhaustivité et de l'évaluation.

## À retenir
- La confirmation directe de solde prouve surtout l'existence (et en partie les droits), pas l'exhaustivité ni l'évaluation.
- Un test mené dans le mauvais sens ne couvre pas l'assertion visée ; la séparation des exercices est l'assertion la plus exposée en fin d'exercice, et une vente anticipée se corrige avec le stock correspondant.

**Notions liées :** [Achats-fournisseurs — assertions](/cours/achats-fournisseurs-assertions) · [Éléments probants et techniques](/cours/elements-probants-techniques) · [Ventes-clients — procédures substantives](/cours/ventes-clients-procedures-substantives) · [IFRS 15 — produits](/cours/ifrs-15-produits-activites-ordinaires)
