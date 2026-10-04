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
- `content/courses/<id-notion>.md` : fiche de cours d'une notion (10 à 30 lignes, renvoi à la norme ou l'article).
- `src/content/schema.ts` : schémas Zod des 8 types (`mcq`, `true_false`, `numeric`, `journal_entry`, `case_study`, `consolidation_case`, `audit_case`, `flashcard`) et de la taxonomie. Source de vérité du format : la lire avant d'écrire du contenu.
- `scripts/validate-content.ts` : `npm run validate`.
- `src/db/db.ts` : Dexie (`attempts`, `reviews`, `sessions`) + export/import JSON.
- `src/engine/` : moteur pur, testé sans UI. `parts.ts` découpe chaque exercice en parties notées (choix, vrai/faux, calcul, écriture, réponse rédigée, flashcard) ; `grading.ts` corrige chaque partie et combine selon le barème (seuil de réussite des exercices composites : `PASS_THRESHOLD` = 70 %) ; `session.ts` / `sessionConfig.ts` construisent les sessions (graine dans l'URL `/session?mode=…&seed=…`) ; `recorder.ts` écrit tentatives et sessions dans IndexedDB.
- `src/components/exercise/` : `ExercisePlayer` (énoncé + parties enchaînées + correction) et `parts.tsx` (un composant de saisie/correction par genre de partie). Ajouter un type d'exercice = l'ajouter au schéma, à `exerciseParts()` et à l'en-tête `Statement`.
- `src/components/ui/` : composants shadcn/ui (ajoutés à la main : le registre shadcn est bloqué dans l'environnement cloud ; en local `npx shadcn@latest add <composant>` fonctionne avec `components.json`).

## Conventions de contenu

- Id d'exercice stable, kebab-case : `<ue>-<theme-court>-<notion-courte>-<nnnn>` (ex. `ue4-ifrs-ias16-0042`). Ne jamais réutiliser un id supprimé.
- `source_ref` obligatoire : article, paragraphe de norme ou compte PCG qui justifie la réponse. IFRS : citer le règlement UE (2023/1803).
- Répartition cible par lot (SPEC) : 40 % QCM, 15 % vrai/faux, 15 % calculs, 10 % écritures, 10 % cas pratiques, 5 % cas de conso ou d'audit, 5 % flashcards ; difficulté 30 % niveau 1, 50 % niveau 2, 20 % niveau 3.
- Langue : français (UE 6 en anglais).

## Licences

Code sous MIT (`LICENSE`), contenu de `content/` sous CC BY-SA 4.0 (`content/LICENSE`).
