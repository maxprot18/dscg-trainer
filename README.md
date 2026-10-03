# DSCG Trainer

Application web installable (PWA) pour s'entraîner au DSCG : audit, comptabilité, IFRS, consolidation, finance, droit et fiscalité. Fonctionne hors ligne sur téléphone et ordinateur ; la progression reste dans le navigateur.

**Site :** https://maxprot18.github.io/dscg-trainer/

> Projet en construction (phase 0 : cadrage). Voir [`PROGRESS.md`](PROGRESS.md) pour l'avancement et [`SPEC.md`](SPEC.md) pour le cahier des charges.

## Installer sur le téléphone

Ouvrir le site, puis « Ajouter à l'écran d'accueil » (Safari sur iPhone, menu ⋮ de Chrome sur Android).

## Développement

```bash
npm ci
npm run dev        # http://localhost:5173
npm run validate   # vérifie tout le contenu de /content
npm test
npm run build
```

Le contenu (exercices, fiches de cours, taxonomie du programme) vit dans [`content/`](content/), au format JSON validé par les schémas Zod de [`src/content/schema.ts`](src/content/schema.ts). Chaque push sur `main` est testé puis déployé sur GitHub Pages par GitHub Actions.

## Licences

- Code : [MIT](LICENSE)
- Contenu (`content/`) : [CC BY-SA 4.0](content/LICENSE)

Les exercices sont rédigés en propre à partir des textes officiels publics (programme du DSCG, PCG, codes, NEP, IFRS adoptées par l'UE) ; aucun contenu n'est repris de sites tiers.
