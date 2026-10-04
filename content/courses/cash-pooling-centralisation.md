# Centralisation de trésorerie (cash pooling) et netting

**Références :** C. mon. fin., art. L. 511-7, I, 3° (opérations de trésorerie intragroupe) ; CGI, art. 57 (prix de transfert) et art. 212 (limitation des intérêts versés à des entreprises liées) ; C. com., art. L. 225-38 (conventions réglementées) ; jurisprudence Rozenblum (Cass. crim., 4 févr. 1985)

**Enjeu :** faire financer les filiales déficitaires par les excédents des autres, au lieu de payer la banque des deux côtés ; à l'examen, on chiffre le gain d'une centralisation, on distingue ses formes et l'on rappelle le cadre juridique (monopole bancaire, intérêt social, prix de transfert).

La centralisation de trésorerie regroupe les soldes bancaires des sociétés d'un groupe auprès d'une société pivot (holding ou société de trésorerie) pour compenser excédents et besoins.

- **Centralisation physique (zero balancing)** : les soldes de chaque filiale sont virés chaque jour sur le compte centralisateur (solde ramené à zéro ou à un solde cible, *target balancing*) ; il en résulte des avances et emprunts intragroupe rémunérés, retracés en comptes courants (451) et dans une convention de trésorerie.
- **Centralisation notionnelle** : aucun transfert de fonds ; la banque calcule les intérêts sur la position fusionnée des comptes, qui restent juridiquement distincts. Elle évite les flux intragroupe mais suppose souvent des garanties croisées et l'accord de la banque.
- **Netting** : compensation multilatérale des dettes et créances commerciales intragroupe ; chaque société ne règle ou ne reçoit que son solde net auprès d'une centrale, à une date fixe. Il réduit le nombre et le montant des transferts, les commissions bancaires et les frais de change.

```diagram
{"type":"flow","title":"Zero balancing quotidien dans le groupe de l'exemple","steps":[{"label":"Filiale A : +800 k€","note":"solde viré au compte pivot ; A devient créancière"},{"label":"Compte pivot","note":"position nette du groupe : +300 k€"},{"label":"Filiale B : −500 k€","note":"découvert couvert par le pivot ; B devient débitrice"},{"label":"Intérêts intragroupe","note":"taux de marché fixés par la convention de trésorerie"}]}
```

**Intérêt économique** : seul le besoin net du groupe supporte le taux débiteur, au lieu de payer des agios sur les filiales déficitaires tout en plaçant à un taux faible les excédents des autres. Gain = frais financiers nets sans centralisation − frais sur la position nette consolidée. S'y ajoutent une meilleure visibilité, la réduction des lignes de crédit inutilisées et un pouvoir de négociation accru avec les banques.

**Cadre juridique et fiscal :**
- exception au monopole bancaire pour les opérations de trésorerie entre sociétés liées par des liens de capital conférant à l'une un pouvoir de contrôle effectif sur les autres (art. L. 511-7) ; aucun agrément bancaire n'est requis, mais des sociétés sans lien de capital ne peuvent pas en bénéficier ;
- convention de trésorerie écrite (convention réglementée dans une SA lorsqu'elle lie des sociétés ayant des dirigeants communs, sauf opération courante conclue à des conditions normales), taux et frais fixés à des conditions de marché (prix de transfert, déductibilité des intérêts plafonnée par l'art. 212 du CGI) ;
- respect de l'intérêt social de chaque filiale : une avance sans contrepartie peut constituer un abus de biens sociaux, sauf groupe structuré, intérêt commun, contrepartie et absence de déséquilibre excédant les capacités de la société (critères Rozenblum).

## Exemple
Filiale A : excédent permanent de 800 k€ placé à 1 % ; filiale B : découvert permanent de 500 k€ au taux de 5 %.
Sans centralisation : B paie 500 × 5 % = 25 k€ d'agios, A reçoit 800 × 1 % = 8 k€ : coût net 17 k€ par an.
Avec zero balancing : la position nette du groupe est de +300 k€, placée à 1 % : produit de 3 k€. Gain annuel = 17 + 3 = 20 k€, avant frais de la convention. En interne, A prête 500 k€ à B via le pivot à un taux intermédiaire de marché (par exemple 3 %) : A gagne plus qu'un placement bancaire, B paie moins qu'un découvert.

## Erreurs fréquentes
- Confondre netting et cash pooling : le netting compense des créances et dettes **commerciales** ; la centralisation traite des **soldes bancaires**.
- Croire que la centralisation exige un agrément d'établissement de crédit ou est réservée aux sociétés cotées : l'exception de l'art. L. 511-7 repose sur le seul lien de capital conférant un contrôle effectif.
- Calculer le gain comme la somme des soldes bruts : il se mesure par la différence entre les frais financiers nets avant et après centralisation.
- Consentir une avance gratuite à une société sœur « parce que c'est le même groupe » : sans contrepartie ni intérêt commun, l'abus de biens sociaux reste constitué.

## À retenir
- Physique = fonds déplacés ; notionnelle = intérêts calculés sur des soldes fictivement fusionnés.
- La filiale excédentaire devient créancière de la société pivot : risque de contrepartie intragroupe, à couvrir par la convention.
- Le netting traite les flux commerciaux ; le cash pooling traite les soldes de trésorerie.
- Les taux intragroupe doivent être des taux de marché, sous peine de redressement (art. 57 et 212 du CGI).

**Notions liées :** [Conventions intra-groupe](/cours/conventions-intra-groupe) · [Conventions réglementées](/cours/conventions-reglementees) · [Prix de transfert et fiscalité internationale](/cours/prix-transfert-fiscalite-internationale) · [Financements à court terme](/cours/financements-court-terme)
