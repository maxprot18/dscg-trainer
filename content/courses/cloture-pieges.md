# Clôture — pièges classiques

**Références :** NEP 560 (événements postérieurs) ; NEP 570 (continuité d'exploitation) ; NEP 580 (déclarations de la direction) ; NEP 450 (anomalies relevées) ; NEP 700 (rapport sur les comptes) ; C. com. art. L123-13 et L123-20 ; PCG comptes 408, 44586, 486, 487

**Enjeu :** les questions de clôture se perdent sur trois réflexes à corriger : rattacher à la date de facture, calculer un prorata sur le TTC, classer un événement postérieur d'après sa date plutôt que d'après la situation qu'il révèle ; s'y ajoutent les conséquences sur le rapport d'une incertitude sur la continuité.

- **Date de facture ou de paiement** : le rattachement dépend de la date de réalisation de la prestation ou de la livraison (L123-13), pas de la date de la facture ni du décaissement ; une prestation de décembre N facturée et payée en janvier N+1 est une charge de N.
- **Prorata sur le HT** : charges et produits constatés d'avance se calculent sur le montant hors taxes ; la TVA n'est pas régularisée, elle est déductible ou exigible selon ses propres règles.
- **Charge à payer et TVA** : une facture non parvenue se comptabilise HT en charge (classe 6), la TVA en 44586 (TVA sur factures non parvenues) et le TTC en 408 ; oublier la TVA laisse l'écriture déséquilibrée ou minore la dette.
- **Événement postérieur mal classé** : la liquidation en N+1 d'un client dont les retards remontaient à N, ou la vente en N+1 sous leur coût de produits en stock dans un marché dégradé dès N, révèlent une situation existant à la clôture → ajustement (dépréciation) ; un incendie de mars N+1 ou une chute de cours due à une annonce de N+1 sont des faits nouveaux → information en annexe si significatifs, pas d'écriture.
- **Événement postérieur et continuité** : un fait né après la clôture qui remet en cause la continuité d'exploitation ne relève plus d'une simple mention en annexe ; la convention de continuité elle-même doit être réexaminée, le cas échéant jusqu'à l'établissement des comptes en valeurs liquidatives.
- **Lettre d'affirmation** : datée après le rapport, ou signée par une personne sans responsabilité sur les comptes, elle n'a pas de valeur probante utile ; un refus de la direction de la fournir est une limitation dont le CAC tire les conséquences sur son opinion (réserve ou refus de certifier, selon l'étendue des déclarations refusées et le doute sur l'intégrité de la direction).
- **Déclaration seule** : une affirmation écrite de la direction ne suffit pas à justifier un solde significatif pour lequel d'autres éléments sont accessibles.
- **Compensation des anomalies** : une sous-évaluation ne « neutralise » pas automatiquement une surévaluation d'un autre poste ; chaque anomalie s'apprécie aussi par sa nature et par le poste qu'elle touche.
- **Continuité et rapport (NEP 570, NEP 700)** : incertitude significative correctement décrite en annexe → certification sans réserve, avec une partie distincte du rapport intitulée « Incertitude significative liée à la continuité d'exploitation » qui renvoie à l'annexe ; information insuffisante → réserve ou refus de certifier (désaccord) ; continuité définitivement compromise et comptes non établis en valeurs liquidatives → refus ; le refus pour limitation (impossibilité de certifier) ne vise que le défaut d'éléments collectés.

```diagram
{"type":"tree","title":"Événement survenu entre la clôture et le rapport : quel traitement ?","root":{"label":"Renseigne-t-il sur une situation existant à la clôture ?","children":[{"edge":"oui","label":"Ajustement des comptes de N","note":"dépréciation, provision, charge à payer"},{"edge":"non","label":"Remet-il en cause la continuité ?","children":[{"edge":"oui","label":"Réexamen de la convention de continuité","note":"annexe et rapport adaptés"},{"edge":"non","label":"Significatif ?","children":[{"edge":"oui","label":"Information en annexe, pas d'écriture"},{"edge":"non","label":"Rien"}]}]}]}}
```

**Formules clés :** PCA = produit HT facturé d'avance × mois restant à courir après la clôture / durée du contrat en mois ; FNP : charge HT + TVA (44586) = TTC (408)

## Exemple
SARL Procyon, clôture au 31/12/N, TVA 20 %. (1) Abonnement annuel de maintenance facturé à un client le 1/09/N pour 18 000 € HT (21 600 € TTC), enregistré en totalité en 706 : PCA = 18 000 × 8/12 = **12 000 €** (débit 706, crédit 487) ; calculé sur le TTC, on obtiendrait 14 400 €, soit 2 400 € de trop. (2) Prestation de nettoyage de décembre N, facture de 4 200 € HT reçue le 12/01/N+1 et non comptabilisée : débit 6152 pour 4 200, débit 44586 pour 840, crédit 408 pour **5 040 €**. (3) Un client en retard depuis septembre N est liquidé le 25/01/N+1 : dépréciation à comptabiliser en N ; l'incendie d'un véhicule le 10/02/N+1 : annexe seulement. Résultat de N corrigé de (1) et (2) : −12 000 − 4 200 = **−16 200 €** par rapport aux comptes présentés, avant la dépréciation du client.

## Erreurs fréquentes
- Rattacher une prestation de décembre à N+1 parce que la facture ou le paiement datent de janvier, ou la répartir par moitié : seule la date de réalisation compte.
- Calculer le produit constaté d'avance sur le montant TTC (14 400 € au lieu de 12 000 € dans l'exemple) : la TVA n'est pas différée.
- Classer un événement postérieur d'après sa date (« postérieur à la clôture, donc annexe ») : la liquidation d'un client déjà défaillant en N ajuste les comptes de N.
- Répondre « réserve » à une incertitude sur la continuité bien décrite en annexe : la certification est sans réserve, avec une partie distincte du rapport consacrée à l'incertitude ; la réserve ou le refus sanctionnent une information insuffisante.

## À retenir
- Toujours se demander : la situation existait-elle à la clôture ?
- Un prorata calculé sur le TTC est faux ; une facture non parvenue se décompose en HT, TVA (44586) et TTC (408).
- Incertitude sur la continuité bien décrite en annexe : certification sans réserve avec une partie distincte du rapport ; mal décrite : réserve ou refus.

**Notions liées :** [Clôture — procédures substantives](/cours/cloture-procedures-substantives) · [Clôture — assertions](/cours/cloture-assertions) · [Formulation de l'opinion](/cours/formulation-opinion) · [Achats-fournisseurs — pièges classiques](/cours/achats-fournisseurs-pieges)
