# Journal des versions

## 1.6.0 (octobre 2026)

Suites de l'audit v4 (`docs/audit-v4.md`) : mode épreuve, ergonomie, contenu.

- **Vrai mode épreuve** (examen blanc et sujet complet) : palette de navigation entre les exercices (traité, commencé, à faire), boutons Précédent / Suivant, questions d'un dossier affichées d'emblée et traitées dans l'ordre voulu, réponses retrouvées verrouillées, alertes à 15 et 5 minutes de la fin ; tout exercice commencé est noté au prorata à la fin.
- **Annexes à portée de main** : sur grand écran, énoncé et annexes des sujets type d'examen fixés à gauche des questions ; sur mobile, bouton « Annexes » qui les ouvre en plein écran.
- **30 sujets type d'examen** (dix nouveaux, six par UE écrite) : LBO et pacte d'associés, conformité et responsabilité des dirigeants (UE 1) ; couverture de change et de taux, LBO et évaluation (UE 2) ; masse salariale et tableau de bord, risques et projet (UE 3) ; variations de périmètre, audit et opinion avec réserve (UE 4) ; migration SaaS, automatisation et IA (UE 5).
- **Explication de chaque option** aussi pour les 256 QCM posés dans les cas : tous les QCM de l'application en ont une, relue.
- **Accueil à une seule action** : « Séance du jour » quand un examen est à venir, sinon « Réviser », sinon « Commencer » ; un seul objectif quotidien (celui du plan d'examen quand il existe).
- **S'entraîner regroupé** en quatre familles (Réviser, Cibler, Examen, Oral), sur deux colonnes en grand écran, avec la dernière UE choisie retenue ; largeur de lecture limitée pour les exercices sur grand écran.
- **Vérification** : le Code pénal est désormais téléchargé et ses articles cités sont contrôlés par `npm run check:refs`.
- **Dépendances** : Dependabot ne propose plus de version majeure (migrations à faire à part) et groupe les mises à jour mineures.

## 1.5.1 (octobre 2026)

- **Mises à jour** : l'application installée ou laissée ouverte vérifie maintenant les nouvelles versions au retour au premier plan et toutes les heures (auparavant seulement à une ouverture complète) ; bouton « Vérifier les mises à jour » et numéro de version dans les réglages.

## 1.5.0 (octobre 2026)

Finalisation, à la suite de l'audit de la version 1.4.2 (`docs/audit-v3.md`) ; nouvel audit complet dans `docs/audit-v4.md`.

- **Sujet complet** : nouveau mode qui enchaîne des dossiers type d'examen à la durée officielle de l'épreuve (3 ou 4 h), sans correction avant la fin, noté sur 20 et reprenable s'il est interrompu.
- **20 sujets type d'examen** (dix nouveaux, deux par UE écrite) : transmission Dutreil et fiscalité internationale (UE 1), financement d'une acquisition et trésorerie (UE 2), coûts et ABC, décarbonation et GEPP (UE 3), IFRS d'un groupe et fusion avec mali (UE 4), cybersécurité et DORA, données et IA (UE 5).
- **Explication de chaque option** des 625 QCM : pourquoi chaque réponse est juste ou fausse, affichée sous l'option après la réponse ; toutes relues de façon indépendante.
- **Correction guidée des réponses rédigées** : les points clés dont les mots-clés figurent dans la copie sont repérés et pré-cochés ; l'utilisateur garde la main sur son auto-évaluation.
- **Note prévisionnelle** par UE, tirée des trois derniers examens blancs ou sujets complets (page Progression).
- **Difficulté adaptative** dans la révision intelligente : le niveau des exercices proposés monte avec la réussite récente sur la notion.
- **Date de dernière révision** sous chaque fiche de cours.
- **Contenu vérifié sur les textes officiels** : fiches IFRS détaillées (IAS 2, 8, 12, 16, 19, 36, 37, 38, 40, IFRS 3, 9, 10, 15, 16, information sectorielle), toute l'UE 3 et toute l'UE 6 ; corrections de fond, entre autres sur le bilan d'émissions de gaz à effet de serre (scope 3, R. 229-47), la négociation sur la GEPP, l'affectation du mali technique (PCG 745-5), les amendes RGPD (art. 83), IFRS 18 et ISA 570 révisée.
- **Performance** : chargement du contenu fichier par fichier (une page d'exercice ne charge que son fichier, une session que le dossier de son thème), plus aucun décalage de mise en page (bandeaux d'installation et de mise à jour flottants) ; Lighthouse mobile 94 à 97 sur les pages principales, session rapide au premier chargement de 14 s à 3 s.
- **Sécurité** : politique de sécurité du contenu (CSP) en balise meta, fichier de progression importé validé (schéma et taille maximale), liens internes stricts, Zod sans eval, actions GitHub épinglées par empreinte et mises à jour par Dependabot ; CI lancée une seule fois par push.
- **Audit UX indépendant** (mobile et desktop, clair et sombre) et corrections : corrigé caché pendant l'examen, dossier commencé noté au prorata, impression toujours lisible, recherche sans touche perdue, chrono collant, pas de barre de navigation en session, relecture des réponses dans le bilan, liste « À revoir plus tard », 31 comptes ajoutés à l'aide à la saisie, messages de l'oral sans micro, corrigés en Markdown.
- **Accessibilité** : focus clavier visible, lien « Aller au contenu », contrastes en thème sombre, cibles tactiles d'au moins 40 px, options de QCM et barre d'avancement correctement nommées pour les lecteurs d'écran.

## 1.4.2 (octobre 2026)

Deuxième série de vérifications sur les textes officiels : tout le reste de l'UE 1, l'audit (démarche, rapport, cycles, durabilité), les SI (UE 5) et les passages normatifs de l'UE 2.

- **Nouvelles sources** : texte intégral des 42 NEP (H2A), BOFiP TVA, Dutreil, prix de transfert, charges financières et fiscalité internationale, textes de l'Union (règlement 537/2014, NIS 2, DORA, CSRD, AI Act, Data Act, Omnibus I).
- **Corrections de fond**, entre autres :
  - **Droit** : seuils de notification des concentrations relevés à 250 M€ / 80 M€ (loi 2026-403, 1er septembre 2026) ; SA à 2 actionnaires même cotée ; période d'observation de 12 mois en sauvegarde ; titres participatifs réservés à certains émetteurs ; fin de la limite de trois mandats au CSE.
  - **Fiscalité** : art. 212 étendu aux entreprises associées ; engagement individuel Dutreil de 6 ans ; recodification de la TVA dans le CIBS au 1er janvier 2027 signalée.
  - **Audit** : événements postérieurs selon la NEP 560 (et non l'ISA) ; risques de fraude et NEP 240 / 315 ; NEP 501 limitée à l'inventaire ; observation obligatoire en cas de changement de méthode ; informations des avocats selon la NEP 501.
  - **Comptabilité** : comptes supprimés du PCG 2026 (6788, 4486, 4687, 7624, 675 / 775, 6312…) ; pertes de change commerciales en 656 ; déport d'un contrat de change étalé en résultat financier.
  - **Durabilité et SI** : exemption des filiales étendue aux EIP par Omnibus I ; taux de fréquence ESRS S1-14 sur les accidents enregistrables ; état de la transposition de NIS 2 ; report du haut risque de l'AI Act.
- **Vérification automatique** : `npm run check:refs` signale aussi les sous-comptes absents de la nomenclature 2026 (sauf ventilation prévue par le PCG).

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
