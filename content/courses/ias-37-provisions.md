# IAS 37 — Provisions, passifs éventuels et actifs éventuels

**Références :** IAS 37 §10, §14-26, §27-35, §36-47, §53-60, §63-83, §86-89 (règl. UE 2023/1803) ; IAS 16 §16c ; IFRIC 1

**Enjeu :** décider si un événement donne lieu à une provision, à une simple information en annexe ou à rien, puis chiffrer la provision (valeur attendue, issue la plus probable, actualisation) ; QCM de qualification très fréquents et calculs courts, souvent couplés à IAS 16 pour le démantèlement.

**Comptabilisation d'une provision (§14)**, trois conditions cumulatives :
- obligation actuelle, **juridique ou implicite**, résultant d'un événement passé ; l'obligation implicite naît d'une pratique passée ou d'une annonce publique qui a créé une attente fondée chez les tiers (§10, §17-22) ; une décision interne non communiquée ne suffit pas ;
- sortie de ressources **probable**, c'est-à-dire plus probable qu'improbable (§23), la probabilité s'appréciant sur l'ensemble pour une population d'obligations similaires (garanties, §24) ; et estimation fiable du montant, presque toujours possible (§25-26).

**Passif éventuel (§27-30, §86)** : obligation potentielle dont l'existence dépend d'événements futurs incertains, ou obligation actuelle dont la sortie n'est pas probable ou pas estimable ; non comptabilisé, mention en annexe sauf si la sortie est très peu probable ; réexaminé à chaque clôture et provisionné dès que la sortie devient probable (§30). **Actif éventuel (§31-35, §89)** : jamais comptabilisé ; mention en annexe si l'entrée est probable ; comptabilisé seulement quand elle devient quasi certaine (ce n'est alors plus un actif éventuel).

```diagram
{"type":"tree","title":"Événement passé : provision, passif éventuel ou rien ?","root":{"label":"Obligation actuelle (juridique ou implicite) à la clôture ?","children":[{"edge":"non ou douteuse","label":"Passif éventuel, sauf sortie très peu probable","note":"Information en annexe seulement (§27-28, §86)"},{"edge":"oui","label":"Sortie de ressources probable ?","children":[{"edge":"non","label":"Passif éventuel","note":"Annexe (§86)"},{"edge":"oui","label":"Provision = meilleure estimation","note":"Valeur attendue ou issue la plus probable, actualisée si significatif (§36-47)"}]}]}}
```

**Évaluation (§36-47)** : meilleure estimation de la dépense nécessaire pour éteindre l'obligation à la clôture, en tenant compte des risques et des événements futurs probables (§42, §48) :
- grande population d'éléments : **valeur attendue**, pondération de chaque issue par sa probabilité (§39) ;
- obligation unique : résultat individuel **le plus probable**, ajusté si les autres issues sont surtout plus coûteuses (§40) ;
- **actualisation** si l'effet est significatif, au taux avant impôt reflétant le risque spécifique au passif (§45-47) ; la désactualisation annuelle est une charge financière (§60) ; les profits attendus de la sortie d'actifs ne sont pas déduits (§51).

**Remboursement attendu (§53-54)** : actif distinct, comptabilisé seulement s'il est **quasi certain**, limité au montant de la provision ; présentation nette possible au compte de résultat seulement. Une provision n'est utilisée que pour les dépenses pour lesquelles elle a été constituée (§61).

**Cas particuliers** :
- pertes opérationnelles futures : **pas de provision** (§63), mais indice de dépréciation IAS 36 (§65) ;
- contrat déficitaire (§66-69) : contrat dont les coûts inévitables (coût net de sortie : le plus faible du coût d'exécution et de l'indemnité ou pénalité de non-exécution, §68) excèdent les avantages économiques attendus ; la provision couvre la perte inévitable, soit l'excédent du coût d'exécution sur les avantages attendus, ou la pénalité de sortie si elle est plus faible ; coût d'exécution = coûts marginaux (main-d'œuvre directe, matières) + quote-part des autres coûts directement liés, amortissements compris (§68A) ; les actifs dédiés sont d'abord dépréciés (§69) ;
- restructuration (§70-83) : obligation implicite si plan formalisé et détaillé **et** attente fondée créée chez les personnes concernées (début d'exécution ou annonce, §72) ; seules les dépenses directes, non liées aux activités poursuivies (§80-81 : pas de reconversion ni de déménagement du personnel conservé, ni de marketing) ; une vente d'activité n'est engagée qu'avec un accord de vente irrévocable (§78).

**Formules clés :** valeur attendue = Σ (probabilitéᵢ × coûtᵢ) ; provision actualisée = dépense / (1 + r)ⁿ ; désactualisation de l'année = provision d'ouverture × r

## Exemple
Au 31/12/N, Hélios a vendu 10 000 appareils sous garantie d'un an : expérience de 7 % de défauts mineurs (réparation 20 €) et 3 % de défauts majeurs (150 €), 90 % sans défaut. Provision pour garantie = 10 000 × (0,07 × 20 + 0,03 × 150) = 14 000 + 45 000 = 59 000 € (valeur attendue, et non 150 € × 300 pannes majeures seulement). Hélios est aussi poursuivie par un client : ses avocats estiment à 60 % la probabilité de perdre et de payer 100 000 €, sinon rien. Obligation unique : provision de 100 000 € (issue la plus probable), pas 60 000 €. Si la probabilité de perdre était de 40 %, aucune provision, mais un passif éventuel en annexe.
Enfin, Hélios doit démanteler une installation mise en service le 01/01/N pour 500 000 € dans 10 ans, taux avant impôt 4 % : provision initiale = 500 000 / 1,04¹⁰ ≈ 337 782 €, portée au coût de l'installation (IAS 16 §16c) et amortie avec elle ; désactualisation N = 337 782 × 4 % ≈ 13 511 € en charge financière, provision au 31/12/N ≈ 351 293 €.

## Erreurs fréquentes
- Provisionner les pertes d'exploitation futures d'une division ou d'une filiale déficitaire : aucune obligation actuelle, donc aucune provision (§63) ; seul un test de dépréciation est envisageable.
- Inclure dans la provision de restructuration la formation ou le déménagement des salariés conservés et la communication vers les clients : seules les dépenses directes (indemnités des salariés non reclassés, résiliation de baux) sont admises (§80-81).
- Retenir la valeur attendue (probabilité × montant) pour un litige unique, ou passer la désactualisation en charge d'exploitation : pour une obligation isolée, c'est l'issue la plus probable qui compte (§40) ; la désactualisation est une charge financière (§60).

## À retenir
- Une décision du conseil non annoncée ne crée pas d'obligation implicite ; l'annonce ou le début d'exécution du plan la crée.
- Le remboursement d'un assureur ne se déduit pas de la provision au bilan ; la compensation n'est admise qu'au compte de résultat.
- Coûts de démantèlement : provision actualisée en contrepartie du coût de l'actif (IAS 16 §16c), révisions ultérieures imputées sur l'actif (IFRIC 1).

**Notions liées :** [Provisions pour risques et charges (PCG)](/cours/provisions-risques-charges) · [IAS 16 — Immobilisations corporelles](/cours/ias-16-immobilisations) · [IAS 36 — Dépréciation d'actifs](/cours/ias-36-depreciation-actifs) · [IAS 19 — Avantages du personnel](/cours/ias-19-avantages-personnel)
