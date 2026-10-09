# DSCG Trainer

Application web installable (PWA) pour s'entraîner au DSCG : audit, comptabilité, IFRS, consolidation, finance, droit, fiscalité, contrôle de gestion, systèmes d'information et anglais des affaires. Elle fonctionne hors ligne sur téléphone et ordinateur ; la progression reste dans le navigateur.

**Site :** https://maxprot18.github.io/dscg-trainer/ · version 1.4.2 ([journal des versions](CHANGELOG.md))

<p>
  <img src="docs/screenshots/accueil.png" alt="Accueil : objectif du jour, série et contenu disponible" width="200">
  <img src="docs/screenshots/fiche.png" alt="Fiche de cours IAS 16 : règles, diagramme en barres et exemple résolu" width="200">
  <img src="docs/screenshots/bilan.png" alt="Bilan de session : notions à revoir et exercices" width="200">
  <img src="docs/screenshots/progression-sombre.png" alt="Progression en mode sombre" width="200">
</p>

## Contenu

- **1 578 exercices**, tous relus de façon indépendante : UE 1 (264), UE 2 (256), UE 3 (106), UE 4 (706), UE 5 (126), UE 6 (120, en anglais) ; au moins 5 par notion ; chaque option de chaque QCM (625 QCM et 256 QCM posés dans les cas) a son explication.
- **30 sujets type d'examen** : six dossiers longs par UE écrite (60 à 90 minutes, notés sur 20), avec annexes et questions enchaînées.
- **20 sujets d'oral** d'anglais des affaires (UE 6) : document, consigne, plan type, vocabulaire et questions du jury.
- **8 types** : QCM, vrai / faux, calcul, écriture comptable corrigée compte par compte, cas pratique, cas de consolidation guidé, cas d'audit, flashcard.
- **271 fiches de cours**, une par notion du programme officiel (arrêté du 4 août 2025), toutes relues de façon indépendante : références (articles, paragraphes de normes, comptes PCG), règles, formules clés, **exemple chiffré résolu**, **erreurs fréquentes à l'examen**, « À retenir », notions liées ; **172 diagrammes** (frises, arbres de décision, organigrammes, flux, barres) ; glossaire anglais → français en UE 6.

## Fonctionnalités

- **S'entraîner** : session rapide (10 questions, 5 minutes), session par UE, thème ou notion, **révision intelligente** par répétition espacée (SM-2), **mode erreurs**, **flashcards**, **examen blanc** et **sujet complet** (dossiers seulement) chronométrés à la durée de l'épreuve, en vrai mode épreuve (navigation libre entre exercices et questions, annexes à côté des questions, alertes de fin), notés sur 20, corrigés à la fin et reprenables s'ils sont interrompus ; difficulté adaptative en révision intelligente ; correction guidée des réponses rédigées.
- **Préparer l'examen** : date d'examen et compte à rebours, plan de révision à rebours avec rythme quotidien, test de positionnement par UE, rappel quotidien dans l'agenda, sujets type d'examen, **oral blanc d'UE 6** chronométré (préparation, exposé enregistré, entretien, auto-évaluation).
- **Progression** : note prévisionnelle par UE, objectif quotidien, taux de réussite par UE, thème, notion et type d'exercice, carte de chaleur du programme, activité des huit dernières semaines, série de jours, historique des sessions, export et import JSON.
- **Cours** : entrée par UE, une fiche par notion mise en page par partie (enjeu, règles, exemple résolu, erreurs fréquentes, à retenir) avec diagrammes, maîtrise et fiches lues, date de dernière révision, notions précédente et suivante, lien direct vers les exercices, fiches d'une UE à imprimer.
- **Qualité de vie** : mode sombre, recherche plein texte (raccourci « / »), raccourcis clavier (1-9 pour répondre, Entrée pour valider), autocomplétion des comptes PCG dans les écritures, marque-pages « à revoir plus tard », bouton « signaler une erreur » qui ouvre une issue GitHub pré-remplie, bandeau de mise à jour.

<p>
  <img src="docs/screenshots/entrainement.png" alt="Écran S'entraîner : session rapide, révision intelligente, erreurs, examen blanc, flashcards" width="200">
  <img src="docs/screenshots/cours-ue.png" alt="Cours d'une UE : thèmes, notions avec niveau de maîtrise" width="200">
  <img src="docs/screenshots/exercice.png" alt="Écriture comptable : saisie avec libellés des comptes et bouton Équilibrer" width="200">
  <img src="docs/screenshots/progression.png" alt="Progression : objectif, chiffres clés et activité hebdomadaire" width="200">
</p>

<img src="docs/screenshots/fiche-desktop.png" alt="Fiche de cours sur grand écran en mode sombre, avec sommaire et notions du thème" width="820">

## Installer sur le téléphone

Ouvrir le site, puis « Ajouter à l'écran d'accueil » (Safari sur iPhone, menu ⋮ de Chrome sur Android). L'application se met à jour toute seule et reste utilisable hors ligne.

La progression est stockée dans le navigateur de l'appareil ; l'application demande un stockage persistant et rappelle de sauvegarder quand c'est utile. Pour sauvegarder ou changer d'appareil, utilisez **Réglages → Exporter ma progression**, puis **Importer** sur l'autre appareil.

## Développement

```bash
npm ci
npm run dev        # http://localhost:5173
npm run validate   # vérifie tout le contenu de /content
npm test
npm run build
npm run test:e2e   # parcours dans le navigateur (Playwright), après le build
```

Le contenu (exercices, fiches de cours, taxonomie du programme) vit dans [`content/`](content/), au format JSON validé par les schémas Zod de [`src/content/schema.ts`](src/content/schema.ts). Chaque push sur `main` est testé puis déployé sur GitHub Pages par GitHub Actions. Pour contribuer, voir [`CONTRIBUTING.md`](CONTRIBUTING.md).

## Licences

- Code : [MIT](LICENSE)
- Contenu (`content/`) : [CC BY-SA 4.0](content/LICENSE)

Les exercices sont rédigés en propre à partir des textes officiels publics (programme du DSCG, PCG, codes, NEP, IFRS adoptées par l'UE) ; aucun contenu n'est repris de sites tiers.
