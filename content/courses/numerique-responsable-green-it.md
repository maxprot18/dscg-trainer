# Numérique responsable et Green IT

**Références :** loi n° 2021-1485 du 15 novembre 2021 visant à réduire l'empreinte environnementale du numérique (REEN) ; loi n° 2020-105 du 10 février 2020 relative à la lutte contre le gaspillage et à l'économie circulaire (AGEC) ; études ADEME-Arcep sur l'empreinte environnementale du numérique en France ; référentiel général d'écoconception de services numériques (RGESN, 2024) ; indicateur PUE (ISO/IEC 30134-2) ; CSRD, normes ESRS E1 (climat) et E5 (économie circulaire)

**Enjeu :** le SI pèse dans le bilan carbone et dans le rapport de durabilité de l'entreprise ; l'examen demande de dire où se concentre l'empreinte, de calculer celle d'un parc ou d'un centre de données à partir d'hypothèses données et de hiérarchiser les leviers.

**Numérique responsable** : démarche qui réduit l'empreinte environnementale et sociale du numérique (**Green IT**) et utilise le numérique pour réduire celle des autres activités (« IT for Green » : télétravail, optimisation logistique, dématérialisation), à condition que les effets rebond ne l'annulent pas.

**Où est l'empreinte ?** En France, l'essentiel de l'empreinte carbone du numérique vient de la **fabrication des équipements**, surtout des terminaux (ordinateurs, écrans, smartphones, téléviseurs), bien plus que de leur usage, car l'électricité française est peu carbonée. Les réseaux pèsent peu ; la part des centres de données, faible dans l'étude publiée en 2022, augmente lorsqu'on intègre les centres situés à l'étranger utilisés par les Français. La fabrication consomme aussi des métaux et de l'eau : le bilan ne se limite pas au carbone.

**Leviers**, par ordre d'efficacité :
- **allonger la durée de vie** des équipements (matériel réparable ou reconditionné, réemploi, remplacement des batteries, maintenance) : chaque année gagnée réduit la part de fabrication amortie ;
- dimensionner le parc au besoin (un poste par utilisateur, téléphone unique, mutualisation des imprimantes) ;
- **sobriété** des usages (stockage, visioconférence, mise en veille) et **écoconception** des services numériques (RGESN : fonctionnalités utiles, pages légères, compatibilité avec les terminaux anciens pour lutter contre l'obsolescence logicielle) ;
- centres de données efficaces : indicateur **PUE** (énergie totale du site ÷ énergie des équipements informatiques, toujours ≥ 1, idéalement proche de 1), refroidissement, réutilisation de la chaleur, mutualisation chez un hébergeur ;
- fin de vie : collecte des déchets d'équipements électriques et électroniques (DEEE), effacement sécurisé des données avant réemploi.

**Cadre juridique** : la loi REEN impose la sensibilisation à la sobriété numérique, une stratégie numérique responsable aux communes et intercommunalités de plus de 50 000 habitants (au 1ᵉʳ janvier 2025), et complète la lutte contre l'obsolescence logicielle (loi AGEC : indice de réparabilité en 2021, remplacé progressivement depuis 2025 par l'indice de durabilité ; au moins 20 % de reconditionné ou de réemploi dans les achats publics de matériel informatique). Les entreprises soumises à la **CSRD** intègrent l'empreinte du SI dans leur état de durabilité (ESRS E1 : émissions ; ESRS E5 : flux de ressources et déchets).

**Mesure** : empreinte annuelle d'un équipement = émissions de fabrication ÷ durée de vie + consommation annuelle × facteur d'émission de l'électricité. Ces émissions entrent dans le bilan de gaz à effet de serre de l'entreprise (fabrication : scope 3 ; électricité : scope 2).

**Formules clés :** PUE = énergie totale du centre de données ÷ énergie IT ; empreinte annuelle = fabrication ÷ durée de vie + kWh annuels × facteur d'émission ; énergie totale du centre = énergie IT × PUE

## Exemple
Parc d'une entreprise ; facteur d'émission 0,05 kg CO₂e/kWh ; fabrication amortie linéairement. 300 portables (250 kg CO₂e de fabrication, 5 ans, 40 kWh/an) ; 200 écrans (350 kg, 7 ans, 50 kWh/an) ; 300 smartphones (60 kg, 3 ans, 5 kWh/an) ; 10 serveurs (1 200 kg, 6 ans, 2 500 kWh/an chacun, dans une salle de PUE 1,6).
Portables : 300 × 250 ÷ 5 + 300 × 40 × 0,05 = 15 000 + 600 = **15 600 kg** ; écrans : 10 000 + 500 = **10 500 kg** ; smartphones : 6 000 + 75 = **6 075 kg** ; serveurs : 10 × 1 200 ÷ 6 + 10 × 2 500 × 1,6 × 0,05 = 2 000 + 2 000 = **4 000 kg**.
Total = **36 175 kg**, soit 36,2 t CO₂e par an, dont 33 000 kg de fabrication (**91 %**).
Leviers : porter les portables à 6 ans fait passer leur fabrication annuelle de 15 000 à 12 500 kg (**−2 500 kg**) ; ramener le PUE de 1,6 à 1,3 ne gagne que 10 × 2 500 × 0,3 × 0,05 = **375 kg**. En France, agir sur le renouvellement vaut sept fois l'optimisation énergétique de la salle.

```diagram
{"type":"bars","title":"Empreinte annuelle du parc de l'exemple par poste","unit":"t CO₂e","items":[{"label":"Portables","value":15.6},{"label":"Écrans","value":10.5},{"label":"Smartphones","value":6.1},{"label":"Serveurs","value":4}]}
```

## Erreurs fréquentes
- Placer la consommation des centres de données en tête de l'empreinte française : c'est la fabrication des terminaux qui domine ; les centres de données et les réseaux viennent loin derrière.
- Inverser le PUE (énergie IT ÷ énergie totale, soit 0,67 pour 3 000 et 2 000 MWh) : le PUE est toujours supérieur ou égal à 1 ; ici 1,5, et PUE − 1 mesure la part de l'infrastructure.
- Renouveler plus tôt des portables « plus économes » : la fabrication du nouveau matériel émet bien plus que l'électricité économisée avec une électricité peu carbonée.
- Attendre des gestes d'usage (éteindre les écrans, supprimer les pièces jointes) un effet comparable à l'allongement de la durée de vie : ils comptent, mais à la marge.

## À retenir
- En France, réduire le nombre d'équipements achetés compte davantage que réduire leur consommation électrique.
- Un PUE de 2 signifie que l'infrastructure (refroidissement, onduleurs) consomme autant que l'informatique elle-même.
- La loi REEN impose notamment la sensibilisation à la sobriété numérique et lutte contre l'obsolescence logicielle ; la CSRD fait entrer l'empreinte du SI dans le reporting.

**Notions liées :** [Pilotage de la durabilité : bilan carbone, indicateurs ESG](/cours/pilotage-durabilite-bilan-carbone) · [Cadre CSRD : entités, calendrier, contenu](/cours/cadre-csrd-perimetre) · [Cloud, SaaS, externalisation](/cours/cloud-saas-externalisation) · [Politique de sécurité et continuité](/cours/politique-securite-continuite)
