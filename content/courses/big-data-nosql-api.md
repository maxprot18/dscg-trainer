# Big data, bases NoSQL et API

**Références :** règlement (UE) 2023/2854 (Data Act), applicable pour l'essentiel depuis le 12 septembre 2025 ; style d'architecture REST (R. Fielding, 2000) ; RFC 6749 (OAuth 2.0) ; programme DSCG UE 5 (données massives)

**Enjeu :** l'examen demande de reconnaître le « V » illustré par une situation, de choisir la famille de base NoSQL adaptée à un besoin, de lire un échange par API et de dimensionner un volume de stockage ; le comptable y retrouve la question de la fiabilité des données qui alimentent ses analyses.

**Big data** : données dont le volume, la diversité ou la vitesse dépassent les capacités des outils classiques. Les « V » :
- **volume** (téraoctets, pétaoctets) ; **vélocité** (flux produits et à traiter en quasi temps réel : capteurs, paiements, journaux) ; **variété** (structurées, semi-structurées comme JSON ou journaux, non structurées comme textes, images, sons) ;
- on ajoute souvent **véracité** (fiabilité : un avis en ligne peut être faux) et **valeur** (utilité pour la décision : collecter sans finalité ne crée rien).

**Traitement distribué** : stockage et calcul répartis sur des grappes de serveurs ordinaires ; un système de fichiers distribué découpe chaque fichier en blocs répliqués (souvent en trois exemplaires) sur des machines différentes, ce qui tolère la panne d'un serveur au prix d'un stockage triplé. Le **lac de données** conserve les données brutes dans leur format d'origine, sans schéma préalable, à la différence de l'entrepôt, structuré pour l'analyse.

```diagram
{"type":"flow","title":"Pipeline de données massives","steps":[{"label":"Sources","note":"Capteurs, ERP, site web, réseaux sociaux"},{"label":"Collecte","note":"API, flux en continu, fichiers"},{"label":"Lac de données","note":"Stockage brut distribué, blocs répliqués"},{"label":"Traitement distribué","note":"Nettoyage, calculs sur la grappe"},{"label":"Restitution","note":"Entrepôt, tableaux de bord, API, modèles"}]}
```

**Bases NoSQL** (« not only SQL ») : schéma souple, montée en charge horizontale (ajouter des serveurs plutôt qu'en acheter un plus gros), cohérence souvent assouplie (les copies convergent avec un léger délai). Quatre familles :
- **clé-valeur** (cache, sessions : accès très rapide à une valeur par sa clé) ; **document** (objets JSON : catalogues, profils, dont la structure varie d'un enregistrement à l'autre) ;
- **orientée colonnes** (gros volumes analytiques, séries temporelles) ; **graphe** (nœuds et relations : réseaux sociaux, détection de fraude, chaînes de détention), qui parcourt des chemins sur plusieurs niveaux là où le relationnel multiplierait les jointures.

**API** (interface de programmation) : contrat qui permet à deux applications d'échanger des données sans connaître leur fonctionnement interne. Une API **REST** expose des ressources par des URL et des verbes HTTP (GET lire, POST créer, PUT ou PATCH modifier, DELETE supprimer), échange en général du JSON et est **sans état** (chaque requête contient tout ce qu'il faut, dont le jeton d'authentification, pour être traitée par n'importe quel serveur). Sécurité : authentification (jetons, OAuth 2.0), autorisations par ressource, quotas, chiffrement TLS, journalisation. Exemples : banque (relevés, virements), facturation électronique, échanges ERP ↔ CRM.

**Data Act** : droit des utilisateurs de produits connectés d'accéder aux données qu'ils génèrent et de les partager avec des tiers, encadrement des clauses contractuelles abusives entre entreprises, facilitation du changement de fournisseur de cloud (frais de migration plafonnés aux coûts directs, puis supprimés à compter du 12 janvier 2027, art. 29).

**Formules clés :** volume = nombre de sources × fréquence × taille d'un enregistrement × durée × facteur de réplication ; 1 Go = 10⁹ octets, 1 To = 1 000 Go

## Exemple
Une usine installe 1 200 capteurs qui envoient chacun une mesure de 200 octets toutes les 30 secondes, 24 h/24 ; les données sont conservées un an sur un système de fichiers distribué répliquant chaque bloc en 3 exemplaires.
Mesures par capteur et par jour = 86 400 ÷ 30 = 2 880 ; volume quotidien = 1 200 × 2 880 × 200 = 691 200 000 octets ≈ 0,69 Go ; volume annuel brut = 0,6912 × 365 ≈ 252,3 Go ; avec réplication : 252,3 × 3 ≈ **757 Go**.
Côté restitution, l'ERP interroge l'API de maintenance par GET /machines/M12/mesures?depuis=2026-09-01 avec son jeton : la réponse JSON liste les mesures ; sans jeton valide, le serveur renvoie une erreur 401 et ne mémorise rien de la tentative.

## Erreurs fréquentes
- Qualifier de « volume » une situation qui mêle tickets de caisse, avis en texte libre, photos et journaux JSON : c'est la **variété** (hétérogénéité des formats) ; la vélocité désigne la vitesse de production et de traitement.
- Choisir une base documents ou clé-valeur pour détecter des réseaux de fraude par chaînes de relations : la base **graphe** est conçue pour parcourir les liens.
- Croire qu'une API REST garde en mémoire la session du client : elle est sans état ; le client renvoie son jeton à chaque appel.
- Dimensionner un stockage distribué sans la réplication : les trois exemplaires triplent l'espace nécessaire.

## À retenir
- Variété = hétérogénéité des formats ; vélocité = vitesse de production et de traitement ; véracité = fiabilité.
- NoSQL ne remplace pas le relationnel : il répond à d'autres besoins (souplesse du schéma, très gros volumes, relations complexes).
- Une API REST ne conserve pas de session côté serveur ; chaque requête porte son authentification.
- Le lac de données stocke le brut ; l'entrepôt stocke le structuré prêt pour l'analyse.

**Notions liées :** [Informatique décisionnelle et dataviz](/cours/business-intelligence-dataviz) · [Gouvernance et qualité des données](/cours/gouvernance-qualite-donnees) · [Cloud, SaaS et externalisation](/cours/cloud-saas-externalisation) · [Blockchain et technologies émergentes](/cours/blockchain-technologies-emergentes)
