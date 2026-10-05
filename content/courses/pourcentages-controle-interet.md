# Pourcentages de contrôle et d'intérêt

**Références :** règl. ANC 2020-01 art. 211-6 et 211-7 ; C. com. L233-3, L233-4 et L233-16 ; IFRS 10 §B35 et §B94 (règl. UE 2023/1803)

**Enjeu :** deux pourcentages répondent à deux questions distinctes : « qui décide ? » (contrôle, donc périmètre et méthode) et « à qui revient la richesse ? » (intérêt, donc partage des capitaux propres) ; les confondre fausse toute la suite d'un cas de consolidation.

**Pourcentage de contrôle** : part des droits de vote dont dispose le groupe dans une entité. Il sert à déterminer la nature du contrôle, donc l'inclusion dans le périmètre et la méthode.
- On additionne les droits de vote détenus directement par la mère et ceux détenus par les entités **qu'elle contrôle** exclusivement (les voix d'une filiale contrôlée sont retenues en totalité, même si la mère n'en détient que 51 %).
- On ne multiplie pas les pourcentages le long de la chaîne : le contrôle se transmet, il ne se dilue pas.
- Si la chaîne est rompue (entité intermédiaire seulement sous influence notable ou contrôle conjoint), les droits de vote détenus par cette entité ne sont pas ajoutés au contrôle du groupe.

**Pourcentage d'intérêt** : part du capital (des droits aux résultats et aux capitaux propres) revenant, directement ou indirectement, à la société mère. Il sert au partage des capitaux propres et des résultats entre le groupe et les intérêts minoritaires.
- Chaîne : produit des pourcentages de détention du capital à chaque niveau, que l'intermédiaire soit contrôlé ou non.
- Plusieurs chemins : somme des produits de chaque chemin.
- Actions d'autocontrôle (détenues par l'entité elle-même) : les pourcentages se calculent sur le nombre d'actions hors actions autodétenues, qui sont privées de droit de vote et de dividende.
- Participations croisées ou circulaires : le calcul passe par une résolution algébrique (le pourcentage d'intérêt de la mère dans chaque entité est l'inconnue d'un système d'équations).

**Formules clés :** % intérêt (M → A → B) = % M dans A × % A dans B ; % intérêt total = Σ des chemins ; % minoritaires = 100 % − % intérêt du groupe

```diagram
{"type":"org","title":"Groupe Alpha : contrôle 55 %, intérêt 43 % dans Gamma","nodes":[{"id":"M","label":"Alpha (mère)"},{"id":"A","label":"Bêta"},{"id":"B","label":"Gamma"}],"links":[{"from":"M","to":"A","label":"70 %"},{"from":"A","to":"B","label":"40 %"},{"from":"M","to":"B","label":"15 %"}]}
```

## Exemple
Alpha détient 70 % de Bêta et 15 % de Gamma ; Bêta détient 40 % de Gamma. Capital et droits de vote se confondent.
Contrôle d'Alpha sur Gamma : Bêta est contrôlée (70 %), ses 40 % sont retenus en entier : 40 % + 15 % = **55 %** → contrôle exclusif, intégration globale.
Intérêt d'Alpha dans Gamma : 0,70 × 0,40 + 0,15 = 0,28 + 0,15 = **43 %** ; intérêts minoritaires = 57 %. Gamma est donc intégrée globalement alors que le groupe n'a droit qu'à 43 % de ses capitaux propres.

## Erreurs fréquentes
- Multiplier les pourcentages pour le contrôle (70 % × 40 % = 28 %) : le produit ne vaut que pour l'intérêt.
- Additionner les voix d'une entité intermédiaire non contrôlée : si la mère ne détient que 30 % de A, les droits de A dans B ne comptent pas pour le contrôle (mais le produit 30 % × ... compte pour l'intérêt).
- Calculer les pourcentages sur le capital total alors qu'une partie est autodétenue : on exclut les actions propres du dénominateur.
- Faire varier l'intérêt avec les droits de vote double : ils n'affectent que le contrôle.

## À retenir
- Contrôle → périmètre et méthode ; intérêt → partage des capitaux propres et du résultat.
- Une filiale peut être intégrée globalement avec un pourcentage d'intérêt inférieur à 50 % (chaîne de contrôle).
- Droits de vote doubles : ils modifient le contrôle, pas l'intérêt.

**Notions liées :** [Périmètre de consolidation et nature du contrôle](/cours/perimetre-controle) · [Partage des capitaux propres et intérêts minoritaires](/cours/partage-capitaux-propres-minoritaires) · [Méthodes de consolidation](/cours/methodes-consolidation)
