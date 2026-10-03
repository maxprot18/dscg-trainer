# Cahier des charges — Appli d'entraînement Audit & DSCG

Oct 3, 2026 · @max

## Contexte et objectifs

Max, analyste junior en audit financier chez Deloitte (BU Private), veut une appli personnelle pour s'entraîner en audit et préparer le DSCG. Le projet est codé par Claude Code (budget : 250 $ de crédits), publié en open source sur GitHub, et doit être utilisable tous les jours sur téléphone et ordinateur.

Objectifs mesurables :

- Un volume d'exercices très important : viser 1 500 questions minimum à la première version, extensible sans limite.
- Couvrir toutes les UE du DSCG avec un poids renforcé sur la compta, la conso et l'audit (UE 4 et UE 2 en priorité).
- Un suivi de progression par thème qui dit clairement « ce que tu maîtrises, ce que tu dois retravailler ».
- Une appli simple : une page d'accueil, un bouton « S'entraîner », rien à configurer.
- Zéro coût d'hébergement et zéro serveur à maintenir.

## Choix techniques

Une PWA (appli web installable) hébergée gratuitement sur GitHub Pages, sans serveur ni base de données distante. Elle s'installe sur l'écran d'accueil du téléphone, fonctionne hors ligne et garde la progression dans le navigateur. Pas d'APK : un APK ne tourne pas sur ordinateur et oblige à gérer les mises à jour à la main.

| Brique | Choix | Pourquoi |
| --- | --- | --- |
| Framework | React 18 + TypeScript + Vite | Rapide à builder, Claude Code le maîtrise très bien |
| UI | Tailwind CSS + shadcn/ui | Interface propre sans effort de design |
| Routing | React Router | Navigation Accueil / Entraînement / Cours / Progression |
| Stockage local | IndexedDB via Dexie.js | Progression et historique hors ligne, export/import JSON |
| Contenu | Fichiers JSON par thème dans `/content` | Lisible, versionné sur GitHub, contribuable par d'autres |
| Validation du contenu | Schémas Zod + script `npm run validate` | Aucun exercice mal formé ne passe en prod |
| Tests | Vitest + Testing Library | Moteur de quiz et répétition espacée testés |
| Hébergement | GitHub Pages via GitHub Actions | Déploiement automatique à chaque push sur `main` |
| PWA | vite-plugin-pwa | Service worker, manifest, mode hors ligne |
| Licence | Code MIT, contenu CC BY-SA 4.0 | Open source clair pour le code et pour les exercices |

Option de secours si GitHub Pages pose problème : Vercel ou Netlify, gratuits également.

## Périmètre du contenu

Le contenu suit le découpage officiel du DSCG, avec un poids triple sur l'UE 4 (compta-audit) et l'UE 2 (finance), qui sont le cœur du métier. Chaque UE est découpée en thèmes, chaque thème en notions ; un exercice est toujours rattaché à une notion précise pour que la progression soit fine.

| UE | Intitulé | Thèmes à couvrir | Cible V1 (questions) |
| --- | --- | --- | --- |
| UE 1 | Gestion juridique, fiscale et sociale | Droit des sociétés, droit des contrats, fiscalité IS/TVA/IR, intégration fiscale, droit social, procédures collectives | 200 |
| UE 2 | Finance | Diagnostic financier, évaluation d'entreprise, choix d'investissement et de financement, trésorerie, gestion des risques, marchés | 250 |
| UE 3 | Management et contrôle de gestion | Stratégie, pilotage, contrôle de gestion, RSE | 100 |
| UE 4 | Comptabilité et audit | Normes IFRS (IAS 1, 2, 7, 8, 12, 16, 19, 36, 37, 38, 40, IFRS 3, 9, 10, 15, 16), PCG et comptes annuels, consolidation (périmètre, méthodes, retraitements, écarts d'acquisition, impôts différés), fusions et opérations de restructuration, audit (cadre légal du CAC, NEP, cycles d'audit, procédures, risques, rapport) | 700 |
| UE 5 | Management des systèmes d'information | Gouvernance SI, projets, sécurité, data | 80 |
| UE 6 | Anglais des affaires | Vocabulaire comptable et financier, lecture de rapports annuels | 70 |

