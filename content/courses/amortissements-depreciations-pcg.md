# Amortissements et dépréciations des actifs

**Références :** PCG art. 214-1 s. (amortissement), 214-15 s. (dépréciation) et dispositions du titre III sur les provisions réglementées (règl. ANC 2014-03 modifié) ; CGI art. 39 A et 39 B (amortissement dégressif, amortissement minimal) ; comptes 28, 29, 145, 6811, 6816, 6872, 7872

**Enjeu :** le plan d'amortissement et le test de dépréciation fixent la valeur nette comptable de chaque actif et pèsent directement sur le résultat ; le sujet d'examen combine presque toujours amortissement comptable, amortissement fiscal (dérogatoire) et dépréciation.

L'**amortissement** répartit le montant amortissable d'un actif sur sa **durée d'utilisation** propre à l'entité, selon le rythme de consommation des avantages économiques attendus (mode linéaire par défaut s'il reflète ce rythme ; mode dégressif ou unités d'œuvre possibles). Les petites entreprises peuvent retenir la durée d'usage fiscale.
- Montant amortissable = valeur brute − valeur résiduelle, si celle-ci est significative et mesurable (prix de revente attendu en fin d'utilisation, net des coûts de sortie).
- Début : date de début de consommation des avantages, en pratique la **mise en service** ; calcul prorata temporis en jours ou en mois selon l'énoncé.
- Le plan est revu de façon **prospective** en cas de modification significative (durée, mode, valeur résiduelle, dépréciation) : aucun retraitement des dotations passées.

**Amortissement dérogatoire** : la part de l'amortissement fiscal (dégressif, durée d'usage plus courte, base sans valeur résiduelle) qui excède l'amortissement comptable est une provision réglementée (dotation 6872 / compte 145) ; quand l'amortissement comptable devient supérieur, l'excédent est repris (145 / 7872). La VNC au bilan n'est pas affectée : le compte 145 figure dans les capitaux propres.

**Dépréciation** : à chaque clôture, s'il existe un **indice de perte de valeur** (externe : baisse du marché, obsolescence ; interne : dégradation, performances inférieures), on compare la VNC à la **valeur actuelle** = la plus élevée de la valeur vénale (nette des coûts de sortie) et de la valeur d'usage (avantages futurs attendus). Si valeur actuelle < VNC, on constate une dépréciation (6816 / 29x) ; la base amortissable devient la nouvelle VNC, répartie sur la durée résiduelle. La dépréciation est reprise si la valeur actuelle remonte, sauf celle du fonds commercial, jamais reprise.

```diagram
{"type":"tree","title":"Test de dépréciation d'une immobilisation à la clôture","root":{"label":"Existe-t-il un indice de perte de valeur ?","children":[{"edge":"non","label":"Pas de test, plan inchangé"},{"edge":"oui","label":"Valeur actuelle = max (vénale nette, usage)","children":[{"edge":"≥ VNC","label":"Aucune dépréciation"},{"edge":"< VNC","label":"Dépréciation = VNC − valeur actuelle","note":"6816 / 29x ; nouvelle base amortie sur la durée résiduelle"}]}]}}
```

**Formules clés :** linéaire = (valeur brute − valeur résiduelle) / durée × prorata ; dégressif fiscal = VNC fiscale × taux linéaire × coefficient (1,25 pour 3-4 ans, 1,75 pour 5-6 ans, 2,25 au-delà), prorata en mois dès le premier jour du mois d'acquisition ; dérogatoire = fiscal − comptable

## Exemple
Machine acquise 120 000 € HT le 10/04/N, mise en service le 01/06/N, durée d'utilisation et durée d'usage 5 ans, valeur résiduelle nulle, dégressif fiscal (taux 20 % × 1,75 = 35 %).
Amortissement comptable N = 120 000 / 5 × 7/12 = **14 000 €** (6811 / 28154) ; amortissement fiscal N = 120 000 × 35 % × 9/12 = **31 500 €** (à partir du 1er avril) ; dérogatoire N = 31 500 − 14 000 = **17 500 €** (6872 / 145).
N+1 : comptable 24 000 € ; fiscal = (120 000 − 31 500) × 35 % = 30 975 € ; dérogatoire 6 975 €.
Au 31/12/N+1, un indice de perte de valeur apparaît : valeur vénale nette 60 000 €, valeur d'usage 70 000 €. VNC = 120 000 − 14 000 − 24 000 = 82 000 € ; valeur actuelle = 70 000 € ; dépréciation = **12 000 €** (6816 / 29154). Dotations futures = 70 000 × 12/41 ≈ 20 488 € par an (41 mois restants, du 01/01/N+2 au 31/05/N+3).

## Erreurs fréquentes
- Faire courir l'amortissement comptable à la date de commande ou de livraison : il commence à la mise en service (consommation des avantages) ; seul le dégressif fiscal part du premier jour du mois d'acquisition.
- Déprécier jusqu'à la valeur vénale seule, ou jusqu'à la moyenne des deux valeurs : la valeur actuelle est la plus élevée de la valeur vénale nette et de la valeur d'usage.
- Croire que l'amortissement dérogatoire réduit la VNC : il s'enregistre en provision réglementée (145), pas au compte 28.
- Oublier qu'après une dépréciation le plan est recalculé sur la nouvelle base et la durée restante, sans toucher aux dotations passées.

## À retenir
- Linéaire comptable : prorata à partir de la mise en service ; dégressif fiscal : à partir du premier jour du mois d'acquisition.
- La valeur résiduelle n'est pas déduite de la base fiscale : source fréquente d'amortissements dérogatoires.
- Dépréciation = VNC − max (valeur vénale nette, valeur d'usage), seulement s'il existe un indice ; reprise possible sauf pour le fonds commercial.

**Notions liées :** [Immobilisations corporelles et incorporelles](/cours/immobilisations-pcg) · [IAS 36 — Dépréciation d'actifs](/cours/ias-36-depreciation-actifs) · [IAS 16 — Immobilisations corporelles](/cours/ias-16-immobilisations) · [IS : détermination du résultat fiscal](/cours/is-resultat-fiscal)
