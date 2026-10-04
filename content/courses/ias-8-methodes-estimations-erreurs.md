# IAS 8 — Méthodes comptables, changements d'estimations et erreurs

**Références :** IAS 8 §5, §10-12, §14-27, §28-31, §32-40, §41-49 (règl. UE 2023/1803, amendement « Définition des estimations comptables » règl. UE 2022/357) ; IAS 16 §51 et §61

**Enjeu :** qualifier un changement (méthode, estimation ou erreur) pour en déduire le traitement, rétrospectif ou prospectif, et chiffrer le retraitement des comparatifs et des capitaux propres d'ouverture ; QCM de qualification et petits calculs de retraitement, souvent avec effet d'impôt.

**Méthodes comptables (§5)** : principes, bases, conventions, règles et pratiques spécifiques appliqués pour établir les états financiers. En l'absence de norme applicable, la direction exerce son jugement en se référant d'abord aux normes traitant de questions similaires, puis au Cadre conceptuel, et enfin éventuellement aux positions d'autres normalisateurs fondés sur un cadre semblable (§10-12).

**Changement de méthode (§14-27)** : autorisé seulement s'il est imposé par une norme ou s'il fournit une information fiable et plus pertinente (§14). Application **rétrospective** : comme si la nouvelle méthode avait toujours été appliquée, avec retraitement des comparatifs et ajustement des capitaux propres d'ouverture de la période la plus ancienne présentée (§22), sauf dispositions transitoires d'une nouvelle norme ou impraticabilité, auquel cas l'application se fait à partir de la première période praticable (§23-25). Exemples : passage du FIFO au coût moyen pondéré, passage du modèle du coût au modèle de la réévaluation (celui-ci relève toutefois d'IAS 16 et IAS 38, §17). L'adoption d'une méthode pour des transactions nouvelles ou auparavant non significatives n'est pas un changement de méthode (§16).

**Changement d'estimation (§32-40)** : une estimation comptable est un montant monétaire soumis à une incertitude d'évaluation (§5 : dépréciations, durée d'utilité, valeur résiduelle, provisions, juste valeur). Sa révision résulte d'informations nouvelles ou de l'expérience : effet **prospectif**, en résultat de la période du changement et, le cas échéant, des périodes futures (§36-38), sans retraitement des comparatifs. Le changement du mode d'amortissement d'une immobilisation est un changement d'estimation (IAS 16 §61). En cas de doute entre méthode et estimation, on traite comme un changement d'estimation (§35). Un changement de technique ou de données d'entrée pour mesurer une estimation est un changement d'estimation, non une correction d'erreur, sauf s'il corrige une erreur de période antérieure (§34A).

**Erreurs (§41-49)** : omissions ou inexactitudes résultant de la non-utilisation ou de l'utilisation abusive d'informations fiables disponibles à l'époque et qu'on pouvait raisonnablement obtenir (erreurs de calcul, mauvaise application des méthodes, négligence, fraudes). Une erreur significative d'une période antérieure est corrigée **rétrospectivement** dans les premiers états financiers publiés après sa découverte : retraitement des comparatifs ou, si l'erreur est antérieure à la période la plus ancienne présentée, ajustement des soldes d'ouverture de celle-ci (§42). Aucun passage par le résultat de l'exercice de découverte ; l'impraticabilité se traite comme pour les méthodes (§43-45).

```diagram
{"type":"tree","title":"Qualifier un changement et en déduire le traitement","root":{"label":"Information fiable disponible à l'époque et ignorée ?","children":[{"edge":"oui","label":"Erreur de période antérieure","note":"Rétrospectif : retraitement des comparatifs ou des capitaux propres d'ouverture (§42)"},{"edge":"non","label":"Changement volontaire ou imposé","children":[{"edge":"principe ou base","label":"Changement de méthode","note":"Rétrospectif, sauf dispositions transitoires ou impraticabilité (§19-25)"},{"edge":"montant incertain","label":"Changement d'estimation","note":"Prospectif : période en cours et périodes futures (§36-38)"},{"edge":"doute","label":"Traité en estimation","note":"§35"}]}]}}
```

**Informations (§28-31, §39-40, §49)** : nature du changement ou de l'erreur, motifs, montant de l'ajustement pour chaque poste affecté et pour le résultat par action, et, pour une estimation, effet sur les périodes futures s'il est estimable. Une norme publiée mais non encore entrée en vigueur est mentionnée avec son incidence attendue (§30).

**Formules clés :** ajustement des capitaux propres d'ouverture = effet cumulé avant impôt × (1 − taux d'IS) ; nouvelle dotation après changement d'estimation = VNC restante / durée d'utilité restante

## Exemple
En N, Orion découvre que son stock de clôture au 31/12/N−1 a été surévalué de 50 000 € par une erreur d'inventaire (taux d'IS 25 %). Correction rétrospective : dans les comparatifs N−1, stock −50 000 €, charge de variation de stock +50 000 €, impôt exigible ou différé −12 500 €, résultat N−1 −37 500 € ; les capitaux propres d'ouverture de N sont réduits de 37 500 €. Le stock d'ouverture retraité de N allège la charge de N de 50 000 € par rapport aux chiffres erronés, de sorte que le résultat N n'est pas pénalisé par l'erreur de N−1.
Dans la même année, Orion ramène de 10 à 6 ans la durée d'utilité restante d'une ligne de production (VNC 240 000 €) : changement d'estimation, dotation N = 240 000 / 6 = 40 000 € au lieu de 24 000 €, sans retraitement de N−1.

## Erreurs fréquentes
- Traiter la réduction d'une durée d'utilité ou le passage du linéaire au dégressif comme un changement de méthode avec retraitement des comparatifs : ce sont des estimations, à effet prospectif.
- Corriger une erreur de N−1 par le résultat de N (charge ou produit exceptionnel) : la correction passe par le retraitement des comparatifs et des capitaux propres d'ouverture.
- Imputer l'effet cumulé d'un changement de méthode sur le résultat de l'exercice du changement : l'effet cumulé va dans les capitaux propres d'ouverture de la période la plus ancienne présentée.
- Croire qu'un changement de formule de coût des stocks (FIFO vers coût moyen pondéré) est interdit : il est admis s'il donne une information plus pertinente, et il est rétrospectif.

## À retenir
- Méthode : rétrospectif ; estimation : prospectif ; erreur : rétrospectif par retraitement, jamais par le résultat de l'exercice de découverte.
- Durée d'utilité, valeur résiduelle et mode d'amortissement relèvent tous des estimations.
- Une erreur sur le stock de clôture N−1 affecte deux exercices (résultat N−1 et résultat N via le stock d'ouverture) ; l'effet d'impôt suit.

**Notions liées :** [Annexe et changements comptables (PCG)](/cours/annexe-changements-comptables) · [IAS 16 — Immobilisations corporelles](/cours/ias-16-immobilisations) · [IAS 1 — Présentation des états financiers](/cours/ias-1-presentation-etats-financiers) · [IAS 2 — Stocks](/cours/ias-2-stocks)
