# Audit de la plateforme DSCG Trainer (version 1.4.2)

Date : 6 octobre 2026. Périmètre : sécurité, fonctionnalités, contenu, performance et technique. Fait après les versions 1.4.0 (sujets type d'examen, oral, plan d'examen) et 1.4.1-1.4.2 (contenu vérifié sur les textes officiels). Les audits précédents sont `docs/audit-v1.md` et `docs/audit-v2.md`.

## 1. Synthèse

L'application est saine. Aucune faille sérieuse n'a été trouvée. Elle n'a ni serveur, ni compte, ni donnée envoyée à un tiers, ce qui réduit la surface d'attaque au minimum.

Les manques tiennent surtout à ce choix « sans serveur » : progression liée à un appareil, réponses rédigées autocorrigées, pas de notifications. Côté contenu, il reste des thèmes à confronter aux textes officiels, et la profondeur des sujets d'examen est insuffisante.

| Domaine | État | Priorité |
| --- | --- | --- |
| Sécurité | Bon : 0 vulnérabilité npm, rendu sans HTML brut, données locales ; trois durcissements possibles | Faible |
| Fonctionnalités | Complètes pour un outil gratuit hors ligne ; manquent la synchronisation, la correction des réponses rédigées, le sujet complet | Moyenne à haute |
| Contenu | 1 558 exercices relus, références confrontées aux textes ; UE 3, UE 6, IFRS détaillées et programme officiel restent à vérifier | Haute |
| Performance | 92 à 96 sur mobile, mais 73 sur une page d'exercice d'UE 4 (fichier de 1,4 Mo) ; CLS de 0,068 partout | Moyenne |
| Accessibilité | 100 sur les six pages mesurées | Aucune |
| Technique | Lint, types, 219 tests, 8 parcours de bout en bout en CI | Faible |

## 2. Sécurité

### Ce qui est bien

- **Dépendances** : `npm audit` ne signale aucune vulnérabilité.
- **Rendu** : aucun `dangerouslySetInnerHTML`, `innerHTML` ni `eval` dans le code. Le Markdown des fiches est converti en éléments React, qui échappent tout le texte. Les liens externes s'ouvrent avec `rel="noopener noreferrer"`.
- **Données** : la progression, les erreurs, les notes d'oral et les enregistrements audio restent sur l'appareil (IndexedDB, localStorage, mémoire). Il n'y a ni cookie, ni traceur, ni appel réseau sortant hors chargement de l'application. Le bouton « signaler » ouvre une issue GitHub pré-remplie que l'utilisateur relit avant de l'envoyer : rien n'est transmis à son insu.
- **Paramètres d'URL** : le mode, la graine, l'UE et la liste d'UE sont validés contre des listes fermées (`parseSessionSearch`).
- **Importation de la progression** : elle se fait dans une transaction. Un fichier qui échoue n'efface pas la base existante (annulation de la transaction).
- **CI** : permissions minimales (`contents: read`), élargies seulement pour le déploiement. Le contenu non vérifié est retiré du build de production.

### Durcissements recommandés

