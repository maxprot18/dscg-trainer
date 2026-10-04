# Conduite de projets SI : méthodes en cascade et agiles

**Références :** Manifeste pour le développement agile de logiciels (2001) ; Scrum Guide (2020) ; méthode de la valeur acquise (PMI, PMBOK) ; PRINCE2 (gouvernance par étapes et cas d'affaire)

**Enjeu :** un projet SI se juge sur trois axes (périmètre, coût, délai) ; l'examen demande de choisir une méthode adaptée au besoin, d'identifier le rôle de chaque acteur et de mesurer l'avancement avec la valeur acquise.

**Acteurs** : la **maîtrise d'ouvrage** (MOA, le métier) exprime le besoin, finance et recette ; la **maîtrise d'œuvre** (MOE, DSI ou prestataire) conçoit et réalise. Un **comité de pilotage** (sponsor, MOA, MOE) arbitre coûts, délais et périmètre, tandis que le chef de projet rend compte de l'avancement et des risques ; PRINCE2 ajoute une justification continue par le **cas d'affaire** (business case), revu à chaque fin d'étape.

**Méthodes prédictives** : cascade (phases successives, chacune validée avant la suivante) et **cycle en V** (à chaque phase de conception correspond une phase de test : expression des besoins et spécifications ↔ recette, conception générale ↔ tests d'intégration, conception détaillée ↔ tests unitaires). Adaptées à un besoin stable et à un cadre contractuel (forfait) ; risque d'**effet tunnel** : le client ne voit le produit qu'à la fin, quand les écarts coûtent le plus cher à corriger.

**Méthodes agiles** : livraisons courtes et fréquentes, priorité au logiciel opérationnel et à la collaboration avec le client, acceptation du changement. **Scrum** : sprints de durée fixe (un mois au plus), backlog produit priorisé par le **Product Owner** (seul habilité à le modifier), **Scrum Master** garant de la méthode (il n'est ni chef ni donneur d'ordre), développeurs organisés en équipe autonome ; revue (démonstration) et rétrospective à chaque sprint ; la **vélocité** mesure le travail livré par sprint et sert à planifier les suivants. Une demande urgente en cours de sprint passe par le Product Owner, qui la priorise pour un prochain sprint ; le sprint en cours n'est ni rallongé ni modifié dans son objectif.

**Charge et délai** : charge en jours-hommes (j-h) ; délai ≈ charge ÷ effectif, mais ajouter des personnes à un projet en retard le retarde souvent davantage (loi de Brooks : temps de formation et de communication). Le **chemin critique** (PERT) est la suite des tâches sans marge : tout retard sur l'une d'elles décale la fin du projet.

**Valeur acquise** (à une date donnée) :
- VP : valeur planifiée (budget du travail prévu) ; VA : valeur acquise (budget du travail réalisé = % d'avancement × budget total BAC) ; CR : coût réel du travail réalisé ;
- écart de coût = VA − CR ; écart de délai = VA − VP (négatifs = défavorables) ;
- CPI = VA ÷ CR (< 1 : dépassement de coût) ; SPI = VA ÷ VP (< 1 : retard) ;
- estimation à terminaison EAC = BAC ÷ CPI (si la performance de coût se maintient).

**Formules clés :** VA = % d'avancement × BAC ; CPI = VA ÷ CR ; SPI = VA ÷ VP ; EAC = BAC ÷ CPI

## Exemple
Projet de migration d'un ERP, BAC = 600 000 €. Au point d'étape, 50 % du travail est réalisé, le budget du travail prévu à cette date était de 350 000 € et les coûts réels s'élèvent à 330 000 €.
VA = 50 % × 600 000 = 300 000 €. Écart de coût = 300 000 − 330 000 = **−30 000 €** ; écart de délai = 300 000 − 350 000 = **−50 000 €**.
CPI = 300 000 ÷ 330 000 = 0,909 ; SPI = 300 000 ÷ 350 000 = 0,857 : le projet dépense trop et prend du retard.
EAC = 600 000 ÷ 0,909 = **660 000 €**, soit un dépassement prévisionnel de 60 000 € si rien ne change.

## Erreurs fréquentes
- Associer la recette à la conception détaillée : dans le cycle en V, la recette (tests d'acceptation par la MOA) répond à l'expression des besoins ; la conception détaillée est vérifiée par les tests unitaires.
- Prendre le coût réel comme valeur acquise : la VA est toujours mesurée au coût budgété du travail réalisé ; avec VA = CR, le CPI vaudrait toujours 1.
- Croire que l'agilité accepte toute demande à tout moment : le changement est bienvenu entre deux sprints, via le backlog priorisé par le Product Owner, pas au milieu d'un sprint.
- Faire du Scrum Master le chef de projet qui ajoute des tâches ou prolonge le sprint : il facilite la méthode, il ne décide ni du contenu ni de la durée.

## À retenir
- La VA se calcule toujours au coût budgété, jamais au coût réel.
- Un CPI de 0,8 signifie que chaque euro dépensé ne produit que 0,80 € de travail budgété.
- Agile ne veut pas dire sans planification : le périmètre est variable, le délai et l'équipe sont fixes.
- Cycle en V pour un besoin stable et contractuel ; agile pour un besoin évolutif et un client disponible.

**Notions liées :** [Gouvernance des SI et alignement stratégique](/cours/gouvernance-si-alignement) · [Progiciels de gestion intégrés (ERP)](/cours/erp-progiciels-integres) · [Transformation numérique et création de valeur](/cours/transformation-numerique-valeur)
