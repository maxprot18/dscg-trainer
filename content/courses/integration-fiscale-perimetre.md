# Intégration fiscale : conditions, périmètre, option

**Références :** CGI art. 223 A (conditions, option, intégration horizontale) ; CGI art. 46 quater-0 ZD s. de l'annexe III (formalités)

**Enjeu :** déterminer quelles sociétés peuvent entrer dans un groupe fiscal et selon quelles formalités ; première étape de tout dossier d'intégration, avant le calcul du résultat d'ensemble.

**Principe** : une société mère peut se constituer seule redevable de l'IS dû sur l'ensemble des résultats du groupe qu'elle forme avec ses filiales. C'est un régime **optionnel** et le périmètre est **choisi** par la mère : elle n'est pas obligée d'y inclure toutes les filiales éligibles et peut faire varier le périmètre chaque année, dans le respect des conditions.

**Conditions tenant à la mère** :
- soumise à l'IS au taux de droit commun sur la totalité de ses résultats ;
- son capital n'est pas détenu à 95 % ou plus, directement ou indirectement, par une autre personne morale soumise à l'IS en France (sinon c'est cette dernière qui peut être tête de groupe). Une détention à 95 % par une personne physique, par une société étrangère ou par une société non soumise à l'IS ne fait pas obstacle.

**Conditions tenant aux filiales** :
- soumises à l'IS au taux de droit commun en France ;
- capital détenu à **95 % au moins**, de manière continue au cours de l'exercice, directement ou **indirectement par l'intermédiaire de sociétés du groupe**. Les titres détenus par une société non intégrée ne comptent pas, même si elle est contrôlée à plus de 50 %. La détention de 95 % s'apprécie en droits à dividendes **et** en droits de vote ; les titres émis au profit des salariés (actions gratuites, stock-options) sont neutralisés dans la limite de 10 % du capital ;
- accord de la filiale à son inclusion dans le groupe, donné avant la fin du délai d'option.

**Conditions communes** : exercices de **même durée** (12 mois en principe ; une durée différente est admise une fois par période d'option, pour toutes les sociétés) **ouverts et clos aux mêmes dates**.

**Option** : notifiée par la mère à l'administration au plus tard à la date limite de dépôt de la déclaration de résultat de l'exercice précédant celui au titre duquel le régime s'applique ; elle vaut pour **cinq exercices** et se renouvelle par tacite reconduction. La liste des sociétés membres et des sociétés qui cessent d'être membres est communiquée chaque année avec la déclaration de résultat d'ensemble.

**Intégration horizontale** (223 A, issue de la loi de finances rectificative pour 2014) : des sociétés sœurs françaises détenues à 95 % par une **entité mère non résidente** établie dans l'UE ou l'EEE (soumise à un impôt équivalent à l'IS) peuvent former un groupe, l'une d'elles étant désignée société mère intégrante. De même, une sous-filiale française détenue via une société intermédiaire européenne peut être intégrée (intégration verticale « Papillon »).

```diagram
{"type":"org","title":"Périmètre intégrable autour de la mère M","nodes":[{"id":"M","label":"M (mère)"},{"id":"A","label":"A : intégrable"},{"id":"B","label":"B : intégrable"},{"id":"C","label":"C : intégrable"},{"id":"D","label":"D : exclue (90 %)"}],"links":[{"from":"M","to":"A","label":"100 %"},{"from":"A","to":"B","label":"96 %"},{"from":"M","to":"C","label":"60 %"},{"from":"B","to":"C","label":"40 %"},{"from":"M","to":"D","label":"90 %"}]}
```

## Exemple
La SA Nacre détient 60 % de la SAS Opale ; les 40 % restants appartiennent à la SAS Perle. Cas 1 : Perle est détenue à 100 % par Nacre et intégrée ; la détention indirecte compte : 60 % + 40 % = 100 %, Opale peut être intégrée. Cas 2 : Perle est détenue à 80 % par Nacre ; Perle n'est pas intégrable (80 % < 95 %), donc ses 40 % ne comptent pas : Nacre ne détient que 60 % d'Opale, qui ne peut pas entrer dans le groupe.
Autre cas : Holdia détient 92 % du capital de Ferro mais 96 % des droits de vote grâce à des actions à droit de vote double : la condition porte à la fois sur les droits à dividendes (92 %) et sur les droits de vote ; Ferro n'est pas intégrable.

## Erreurs fréquentes
- Compter une détention indirecte via une société simplement contrôlée (plus de 50 %) : seule la détention par des sociétés membres du groupe est retenue.
- Croire que le seuil de 95 % s'apprécie sur les seuls droits de vote : il faut 95 % des droits à dividendes et 95 % des droits de vote.
- Exiger qu'une filiale soit bénéficiaire pour entrer dans le groupe : aucune condition de rentabilité ; intégrer une filiale déficitaire est même l'intérêt du régime.
- Donner à l'option une durée de trois exercices ou exiger un renouvellement exprès : cinq exercices, reconduction tacite.

## À retenir
- 95 % au moins du capital (dividendes et droits de vote), en continu, via des sociétés du groupe seulement.
- Même date de clôture et même durée d'exercice pour toutes les sociétés.
- Option de la mère pour cinq exercices, accord de chaque filiale, périmètre librement choisi.

**Notions liées :** [Intégration fiscale : résultat d'ensemble](/cours/integration-fiscale-resultat-ensemble) · [Régime mère-fille](/cours/regime-mere-filiale) · [Notion de groupe et conventions intra-groupe](/cours/conventions-intra-groupe) · [Pourcentages de contrôle et d'intérêt](/cours/pourcentages-controle-interet)
