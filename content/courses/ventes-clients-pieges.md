# Ventes-clients — pièges classiques

**Références :** C. com. art. L123-21 ; NEP 240 ; NEP 330 ; NEP 450 (évaluation des anomalies) ; NEP 530 (sondages) ; PCG, règles de conversion des créances et dettes en monnaies étrangères (règl. ANC 2014-03) ; PCG comptes 4198, 44587, 476, 1515

**Enjeu :** ces situations reviennent dans les cas d'audit parce qu'elles mêlent une règle comptable précise et une conséquence sur le résultat ; l'erreur classique est de corriger le chiffre d'affaires sans regarder la TVA, le stock ou le passif qui va avec.

- **Dépréciation sur le TTC** : la TVA collectée est récupérable en cas de perte ; la base de dépréciation est le montant HT. Déprécier le TTC surévalue la charge.
- **Facturation sans livraison (bill-and-hold)** : une vente facturée mais dont les biens restent chez le vendeur n'est reconnue que si le transfert est réel (demande expresse du client, biens individualisés et prêts à être livrés). Le PCG ne traite pas ce cas : on applique le principe de réalisation (C. com. art. L123-21), les critères usuels venant de la pratique (inspirés d'IFRS 15). À défaut, le CA est anticipé.
- **Dépôt ou consignation** : les biens remis à un dépositaire restent au stock du déposant ; la vente naît lors de la revente au client final.
- **Remises de fin d'année** : les ristournes acquises à la clôture se comptabilisent en avoirs à établir : débit 709 (HT) et 44587 (TVA), crédit 4198. Un palier non atteint ne donne lieu à aucune écriture.
- **Créances en devises** : conversion au cours de clôture, écart en 476 / 477, provision pour perte de change (1515) sur la perte latente ; pas de dépréciation 491 pour un simple effet de change, et pas de perte de change (656) tant que la créance n'est pas encaissée.
- **Clients créditeurs** : soldes créditeurs à reclasser au passif (4191 avances reçues ou 4197 autres avoirs, selon leur nature), sans compensation avec les créances.
- **Décalage d'imputation des encaissements (lapping)** : un détournement est masqué en imputant les règlements d'un client sur les factures d'un autre ; l'égalité auxiliaire / collectif et le DSO global ne bougent pas ; détection par rapprochement des avis de paiement et des remises en banque avec le lettrage.
- **Confirmations** : jamais transmises ni récupérées par le client audité ; un échantillon tiré de la balance clients ne teste pas l'exhaustivité.
- **Extrapolation (NEP 530)** : l'anomalie d'un échantillon est projetée sur la population sondée ; les éléments testés à 100 % (éléments clés) ne s'extrapolent pas. Le total est comparé à l'anomalie tolérable et cumulé avec les autres anomalies (NEP 450).

**Formules clés :** anomalie projetée = anomalie de l'échantillon × valeur de la population sondée / valeur de l'échantillon ; anomalie totale estimée = anomalies des éléments clés + anomalie projetée

## Exemple
Créances clients : 2 400 k€. Les 600 k€ d'éléments clés (soldes > 50 k€) sont contrôlés à 100 % : anomalies de 15 k€. Sur les 1 800 k€ restants, un échantillon de 300 k€ révèle 6 k€ d'anomalies.
Anomalie projetée = 6 × 1 800 / 300 = 36 k€ ; anomalie totale estimée = 15 + 36 = **51 k€**, pour une anomalie tolérable de 60 k€ : l'auditeur est proche du seuil, il étend ses tests ou demande la correction des 15 k€ identifiés.
Ristourne : le client Oméga a atteint le palier donnant droit à 2 % sur 1 500 k€ HT d'achats ; avoir à établir : débit 709 pour 30 000 € et 44587 pour 6 000 €, crédit 4198 pour 36 000 €.

## Erreurs fréquentes
- Déprécier 6 000 € une créance de 12 000 € TTC perdue pour moitié : la base est 10 000 € HT, la dépréciation 5 000 €.
- Passer la perte latente sur une créance en dollars en 656 ou en 491 : le PCG impose l'écart de conversion actif (476) et une provision 1515.
- Détecter le lapping par le rapprochement auxiliaire / collectif ou le contrôle de la séquence des factures : ces totaux restent justes ; seul le détail des avis de paiement confronté au lettrage le révèle.
- Extrapoler l'anomalie des éléments clés : ils ont été testés à 100 %, leur anomalie est connue ; seule l'anomalie du sondage se projette.

## À retenir
- Annuler une vente anticipée impose aussi de vérifier le stock correspondant.
- Les avoirs à établir réduisent le CA net : leur omission surévalue le résultat.
- Anomalie estimée = anomalies des éléments clés + projection du sondage, à comparer à l'anomalie tolérable.

**Notions liées :** [Opérations en devises (PCG)](/cours/operations-devises-pcg) · [Seuil de signification](/cours/seuil-signification) · [Achats-fournisseurs — pièges](/cours/achats-fournisseurs-pieges) · [Ventes-clients — procédures substantives](/cours/ventes-clients-procedures-substantives)
