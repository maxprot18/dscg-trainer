# Divergences entre règlement ANC 2020-01 et IFRS ; passage d'un référentiel à l'autre

**Références :** règl. ANC 2020-01 art. 231-2, 231-11, 231-12, 232-1, 272-2 et 272-21 ; IFRS 3 §19, §32, §53 et §B63 ; IAS 36 §90 ; IFRS 16 §22-26 ; IFRS 1 §6-11, §24 et annexe A (règl. UE 2023/1803)

**Enjeu :** un même groupe présente des capitaux propres et un résultat différents selon le référentiel ; à l'examen, on chiffre un retraitement ANC → IFRS (écart d'acquisition, frais d'acquisition, locations) ou l'on date le bilan d'ouverture d'une première application.

**Principales divergences (comptes consolidés)**
- **Écart d'acquisition** : ANC 2020-01 → amorti sur sa durée d'utilisation si elle est limitée, sinon non amorti avec test de dépréciation au moins annuel ; IFRS → jamais amorti, test de dépréciation annuel au niveau de l'unité génératrice de trésorerie (IAS 36 §90) et dépréciation jamais reprise ; écart négatif étalé en résultat en ANC (immédiatement si l'acquisition est avantageuse), profit immédiat en IFRS (IFRS 3 §34).
- **Intérêts minoritaires** : ANC 2020-01 → évalués à leur quote-part de l'actif net identifiable (écart d'acquisition partiel) ; IFRS → option, regroupement par regroupement, pour leur juste valeur (goodwill complet, IFRS 3 §19), qui augmente d'autant écart d'acquisition et minoritaires.
- **Frais d'acquisition des titres** : ANC 2020-01 → coûts directement attribuables inclus dans le coût d'acquisition (nets de l'économie d'impôt), donc dans l'écart d'acquisition ; IFRS → charges de la période (IFRS 3 §53).
- **Contrats de location** : ANC 2020-01 → seuls les contrats de location-financement sont retraités (bien à l'actif, emprunt au passif), les locations simples restent en charges ; IFRS 16 → droit d'utilisation et dette locative pour tous les contrats du preneur (exemptions : courte durée, faible valeur), le loyer étant remplacé par un amortissement et une charge d'intérêts.
- **Écarts de conversion** : IFRS → autres éléments du résultat global, reclassés en résultat à la cession ; ANC 2020-01 → portés directement en capitaux propres, sans état du résultat global.

**Retraitement ANC → IFRS d'un exercice** : annuler l'amortissement de l'écart d'acquisition (antérieur en réserves, exercice en résultat) puis constater l'éventuelle dépréciation IFRS ; passer les frais d'acquisition en charges ; constater droit d'utilisation, dette locative et impôt différé sur la différence ; partager chaque retraitement entre groupe et minoritaires selon le pourcentage d'intérêt.

**Première application (IFRS 1)**
- Date de transition : début de la première période pour laquelle une information comparative complète est présentée (annexe A) ; pour de premiers comptes IFRS au 31/12/N avec un comparatif, c'est le 01/01/N-1.
- Bilan d'ouverture IFRS à cette date, établi avec les normes en vigueur à la date de clôture des premiers états IFRS (§7-8), appliquées rétrospectivement sauf exemptions.
- Ajustements imputés en résultats non distribués (§11) ; exemptions facultatives (regroupements antérieurs non retraités, écarts de conversion cumulés remis à zéro, juste valeur comme coût présumé…).
- Rapprochements des capitaux propres et du résultat global entre ancien référentiel et IFRS (§24).

## Exemple
Ambre acquiert le 01/01/N 70 % de Cobalt pour 910 000 € ; actif net identifiable de Cobalt à la juste valeur 1 000 000 € ; frais d'acquisition 30 000 € (IS 25 %) ; juste valeur des 30 % minoritaires 380 000 €.
ANC 2020-01 : coût des titres = 910 000 + 30 000 × 0,75 = 932 500 ; écart d'acquisition = 932 500 − 70 % × 1 000 000 = 232 500 ; minoritaires 300 000.
IFRS, goodwill partiel : 910 000 − 700 000 = 210 000, frais de 30 000 en charges ; goodwill complet : 910 000 + 380 000 − 1 000 000 = 290 000, minoritaires 380 000 (les deux montent de 80 000).

```diagram
{"type":"bars","title":"Écart d'acquisition de l'exemple selon le référentiel","unit":"k€","items":[{"label":"ANC 2020-01","value":232.5},{"label":"IFRS goodwill partiel","value":210},{"label":"IFRS goodwill complet","value":290}]}
```

## Erreurs fréquentes
- Croire que l'écart d'acquisition est amorti sur 10 ans dans les deux référentiels, ou qu'il est amorti en IFRS : seules les normes françaises l'amortissent, et seulement si sa durée d'utilisation est limitée.
- Dater le bilan d'ouverture IFRS au début de l'exercice de première publication (01/01/N) ou appliquer les normes en vigueur à la date de transition : c'est le 01/01/N-1 avec les normes en vigueur au 31/12/N.
- En annulant l'amortissement du goodwill, constater un impôt différé : le goodwill n'étant pas déductible, aucune différence temporelle fiscale ne naît.
- Retraiter une location simple en IFRS en portant la totalité des loyers futurs en dette : la dette locative est la valeur actualisée des paiements restants.

## À retenir
- Pas d'impôt différé sur l'annulation de l'amortissement d'un goodwill non déductible.
- En goodwill complet, l'écart d'acquisition et les minoritaires augmentent du même montant.
- Première application : en recourant à l'exemption sur les regroupements antérieurs, on conserve l'écart d'acquisition net de l'ancien référentiel à la date de transition.

**Notions liées :** [Écarts d'acquisition](/cours/ecarts-acquisition) · [IFRS 3 — Regroupements d'entreprises](/cours/ifrs-3-regroupements-entreprises) · [IFRS 16 — Contrats de location](/cours/ifrs-16-contrats-location) · [Obligation de consolider et référentiel](/cours/obligation-consolider-referentiel)
