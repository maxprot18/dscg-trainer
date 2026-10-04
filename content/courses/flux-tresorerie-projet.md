# Flux de trésorerie d'un projet d'investissement

**Références :** calcul financier (méthode des flux différentiels) ; CGI art. 39 (charges déductibles, dont les amortissements) ; taux d'IS donné par l'énoncé

**Enjeu :** la VAN n'a de sens que si les flux sont justes ; la première question d'un cas d'investissement consiste presque toujours à construire le tableau des flux nets de trésorerie (CAF d'exploitation, BFR, valeur résiduelle) avant de l'actualiser.

On ne retient que les flux **différentiels** (avec projet − sans projet), **après impôt**, en trésorerie et non en résultat, datés (convention usuelle : investissement en date 0, flux d'exploitation en fin d'année).

**Composantes du flux net de trésorerie (FNT)**
- Investissement initial (prix d'achat, frais d'installation, formation nécessaire) en date 0, hors TVA récupérable.
- CAF d'exploitation = EBE × (1 − t) + t × dotation aux amortissements : l'amortissement n'est pas décaissé mais réduit l'IS ; de façon équivalente, CAF = EBE − IS avec IS = t × (EBE − DA). Si le résultat avant IS est négatif, l'économie d'impôt suppose que l'entreprise a par ailleurs des bénéfices imposables.
- Variation du BFR : une hausse est un emploi (flux négatif), généralement placée en début d'année (fin de l'année précédente) car le BFR doit être financé avant que le chiffre d'affaires ne soit encaissé ; le BFR cumulé est récupéré en fin de projet, sans impôt.
- Valeur résiduelle nette d'impôt = prix de cession − t × (prix de cession − VNC fiscale) : la plus-value est imposée ; une moins-value procure au contraire une économie d'IS.

```diagram
{"type":"flow","title":"Du résultat d'exploitation au flux de la dernière année (exemple, €)","steps":[{"label":"EBE 110 000"},{"label":"− IS 12 500","note":"25 % × (110 000 − 60 000 de DA)"},{"label":"CAF d'exploitation 97 500","note":"= 110 000 × 0,75 + 0,25 × 60 000"},{"label":"+ BFR récupéré 30 000","note":"sans impôt"},{"label":"+ valeur résiduelle nette 75 000","note":"80 000 − 25 % × (80 000 − 60 000)"},{"label":"FNT₄ = 202 500"}]}
```

**Ce qu'on inclut / exclut**
- Inclus : coûts d'opportunité (valeur de marché d'un actif déjà détenu affecté au projet, loyer auquel on renonce), effets induits (cannibalisation d'un autre produit, ventes complémentaires).
- Exclus : coûts irrécupérables (études déjà payées, quelle que soit la décision), charges calculées sans décaissement, **frais financiers** du financement (ils sont pris en compte par le taux d'actualisation ; les déduire serait un double comptage).

**Formules clés :** FNTₜ = EBEₜ × (1 − t) + t × DAₜ − ΔBFRₜ − Iₜ + VR nette ; VR nette = PC − t × (PC − VNC)

## Exemple
Machine achetée 300 000 € en date 0, amortie en linéaire sur 5 ans (DA = 60 000 €) ; projet arrêté fin d'année 4 avec revente 80 000 € ; EBE 110 000 € par an ; BFR de 30 000 € constitué en date 0 et récupéré fin d'année 4 ; IS 25 % ; coût du capital 8 %.
CAF annuelle = 110 000 × 0,75 + 0,25 × 60 000 = 97 500 €. VNC fin d'année 4 = 300 000 − 4 × 60 000 = 60 000 € ; VR nette = 80 000 − 0,25 × 20 000 = 75 000 €.
FNT₀ = −330 000 ; FNT₁ à FNT₃ = 97 500 ; FNT₄ = 97 500 + 30 000 + 75 000 = 202 500. VAN à 8 % = −330 000 + 97 500 × (1,08⁻¹ + 1,08⁻² + 1,08⁻³) + 202 500 × 1,08⁻⁴ = 70 111 € > 0.

## Erreurs fréquentes
- Déduire les intérêts de l'emprunt qui finance le projet : ils sont déjà dans le coût du capital qui sert à actualiser.
- Retenir la valeur résiduelle brute : si le prix de cession dépasse la VNC fiscale, l'IS sur la plus-value la réduit (ici 75 000 et non 80 000).
- Compter la variation de BFR comme un flux de l'année où le chiffre d'affaires est réalisé, ou oublier sa récupération en fin de projet.
- Inclure une étude de marché déjà payée : coût irrécupérable, identique avec ou sans projet.

## À retenir
- L'économie d'IS sur amortissement (t × DA) est un flux positif : ne pas l'oublier.
- Le BFR se constitue au rythme du chiffre d'affaires et se récupère intégralement à la fin (sans impôt).
- Une valeur résiduelle supérieure à la VNC génère une plus-value imposable : la VR nette est inférieure au prix de cession.
- Pas de frais financiers dans les flux actualisés au coût du capital.

**Notions liées :** [Critères de choix d'investissement](/cours/van-tri-criteres-investissement) · [Coût du capital, CMPC et MEDAF](/cours/cout-capital-cmpc-medaf) · [Plan de financement pluriannuel](/cours/plan-financement) · [Plus-values de cession](/cours/plus-values-cession-entreprise)
