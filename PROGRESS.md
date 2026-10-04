# PROGRESS — DSCG Trainer

Dernière mise à jour : 2026-10-04, fin de la session phase 1 (moteur).

## État par phase

| Phase | État |
| --- | --- |
| 0. Cadrage | Terminée, fusionnée dans `main` et déployée sur https://maxprot18.github.io/dscg-trainer/ (2026-10-04) |
| 1. Moteur | Terminée (voir ci-dessous) |
| 2. Contenu UE 4 | À faire |
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

## Points ouverts / à vérifier

- **Déploiement** : résolu. GitHub Pages est activé (source : GitHub Actions) et chaque push sur `main` déploie automatiquement.
- **Taxonomie à relire sur le texte officiel.** Légifrance, le BO et les sites officiels étaient inaccessibles depuis l'environnement cloud (proxy). La structure vient du recoupement de résultats de recherche. À contrôler en priorité : intitulés et modalités des UE, découpage des blocs du programme 2025.
- **Numéros d'articles PCG** des exercices d'exemple (321-5, 322-1, 323-1 à 323-6) : jugés plausibles par le relecteur, mais pas confirmés sur le texte.
- UE 1, 5 et 6 ont moins de 5 questions par notion à la cible V1 : on peut regrouper des notions en phase 3 si c'est trop fin.

- **Taille du bundle** : 622 ko (194 ko gzip) avec 50 exercices, chargés en eager. Il faudra passer au chargement paresseux par UE au cours de la phase 2, avant d'atteindre environ 300 exercices.
- Les fiches de cours (`content/courses/`) ne sont pas encore écrites : 0 sur 271. Elles sont prévues en phases 2 et 3, avant les exercices de chaque notion.

## Prochaine étape : phase 2 (contenu UE 4)

- Objectif : 700 exercices UE 4 et leurs fiches de cours, générés thème par thème (IFRS, PCG, conso, fusions, cadre légal, mission, rapport, durabilité, cycles d'audit), chacun relu par un sous-agent indépendant. Critère de fin : `npm run validate:strict` passe.
- Méthode qui a bien marché en phase 1 : des lots de 10 à 17 exercices par thème, rédigés en parallèle par plusieurs sous-agents sur des dossiers disjoints, puis relus chacun par un autre sous-agent avec la liste des points sensibles. Un commit par lot relu.
- Respecter la répartition du SPEC : 40 % QCM, 15 % vrai/faux, 15 % calculs, 10 % écritures, 10 % cas pratiques, 5 % cas de conso ou d'audit, 5 % flashcards ; difficulté 30/50/20.
- Technique : chargement paresseux du contenu par UE, et affichage des fiches de cours dans l'écran Cours, avec un lien vers les exercices de la notion.

## Budget consommé (estimation)

- Phase 0 : environ 8 à 10 $ (cible SPEC : 10 $), dont 4 sous-agents (taxonomie, schémas, CI, relecture).
- Phase 1 : environ 20 à 25 $ (cible SPEC : 25 $), dont 9 sous-agents (4 rédactions, 5 relectures). Cumul estimé : environ 30 à 35 $ sur 250 $.
