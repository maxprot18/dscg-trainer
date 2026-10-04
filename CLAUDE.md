# CLAUDE.md — règles de travail du projet DSCG Trainer

PWA d'entraînement au DSCG (React 18 + TypeScript + Vite, Tailwind + shadcn/ui, Dexie, Zod, Vitest, vite-plugin-pwa), hébergée sur GitHub Pages. Le cahier des charges complet est dans `SPEC.md` ; l'état d'avancement dans `PROGRESS.md`.

## En début de session

1. Lire `SPEC.md`, ce fichier et `PROGRESS.md`.
2. Reprendre à la section « Prochaine étape » de `PROGRESS.md`. Une session = une phase du plan de livraison (SPEC, « Plan de livraison »).

## Règles impératives

- **Commits conventionnels, un commit par étape terminée** : `feat:`, `fix:`, `content:`, `test:`, `ci:`, `docs:`, `chore:`, `refactor:`, avec un scope si utile (`content(ue4-ifrs): …`). Pas de commit fourre-tout en fin de session.
- **Jamais de contenu copié depuis un site.** Tous les exercices, corrigés et fiches de cours sont rédigés en propre. Les textes officiels (programme DSCG, PCG, Code de commerce, CGI, Code du travail, NEP, IFRS adoptées UE) servent à la justesse : renvoi d'article ou de paragraphe et reformulation, citation courte uniquement. Annales et sites tiers (Compta Online, CRCF, etc.) : calibrage du niveau seulement, aucune reprise.
- **Chaque lot d'exercices est relu par un sous-agent indépendant avant commit.** Le relecteur résout l'énoncé seul, recalcule la réponse, puis compare. `verified: true` uniquement après cette relecture. Les exercices non vérifiés ne sont jamais servis en production (filtrés au chargement, voir `src/content/load.ts`).
- **Tests verts obligatoires avant push** : `npm run lint && npm run validate && npm test && npm run build` doivent tous passer en local. Ne jamais désactiver ou sauter un test pour passer.
- **`PROGRESS.md` mis à jour en fin de session** : ce qui est fait, ce qui reste, décisions prises (avec justification), budget consommé estimé, prochaine étape. La session suivante doit pouvoir reprendre sans autre contexte.
- En cas de contradiction dans le cahier des charges : demander. Sinon décider et noter le choix dans `PROGRESS.md`.

## Commandes

| Commande | Rôle |
| --- | --- |
| `npm run dev` | Serveur de dev (base `/`, exercices non vérifiés visibles) |
| `npm run validate` | Valide `content/` (Zod + cohérence taxonomie) ; non vérifiés = avertissement |
| `npm run validate:strict` | Idem, mais tout exercice non vérifié est une erreur (critère de fin des phases contenu) |
| `npm test` | Vitest (schémas, script de validation, base locale, UI) |
| `npm run lint` / `npm run typecheck` | oxlint / `tsc -b` |
| `npm run build` | Build de prod (base `/dscg-trainer/`) + service worker |

## Organisation du code

