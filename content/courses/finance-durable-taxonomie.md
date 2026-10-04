# Finance durable : taxonomie, obligations vertes, ISR

**Références :** règlement (UE) 2020/852 (taxonomie), art. 3, 8 et 9 ; règlement (UE) 2019/2088 (SFDR), art. 8 et 9 ; règlement (UE) 2023/2631 (obligations vertes européennes) ; *Green Bond Principles* et *Sustainability-Linked Bond Principles* (ICMA) ; PCG (règl. ANC 2022-06) comptes 163, 169, 131, 139, 747

**Enjeu :** savoir distinguer les instruments et classifications de la finance durable (SFDR, labels, taxonomie, obligations vertes ou liées à la durabilité), en mesurer le coût réel et vérifier que la comptabilisation reste celle de l'instrument financier sous-jacent.

- **SFDR** : obligations de transparence des acteurs financiers. Produit « article 8 » : promeut des caractéristiques environnementales ou sociales. Produit « article 9 » : a pour objectif l'investissement durable. C'est une classification de transparence, pas un label : un fonds article 9 n'est pas labellisé pour autant.
- **Labels français** : label ISR (label public, référentiel renforcé en 2024, notamment sur les énergies fossiles), Greenfin (finance verte, exclut les énergies fossiles), Finansol (finance solidaire). Ils s'obtiennent sur audit d'un organisme labellisateur.
- **Taxonomie** (règles détaillées : fiche sur le reporting taxonomie) : pour l'analyste, la part alignée du chiffre d'affaires mesure l'exposition actuelle aux activités durables ; la part alignée des CapEx renseigne sur la trajectoire de transition ; une activité éligible non alignée ne compte pas (critères techniques, absence de préjudice important, garanties sociales minimales).
- **Obligation verte** (*use of proceeds*) : les fonds levés sont affectés à des projets environnementaux. Quatre piliers ICMA : utilisation des fonds, sélection des projets, gestion des fonds, reporting ; revue externe recommandée. Le remboursement reste garanti par l'émetteur, pas par les projets.
- **Obligation verte européenne** (règl. 2023/2631, applicable depuis le 21 décembre 2024) : standard volontaire ; fonds alloués à des activités alignées sur la taxonomie, avec une poche de flexibilité limitée (15 %) ; examinateur externe enregistré auprès de l'ESMA.
- **Obligation liée à la durabilité** (*sustainability-linked*) : pas d'affectation des fonds ; le coupon augmente (*step-up*) si l'émetteur n'atteint pas, à la date d'observation, ses objectifs de performance (SPT) mesurés par des indicateurs (KPI), par exemple −30 % d'émissions des scopes 1 et 2.
- **Greenium** : écart de rendement entre une obligation conventionnelle comparable et l'obligation verte, en points de base. Souvent faible ; le coût réel du financement vert s'apprécie frais spécifiques compris (seconde opinion, reporting d'allocation et d'impact).
- **Comptabilisation** : le caractère vert ne change pas le traitement. Obligation : 163 Autres emprunts obligataires pour la valeur de remboursement, prime de remboursement au 169 (amortie sur la durée de l'emprunt). Subvention d'investissement verte : 131 à l'octroi, reprise au résultat (139 / 747, ancien 777 avant le règl. ANC 2022-06) au rythme de l'amortissement du bien financé.

```diagram
{"type":"tree","title":"Quel instrument obligataire durable ?","root":{"label":"Les fonds levés sont-ils affectés à des projets ?","children":[{"edge":"oui","label":"Obligation verte (use of proceeds)","children":[{"edge":"alignée taxonomie, examen ESMA","label":"Obligation verte européenne (EuGB)"},{"edge":"principes ICMA","label":"Obligation verte classique"}]},{"edge":"non","label":"Obligation liée à la durabilité","note":"coupon step-up si l'objectif (SPT) n'est pas atteint"}]}}
```

**Formules clés :** greenium (pb) = (rendement conventionnel − rendement vert) × 100 ; part alignée du CA = CA aligné ÷ CA net

## Exemple
Une société émet 200 M€ d'obligations vertes à 7 ans au prix de 99 %, rendement 3,32 % ; une obligation conventionnelle comparable rendrait 3,40 %. Greenium = (3,40 − 3,32) × 100 = 8 pb, soit 200 M€ × 0,08 % = 160 k€ d'économie annuelle de coupon.
Frais annuels spécifiques (seconde opinion, reporting d'allocation et d'impact) : 90 k€ ; avantage net 70 k€ par an.
Écriture à l'émission (k€) : débit 512 Banque 198 000 et 169 Primes de remboursement 2 000 ; crédit 163 Autres emprunts obligataires 200 000. La prime de 2 M€ est amortie sur 7 ans.

## Erreurs fréquentes
- Qualifier d'obligation verte un titre dont le coupon dépend d'un objectif d'émissions : sans affectation des fonds, c'est une obligation liée à la durabilité.
- Croire qu'un fonds article 9 SFDR est automatiquement labellisé ISR : SFDR classe, le label certifie.
- Compter une activité éligible dans la part alignée : l'alignement suppose en plus le respect des critères techniques.
- Comptabiliser différemment un emprunt obligataire parce qu'il est vert.

## À retenir
- Obligation verte : fonds fléchés ; obligation liée à la durabilité : fonds libres, coupon conditionnel.
- Article 8 / article 9 SFDR ≠ label ; éligible ≠ aligné.
- Comptablement, une obligation verte est un emprunt obligataire comme un autre.

**Notions liées :** [Taxonomie verte et reporting](/cours/taxonomie-verte-reporting) · [Financement par fonds propres et obligataire](/cours/financement-fonds-propres-obligataire) · [Critères ESG et notation extra-financière](/cours/criteres-esg-notation) · [Évaluation des obligations et duration](/cours/evaluation-obligations-duration)
