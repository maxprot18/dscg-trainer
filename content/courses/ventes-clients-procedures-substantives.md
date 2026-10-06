# Ventes-clients — procédures substantives

**Références :** NEP 330 ; NEP 505 (confirmations externes) ; NEP 520 (procédures analytiques) ; PCG comptes 411, 416, 418, 4198, 491, 6817

**Enjeu :** la circularisation des clients et le test de séparation des exercices sont les deux procédures les plus souvent décrites à l'examen ; il faut savoir les conduire, analyser un écart et conclure sur les comptes.

- **Confirmation directe (NEP 505)** : l'auditeur sélectionne les clients (gros soldes, soldes anciens, nouveaux clients, soldes nuls ou créditeurs), envoie lui-même les demandes et reçoit directement les réponses (§ 09). La NEP 505 distingue la demande fermée (le tiers donne son accord sur le solde indiqué) et la demande ouverte (le tiers indique lui-même le solde). En pratique, confirmation positive (réponse attendue dans tous les cas) ou négative (réponse seulement en cas de désaccord, envisageable seulement pour de nombreux petits soldes homogènes, à risque faible avec contrôle interne efficace, faible taux d'écarts attendu et destinataires a priori attentifs).
- **Écarts et non-réponses** : analyser chaque écart (règlement en transit, litige, erreur de séparation) ; en l'absence de réponse, relancer puis appliquer des procédures alternatives : encaissements postérieurs, factures, bons de livraison signés. Si la direction refuse une demande, le CAC examine si le refus repose sur des motifs valables et collecte des éléments sur ces motifs ; refus fondé : procédures alternatives ; refus non fondé : il en tire les conséquences dans son rapport (NEP 505 § 10-12).
- **Procédures analytiques (NEP 520)** : CA mensuel, taux de marge, DSO comparés à N−1 et aux budgets ; une attente précise permet d'en faire une procédure substantive, sinon elles restent une orientation.
- **Séparation des exercices** : rapprocher les dernières factures N et les premières N+1 des bons de livraison ; examiner les avoirs émis après la clôture (ils annulent souvent des ventes de N).
- **Évaluation** : analyser la balance âgée et les règlements postérieurs ; apprécier les dépréciations (416 clients douteux, 491, dotation 6817). La dépréciation se calcule sur le montant **hors taxes** de la créance.
- **Exhaustivité des comptes de régularisation** : factures à établir (418) à partir des livraisons non facturées, avoirs à établir (4198) à partir des contrats de ristournes.

```diagram
{"type":"timeline","title":"Circularisation des clients : calendrier type","items":[{"when":"Déc. N","label":"Sélection des clients","note":"gros soldes, anciens, nouveaux, nuls"},{"when":"31/12/N","label":"Clôture","note":"date de référence des soldes"},{"when":"Janv. N+1","label":"Envoi par le CAC","note":"réponses adressées à l'auditeur"},{"when":"Févr. N+1","label":"Relance","note":"puis analyse des écarts"},{"when":"Mars N+1","label":"Procédures alternatives","note":"encaissements postérieurs, BL signés"}]}
```

**Formules clés :** DSO = créances clients TTC / CA TTC × 360 ; dépréciation = créance TTC / (1 + taux TVA) × % de perte estimée

## Exemple
Le client Delta confirme un solde de 72 000 € au 31/12/N ; le compte 411 Delta présente 84 000 €. Écart de 12 000 € analysé : un chèque de 9 000 € émis par Delta le 29/12 et encaissé le 03/01 (règlement en transit, pas d'anomalie) et une facture de 3 000 € TTC du 30/12 dont le bon de livraison est daté du 04/01/N+1.
Conclusion : vente anticipée de 2 500 € HT et 500 € de TVA à annuler en N (débit 707 et 44571, crédit 411). Par ailleurs, DSO = 1 440 / 9 600 × 360 = **54 jours** (créances TTC 1 440 k€, CA TTC 9 600 k€) contre 45 jours en N−1 ; une créance douteuse de 18 000 € TTC jugée perdue à 40 % se déprécie de 18 000 / 1,2 × 40 % = 6 000 €.

## Erreurs fréquentes
- Laisser le client audité transmettre ou collecter les demandes de confirmation : la procédure n'a de valeur que si elle reste sous le contrôle exclusif de l'auditeur.
- Recourir à la confirmation négative pour des grands comptes à risque élevé : elle n'est admise que pour des populations nombreuses de petits soldes à risque faible.
- Face à un refus de la direction, passer outre ou refuser de certifier d'emblée : la démarche est d'apprécier les motifs, de réévaluer le risque de fraude et d'appliquer des procédures alternatives.
- Déprécier une créance douteuse sur son montant TTC : la TVA collectée est récupérable en cas de perte, la base est le HT.

## À retenir
- La confirmation reste sous le contrôle exclusif de l'auditeur.
- Un règlement en transit à la clôture n'est pas une anomalie chez le vendeur ; une facture sans livraison avant la clôture en est une.
- DSO : comparer des grandeurs homogènes (créances TTC et CA TTC).

**Notions liées :** [Éléments probants et techniques](/cours/elements-probants-techniques) · [Achats-fournisseurs — procédures substantives](/cours/achats-fournisseurs-procedures-substantives) · [Ventes-clients — assertions](/cours/ventes-clients-assertions) · [Clôture — procédures substantives](/cours/cloture-procedures-substantives)
