# Progiciels de gestion intégrés (ERP) et intégration des processus

**Références :** PCG art. 213-8 (coût d'acquisition) et art. 611-1 à 611-5 (logiciels, règl. ANC 2014-03) ; comptes 205, 232, 2805, 721

**Enjeu :** l'ERP est le cœur du SI de gestion et le point d'entrée de l'auditeur comme du contrôleur de gestion. L'examen attend la logique de base unique, le choix paramétrage / spécifique, le calcul d'un coût total de possession et la comptabilisation du projet.

**ERP (PGI)** : progiciel composé de modules (finance, achats, ventes, stocks, production, paie…) partageant une **base de données unique** et un même référentiel (clients, articles, plan de comptes). Une saisie unique met à jour en temps réel tous les modules concernés : une réception de marchandises alimente à la fois les stocks, les dettes fournisseurs et la comptabilité. C'est un **progiciel standard** que l'on paramètre, pas un développement sur mesure, et il sert les opérations courantes (OLTP), à la différence d'un entrepôt de données tourné vers l'analyse.

**Apports** : intégration et cohérence des données, suppression des ressaisies et des interfaces entre logiciels, traçabilité (piste d'audit, chaque écriture renvoie à la pièce d'origine), processus standardisés (« meilleures pratiques » de l'éditeur), consolidation et reporting facilités. **Limites** : coût et durée du projet, rigidité, dépendance à l'éditeur et à l'intégrateur, résistance au changement, risque de dérive des délais et du budget ; une erreur de saisie se propage à tous les modules.

**Paramétrage ou spécifique** : le paramétrage adapte le progiciel par ses options prévues (plan de comptes, circuits de validation, règles de calcul). Le **développement spécifique** modifie ou complète le code pour une procédure propre à l'entreprise. Les spécifiques renchérissent le projet, puis la maintenance et chaque montée de version (le code doit être retesté et réadapté) : on aligne d'abord les processus sur le standard et l'on réserve le spécifique à ce qui fait réellement la différence.

**Projet ERP** : étude d'opportunité, cahier des charges, choix de l'éditeur et de l'intégrateur, paramétrage, reprise des données, tests, formation, démarrage (en une fois, « big bang », ou par lots de modules ou de sites), puis maintenance. Le **coût total de possession** (TCO) inclut licences ou abonnements (SaaS), intégration, matériel, formation, maintenance annuelle (souvent 15 à 22 % du prix des licences) et coûts internes (équipe projet, utilisateurs clés), sur toute la durée d'utilisation.

**Comptabilisation (PCG)** :
- licence acquise : compte 205 au coût d'acquisition (prix + coûts directement attribuables, dont le paramétrage et l'intégration nécessaires à la mise en service), amortie sur la durée d'utilisation (2805) ;
- logiciel créé en interne : compte 232 pendant le développement (production immobilisée, compte 721), puis 205 à la mise en service ; les phases d'étude préalable et d'analyse fonctionnelle restent en charges ;
- formation des utilisateurs, maintenance et abonnements SaaS : charges de l'exercice.

**Formules clés :** TCO sur n années = coûts initiaux + Σ coûts annuels de fonctionnement ; maintenance annuelle = prix des licences × taux contractuel

## Exemple
Projet ERP sur 5 ans : licences 300 k€, intégration et paramétrage 450 k€, serveurs 80 k€, formation 60 k€, maintenance 18 % des licences par an, équipe interne 40 k€ par an.
Maintenance annuelle = 300 × 18 % = 54 k€. TCO = 300 + 450 + 80 + 60 + (54 × 5) + (40 × 5) = **1 360 k€**, dont 890 k€ de coûts initiaux et 470 k€ de fonctionnement.
Comptabilisation : 205 pour 300 + 450 = **750 k€** (licence et coûts directement attribuables), 2183 pour 80 k€ ; la formation (60 k€) et la maintenance (54 k€ par an) sont des charges.

## Erreurs fréquentes
- Décrire l'ERP comme un ensemble de logiciels d'éditeurs différents reliés par des interfaces : c'est l'inverse, les modules partagent une base unique sans interface.
- Accepter tout développement spécifique au motif que l'ERP doit s'adapter à l'existant : on remet d'abord en cause le processus et l'on cherche la réponse par paramétrage.
- Immobiliser la formation des utilisateurs avec la licence : elle n'est jamais directement attribuable au logiciel et reste en charges.
- Limiter le coût du projet au prix des licences : la maintenance et les coûts internes sur la durée pèsent souvent autant que l'investissement initial.

## À retenir
- Base de données unique = information cohérente, mais une erreur de saisie se propage partout.
- La formation n'entre jamais dans le coût du logiciel ; le paramétrage nécessaire à la mise en service, si.
- Trop de spécifiques fait perdre l'intérêt du progiciel et alourdit chaque montée de version.
- Le TCO se calcule sur toute la durée d'utilisation, pas sur le seul investissement initial.

**Notions liées :** [Urbanisation et architecture du SI](/cours/urbanisation-architecture-si) · [Gestion de projets SI](/cours/gestion-projets-si) · [Cloud, SaaS et externalisation](/cours/cloud-saas-externalisation) · [Immobilisations en PCG](/cours/immobilisations-pcg)
