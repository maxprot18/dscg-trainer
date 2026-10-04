# Gouvernance des SI et alignement stratégique (COBIT, ITIL)

**Références :** ISO/IEC 38500 (gouvernance des technologies de l'information) ; COBIT 2019 (ISACA) ; ITIL 4 (Axelos) ; modèle d'alignement stratégique de Henderson et Venkatraman (1993)

**Enjeu :** le SI n'est plus une affaire de techniciens : la direction générale doit s'assurer qu'il sert la stratégie, crée de la valeur et maîtrise ses risques. À l'examen, on attend de distinguer gouvernance et management, COBIT et ITIL, incident et problème, et de lire un indicateur de niveau de service.

**Gouvernance du SI** : ensemble des responsabilités exercées par la direction générale et le conseil pour que le SI soutienne la stratégie, crée de la valeur, maîtrise ses risques et utilise ses ressources de façon optimale (ISO/IEC 38500). Elle **distingue la gouvernance** (évaluer, orienter, surveiller), qui fixe le cadre et arbitre, **du management** (planifier, construire, exploiter, mesurer), confié à la DSI, qui exécute dans ce cadre. Les instances typiques sont le comité stratégique SI (direction générale, directions métiers, DSI) et le schéma directeur pluriannuel, qui ordonne les projets selon les priorités métier.

**Alignement stratégique** (Henderson et Venkatraman) : cohérence entre quatre domaines (stratégie métier, stratégie SI, organisation et processus, infrastructure SI) selon deux axes : l'adéquation stratégique (externe / interne) et l'intégration fonctionnelle (métier / SI). Un SI techniquement excellent mais déconnecté des priorités commerciales est mal aligné ; inversement, une stratégie métier (vente en ligne, par exemple) irréalisable avec l'infrastructure existante révèle le même défaut.

**COBIT 2019** : référentiel de gouvernance et de management des informations et technologies de l'entreprise. Il dit **quoi** maîtriser, sans imposer de méthode.
- 40 objectifs répartis en 5 domaines : un seul domaine de gouvernance, EDM (évaluer, diriger, surveiller), et quatre de management : APO (aligner, planifier, organiser), BAI (bâtir, acquérir, implanter), DSS (délivrer, servir, soutenir), MEA (surveiller, évaluer, apprécier) ;
- cascade d'objectifs : objectifs de l'entreprise → objectifs d'alignement → objectifs de gouvernance et de management, ce qui relie chaque contrôle informatique à un but métier ;
- capacité des processus notée de 0 (incomplet) à 5 (optimisé), utile pour un diagnostic ou un audit du SI.

**ITIL 4** : référentiel de bonnes pratiques de **gestion des services informatiques**, utilisé par la DSI au quotidien : il dit **comment** fournir les services. Système de valeur des services, chaîne de valeur (planifier, améliorer, engager, concevoir et faire la transition, obtenir ou construire, fournir et soutenir), 7 principes directeurs (dont « commencer là où vous êtes », « privilégier la valeur »), 34 pratiques. Parmi elles : la **gestion des incidents** rétablit le service au plus vite (redémarrage, contournement) ; la **gestion des problèmes** recherche la cause racine d'incidents répétés et propose une solution durable ; la **gestion des changements** autorise et planifie les modifications ; la **gestion des niveaux de service** formalise les engagements (SLA : disponibilité, délai de rétablissement) et en suit le respect.

```diagram
{"type":"flow","title":"De l'incident au changement (ITIL 4)","steps":[{"label":"Incident","note":"Rétablir le service au plus vite (redémarrage, contournement)"},{"label":"Problème","note":"Incidents répétés : analyse de la cause racine"},{"label":"Demande de changement","note":"Solution durable autorisée et planifiée"},{"label":"Changement déployé","note":"Testé, puis mis en production"},{"label":"Amélioration continue","note":"Mesure du SLA, retour d'expérience"}]}
```

**Indicateurs** : tableau de bord prospectif du SI (contribution métier, orientation utilisateurs, excellence opérationnelle, orientation future), part du budget SI consacrée à l'innovation (« build ») plutôt qu'au maintien (« run »), respect des SLA, délai moyen de rétablissement, satisfaction des utilisateurs.

**Formules clés :** disponibilité = (temps d'ouverture − temps d'indisponibilité) ÷ temps d'ouverture ; indisponibilité maximale admise = temps d'ouverture × (1 − SLA)

## Exemple
Le SLA de l'ERP garantit 99,5 % de disponibilité, le service étant ouvert 24 h/24 sur un mois de 30 jours (720 h). Indisponibilité maximale admise : 720 × (1 − 0,995) = **3,6 h**. Sur le mois, trois incidents ont interrompu le service 1,5 h, 1,5 h et 2 h, soit 5 h.
Disponibilité constatée = (720 − 5) ÷ 720 = **99,31 %** : le SLA n'est pas respecté (pénalités contractuelles éventuelles). Les trois incidents ont la même origine (saturation d'un disque) : au-delà de la gestion des incidents, c'est la gestion des problèmes qui doit intervenir, puis une demande de changement (extension du stockage).

## Erreurs fréquentes
- Présenter ITIL comme un référentiel de gouvernance destiné au conseil d'administration : ITIL outille la DSI dans la gestion des services ; la gouvernance relève de COBIT et d'ISO/IEC 38500.
- Croire que COBIT comporte plusieurs domaines de gouvernance : EDM est le seul ; APO, BAI, DSS et MEA sont des domaines de management.
- Répondre à des incidents répétés par une gestion des incidents plus rapide : le rétablissement traite le symptôme ; la cause racine relève de la gestion des problèmes.
- Attribuer la gouvernance du SI à la DSI : elle appartient à la direction générale et au conseil, la DSI en assure le management.

## À retenir
- COBIT dit **quoi** gouverner et contrôler ; ITIL dit **comment** gérer les services au quotidien : ils sont complémentaires.
- Un incident (rétablir le service au plus vite) n'est pas un problème (traiter la cause racine).
- La gouvernance du SI reste une responsabilité de la direction générale, pas de la seule DSI.
- Un SLA s'exprime en pourcentage de disponibilité ; on le convertit en heures d'indisponibilité admises pour le vérifier.

**Notions liées :** [Urbanisation et architecture du SI](/cours/urbanisation-architecture-si) · [Transformation numérique et valeur](/cours/transformation-numerique-valeur) · [Audit et contrôle des SI](/cours/audit-controle-si) · [Gestion de projets SI](/cours/gestion-projets-si)
