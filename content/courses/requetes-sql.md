# Interrogation des données : langage SQL

**Références :** norme ISO/IEC 9075 (SQL) ; programme DSCG UE 5 (exploitation des données)

**Structure d'une requête de sélection** (ordre d'écriture) :
SELECT colonnes ou calculs FROM table(s) [JOIN … ON …] WHERE conditions sur les lignes GROUP BY colonnes de regroupement HAVING conditions sur les groupes ORDER BY tri.

**Ordre logique d'exécution** : FROM et jointures → WHERE → GROUP BY → HAVING → SELECT → ORDER BY. D'où :
- **WHERE** filtre les lignes **avant** regroupement et ne peut pas contenir de fonction d'agrégat ;
- **HAVING** filtre les **groupes** après calcul des agrégats (SUM, COUNT, AVG, MIN, MAX).

**Jointures** :
- **interne** (INNER JOIN … ON a.cle = b.cle) : seulement les lignes qui ont une correspondance dans les deux tables ;
- **externe gauche** (LEFT JOIN) : toutes les lignes de la table de gauche, avec NULL quand il n'y a pas de correspondance (utile pour trouver « les clients sans facture » avec WHERE … IS NULL).

**Sous-requêtes** : requête imbriquée dans WHERE (IN, NOT IN, EXISTS, comparaison avec une valeur unique, ex. montant > (SELECT AVG(montant) FROM …)).

**Agrégats** : COUNT(*) compte les lignes ; COUNT(colonne) ignore les NULL ; SUM et AVG ignorent les NULL.

**Mises à jour** : INSERT INTO … VALUES ; UPDATE … SET … WHERE ; DELETE FROM … WHERE. Sans WHERE, UPDATE et DELETE portent sur **toutes** les lignes.

**Règle du GROUP BY** : toute colonne du SELECT qui n'est pas dans une fonction d'agrégat doit figurer dans le GROUP BY.

## À retenir
- Condition sur une somme ou un comptage : HAVING, jamais WHERE.
- Une jointure interne fait disparaître les lignes sans correspondance ; pour les retrouver, jointure externe.
- Les dates et chaînes s'écrivent entre apostrophes ('2026-03-31', 'Payée').
