# Stocks et en-cours : évaluation et dépréciation

**Références :** PCG art. 211-7 (définition), 213-30 s. (coût d'entrée des stocks, méthodes CMP et PEPS) et 214-22 s. (dépréciation) (règl. ANC 2014-03 modifié) ; comptes 31 à 39, 603, 6817, 713, 7817

**Enjeu :** le stock de clôture fixe à la fois le résultat de l'exercice (variation de stocks) et le bilan ; l'examen teste surtout le coût de production avec sous-activité, le choix CMP / PEPS et la dépréciation.

Un **stock** est un actif détenu pour être vendu dans le cours normal de l'activité, en cours de production pour une telle vente, ou destiné à être consommé dans le processus de production (matières, fournitures).

**Coût d'acquisition** des stocks achetés = prix d'achat (remises, rabais et escomptes déduits) + droits de douane et taxes non récupérables + frais de transport, de manutention et autres coûts directement attribuables à l'acquisition.

**Coût de production** = coût d'acquisition des matières consommées + charges directes de production + charges indirectes de production rationnellement imputables :
- frais fixes imputés sur la base de la **capacité normale** de production : le coût de la **sous-activité** est exclu du coût et reste en charges de l'exercice ; en cas de suractivité, on impute sur la production réelle pour ne pas dépasser le coût réel ;
- exclus : frais de stockage (sauf s'ils sont nécessaires au processus de production avant une nouvelle étape), frais administratifs ne contribuant pas à la production, frais de commercialisation, coûts de recherche ;
- coûts d'emprunt : incorporation optionnelle pour les stocks dont la production exige une longue période de préparation.

**Biens fongibles** : coût moyen pondéré (CMP, calculé après chaque entrée ou sur la période de stockage) ou premier entré, premier sorti (PEPS). Le dernier entré, premier sorti (DEPS) n'est pas admis dans les comptes individuels. Les biens identifiables (pièces uniques, numéros de série) sont suivis au coût individuel.

**Dépréciation** : à la clôture, si la **valeur actuelle** (en pratique, prix de vente probable diminué des frais restant à engager pour achever et vendre) est inférieure au coût, une dépréciation est constatée unité par unité ou catégorie par catégorie (6817 / 39x), sans compensation entre éléments (sauf position globale documentée sur une matière première ou une marchandise, art. 214-22), et ajustée chaque année (reprise 7817). Les stocks, et les approvisionnements individualisés, affectés à un contrat de vente ferme dont le prix couvre le coût et tous les frais restant à engager restent à leur valeur d'entrée (art. 214-23).

**Variation de stocks** (inventaire intermittent) : annulation du stock initial puis constatation du stock final ; marchandises et matières en 6037 / 6031 (contrepartie 37 / 31) ; produits et en-cours en 7133 / 7135 (contrepartie 33, 35).

```diagram
{"type":"bars","title":"Coût de production unitaire chez Arvel (49,50 €) et sous-activité exclue","unit":"€/unité","items":[{"label":"Matières","value":18.75},{"label":"Main-d'œuvre directe","value":12.5},{"label":"Indirects variables","value":6.25},{"label":"Fixes imputés (80 %)","value":12},{"label":"Sous-activité (charges)","value":3}]}
```

## Exemple
La société Arvel a fabriqué 16 000 unités en N pour une capacité normale de 20 000. Charges : matières consommées 300 000 €, main-d'œuvre directe 200 000 €, charges indirectes variables 100 000 €, charges fixes de production 240 000 €. Stock final : 2 000 unités ; prix de vente probable 52 €, frais de vente 4 € par unité.
Frais fixes imputés = 240 000 × 16 000 / 20 000 = 192 000 € ; sous-activité = 48 000 €, laissée en charges. Coût de production = 300 000 + 200 000 + 100 000 + 192 000 = 792 000 €, soit **49,50 €** par unité (18,75 + 12,50 + 6,25 + 12 ; la sous-activité représenterait 3 € de plus).
Stock final = 2 000 × 49,50 = **99 000 €** (355 / 7135). Valeur actuelle = 52 − 4 = 48 € < 49,50 € : dépréciation = 1,50 × 2 000 = **3 000 €** (6817 / 3955).

## Erreurs fréquentes
- Imputer les frais fixes sur la production réelle (240 000 / 16 000 = 15 € au lieu de 12 €) : la base est la capacité normale, la sous-activité restant en charges.
- Admettre le DEPS « au choix » : seuls le CMP et le PEPS sont autorisés dans les comptes individuels.
- Incorporer les frais de stockage des produits finis ou les frais de commercialisation : ils ne font pas partie du coût de production.
- Comparer le coût au prix de vente brut : la valeur actuelle est nette des frais de vente restant à engager, et la dépréciation se calcule unité par unité ou par catégorie.

## À retenir
- Sous-activité : coût unitaire fixe = frais fixes / production à capacité normale, et non / production réelle.
- CMP après chaque entrée et CMP périodique donnent des valeurs différentes : lire l'énoncé.
- La dépréciation des stocks (6817 / 39) ne remplace pas la variation de stock (603 / 713) : deux écritures distinctes.

**Notions liées :** [IAS 2 — Stocks](/cours/ias-2-stocks) · [Immobilisations corporelles et incorporelles](/cours/immobilisations-pcg) · [Audit du cycle stocks : assertions](/cours/stocks-assertions) · [Contrats à long terme](/cours/contrats-long-terme-pcg)
