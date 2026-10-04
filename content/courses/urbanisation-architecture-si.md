# Urbanisation et architecture du système d'information

**Références :** démarche d'urbanisation du SI (métaphore de la cité, Club Urba-EA) ; cadre d'architecture d'entreprise TOGAF (The Open Group), cycle ADM

**Enjeu :** un SI construit par empilement d'applications devient coûteux à faire évoluer et fragile. L'urbanisation donne une méthode pour le simplifier progressivement ; l'examen demande de reconnaître les quatre vues, de compter les interfaces et de calculer une disponibilité.

**Urbanisation** : démarche qui fait évoluer le SI par étapes, comme on aménage une ville, pour le rendre plus simple, plus réactif et moins coûteux à faire évoluer, sans tout reconstruire. Elle part d'une **cartographie de l'existant**, définit une **cible** cohérente avec la stratégie et une **trajectoire** de projets qui s'en rapprochent à chaque évolution. TOGAF formalise la même idée pour l'architecture d'entreprise avec un cycle itératif (ADM) : vision, architectures métier, des données, applicative et technique, opportunités, plan de migration, gouvernance de la mise en œuvre.

**Quatre vues (couches) du SI**, de la plus stable à la plus technique :
- vue **métier** : processus, activités, acteurs, règles de gestion (ce que fait l'organisation) ;
- vue **fonctionnelle** : découpage en zones, quartiers et îlots (blocs fonctionnels), indépendant des logiciels qui les réalisent ;
- vue **applicative** : applications, logiciels, flux échangés entre eux ;
- vue **technique** (infrastructure) : serveurs, réseaux, bases, postes, hébergement.

```diagram
{"type":"org","title":"Les quatre vues du SI, du métier à la technique","nodes":[{"id":"M","label":"Vue métier"},{"id":"F","label":"Vue fonctionnelle"},{"id":"A","label":"Vue applicative"},{"id":"T","label":"Vue technique"}],"links":[{"from":"M","to":"F","label":"processus"},{"from":"F","to":"A","label":"blocs"},{"from":"A","to":"T","label":"flux"}]}
```

**Règles d'urbanisation** : un bloc fonctionnel a une seule responsabilité ; une donnée de référence (client, article, tiers) a un **propriétaire et une source uniques** (référentiel, MDM) et les autres applications n'en reçoivent que des copies synchronisées ; les échanges entre blocs passent par des interfaces normalisées plutôt que par des liaisons point à point ; on recherche un **faible couplage** (une application peut être remplacée sans toucher aux autres) et une forte cohérence interne.

**Outils d'intégration** : EAI ou ESB (bus d'échanges), architecture orientée services (SOA), API, microservices. Le point à point fait croître le nombre d'interfaces en n(n−1)/2 pour n applications ; un bus en limite le nombre à n connecteurs, chaque application ne dialoguant qu'avec le bus.

**Disponibilité d'une chaîne** : composants en série (tous nécessaires) : A = A₁ × A₂ × … ; composants redondants en parallèle (un seul suffit) : A = 1 − (1 − A₁)(1 − A₂). On repère le **maillon faible** de la chaîne et c'est lui que l'on redonde en priorité.

**Formules clés :** interfaces point à point = n(n − 1) ÷ 2 ; disponibilité série = Π Aᵢ ; parallèle = 1 − Π(1 − Aᵢ)

## Exemple
Un SI de 12 applications reliées deux à deux compte 12 × 11 ÷ 2 = **66 interfaces** ; avec un bus d'échanges, **12 connecteurs** suffisent.
La chaîne de vente en ligne enchaîne un site (disponibilité 99,9 %), un serveur de paiement (99,5 %) et une base de données (99,8 %) : A = 0,999 × 0,995 × 0,998 = **99,20 %**, soit environ 5,7 h d'indisponibilité par mois de 720 h. Si l'on double le serveur de paiement (maillon faible) par un second serveur identique, sa disponibilité devient 1 − 0,005² = 99,9975 % et la chaîne passe à 0,999 × 0,999975 × 0,998 ≈ **99,70 %**.

## Erreurs fréquentes
- Confondre vue fonctionnelle (zones, quartiers, îlots) et vue applicative (logiciels et flux) : les blocs fonctionnels existent indépendamment des applications qui les réalisent.
- Compter n(n − 1) interfaces point à point : avec des liaisons bidirectionnelles, chaque paire d'applications ne compte qu'une fois (8 applications : 28, non 56).
- Croire qu'un bus ne demande qu'un seul connecteur : il en faut un par application (n), ce qui reste bien inférieur à n(n − 1) ÷ 2.
- Additionner les disponibilités d'une chaîne ou retenir la plus faible : en série, elles se multiplient, le résultat est inférieur au maillon le plus faible.

## À retenir
- On urbanise à partir du métier : les vues fonctionnelle et métier guident l'applicatif, pas l'inverse.
- Mettre des composants en série dégrade la disponibilité ; la redondance l'améliore.
- Le « plat de spaghettis » (interfaces point à point multiples) est le symptôme typique d'un SI non urbanisé.
- Une donnée de référence : une source, un propriétaire, des copies synchronisées.

**Notions liées :** [Gouvernance des SI et alignement](/cours/gouvernance-si-alignement) · [ERP et intégration des processus](/cours/erp-progiciels-integres) · [Gouvernance et qualité des données](/cours/gouvernance-qualite-donnees) · [Politique de sécurité et continuité](/cours/politique-securite-continuite)