- `content/taxonomy.json` : arbre UE > thème > notion (programme officiel + périmètre SPEC). Les ids de notion sont uniques dans tout le fichier et **ne doivent jamais être renommés** une fois utilisés (la progression y est rattachée).
- `content/<slug-ue>/<theme>/<notion>.json` : `{ "exercises": [...] }`. Un fichier par notion de préférence (un fichier par thème est aussi accepté). Le script vérifie que le fichier est sous le dossier de son UE et que `ue`/`theme`/`notion` existent.
- `content/courses/<id-notion>.md` : fiche de cours d'une notion (22 à 30 lignes non vides, structure fixe du guide : enjeu, règles, exemple résolu, erreurs fréquentes, à retenir, notions liées, références) ; liens internes `[titre](/cours/<id-notion>)` et blocs ```diagram (JSON validé par `npm run validate`).
- `docs/content-guide.md` : règles de rédaction et de relecture du contenu (format des fiches, règles par type d'exercice, tolérances, conventions de comptes, renvoi aux options par numéro, règles ANC 2020-01). **À lire avant toute production de contenu** ; la méthode par lots planifiés + relecteur indépendant est décrite dans `PROGRESS.md` (phase 2).
- `src/content/load.ts` : taxonomie embarquée, exercices chargés UE par UE (`src/content/bundles/ue*.ts`, un fichier JS par UE), fiches chargées à la demande.
- `src/content/schema.ts` : schémas Zod des 8 types (`mcq`, `true_false`, `numeric`, `journal_entry`, `case_study`, `consolidation_case`, `audit_case`, `flashcard`) et de la taxonomie. Source de vérité du format : la lire avant d'écrire du contenu.
- `scripts/validate-content.ts` : `npm run validate`.
- `src/db/db.ts` : Dexie (`attempts`, `reviews`, `sessions`) + export/import JSON ; `src/db/progress.ts` : lecture de la progression (`useProgress`, en direct).
- `src/engine/` : moteur pur, testé sans UI. `parts.ts` découpe chaque exercice en parties notées (choix, vrai/faux, calcul, écriture, réponse rédigée, flashcard) ; `grading.ts` corrige chaque partie et combine selon le barème (seuil de réussite des exercices composites : `PASS_THRESHOLD` = 70 %) ; `session.ts` / `sessionConfig.ts` construisent les sessions (rapide, thème, révision intelligente, erreurs, examen blanc ; graine dans l'URL `/session?mode=…&seed=…`) ; `recorder.ts` écrit tentatives et sessions dans IndexedDB et met à jour la répétition espacée ; `srs.ts` : SM-2 par notion, une revue par jour ; `stats.ts` : taux, maîtrise, série, historique. `week.test.ts` simule une semaine d'usage.
- `src/content/diagram.ts` / `diagramSchema.ts` : diagrammes des fiches (blocs ```diagram, cinq formes), rendus par `src/components/Diagram.tsx` ; `src/content/pcg.ts` : comptes PCG pour l'autocomplétion ; `src/lib/settings.ts` : réglages (localStorage) ; table `marks` (marque-pages, fiches lues) dans `src/db/db.ts`.
- `src/engine/search.ts` : recherche plein texte (page `/recherche`). `src/lib/theme.ts` : mode sombre (script anti-flash dans `index.html`). `src/lib/report.ts` : lien « signaler une erreur » (issue GitHub pré-remplie).
- Nombres d'exercices par UE / thème / notion calculés au build (`__EXERCISE_COUNTS__` dans `vite.config.ts`, lus par `exerciseCount()`) ; écrans chargés à la demande (`React.lazy` dans `App.tsx`) ; Zod reste hors du fichier JS principal (ne pas importer `schema.ts` depuis l'accueil ou la mise en page).
- `src/components/exercise/` : `ExercisePlayer` (énoncé + parties enchaînées + correction) et `parts.tsx` (un composant de saisie/correction par genre de partie). Ajouter un type d'exercice = l'ajouter au schéma, à `exerciseParts()` et à l'en-tête `Statement`.
- `src/components/ui/` : composants shadcn/ui (ajoutés à la main : le registre shadcn est bloqué dans l'environnement cloud ; en local `npx shadcn@latest add <composant>` fonctionne avec `components.json`).

## Conventions de contenu

- Id d'exercice stable, kebab-case : `<ue>-<theme-court>-<notion-courte>-<nnnn>` (ex. `ue4-ifrs-ias16-0042`). Ne jamais réutiliser un id supprimé.
- `source_ref` obligatoire : article, paragraphe de norme ou compte PCG qui justifie la réponse. IFRS : citer le règlement UE (2023/1803).
- Répartition cible par lot (SPEC) : 40 % QCM, 15 % vrai/faux, 15 % calculs, 10 % écritures, 10 % cas pratiques, 5 % cas de conso ou d'audit, 5 % flashcards ; difficulté 30 % niveau 1, 50 % niveau 2, 20 % niveau 3.
- Langue : français (UE 6 en anglais).

## Licences

Code sous MIT (`LICENSE`), contenu de `content/` sous CC BY-SA 4.0 (`content/LICENSE`).
