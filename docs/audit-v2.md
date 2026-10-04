# Audit de la plateforme DSCG Trainer (version 1.3.0) et piste commerciale

Date : 4 octobre 2026. Périmètre : contenu, produit et pédagogie, technique, conditions d'une vente.

## 1. Synthèse

La base est solide : 1 400 exercices relus, 271 fiches structurées, moteur de révision testé, application rapide et accessible (Lighthouse 94-95 / 100 / 100 / 100). Les faiblesses tiennent moins au code qu'à trois écarts :

1. **L'examen réel n'est pas simulé.** Les épreuves du DSCG sont des dossiers de 3 à 4 heures avec annexes et réponses rédigées ; l'examen blanc de l'application assemble de courts exercices (cas de 5 questions au plus).
2. **Le contenu n'a été validé par aucun humain du métier.** Rédaction et relecture sont faites par des agents d'IA, avec des textes officiels souvent lus au travers de résumés (Légifrance, ANC et BOFiP bloqués dans l'environnement).
3. **Rien n'est protégé ni monétisable en l'état.** Dépôt public, contenu sous CC BY-SA 4.0 (réutilisation commerciale autorisée à quiconque), progression stockée seulement dans le navigateur, hébergement GitHub Pages interdit aux usages commerciaux.

La vente est envisageable, sur un marché réel (17 281 candidats DSCG en 2025, en hausse de 7,6 %) mais concurrentiel. Elle suppose d'abord de lever les trois écarts ci-dessus.

## 2. Contenu

| Constat | Détail | Gravité |
| --- | --- | --- |
| Notions trop peu fournies | 54 notions ont 3 ou 4 exercices : toute l'UE 6 (moyenne 3,5), 19 notions sur 20 en UE 5, 15 sur 43 en UE 1 | Moyenne (phase 8 prévue) |
| Pas de sujet de type examen | Cas de 5 sous-questions au plus ; aucun dossier long avec annexes, barème et copie type | Haute |
| UE 6 décalée de l'épreuve | L'épreuve est un oral (1 h de préparation, 15 min d'exposé, 15 min d'entretien) ; l'application ne propose que de l'écrit | Haute pour l'UE 6 |
| Validation humaine absente | Aucune relecture par un expert-comptable ou un enseignant DSCG ; les numéros d'articles non confirmés sont cités sans numéro | Haute avant toute vente |
| Mise à jour annuelle non organisée | Fiscalité, social et normes changent chaque année (loi de finances, ANC, IFRS) ; pas de date de validité par fiche ni de processus de révision | Moyenne, haute si vendu |
| Corrections peu ciblées | Une explication par exercice ; pas d'explication par mauvaise réponse de QCM | Faible |
| Répartition des types | Conforme à la cible (40 % QCM, 15 % vrai/faux…) ; difficulté 30 / 50 / 20 % respectée | Aucun |

## 3. Produit et pédagogie

**Points forts.** Répétition espacée par notion, mode erreurs, flashcards, examen blanc chronométré et reprenable, progression détaillée, fiches liées aux exercices, recherche, mode sombre, hors ligne, impression par UE.

**Manques, par ordre d'impact :**

1. **Perte de progression possible sur iPhone.** Safari efface les données d'un site non installé après 7 jours sans visite ; l'application ne demande pas le stockage persistant et ne rappelle pas de sauvegarder. Correctif simple et urgent, même sans projet commercial.
2. **Pas de compte ni de synchronisation.** Changer d'appareil impose un export et un import manuels ; impossible de travailler sur ordinateur et téléphone à la fois.
3. **Pas de point de départ ni de plan.** Aucun test de positionnement, aucune date d'examen à saisir, aucun plan de révision calculé à rebours.
4. **Réponses rédigées autocorrigées.** L'utilisateur coche lui-même les points clés : honnête mais peu exigeant, alors que l'examen est surtout rédactionnel.
5. **Pas de rappels.** Les révisions dues ne sont signalées qu'à l'ouverture ; les notifications web sont possibles sur une application installée, iPhone compris.
6. **Préparation à l'oral d'UE 6 absente** (sujet tiré, chrono de préparation, enregistrement de l'exposé, grille d'auto-évaluation).

## 4. Technique

| Constat | Détail | Priorité |
| --- | --- | --- |
| Qualité générale | 7 600 lignes de code, 199 tests, lint et typecheck propres, 0 vulnérabilité (`npm audit`), CI qui bloque le déploiement si un contrôle échoue | Rien à faire |
| Stockage persistant | Aucun appel à `navigator.storage.persist()` | Haute |
| Tests de bout en bout | Les parcours dans le navigateur ne sont vérifiés qu'à la main ; pas de Playwright en CI | Moyenne |
| Suivi des erreurs et de l'usage | Aucun : impossible de savoir ce qui plante ou ce qui sert, donnée indispensable avant de vendre | Moyenne |
| Poids du contenu UE 4 | Fichier de 1,4 Mo (356 Ko compressés), chargé en entier à la première question d'UE 4 | Faible |
| Décalage de mise en page | 0,07 sur toutes les pages, à l'arrivée de chaque écran | Faible |
| Dépendances | React 18 et TypeScript 6 à jour dans leur branche ; React 19 disponible, migration sans urgence | Faible |

## 5. Vendre l'application

### Le marché

- **Volume** : 17 281 candidats inscrits à au moins une épreuve en 2025 ; UE 4 9 702 inscrits, UE 1 8 616, UE 2 à UE 6 entre 4 400 et 4 900 chacune ; 2 825 diplômés. Source : rapport du jury 2025.
- **Concurrence directe** :
  - Cockpit Compta : QCM adaptatifs, répétition espacée, simulations chronométrées, 3 589 questions et 665 cas tirés des annales officielles, DCG, DSCG et DEC pour 14,90 € par mois, 10 QCM par jour gratuits.
  - SIMDCG : contenus générés par IA et simulateur d'entretien.
- **Concurrence indirecte** : stages intensifs en ligne (Zéro en Compta, de 199 à 459 € par UE), préparations complètes à distance (ENOES, environ 1 000 € par UE ; 2 000 à 6 000 € le cursus), manuels, et Compta Online, gratuit.

Le positionnement possible est celui d'un outil d'entraînement quotidien, mobile et hors ligne, moins cher qu'une prépa et plus complet que les QCM seuls, grâce aux fiches, aux écritures corrigées compte par compte et aux cas guidés. Cockpit occupe déjà ce créneau, et sur un périmètre plus large. Il faut donc un différenciant net : sujets de type examen corrigés, oral d'UE 6, qualité validée par un professionnel.

### Prérequis bloquants

1. **Propriété du contenu.** Le contenu publié sous CC BY-SA 4.0 peut être copié et revendu légalement par n'importe qui, et le dépôt public le rend téléchargeable. En tant qu'auteur unique, tu peux rendre le dépôt privé et publier les versions futures sous une licence propriétaire ; les versions déjà publiées restent sous CC BY-SA. Autre point : un contenu entièrement généré par une IA n'est en principe pas protégé par le droit d'auteur en France, faute d'auteur humain. La valeur défendable tient donc au produit, à la marque, aux mises à jour et à la validation par un expert, pas à l'exclusivité du texte.
2. **Validation par un professionnel.** Une erreur dans un contenu payant engage ta responsabilité et la crédibilité du produit. Il faut une relecture par un expert-comptable ou un enseignant du DSCG, au moins sur l'UE 4 et l'UE 1, puis une mise à jour à chaque loi de finances. C'est le principal poste de coût, à chiffrer avec la personne retenue.
3. **Comptes, paiement et hébergement.** Il faut un serveur pour l'authentification, la synchronisation et le contrôle des droits (par exemple Supabase ou Firebase), un paiement (Stripe, environ 1,5 % + 0,25 € par carte européenne) et un hébergement autorisant le commerce. GitHub Pages l'interdit : Cloudflare Pages ou Vercel conviennent. Le contrôle d'accès suppose aussi de ne plus livrer tout le contenu dans les fichiers publics de l'application.
4. **Cadre légal.** Statut (la micro-entreprise suffit pour démarrer), mentions légales, CGV avec renonciation au droit de rétractation pour un contenu numérique fourni immédiatement, politique de confidentialité RGPD dès qu'il y a des comptes. Le nom ne doit pas laisser croire à un lien avec le ministère ou le SIEC, et une recherche d'antériorité à l'INPI s'impose avant de déposer une marque.

### Modèles possibles

| Modèle | Prix indicatif | Pour | Contre |
| --- | --- | --- | --- |
| Freemium en abonnement | Gratuit : 1 UE ou 10 questions par jour ; Premium : 9,90 € par mois ou 49 € par session d'examen | Standard du marché, revenu récurrent | Face à Cockpit sur son terrain |
| Pass par UE jusqu'à l'examen | 19 à 29 € par UE | Lisible pour un candidat qui passe 2 ou 3 UE par an | Revenu saisonnier |
| Licence pour écoles et prépas | Quelques euros à quelques dizaines d'euros par étudiant et par an | Peu de clients pour beaucoup d'utilisateurs, cycle long | Exige un tableau de bord enseignant et des factures |
| Applications iOS et Android | Mêmes prix, commission de 15 % | Visibilité dans les stores | Coût de publication, la PWA suffit fonctionnellement |

**Ordre de grandeur (hypothèse, non une prévision).** Avec 2 à 5 % des 17 000 candidats payant 49 € par an, on obtient 350 à 850 clients, soit environ 17 000 à 42 000 € de chiffre d'affaires annuel, avant coûts de validation, de mise à jour et d'acquisition. Étendre au DCG, qui compte davantage de candidats, est le principal levier de croissance, à chiffrer.

### Plan suggéré

1. **Valider la demande sans rien construire de lourd.** Une page d'attente avec inscription, la version actuelle gratuite, une mesure d'usage respectueuse de la vie privée, et 20 à 30 candidats interrogés sur ce qu'ils paieraient et pourquoi.
2. **Protéger.** Dépôt privé, nouvelle licence pour le contenu à venir, nom et domaine.
3. **Différencier.** Sujets de type examen corrigés avec barème, oral d'UE 6, relecture professionnelle et date de validité par fiche.
4. **Monétiser.** Comptes et synchronisation, paiement Stripe, freemium, CGV, hébergement commercial.

## 6. Priorités recommandées, avec ou sans vente

1. Stockage persistant et rappel de sauvegarde sur iPhone (petit, urgent).
2. Phase 8 : compléter les 54 notions à 3 ou 4 exercices (UE 1, 5, 6).
3. Sujets de type examen : au moins deux dossiers longs corrigés par UE écrite.
4. Mode oral pour l'UE 6.
5. Date d'examen, test de positionnement et plan de révision.
6. Tests de bout en bout en CI, suivi des erreurs.
7. Si vente : relecture professionnelle, puis comptes et paiement.

## Sources

- [Rapport du jury DSCG 2025 (SIEC)](https://siec.education.fr/candidats/docutheque/download/dcg-dscg-rapports-de-jury/Rapport%20du%20jury%20DSCG%202025-pdf) et [synthèse Compta Online](https://www.compta-online.com/analyse-du-president-du-jury-dscg-ao8590)
- [Cockpit Compta](https://cockpit-compta.fr/), [Zéro en Compta](https://www.zeroencompta.com/shop/acces-annuel-a-1-ue-du-dscg-connect-49), [ENOES](https://www.enoes.com/formations/dscg/formation-e-learning/), [SIMDCG](https://www.simdcg.com/), [prix du DSCG](https://www.encg-formation.com/2026/08/31/prix-dscg/)
- [Droit d'auteur et IA générative (APIE, ministère de l'Économie)](https://www.economie.gouv.fr/apie/quel-droit-dauteur-lere-de-lintelligence-artificielle-generative)
- [Limites de stockage des navigateurs (MDN)](https://developer.mozilla.org/fr/docs/Web/API/API_IndexedDB/Browser_storage_limits_and_eviction_criteria), [effacement après 7 jours sur Safari](https://www.itnews.com.au/news/apple-cops-flak-for-deleting-local-browser-storage-after-7-days-539833)
- [Usage commercial de GitHub Pages](https://github.com/orgs/community/discussions/37435)
