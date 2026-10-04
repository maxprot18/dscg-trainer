# Guide de rédaction du contenu

Ce guide s'adresse aux agents (et contributeurs) qui rédigent ou relisent des fiches de cours et des exercices. Il complète `CLAUDE.md` ; le format exact des exercices est défini par `src/content/schema.ts` (à lire avant d'écrire).

## Principes

- **Tout est rédigé en propre.** Aucune reprise de sites tiers, de manuels ou d'annales (corrigés compris) : ils servent au mieux à calibrer le niveau. Les textes officiels (PCG règl. ANC 2014-03, règl. ANC 2020-01 pour les comptes consolidés, règl. ANC 2017-01 pour les fusions, Code de commerce, CGI, NEP, IFRS adoptées par l'UE via le règlement 2023/1803) servent à la justesse : renvoi d'article ou de paragraphe et reformulation, citation courte seulement.
- **Exactitude avant tout.** Un numéro d'article dont on n'est pas sûr ne s'écrit pas : citer alors le texte sans numéro (« PCG, règles relatives aux provisions (règl. ANC 2014-03) »). Depuis l'ordonnance n° 2023-1142, les articles du Code de commerce sur le commissariat aux comptes sont numérotés L. 821-x (ex. L. 821-44 : mandat de six exercices) et le H3C est devenu la H2A.
- **Niveau DSCG**, langue française (UE 6 : anglais).

## Fiche de cours (`content/courses/<id-notion>.md`)

