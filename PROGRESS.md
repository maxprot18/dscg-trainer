# PROGRESS — DSCG Trainer

Dernière mise à jour : 2026-10-04, fin de la session phase 6 (cours enrichis et visuels, version 1.2.0). Phase 8 (exercices complémentaires) à venir, voir `docs/audit-v1.md`.

## État par phase

| Phase | État |
| --- | --- |
| 0. Cadrage | Terminée, fusionnée dans `main` et déployée sur https://maxprot18.github.io/dscg-trainer/ (2026-10-04) |
| 1. Moteur | Terminée (voir ci-dessous) |
| 2. Contenu UE 4 | Terminée (voir ci-dessous) |
| 3. Contenu UE 1, 2, 3, 5, 6 | Terminée (voir ci-dessous) |
| 4. Progression | Terminée (voir ci-dessous) |
| 5. Finitions | Terminée : version 1.0.0 (voir ci-dessous) |
| 7. Interface (audit v1) | Terminée : version 1.1.0 (voir ci-dessous) |
| 6. Cours enrichis et visuels | Terminée : version 1.2.0 (voir ci-dessous) |
| 8. Exercices complémentaires | À faire (phase suivante) |

## Phase 0 : ce qui est fait

- `SPEC.md` : le cahier des charges importé (« Cahier des charges — Appli d'entraînement Audit & DSCG.md ») a été renommé `SPEC.md`, comme le prévoit l'étape 1 du document.
- `CLAUDE.md` : règles de travail (commits conventionnels, pas de contenu copié, relecture par sous-agent, tests verts avant push, PROGRESS.md à jour), commandes, organisation du code, conventions de contenu.
- Squelette : Vite 8 + React 18.3 + TypeScript 6 (strict), Tailwind CSS 4 (`@tailwindcss/vite`), shadcn/ui (thème slate, composants `button`, `card`, `badge`, `progress`), React Router 7, Dexie 4, Zod 4, Vitest 5 + Testing Library + fake-indexeddb, vite-plugin-pwa 2 (manifest, service worker, icônes générées depuis `public/favicon.svg`), oxlint.
- Les 4 écrans existent en coquilles : Accueil (bouton « S'entraîner », compteurs), S'entraîner (en attente du moteur), Cours (arbre de la taxonomie), Progression (bouton d'export JSON).
- `src/db/db.ts` : tables `attempts`, `reviews`, `sessions`, avec export et import JSON testés.
- `content/taxonomy.json` : 6 UE, 41 thèmes, 271 notions (UE1 43, UE2 43, UE3 16, UE4 129 dont 50 pour les cycles d'audit, UE5 20, UE6 20). Chaque UE porte ses modalités d'épreuve et chaque notion ses renvois (`refs`).
- `src/content/schema.ts` : schémas Zod des 8 types d'exercices et de la taxonomie. `scripts/validate-content.ts` (`npm run validate`, `npm run validate:strict`) vérifie le format, l'unicité des ids, le rattachement à la taxonomie, le rangement des fichiers et les fiches de cours.
- `.github/workflows/deploy.yml` : sur chaque push et chaque PR vers main, le workflow lance lint, validate, test et build ; sur `main`, il déploie en plus sur GitHub Pages. `.github/dependabot.yml` est réglé sur une fréquence mensuelle.
- 5 exercices d'exemple, tous relus par un sous-agent indépendant qui a recalculé les réponses et passés en `verified: true` :
  - QCM IAS 16, approche par composants ;
  - calcul de VAN (19 781,30 €, ±1 %) ;
  - écriture de provision pour litige (6815 / 1511) ;
  - flashcard goodwill partiel ou complet (IFRS 3), corrigée par le relecteur pour préciser que les actifs nets sont évalués « en règle générale » à la juste valeur ;
  - cas d'audit ventes-clients sur la séparation des exercices.
- Vérifications locales : `lint` OK, `validate:strict` OK, 80 tests verts, build OK. Smoke test dans Chromium sur le build de prod servi sous `/dscg-trainer/` : l'app s'affiche, la navigation fonctionne, le service worker est enregistré, aucune erreur console.

## Phase 1 : ce qui est fait

- **Moteur pur (`src/engine/`)**, testé sans interface :
  - `parts.ts` découpe chaque exercice en parties notées séparément : choix, vrai/faux, calcul, écriture, réponse rédigée, flashcard. Un QCM, un calcul ou une écriture ont une partie ; un cas pratique ou un cas de conso ont une partie par sous-question, pondérée par son barème ; un cas d'audit a trois parties (procédures 50 %, risque 25 %, conclusion 25 %).
  - `grading.ts` corrige chaque partie puis combine les notes. QCM à réponse unique : tout ou rien ; à réponses multiples : (bonnes − mauvaises) / nombre de bonnes. Calcul : saisie au format français (« 19 781,30 € »), tolérance absolue ou relative. Écriture : correction **compte par compte** sur le solde net de chaque compte (ordre des lignes libre, lignes d'un même compte additionnées, sous-compte plus détaillé accepté, ex. 44566 pour 4456), avec verdict par compte : juste, montant faux, sens inversé, manquant, en trop.
  - `session.ts` / `sessionConfig.ts` : la session rapide prend 10 exercices mélangés, en priorité courts (≤ 3 min estimées), avec un chrono de 5 min ; la session par thème filtre sur une UE, un thème ou une notion, 20 exercices au plus, triés par difficulté. La config et la graine sont dans l'URL (`/session?mode=…&seed=…`), donc un rechargement redonne la même série.
  - `recorder.ts` : chaque session et chaque tentative (réponse, note, durée) sont écrites dans IndexedDB.
- **Interface** :
  - `ExercisePlayer` affiche l'énoncé (organigramme pour les cas de conso, cycle et assertions pour les cas d'audit) puis enchaîne les parties : la suivante n'apparaît qu'une fois la précédente validée. À la fin : note sur le barème, correction détaillée, référence.
  - Un composant de saisie et de correction par genre de partie (`parts.tsx`). Réponses rédigées autocorrigées : l'utilisateur rédige, affiche le corrigé type, puis coche les points clés présents dans sa réponse.
  - Raccourcis clavier : 1-9 pour répondre, Entrée pour valider ou passer à la suite, ignorés pendant la saisie dans un champ.
  - Écran S'entraîner (session rapide, choix UE > thème > notion avec le nombre d'exercices disponibles), écran de session (progression, chrono, abandon), bilan (score, liste des exercices réussis ou à revoir, relance).
- **Contenu : 50 exercices, tous `verified: true`**, couvrant les 6 UE et les 8 types :
  - par type : 13 QCM, 7 vrai/faux, 8 calculs, 7 écritures, 4 cas pratiques, 3 cas de conso, 4 cas d'audit, 4 flashcards ;
  - par UE : UE4 32, UE2 10, UE1 4, UE3 1, UE5 1, UE6 2.
  - Rédaction en 4 lots thématiques parallèles, puis relecture de chaque lot par un sous-agent indépendant qui a résolu chaque énoncé avant de lire le corrigé. Environ 15 exercices ont été retouchés ; corrections notables : énoncé du cas de partage des capitaux propres complété (écart d'acquisition non amorti), conclusion du cas trésorerie (révélation des faits délictueux : Code de commerce et non NEP 240), numéros d'articles du Code de commerce mis à jour après l'ordonnance 2023-1142 (L. 821-44 pour la durée du mandat), distracteur faux dans le QCM de couverture de change.
- **Tests** : 129 tests Vitest verts. Ils couvrent la correction de chaque type et ses cas limites, la lecture des nombres, la construction des sessions, l'enregistrement IndexedDB, le jeu de bout en bout de chacun des 8 types dans le lecteur, une session complète avec enregistrement, et l'arrêt au chrono.
- **Smoke test dans Chromium** (serveur de dev, téléphone 390 px) : une session rapide de 10 exercices jouée de bout en bout, bilan affiché, 10 tentatives et la session en IndexedDB, aucune erreur console.

## Phase 2 : ce qui est fait

- **Contenu UE 4 : 700 exercices, tous `verified: true`, et 129 fiches de cours, une par notion de l'UE 4.**
  - Par type : 280 QCM (40 %), 106 vrai/faux, 106 calculs, 69 écritures, 69 cas pratiques, 15 cas de consolidation et 20 cas d'audit, 35 flashcards. C'est la répartition du SPEC à l'unité près.
  - Par difficulté : environ 30 % de niveau 1, 50 % de niveau 2, 20 % de niveau 3.
  - Les vrai/faux sont équilibrés (50/50). Dans les QCM, la bonne réponse est un peu moins souvent en position 1 (18 %) qu'en positions 2 à 4.
  - Les fiches font de 12 à 30 lignes, avec références et section « À retenir ».
- **Méthode.** Le plan est découpé en 25 lots thématiques de 20 à 37 exercices. Il fixe pour chaque lot les notions, le nombre exact d'exercices par type et par difficulté ; il a été calculé pour tenir la répartition du SPEC sur l'ensemble de l'UE.
  - Les rédacteurs (sous-agents) travaillent en parallèle sur des fichiers disjoints : fiches d'abord, puis exercices, avec contrôle par script de la conformité au plan.
  - Chaque lot est ensuite relu par un autre sous-agent, avec la liste des points incertains signalés par le rédacteur. Le relecteur résout chaque énoncé seul, recalcule avec node, puis compare au corrigé.
  - Un commit par lot relu (25 commits `content(ue4-…)`), via un script qui refuse de commiter s'il reste un exercice non vérifié ou si `npm run validate` échoue.
  - Environ 20 % des exercices ont été retouchés à la relecture : surtout des références (numéros d'articles incertains remplacés par le texte cité sans numéro), des hypothèses manquantes ajoutées aux énoncés, et quelques vraies erreurs (distracteurs mal calculés, explications fausses, terminologie d'opinion « défavorable » remplacée par celle de la NEP 700).
- **`docs/content-guide.md`** : guide de rédaction et de relecture, réutilisable en phase 3. Il fixe le format des fiches, les règles par type d'exercice, les tolérances, les conventions de comptes à annoncer dans l'énoncé, le renvoi aux options par numéro et les règles de consolidation ANC 2020-01.
- **Technique** :
  - **Chargement par UE** : le contenu est chargé UE par UE (`src/content/bundles/ue*.ts`), dans un fichier JS par UE chargé à la demande et mis en cache par le service worker. Le fichier principal ne contient plus les exercices (516 ko, 160 ko compressé). Le fichier de l'UE 4 pèse 1,3 Mo (340 ko compressé) ; la limite de précache est relevée à 5 Mo.
  - **Fiches de cours** : page `/cours/:notion` avec un rendu Markdown minimal maison (sans dépendance, aucun HTML brut interprété) et le bouton « S'entraîner sur cette notion ». L'arbre de l'écran Cours affiche le nombre d'exercices par notion et signale les notions qui ont une fiche.
  - **Validateur** : il exige un titre en tête de fiche et avertit si une fiche sort de 10 à 30 lignes non vides.
  - **Tests** : 133 tests verts. Nouveaux tests : rendu Markdown, page de fiche, contrôle des fiches.

## Phase 3 : ce qui est fait

- **Contenu UE 1, 2, 3, 5, 6 : 700 exercices (existant compris), tous `verified: true`, et 142 nouvelles fiches de cours.** Les 271 notions de la taxonomie ont désormais une fiche.
  - Par UE (cibles du SPEC atteintes à l'unité) : UE1 200, UE2 250, UE3 100, UE5 80, UE6 70. Total de l'application : 1 400 exercices.
  - Par type : UE1 80 QCM / 30 V-F / 30 calculs / 20 écritures / 30 cas / 10 flashcards ; UE2 100 / 38 / 38 / 25 / 37 / 12 ; UE3 40 / 15 / 25 / 0 / 15 / 5 ; UE5 36 / 12 / 12 / 4 / 12 / 4 ; UE6 28 / 11 / 11 / 0 / 10 / 10.
  - Difficulté : 30 % / 50 % / 20 % exactement dans chaque UE.
  - UE 6 rédigée en anglais.
- **Méthode** : celle de la phase 2 (plan de 25 lots de 20 à 37 exercices, rédacteurs en parallèle, relecteur indépendant par lot avec les points incertains du rédacteur, un commit `content(ue…)` par lot via le script de garde). Environ 15 % des exercices retouchés à la relecture. Corrections notables : L. 225-40 (l'intéressé compte pour le quorum, pas pour la majorité), seuil de 40 % de l'art. 238 A, sous-capitalisation intégrée à l'art. 212 bis, privilège de conciliation primé par le superprivilège des salaires, procédure de non-contestation des griefs (supprimée) remplacée par la transaction, mise à jour LF 2026 et LFSS 2026 (Dutreil : engagement individuel de 6 ans ; prélèvements sociaux de 18,6 % sur les plus-values mobilières).
- **Technique** : plugin de build `build/stripUnverified.ts` qui retire les exercices non vérifiés des JSON de contenu au build (testé ; vérifié dans `dist`). Le filtrage à l'exécution de `load.ts` reste en place pour le serveur de dev.
- **Vérifications locales** : lint OK, `validate:strict` OK (100 % des 1 400 exercices vérifiés), 135 tests verts, build OK.

## Phase 4 : ce qui est fait

- **Répétition espacée SM-2 par notion** (`src/engine/srs.ts`, table `reviews`). Chaque tentative met à jour la notion de l'exercice (`recorder.ts`). Une notion est revue au plus une fois par jour : la qualité SM-2 (0 à 5) est tirée de la note moyenne des tentatives du jour sur la notion (réussie à 70 %), recalculée à chaque tentative depuis l'état du début de journée (champ `prior`). Intervalles 1 jour, 6 jours, puis intervalle × facilité ; échec = retour à 1 jour ; échéance au début du jour prévu.
- **Modes d'entraînement** (`src/engine/session.ts`, `sessionConfig.ts`, écran S'entraîner) :
  - révision intelligente : notions échues (les plus en retard, puis les plus difficiles), puis notions jamais travaillées, puis celles dont la révision approche ; 3 exercices au plus par notion (jamais faits, puis ratés, puis les moins récents) ; 20 exercices ;
  - mode erreurs : exercices dont la dernière tentative est ratée, 20 au plus, filtrable par UE dans l'URL ;
  - examen blanc : sujet d'une UE dont la durée estimée remplit la durée de l'épreuve (taxonomie : 4 h, 3 h, 30 min pour l'oral d'UE 6), environ 20 % de questions, 25 % de calculs et écritures, 55 % de cas, sans flashcard ; chrono de l'épreuve ; aucune correction pendant l'épreuve (réponses verrouillées) ; à la fin, note sur 20 pondérée par la durée estimée de chaque exercice et correction de chaque exercice avec les réponses données.
- **Écran Progression** : chiffres clés (exercices faits, réussite récente, temps passé, série de jours, jours d'entraînement, notions maîtrisées), bouton « Réviser les notions du jour », carte de chaleur (une case par notion, 4 niveaux, lien vers la fiche), détail repliable UE > thème > notion (taux sur les 10 dernières tentatives, date de révision, lien d'entraînement), historique des 15 dernières sessions, export et import JSON.
- **Critère de fin : une semaine d'usage simulée** (`src/engine/week.test.ts`) sur le vrai contenu de l'UE 2 : révision intelligente chaque soir, mode erreurs le 3e jour, examen blanc le 6e, puis contrôle de la priorité aux notions échues, de l'espacement (notions à 6 jours dès le 4e soir), de l'apparition de notions nouvelles, de la note d'examen, de la série de 7 jours et de l'aller-retour export / import. La simulation a révélé deux défauts de la première version de SM-2, corrigés (voir décision 31).
- **Tests** : 164 tests verts (SM-2, statistiques, nouveaux modes, lecteur en examen et en relecture, page de session en examen et en erreurs, écran Progression avec import, semaine simulée).
- **Smoke test dans Chromium** (build de prod, 390 px) : révision intelligente jouée, bilan, écran Progression (271 cases, 3 notions travaillées), examen blanc UE 2 lancé (51 exercices, chrono 3:00:00), aucune erreur console.

## Phase 5 : ce qui est fait

- **Mode sombre** (`src/lib/theme.ts`, bouton en tête de page) : préférence système, clair ou sombre, gardée dans le navigateur ; script en tête de `index.html` qui applique le thème avant le premier affichage ; couleur de barre (`theme-color`) adaptée.
- **Recherche plein texte** (`src/engine/search.ts`, `/recherche?q=…`, icône en tête de page et raccourci « / ») dans les 271 fiches et les 1 400 exercices : accents et casse ignorés, tous les mots requis, titre prioritaire, extrait autour du mot trouvé. Page `/exercice/:id` pour jouer un exercice trouvé (tentative enregistrée hors session).
- **« Signaler une erreur »** sous chaque correction et chaque fiche : issue GitHub pré-remplie (id, notion, référence citée, version) ; modèle d'issue « Erreur de contenu » (`.github/ISSUE_TEMPLATE/`).
- **Accueil** : série de jours, notions à réviser, lien vers la révision intelligente et la recherche, version et licence.
- **Performance** : un fichier JS par écran, Zod hors du fichier principal (257 ko au lieu de 569, 84 ko compressé), nombres d'exercices calculés au build. Lighthouse (mobile simulé, build de prod) : performance 97-98, accessibilité, bonnes pratiques et SEO à 100 sur l'accueil, S'entraîner, Cours, une fiche et Progression (accessibilité vérifiée aussi en mode sombre). La recherche avec requête reste lente au tout premier chargement (elle doit télécharger tout le contenu, ensuite en cache).
- **PWA** : Lighthouse 12 n'a plus de catégorie « PWA » (supprimée par Google en 2024) ; le critère « Lighthouse PWA à 100 » a donc été vérifié autrement, dans Chromium : manifeste sans erreur, aucune erreur d'installabilité (`Page.getInstallabilityErrors`, hors le mode navigation privée du test), service worker actif, navigation et session rapide hors ligne.
- **Contenu** : les points ouverts de fond ont été vérifiés par recherche puis relus par un sous-agent indépendant (ANC 2022-06, ANC 2026-03, ANC 2020-01, NEP 315 révisée, carry-back, LFSS 2026, fusions simplifiées, Omnibus I (UE) 2026/470, comptes d'amendes) ; écritures alignées sur le plan de comptes PCG 2025 (23 exercices et 4 fiches : 658x, 657 / 757, 6671 / 7671, 747 ; décision 27 révisée), vérifiées puis relues de la même façon. `validate:strict` : 1 400 exercices sur 1 400 vérifiés.
- **Documentation et version** : `CONTRIBUTING.md`, `CHANGELOG.md`, README avec captures (clair et sombre, `docs/screenshots/`), version 1.0.0 (`package.json`, affichée sur l'accueil et dans les signalements).
- **Tests** : 175 tests verts (thème, recherche, signalement, pages de recherche et d'exercice, taxonomie embarquée).

## Phase 7 : ce qui est fait (interface, après l'audit de la v1)

L'audit `docs/audit-v1.md` (4 octobre 2026) a fixé trois phases hors SPEC, validées par l'utilisateur : 7 interface (faite), 6 cours enrichis avec visuels, 8 exercices complémentaires. Ordre choisi : l'interface d'abord, parce qu'elle pose le composant de diagrammes dont la phase 6 a besoin.

- **Socle** : base locale v2 (table `marks` : marque-pages et fiches lues ; champ `search` des sessions pour la reprise ; export v2, import des v1 et v2, remise à zéro) ; couleur d'identité par UE (`--ue-UE4`, palette catégorielle validée pour les daltonismes, texte jamais dans la couleur) ; icône par type d'exercice.
- **Fiches** : liens internes `[texte](/cours/notion)` et blocs ```` ```diagram ```` (frise, arbre de décision, organigramme, flux, barres) rendus en HTML/SVG adaptés au thème et aux lecteurs d'écran ; schéma Zod `src/content/diagramSchema.ts` vérifié par `npm run validate` (diagrammes et liens vers des notions inconnues) ; lecture légère sans Zod à l'exécution (`src/content/diagram.ts`).
- **Cours** : `/cours` en cartes d'UE avec l'avancement ; `/cours/ue/:ue` avec thèmes, maîtrise, fiche lue, marque-page et nombre d'exercices par notion ; fiche marquée lue à l'affichage, notion précédente / suivante, sommaire et notions du thème en colonne latérale sur grand écran (mise en page élargie à 1 024 px) ; `/cours/ue/:ue/imprimer` avec CSS d'impression.
- **Exercices** : lien « Voir la fiche de cours » et marque-page depuis la correction ; notions à revoir dans le bilan ; autocomplétion des comptes PCG (190 comptes usuels, `src/content/pcg.ts`) et bouton « Équilibrer » ; énoncés de cas repliables.
- **Sessions** : reprise d'un examen blanc interrompu (même sujet, moins de 24 h, réponses et chrono reconstruits depuis les tentatives), bouton « Passer », confirmation avant d'arrêter, chronomètre explicite ; mode flashcards par UE ou thème.
- **Accueil, progression, réglages** : objectif quotidien (anneau), activité des huit dernières semaines (deux graphiques, une mesure chacun), réussite par type d'exercice, historique filtrable ; `/reglages` (objectif, tailles de session, thème, export, import, remise à zéro, installation) ; bandeaux « nouvelle version » (service worker en mode prompt) et « installer ».
- **Vérifications** : 190 tests verts ; smoke test Chromium (session rapide, flashcards, écriture, cours, fiche, progression, mode sombre, grand écran), aucune erreur console ; Lighthouse 95-96 en performance (90 sur la fiche de cours) et 100 en accessibilité, bonnes pratiques et SEO sur tous les écrans mesurés.

## Phase 6 : ce qui est fait (cours enrichis et visuels)

- **271 fiches réécrites** (22 à 30 lignes non vides, un bloc diagramme comptant pour une ligne) selon la structure fixée dans `docs/content-guide.md` : références, **Enjeu**, règles développées, formules, **## Exemple** (chiffré et résolu, recalculé avec node par le rédacteur puis par le relecteur), **## Erreurs fréquentes** (tirées des distracteurs des QCM de la notion), **## À retenir**, **Notions liées** (1 054 liens internes, tous vérifiés par le validateur et le relecteur). UE 6 en anglais avec ligne **Glossary** (20 fiches).
- **172 diagrammes** (cinq formes de la phase 7), soit environ deux fiches sur trois ; chaque libellé, pourcentage ou date vérifié par le relecteur.
- **Méthode** : 27 lots (plan dans le scratchpad de session : `p6/plan.json`, briefs rédacteur et relecteur, script `commit-lot.sh` qui vérifie la longueur, le validateur et commite/pousse le lot), rédacteur puis relecteur indépendant par lot, un commit par lot relu (28 commits de contenu). Deux limites d'usage de l'API ont interrompu 18 agents ; les lots ont été repris sur l'état de l'arbre de travail (fiches partielles listées dans `p6/status.md`).
- **Corrections de fond apportées par les relecteurs** (droit à octobre 2026) : droits d'enregistrement des fusions (gratuité depuis la LF 2019, CGI art. 816 : fiche et deux exercices de `regime-fiscal-faveur-fusions.json` corrigés et relus) ; seuils d'exemption de consolidation 30 M€ / 60 M€ / 250 (D. 230-2, décret 2024-152) ; numérotation L. 821-x confirmée pour les articles les plus cités (L. 821-40, -41, -44 à -46, -49, -50, -53, -54, -56, -63, -67 à -69) ; IFRS 18 adoptée par l'UE (règl. 2026/338, exercices ouverts dès 2027) ; Omnibus I (directive 2026/470) et actes délégués ESRS (3 juillet 2026) et taxonomie (règl. 2026/73) ; omnibus IA (règl. 2026/1744 : haut risque reporté au 2 décembre 2027) ; Data Act (frais de migration supprimés au 12 janvier 2027) ; renumérotation des contrats à long terme (règl. ANC 2026-03, art. 523-x dès 2027) ; comptes du règl. ANC 2022-06 (1522 restructurations, 6673/7673 VMP, 6582 amendes, 121-5 méthodes de référence) ; procédure d'alerte (président du tribunal informé à partir de la phase 2) ; NIS 2 non encore transposée en France au 4 octobre 2026.
- **Interface** : bouton « S'entraîner » et navigation rendus avec la fiche (plus de décalage de mise en page) ; Lighthouse fiche de cours 96 en performance (90 en phase 7), CLS 0,07 (0,16), 100 ailleurs ; aucune erreur console. Captures `fiche.png` (mobile, diagramme) et `fiche-desktop.png` (sombre) refaites.
- **Vérifications** : `npm run lint`, `validate` (271/271 fiches, 172 diagrammes, 1 400 exercices vérifiés), `typecheck`, 190 tests, build : tout vert.

## Décisions prises (et pourquoi)

1. **Programme de référence : arrêté du 4 août 2025** (BOESR n° 32 du 28/08/2025, NOR MENS2523324A). Il s'applique aux épreuves du DSCG à partir de la session 2027, celle que Max préparera ; il remplace l'arrêté du 13/02/2019.
   - Conséquence : l'UE 3 prend l'intitulé officiel « Contrôle de gestion et stratégie » (le SPEC dit « Management et contrôle de gestion »). Le slug `ue3-management-controle` ne change pas.
   - Conséquence : de nouveaux thèmes officiels apparaissent dans la taxonomie, comme l'audit de durabilité (CSRD/ESRS) et l'IA, NIS 2 et DORA en UE 5.
2. **Le programme officiel et le SPEC sont fusionnés.** Le champ `official` de chaque thème indique d'où il vient : `true` pour le programme officiel, `false` pour un ajout du SPEC.
   - Thèmes ajoutés depuis le SPEC : les IFRS norme par norme (le programme 2025 n'a plus de bloc IFRS autonome), PCG et comptes annuels, cycles d'audit, et en UE 1 droit des sociétés, fiscalité IS/TVA/IR et droit social.
3. **UE 6 : l'intitulé officiel est bien « Anglais des affaires »**, d'après les recoupements. Aux 3 thèmes officiels regroupés s'ajoutent 2 thèmes du SPEC : vocabulaire comptable et financier, lecture de rapports annuels. Le slug `ue6-economie-anglais` a été choisi avant la vérification et il est conservé ; on peut le renommer tant qu'aucun exercice UE 6 n'existe.
4. **Durées d'examen : on suit l'officiel**, à savoir 4 h pour les UE 1, 3 et 4, 3 h pour les UE 2 et 5, et un oral pour l'UE 6. Le SPEC disait « 4 h (UE 4) ou 3 h ». L'examen blanc (phase 4) lira `exam.duration_minutes` dans la taxonomie.
5. **Cycles d'audit : 3 niveaux, pas 4.** On garde l'arbre UE > thème > notion avec un thème `cycles-audit` qui contient, pour chaque cycle, 5 notions (assertions, risques, contrôles clés, procédures substantives, pièges). Le champ `group` regroupe les notions par cycle.
6. **Fichiers de contenu : `content/<slug-ue>/<theme>/<notion>.json`** au format `{ "exercises": [...] }`. Le SPEC dit « un fichier par thème » mais son exemple montre un fichier par notion. Le validateur accepte les deux tant que le fichier est sous le dossier de son UE.
7. **Noms des types d'exercices** : `mcq`, `true_false`, `numeric`, `journal_entry`, `case_study`, `consolidation_case`, `audit_case`, `flashcard`. Les champs suivent le SPEC (`expected_value`/`tolerance`, `entries`, `sub_questions` + barème, `front`/`back`). Les cas pratiques et les cas de conso utilisent des sous-questions typées (`kind` : mcq, true_false, numeric, journal_entry ou open, ce dernier étant une réponse rédigée autocorrigée).
8. **Exercices non vérifiés** : `npm run validate` ne fait qu'avertir ; `validate:strict` les refuse (critère de fin des phases 2 et 3). En production, `src/content/load.ts` les filtre ; en dev, ils sont visibles.
9. **Routage** : `BrowserRouter` avec `basename` égal à `/dscg-trainer/`. La CI copie `index.html` en `404.html` pour les liens profonds, et le service worker sert l'app hors ligne.
10. **shadcn/ui** : le registre `ui.shadcn.com` est bloqué par la politique réseau de l'environnement cloud. `components.json` est en place et les 4 composants de base ont été écrits à la main, à l'identique du style new-york. En local, `npx shadcn@latest add …` fonctionne normalement.
11. **Contenu chargé en eager** (`import.meta.glob`) : c'est suffisant pour quelques centaines de Ko. À revoir en phase 2 (chargement paresseux par UE) si le bundle dépasse environ 1 Mo.
12. **Cibles** : la somme des cibles par UE du SPEC fait 1 400 questions et non 1 500. Les `target_v1` reprennent les chiffres par UE.
13. **(Phase 1) Seuil de réussite des exercices composites : 70 %** du barème (`PASS_THRESHOLD`). Ce seuil vaut aussi pour une réponse rédigée seule (part des points clés cochés). Un exercice à une partie est réussi seulement s'il est entièrement juste (QCM multiple : crédit partiel dans la note, mais « réussi » uniquement si la réponse est exacte).
14. **(Phase 1) Réponses rédigées autocorrigées** (conclusions d'audit, questions ouvertes des cas) : pas de correction automatique d'un texte libre. L'utilisateur compare sa réponse au corrigé type et coche les points clés. C'est déclaratif, mais c'est fidèle à la méthode de révision.
15. **(Phase 1) Flashcards** : « Je savais » vaut réussite et « À revoir » échec. Ce signal alimentera la répétition espacée en phase 4.
16. **(Phase 1) Écritures** : la correction se fait sur le solde net par compte. Deux lignes du même compte sont additionnées, et un débit et un crédit sur le même compte se compensent. Un sous-compte plus détaillé que l'attendu est accepté, pas l'inverse (681 refusé pour 6815). Montants justes à 0,50 € près.
17. **(Phase 1) Session par thème** : 20 exercices au plus, tirés au hasard puis triés du niveau 1 au niveau 3. Pas de chrono, contrairement à la session rapide.
18. **(Phase 1) Raccourcis clavier** livrés dès cette phase (prévus en phase 5) : ils étaient nécessaires pour tester le flux.
19. **(Phase 2) Cible de 700 pour l'UE 4, existant compris** : 32 exercices existaient, 668 ont été ajoutés. Allocation par thème au prorata du nombre de notions (≈ 5,4 exercices par notion), soit 270 pour les 50 notions des cycles d'audit.
20. **(Phase 2) « 5 % de cas de conso ou d'audit »** : 15 cas de consolidation (thèmes consolidation et comptes de groupe) et 20 cas d'audit (un ou deux par cycle).
21. **(Phase 2) Cycles d'audit : un fichier par cycle** (`cycles-audit/<cycle>.json`) plutôt qu'un fichier par notion, pour garder ensemble les 27 exercices d'un cycle.
22. **(Phase 2) Consolidation en normes françaises** : contrôle conjoint traité par intégration proportionnelle en ANC 2020-01, sans distinction coentreprise / activité conjointe. La relecture du lot conso-a l'a établi d'après les recueils ANC, et l'exercice de phase 1 qui disait « mise en équivalence » a été corrigé. En IFRS 11 : coentreprise = mise en équivalence.
23. **(Phase 2) Références incertaines** : quand un numéro d'article ou de paragraphe n'a pas pu être confirmé (Légifrance, ANC et BOFiP étaient bloqués par le proxy pour la plupart des relecteurs), on cite le texte sans numéro plutôt qu'un numéro douteux. Cela vaut surtout pour la numérotation L. 821-x issue de l'ordonnance 2023-1142 (seul L. 821-44 est confirmé) et pour celle du Code de commerce issue de l'ordonnance 2023-393 (fusions).
24. **(Phase 2) Renvoi aux options par numéro** : les explications désignent les options par leur numéro (l'interface les numérote de 1 à 4), jamais par une lettre. Un contrôle par script sur tout le contenu n'a trouvé qu'un cas, corrigé.

25. **(Phase 3) Répartition des types hors UE 4** : les « 5 % de cas de conso ou d'audit » du SPEC n'ont pas d'objet hors UE 4 ; ils sont remplacés par des cas pratiques. Pas d'écritures en UE 3 et UE 6 (remplacées par des calculs ou des flashcards), 5 % seulement en UE 5. Mix retenu : UE1/UE2 40 % QCM, 15 % V-F, 15 % calculs, 10 % écritures, 15 % cas, 5 % flashcards ; UE3 40/15/25/0/15/5 ; UE5 45/15/15/5/15/5 ; UE6 40/15/15/0/15/15 (plus de flashcards, utiles pour le vocabulaire).
26. **(Phase 3) Rattachements** : affacturage, escompte, Dailly et crédit-bail sont traités dans la notion financement-fonds-propres-obligataire (UE 2) et dans financements-court-terme pour la trésorerie.
27. **(Phase 3, révisée en phase 5) Comptes après le règl. ANC 2022-06** : en phase 3, les comptes 67x / 77x étaient imposés par l'énoncé sans affirmer leur nouveau classement. En phase 5, les écritures ont été alignées sur le plan de comptes PCG 2025 après vérification et relecture indépendante : 6711 → 6581, 6712 → 6582, 7711 → 7581 ; cessions d'immobilisations corporelles et incorporelles 657 / 757, financières 6671 / 7671 (au lieu de 675 / 775) ; quote-part de subvention d'investissement 747 (au lieu de 777) ; 678 / 778 et 687 / 787 subsistent pour les éléments exceptionnels.
28. **(Phase 3) Paramètres fiscaux 2026** : les taux et seuils susceptibles d'avoir changé (PFU, prélèvements sociaux, CSG) sont donnés en hypothèse dans l'énoncé ; les fiches citent les valeurs vérifiées (LF 2026 n° 2026-103, LFSS 2026).
29. **(Phase 3) Filtrage des non vérifiés au build** (plugin Vite) en plus du filtre à l'exécution : un exercice non relu n'est jamais publié dans les fichiers JS de production.

30. **(Phase 4) SM-2 plutôt que FSRS** : le SPEC laisse le choix. SM-2 tient en quelques lignes, se teste exactement et n'a pas besoin de paramètres appris sur un historique (FSRS en demande des centaines de revues pour être meilleur). L'état est tenu **par notion** (SPEC : « table `reviews` pour l'état de répétition espacée par notion »), pas par exercice.
31. **(Phase 4) Une revue par notion et par jour, sur la moyenne du jour** : avec une revue par tentative, un seul exercice raté sur trois renvoyait la notion à 1 jour et rien n'était jamais espacé (constaté par la semaine simulée). L'échéance est aussi ramenée au début du jour prévu, sinon une notion revue à 19 h 40 n'était pas proposée le lendemain à 19 h. Les tentatives antérieures à la phase 4 (sans état de révision) rendent leur notion échue.
32. **(Phase 4) Niveaux de maîtrise** : taux sur les 10 dernières tentatives de la notion ; « maîtrisé » à 80 % et au moins 3 tentatives, « à revoir » sous 50 %, « en cours » entre les deux, « non travaillé » sans tentative.
33. **(Phase 4) Examen blanc** : la note pondère chaque exercice par sa durée estimée (proxy du barème d'un sujet réel) ; un exercice non traité vaut 0. Les réponses rédigées restent autocorrigées pendant l'épreuve (l'utilisateur doit voir le corrigé type pour cocher les points clés) ; les autres corrections sont différées à la fin. La série est tirée au lancement : un rechargement de la page en cours d'examen recommence l'épreuve (même sujet grâce à la graine, mais réponses perdues).
34. **(Phase 4) Révision intelligente et erreurs tirées sur l'historique du moment** : la série dépend de la progression au lancement ; un rechargement en cours de session peut donc proposer une autre série (la graine de l'URL ne suffit plus à la reproduire).

35. **(Phase 5) Critère « Lighthouse PWA à 100 »** : la catégorie n'existe plus depuis Lighthouse 12. Remplacé par les contrôles d'installabilité de Chromium et un test hors ligne, plus les quatre catégories restantes de Lighthouse.
36. **(Phase 5) Recherche sans index pré-calculé** : le contenu tient en mémoire (1 400 exercices) ; le texte est normalisé une fois à l'ouverture de la page, puis chaque frappe parcourt le tableau. Pas de dépendance (type Fuse ou Lunr) : la recherche exacte par mots, accents ignorés, suffit pour des termes techniques (« IAS 16 », « carry-back »).
37. **(Phase 5) Nombres d'exercices calculés au build** (`__EXERCISE_COUNTS__`, exercices vérifiés seulement) : les écrans s'affichent sans télécharger tout le contenu. En dev, où les exercices non vérifiés sont visibles, ces nombres peuvent être inférieurs à ce qui est jouable.
38. **(Phase 5) Taxonomie embarquée sans relecture Zod** : validée au build (`npm run validate`) et par un test qui compare sa lecture par le schéma ; Zod n'est chargé qu'avec le contenu.

39. **(Phase 7) Diagrammes déclaratifs plutôt qu'images** : un bloc JSON validé au build, dessiné par un composant (HTML pour les formes textuelles, SVG pour l'organigramme et les barres). Thème sombre, accessibilité (titre et description), aucun poids, relecture possible par le validateur. Cinq formes seulement, pour que les rédacteurs de la phase 6 n'aient pas à inventer.
40. **(Phase 7) Zod hors des écrans** : le validateur et les tests utilisent le schéma complet des diagrammes ; l'application fait une lecture légère (JSON + forme connue), le contenu ayant été validé au build. Importer Zod dans la page de fiche avait fait passer sa performance Lighthouse de 97 à 69.
41. **(Phase 7) Fiche lue = fiche affichée** ; marque-pages et fiches lues dans IndexedDB (table `marks`), exportés avec la progression. Les réglages (objectif, tailles) restent en localStorage : ce sont des préférences d'appareil, pas de la progression.
42. **(Phase 7) Reprise d'examen reconstruite depuis les tentatives** plutôt que par une sauvegarde parallèle : chaque réponse est déjà enregistrée au fil de l'eau ; un examen non terminé sur le même sujet (même URL, donc même graine) et de moins de 24 h est proposé à la reprise.
43. **(Phase 7) Graphiques à une mesure** : deux petits graphiques (exercices, taux) plutôt qu'un graphique à deux axes ; une seule teinte par graphique ; valeurs lisibles dans la description SVG.

44. **(Phase 6) Fiches de 22 à 30 lignes, structure fixe** (guide § « Fiche de cours ») : le plafond de 30 lignes du validateur est conservé pour que la fiche reste lisible sur téléphone ; le plancher passe de 10 à 22 pour garantir l'exemple et les erreurs fréquentes. Un bloc diagramme compte pour une ligne (sinon un diagramme de 8 lignes JSON interdisait tout développement).
45. **(Phase 6) Diagrammes seulement quand la notion s'y prête** (environ deux fiches sur trois, 172) : pas de diagramme décoratif ; le relecteur vérifie chaque libellé. Les notions purement lexicales (UE 6 vocabulaire) ou purement textuelles n'en ont pas.
46. **(Phase 6) Droit à jour à la date de la session, vérifié par recherche web** : quand un relecteur établit qu'une règle a changé (IFRS 18, Omnibus I, omnibus IA, décret 2024-152…), la fiche est mise à jour et les exercices de la notion sont contrôlés dans la foulée (grep sur les chiffres ou dates concernés) ; seuls deux exercices (fusions) ont dû être corrigés. Les numéros d'articles non confirmés restent cités sans numéro (décision 23), et la date du jour (« à ce jour ») est écrite quand un texte est en cours (NIS 2).
47. **(Phase 6) Reprise des lots interrompus sur l'arbre de travail** plutôt que depuis zéro : le rédacteur de reprise relit et recalcule les fiches déjà écrites, puis termine le lot ; le relecteur repart toujours de zéro. Aucun commit avant relecture, même sur demande du hook de fin de tour.

## Points ouverts / à vérifier

- **Déploiement** : résolu. GitHub Pages est activé (source : GitHub Actions) et chaque push sur `main` déploie automatiquement.
- **Taxonomie à relire sur le texte officiel.** Légifrance, le BO et les sites officiels étaient inaccessibles depuis l'environnement cloud (proxy). La structure vient du recoupement de résultats de recherche. À contrôler en priorité : intitulés et modalités des UE, découpage des blocs du programme 2025.
- **Numéros d'articles PCG** des exercices d'exemple (321-5, 322-1, 323-1 à 323-6) : jugés plausibles par le relecteur, mais pas confirmés sur le texte.
- UE 1, 5 et 6 ont moins de 5 questions par notion à la cible V1 : on peut regrouper des notions en phase 3 si c'est trop fin.

- **Points de fond** : ceux relevés en phases 2 et 3 ont été vérifiés et corrigés en phase 5 (voir « Phase 5 : ce qui est fait »). Les relecteurs n'ont pu lire la plupart des textes officiels qu'au travers de résumés de recherche (Légifrance, ANC et BOFiP bloqués par le proxy) : un contrôle humain sur les textes reste souhaitable, en priorité sur les règlements récents (ANC 2026-03, directive (UE) 2026/470) et sur le plan de comptes PCG 2025.
- **Décalage de mise en page (CLS) de 0,07 sur toutes les pages** : vient du remplacement de l'écran « Chargement… » de Suspense dans `<main>` ; sans effet sur les scores (95-96). Le 0,15 propre à la fiche de cours est corrigé en phase 6.
- **Points à revoir quand les textes évolueront** : date de promulgation de la loi française transposant NIS 2 (`conformite-reglementaire-si`, « non promulguée à ce jour ») ; numéro recodifié de l'infraction de non-révélation des faits délictueux (ancien L. 820-7, cité sans numéro) ; compte 7673 (produits nets sur cessions de VMP) vu par symétrie avec 6673 sur une seule source ; l'exercice `theorie-portefeuille-medaf` utilise le compte parent 667 pour une cession de VMP (accepté : 667 reste le compte de rattachement de 6673).
- **Release GitHub** : les tags ne peuvent pas être poussés depuis l'environnement (passerelle limitée aux branches). Créer les releases v1.0.0, v1.1.0 et v1.2.0 depuis l'interface GitHub (commits de fusion des PR #8, #9 et de la PR de la phase 6).

## Prochaine étape : phase 8 (exercices complémentaires)

- Voir `docs/audit-v1.md` § 3. Environ 150 exercices sur les notions qui n'en ont que 3 ou 4 (UE 1, 5 et 6 ; `npm run validate` affiche les comptes par notion, `exerciseCount()` côté app) pour que chaque notion atteigne au moins 5 à 6 exercices et que les sessions par notion aient du sens.
- Méthode inchangée : lots par thème (une dizaine), rédacteur puis relecteur indépendant qui recalcule chaque réponse, `verified: true` seulement après relecture, un commit par lot ; répartition des types et difficultés de `CLAUDE.md`, règles de `docs/content-guide.md` (les fiches enrichies servent désormais de base : s'appuyer sur leurs exemples et erreurs fréquentes sans les recopier). Ids nouveaux à la suite des numéros existants.
- Fin de phase : `validate:strict`, lint, tests, build, CHANGELOG 1.3.0, README (nombre d'exercices), PROGRESS.md, PR, CI, fusion.

## Budget consommé (estimation)

- Phase 0 : environ 8 à 10 $ (cible SPEC : 10 $), dont 4 sous-agents (taxonomie, schémas, CI, relecture).
- Phase 1 : environ 20 à 25 $ (cible SPEC : 25 $), dont 9 sous-agents (4 rédactions, 5 relectures).
- Phase 2 : environ 80 à 100 $ (cible SPEC : 90 $). 50 sous-agents (25 rédactions, 25 relectures), de 75 000 à 160 000 tokens chacun. Estimation grossière : le coût exact se lit avec `/cost`.
- Phase 3 : environ 80 à 100 $ (cible SPEC : 70 $). Environ 52 sous-agents (25 rédactions, 26 relectures, plus le plugin de build), de 80 000 à 145 000 tokens chacun. Dépassement dû au volume des lots UE 1 (36-37 exercices) et aux recherches des relecteurs.
- Phase 4 : environ 15 à 20 $ (cible SPEC : 25 $). Aucun sous-agent : travail direct (moteur, écrans, tests, smoke test).
- Phase 5 : environ 20 à 30 $ (cible SPEC : 15 $, dépassement accepté pour finir proprement). 5 sous-agents (vérification des points ouverts et relecture, harmonisation des comptes ANC 2022-06 et relecture), le reste en travail direct (code, Lighthouse, captures).
- Phase 7 : environ 35 à 45 $ (estimation de l'audit : 40 à 60 $). Aucun sous-agent : travail direct.
- Phase 6 : environ 110 à 140 $ (estimation de l'audit : 80 à 110 $). Environ 72 sous-agents (27 rédactions, 27 relectures, 18 relances après deux limites d'usage), de 90 000 à 140 000 tokens chacun ; le dépassement vient des relances et des recherches web des relecteurs (droit 2026). Le reste en travail direct (plan, briefs, commits, Lighthouse, captures).
- Cumul estimé : environ 370 à 470 $. L'utilisateur a accepté de dépasser le budget initial de 250 $ pour les phases 6 à 8 (audit : 155 à 215 $ pour les trois ; reste la phase 8, estimée 35 à 45 $).