| # | Constat | Risque | Correctif |
| --- | --- | --- | --- |
| S1 | Pas de politique de sécurité du contenu (CSP). GitHub Pages ne permet pas d'en-têtes, mais une balise `<meta http-equiv="Content-Security-Policy">` est possible. | Faible : utile seulement si une injection apparaissait un jour | CSP en `<meta>` : `default-src 'self'`, empreinte (hash) du script de thème en ligne, `media-src blob:` pour l'oral |
| S2 | Le fichier de progression importé n'est validé que par son en-tête (`app`, `version`) ; le contenu des tentatives, revues et sessions n'est pas contrôlé. | Faible : un fichier malformé peut faire planter les statistiques (récupéré par l'écran de secours), sans fuite de données | Schéma Zod de l'export, refus des enregistrements invalides, taille maximale du fichier |
| S3 | Le rendu Markdown traite comme interne tout lien commençant par `/`, donc aussi `//domaine.tld`, que React Router transforme en lien externe. | Très faible : le contenu est rédigé par le projet, pas par les utilisateurs | N'accepter que `/^\/(?!\/)/` |
| S4 | Les actions GitHub sont référencées par étiquette (`@v7`) et non par empreinte de commit. | Faible (chaîne d'approvisionnement) | Épingler les actions par SHA, avec Dependabot pour les mises à jour |

Aucune faille exploitable n'a été trouvée. Le jour où des comptes ou un paiement seront ajoutés (piste commerciale, `docs/audit-v2.md` § 5), il faudra un audit dédié : authentification, contrôle d'accès au contenu, RGPD.

## 3. Fonctionnalités manquantes

Par ordre d'impact pour un candidat :

1. **Sujet complet chronométré.** Les épreuves écrites durent 3 à 4 heures et enchaînent plusieurs dossiers. L'application propose 2 dossiers par UE et un examen blanc qui mélange dossiers et exercices courts. Il manque un mode « sujet complet » qui assemble 3 ou 4 dossiers à la durée exacte de l'épreuve, et 6 à 8 dossiers par UE pour le nourrir.
2. **Correction des réponses rédigées.** 207 exercices contiennent une réponse rédigée, que l'utilisateur note lui-même en cochant les points clés. Sans serveur, on peut au moins guider la note : repérer les points clés dont les mots-clés manquent dans la copie, comparer phrase à phrase avec le corrigé. Une vraie correction par IA suppose un serveur et une clé d'API.
3. **Explication par mauvaise réponse dans les QCM.** Une seule explication par exercice aujourd'hui. Il faudrait un champ par option dans le schéma, puis le compléter sur les 625 QCM par lots relus.
4. **Synchronisation entre appareils.** La progression reste dans le navigateur : on passe d'un appareil à l'autre par export et import manuels, avec rappel de sauvegarde. Une vraie synchronisation demande un serveur et des comptes.
5. **Difficulté adaptative et note prévisionnelle.** La révision intelligente choisit la notion à revoir, pas le niveau de difficulté. Aucune note estimée par UE n'est calculée à partir des examens blancs.
6. **Rappels.** Le rappel quotidien passe par un fichier d'agenda (.ics). Des notifications push, possibles sur une application installée (iPhone compris), demandent un serveur d'envoi.
7. **Oral d'UE 6.** 20 sujets, avec auto-évaluation seulement. On peut en ajouter, et proposer une transcription pour se relire. La transcription locale est encore peu fiable en français et en anglais dans les navigateurs ; la transcription en ligne envoie l'audio à un tiers.

## 4. Contenu

| Constat | Détail | Priorité |
| --- | --- | --- |
| Vérification sur les textes à terminer | UE 3 (contrôle de gestion, stratégie : peu de textes, mais des définitions normalisées), UE 6, fiches IFRS détaillées (IAS 16, 36, 37, 38, IFRS 9, 15, 16, paragraphe par paragraphe) | Haute |
| Programme officiel non confronté | La taxonomie suit l'arrêté du 4 août 2025, mais l'annexe 2 (PDF du BO) n'a pas pu être téléchargée (site protégé contre les robots) | Haute |
| Échéances 2027 | Renuméroter la TVA quand le CIBS sera disponible (en vigueur le 1er janvier 2027) ; suivre la transposition de la CSRD après Omnibus I et la loi française NIS 2 ; loi de finances 2027 en janvier | Haute en janvier 2027 |
| Date de validité | Aucune date « à jour au … » par fiche ; elle rendrait la revue annuelle visible | Moyenne |
| Déséquilibre entre UE | UE 4 : 702 exercices ; UE 3 : 102 ; UE 5 : 122, pour des effectifs d'inscrits comparables | Moyenne |
| Validation humaine | Tout le contenu a été rédigé et relu par des agents, désormais sur les textes officiels. Une relecture par un professionnel reste indispensable avant toute vente | Haute si vente |

## 5. Performance et accessibilité

Lighthouse mobile, sur le build local (performance / accessibilité / bonnes pratiques / SEO) :

| Page | Scores | CLS |
| --- | --- | --- |
| Accueil | 92 / 100 / 100 / 100 | 0,068 |
| S'entraîner | 96 / 100 / 100 / 100 | 0,068 |
| Fiche IAS 16 | 94 / 100 / 100 / 100 | 0,068 |
| Sujet type d'examen UE 4 | **73** / 100 / 100 / 100 | 0,068 |
| Oral | 96 / 100 / 100 / 100 | 0,068 |
| Progression | 95 / 100 / 100 / 100 | 0,068 |

- **Fichier de l'UE 4** : 1,4 Mo (366 Ko compressés) chargés en entier pour afficher un seul exercice. Le découper par thème ou charger l'exercice seul remonterait la page d'exercice au-delà de 90.
- **Décalage de mise en page de 0,068 sur toutes les pages** : il vient du remplacement de l'écran « Chargement… » par la page chargée à la demande. La correction de l'accueil en 1.4.0 n'a pas suffi. Il faut réserver la hauteur de l'écran de chargement, ou précharger le premier écran.
- **Cache hors ligne** : le service worker précharge 326 fichiers, environ 5,6 Mo, dès l'installation. C'est confortable hors ligne mais lourd en données mobiles. On pourrait mettre les UE en cache au premier usage plutôt qu'à l'installation.
- **Accessibilité** : 100 partout, aucun point relevé.

## 6. Technique

- **Qualité** : lint et typage propres, 219 tests unitaires, 8 parcours Playwright en CI avant déploiement, vérification automatique des références (`npm run check:refs`).
- **Dépendances** : React 18 et TypeScript 6 sont à jour dans leur branche ; React 19 et TypeScript 7 sont disponibles, sans urgence. Mises à jour mineures disponibles : Vite 8.3.3, Playwright 1.63, oxlint, lucide.
- **CI** : chaque push sur une branche ouverte en PR lance deux exécutions (événement push et événement pull_request). L'une a été annulée le 5 octobre faute de runner. Limiter le déclencheur push à `main` diviserait la charge par deux.
- **Textes officiels** : `npm run sources` dépend de miroirs (base LEGI sur GitHub, paquet npm) et de pages HTML (H2A, EUR-Lex) dont la structure peut changer. Le script échoue de façon visible ; à surveiller.

## 7. Priorités recommandées

1. **Contenu** : vérifier sur les textes l'UE 3, l'UE 6 et les fiches IFRS détaillées, et confronter la taxonomie au programme officiel dès que son PDF est fourni.
2. **Sujet complet** chronométré et 4 à 6 dossiers supplémentaires par UE.
3. **Performance** : découper le fichier de l'UE 4 et supprimer le décalage de mise en page.
4. **Pédagogie** : explications par mauvaise réponse des QCM, correction guidée des réponses rédigées.
5. **Sécurité** : CSP en balise meta, validation du fichier importé, liens internes stricts, actions épinglées. Petit chantier d'une demi-journée.
6. **Si vente** : comptes, synchronisation, paiement, relecture professionnelle (`docs/audit-v2.md` § 5).
