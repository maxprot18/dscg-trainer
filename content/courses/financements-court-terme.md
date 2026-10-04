# Financements à court terme : escompte, affacturage, billets de trésorerie

**Références :** C. com., art. L. 511-1 s. (lettre de change) ; C. mon. fin., art. L. 313-23 s. (cession Dailly) et L. 213-1 A s. (titres de créances négociables) ; PCG, comptes 5114, 519, 661, 627

**Enjeu :** couvrir un déficit de trésorerie au moindre coût réel ; à l'examen, on calcule le taux effectif d'un escompte ou d'un affacturage (jours de banque, commissions, net perçu) et l'on compare les techniques selon le transfert ou non du risque d'impayé.

**Crédits de trésorerie non mobilisables :**
- facilité de caisse : couverture de décalages de quelques jours (échéances de fin de mois), remboursée dès les encaissements suivants ;
- découvert autorisé : besoin plus durable, dans la limite d'un plafond ; intérêts calculés sur les soldes en dates de valeur (échelle d'intérêts), plus d'éventuelles commissions (plus fort découvert, mouvement) ;
- crédit de campagne : finance le BFR d'une activité saisonnière, remboursé par les ventes de la saison.

**Jours et dates de valeur** : la banque débite à une date de valeur antérieure ou égale à la date d'opération et crédite à une date postérieure ; les intérêts courent sur les soldes en valeur, ce qui renchérit le découvert. Les jours de banque ajoutés à la durée d'un escompte jouent le même rôle.

**Mobilisation de créances :**
- escompte : la banque avance le montant d'un effet avant l'échéance ; agios = intérêts (nominal × taux × jours / 360, jours de banque ajoutés) + commissions. L'escompte est avec recours : en cas d'impayé, l'effet est contrepassé et le remettant doit rembourser ;
- cession Dailly : cession de créances professionnelles (factures, pas seulement des effets) par bordereau ; le cédant reste garant solidaire du paiement, sauf convention contraire ;
- affacturage : le factor achète les créances, assure leur recouvrement et, en principe, garantit le risque d'insolvabilité (il peut être conclu sans garantie, dit « avec recours ») ; coût = commission d'affacturage (sur le chiffre d'affaires cédé, soumise à TVA) + commission de financement (intérêts sur les sommes avancées) ; une retenue de garantie, restituée à l'encaissement, est constituée.

```diagram
{"type":"flow","title":"Affacturage avec garantie : circuit d'une facture","steps":[{"label":"Vente à crédit au client","note":"facture cédée au factor par subrogation"},{"label":"Avance du factor","note":"montant TTC − commissions − retenue de garantie"},{"label":"Recouvrement par le factor","note":"le client paie le factor à l'échéance"},{"label":"Restitution de la retenue","note":"en cas d'insolvabilité, le factor garanti supporte la perte"}]}
```

**Titres de créances négociables** : billets de trésorerie, désormais NEU CP (Negotiable EUropean Commercial Paper), émis directement sur le marché monétaire pour une durée d'un an au plus, avec un montant unitaire minimal de 150 000 € et, en principe, une notation du programme par une agence agréée (dispense notamment pour les émetteurs dont les titres sont cotés ou dont le programme est garanti) : financement désintermédié réservé aux grandes entreprises, moins cher qu'un crédit bancaire pour un bon émetteur.

**Formules clés :** coût réel (taux effectif) = agios HT non récupérables × 360 / (montant net perçu × durée réelle en jours)

## Exemple
Lettre de change de 50 000 € remise à l'escompte 45 jours avant l'échéance ; taux nominal 6 %, 2 jours de banque, commission fixe de 15 € HT.
Intérêts = 50 000 × 6 % × 47 / 360 = 391,67 € ; agios = 391,67 + 15 = 406,67 € ; net perçu = 49 593,33 €.
Coût réel = 406,67 × 360 / (49 593,33 × 45) = 6,56 %, soit 0,56 point de plus que le taux affiché : les jours de banque et la commission, rapportés au net réellement disponible pendant 45 jours, expliquent l'écart.

## Erreurs fréquentes
- Croire que la cession Dailly transfère le risque d'impayé à la banque : le cédant reste garant ; seul l'affacturage avec garantie assume l'insolvabilité du débiteur.
- Assimiler les NEU CP à des crédits bancaires remboursables à vue ou à des emprunts à cinq ans : ce sont des titres de marché, d'un an au plus, à montant unitaire élevé.
- Calculer le coût réel sur le nominal et sur la durée nominale : il se rapporte au net perçu et à la durée réelle de mise à disposition.
- Inclure la TVA sur les commissions dans le coût : elle est récupérable et ne pèse pas sur l'entreprise assujettie.

## À retenir
- Le coût réel de l'escompte dépasse le taux nominal : jours de banque, commissions, base sur le net perçu.
- Seul l'affacturage (avec garantie) transfère le risque d'impayé ; escompte et Dailly le laissent au cédant.
- La TVA récupérable sur les commissions n'entre pas dans le coût.
- Besoin de quelques jours : facilité de caisse ; besoin saisonnier : crédit de campagne ; besoin durable : financement stable.

**Notions liées :** [Budget et plan de trésorerie](/cours/plan-tresorerie-previsionnel) · [Placements de trésorerie](/cours/placements-court-terme) · [Choix des modalités de financement](/cours/choix-modalites-financement) · [Risque de crédit et de contrepartie](/cours/risque-credit-contrepartie)