Les cycles d'audit forment une sous-arborescence dédiée dans l'UE 4 : ventes-clients, achats-fournisseurs, stocks, immobilisations, trésorerie, personnel, impôts et taxes, capitaux propres, provisions, clôture. Pour chaque cycle : assertions, risques, contrôles clés, procédures substantives, pièges classiques.

## Fonctionnalités

Quatre écrans : Accueil, S'entraîner, Cours, Progression. Tout le reste est caché derrière.

**Types d'exercices** (chaque type a son composant de rendu et sa logique de correction) :

1. QCM à réponse unique ou multiple, avec explication détaillée après réponse.
2. Vrai / faux justifié.
3. Calcul à réponse numérique (tolérance paramétrable, ex. ±1 % sur une VAN).
4. Écriture comptable : saisir débit/crédit et comptes PCG, correction compte par compte.
5. Cas pratique court : énoncé de 10 à 20 lignes, 3 à 5 sous-questions enchaînées, barème.
6. Cas de consolidation guidé : périmètre, pourcentages d'intérêt et de contrôle, méthode, retraitements, étape par étape.
7. Cas d'audit : situation sur un cycle, choisir les procédures pertinentes, qualifier le risque, rédiger la conclusion type.
8. Flashcards (recto/verso) pour les définitions, normes et seuils.

**Modes d'entraînement :**

- Session rapide : 10 questions mélangées, 5 minutes.
- Session par thème : choisir une UE, un thème ou une notion.
- Révision intelligente : l'appli choisit les notions à retravailler (répétition espacée, algorithme SM-2 ou FSRS).
- Examen blanc : sujet type DSCG d'une UE, chronométré 4 h (UE 4) ou 3 h, barème sur 20, correction détaillée.
- Mode « erreurs » : rejouer uniquement les questions ratées.

**Cours :** une fiche par notion (10 à 30 lignes), rédigée en propre, avec le renvoi vers la norme ou l'article de loi concerné, les formules clés, et un lien direct vers les exercices de la notion.

**Progression :**

