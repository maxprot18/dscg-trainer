# Provisions — assertions d'audit

**Références :** NEP 500 (caractère probant des éléments collectés) ; NEP 540 (estimations comptables) ; PCG art. 321-1 (passif, provision, passif éventuel, charge à payer) et 322-1 s. ; comptes 151 et 152

**Enjeu :** les provisions ne naissent pas d'un flux de pièces : l'auditeur doit prouver autant ce qui manque (exhaustivité) que ce qui est en trop (existence) ; l'examen attend que l'on nomme l'assertion précise mise en cause par une situation donnée.

Les provisions pour risques et charges sont des passifs estimés : les assertions portent sur l'obligation elle-même, sur son montant et sur l'information donnée en annexe. Une provision suppose trois conditions à la clôture : une obligation envers un tiers née d'un événement passé, une sortie de ressources probable, une estimation fiable.
- **Exhaustivité** : toutes les obligations existant à la clôture et répondant aux conditions de comptabilisation sont provisionnées (risque : litige, garantie ou pénalité oubliés). C'est l'assertion la plus exposée, car rien n'oblige mécaniquement la direction à constater une charge estimée.
- **Existence (réalité de l'obligation)** : chaque provision correspond à une obligation envers un tiers, née d'un événement antérieur à la clôture (risque : provision « pour risques divers » sans obligation, constituée pour lisser le résultat).
- **Droits et obligations** : l'obligation incombe bien à l'entité (et non à une filiale, à un assureur ou au cocontractant) ; un remboursement attendu d'un assureur est un actif distinct, pas une réduction de la provision.
- **Évaluation** : meilleure estimation de la sortie de ressources à la clôture, hypothèses raisonnables et documentées (NEP 540) ; le montant réclamé par le tiers n'est pas la mesure.
- **Présentation et information** : distinction provision / dette (montant et échéance certains : charge à payer) / dépréciation d'actif ; mention en annexe des passifs éventuels et du tableau des mouvements de provisions.

```diagram
{"type":"tree","title":"Provision, dette, passif éventuel ou rien ?","root":{"label":"Obligation envers un tiers née avant la clôture ?","children":[{"edge":"non","label":"Rien : ni provision ni annexe","note":"pertes futures, dépenses décidées sans obligation"},{"edge":"oui","label":"Montant et échéance certains ?","children":[{"edge":"oui","label":"Dette ou charge à payer","note":"facture, transaction signée"},{"edge":"non","label":"Sortie de ressources probable et estimable ?","children":[{"edge":"oui","label":"Provision (151 ou 152)","note":"meilleure estimation"},{"edge":"non","label":"Passif éventuel : annexe seulement"}]}]}]}}
```

**Procédures types :** exhaustivité → demande de confirmation aux avocats, revue des procès-verbaux, analyse des honoraires juridiques ; existence → justificatifs de l'obligation (assignation, contrat, plan annoncé) ; évaluation → revue des hypothèses, recalcul, dénouement postérieur.

## Exemple
Au 31/12/N, la société Lyra présente trois dossiers. (1) Assignation d'un client reçue en octobre N ; l'avocat estime une condamnation probable de 40 000 € : provision 1511 de 40 000 €. (2) Transaction signée le 20/12/N avec un fournisseur, 70 000 € payables le 15/01/N+1, encore en 1511 : montant et échéance certains, c'est une dette (401 ou 467), l'anomalie porte sur la **présentation**. (3) Réclamation d'un prospect pour 25 000 €, que l'avocat juge peu probable d'aboutir : aucune provision, mais un passif éventuel à décrire en annexe.
Si la direction a de plus doté 300 000 € « pour risques divers » sans obligation identifiable, l'anomalie porte sur l'**existence** : la provision doit être reprise, quelle que soit la prudence invoquée.

## Erreurs fréquentes
- Qualifier d'« évaluation » une transaction signée laissée en provision : le montant est connu, le problème est le classement en provision au lieu d'une dette.
- Rattacher l'analyse des honoraires d'avocats (6226) à l'existence ou à la séparation des exercices : partir d'une source externe à la comptabilité des provisions vise l'exhaustivité (litiges non recensés).
- Traiter une provision « au cas où l'activité ralentirait » comme un défaut d'exhaustivité ou de droits et obligations : sans obligation envers un tiers, c'est l'existence qui est en cause.
- Provisionner le montant réclamé plutôt que la meilleure estimation : l'assertion évaluation est alors en défaut.

## À retenir
- Une provision sans obligation à la clôture n'est pas un excès de prudence acceptable : c'est une anomalie sur l'existence.
- Montant et échéance certains (facture reçue, transaction signée) : dette, pas provision.
- Le passif éventuel ne se provisionne pas mais son omission en annexe est une anomalie d'information.

**Notions liées :** [Provisions — risques](/cours/provisions-risques) · [Provisions pour risques et charges (PCG)](/cours/provisions-risques-charges) · [IAS 37 — Provisions](/cours/ias-37-provisions) · [Éléments probants et techniques](/cours/elements-probants-techniques)
