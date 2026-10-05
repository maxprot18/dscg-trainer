# Trésorerie — procédures substantives

**Références :** NEP 330 (procédures substantives) ; NEP 505 (confirmations externes) ; NEP 520 (procédures analytiques) ; PCG comptes 512, 5181, 5188, 53, 58, 627, 661, 768, 1688

**Enjeu :** la confirmation bancaire et le rapprochement bancaire refait par l'auditeur sont les deux procédures incontournables du cycle ; l'examen demande presque toujours de reconstituer un rapprochement, de trier les suspens et d'en déduire les écritures de régularisation.

- **Confirmation bancaire (NEP 505)** : procédure de référence, adressée par l'auditeur à toutes les banques avec lesquelles l'entité est en relation, réponse reçue directement par lui. Elle porte sur les comptes ouverts (y compris à solde nul ou clôturés), les soldes, les signataires, les emprunts, les garanties et engagements (cautions, nantissements, effets escomptés non échus, instruments dérivés) : elle sert aussi l'exhaustivité de l'annexe.
- **Rapprochement bancaire** : obtenu ou refait à partir des relevés au 31/12 ; contrôle arithmétique ; justification de chaque suspens et vérification de son dénouement sur les relevés de N+1. Un suspens ancien ou non dénoué est une anomalie potentielle (détournement masqué).
- **Comptage de caisse** : à la clôture, en présence du caissier, procès-verbal signé rapproché du solde 53.
- **Opérations à régulariser** : frais et agios du relevé (627, 661) ; intérêts courus à payer sur concours bancaires (5181) et sur emprunts (1688) ; intérêts courus à recevoir sur dépôts et comptes à terme (5188, en contrepartie de 768).
- **Virements internes** : le compte de passage 58 doit être soldé à la clôture ; un solde révèle une opération en suspens entre deux banques.
- **Coupure** : derniers chèques émis et premières remises, rapprochés des dates de débit et de crédit sur les relevés de N+1 ; chèques émis mais conservés à contre-passer.
- **Procédures analytiques (NEP 520)** : charges et produits financiers rapprochés des encours et des taux.

```diagram
{"type":"flow","title":"Refaire le rapprochement bancaire au 31/12","steps":[{"label":"Solde du relevé","note":"Point de vue banque : créditeur = 512 débiteur"},{"label":"Suspens côté banque","note":"− chèques émis non débités + remises non créditées"},{"label":"Suspens côté comptabilité","note":"+ crédits bancaires non comptabilisés − débits non comptabilisés"},{"label":"Égalité des soldes corrigés","note":"Sinon : erreur ou suspens non identifié"},{"label":"Écritures et dénouement","note":"Régulariser côté comptabilité ; vérifier sur relevés N+1"}]}
```

**Formules clés :** solde bancaire corrigé = solde du relevé − chèques émis non débités + remises non créditées ; solde comptable corrigé = solde du 512 + crédits bancaires non comptabilisés − débits bancaires non comptabilisés (les deux doivent être égaux) ; intérêts courus = capital × taux × mois écoulés depuis la dernière échéance / 12

## Exemple
Relevé de Sadalmelik au 31/12/N : solde créditeur 72 310 €. Suspens : chèques émis et comptabilisés non débités 4 150 € et 9 600 € ; remise de chèques du 31/12 non créditée 12 800 € ; frais bancaires 95 € et prélèvement de loyer 3 200 € sur le relevé, non comptabilisés ; virement client de 7 500 € reçu le 30/12, non comptabilisé. Un compte à terme de 500 000 € à 2,4 % souscrit le 01/10/N n'a donné lieu à aucune écriture d'intérêts.
Solde bancaire corrigé = 72 310 − 13 750 + 12 800 = **71 360 €**. Solde du 512 avant régularisation : 71 360 + 95 + 3 200 − 7 500 = **67 155 €** (vérification : 67 155 − 95 − 3 200 + 7 500 = 71 360). Écritures : débit 627 / crédit 512 pour 95 € ; débit 613 / crédit 512 pour 3 200 € ; débit 512 / crédit 411 pour 7 500 € ; intérêts courus 500 000 × 2,4 % × 3 / 12 = **3 000 €**, débit 5188 / crédit 768. Les deux chèques et la remise se dénouent seuls : on vérifie leur passage sur le relevé de janvier.

## Erreurs fréquentes
- Régulariser les chèques émis non débités ou la remise non créditée : ils sont correctement comptabilisés, seul le traitement bancaire est décalé ; aucune écriture.
- Inverser le sens des suspens côté comptabilité, ou les reporter côté banque : le rapprochement ne s'équilibre plus, ou s'équilibre sur un solde 512 faux.
- Croire que la NEP 505 impose la confirmation des engagements dans tous les audits : la norme encadre la mise en œuvre des confirmations ; l'auditeur les décide selon les risques, et les demande ici pour l'exhaustivité de l'annexe.
- Valider un suspens sur la seule explication de la direction : il ne se justifie qu'au vu de son dénouement effectif en N+1.

## À retenir
- Le relevé est tenu du point de vue de la banque : un solde créditeur au relevé correspond à un solde débiteur du 512.
- Seuls les suspens « côté comptabilité » (frais, prélèvements, virements reçus) appellent une écriture ; les chèques en circulation et remises en cours se dénouent seuls.
- Un suspens ne se valide qu'au vu de son dénouement effectif en N+1.

**Notions liées :** [Trésorerie — assertions](/cours/tresorerie-assertions) · [Trésorerie — pièges classiques](/cours/tresorerie-pieges) · [Financements à court terme](/cours/financements-court-terme) · [Placements à court terme](/cours/placements-court-terme)
