# Blockchain et technologies émergentes

**Références :** règlement (UE) 2023/1114 (MiCA, marchés de crypto-actifs) ; règlement (UE) 2022/858 (régime pilote des infrastructures de marché DLT) ; RGPD art. 17 (droit à l'effacement)

**Enjeu :** l'examen ne demande pas de programmer une blockchain mais de dire quand elle apporte quelque chose (plusieurs acteurs, besoin de preuve), ce qu'elle garantit (intégrité, horodatage) et ce qu'elle ne garantit pas (exactitude de la donnée saisie), puis de chiffrer l'intérêt d'un projet.

**Blockchain** : registre distribué (DLT) répliqué sur de nombreux nœuds, dans lequel les transactions sont regroupées en **blocs chaînés par des empreintes cryptographiques (hachage)** : chaque bloc contient l'empreinte du précédent. Modifier un bloc ancien obligerait à recalculer tous les suivants et à convaincre la majorité du réseau : le registre est pratiquement **infalsifiable** et horodaté, sans tiers de confiance central. La réplication sur tous les nœuds le rend aussi résistant à la panne de l'un d'eux.

**Consensus** : règle par laquelle les nœuds valident les blocs. **Preuve de travail** (les mineurs résolvent un calcul intensif, très énergivore) ; **preuve d'enjeu** (validateurs choisis selon les jetons mis en garantie, beaucoup plus sobre) ; dans les blockchains privées ou de consortium, consensus simplifié entre nœuds autorisés, donc rapide et peu coûteux.

**Types** : **publique** (ouverte à tous en lecture et en écriture, ex. réseaux de crypto-actifs), **privée** (un seul organisme contrôle l'accès et la validation), **de consortium** (plusieurs organisations qui ne se font pas entièrement confiance, ex. traçabilité d'une filière, règlement interbancaire).

```diagram
{"type":"tree","title":"Choisir le type de registre","root":{"label":"Plusieurs organisations doivent partager le registre ?","children":[{"edge":"non","label":"Base de données classique","note":"Un seul acteur : la blockchain n'apporte rien"},{"edge":"oui","label":"Accès ouvert à tous ?","children":[{"edge":"oui","label":"Blockchain publique","note":"Preuve de travail ou d'enjeu"},{"edge":"non","label":"Un seul opérateur contrôle l'accès ?","children":[{"edge":"oui","label":"Blockchain privée"},{"edge":"non","label":"Blockchain de consortium","note":"Nœuds autorisés, consensus rapide"}]}]}]}}
```

**Applications** : traçabilité (agroalimentaire, luxe, pharmacie), certification de diplômes ou de documents, **contrats intelligents** (programmes qui s'exécutent automatiquement quand des conditions sont remplies, ex. indemnisation déclenchée par un retard constaté), jetons (tokens) et crypto-actifs, règlement-livraison de titres (régime pilote DLT).

**Limites** : capacité de traitement limitée, consommation énergétique (preuve de travail), gouvernance (qui fait évoluer les règles ?), irréversibilité des erreurs, **problème de l'oracle** (la blockchain garantit l'intégrité de ce qui est inscrit, pas la véracité de la donnée saisie ou mesurée), tension avec le droit à l'effacement du RGPD (une donnée personnelle inscrite ne peut pas être supprimée : on inscrit plutôt une empreinte). **MiCA** encadre les émetteurs de crypto-actifs et les prestataires de services sur crypto-actifs dans l'UE (agrément, livre blanc, protection des détenteurs).

**Autres technologies émergentes** : internet des objets (IoT, capteurs connectés qui alimentent le SI), jumeau numérique, réalité augmentée, informatique quantique (menace pour la cryptographie actuelle, d'où la cryptographie post-quantique).

**Formules clés :** délai de récupération = investissement ÷ économies nettes annuelles (flux constants) ; économies nettes = gains annuels − coûts annuels de fonctionnement

## Exemple
Un transporteur rejoint une blockchain de consortium de traçabilité. Sa quote-part d'investissement (nœud, intégration au SI, formation) est de 180 000 €. Il attend 60 000 € par an de baisse du coût des litiges, pour 15 000 € par an de frais de fonctionnement (hébergement du nœud, cotisation au consortium).
Économies nettes annuelles = 60 000 − 15 000 = 45 000 € ; délai de récupération = 180 000 ÷ 45 000 = **4 ans**.
Si l'étude ne retenait que les gains bruts (60 000 €), le délai tomberait à 3 ans : erreur classique. Par ailleurs, les températures des remorques saisies à la main par les chauffeurs ne deviennent pas exactes parce qu'elles sont inscrites dans la chaîne : seuls des capteurs connectés réduisent ce risque.

## Erreurs fréquentes
- Croire que la blockchain empêche l'inscription d'une donnée fausse : elle empêche la modification a posteriori et garantit l'horodatage, pas l'exactitude de la saisie (problème de l'oracle).
- Attribuer les mineurs et le calcul intensif à la preuve d'enjeu : c'est la preuve de travail ; la preuve d'enjeu sélectionne des validateurs selon leurs jetons bloqués et consomme beaucoup moins.
- Penser que la panne du serveur d'un membre fait perdre les données : le registre est répliqué sur tous les nœuds.
- Calculer le délai de récupération avec les gains bruts, sans déduire les coûts annuels de fonctionnement.

## À retenir
- Infalsifiable ne veut pas dire exact : une donnée fausse inscrite reste fausse.
- Une blockchain n'est utile que si plusieurs acteurs qui ne se font pas confiance partagent un même registre.
- MiCA encadre les émetteurs de crypto-actifs et les prestataires de services sur crypto-actifs dans l'UE.

**Notions liées :** [Big data, bases NoSQL et API](/cours/big-data-nosql-api) · [Intelligence artificielle (dont générative)](/cours/intelligence-artificielle-generative) · [Protection des données personnelles dans le SI](/cours/protection-donnees-rgpd-si) · [Critères de choix d'investissement](/cours/van-tri-criteres-investissement)
