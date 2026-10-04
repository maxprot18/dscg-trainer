# Choix des modalités de financement : emprunt, crédit-bail, capital, autofinancement

**Références :** calcul financier (coût actuariel) ; CGI art. 39 (déductibilité des intérêts, loyers et amortissements) ; PCG : comptes 164, 661, 6122, 6125, 6272, 275

**Enjeu :** une fois l'investissement décidé, il faut le financer au moindre coût : l'examen demande le coût actuariel après impôt de chaque source (emprunt avec frais, crédit-bail) et une recommandation qui tienne compte des critères qualitatifs.

**Coût actuariel après impôt** : taux r qui égalise les sommes reçues nettes et les décaissements futurs nets des économies d'IS : montant net reçu = Σ décaissements nets après IS × (1 + r)⁻ᵗ. On retient la source de plus faible coût, à risque comparable ; le coût ainsi obtenu est comparable au coût du capital du projet.

- **Emprunt** : intérêts déductibles. Sans frais, coût après impôt = i × (1 − t). Les frais de dossier (eux-mêmes déductibles) réduisent la somme nette reçue et augmentent le coût actuariel. Comptabilisation : 512 / 164 à l'encaissement ; à chaque échéance, 164 (capital) et 661 (intérêts) / 512 ; frais d'émission d'emprunt au 6272 (ou étalés via le 4816).
- **Crédit-bail** : comparé à l'achat, il procure le financement du bien (ressource = prix évité en date 0) contre des redevances déductibles. Flux pour le preneur : redevances × (1 − t), **perte des économies d'IS sur les amortissements** qu'il aurait pratiqués en achetant, prix de levée d'option (et économies d'IS sur son amortissement ultérieur). En PCG, la redevance est une charge (6122 mobilier, 6125 immobilier) ; le bien n'est pas inscrit à l'actif avant la levée de l'option ; le dépôt de garantie versé va au 275.
- **Augmentation de capital** : coût = rentabilité exigée par les actionnaires (MEDAF ou Gordon : k = D₁ / P₀ + g) ; dividendes non déductibles, donc pas d'économie d'IS ; risque de dilution du contrôle et du bénéfice par action.
- **Autofinancement** : pas de décaissement ni de frais, mais un coût d'opportunité égal au coût des capitaux propres : les actionnaires auraient pu recevoir ces fonds en dividendes.

**Formules clés :** coût emprunt sans frais = i × (1 − t) ; flux crédit-bail = R × (1 − t) + t × DA perdue

## Exemple
Bien de 100 000 € amortissable en linéaire sur 4 ans (DA = 25 000 €), IS 25 %.
Emprunt in fine de 100 000 € à 6 % sur 4 ans, frais de dossier 2 000 € déductibles : net reçu = 100 000 − 2 000 × 0,75 = 98 500 € ; décaissements nets = 6 000 × 0,75 = 4 500 € par an, plus 100 000 € en année 4. Coût r tel que 98 500 = 4 500 × a(r, 4) + 100 000 × (1 + r)⁻⁴ : r ≈ 4,9 % (4,5 % sans les frais).
Crédit-bail : 4 redevances de 30 000 € en fin d'année, pas d'option. Flux annuel = 30 000 × 0,75 + 0,25 × 25 000 = 28 750 € ; coût r tel que 100 000 = 28 750 × a(r, 4) : r ≈ 5,8 %.
L'emprunt est moins coûteux (4,9 % contre 5,8 %) ; le crédit-bail ne se justifierait que par la rapidité d'obtention ou l'absence de garantie à fournir.

## Erreurs fréquentes
- Oublier, dans les flux du crédit-bail, la perte des économies d'IS sur les amortissements : le preneur n'amortit pas le bien.
- Compter les intérêts de l'emprunt qui aurait financé l'achat parmi les flux du crédit-bail : ils relèvent de l'autre solution, pas de celle qu'on évalue.
- Comparer un coût d'emprunt après impôt à un coût de crédit-bail avant impôt : les deux se calculent après IS, sur le même bien et la même durée.
- Considérer l'autofinancement comme gratuit : son coût est celui des capitaux propres.

## À retenir
- Ne pas oublier, pour le crédit-bail, la perte des économies d'IS sur amortissements.
- Comparer les coûts **après impôt** et sur des bases homogènes (même bien, même durée).
- Critères qualitatifs : capacité d'endettement, indépendance, rapidité, garanties exigées.

**Notions liées :** [Structure du capital et politique de dividende](/cours/structure-capital-dividendes) · [Coût du capital, CMPC et MEDAF](/cours/cout-capital-cmpc-medaf) · [Financement par fonds propres et obligataire](/cours/financement-fonds-propres-obligataire) · [IFRS 16 — Contrats de location](/cours/ifrs-16-contrats-location)
