# Audit de la version 1.0.0

Audit réalisé le 4 octobre 2026 sur le build de production, à partir des mesures du contenu, de captures d'écran (390 px et 1 280 px) et d'un passage sur chaque écran. Il sert de base aux phases suivantes ; les décisions prises sont dans `PROGRESS.md`.

## 1. Fiches de cours

**Constat.** 271 fiches, 15 lignes non vides en moyenne (2 360 caractères), 194 fiches entre 13 et 16 lignes, 14 sous 13 lignes, aucune au-delà de 25 alors que le SPEC autorise 30. Toutes ont les références et la section « À retenir », 158 ont des formules clés, 3 seulement un tableau, aucune n'a de visuel (le rendu Markdown n'accepte ni image ni SVG). Le style est télégraphique : définitions et règles, très peu d'exemples chiffrés résolus, pas de section « pièges d'examen » systématique, pas de renvoi aux notions voisines. Pour réviser une notion de zéro, c'est trop court ; pour un rappel la veille, c'est bien.

**Propositions.**
- Passer les fiches à 25-30 lignes avec une structure fixe : enjeu en une phrase, règles, **un exemple chiffré résolu**, **erreurs fréquentes à l'examen** (tirées des distracteurs des QCM de la notion), « À retenir », **notions liées** (liens internes), références.
- **Visuels** : rendre dans la fiche des diagrammes déclaratifs écrits dans un bloc ```` ```diagram ```` (JSON validé par le schéma) et dessinés en SVG par un composant : frise chronologique (procédures collectives, calendrier fiscal, étapes d'une fusion), arbre de décision (IFRS 15, IFRS 16, contrôle en conso), organigramme de groupe (périmètre, pourcentages), schéma de flux (cash pooling, affacturage), barres ou courbe simple (VAN en fonction du taux, effet de levier). Avantages par rapport aux images : thème sombre, accessibilité (titre et description lus par les lecteurs d'écran), aucun poids, relecture possible par le validateur. Environ 120 notions s'y prêtent.
- Glossaire bilingue dans les fiches UE 6 (terme anglais → français).

## 2. Exercices

**Constat.** 1 400 exercices, tous vérifiés. Mais 54 notions n'ont que 3 ou 4 exercices : UE 5 (4,0 par notion), UE 6 (3,5) et UE 1 (4,7) sont minces ; une « session par notion » y fait le tour en une fois, et la révision intelligente y repasse vite les mêmes énoncés. L'UE 2 (5,8), l'UE 3 (6,3) et l'UE 4 (5,4) sont correctes.

**Proposition.** Un lot complémentaire d'environ 150 exercices ciblé sur les notions à 3-4 exercices : UE 1 +50, UE 5 +50, UE 6 +50, pour amener chaque notion à 5 au moins. Même méthode (rédacteur + relecteur indépendant).

## 3. Interface et parcours

Points relevés, par ordre d'impact :

1. **Aucun chemin de l'exercice vers la fiche.** La correction affiche la référence mais pas de lien « Voir la fiche » ; le bilan de session ne liste pas les notions à revoir. L'utilisateur qui rate un exercice doit retrouver la notion dans l'arbre des cours.
2. **Écran Cours peu praticable sur mobile** : arbre repliable à trois niveaux, intitulés officiels longs, aucun indicateur de maîtrise ni de fiche déjà lue. Proposer une page par UE avec les thèmes en cartes, la couleur de maîtrise par notion (déjà calculée pour la carte de chaleur) et un marqueur « fiche lue ».
3. **Fiche** : pas de navigation « notion précédente / suivante » dans le thème, pas de notions liées, pas de marque-page.
4. **Écriture comptable** : saisie du numéro de compte sans aide. Proposer l'autocomplétion sur les libellés du plan de comptes (liste PCG embarquée, 100 comptes usuels suffisent) et un bouton « équilibrer » qui complète la dernière ligne.
5. **Cas pratiques sur mobile** : contexte de 10 à 20 lignes qui défile hors de vue pendant les sous-questions ; le rendre repliable et accessible depuis chaque sous-question.
6. **Session** : le chrono affiche « 0:00 » puis le temps écoulé dans les modes sans limite (ambigu : le présenter comme un chronomètre et non un compte à rebours) ; pas de bouton « passer » ; « Terminer » sans confirmation ; un examen blanc interrompu est perdu.
7. **Progression** : pas de courbe dans le temps (réussite et volume par semaine), pas de répartition par type d'exercice (où je rate : calculs, écritures, QCM), historique non filtrable.
8. **Desktop** : une seule colonne de 768 px ; l'espace à droite est perdu sur un écran large. Sur la fiche et l'exercice, une colonne latérale (sommaire, notions liées, fiche en regard de l'exercice) tirerait parti de la largeur.
9. **Identité visuelle** : palette uniforme bleu marine, pas d'icône par type d'exercice, pas de couleur par UE. Une couleur par UE (reprise dans les badges, la carte de chaleur et les cartes de cours) aiderait à se repérer.
10. **PWA** : aucune invitation à installer l'application, aucun signal quand une nouvelle version est disponible (le service worker se met à jour en silence au prochain chargement).
11. **Réglages** : il n'existe aucun écran de réglages (objectif quotidien, taille des sessions, remise à zéro de la progression, thème).

## 4. Fonctionnalités manquantes

- **Mode flashcards** : les 70 flashcards ne sont jouables qu'au hasard des sessions ; un mode « cartes » par UE ou thème (recto/verso, « je savais / à revoir », dos de la carte lié à la fiche) manque, et c'est le format naturel du vocabulaire UE 6 et des seuils fiscaux.
- **Objectif quotidien et planning de révision** : un objectif (par ex. 15 exercices par jour) avec anneau de progression sur l'accueil, et un planning « J-30 avant l'épreuve » qui répartit les thèmes d'une UE.
- **Reprise d'un examen blanc** interrompu (réponses sauvegardées en IndexedDB au fil de l'eau).
- **Marque-pages** : « à revoir plus tard » sur un exercice ou une fiche, listés dans Progression.
- **Statistiques par type d'exercice** et courbe hebdomadaire.
- **Fiches imprimables** : page d'impression d'une UE entière (CSS print), utile pour réviser sur papier.
- **Mise à jour de l'application** : bandeau « nouvelle version disponible, recharger ».
- **Remise à zéro de la progression** (après export).

## 5. Points techniques

- Lighthouse : performance 97-98, accessibilité, bonnes pratiques et SEO 100 sur les écrans principaux ; la recherche avec requête reste lente au premier chargement (téléchargement de tout le contenu).
- Le rendu Markdown maison suffit aux fiches actuelles ; les visuels demandent un bloc dédié (voir § 1) plutôt qu'un moteur Markdown complet.
- Les fiches sont chargées une par une à la demande ; une page par UE imprimable demandera un chargement groupé (déjà disponible pour la recherche : `loadAllCourses`).

## 6. Plan proposé

| Phase | Contenu | Estimation |
| --- | --- | --- |
| 6. Cours enrichis | Fiches à 25-30 lignes (exemple résolu, pièges, notions liées, glossaire UE 6) ; composant de diagrammes SVG et environ 120 visuels | 90 à 120 $ (25 lots, rédacteur + relecteur) |
| 7. Interface | Points 1 à 11 du § 3 et fonctionnalités du § 4 (flashcards, objectif, reprise d'examen, marque-pages, statistiques, impression, mise à jour, réglages) | 40 à 60 $ (travail direct) |
| 8. Exercices complémentaires | Environ 150 exercices sur les notions à 3-4 exercices (UE 1, 5, 6) | 25 à 35 $ (6 lots) |

Ordre conseillé : 7 d'abord (visible tout de suite, moins coûteux, et le composant de diagrammes y est posé), puis 6, puis 8.
