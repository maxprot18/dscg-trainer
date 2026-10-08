# Audit de la plateforme DSCG Trainer (version 1.5.0)

Date : 8 octobre 2026. Périmètre : contenu, expérience utilisateur et interface, performance, accessibilité, sécurité et technique. Fait à la fin de la version 1.5.0, qui traitait les priorités de l'audit précédent (`docs/audit-v3.md`). Les mesures portent sur le build de production local.

## 1. Synthèse

L'application est finalisée dans le périmètre retenu, sans serveur : pas de comptes, de synchronisation ni de paiement. Les sept priorités de l'audit v3 sont traitées, à l'exception de la confrontation au programme officiel (PDF du BO inaccessible) et des fonctions qui exigent un serveur.

| Domaine | État | Évolution depuis l'audit v3 |
| --- | --- | --- |
| Contenu | 1 568 exercices et 271 fiches, tous relus ; 0 erreur sur un échantillon aléatoire de 60 exercices résolus à l'aveugle | UE 3, UE 6 et IFRS détaillées vérifiées sur les textes ; 10 dossiers de plus ; explication de chaque option des 625 QCM |
| Pédagogie | Sujet complet, correction guidée, difficulté adaptative, note prévisionnelle, date de révision des fiches | Cinq fonctions nouvelles |
| UX / UI | §4 | Audit indépendant de tous les parcours, mobile et desktop, clair et sombre |
| Performance | 94 à 97 sur les pages principales ; CLS 0 partout | Page d'exercice d'UE 4 : 73 → 94 ; session rapide au premier chargement : 14 s → 3 s |
| Accessibilité | 100 sur les pages principales, après deux corrections | Rôle des options de QCM, nom de la barre d'avancement |
| Sécurité | CSP, import validé, liens stricts, Zod sans eval, actions épinglées | Les quatre durcissements de l'audit v3 sont faits |
| Technique | Lint, types, 246 tests unitaires, 9 parcours de bout en bout, 0 vulnérabilité | Dépendances à jour dans leur branche, Dependabot |

## 2. Contenu

### Volume

| UE | Exercices | dont sujets type d'examen | Fiches |
| --- | --- | --- | --- |
| UE 1 | 262 | 4 | 43 |
| UE 2 | 254 | 4 | 43 |
| UE 3 | 104 | 4 | 16 |
| UE 4 | 704 | 4 | 129 |
| UE 5 | 124 | 4 | 20 |
| UE 6 | 120 (en anglais) | oral : 20 sujets | 20 |
| Total | 1 568 | 20 | 271 |

Chaque QCM (625) a désormais une explication par option, relue de façon indépendante. Les 228 QCM posés dans les cas pratiques n'en ont pas encore : ils ont une explication par sous-question.

### Qualité : échantillon aléatoire

60 exercices tirés au sort, stratifiés par UE (11, 11, 8, 14, 8, 8), ont été résolus à l'aveugle par un agent indépendant, avec les textes officiels (codes, PCG, ANC 2020-01, IFRS, NEP, textes de l'Union).

| Verdict | Nombre |
| --- | --- |
| Correct | 55 |
| Défaut mineur | 5 |
| Erreur (réponse fausse, règle fausse ou périmée) | 0 |

Taux d'erreur observé : 0 % (intervalle de confiance à 95 % : 0 à 6 % environ). Les cinq défauts viennent de changements réglementaires récents ou de formulations : libellé du compte 667 depuis le règlement ANC 2022-06, cas de durabilité dont l'entreprise sort du champ de la CSRD depuis Omnibus I, référence manquante, compte du vrai mali non imposé par l'énoncé, faute de français. Ils sont corrigés, et tout le contenu a été balayé sur ces deux sujets réglementaires (§ 7).

### Vérification sur les textes

Tout le contenu est désormais confronté aux textes officiels téléchargés (`npm run sources`) : UE 1, 2, 4 et 5 en 1.4.1 et 1.4.2, UE 3, UE 6 et IFRS détaillées en 1.5.0. `npm run check:refs` contrôle automatiquement environ 4 300 références : trois signalements, voulus (IAS 1 « ex- », IAS 17, IAS 31), et aucun compte hors nomenclature.

### Limites

- **Programme officiel** : la taxonomie suit l'arrêté du 4 août 2025, mais l'annexe 2 (PDF du BO) n'a toujours pas pu être téléchargée, le site étant protégé contre les robots.
- **Textes non disponibles en open data** : ISA, ESRS, Code monétaire et financier, règlement général de l'AMF, Code de l'environnement (hors miroir) ; les points qui en dépendent ont été tranchés par recherche web sur deux sources sérieuses.
- **Échéances** : recodification de la TVA dans le CIBS au 1er janvier 2027, loi de finances 2027, transposition d'Omnibus I et de NIS 2 en droit français.
- **Relecture humaine** : tout a été rédigé et relu par des agents. Avant toute vente, une relecture par un professionnel reste indispensable.

