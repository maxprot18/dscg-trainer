# IAS 1 — Présentation des états financiers

**Références :** IAS 1 §10, §15-46, §54-80A, §81A-105 (règl. UE 2023/1803) ; IFRS 18 (IASB, avril 2024 ; adoptée par l'UE, règl. 2026/338)

**Enjeu :** savoir ce que contient un jeu d'états financiers IFRS, classer un poste en courant ou non courant et distinguer résultat net, autres éléments du résultat global (OCI) et opérations avec les actionnaires ; questions fréquentes de QCM et préalable à tout dossier de consolidation IFRS.

**Jeu complet d'états financiers (§10)** : état de la situation financière à la clôture ; état du résultat net et des autres éléments du résultat global (en un ou deux états, §10A) ; état des variations des capitaux propres ; tableau des flux de trésorerie (IAS 7) ; notes annexes ; état de la situation financière à l'ouverture de la période comparative en cas d'application rétrospective, de retraitement ou de reclassement significatif (§40A).

**Principes généraux** : image fidèle (§15) ; continuité d'exploitation appréciée sur au moins 12 mois après la clôture, avec mention des incertitudes significatives (§25-26) ; comptabilité d'engagement (§27) ; importance relative et regroupement, un poste non significatif n'étant pas présenté séparément (§29-31) ; **non-compensation** des actifs et passifs, produits et charges, sauf si une norme l'impose ou l'autorise (§32) ; information comparative sur au moins une période (§38) ; permanence de la présentation d'un exercice à l'autre (§45).

**Courant / non courant** (§60-76) : présentation séparée obligatoire, sauf si un classement par liquidité est plus pertinent (§60).
- actif courant (§66) : réalisé ou consommé dans le cycle d'exploitation normal, détenu à des fins de transaction, réalisé dans les 12 mois, ou trésorerie non soumise à restriction ; tout le reste est non courant ;
- passif courant (§69) : réglé dans le cycle normal, détenu à des fins de transaction, exigible dans les 12 mois, ou l'entité n'a pas, à la clôture, le droit de différer son règlement d'au moins 12 mois ; ce droit doit exister à la clôture et s'apprécie en fonction des covenants à respecter à cette date (§72A-72B) ;
- un emprunt devenu exigible à la clôture (bris de covenant) reste courant même si la banque renonce à l'exigibilité entre la clôture et l'autorisation de publication (§74) ; la renonciation obtenue avant la clôture, pour au moins 12 mois, maintient le classement en non courant (§75).

```diagram
{"type":"tree","title":"Classement d'une dette financière à la clôture","root":{"label":"Droit, à la clôture, de différer le règlement d'au moins 12 mois ?","children":[{"edge":"oui","label":"Passif non courant","note":"Covenants respectés à la clôture ou renonciation obtenue avant la clôture (§75)"},{"edge":"non","label":"Passif courant","note":"Même si la banque renonce après la clôture (§74)"}]}}
```

**Résultat global** = résultat net + autres éléments du résultat global (OCI), ces derniers regroupant les produits et charges qu'une norme exclut du résultat net (§7). Les OCI sont présentés en deux groupes (§82A) :
- **non recyclables** en résultat : écarts de réévaluation IAS 16 / IAS 38, réévaluations du passif net IAS 19, variations de juste valeur des instruments de capitaux propres désignés à la juste valeur par OCI (IFRS 9) ;
- **recyclables** en résultat : écarts de conversion d'une activité à l'étranger (IAS 21), part efficace des couvertures de flux de trésorerie (IFRS 9), instruments de dette à la juste valeur par OCI.

**Charges** : analyse par nature ou par fonction, au choix de l'entité selon la pertinence (§99) ; en cas de présentation par fonction, informations complémentaires sur la nature (dotations aux amortissements, charges de personnel, §104). Aucun poste ne peut être présenté en « élément extraordinaire » (§87). IFRS 18, publiée par l'IASB en 2024 et adoptée par l'UE en février 2026 (règl. 2026/338), remplacera IAS 1 pour les exercices ouverts à compter du 1er janvier 2027 : catégories imposées au compte de résultat et sous-totaux obligatoires (résultat opérationnel).

## Exemple
La SA Belem clôture le 31/12/N. Résultat net : 800 k€ ; écart de réévaluation d'un immeuble (IAS 16) : +120 k€ ; écart de conversion d'une filiale brésilienne : −30 k€ ; dividendes versés en N : 200 k€ ; augmentation de capital : 500 k€.
Résultat global = 800 + 120 − 30 = 890 k€, dont OCI non recyclables +120 k€ et OCI recyclables −30 k€. Les dividendes et l'augmentation de capital n'apparaissent que dans l'état des variations des capitaux propres (variation totale : +890 − 200 + 500 = +1 190 k€).
Belem a par ailleurs un emprunt de 2 M€ remboursable en N+5 dont un covenant est rompu au 31/12/N ; la banque renonce à l'exigibilité le 15/02/N+1 : l'emprunt est intégralement classé en passif courant au 31/12/N (§74), la renonciation étant un événement postérieur sans ajustement (IAS 10).

## Erreurs fréquentes
- Classer en non courant un emprunt dont le covenant est rompu à la clôture parce que la banque a renoncé avant l'arrêté des comptes : seul le droit existant à la clôture compte.
- Traiter l'écart de réévaluation IAS 16 ou les écarts actuariels IAS 19 comme des OCI recyclables : ils ne passent jamais en résultat (transfert direct en réserves possible).
- Compter les dividendes versés ou une augmentation de capital dans le résultat global : ce sont des transactions avec les propriétaires, hors résultat global.
- Compenser une créance et une dette envers un même tiers sans droit de compensation : la non-compensation est la règle (§32).

## À retenir
- Six composantes dans un jeu complet, y compris l'état d'ouverture de la période comparative en cas de retraitement rétrospectif.
- Classement d'une dette : seuls les droits existant à la clôture comptent ; une renonciation obtenue après la clôture ne change rien.
- OCI recyclables (conversion, couverture de flux) contre non recyclables (réévaluation, actuariel, titres de capitaux propres par OCI).

**Notions liées :** [Cadre conceptuel IFRS](/cours/ifrs-cadre-conceptuel) · [IAS 7 — Tableau des flux de trésorerie](/cours/ias-7-tableau-flux-tresorerie) · [IAS 8 — Méthodes, estimations et erreurs](/cours/ias-8-methodes-estimations-erreurs) · [Événements postérieurs et continuité](/cours/evenements-posterieurs-continuite)