Une fiche par notion, écrite **avant** les exercices de la notion (les exercices s'appuient sur elle). Le nom du fichier est exactement l'id de la notion dans `content/taxonomy.json`. **22 à 30 lignes non vides** (compter les lignes d'un bloc ```diagram pour une seule), en Markdown, avec cette structure fixe (depuis la phase 6) :

```markdown
# <Titre de la notion>

**Références :** IAS 16 §43-62 (règl. UE 2023/1803) ; PCG art. 214-9

**Enjeu :** <une phrase : à quoi sert la notion, où elle tombe à l'examen.>

<Définitions, règles, conditions, méthodes de calcul en phrases courtes ou listes.>

**Formules clés :** VAN = −I₀ + Σ FNTₜ (1 + k)⁻ᵗ

## Exemple
<Un exemple chiffré résolu en 3 à 6 lignes : données, calcul, résultat, écriture s'il y a lieu. Pour une notion juridique : un cas concret et sa solution.>

## Erreurs fréquentes
- <2 à 4 erreurs classiques, tirées des distracteurs des QCM de la notion, avec la bonne règle.>

## À retenir
- <2 à 5 points.>

**Notions liées :** [IAS 36 — Dépréciation d'actifs](/cours/ias-36-depreciation) · [Amortissements en PCG](/cours/amortissements-depreciations-pcg)
```

- **Mise en page automatique** (`CourseSheet`) : l'application reconnaît cette structure, il faut donc la respecter à la lettre. Libellés réservés en gras en tête de paragraphe, suivis de deux-points (« **Références :** », « **Enjeu :** », « **Formules clés :** », « **Notions liées :** », UE 6 : « **References:** », « **Key issue:** », « **Key formulas:** », « **Glossary:** », « **Related topics:** ») ; une règle titrée s'écrit « **Libellé (§…)** : texte » ou « **Libellé** : » suivi d'une liste ; plusieurs formules sont séparées par « ; » ; chaque erreur fréquente s'écrit « erreur : bonne règle » (le premier deux-points hors parenthèses sépare les deux) ; notions liées et glossaire sont séparés par « · ». Les renvois entre parenthèses (« (§16-22) », « (art. L. 225-38) ») sont affichés en retrait : les garder entre parenthèses.
- **Liens internes** : `[titre](/cours/<id-notion>)`, uniquement vers des notions de la taxonomie (le validateur refuse les autres). 1 à 4 notions liées, choisies parce qu'elles se confondent ou se complètent (même thème ou autre UE).
- **Diagramme** (quand la notion s'y prête ; environ une notion sur deux) : un bloc ```` ```diagram ```` contenant un JSON validé par `npm run validate`, placé après les règles qu'il illustre. Cinq formes (schéma complet : `src/content/diagramSchema.ts`) :
  - `timeline` : `{"type":"timeline","title":"…","items":[{"when":"J+45","label":"…","note":"…"}]}` (2 à 10 étapes) ;
  - `tree` : arbre de décision `{"type":"tree","title":"…","root":{"label":"Question","children":[{"edge":"oui","label":"…"},{"edge":"non","label":"…","children":[…]}]}}` ;
  - `org` : organigramme `{"type":"org","title":"…","nodes":[{"id":"M","label":"Mère"},{"id":"F","label":"Fille"}],"links":[{"from":"M","to":"F","label":"80 %"}]}` (libellés de nœud ≤ 22 caractères, de lien ≤ 14) ;
  - `flow` : enchaînement `{"type":"flow","title":"…","steps":[{"label":"…","note":"…"}]}` (2 à 8 étapes) ;
  - `bars` : comparaison `{"type":"bars","title":"…","unit":"k€","items":[{"label":"…","value":120}]}` (2 à 8 barres, valeurs négatives admises).
  Le titre dit ce que montre le diagramme ; les libellés sont courts ; aucune donnée qui ne soit pas dans la fiche. Pas d'image, pas de SVG écrit à la main.
- UE 6 (anglais) : ajouter une ligne **Glossary:** `term — traduction` (4 à 8 termes).
- Pas de tableau de plus de 6 lignes. Formules en texte (Unicode autorisé : ₀ ¹ ² × − Σ ≤ ≥).

## Exercices (`content/<slug-ue>/<theme>/<id-notion>.json`)

Fichier `{ "exercises": [ ... ] }`, un fichier par notion (exception : le thème `cycles-audit` utilise un fichier par cycle, `cycles-audit/<cycle>.json`). Si le fichier existe, **ajouter** au tableau sans modifier les exercices existants.

Champs communs : `id` (`<ue>-<theme-court>-<notion-courte>-<nnnn>`, kebab-case, unique — vérifier par `grep -r` ; ne jamais réutiliser un id), `type`, `ue`, `theme`, `notion`, `difficulty` (1, 2, 3), `tags`, `source_ref` (précis : paragraphe, article, compte), `verified: false` (seul le relecteur passe à `true`), `estimated_seconds` réaliste (QCM 45-90 s, calcul 120-300 s, cas 300-900 s), `explanation`.

Règles par type :

- **mcq** : 4 options, une seule défendable (ou `multiple: true` si plusieurs bonnes réponses, à réserver à 10 % des QCM). Distracteurs plausibles (erreurs classiques). L'explication justifie la bonne réponse **et** dit pourquoi chaque distracteur est faux. Varier la position de la bonne réponse (pas toujours l'index 1).
- **Renvoi aux options** : l'interface numérote les options 1, 2, 3, 4. Dans une explication, désigner une option par son numéro (« l'option 2 ») ou par son contenu, jamais par une lettre.
- **true_false** : affirmation nette, ni piège de formulation ni double négation ; `justification` courte (1-2 phrases), `explanation` plus développée. Équilibrer vrai et faux (~50/50).
- **numeric** : données suffisantes dans l'énoncé, unité précisée, arrondi demandé explicite. Tolérance : `absolute` 0.5 à 1 pour des montants exacts en euros, `relative` 0.01 pour des calculs actualisés ou des montants arrondis, `absolute` 0.1 pour des pourcentages exprimés en points. La tolérance accepte les arrondis raisonnables mais rejette les erreurs classiques (vérifier que l'erreur type tombe hors tolérance). Calculs vérifiés avec node ; détail du calcul dans l'explication.
- **journal_entry** : comptes PCG exacts et assez détaillés (au moins 3 chiffres ; un sous-compte plus détaillé saisi par l'utilisateur sera accepté), écriture équilibrée, une ligne par compte. Indiquer dans l'énoncé si un compte particulier est attendu quand plusieurs sont défendables (ex. « utilisez le compte 4456 »). En consolidation, préciser les conventions de comptes dans l'énoncé.
- **case_study** : `context` de 10 à 20 lignes, 3 à 5 sous-questions enchaînées de `kind` variés (au moins une `numeric` et une `open`), `points` cohérents, `total_points` = somme.
- **Consolidation en normes françaises (règl. ANC 2020-01)** : contrôle exclusif = intégration globale ; contrôle conjoint = intégration proportionnelle, sans distinction coentreprise / activité conjointe ; influence notable = mise en équivalence. Retraitement des contrats de location-financement obligatoire. En IFRS : coentreprise = mise en équivalence (IFRS 11 §24), activité conjointe = quote-part des actifs et passifs (§20).
- **consolidation_case** : `entities` (une seule mère) et `links` cohérents avec le contexte, 3 à 5 `steps` avec `stage`, hypothèses explicites (amortissement ou non de l'écart d'acquisition, taux d'impôt, méthode), `total_points`.
- **audit_case** : `cycle` égal au `group` de la notion ; situation de 6 à 12 lignes avec des faits chiffrés ; 5 ou 6 procédures dont 2 ou 3 pertinentes ; risque Faible / Modéré / Élevé justifié par les faits de l'énoncé ; conclusion type et `key_points` qui ne supposent aucun fait absent de l'énoncé.
- **flashcard** : recto = question courte, verso = réponse de 2 à 6 lignes ; `explanation` = complément ou référence.

Variété : ne pas répéter le même scénario ou les mêmes chiffres d'un exercice à l'autre ; couvrir les différents aspects de la notion décrits dans la fiche de cours.

## Relecture indépendante (obligatoire avant `verified: true`)

Le relecteur n'est pas le rédacteur. Pour chaque exercice : lire l'énoncé seul, le résoudre (recalcul avec node), **puis** comparer avec la réponse et l'explication. Vérifier l'exactitude technique, la cohérence énoncé / réponse / explication, l'unicité de la bonne réponse, la tolérance, `source_ref`, les données suffisantes. Corriger ce qui est sûr, passer à `true` ; laisser `false` en expliquant si le fond est faux et la correction incertaine. Relire aussi les fiches de cours du lot : exactitude, références, 22-30 lignes, exemple recalculé, erreurs fréquentes exactes, liens vers les bonnes notions, diagrammes justes (chaque pourcentage, date ou étape vérifié contre le texte de la fiche). Terminer par `npm run validate`.
