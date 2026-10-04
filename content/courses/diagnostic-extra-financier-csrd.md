# Diagnostic extra-financier à partir du rapport de durabilité

**Références :** directive (UE) 2022/2464 (CSRD) ; règlement délégué (UE) 2023/2772 (ESRS) : ESRS 2, ESRS E1 (E1-6 émissions de GES, E1-8 tarification interne du carbone, E1-9 effets financiers attendus)

**Enjeu :** l'état de durabilité fournit des données normées (émissions, intensité, prix interne du carbone) que l'analyste relie aux comptes et aux décisions d'investissement ; l'examen demande de calculer une intensité carbone, d'intégrer un prix du carbone dans une VAN et de commenter la cohérence avec les états financiers.

- L'état de durabilité (voir la fiche sur le cadre CSRD) donne à l'analyste financier des données normées et vérifiées. Démarche : repérer les impacts, risques et opportunités matériels, les relier aux postes financiers (chiffre d'affaires exposé, investissements de transition, provisions, dépréciations, durées d'utilité), puis calculer des ratios comparables.
- **Intensité carbone** : émissions de GES (tCO₂e) rapportées au chiffre d'affaires net (tCO₂e par M€). ESRS E1-6 demande les émissions brutes des scopes 1, 2 et 3 et une intensité par chiffre d'affaires net, pas par effectif ni par total de bilan. Les crédits carbone ne sont jamais déduits des émissions brutes.
- Analyser à la fois l'évolution absolue et l'intensité : une croissance du chiffre d'affaires fait baisser l'intensité même si les émissions augmentent. Comparer dans le secteur, à périmètre et méthode constants.
- **Prix interne du carbone** : prix fictif (*shadow price*) intégré aux calculs d'investissement sans décaissement ni charge comptable, ou redevance interne (*internal fee*) réellement facturée aux entités et affectée à un fonds de transition. ESRS E1-8 demande de décrire le dispositif, le prix par tonne et le périmètre couvert.
- **VAN avec prix interne du carbone** : on retire des flux le coût des émissions (tonnes × prix interne) ; un projet rentable financièrement peut ainsi être rejeté. Le prix d'équilibre est le prix par tonne qui annule la VAN (ou la VAN différentielle entre deux options).
- **Effets financiers attendus** (E1-9) : part des actifs et du chiffre d'affaires exposés aux risques physiques et de transition ; informations soumises à une application progressive.
- **Connectivité** : les hypothèses climatiques doivent être cohérentes avec les comptes (tests de dépréciation, durées d'amortissement, provisions, quotas d'émission) ; un plan de transition ambitieux et des durées d'utilité inchangées sont contradictoires.
- Autres indicateurs utiles au diagnostic : taux de fréquence des accidents, rotation du personnel, écart de rémunération femmes-hommes, part du chiffre d'affaires et des CapEx alignés sur la taxonomie.
- Le calendrier et le champ des obligations ont été révisés (directive 2025/794 « stop-the-clock » ; directive « Omnibus I » (UE) 2026/470 du 24 février 2026, qui réserve la CSRD aux entreprises de plus de 1 000 salariés et 450 M€ de chiffre d'affaires net, à transposer d'ici mars 2027) ; les ESRS sont simplifiés par acte délégué : vérifier les textes en vigueur pour l'exercice étudié.

**Formules clés :** intensité = émissions (tCO₂e) ÷ CA net (M€) ; coût carbone annuel = émissions × prix interne ; VAN = −I₀ + Σ (FNTₜ − Eₜ × p) (1 + k)⁻ᵗ

## Exemple
Intensité : émissions 180 000 tCO₂e pour un CA de 600 M€ en N (300 t/M€) ; 190 000 t pour 720 M€ en N+1 (263,9 t/M€). L'intensité baisse de 12 % alors que les émissions augmentent de 5,6 %.
Projet : I₀ = 1 000 k€, flux nets 300 k€ par an pendant 5 ans, k = 8 % (facteur d'annuité 3,9927), émissions 500 t par an. VAN sans carbone = 300 × 3,9927 − 1 000 = +197,8 k€.
Prix interne 120 €/t : coût 60 k€ par an, flux 240, VAN = 240 × 3,9927 − 1 000 = −41,7 k€ : projet rejeté. Prix d'équilibre : flux annuel annulant la VAN = 1 000 / 3,9927 = 250,5 k€, soit un coût carbone de 49,5 k€ et un prix de 99 €/t.

```diagram
{"type":"bars","title":"VAN du projet selon le prix interne du carbone (k€)","unit":"k€","items":[{"label":"0 €/t","value":197.8},{"label":"60 €/t","value":78},{"label":"120 €/t","value":-41.7}]}
```

## Erreurs fréquentes
- Rapporter les émissions à la valeur ajoutée, à l'effectif ou au total du bilan pour l'intensité ESRS E1 : la référence est le chiffre d'affaires net.
- Comptabiliser une charge égale aux émissions × prix fictif : le *shadow price* n'entraîne ni décaissement ni écriture ; seule la redevance interne déplace des fonds.
- Déduire des émissions publiées les tonnes « valorisées » ou compensées par des crédits carbone : les émissions brutes restent brutes.
- Conclure d'une intensité en baisse que l'entreprise décarbone : vérifier l'évolution en valeur absolue.

## À retenir
- Une intensité en baisse ne signifie pas des émissions en baisse.
- Le prix fictif n'est pas un décaissement : il sert à orienter les décisions d'investissement.
- Le scope 3, souvent majoritaire, repose sur des estimations : vérifier la méthode avant de comparer.

**Notions liées :** [Cadre CSRD et périmètre](/cours/cadre-csrd-perimetre) · [ESRS et double matérialité](/cours/esrs-double-materialite) · [Pilotage de la durabilité et bilan carbone](/cours/pilotage-durabilite-bilan-carbone) · [VAN, TRI et critères d'investissement](/cours/van-tri-criteres-investissement)
