# IFRS 9 — Instruments financiers

**Références :** IFRS 9 §4.1.1-4.1.5, §4.2.1-4.2.2, §5.1.1, §5.4.1, §5.5.1-5.5.15, §5.7.5, §5.7.7, B4.1.1-B4.1.26, B5.5.37, B5.7.1 ; IAS 32 §11 (règl. UE 2023/1803)

**Enjeu :** le classement d'un actif financier détermine où vont ses variations de valeur (résultat, OCI recyclable ou non, coût amorti) ; l'examen teste surtout le raisonnement de classement, le taux d'intérêt effectif et le modèle de dépréciation.

**Classement des actifs financiers (§4.1)**, selon deux critères cumulatifs : le **modèle économique** de gestion du portefeuille (collecte des flux, collecte et vente, autre) et les caractéristiques contractuelles des flux (test **SPPI** : flux uniquement remboursement du principal et intérêts sur le principal restant dû) :
- **coût amorti** : modèle « collecte » des flux + SPPI (prêts, créances, obligations à taux fixe ou variable détenues jusqu'à l'échéance) ;
- **juste valeur par OCI recyclable** (titres de dette) : modèle « collecte et vente » + SPPI ; les intérêts au TIE et la dépréciation vont en résultat, le reste de la variation de juste valeur en OCI, recyclé à la cession ;
- **juste valeur par résultat** : par défaut (actions, dérivés, OPCVM, obligations convertibles et autres actifs non SPPI, portefeuilles de transaction) ;
- option irrévocable, titre par titre, pour les **instruments de capitaux propres** non détenus à des fins de transaction : **JV par OCI non recyclable** ; seuls les dividendes passent en résultat, les gains et pertes cumulés ne sont jamais recyclés, même à la cession (§5.7.5, B5.7.1).

```diagram
{"type":"tree","title":"Classement d'un actif financier (IFRS 9 §4.1)","root":{"label":"Flux SPPI (principal + intérêts) ?","children":[{"edge":"non","label":"JV par résultat","note":"actions, dérivés, OPCVM ; option JV-OCI non recyclable pour les actions hors transaction"},{"edge":"oui","label":"Modèle économique ?","children":[{"edge":"collecte","label":"Coût amorti","note":"TIE, dépréciation ECL"},{"edge":"collecte et vente","label":"JV par OCI recyclable","note":"intérêts et ECL en résultat"},{"edge":"autre / transaction","label":"JV par résultat"}]}]}}
```

**Évaluation initiale (§5.1.1)** : juste valeur, plus les coûts de transaction sauf pour les actifs à la JV par résultat (coûts en charges). **Coût amorti** : méthode du **taux d'intérêt effectif** (TIE), taux qui actualise exactement les flux futurs à la valeur comptable brute initiale, prime ou décote et frais compris ; produit d'intérêt = valeur comptable brute × TIE (§5.4.1).

**Dépréciation (§5.5)** : modèle des **pertes de crédit attendues** (ECL) pour les actifs au coût amorti et à la JV par OCI recyclable, comptabilisées dès l'origine :
- étape 1 : pertes attendues à **12 mois** ; intérêts sur la valeur brute ;
- étape 2 (hausse significative du risque de crédit, présomption réfutable au-delà de 30 jours de retard, §5.5.11) : pertes attendues **sur la durée de vie** ; intérêts toujours sur la valeur brute ;
- étape 3 (actif déprécié ; le défaut est présumé survenu au plus tard à 90 jours de retard, B5.5.37) : durée de vie, intérêts calculés sur la valeur nette (§5.4.1) ;
- approche simplifiée obligatoire pour les créances commerciales sans composante de financement importante : durée de vie dès l'origine (§5.5.15).

**Passifs financiers (§4.2)** : au coût amorti en général ; dérivés et passifs de transaction à la JV par résultat ; option JV par résultat, la variation liée au risque de crédit propre allant en OCI (§5.7.7). Un instrument émis est un passif s'il comporte une obligation contractuelle de remettre de la trésorerie (IAS 32 §11) ; une action de préférence à dividende obligatoire est donc une dette.

**Formule clé :** intérêts de l'exercice = valeur comptable brute d'ouverture × TIE ; coût amorti de clôture = ouverture + intérêts TIE − flux encaissés.

## Exemple
Achat le 1/1/N d'une obligation de nominal 1 000, coupon 4 % annuel, remboursable 1 000 dans 3 ans, pour 950 plus 10 de frais ; modèle « collecte ». Valeur initiale : 960. TIE : 960 = 40 / (1 + r) + 40 / (1 + r)² + 1 040 / (1 + r)³, d'où **r ≈ 5,48 %**.
N : produit d'intérêt = 960 × 5,48 % = 52,6 (coupon 40 + étalement de la décote 12,6) ; coût amorti au 31/12/N = 960 + 52,6 − 40 = **972,6**. N+1 : 972,6 × 5,48 % ≈ 53,3, coût amorti ≈ 985,9 ; N+2 : ≈ 54,1, et le coût amorti rejoint 1 000 au remboursement (le TIE exact, 5,482 %, assure l'égalité).

## Erreurs fréquentes
- Classer des actions au coût amorti ou à la JV par OCI recyclable : une action ne passe jamais le test SPPI ; c'est JV par résultat, ou JV par OCI **non recyclable** sur option.
- Classer une obligation convertible détenue au coût amorti « parce que le modèle est la collecte » : la composante de conversion rend les flux non SPPI, donc JV par résultat pour l'instrument entier.
- Déprécier un titre coté « si le cours passe sous le coût » : ce raisonnement de coût historique n'existe pas en IFRS 9 ; la dépréciation ECL ne concerne que les actifs au coût amorti ou JV-OCI de dette.
- Calculer les intérêts au taux nominal sur le nominal : c'est le TIE appliqué à la valeur comptable brute.

## À retenir
- Une action ne passe jamais le test SPPI : JV par résultat, ou JV par OCI non recyclable sur option.
- Le modèle économique s'apprécie au niveau du portefeuille, non de l'intention titre par titre.
- La dépréciation est comptabilisée dès l'origine (pertes attendues), sans attendre un événement de perte.

**Notions liées :** [Instruments financiers en PCG](/cours/instruments-financiers-pcg) · [Produits dérivés](/cours/produits-derives) · [Risque de crédit et de contrepartie](/cours/risque-credit-contrepartie) · [Divergences normes françaises / IFRS](/cours/divergences-normes-francaises-ifrs)