- Taux de réussite par UE, thème et notion, avec code couleur (à revoir / en cours / maîtrisé).
- Historique des sessions, temps passé, série de jours consécutifs.
- Carte de chaleur du programme : voir d'un coup d'œil les zones non travaillées.
- Export et import de la progression en JSON (changement d'appareil, sauvegarde).

**Qualité de vie :** mode sombre, raccourcis clavier (1-4 pour répondre, Entrée pour valider), bouton « signaler une erreur » qui ouvre une issue GitHub pré-remplie, recherche plein texte dans les cours et exercices.

## Sources de contenu et droit d'auteur

Règle de base : aucun exercice, corrigé ou extrait de cours n'est recopié depuis un site tiers. Claude Code génère tous les exercices lui-même, en s'appuyant sur les textes officiels pour la justesse, et les relit avec un second passage de vérification.

| Source | Statut | Usage autorisé dans l'appli |
| --- | --- | --- |
| Programme officiel du DSCG (arrêté publié sur Légifrance) | Texte public | Structure des UE et des thèmes, reprise telle quelle |
| PCG (règlement ANC 2014-03 consolidé) | Texte réglementaire public | Numéros de comptes, règles, renvois d'article ; citation courte autorisée |
| Code de commerce, CGI, Code du travail (Légifrance) | Textes publics | Renvois d'article et reformulation ; citation courte autorisée |
| Règlements UE adoptant les IFRS (EUR-Lex) | Textes publics dans leur version adoptée par l'UE | Renvois aux paragraphes et reformulation ; ne pas recopier les normes en bloc, la fondation IFRS garde ses droits sur le texte original |
| NEP (normes d'exercice professionnel, homologuées par arrêté) | Textes publics | Renvois et reformulation |
| Annales DSCG publiées par le ministère | Sujets publics, corrigés souvent protégés | S'inspirer de la structure et du niveau ; ne jamais recopier un sujet ni un corrigé |
| Compta Online, CRCF, Natachone, Tifawt, cours en ligne | Sites tiers protégés | Aucune reprise de contenu ; servent uniquement à vérifier le niveau attendu |

Contrôle qualité du contenu généré : chaque exercice porte le champ `source_ref` (article, paragraphe de norme ou compte PCG qui le justifie) et un champ `verified` passé à `true` seulement après une relecture par un second agent Claude Code qui recalcule la réponse de façon indépendante. Les exercices non vérifiés ne sont pas déployés.

## Modèle de données et format des exercices

Tout le contenu vit dans `/content`, un dossier par UE, un fichier JSON par thème. Un schéma Zod unique valide chaque fichier au build ; un identifiant stable par exercice permet à la progression de survivre aux mises à jour du contenu.

```
/content
  /ue4-compta-audit
    /ifrs
      ias-16-immobilisations.json
      ifrs-16-contrats-location.json
    /consolidation
      perimetre-et-methodes.json
      ecarts-acquisition.json
    /audit
      cycle-ventes-clients.json
  /ue2-finance
    evaluation-entreprise.json
  taxonomy.json          ← arbre UE > thème > notion
  courses/                ← fiches de cours, une par notion, en Markdown
```

Exemple d'exercice (type QCM) :

```json
{
  "id": "ue4-ifrs-ias16-0042",
  "type": "mcq",
  "ue": "UE4",
  "theme": "ifrs",
  "notion": "ias-16-immobilisations",
  "difficulty": 2,
  "tags": ["amortissement", "composants"],
  "statement": "Une société acquiert un avion pour 10 M€. Les moteurs (3 M€) ont une durée d'utilité de 8 ans, la cellule de 20 ans. Selon IAS 16, comment amortir ?",
  "options": [
    "Un seul plan sur 20 ans pour 10 M€",
    "Deux plans : moteurs sur 8 ans, cellule sur 20 ans",
    "Au choix de l'entité",
    "Un seul plan sur la durée moyenne pondérée"
  ],
  "answer": [1],
  "explanation": "IAS 16 impose l'approche par composants : chaque partie significative ayant une durée d'utilité différente est amortie séparément (IAS 16 §43-47).",
  "source_ref": "IAS 16 §43-47 (règlement UE 1126/2008)",
  "verified": true,
  "estimated_seconds": 60
}
```

Les autres types ajoutent leurs champs propres : `expected_value` et `tolerance` pour les calculs, `entries` (compte, libellé, débit, crédit) pour les écritures, `sub_questions` avec barème pour les cas pratiques, `front` / `back` pour les flashcards.

Progression stockée localement (IndexedDB) : une table `attempts` (exercice, date, réponse, correct, temps), une table `reviews` pour l'état de répétition espacée par notion, une table `sessions`. Export JSON de ces trois tables en un clic.

## Plan de livraison pour Claude Code

Six phases, chacune lancée dans une session Claude Code distincte et terminée par un commit et un déploiement. Le budget de 250 $ est réparti pour que le contenu, le poste le plus coûteux en tokens, soit généré thème par thème avec vérification.

| Phase | Livrable | Critère de fin | Budget indicatif |
| --- | --- | --- | --- |
| 0. Cadrage | `CLAUDE.md`, `README.md`, `taxonomy.json` complet, schémas Zod, squelette Vite + PWA, CI GitHub Pages | Le site vide se déploie et s'installe sur le téléphone | 10 $ |
| 1. Moteur | Les 8 types d'exercices rendus et corrigés, session rapide et session par thème, stockage IndexedDB, tests Vitest | 50 exercices d'exemple jouables de bout en bout | 25 $ |
| 2. Contenu UE 4 | 700 exercices + fiches de cours IFRS, PCG, conso, audit, générés thème par thème puis vérifiés par un second agent | `npm run validate` passe, 100 % des exercices `verified` | 90 $ |
| 3. Contenu UE 1, 2, 3, 5, 6 | 700 exercices + fiches de cours sur les autres UE | Idem phase 2 | 70 $ |
| 4. Progression | Répétition espacée, mode erreurs, examen blanc chronométré, carte de chaleur, export/import | Une semaine d'usage simulée dans les tests | 25 $ |
| 5. Finitions | Mode sombre, raccourcis, recherche, bouton « signaler », licence, contribution guide, release v1.0 | Lighthouse PWA à 100, README avec captures | 15 $ |

Marge restante : 15 $ pour les corrections après tes premiers jours d'utilisation.

Règles de travail à inscrire dans `CLAUDE.md` : commit après chaque étape avec message conventionnel ; jamais de contenu copié depuis un site ; chaque lot d'exercices généré est relu par un sous-agent indépendant avant commit ; tests verts obligatoires avant push ; un fichier `PROGRESS.md` tenu à jour en fin de session pour que la session suivante reprenne sans perte de contexte.

## Commandes et prompts à donner à Claude Code

Étape 1 : crée un dépôt vide sur GitHub nommé `dscg-trainer` (public, licence MIT), puis exporte ce document en Markdown et place-le à la racine du dépôt sous le nom `SPEC.md`.

Étape 2 : ouvre Claude Code sur ce dépôt et colle le prompt de cadrage ci-dessous. Une session par phase ; à chaque nouvelle session, colle le prompt de reprise.

**Prompt de cadrage (phase 0) :**

```markdown
Lis SPEC.md en entier : c'est le cahier des charges d'une PWA d'entraînement au DSCG (audit, compta, IFRS, conso, finance, droit, fiscalité).

Ta mission sur cette session : la phase 0 du plan de livraison.
1. Rédige CLAUDE.md avec les règles de travail de la section « Plan de livraison » (commits conventionnels, pas de contenu copié, relecture par sous-agent, tests verts avant push, PROGRESS.md tenu à jour).
2. Initialise le projet : Vite + React 18 + TypeScript, Tailwind, shadcn/ui, React Router, Dexie, Zod, Vitest, vite-plugin-pwa.
3. Écris content/taxonomy.json : l'arbre complet UE > thème > notion selon le programme officiel du DSCG (vérifie-le sur Légifrance) avec le détail de la section « Périmètre du contenu ».
4. Écris les schémas Zod pour les 8 types d'exercices de la section « Modèle de données » et le script npm run validate.
5. Configure le workflow GitHub Actions qui build, valide le contenu, lance les tests et déploie sur GitHub Pages à chaque push sur main.
6. Crée 5 exercices d'exemple (un QCM, un calcul, une écriture, une flashcard, un cas d'audit) pour tester la chaîne.
7. Mets à jour PROGRESS.md, commit, push, et vérifie que le site se déploie.

Utilise des sous-agents pour paralléliser (taxonomie, schémas, CI). Pose-moi une question seulement si le cahier des charges est contradictoire ; sinon décide et note ton choix dans PROGRESS.md.
```

**Prompt de reprise (phases 1 à 5) :**

```markdown
Lis CLAUDE.md, SPEC.md et PROGRESS.md. Reprends là où la session précédente s'est arrêtée et réalise la phase N du plan de livraison (remplace N). Travaille thème par thème pour le contenu : génère un lot, fais-le vérifier par un sous-agent qui recalcule chaque réponse indépendamment, corrige, valide avec npm run validate, commit. Termine en mettant à jour PROGRESS.md avec ce qui est fait, ce qui reste, et le budget consommé estimé.
```

**Prompt spécifique au contenu (phases 2 et 3), à ajouter au prompt de reprise :**

```markdown
Pour chaque notion de la taxonomie : rédige d'abord la fiche de cours (10 à 30 lignes, référence à la norme, à l'article ou au compte PCG), puis les exercices en respectant la cible par UE, avec une répartition 40 % QCM, 15 % vrai/faux, 15 % calculs, 10 % écritures, 10 % cas pratiques, 5 % cas de conso ou d'audit, 5 % flashcards, et une difficulté répartie 30 % niveau 1, 50 % niveau 2, 20 % niveau 3. Tout est rédigé en propre ; les sites tiers servent uniquement à calibrer le niveau, jamais à copier. Chaque exercice porte source_ref et n'est marqué verified qu'après relecture indépendante.
```

Commandes utiles pendant le projet : `claude` pour ouvrir la session, `/cost` pour suivre la consommation de crédits, `/compact` quand le contexte devient long, `npm run dev` pour tester en local, `npm run validate` avant chaque commit de contenu.
