# Choix de solutions : cloud, SaaS, externalisation

**Références :** définition du cloud computing du NIST (SP 800-145, 2011) ; référentiel SecNumCloud (ANSSI) ; RGPD art. 28 (sous-traitant) et 44 à 49 (transferts hors UE) ; règlement (UE) 2023/2854 (Data Act), art. 23 à 29 (changement de fournisseur de services de traitement de données) ; PCG compte 205 et 611

**Enjeu :** choisir entre une solution hébergée en interne, un service cloud ou une infogérance engage le coût total sur plusieurs années, la sécurité des données et la dépendance au prestataire ; l'examen attend un TCO comparé sur une même durée et une lecture critique du contrat.

**Cloud** : accès par le réseau à des ressources informatiques mutualisées. Cinq caractéristiques (NIST) : libre-service à la demande, accès réseau large, mutualisation des ressources, élasticité rapide, service mesuré (paiement à l'usage).

**Modèles de service** (du moins au plus géré par le fournisseur) :
- **IaaS** : infrastructure (serveurs virtuels, stockage, réseau) ; le client gère système d'exploitation, intergiciels, applications et données ;
- **PaaS** : plateforme de développement et d'exécution (système, bases de données, intergiciels gérés) ; le client n'écrit, ne déploie et ne fait évoluer que ses applications et ses données ;
- **SaaS** : application complète accessible en ligne, sur abonnement ; le client gère ses données, ses utilisateurs et ses paramétrages.

**Modèles de déploiement** : public (ressources partagées entre clients), privé (dédié à une organisation, chez elle ou chez un hébergeur), communautaire, hybride. **Responsabilité partagée** : plus on monte vers le SaaS, plus le fournisseur prend en charge ; mais la sécurité des données, des accès et des paramétrages reste toujours au client.

**Externalisation (infogérance)** : confier tout ou partie de l'exploitation ou du développement à un prestataire. Le contrat fixe des **niveaux de service (SLA)** mesurables (disponibilité, délai de rétablissement) assortis de pénalités, les modalités de contrôle (droit d'audit ou rapport d'assurance type ISAE 3402 / SOC), la **réversibilité** (récupération des données dans un format exploitable et transfert en fin de contrat, sans exclusivité) et, pour les données personnelles, les clauses de sous-traitance imposées par le RGPD (art. 28) et la localisation des données. Depuis le 12 septembre 2025, le Data Act impose aux fournisseurs de cloud des clauses de changement de fournisseur (préavis de deux mois au plus, transition de trente jours au plus, sauf impossibilité technique) ; les frais de changement, limités jusque-là aux coûts directs, sont interdits à compter du 12 janvier 2027 (art. 25 et 29).

**Critères de choix** : coût total de possession (TCO), passage de dépenses d'investissement (CapEx) à des dépenses de fonctionnement (OpEx), élasticité, délai de mise en œuvre, sécurité et localisation des données (souveraineté, lois extraterritoriales ; qualification SecNumCloud pour les données sensibles), dépendance au fournisseur (lock-in), intégration avec l'existant, compétences internes à conserver.

**Comptabilisation** : un abonnement SaaS est une charge de l'exercice (le client n'acquiert ni ne contrôle le logiciel) ; une licence acquise et installée chez le client s'immobilise (compte 205) et s'amortit.

**Formules clés :** TCO = coûts initiaux + Σ coûts récurrents sur la durée d'analyse (actualisés si demandé) ; comparer à durée et périmètre identiques

## Exemple
Comparaison sur 5 ans d'une gestion commerciale. **Sur site** : serveurs 60 000 €, licences 90 000 €, intégration 30 000 € ; chaque année : maintenance 18 000 € (20 % des licences), exploitation interne 25 000 €, hébergement et énergie 5 000 €. **SaaS** : intégration et reprise des données 20 000 € ; chaque année : abonnement 60 000 €, administration interne 8 000 €.
TCO sur site = 180 000 + 5 × 48 000 = **420 000 €** ; TCO SaaS = 20 000 + 5 × 68 000 = **360 000 €**.
Le SaaS est moins coûteux de 60 000 € sur 5 ans, mais l'écart se réduit si la durée d'analyse s'allonge (le matériel amorti ne coûte plus que son renouvellement) : on vérifie aussi la réversibilité et la localisation des données avant de conclure.

```diagram
{"type":"bars","title":"TCO sur 5 ans de l'exemple","unit":"k€","items":[{"label":"Sur site","value":420},{"label":"SaaS","value":360}]}
```

## Erreurs fréquentes
- Confondre PaaS et IaaS : si l'entreprise veut seulement développer et déployer son application sans gérer système ni base de données, c'est du PaaS ; en IaaS elle administre encore les serveurs virtuels.
- Croire qu'en SaaS le fournisseur devient responsable du traitement des données personnelles : il n'est que sous-traitant (RGPD art. 28), le client reste responsable de traitement.
- Chercher la restitution des données dans la clause de SLA ou de pénalités : c'est la clause de réversibilité qui organise la sortie du contrat.
- Comparer un TCO sur site sans les coûts internes (exploitation, locaux, énergie) à un abonnement SaaS tout compris : la comparaison est faussée.

## À retenir
- En SaaS, l'entreprise reste responsable de ses données (RGPD) même si le fournisseur les héberge.
- Sans clause de réversibilité, le changement de prestataire peut être très coûteux.
- Comparer les solutions sur la même durée et le même périmètre (coûts internes inclus).

**Notions liées :** [Progiciels de gestion intégrés (ERP)](/cours/erp-progiciels-integres) · [Protection des données personnelles dans le SI](/cours/protection-donnees-rgpd-si) · [Politique de sécurité et continuité](/cours/politique-securite-continuite) · [Urbanisation et architecture du SI](/cours/urbanisation-architecture-si)
