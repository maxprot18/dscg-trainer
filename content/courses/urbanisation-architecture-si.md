# Urbanisation et architecture du système d'information

**Références :** démarche d'urbanisation du SI (métaphore de la cité, Club Urba-EA) ; cadre d'architecture d'entreprise TOGAF (The Open Group)

**Urbanisation** : démarche qui fait évoluer le SI par étapes, comme on aménage une ville, pour le rendre plus simple, plus réactif et moins coûteux à faire évoluer. Elle part d'une **cartographie de l'existant** et définit une **cible** et une trajectoire.

**Quatre vues (couches) du SI**, de la plus stable à la plus technique :
- vue **métier** : processus, activités, acteurs ;
- vue **fonctionnelle** : découpage en zones, quartiers et îlots (blocs fonctionnels) ;
- vue **applicative** : applications, logiciels, flux échangés ;
- vue **technique** (infrastructure) : serveurs, réseaux, bases, postes.

**Règles d'urbanisation** : un bloc fonctionnel a une seule responsabilité ; une donnée de référence (client, article, tiers) a un **propriétaire et une source uniques** (référentiel, MDM) ; les échanges entre blocs passent par des interfaces normalisées plutôt que par des liaisons point à point ; on recherche un **faible couplage** et une forte cohérence interne.

**Outils d'intégration** : EAI ou ESB (bus d'échanges), architecture orientée services (SOA), API, microservices. Le point à point fait croître le nombre d'interfaces en n(n−1)/2 pour n applications ; un bus en limite le nombre à n connecteurs.

**Disponibilité d'une chaîne** : composants en série (tous nécessaires) : A = A₁ × A₂ × … ; composants redondants en parallèle (un seul suffit) : A = 1 − (1 − A₁)(1 − A₂).

**Formules clés :** interfaces point à point = n(n − 1) ÷ 2 ; disponibilité série = Π Aᵢ ; parallèle = 1 − Π(1 − Aᵢ)

## À retenir
- On urbanise à partir du métier : les vues fonctionnelle et métier guident l'applicatif, pas l'inverse.
- Mettre des composants en série dégrade la disponibilité ; la redondance l'améliore.
- Le « plat de spaghettis » (interfaces point à point multiples) est le symptôme typique d'un SI non urbanisé.
