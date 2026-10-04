# Risque de change : nature et mesure de l'exposition

**Références :** IAS 21 (règl. UE 2023/1803) pour la conversion ; IFRS 7 §31-42 (informations sur les risques) ; pratiques usuelles de gestion de trésorerie

**Enjeu :** avant de choisir une couverture, le trésorier doit savoir de quel risque il parle et combien il porte ; à l'examen, on demande de qualifier la nature du risque, de calculer une position de change par devise et d'en déduire le sens de la perte possible.

**Trois natures de risque de change**
- **Risque de transaction** : variation, entre la date d'engagement et celle du règlement, de la contre-valeur en euros d'un flux en devises (créance, dette, commande ferme, offre remise en devises). Il naît dès l'engagement, pas à la facturation : une offre ferme en dollars expose déjà l'entreprise.
- **Risque de conversion** (de consolidation) : variation des capitaux propres consolidés lors de la conversion des comptes des filiales étrangères (écart de conversion, IAS 21) ; c'est un risque comptable, sans flux de trésorerie immédiat, qui ne se matérialise qu'à la cession de la filiale.
- **Risque économique** (concurrentiel) : effet durable des parités sur la compétitivité et les flux futurs, y compris pour une entreprise qui facture tout en euros (concurrents étrangers, fournisseurs dont les coûts sont en devises). Il ne se lit pas dans le bilan.

**Position de change** (par devise et par échéance) = avoirs et créances en devises + engagements de vente fermes − dettes en devises − engagements d'achat fermes.
- Position **longue** (créditrice, on détient plus de devise qu'on n'en doit) : perte si la devise baisse ; position **courte** (débitrice) : perte si la devise monte. Une position nulle est dite fermée.
- Perte potentielle = position nette × variation défavorable du cours ; on raisonne devise par devise, sans compenser un dollar avec une livre.

```diagram
{"type":"bars","title":"Position en dollars de l'exemple (k USD)","unit":"k USD","items":[{"label":"Créances clients","value":800},{"label":"Commandes de vente fermes","value":200},{"label":"Dettes fournisseurs","value":-300},{"label":"Commandes d'achat fermes","value":-100},{"label":"Position nette (longue)","value":600}]}
```

**Techniques internes** (sans instrument financier) : facturation en euros (le risque est transféré au client, qui peut exiger une remise), clause d'indexation du prix sur le cours, **termaillage** (accélérer ou retarder les règlements selon l'évolution anticipée de la devise), **netting** (compensation multilatérale des flux intragroupe : seuls les soldes nets sont réglés), adossement des encaissements et décaissements dans une même devise.

**Value at Risk (VaR)** : perte maximale sur un horizon donné avec une probabilité donnée. Méthode paramétrique (rendements supposés normaux) : la volatilité quotidienne est étendue à h jours par √h, puis multipliée par le quantile de la loi normale.

**Formules clés :** VaR(h jours, α) = z_α × σ_quotidien × √h × valeur de la position ; z = 1,65 à 95 % et 2,33 à 99 %

## Exemple
Au 30 juin, une société recense ses éléments en dollars à moins de trois mois : créances clients 800 000 USD, commandes de vente fermes 200 000 USD, dettes fournisseurs 300 000 USD, commandes d'achat fermes 100 000 USD. Cours : 1 € = 1,10 USD ; volatilité quotidienne du dollar 0,6 %.
Position = 800 000 + 200 000 − 300 000 − 100 000 = 600 000 USD, longue : la société perd si le dollar baisse. Contre-valeur = 600 000 / 1,10 = 545 455 €.
Si le dollar baisse de 5 % (1 € = 1,155 USD), la contre-valeur tombe à 600 000 / 1,155 = 519 481 € : perte de 25 974 €.
VaR à 10 jours au seuil de 99 % = 2,33 × 0,006 × √10 × 545 455 = 24 114 € : dans 99 % des cas, la perte à 10 jours ne dépasse pas ce montant.

## Erreurs fréquentes
- Qualifier de risque de transaction l'écart de conversion constaté sur les capitaux propres d'une filiale : c'est le risque de conversion, sans flux de trésorerie.
- Oublier les commandes fermes dans la position : seule la facturation est comptabilisée, mais l'exposition existe dès l'engagement.
- Conclure qu'une entreprise qui ne facture et n'achète qu'en euros n'a aucun risque de change : elle subit le risque économique si ses concurrents vendent en devises.
- Passer la VaR d'un jour à dix jours en multipliant par 10 au lieu de √10.

## À retenir
- Les commandes fermes font partie de la position de change, avant même la facturation.
- Position longue : perte si la devise baisse ; position courte : perte si la devise monte.
- Une entreprise qui ne facture qu'en euros reste exposée au risque économique.
- La VaR ne dit rien de l'ampleur des pertes au-delà du seuil ; le passage à h jours se fait par √h, pas par h.

**Notions liées :** [Couverture du risque de change](/cours/couverture-change) · [Opérations en devises en PCG](/cours/operations-devises-pcg) · [Conversion des états financiers](/cours/conversion-etats-financiers) · [Cash pooling et centralisation de trésorerie](/cours/cash-pooling-centralisation)
