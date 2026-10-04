# Spécificités du diagnostic en IFRS : minoritaires, IFRS 16, goodwill

**Références :** IFRS 10 §22 ; IFRS 16 §22-26, §36-38 et §49-50 ; IFRS 3 §19 et §32 ; IAS 36 §10, §90 et §124 (règl. UE 2023/1803)

**Enjeu :** les comptes consolidés IFRS modifient la lecture des ratios classiques ; l'analyste doit savoir quel résultat rapporter à quels capitaux propres, mesurer l'effet d'IFRS 16 sur l'EBITDA et la dette, et traiter le goodwill dans l'appréciation de la solvabilité.

**Participations ne donnant pas le contrôle (minoritaires)** : présentées dans les capitaux propres, séparément des capitaux propres attribuables aux propriétaires de la mère (IFRS 10 §22), jamais en dettes. Le résultat net est réparti entre part du groupe et minoritaires. Rf part du groupe = résultat part du groupe / capitaux propres part du groupe ; le gearing se calcule sur les capitaux propres totaux, car l'endettement net couvre tout le groupe, minoritaires compris.

**IFRS 16 côté preneur** : droit d'utilisation à l'actif et dette locative au passif (valeur actuelle des loyers, §26) ; le loyer est remplacé par un amortissement du droit d'utilisation et une charge d'intérêts dégressive (§36-38). Effets sur les indicateurs, par rapport à une charge de loyer :
- EBITDA en hausse du montant des loyers (ils disparaissent des charges opérationnelles), résultat opérationnel en légère hausse (l'amortissement est inférieur au loyer) ;
- résultat avant impôt plus faible en début de contrat (intérêts élevés), plus fort en fin ;
- endettement net en hausse si les dettes locatives y sont incluses ; gearing en hausse ;
- flux opérationnels en hausse, flux de financement en baisse (remboursement du principal, §50 ; intérêts selon le choix IAS 7).
Les covenants sont souvent calculés « hors IFRS 16 » : retirer la dette locative et les loyers de l'EBITDA.

**Goodwill** : non amorti, testé chaque année (IAS 36 §10, §90) ; une dépréciation n'est jamais reprise (§124). Option du goodwill complet (IFRS 3 §19) : il inclut alors la part des minoritaires, ce qui gonfle l'actif et les capitaux propres totaux. L'analyste calcule souvent des capitaux propres tangibles (capitaux propres − goodwill − autres incorporels) pour apprécier la solvabilité : un groupe très acquisitif peut avoir des capitaux propres tangibles négatifs.

**Comparabilité avec les normes françaises** : sous règl. ANC 2020-01, l'écart d'acquisition peut être amorti s'il a une durée d'utilisation limitée ; neutraliser cet amortissement pour comparer.

## Exemple
Un groupe loue un entrepôt 5 ans, loyer 100 k€ payable en fin d'année, taux implicite 5 %. Dette locative initiale = 100 × (1 − 1,05⁻⁵) / 0,05 = 433 k€ (= droit d'utilisation).
Année 1 : intérêts = 433 × 5 % = 21,6 ; amortissement = 433 / 5 = 86,6 ; charge totale 108,2 contre un loyer de 100. Par rapport à une location en charges : EBITDA +100, résultat opérationnel +13,4, résultat avant impôt −8,2.
Remboursement du principal = 100 − 21,6 = 78,4 : la dette locative passe à 354,6 à fin N et vient grossir l'endettement net ; les flux opérationnels gagnent 100 si les intérêts sont classés en financement.

```diagram
{"type":"bars","title":"Effet d'IFRS 16 en année 1 par rapport à un loyer en charges (k€)","unit":"k€","items":[{"label":"EBITDA","value":100},{"label":"Résultat opérationnel","value":13.4},{"label":"Résultat avant impôt","value":-8.2},{"label":"Endettement net à fin N","value":354.6}]}
```

## Erreurs fréquentes
- Rapporter le résultat part du groupe aux capitaux propres totaux (ou le résultat de l'ensemble aux capitaux propres part du groupe) : la Rf serait sous- ou surestimée.
- Croire qu'IFRS 16 réduit les flux opérationnels ou le gearing : c'est l'inverse, le loyer sort de l'activité et la dette locative s'ajoute au passif.
- Reprendre une dépréciation de goodwill quand la valeur recouvrable de l'UGT remonte : interdit par IAS 36 §124 (possible pour les autres actifs, §114).
- Présenter les minoritaires en passif non courant ou en déduction du goodwill.

## À retenir
- Ne jamais rapporter un résultat part du groupe aux capitaux propres totaux.
- IFRS 16 améliore mécaniquement EBITDA et flux opérationnels, mais alourdit l'endettement net.
- Dépréciation du goodwill : charge non monétaire, définitive.

**Notions liées :** [IFRS 16 — Contrats de location](/cours/ifrs-16-contrats-location) · [IAS 36 — Dépréciation d'actifs](/cours/ias-36-depreciation-actifs) · [Partage des capitaux propres et minoritaires](/cours/partage-capitaux-propres-minoritaires) · [Écarts d'acquisition](/cours/ecarts-acquisition)
