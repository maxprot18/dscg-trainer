# Big data, bases NoSQL et API

**Références :** règlement (UE) 2023/2854 (Data Act) ; programme DSCG UE 5 (données massives)

**Big data** : données dont le volume, la diversité ou la vitesse dépassent les capacités des outils classiques. Les « V » :
- **volume** (téraoctets, pétaoctets) ; **vélocité** (flux produits et à traiter en quasi temps réel) ; **variété** (structurées, semi-structurées comme JSON ou journaux, non structurées comme textes, images, sons) ;
- on ajoute souvent **véracité** (fiabilité) et **valeur** (utilité pour la décision).

**Traitement distribué** : stockage et calcul répartis sur des grappes de serveurs (ex. système de fichiers distribué avec réplication des blocs, souvent en trois exemplaires), lacs de données (données brutes stockées dans leur format d'origine).

**Bases NoSQL** (« not only SQL ») : schéma souple, montée en charge horizontale, cohérence souvent assouplie. Quatre familles :
- **clé-valeur** (cache, sessions) ; **document** (objets JSON : catalogues, profils) ;
- **orientée colonnes** (gros volumes analytiques, séries temporelles) ; **graphe** (relations : réseaux sociaux, détection de fraude, chaînes de détention).

**API** (interface de programmation) : contrat qui permet à deux applications d'échanger des données. Une API **REST** expose des ressources par des URL et des verbes HTTP (GET lire, POST créer, PUT ou PATCH modifier, DELETE supprimer), échange en général du JSON et est **sans état** (chaque requête contient tout ce qu'il faut pour être traitée). Sécurité : authentification (jetons, OAuth 2.0), quotas, chiffrement TLS.

**Data Act** : règlement européen sur l'accès aux données et leur utilisation, applicable pour l'essentiel depuis le 12 septembre 2025 : droit des utilisateurs de produits connectés d'accéder aux données qu'ils génèrent et de les partager avec des tiers, facilitation du changement de fournisseur de cloud.

**Formules clés :** volume = nombre de sources × fréquence × taille d'un enregistrement × durée × facteur de réplication

## À retenir
- Variété = hétérogénéité des formats ; vélocité = vitesse de production et de traitement.
- NoSQL ne remplace pas le relationnel : il répond à d'autres besoins (souplesse, très gros volumes).
- Une API REST ne conserve pas de session côté serveur.