## 3. Pédagogie

| Fonction | Ce qu'elle apporte | Limite |
| --- | --- | --- |
| Sujet complet | Conditions de l'épreuve : 2 ou 3 dossiers à la durée officielle, note sur 20 | 4 dossiers par UE : les sujets se répètent vite |
| Explication par option | Comprendre pourquoi un distracteur est faux | Pas encore dans les QCM des cas |
| Correction guidée | Points clés repérés dans la copie et pré-cochés | Repérage par mots-clés : une reformulation peut échapper, un mot présent ne prouve pas le raisonnement |
| Difficulté adaptative | Niveau visé par notion selon la réussite récente (5 dernières tentatives) | Ne joue qu'à l'intérieur des notions choisies par la répétition espacée |
| Note prévisionnelle | Moyenne pondérée des trois derniers examens d'une UE | Dépend du nombre d'examens passés |
| Date de révision des fiches | Date du dernier commit de chaque fiche | Date de modification, pas de vérification complète |

## 4. Expérience utilisateur et interface

(À compléter par l'audit indépendant.)

## 5. Performance et accessibilité

Lighthouse mobile, sur le build local (performance / accessibilité / bonnes pratiques / SEO) :

| Page | Scores | CLS |
| --- | --- | --- |
| Accueil | 97 / 100 / 100 / 100 | 0 |
| S'entraîner | 97 / 100 / 100 / 100 | 0 |
| Fiche IAS 16 | 96 / 100 / 100 / 100 | 0 |
| Sujet type d'examen UE 4 | 94 / 100 / 100 / 100 | 0 |
| Oral | 96 / 100 / 100 / 100 | 0 |
| Progression | 97 / 100 / 100 / 100 | 0 |
| Session rapide (premier chargement) | 91 | 0 |
| Session par thème (premier chargement) | 90 | 0 |
| Sujet complet UE 2 (premier chargement) | 83 / 100 / 100 / 100 | 0 |

- **Chargement du contenu** : un fichier JS par fichier de contenu (547 fichiers). Une page d'exercice charge son seul fichier grâce à un index généré au build, une session le dossier de son thème ou de son UE, une session rapide douze fichiers tirés au sort. Après la première visite, le service worker sert tout depuis le cache.
- **Décalage de mise en page** : il venait du bandeau « Installer l'application », qui apparaissait en haut après le chargement. Il flotte maintenant au-dessus de la navigation : CLS 0 sur toutes les pages.
- **Reste à gagner** : le sujet complet et l'examen blanc chargent toute leur UE (une cinquantaine de fichiers) au premier lancement. Le cache hors ligne précharge 6,4 Mo à l'installation, ce qui pèse sur les données mobiles.
- **Accessibilité** : 100 partout après correction de deux défauts relevés par Lighthouse (options de QCM dans une liste à rôle de groupe de choix, barre d'avancement sans nom).

## 6. Sécurité

Les quatre durcissements de l'audit v3 sont faits :

| # | Mesure | Détail |
| --- | --- | --- |
| S1 | Politique de sécurité du contenu | Balise meta ajoutée au build : `default-src 'self'`, scripts limités au site et à l'empreinte du script de thème, `object-src 'none'`, `form-action 'none'`. Zod est configuré sans eval pour la respecter ; aucune violation relevée sur les pages principales. |
| S2 | Import de la progression | Schéma Zod de tout le fichier, taille maximale de 20 Mo, message clair en cas de refus ; la base existante n'est pas touchée. |
| S3 | Liens internes | Seuls les chemins `/…` (et non `//domaine`) sont traités comme internes. |
| S4 | Chaîne d'approvisionnement | Actions GitHub épinglées par empreinte, Dependabot hebdomadaire (actions et npm). |

`npm audit` : 0 vulnérabilité. Aucune donnée ne quitte l'appareil. Un audit dédié reste nécessaire si des comptes ou un paiement sont ajoutés (authentification, contrôle d'accès, RGPD).

## 7. Technique

- **Qualité** : lint (oxlint) et typage propres, 246 tests unitaires, 9 parcours Playwright en CI avant déploiement (dont le sujet complet), validation du contenu et vérification des références.
- **CI** : une seule exécution par push (déclencheur limité à `main` et aux pull requests), historique git complet pour dater les fiches.
- **Dépendances** : à jour dans leur branche (Vite 8.3.4, lucide, oxlint). Restent : React 19 et TypeScript 7 (sans urgence), Playwright 1.64 (lié à la version du navigateur de l'environnement), `@vitejs/plugin-react` 6.1.2 (conflit de dépendance optionnelle avec Babel 8, à réessayer).
- **Index des exercices** : module virtuel généré au build (fichier de chaque exercice, liste des sujets type d'examen). `npm run validate` avertit désormais d'un exercice rangé hors du dossier de son thème, condition du chargement par thème.

## 8. Priorités recommandées

(À compléter après l'audit UX.)
