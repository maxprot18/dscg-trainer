# Interrogation des données : langage SQL

**Références :** norme ISO/IEC 9075 (SQL) ; programme DSCG UE 5 (exploitation des données)

**Enjeu :** l'épreuve demande presque toujours de lire, corriger ou écrire une requête sur un schéma relationnel donné (chiffre d'affaires par client, factures impayées, clients sans commande). Les pièges portent sur WHERE / HAVING, les jointures et le GROUP BY.

**Structure d'une requête de sélection** (ordre d'écriture) :
SELECT colonnes ou calculs FROM table(s) [JOIN … ON …] WHERE conditions sur les lignes GROUP BY colonnes de regroupement HAVING conditions sur les groupes ORDER BY tri.

**Ordre logique d'exécution** : FROM et jointures → WHERE → GROUP BY → HAVING → SELECT → ORDER BY. D'où :
- **WHERE** filtre les lignes **avant** regroupement et ne peut pas contenir de fonction d'agrégat ;
- **HAVING** filtre les **groupes** après calcul des agrégats (SUM, COUNT, AVG, MIN, MAX) ; un alias défini dans SELECT est utilisable dans ORDER BY, pas dans WHERE ;
- toute colonne du SELECT qui n'est pas dans une fonction d'agrégat doit figurer dans le GROUP BY.

```diagram
{"type":"flow","title":"Ordre logique d'exécution d'une requête SELECT","steps":[{"label":"FROM + JOIN","note":"Assemble les tables"},{"label":"WHERE","note":"Filtre les lignes, sans agrégat"},{"label":"GROUP BY","note":"Forme les groupes"},{"label":"HAVING","note":"Filtre les groupes sur un agrégat"},{"label":"SELECT","note":"Calcule les colonnes affichées"},{"label":"ORDER BY","note":"Trie le résultat"}]}
```

**Jointures** :
- **interne** (INNER JOIN … ON a.cle = b.cle) : seulement les lignes qui ont une correspondance dans les deux tables ; un client sans commande disparaît ;
- **externe gauche** (LEFT JOIN) : toutes les lignes de la table de gauche, avec NULL quand il n'y a pas de correspondance (utile pour trouver « les clients sans facture » avec WHERE … IS NULL) ;
- une jointure sans condition ON (produit cartésien) multiplie les lignes et fausse toutes les sommes.

**Sous-requêtes** : requête imbriquée dans WHERE (IN, NOT IN, EXISTS, comparaison avec une valeur unique, ex. montant > (SELECT AVG(montant) FROM …)). « Clients n'ayant pas commandé en 2026 » : id_client NOT IN (SELECT id_client FROM COMMANDE WHERE date_cde BETWEEN '2026-01-01' AND '2026-12-31') ; attention, NOT IN ne renvoie rien si la sous-requête contient un NULL.

**Agrégats** : COUNT(*) compte les lignes ; COUNT(colonne) ignore les NULL ; SUM et AVG ignorent les NULL ; COUNT(DISTINCT colonne) compte les valeurs distinctes.

**Mises à jour** : INSERT INTO … VALUES ; UPDATE … SET … WHERE ; DELETE FROM … WHERE. Sans WHERE, UPDATE et DELETE portent sur **toutes** les lignes. Les dates et chaînes s'écrivent entre apostrophes ('2026-03-31', 'Payée') ; les nombres, sans.

## Exemple
Table FACTURE (num_fact, id_client, montant, statut) : (F1, C1, 3 000, Payée), (F2, C1, 4 000, Payée), (F3, C1, 2 000, Impayée), (F4, C2, 2 500, Payée), (F5, C2, 1 500, Payée), (F6, C3, 6 000, Impayée).
Requête : SELECT id_client, SUM(montant) AS total_paye, COUNT(*) AS nb FROM FACTURE WHERE statut = 'Payée' GROUP BY id_client HAVING SUM(montant) > 5000 ORDER BY total_paye DESC;
Exécution : WHERE garde F1, F2, F4, F5 (C3 disparaît avant le regroupement) ; GROUP BY donne C1 = 7 000 (2 factures) et C2 = 4 000 (2 factures) ; HAVING ne retient que C1. Résultat : **(C1, 7 000, 2)**. Avec WHERE montant > 5000 à la place du HAVING, le résultat serait vide : aucune facture payée ne dépasse 5 000 € seule.

## Erreurs fréquentes
- Écrire WHERE SUM(montant) > 50000 : un agrégat ne peut pas être évalué avant le regroupement ; la condition va dans HAVING.
- Remplacer HAVING SUM(montant) > 50000 par WHERE montant > 50000 : on ne retient que les factures unitaires élevées, un client aux dix factures de 8 000 € est exclu.
- Chercher les clients sans commande avec INNER JOIN … HAVING COUNT(*) = 0 : la jointure interne a déjà supprimé ces clients ; il faut LEFT JOIN … IS NULL ou NOT IN.
- Mettre une colonne non agrégée dans le SELECT sans la reprendre dans le GROUP BY : requête refusée ou résultat indéterminé selon le SGBD.

## À retenir
- Condition sur une somme ou un comptage : HAVING, jamais WHERE.
- Une jointure interne fait disparaître les lignes sans correspondance ; pour les retrouver, jointure externe (LEFT JOIN … IS NULL).

**Notions liées :** [Modélisation des données et bases relationnelles](/cours/modelisation-bases-donnees) · [Informatique décisionnelle et dataviz](/cours/business-intelligence-dataviz) · [Audit en environnement informatisé](/cours/audit-environnement-informatise)
