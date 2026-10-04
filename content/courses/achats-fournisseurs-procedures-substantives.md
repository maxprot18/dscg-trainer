# Achats-fournisseurs — procédures substantives

**Références :** NEP 330 ; NEP 505 (confirmations externes) ; NEP 520 (procédures analytiques) ; NEP 530 (sondages) ; PCG comptes 401, 408, 44586, 4098, 60

**Enjeu :** la recherche de passifs non comptabilisés est la procédure signature du cycle ; l’examen demande de la décrire, de trancher chaque cas rencontré (dette de N ou de N+1 ?) et d’en chiffrer l’effet sur le résultat.

- **Recherche de passifs non comptabilisés** : examiner les factures reçues et les décaissements des premières semaines de N+1 au-dessus d’un seuil ; tout achat dont la réception ou le service rendu date de N doit figurer en dette N (401 si la facture est datée de N, sinon 408). Un décaissement de N+1 pour une charge de N+1 (loyer de janvier) n’est pas une anomalie.
- **Séparation des exercices** : rapprocher les derniers bons de réception de N et les premiers de N+1 des factures et du 408 ; vérifier la cohérence avec l’inventaire physique (un bien inventorié doit avoir son achat enregistré ; un bien exclu ne doit pas avoir d’achat en N).
- **Confirmation (NEP 505)** : l’auditeur sélectionne les fournisseurs d’après le volume d’achats de l’exercice (y compris soldes nuls ou débiteurs), envoie et reçoit lui-même les demandes ; analyse des écarts (facture ou règlement en transit, litige, dette omise). Alternative courante : rapprochement des relevés de compte émis par les fournisseurs.
- **Comptes de régularisation** : justification du 408 (réceptions non facturées, contrats, factures reçues en N+1) et du 4098 (contrats de remises, paliers atteints) ; apurement des 408 anciens.
- **Procédures analytiques (NEP 520)** : charges mensuelles par nature, marge, DPO comparés à N−1 et au budget ; douze échéances attendues pour une charge mensuelle.
- **Évaluation** : dettes en devises converties au cours de clôture (écarts en 476 / 477, provision sur la perte latente).

```diagram
{"type":"tree","title":"Recherche de passifs : trancher un décaissement de N+1","root":{"label":"Réception ou service rendu avant le 31/12/N ?","children":[{"edge":"non","label":"Charge de N+1","note":"aucune anomalie (ex. loyer de janvier)"},{"edge":"oui","label":"Dette au 31/12/N","children":[{"edge":"déjà en 401 ou 408","label":"Conforme"},{"edge":"absente","label":"Dette omise","note":"charge N à ajouter, 408 si facture non reçue"}]}]}}
```

**Écriture type d’une facture non parvenue :** débit 60x (HT) et 44586 (TVA), crédit 408 (TTC).

**Formules clés :** anomalie extrapolée (méthode du ratio) = anomalie de l’échantillon / valeur de l’échantillon × valeur de la population

## Exemple
Décaissements de janvier N+1 supérieurs à 5 000 €, trois cas : (a) 18 000 € TTC payés le 12/01, facture du 28/12 comptabilisée en N : conforme ; (b) 9 600 € TTC, facture du 05/01 pour la maintenance de décembre, rien en 408 : dette omise, charge N de 8 000 € HT (débit 615 pour 8 000 €, 44586 pour 1 600 €, crédit 408 pour 9 600 €) ; (c) 30 000 € TTC de loyer de janvier payés le 02/01 : charge N+1, conforme.
Extrapolation : sur 400 k€ de décaissements testés, 8 k€ de dettes omises ; population 2 000 k€ → anomalie extrapolée = 8 / 400 × 2 000 = **40 k€**, à comparer à l’anomalie tolérable et à cumuler avec les anomalies des autres cycles.

## Erreurs fréquentes
- Conclure d’une réponse fournisseur supérieure au solde comptable qu’il n’y a « rien à faire car la facture n’était pas parvenue » : si la réception date de N, la dette existe et s’enregistre en 408.
- Rattacher une facture à l’exercice de son paiement : la date qui compte est celle de la réception ou du service rendu.
- Croire que l’exclusion d’un bien de l’inventaire neutralise un achat enregistré à tort en N : sans stock compensateur, le résultat N est sous-évalué du HT et la dette surévaluée.
- Circulariser seulement les gros soldes créditeurs : la sélection par volume d’achats, soldes nuls compris, est la seule qui serve l’exhaustivité.

## À retenir
- La confirmation sur les seuls gros soldes créditeurs ne teste pas l’exhaustivité.
- Une réponse fournisseur supérieure au solde comptable signale une dette possiblement omise.
- L’anomalie extrapolée est comparée à l’anomalie tolérable : si elle s’en approche ou la dépasse, l’auditeur étend ses travaux ou demande une correction.

**Notions liées :** [Ventes-clients — procédures substantives](/cours/ventes-clients-procedures-substantives) · [Stocks — procédures substantives](/cours/stocks-procedures-substantives) · [Achats-fournisseurs — assertions](/cours/achats-fournisseurs-assertions) · [Seuil de signification](/cours/seuil-signification)
