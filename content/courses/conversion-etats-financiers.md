# Conversion des comptes des filiales étrangères

**Références :** IAS 21 §8-14, §21-23, §38-48 (règl. UE 2023/1803) ; règl. ANC 2020-01 (conversion des comptes des entités étrangères : méthode du cours de clôture et méthode du cours historique)

**Enjeu :** avant d'être consolidée, une filiale qui tient ses comptes en devise doit être exprimée dans la monnaie du groupe ; le choix de la méthode dépend de sa monnaie fonctionnelle, et l'examen fait calculer l'écart de conversion puis le placer au bon endroit (capitaux propres ou résultat).

**Monnaie fonctionnelle** : monnaie de l'environnement économique principal de l'entité, celle qui détermine ses prix de vente et ses coûts (IAS 21 §9-12) ; elle n'est pas un choix de gestion. **Monnaie de présentation** : monnaie des états financiers consolidés (l'euro pour un groupe français), librement choisie.

**Méthode du cours de clôture** (filiale autonome dont la monnaie fonctionnelle est la devise locale, IAS 21 §39) :
- actifs et passifs, y compris le goodwill et les écarts d'évaluation de l'activité à l'étranger (§47) : cours de clôture ;
- produits et charges : cours des dates de transaction, cours moyen de la période admis s'il en est une approximation raisonnable (§40) ;
- capitaux propres : cours historique (date d'entrée dans le groupe pour les capitaux propres acquis, cours de l'exercice de formation pour chaque réserve) ;
- écart de conversion : en autres éléments du résultat global, cumulé dans une rubrique distincte des capitaux propres, partagé entre groupe et minoritaires (§41). Il mesure l'effet du change sur l'actif net d'ouverture et sur le résultat de l'exercice.

**Méthode du cours historique** (filiale dont la monnaie fonctionnelle est celle de la mère mais qui tient ses comptes en devise, §21-23) : éléments monétaires au cours de clôture, éléments non monétaires au cours historique, produits et charges au cours du jour (ou moyen) sauf les dotations liées à des actifs non monétaires ; l'écart de conversion est en **résultat**. En règles françaises, les deux méthodes coexistent de même, la méthode du cours de clôture étant celle des filiales autonomes.

**Cession** avec perte de contrôle : les écarts de conversion cumulés part du groupe sont reclassés en résultat (§48) ; une cession partielle sans perte de contrôle en réattribue une fraction aux minoritaires, sans résultat (§48C).

```diagram
{"type":"flow","title":"Convertir une filiale autonome (cours de clôture)","steps":[{"label":"Déterminer la monnaie fonctionnelle","note":"IAS 21 §9-12 : environnement économique principal"},{"label":"Bilan au cours de clôture","note":"actifs et passifs, goodwill compris (§47)"},{"label":"Résultat au cours moyen","note":"approximation des cours du jour (§40)"},{"label":"Capitaux propres au cours historique","note":"date d'entrée ou de formation des réserves"},{"label":"Écart de conversion en capitaux propres","note":"OCI, partagé groupe / minoritaires (§41)"}]}
```

**Formule clé (devise cotée en euros) :** écart de conversion de l'exercice = CP d'ouverture × (C clôture − C ouverture) + résultat × (C clôture − C moyen)

## Exemple
Filiale Sequoia (monnaie fonctionnelle : dollar), détenue à 80 % ; capitaux propres d'ouverture 1 000 k$, résultat N 200 k$, aucune distribution. Cours : 1 $ = 0,90 € à l'ouverture, 0,92 € en moyenne, 0,95 € à la clôture.
Écart de conversion N = 1 000 × (0,95 − 0,90) + 200 × (0,95 − 0,92) = 50 + 6 = **56 k€** (contrôle : CP de clôture au cours de clôture 1 200 × 0,95 = 1 140 k€ ; CP d'ouverture au cours historique 900 k€ + résultat au cours moyen 184 k€ = 1 084 k€ ; différence 56 k€).
Partage : 44,8 k€ en écarts de conversion part du groupe et 11,2 k€ dans les PNC, via les autres éléments du résultat global ; rien en résultat. Le dollar s'est apprécié, l'écart est positif.

## Erreurs fréquentes
- Convertir les immobilisations au cours historique dans la méthode du cours de clôture : tous les actifs et passifs, immobilisations comprises, sont au cours de clôture ; le cours historique ne vaut que pour la méthode du cours historique.
- Porter l'écart de conversion d'une filiale autonome en résultat financier : il reste en capitaux propres jusqu'à la cession (§41 et §48).
- Attribuer la totalité de l'écart de conversion au groupe : les minoritaires en reçoivent leur quote-part (§41).
- Figer le goodwill d'une filiale étrangère à son montant en euros à la date d'acquisition : il est libellé dans la monnaie fonctionnelle de la filiale et reconverti au cours de clôture (§47).

## À retenir
- Une devise qui se déprécie face à l'euro génère un écart de conversion négatif sur l'actif net ; une devise qui s'apprécie, un écart positif.
- L'écart de conversion ne transite par le résultat qu'à la cession avec perte de contrôle.
- La monnaie fonctionnelle commande la méthode : devise locale → cours de clôture (écart en capitaux propres) ; monnaie de la mère → cours historique (écart en résultat).

**Notions liées :** [Opérations en devises et écarts de conversion](/cours/operations-devises-pcg) · [Écarts d'acquisition](/cours/ecarts-acquisition) · [Variations de périmètre](/cours/variations-perimetre) · [Risque de change : nature et mesure de l'exposition](/cours/risque-change-exposition)
