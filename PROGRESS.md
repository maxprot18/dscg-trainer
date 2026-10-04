# PROGRESS — DSCG Trainer

Dernière mise à jour : 2026-10-04, fin de la session phase 0 (cadrage).

## État par phase

| Phase | État |
| --- | --- |
| 0. Cadrage | Terminée, fusionnée dans `main` et déployée sur https://maxprot18.github.io/dscg-trainer/ (2026-10-04) |
| 1. Moteur | À faire |
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

## Points ouverts / à vérifier

- **Déploiement** : résolu. GitHub Pages est activé (source : GitHub Actions) et chaque push sur `main` déploie automatiquement.
- **Taxonomie à relire sur le texte officiel.** Légifrance, le BO et les sites officiels étaient inaccessibles depuis l'environnement cloud (proxy). La structure vient du recoupement de résultats de recherche. À contrôler en priorité : intitulés et modalités des UE, découpage des blocs du programme 2025.
- **Numéros d'articles PCG** des exercices d'exemple (321-5, 322-1, 323-1 à 323-6) : jugés plausibles par le relecteur, mais pas confirmés sur le texte.
- UE 1, 5 et 6 ont moins de 5 questions par notion à la cible V1 : on peut regrouper des notions en phase 3 si c'est trop fin.

## Prochaine étape : phase 1 (moteur)

- Composants de rendu et de correction des 8 types :
  - correction compte par compte pour les écritures ;
  - tolérance pour les calculs ;
  - barème pour les cas pratiques et les cas de conso ;
  - choix des procédures, qualification du risque et conclusion type pour les cas d'audit.
- Session rapide (10 questions, 5 minutes) et session par thème (UE, thème ou notion).
- Enregistrement des tentatives et des sessions dans Dexie.
- 50 exercices d'exemple jouables de bout en bout, au moins 2 par type, relus par un sous-agent.
- Tests Vitest de la logique de correction.

## Budget consommé (estimation)

- Phase 0 : environ 8 à 10 $ (cible SPEC : 10 $), dont 4 sous-agents (taxonomie, schémas, CI, relecture).
