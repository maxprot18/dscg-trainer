# Couverture du risque de change : terme, options, avance, swap

**Références :** IFRS 9 §6.1-6.5 (règl. UE 2023/1803) ; PCG art. 628-1 s. et 420-1 s. (règl. ANC 2014-03 modifié par le règl. ANC 2015-05)

**Enjeu :** l'épreuve demande presque toujours de calculer le résultat d'une couverture (cours à terme, flux net d'une option) puis de comparer les instruments selon des scénarios de cours ; la qualification comptable (PCG ou IFRS 9) complète le cas.

**Change à terme** : cours fixé aujourd'hui pour une livraison future ; il découle de la **parité des taux d'intérêt couverte** (la banque réplique le terme par un emprunt, un change au comptant et un placement). La devise au taux le plus élevé cote en **déport** à terme (elle vaut moins à terme qu'au comptant), celle au taux le plus faible en **report**. Le risque est éliminé, mais aussi l'éventuel gain : l'exportateur qui vend à terme ne profite pas d'une hausse de la devise.

**Avance en devises** (exportateur) : emprunter aujourd'hui en devises le montant dont la valeur acquise égale la créance, le convertir au comptant ; l'encaissement du client rembourse l'emprunt. Elle couvre et finance à la fois, avec un effet équivalent au terme.

**Option de change** : droit, contre une **prime** payée d'avance, d'acheter (call) ou de vendre (put) une devise à un prix d'exercice. L'exportateur achète un put de devise : il est protégé sous le prix d'exercice et garde le gain en cas de hausse ; l'importateur achète un call. Résultat net = flux en euros obtenu − prime, que l'option soit exercée ou abandonnée.

**Swap de devises** : échange de flux (capital et intérêts) libellés dans deux devises ; il couvre un endettement ou un actif à long terme en devises, là où le terme s'arrête en général à un an.

**Comptabilité de couverture**
- PCG (règl. ANC 2015-05) : principe de **symétrie**, le résultat de l'instrument est constaté au même rythme et dans la même rubrique que celui de l'élément couvert (résultat d'exploitation pour une opération commerciale, 656 / 756 ; financier pour une opération financière, 666 / 766).
- Report / déport d'une couverture à terme (PCG art. 628-13) : étalé en résultat financier sur la durée de la couverture ; le rattacher au résultat de l'élément couvert (ou à la valeur d'entrée d'un actif) n'est possible, sur option, que pour la couverture d'une transaction future.
- IFRS 9 : couverture de **juste valeur** (variations en résultat, élément couvert réévalué), de **flux de trésorerie** (part efficace en autres éléments du résultat global, recyclée quand le flux couvert affecte le résultat), d'**investissement net** dans une activité à l'étranger (comme les flux de trésorerie, recyclage à la cession). Désignation et documentation formelles dès l'origine (§6.4.1).

**Formules clés :** F (devise pour 1 €) = S × (1 + i_devise × n/360) / (1 + i_euro × n/360) ; montant avancé = créance / (1 + i_devise × n/360)

## Exemple
Un exportateur doit encaisser 500 000 USD dans 180 jours. Comptant 1 € = 1,1000 USD ; taux à 6 mois : 5 % en USD, 3 % en EUR ; put USD de prix d'exercice 1,1000, prime 1,5 % du nominal.
Terme : F = 1,1000 × (1 + 0,05 × 180/360) / (1 + 0,03 × 180/360) = 1,1108 USD (déport du dollar) ; encaissement garanti = 500 000 / 1,1108 = 450 111 €.
Option : prime = 1,5 % × 500 000 / 1,10 = 6 818 €. Si le dollar monte à 1,05 : abandon, 500 000 / 1,05 − 6 818 = 469 372 €. S'il baisse à 1,18 : exercice à 1,10, 454 545 − 6 818 = 447 727 € (contre 423 729 € sans couverture).
Point mort option / terme : 500 000 / x − 6 818 = 450 111 d'où x = 1,0943 : l'option ne fait mieux que le terme que si le dollar monte au-delà de ce cours.

```diagram
{"type":"bars","title":"Encaissement net de l'exportateur selon le scénario (€)","unit":"€","items":[{"label":"Terme (tout scénario)","value":450111},{"label":"Put, dollar à 1,05","value":469372},{"label":"Put, dollar à 1,18","value":447727},{"label":"Sans couverture, 1,18","value":423729}]}
```

## Erreurs fréquentes
- Inverser la parité : avec un taux USD supérieur au taux EUR, le dollar cote en déport (plus de dollars pour un euro à terme), ce qui réduit l'encaissement de l'exportateur.
- Emprunter le nominal de la créance dans une avance en devises : on emprunte la créance actualisée au taux de la devise, pour que le remboursement égale exactement l'encaissement.
- Oublier la prime dans le flux net de l'option quand elle est abandonnée : la prime est payée dans tous les cas.
- Classer une vente future hautement probable en couverture de juste valeur : non contractualisée, elle ne peut être couverte qu'en flux de trésorerie (IFRS 9 §6.3.1 et §6.5.2).

## À retenir
- Le terme fige le cours ; l'option protège en laissant le gain, au prix d'une prime non récupérable.
- Point mort option / terme : cours auquel le flux net de l'option égale celui du terme.
- Une transaction future hautement probable ne peut faire l'objet que d'une couverture de flux de trésorerie.

**Notions liées :** [Risque de change : exposition](/cours/risque-change-exposition) · [Opérations en devises en PCG](/cours/operations-devises-pcg) · [IFRS 9 — Instruments financiers](/cours/ifrs-9-instruments-financiers) · [Produits dérivés](/cours/produits-derives)
