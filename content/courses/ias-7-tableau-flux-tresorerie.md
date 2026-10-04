# IAS 7 — Tableau des flux de trésorerie

**Références :** IAS 7 §6-9, §10-21, §31-36, §39-42, §43-44, §44A-44E (règl. UE 2023/1803)

**Enjeu :** reconstituer les flux opérationnels par la méthode indirecte, classer chaque flux dans l'une des trois catégories et éliminer les opérations sans effet de trésorerie ; exercice classique du dossier IFRS ou consolidation.

**Trésorerie et équivalents (§6-8)** : fonds en caisse et dépôts à vue + placements à court terme très liquides, facilement convertibles en un montant connu de trésorerie et soumis à un risque négligeable de changement de valeur ; en pratique, échéance de 3 mois au plus **à la date d'acquisition** (§7). Les actions, même cotées et liquides, en sont exclues car leur valeur n'est pas connue à l'avance. Les découverts bancaires remboursables à vue qui font partie intégrante de la gestion de trésorerie viennent en déduction (§8). Les mouvements entre éléments de la trésorerie (placement d'un excédent en SICAV monétaire) ne sont pas des flux (§9).

**Trois catégories de flux (§10-17)** :
- **activités opérationnelles** (§13-15) : principales activités génératrices de produits, et activités qui ne sont ni d'investissement ni de financement ; encaissements clients, paiements fournisseurs et salariés, impôt ;
- **investissement** (§16) : acquisition et cession d'actifs à long terme et de placements non inclus dans les équivalents de trésorerie ; seuls les décaissements créant un actif comptabilisé y figurent ;
- **financement** (§17) : variations des capitaux propres apportés et des emprunts (émissions, remboursements, part en principal des loyers IFRS 16, dividendes versés selon le choix ci-dessous).

**Flux opérationnels** : méthode directe (encouragée, §19) ou indirecte (§20) : résultat net + charges sans effet de trésorerie (amortissements, dépréciations, provisions) − produits sans effet de trésorerie − plus-values de cession (+ moins-values) − augmentation des stocks et des créances d'exploitation + augmentation des dettes d'exploitation. Les flux d'investissement et de financement sont toujours présentés pour leur montant brut (§21), sauf les exceptions du §22 (encaissements et décaissements pour compte de tiers, rotation rapide).

```diagram
{"type":"flow","title":"Méthode indirecte : du résultat net aux flux opérationnels","steps":[{"label":"Résultat net","note":"Point de départ (§20)"},{"label":"+ charges sans décaissement","note":"Amortissements, dépréciations, provisions"},{"label":"− produits sans encaissement","note":"Reprises, plus-values de cession"},{"label":"± variation du BFR","note":"− Δ stocks et créances, + Δ dettes d'exploitation"},{"label":"± reclassements","note":"Intérêts et impôt classés ailleurs"},{"label":"= Flux opérationnels"}]}
```

**Intérêts et dividendes (§31-34)** : intérêts versés en opérationnel ou en financement ; intérêts et dividendes reçus en opérationnel ou en investissement ; dividendes versés en financement ou en opérationnel. Le classement choisi est appliqué de façon permanente et indiqué séparément. **Impôt sur le résultat (§35-36)** : flux opérationnel, sauf rattachement identifiable à une opération d'investissement ou de financement.

**Opérations non monétaires (§43-44)** : exclues du tableau (acquisition d'un actif contre émission d'actions, conversion de dette en capital, acquisition par contrat de location) ; information en annexe. Depuis 2017, rapprochement des variations des passifs de financement (§44A). Les flux en monnaie étrangère sont convertis au cours du jour du flux ; l'effet des variations de cours sur la trésorerie détenue est présenté séparément (§25-28).

## Exemple
Au 31/12/N, Céleste présente : résultat net 300 k€ ; dotations aux amortissements 120 k€ ; cession d'une machine (VNC 40 k€) pour 60 k€ ; variation des stocks +30 k€ ; variation des créances clients +50 k€ ; variation des dettes fournisseurs +40 k€ ; intérêts versés 15 k€, classés par choix permanent en financement.
Flux opérationnels (méthode indirecte) = 300 + 120 − 20 (plus-value) − 30 − 50 + 40 + 15 (intérêts réintégrés) = 375 k€.
Flux d'investissement : encaissement du prix de cession +60 k€ (et non la VNC ni la plus-value). Flux de financement : intérêts versés −15 k€. L'acquisition d'un camion de 90 k€ par location IFRS 16 la même année n'apparaît pas dans le tableau (§43) ; seuls les loyers ultérieurs (part en principal en financement, intérêts selon le choix) y figureront.

## Erreurs fréquentes
- Classer en équivalents de trésorerie des actions cotées très liquides, ou une obligation à deux ans arrivant à échéance dans deux mois : le critère de trois mois s'apprécie à la date d'acquisition et la valeur doit être connue d'avance.
- Faire figurer une acquisition payée en actions ou financée par un contrat de location dans les flux d'investissement et de financement : opération non monétaire, en annexe seulement.
- Oublier de réintégrer la charge d'intérêts dans les flux opérationnels quand les intérêts versés sont classés en financement : sinon le même flux est compté deux fois.
- Croire que les intérêts versés sont obligatoirement en financement pour une entité industrielle : IAS 7 laisse le choix, appliqué de façon permanente.

## À retenir
- Méthode indirecte : si les intérêts versés sont classés en financement, la charge d'intérêts est réintégrée dans les flux opérationnels.
- La plus-value de cession est retranchée du résultat ; le prix de cession encaissé figure en investissement.
- Découverts remboursables à vue intégrés à la gestion de trésorerie : composante négative de la trésorerie, pas un flux de financement.
- IFRS 18 (adoptée par l'UE en février 2026, applicable aux exercices ouverts à compter du 1er janvier 2027) supprime le choix de classement des intérêts et dividendes pour la plupart des entités et impose le résultat opérationnel comme point de départ de la méthode indirecte.

**Notions liées :** [Tableau des flux consolidé](/cours/tableau-flux-consolide) · [Diagnostic par les flux de trésorerie](/cours/flux-tresorerie-diagnostic) · [IFRS 16 — Contrats de location](/cours/ifrs-16-contrats-location) · [IAS 1 — Présentation des états financiers](/cours/ias-1-presentation-etats-financiers)
