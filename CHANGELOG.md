# Journal des versions

## 1.1.0 (octobre 2026)

Interface et parcours, à la suite de l'audit de la version 1.0 (`docs/audit-v1.md`).

- **Cours** : entrée par UE avec l'avancement, page d'UE avec le niveau de maîtrise de chaque notion et les fiches déjà lues, navigation notion précédente / suivante, sommaire et notions du thème sur grand écran, fiches d'une UE à imprimer, diagrammes (frises, arbres de décision, organigrammes, flux, barres) et liens entre fiches.
- **Exercices** : lien vers la fiche de cours et marque-page « à revoir plus tard » depuis la correction, notions à revoir dans le bilan, autocomplétion des comptes PCG et bouton « Équilibrer » dans les écritures, énoncés de cas repliables.
- **Sessions** : mode flashcards, reprise d'un examen blanc interrompu, bouton « Passer », confirmation avant d'arrêter, chronomètre explicite.
- **Accueil et progression** : objectif quotidien, activité des huit dernières semaines, réussite par type d'exercice, historique filtrable.
- **Réglages** : objectif, taille des sessions, thème, export, import, remise à zéro, installation de l'application ; bandeau « nouvelle version disponible ».
- Couleur d'identité par UE, icône par type d'exercice, mise en page élargie sur grand écran.

## 1.0.0 (octobre 2026)

Première version complète, conforme au cahier des charges (`SPEC.md`).

**Contenu**
- 1 400 exercices, tous relus de façon indépendante : UE 1 (200), UE 2 (250), UE 3 (100), UE 4 (700), UE 5 (80), UE 6 (70, en anglais).
- 8 types : QCM, vrai / faux, calcul, écriture comptable, cas pratique, cas de consolidation, cas d'audit, flashcard.
- 271 fiches de cours, une par notion du programme (arrêté du 4 août 2025).

**Entraînement**
- Session rapide (10 questions, 5 minutes), session par UE, thème ou notion.
- Révision intelligente par répétition espacée (SM-2, une revue par notion et par jour).
- Mode erreurs, examen blanc chronométré à la durée de l'épreuve, noté sur 20 et corrigé à la fin.
- Correction détaillée : écritures compte par compte, réponses rédigées autocorrigées par points clés.

**Progression**
- Taux de réussite par UE, thème et notion, niveaux de maîtrise, carte de chaleur du programme.
- Série de jours, temps passé, historique des sessions, export et import JSON.

**Qualité de vie**
- Application installable (PWA), hors ligne, mode sombre, raccourcis clavier (1-9, Entrée, « / » pour la recherche).
- Recherche plein texte dans les cours et les exercices.
- Bouton « signaler une erreur » qui ouvre une issue GitHub pré-remplie.
