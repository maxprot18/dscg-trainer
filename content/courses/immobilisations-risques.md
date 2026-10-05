# Immobilisations — risques

**Références :** NEP 315 (connaissance de l'entité et évaluation du risque) ; NEP 240 (fraude) ; NEP 520 (procédures analytiques) ; PCG, règles d'amortissement (règl. ANC 2014-03) ; PCG art. 214-15 s. (dépréciation)

**Enjeu :** le cycle immobilisations offre à la direction un levier commode sur le résultat (activer ou non une dépense, allonger une durée, différer une dépréciation) ; l'auditeur doit lire les incitations avant de choisir le sens de ses tests. L'examen demande de déduire le risque dominant d'un contexte donné.

Les risques d'anomalies significatives dépendent souvent des incitations de la direction :
- **Activation de charges** (entretien, formation interne ou frais externes de formation contraires à l'option retenue, coûts administratifs) pour améliorer le résultat : risque fort en cas de covenants bancaires, de bonus fondés sur le résultat ou de recherche de financement. Assertions touchées : réalité, classification.
- **Passage en charges de dépenses immobilisables** pour minorer le résultat fiscal (PME bénéficiaire) : assertion exhaustivité des immobilisations ; l'auditeur revoit alors les comptes 615, 6063 et de sous-traitance.
- **Production immobilisée** (compte 72) surévaluée : incorporation de coûts indirects non attribuables ou de frais administratifs ; une hausse brutale du compte 72 est un signal.
- **Frais de développement** activés sans que les six conditions (faisabilité, intention, capacité, avantages futurs, ressources, mesure fiable des coûts) soient remplies.
- **Durées d'amortissement** inadaptées ou allongées sans justification technique ; un changement de durée est un changement d'estimation, appliqué de manière prospective sur la VNC restante.
- **Sorties non comptabilisées** (rebuts, vols, cessions) : existence ; les dotations continuent sur des biens disparus.
- **Dépréciation omise** : à chaque clôture, l'entité apprécie s'il existe un indice de perte de valeur (baisse d'activité, obsolescence, dégradation, changement défavorable de l'environnement) ; si oui, elle compare la valeur actuelle à la valeur nette comptable.

**Procédures analytiques de planification (NEP 520) :** comparer le taux moyen d'amortissement à N−1 et le rapport dotations / brut amortissable moyen à la durée moyenne attendue ; un écart inexpliqué oriente les tests de détail (recalcul des dotations, revue des durées).

**Formules clés :** dotation attendue ≈ brut amortissable moyen × taux moyen (1 / durée moyenne) ; brut moyen = (brut d'ouverture + brut de clôture) / 2

## Exemple
Chez Mira, le brut amortissable des installations techniques passe de 3 600 000 € au 01/01/N à 4 000 000 € au 31/12/N, acquisitions réparties sur l'année ; durée moyenne 10 ans en linéaire. Dotation comptabilisée en N : 310 000 €. Seuil de signification : 90 000 €.
Brut moyen = 3 800 000 € ; dotation attendue = 3 800 000 / 10 = **380 000 €** ; écart non expliqué = **70 000 €**, inférieur au seuil mais proche : l'auditeur enquête. La direction a porté la durée des lignes de production de 10 à 12 ans en N (3 800 000 / 12 ≈ 316 700 €, ordre de grandeur cohérent avec les 310 000 € comptabilisés), en période de résultat dégradé : il faut une justification technique du changement et une information en annexe, sinon l'anomalie est de 70 000 € sur la dotation.

```diagram
{"type":"bars","title":"Mira : dotation N attendue et comptabilisée","unit":"k€","items":[{"label":"Attendue (10 ans)","value":380},{"label":"Comptabilisée","value":310},{"label":"Écart à expliquer","value":70}]}
```

## Erreurs fréquentes
- Voir le risque d'activation de charges chez la PME qui veut réduire son impôt : son incitation est inverse (passer des immobilisations en charges) ; l'activation menace la société sous covenant ou en quête de financement.
- Prendre une VNC faible, un mode dégressif ou un financement par emprunt pour un indice de perte de valeur : seuls des faits défavorables (perte d'un client, obsolescence, dégradation) déclenchent le test.
- Construire l'attente de dotations sur le brut de clôture au lieu du brut moyen quand les acquisitions sont étalées : l'attente est surestimée et l'écart artificiel.
- Appliquer un changement de durée de façon rétrospective : c'est un changement d'estimation, prospectif.

## À retenir
- Le sens du risque (activation ou passage en charges) dépend des incitations de la direction.
- Une forte hausse de la production immobilisée ou un allongement des durées en période difficile est un signal d'alerte.
- Indice de perte de valeur ≠ dépréciation : l'indice déclenche le test, le test décide.

**Notions liées :** [Immobilisations — contrôles clés](/cours/immobilisations-controles-cles) · [Amortissements et dépréciations en PCG](/cours/amortissements-depreciations-pcg) · [Approche par les risques](/cours/approche-par-risques) · [Fraudes, lois et règlements](/cours/fraudes-lois-reglements)
