# Contribuer à DSCG Trainer

Merci de vouloir améliorer l'application. Les contributions les plus utiles sont les corrections de contenu : une réponse fausse, une référence erronée ou un énoncé ambigu.

## Signaler une erreur

Dans l'application, chaque correction d'exercice et chaque fiche de cours a un lien **« Signaler une erreur »**. Il ouvre une issue GitHub pré-remplie avec l'identifiant de l'exercice, la notion et la référence citée. Décrivez le problème et, si possible, la correction avec sa source (article, paragraphe de norme, compte PCG). Vous pouvez aussi ouvrir une issue avec le modèle « Erreur de contenu ».

## Règles de contenu

Tout le contenu vit dans [`content/`](content/) et suit [`docs/content-guide.md`](docs/content-guide.md). L'essentiel :

- **Rédaction en propre, aucune copie.** Les textes officiels (programme du DSCG, PCG, Code de commerce, CGI, Code du travail, NEP, IFRS adoptées par l'UE) servent à la justesse : renvoi d'article ou de paragraphe et reformulation, citation courte seulement. Annales et sites tiers ne servent qu'à calibrer le niveau.
- **Chaque exercice porte un `source_ref` précis** et un id stable `<ue>-<theme-court>-<notion-courte>-<nnnn>`, jamais réutilisé ni renommé (la progression des utilisateurs y est rattachée). Les ids de notion de `content/taxonomy.json` ne se renomment jamais.
- **Relecture indépendante obligatoire.** Un nouvel exercice est ajouté avec `"verified": false`. Une autre personne (ou un autre agent) résout l'énoncé sans regarder la réponse, recalcule, compare, puis passe `verified` à `true`. Les exercices non vérifiés ne sont jamais publiés : le build les retire.
- **Fiches de cours** : `content/courses/<id-notion>.md`, 10 à 30 lignes, avec les références, les formules clés et une section « À retenir ».
- Langue : français (UE 6 en anglais).

Le format exact de chaque type d'exercice est défini par les schémas Zod de [`src/content/schema.ts`](src/content/schema.ts).

## Développement

```bash
npm ci
npm run dev              # http://localhost:5173 (exercices non vérifiés visibles)
npm run validate         # contenu : schémas, taxonomie, fiches
npm run validate:strict  # idem, tout exercice non vérifié est une erreur
npm test                 # Vitest
npm run lint && npm run typecheck
npm run build            # build de production (base /dscg-trainer/)
```

Avant toute pull request, `npm run lint && npm run validate && npm test && npm run build` doivent passer. Ne désactivez jamais un test pour obtenir une CI verte.

- Commits conventionnels : `feat:`, `fix:`, `content(ue4-ifrs): …`, `test:`, `docs:`, `chore:`…
- Le moteur (`src/engine/`) est fait de fonctions pures testées sans interface ; l'organisation du code est décrite dans [`CLAUDE.md`](CLAUDE.md).
- Chaque push sur `main` est testé puis déployé sur GitHub Pages par GitHub Actions.

## Licences

En contribuant, vous acceptez que votre code soit publié sous licence [MIT](LICENSE) et votre contenu (exercices, corrigés, fiches) sous licence [CC BY-SA 4.0](content/LICENSE).
