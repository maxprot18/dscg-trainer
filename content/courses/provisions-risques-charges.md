# Provisions pour risques et charges

**Références :** PCG art. 321-1 s. (définition et conditions), 322-1 s. (évaluation ; restructurations art. 322-10), 214-10 (gros entretien ou grandes révisions) et 324-1 (engagements de retraite) (règl. ANC 2014-03 modifié par le règl. ANC 2022-06) ; C. com. L123-13 ; comptes 151, 152, 6815, 6865, 6875, 7815

**Enjeu :** la provision est le passif le plus discuté à la clôture, parce qu'elle repose sur un jugement ; l'examen demande de dire si l'on provisionne, pour combien, et de distinguer provision, passif éventuel et simple intention de dépense.

Un **passif** est une obligation de l'entité à l'égard d'un tiers dont il est probable ou certain qu'elle provoquera une sortie de ressources sans contrepartie au moins équivalente. Une **provision** est un passif dont l'échéance ou le montant n'est pas fixé de façon précise. Elle est comptabilisée si trois conditions sont réunies à la clôture :
- une **obligation** (légale, réglementaire, contractuelle ou implicite, c'est-à-dire résultant des pratiques ou engagements publics de l'entité) envers un tiers, née d'un événement antérieur à la clôture ;
- une **sortie de ressources probable ou certaine** sans contrepartie au moins équivalente attendue du tiers ;
- une **estimation fiable** du montant ; à défaut, l'obligation est un passif éventuel mentionné dans l'annexe.

**Évaluation** : meilleure estimation de la sortie de ressources nécessaire pour éteindre l'obligation à la clôture (pas le montant réclamé par le tiers, ni le maximum possible). Pour une population nombreuse d'obligations (garanties), on retient l'espérance des coûts (probabilité × coût). Révision à chaque clôture : dotation complémentaire (68x) ou reprise (78x) ; la provision est reprise quand l'obligation est éteinte ou n'est plus probable.

Cas usuels : litiges (1511), garanties données aux clients (1512), pertes sur contrats déficitaires (1516, dont les contrats à long terme), restructurations (1522 depuis le règl. ANC 2022-06, à condition que la décision soit prise **et** annoncée aux personnes concernées avant la clôture, avec un plan détaillé), pensions et obligations similaires (1521), gros entretien ou grandes révisions (1525) si l'entreprise retient la provision plutôt que l'approche par composants.

Pas de provision pour des pertes d'exploitation futures, ni pour des dépenses futures sans obligation à la clôture (formation, publicité, investissements) : l'entité peut encore y échapper par ses propres décisions.

```diagram
{"type":"tree","title":"Faut-il comptabiliser une provision à la clôture ?","root":{"label":"Obligation envers un tiers née avant la clôture ?","children":[{"edge":"non","label":"Rien","note":"intention de dépense, perte future d'exploitation"},{"edge":"oui","label":"Sortie de ressources probable ?","children":[{"edge":"non","label":"Passif éventuel : annexe"},{"edge":"oui","label":"Estimation fiable ?","children":[{"edge":"oui","label":"Provision (15x)"},{"edge":"non","label":"Annexe"}]}]}]}}
```

**Engagements de retraite** : leur montant figure dans l'annexe ; la loi permet de les provisionner en tout ou partie (C. com. L123-13) et le PCG fait de leur comptabilisation au passif la méthode de référence. **Gros entretien** : constitution progressive sur la période qui sépare deux opérations, sur la base du coût estimé ; révision prospective du coût.

## Exemple
Au 31/12/N, un ancien salarié de la société Ravel réclame 60 000 € devant le conseil de prud'hommes ; l'avocat estime la condamnation probable et chiffre le risque à 35 000 €. Ravel a par ailleurs vendu en N 4 000 appareils garantis un an : 3 % tombent en panne en moyenne et chaque intervention coûte 120 €.
Provision pour litige = meilleure estimation = **35 000 €** (6815 / 1511), et non 60 000 €. Provision pour garantie = 4 000 × 3 % × 120 = **14 400 €** (6815 / 1512).
En N+1, le jugement condamne Ravel à 42 000 €, payés le 15/06 : la charge de 42 000 € est comptabilisée selon sa nature et la provision de 35 000 € est reprise en totalité (1511 / 7815) ; l'écart de 7 000 € pèse sur le résultat de N+1, sans correction de N.

## Erreurs fréquentes
- Provisionner une perte d'exploitation budgétée pour N+1 : aucune obligation envers un tiers n'existe à la clôture ; seul un contrat ferme devenu déficitaire se provisionne.
- Provisionner une restructuration décidée par le conseil mais ni engagée ni annoncée aux personnes concernées avant la clôture : l'obligation implicite n'est pas née.
- Évaluer un litige au montant réclamé par le demandeur : on retient la meilleure estimation de la sortie de ressources, appuyée sur l'avis des conseils.
- Provisionner un plan de formation ou une campagne publicitaire programmés : ce sont des dépenses futures évitables, donc des charges de l'exercice où elles seront engagées.

## À retenir
- Trois conditions cumulatives : obligation actuelle, sortie probable, estimation fiable ; sinon passif éventuel (annexe) ou rien.
- Dotation d'exploitation : 6815 ; reprise : 7815 ; dotation financière 6865 ; dotation exceptionnelle 6875, réservée depuis le règl. ANC 2022-06 aux événements majeurs et inhabituels.
- Un changement d'estimation se traite en dotation ou reprise de l'exercice, sans retraitement des exercices antérieurs.

**Notions liées :** [IAS 37 — Provisions, passifs éventuels](/cours/ias-37-provisions) · [Contrats à long terme](/cours/contrats-long-terme-pcg) · [Audit du cycle provisions : risques](/cours/provisions-risques) · [IAS 19 — Avantages du personnel](/cours/ias-19-avantages-personnel)
