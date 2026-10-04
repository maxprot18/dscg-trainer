# Risque de crédit, de contrepartie et de liquidité

**Références :** IFRS 7 §35A-39 (règl. UE 2023/1803) ; IFRS 9 §5.5 (pertes de crédit attendues)

**Enjeu :** trois risques souvent confondus à l'examen : le défaut d'un client (crédit), le défaut de la banque avec laquelle on a traité un dérivé (contrepartie) et l'incapacité à payer ses propres échéances (liquidité) ; il faut savoir les mesurer et nommer l'outil qui les réduit vraiment.

**Risque de crédit** : défaillance d'un client ou d'un débiteur. Mesure : **perte attendue** = exposition au défaut (EAD) × probabilité de défaut (PD) × perte en cas de défaut (LGD = 1 − taux de recouvrement). C'est la logique des pertes de crédit attendues d'IFRS 9 (§5.5), provisionnées dès l'origine de la créance. La concentration sur quelques clients aggrave le risque au-delà de la perte attendue : la perte réelle est de 0 ou de l'EAD entière, pas de sa moyenne.

**Gestion du risque client** : analyse et notation, plafonds d'encours, garanties (caution, garantie à première demande, crédit documentaire), **assurance-crédit** (indemnisation, en général partielle, de l'impayé), affacturage avec garantie de bonne fin (le factor conserve le risque). L'escompte, la cession Dailly et la mobilisation de créances se font **avec recours** : la banque finance mais le cédant garde le risque d'impayé et sera débité si le client ne paie pas.

**Risque de contrepartie** sur les opérations de marché : défaillance de la banque contrepartie d'un instrument dérivé. Il porte sur le **coût de remplacement** (valeur de marché positive du contrat, qu'il faudrait payer pour le reconstituer), pas sur le nominal, qui n'est pas échangé sur un swap de taux. Réduction : choix de contreparties bien notées, diversification, accords de compensation et appels de marge, recours aux marchés organisés avec chambre de compensation.

**Risque de liquidité** : impossibilité de faire face à ses échéances, même pour une entreprise solvable. Mesure : échéancier des encaissements et décaissements, impasse de liquidité par période. Couverture : **lignes de crédit confirmées** (engagement ferme de la banque sur une durée, moyennant une commission), contrairement aux facilités non confirmées, révocables à tout moment ; allongement de la maturité de la dette, diversification des sources, trésorerie de précaution. Les **covenants** (ratios à respecter) peuvent entraîner l'exigibilité anticipée de la dette et transformer une tension en crise.

**Formules clés :** perte attendue = EAD × PD × LGD ; impasse de liquidité = trésorerie initiale + encaissements − décaissements

## Exemple
Crédit : créance de 1 500 000 € sur un client dont la probabilité de défaut à un an est de 2 % ; en cas de défaut, 40 % de la créance serait recouvré. LGD = 1 − 0,40 = 0,60 ; perte attendue = 1 500 000 × 0,02 × 0,60 = 18 000 €. Avec le taux de recouvrement à la place de la LGD, on trouverait 12 000 € : erreur.
Contrepartie : un swap de taux de 10 M€ de nominal conclu avec une banque a aujourd'hui une valeur de marché de +40 k€ pour l'entreprise. Si la banque fait défaut, la perte est de 40 k€ (coût de reconstitution du contrat), pas de 10 M€.
Liquidité : trésorerie initiale 200 k€, encaissements du trimestre 1 100 k€, décaissements 1 450 k€ : impasse = 200 + 1 100 − 1 450 = −150 k€. Seule une ligne confirmée d'au moins 150 k€ (ou un report de décaissements) garantit le passage du trimestre ; une facilité de caisse non confirmée peut être retirée au moment du besoin.

## Erreurs fréquentes
- Multiplier l'exposition par le taux de recouvrement au lieu de la LGD : la perte attendue porte sur la part non recouvrée.
- Croire que l'escompte ou la cession Dailly transfère le risque d'impayé à la banque : ces financements sont avec recours ; seuls l'assurance-crédit ou l'affacturage sans recours le transfèrent.
- Mesurer le risque de contrepartie d'un swap par son nominal : il se limite au coût de remplacement (valeur de marché positive).
- Traiter une facilité de caisse non confirmée comme une couverture du risque de liquidité : la banque peut la supprimer ; seule une ligne confirmée engage.

## À retenir
- LGD = 1 − taux de recouvrement : ne pas multiplier par le taux de recouvrement.
- Escompte et Dailly n'éliminent pas le risque client ; l'assurance-crédit le transfère.
- Une ligne non confirmée peut disparaître précisément quand on en a besoin.

**Notions liées :** [Financements à court terme](/cours/financements-court-terme) · [Plan de trésorerie prévisionnel](/cours/plan-tresorerie-previsionnel) · [Risque de défaillance et scoring](/cours/risque-defaillance-scoring) · [IFRS 9 — Instruments financiers](/cours/ifrs-9-instruments-financiers)
