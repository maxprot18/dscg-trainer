# Automatisation et dématérialisation des processus (RPA, facturation électronique)

**Références :** CGI art. 289 bis et 290 (facturation électronique et e-reporting) ; loi n° 2023-1322 de finances pour 2024, art. 91 (calendrier) ; norme Factur-X

**RPA (automatisation robotisée des processus)** : des robots logiciels reproduisent les actions d'un utilisateur sur les interfaces existantes (clics, copier-coller, saisie) sans modifier les applications. Adaptée aux tâches **répétitives, à fort volume, fondées sur des règles stables et des données structurées** (rapprochements, saisie de factures, relances).

**Limites** : fragilité en cas de changement d'écran ou de procédure, maintenance des robots, automatisation d'un processus mal conçu (« on automatise le désordre »), gestion des habilitations des robots (comptes dédiés, traçabilité). Une intégration par API ou une refonte du processus (BPM) est plus robuste quand elle est possible. Couplée à l'IA (lecture de documents, classification), on parle d'automatisation intelligente.

**Démarche** : cartographier les processus (process mining sur les journaux du SI), choisir les candidats (volume, stabilité, gain), simplifier avant d'automatiser, piloter (taux d'automatisation, taux d'exception, ETP libérés).

**Facturation électronique (B2B domestique entre assujettis à la TVA)** :
- facture émise, transmise et reçue sous forme de données structurées (Factur-X, UBL, CII) via une **plateforme agréée** (ex-PDP) ; un PDF simple envoyé par courriel n'est pas une facture électronique au sens de la réforme ;
- **réception** obligatoire pour toutes les entreprises depuis le 1ᵉʳ septembre 2026 ; **émission** obligatoire au 1ᵉʳ septembre 2026 pour les grandes entreprises et ETI, au 1ᵉʳ septembre 2027 pour les PME et microentreprises ;
- **e-reporting** : transmission des données des opérations hors champ (B2C, international) et des données de paiement.

**Formules clés :** ETP libérés = (volume × temps unitaire économisé) ÷ temps annuel d'un ETP ; taux d'automatisation = cas traités sans intervention ÷ cas totaux

## À retenir
- La RPA travaille « par-dessus » les applications : rapide à déployer, mais fragile.
- Simplifier le processus avant de l'automatiser.
- La facturation électronique dématérialise tout le cycle et alimente l'administration en données de TVA.
