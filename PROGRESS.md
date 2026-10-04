# PROGRESS — DSCG Trainer

Dernière mise à jour : 2026-10-04, fin de la session phase 2 (contenu UE 4).

## État par phase

| Phase | État |
| --- | --- |
| 0. Cadrage | Terminée, fusionnée dans `main` et déployée sur https://maxprot18.github.io/dscg-trainer/ (2026-10-04) |
| 1. Moteur | Terminée (voir ci-dessous) |
| 2. Contenu UE 4 | Terminée (voir ci-dessous) |
| 3. Contenu UE 1, 2, 3, 5, 6 | À faire |
| 4. Progression | À faire |
| 5. Finitions | À faire |

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

## Points ouverts / à vérifier

- **Déploiement** : résolu. GitHub Pages est activé (source : GitHub Actions) et chaque push sur `main` déploie automatiquement.
- **Taxonomie à relire sur le texte officiel.** Légifrance, le BO et les sites officiels étaient inaccessibles depuis l'environnement cloud (proxy). La structure vient du recoupement de résultats de recherche. À contrôler en priorité : intitulés et modalités des UE, découpage des blocs du programme 2025.
- **Numéros d'articles PCG** des exercices d'exemple (321-5, 322-1, 323-1 à 323-6) : jugés plausibles par le relecteur, mais pas confirmés sur le texte.
- UE 1, 5 et 6 ont moins de 5 questions par notion à la cible V1 : on peut regrouper des notions en phase 3 si c'est trop fin.

- **Points de fond à faire confirmer par un humain sur les textes** (signalés par les relecteurs, formulations rendues prudentes en attendant) :
  - correction d'erreur en PCG après le règlement ANC 2022-06 : en résultat ou en report à nouveau (fiche annexe-changements-comptables) ;
  - référence « PCG art. 622-1 s. » pour les contrats à long terme ;
  - en ANC 2020-01 : statut du tableau des flux et du tableau de variation des capitaux propres, et présentation des intérêts minoritaires (lot efg) ;
  - numérotation L. 821-x des articles sur les commissaires aux comptes ;
  - terminologie de la NEP 315 si une version révisée a été homologuée.
- **Contenu non vérifié dans le fichier de l'UE** : les exercices `verified: false` sont filtrés à l'exécution mais restent dans le fichier JS de l'UE. Aucun n'en reste aujourd'hui ; un filtrage au build serait plus propre en phase 3.
- Les UE 1, 2, 3, 5 et 6 n'ont encore que 18 exercices et aucune fiche : c'est l'objet de la phase 3.

## Prochaine étape : phase 3 (contenu UE 1, 2, 3, 5, 6)

- Objectif : 700 exercices (cibles du SPEC : UE1 200, UE2 250, UE3 100, UE5 80, UE6 70, existant compris : 4 + 10 + 1 + 1 + 2), et les fiches de cours des 142 notions de ces UE. Critère de fin : `npm run validate:strict` passe.
- Reprendre la méthode de la phase 2 telle quelle :
  - script de plan (types et difficultés exacts par lot, ≈ 25 à 30 exercices par lot) ;
  - rédacteurs en parallèle sur des dossiers disjoints, qui lisent `docs/content-guide.md` ;
  - relecteur indépendant par lot, avec les points incertains du rédacteur ;
  - commit par lot avec le script de garde.
- Points d'attention :
  - UE 1 : fiscalité 2025-2026, en donnant les taux et seuils en hypothèse dans l'énoncé. Droit des sociétés après l'ordonnance 2023-393.
  - UE 6 : contenu en anglais.
  - UE 2 : calculs financiers à vérifier avec node.
- Technique éventuelle : filtrer les exercices non vérifiés au build (plugin Vite) plutôt qu'à l'exécution.

## Budget consommé (estimation)

- Phase 0 : environ 8 à 10 $ (cible SPEC : 10 $), dont 4 sous-agents (taxonomie, schémas, CI, relecture).
- Phase 1 : environ 20 à 25 $ (cible SPEC : 25 $), dont 9 sous-agents (4 rédactions, 5 relectures).
- Phase 2 : environ 80 à 100 $ (cible SPEC : 90 $). 50 sous-agents (25 rédactions, 25 relectures), de 75 000 à 160 000 tokens chacun. Estimation grossière : le coût exact se lit avec `/cost`.
- Cumul estimé : environ 110 à 135 $ sur 250 $. Il reste de quoi faire la phase 3 (70 $) à condition de rester sur des lots de 25 à 30 exercices et des rapports courts.
