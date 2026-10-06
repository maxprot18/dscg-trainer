# Financement : fonds propres, valeurs mobilières composées, emprunt obligataire et financements de l'exploitation

**Références :** C. com. art. L228-36 (titres participatifs), L228-38 s. (obligations), L228-46 (masse), L228-91 s. (valeurs mobilières donnant accès au capital) ; C. mon. fin. art. L313-7 (crédit-bail), L313-23 s. (cession Dailly) ; PCG (règl. ANC 2014-03), comptes 163, 169, 467, 5114, 6225, 627, 661, 6861

**Enjeu :** choisir et qualifier un mode de financement (fonds propres, quasi-fonds propres, dette, mobilisation de créances) et en tirer les conséquences juridiques (droits des porteurs, organe compétent) et comptables ; thème récurrent des cas de synthèse UE 1 et des QCM.

- **Fonds propres** : augmentation de capital par apports (dilution des anciens associés, compensée par le droit préférentiel de souscription). **Quasi-fonds propres** : titres participatifs, prêts participatifs, comptes courants d'associés bloqués ; ils sont remboursés après les créanciers ordinaires et renforcent la structure financière sans ouvrir le capital.
- **Titres participatifs** (L228-36) : réservés aux sociétés par actions du secteur public, aux sociétés coopératives (SA, SARL ou SAS) et à certains organismes d'HLM : une SA ordinaire ne peut pas en émettre ; rémunération comprenant une partie fixe et une partie variable liée à l'activité ou aux résultats ; remboursables seulement en cas de liquidation ou, à l'initiative de l'émetteur, après un délai minimal de 7 ans ; aucun droit de vote.
- **Obligations** (L228-38) : titres négociables conférant, dans une même émission, les mêmes droits de créance pour une même valeur nominale. Les porteurs d'une émission forment de plein droit une **masse** dotée de la personnalité civile, représentée par des mandataires (L228-46), qui défend leurs intérêts communs. Les obligataires sont des créanciers : ils ne votent pas en assemblée d'actionnaires, mais l'assemblée des obligataires doit être consultée sur certaines décisions (changement d'objet ou de forme, fusion).
- **Valeurs mobilières donnant accès au capital** (L228-91 s.) : OCA, ORA, OBSA, BSA, ABSA. L'émission donnant accès à des titres de capital à émettre est autorisée par l'AGE (L228-92), sur rapport du conseil et rapport spécial du commissaire aux comptes ; les actionnaires disposent d'un DPS, auquel ils peuvent renoncer. Tant que des titres sont en circulation, la société ne peut modifier la répartition des bénéfices ou amortir son capital sans préserver les droits des porteurs.
- **Comptabilisation de l'emprunt obligataire** : dette inscrite pour sa **valeur de remboursement** au 163 ; l'écart avec le prix d'émission (prime de remboursement) est porté au 169 et amorti sur la durée de l'emprunt (6861/169), au prorata des intérêts courus ou linéairement ; les frais d'émission sont étalés ou passés en charges.
- **Crédit-bail** (L313-7) : location d'un bien acheté par l'établissement de crédit, avec option d'achat au profit du locataire ; loyers en charges dans les comptes individuels (612), engagements mentionnés dans l'annexe. Le bien n'entre à l'actif qu'à la levée de l'option, pour son prix.
- **Escompte** : la banque avance le montant d'un effet avant son échéance et le recouvre à l'échéance ; agios = intérêts (nominal × taux × jours / 360) + commissions. Effet remis : 5114 ; intérêts : 661 ; commissions : 627. En cas d'impayé, la banque se retourne contre l'entreprise.
- **Affacturage** : le factor acquiert les créances (subrogation conventionnelle), les finance, les recouvre et garantit souvent l'insolvabilité du débiteur. Créances transférées du 411 au compte du factor (467) ; commission d'affacturage (soumise à TVA) en 6225 ; commission de financement en 661 ; une retenue de garantie reste due par le factor.
- **Cession Dailly** (L313-23 s.) : cession de créances professionnelles à un établissement de crédit par simple bordereau, à titre d'escompte ou de garantie ; opposable aux tiers à la date portée sur le bordereau, sans formalité ; le cédant reste garant solidaire du paiement, sauf convention contraire.

```diagram
{"type":"tree","title":"Classer un instrument de financement","root":{"label":"L'apporteur devient-il associé ?","children":[{"edge":"oui","label":"Fonds propres","note":"augmentation de capital, DPS, dilution"},{"edge":"non, créance subordonnée","label":"Quasi-fonds propres","note":"titres participatifs, prêts participatifs, comptes courants bloqués"},{"edge":"non, créance ordinaire","label":"Dette","children":[{"edge":"moyen/long terme","label":"Emprunt obligataire, crédit-bail"},{"edge":"court terme","label":"Escompte, Dailly, affacturage"}]}]}}
```

**Formules clés :** agios d'escompte = valeur nominale × taux × n / 360 + commissions ; prime de remboursement = (prix de remboursement − prix d'émission) × nombre de titres

## Exemple
Émission de 10 000 obligations de nominal 100 €, prix d'émission 98 €, remboursement 102 € in fine dans 5 ans. Encaissement : 10 000 × 98 = 980 000 € ; dette au 163 : 10 000 × 102 = 1 020 000 € ; prime de remboursement : (102 − 98) × 10 000 = 40 000 €.
Écriture : débit 512 pour 980 000, débit 169 pour 40 000, crédit 163 pour 1 020 000. Amortissement linéaire de la prime : 40 000 / 5 = 8 000 € par an (débit 6861, crédit 169).
Escompte d'un effet de 24 000 € à 60 jours, taux 6 %, commission 20 € (TVA ignorée) : intérêts = 24 000 × 6 % × 60 / 360 = 240 € ; agios = 260 € ; net porté en banque = 23 740 €.

## Erreurs fréquentes
- Attribuer un droit de vote en assemblée d'actionnaires aux obligataires ou aux porteurs de titres participatifs : ce sont des créanciers, regroupés en masse, sans voix dans les décisions des associés.
- Croire que les titres participatifs sont convertis en actions ou remboursables à la demande du porteur : ils ne sont remboursés qu'en cas de liquidation ou au gré de l'émetteur après 7 ans.
- Inscrire l'emprunt obligataire au 163 pour le prix d'émission : le compte 163 reçoit la valeur de remboursement, l'écart passe au 169.
- Penser que l'escompte ou la cession Dailly transfèrent le risque d'impayé au banquier : le cédant reste garant ; seul l'affacturage avec garantie le transfère au factor.

## À retenir
- Obligataire = créancier, groupé en masse ; titre participatif = quasi-fonds propres sans droit de vote.
- Emprunt obligataire : 163 pour la valeur de remboursement, 169 pour la prime, amortie sur la durée de l'emprunt.
- Escompte et Dailly laissent le risque d'impayé à l'entreprise ; l'affacturage avec garantie le transfère au factor.

**Notions liées :** [Augmentation de capital et dilution](/cours/augmentation-capital-dilution) · [Financements à court terme](/cours/financements-court-terme) · [Sûretés réelles](/cours/suretes-reelles) · [Choix des modalités de financement](/cours/choix-modalites-financement)
