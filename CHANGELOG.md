# Journal des versions

## 1.4.1 (octobre 2026)

Contenu vérifié sur les textes officiels.

- **Textes officiels téléchargés et confrontés au contenu** : codes en vigueur (commerce, CGI, travail, civil, sécurité sociale), PCG et règlement ANC 2020-01 consolidés au 1er janvier 2026, référentiel des NEP de la H2A, IFRS adoptées (règlement 2023/1803 consolidé au 8 mars 2026), BOFiP en vigueur. 4 200 références contrôlées automatiquement (`npm run check:refs`), puis 8 lots relus par des agents ayant le texte officiel sous les yeux.
- **Corrections de fond**, entre autres : comptes de provisions du PCG 2026 (152x), articles du Code de commerce renumérotés (L. 821-x, devoir de vigilance en L. 225-102-1), NEP 600 et 9510 révisées, obligation de consolider limitée au contrôle exclusif ou conjoint, régime de faveur des apports partiels d'actif (plus d'engagement de conservation pour une branche complète), dispense d'agrément pour les déficits jusqu'à 200 000 €, fin de la neutralisation des abandons de créances en intégration fiscale, méthodes de référence et changements de méthode du PCG, délais et sanctions de la profession de commissaire aux comptes, Conseil national de l'Ordre.
- **IFRS 18** présentée comme la norme de présentation des états financiers pour la session 2027 (IAS 1 supprimée par le règlement 2026/338, exercices ouverts à compter du 1er janvier 2027) ; IAS 7 modifiée (classement des intérêts et dividendes).
- Autocomplétion des comptes alignée sur la nomenclature du PCG 2026.

## 1.4.0 (octobre 2026)

Préparation à l'examen et fiabilité, à la suite de l'audit de la version 1.3 (`docs/audit-v2.md`).

- **Sujets type d'examen** : dix dossiers longs corrigés (deux par UE écrite, 60 à 90 minutes, notés sur 20), avec contexte d'entreprise, 4 ou 5 annexes dépliables et 10 à 12 questions enchaînées ; listés dans « S'entraîner » et intégrés à l'examen blanc (jusqu'à 60 % de sa durée).
- **Oral d'UE 6** : 20 sujets en anglais, tirage au sort, préparation, exposé et entretien chronométrés aux durées de l'épreuve, notes, enregistrement de l'exposé (gardé sur l'appareil), plan type, vocabulaire, questions du jury et grille d'auto-évaluation sur 20 avec historique.
- **Mon examen** : date d'examen et UE passées (réglages), compte à rebours, plan de révision à rebours avec rythme quotidien conseillé, séance du jour limitée aux UE de l'examen, **test de positionnement** par UE (un exercice par thème), rappel quotidien à ajouter à l'agenda (fichier .ics).
- **Contenu** : 148 exercices ajoutés pour que chaque notion en compte au moins 5 (UE 1, 5 et 6) ; 1 558 exercices, tous relus de façon indépendante. Quatre fiches corrigées (vigilance anticorruption, intérêts déductibles, rapport d'audit en anglais, plus-values de cession d'entreprise).
- **Progression protégée** : stockage persistant demandé au navigateur, date de la dernière sauvegarde, rappel de sauvegarde quand la progression n'est pas garantie (notamment dans Safari sur iPhone, qui efface les données d'un site non installé après 7 jours sans visite).
- **Fiabilité** : erreurs de l'application gardées sur l'appareil, visibles dans les réglages et signalables en un clic, écran de secours au lieu d'une page blanche ; tests de bout en bout (Playwright) lancés à chaque push avant le déploiement ; plus de décalage de mise en page à l'ouverture de l'accueil.

## 1.3.0 (octobre 2026)

Lisibilité des fiches de cours.

- **Mise en page structurée des 271 fiches** : références discrètes en tête, enjeu en encadré, règles titrées, formules isolées une par ligne, exemple en carte avec les calculs détachés, erreurs fréquentes présentées « erreur → bonne règle », points à retenir cochés, notions liées en pastilles, glossaire de l'UE 6 en deux colonnes.
- Renvois aux articles et paragraphes atténués dans le texte, montants jamais coupés en fin de ligne, raccourcis vers les sections sur téléphone, sommaire cliquable sur grand écran.
- **Diagrammes lisibles sur téléphone** : barres avec libellés et valeurs en texte, organigrammes avec flèches de sens, liens réciproques et liens contournant les boîtes.
- Page d'impression d'une UE sur la même mise en page ; étiquette de thème qui débordait sur mobile corrigée.

## 1.2.0 (octobre 2026)

Cours enrichis et visuels, deuxième phase issue de l'audit de la version 1.0 (`docs/audit-v1.md`).

- **271 fiches de cours réécrites** (22 à 30 lignes chacune), toutes relues de façon indépendante, avec une structure fixe : enjeu, règles développées, **exemple chiffré résolu**, **erreurs fréquentes à l'examen** (tirées des distracteurs des QCM de la notion), « À retenir », **notions liées** (1 054 liens entre fiches) ; glossaire anglais → français dans les 20 fiches de l'UE 6.
- **172 diagrammes** (frises, arbres de décision, organigrammes, flux, barres) dans les fiches qui s'y prêtent.
- Droit et normes mis à jour à octobre 2026 pendant la relecture : seuils d'exemption de consolidation (décret 2024-152), numérotation L. 821-x du Code de commerce (ordonnance 2023-1142), IFRS 18 adoptée par l'UE (règl. 2026/338), directive Omnibus I (2026/470), règlement omnibus IA (2026/1744), comptes du règl. ANC 2022-06 ; deux exercices sur les droits d'enregistrement des fusions corrigés (gratuité depuis 2019, CGI art. 816).
- Fiche de cours : bouton « S'entraîner » et navigation affichés avec la fiche, plus de décalage de mise en page à l'arrivée du texte.

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
