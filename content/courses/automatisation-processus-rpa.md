# Automatisation et dématérialisation des processus (RPA, facturation électronique)

**Références :** CGI art. 289 bis et 290 (facturation électronique et e-reporting) ; loi n° 2023-1322 de finances pour 2024, art. 91 (calendrier) ; CGI art. 289, VII (piste d'audit fiable) ; format Factur-X (conforme à la norme européenne EN 16931)

**Enjeu :** automatiser un processus répétitif libère du temps et réduit les erreurs, mais fragilise s'il est mal choisi ; la réforme de la facturation électronique impose par ailleurs à toute entreprise assujettie un calendrier et un format : deux sujets de cas pratique fréquents.

**RPA (automatisation robotisée des processus)** : des robots logiciels reproduisent les actions d'un utilisateur sur les interfaces existantes (clics, copier-coller, saisie) sans modifier les applications. Adaptée aux tâches **répétitives, à fort volume, fondées sur des règles stables et des données structurées** (rapprochements bancaires, saisie de factures, relances, contrôles de cohérence). Un processus à faible volume, à forte part de jugement ou dont l'organisation va changer n'est pas un bon candidat.

**Limites** : fragilité en cas de changement d'écran ou de procédure, maintenance des robots, automatisation d'un processus mal conçu (« on automatise le désordre »), gestion des habilitations des robots (comptes dédiés, droits limités, journalisation pour conserver la piste d'audit). Une intégration par API ou une refonte du processus (BPM) est plus robuste quand elle est possible. Couplée à l'IA (lecture de documents, classification), on parle d'automatisation intelligente ; le jugement final reste humain.

**Démarche** : cartographier les processus (process mining sur les journaux du SI), choisir les candidats (volume, stabilité, gain), simplifier avant d'automatiser, tester puis superviser (taux d'automatisation, taux d'exception, ETP libérés, retour sur investissement).

**Facturation électronique (B2B domestique entre assujettis à la TVA)** :
- facture émise, transmise et reçue sous forme de données structurées (Factur-X, UBL, CII) via une **plateforme agréée** (ex-PDP) ; un PDF simple envoyé par courriel n'est pas une facture électronique au sens de la réforme ;
- **réception** obligatoire pour toutes les entreprises depuis le 1ᵉʳ septembre 2026 ; **émission** obligatoire au 1ᵉʳ septembre 2026 pour les grandes entreprises et ETI, au 1ᵉʳ septembre 2027 pour les PME et microentreprises ;
- **e-reporting** : transmission des données des opérations hors champ (B2C, international) et des données de paiement pour les prestations de services ;
- la **piste d'audit fiable** (CGI art. 289, VII) reste un des trois moyens de garantir l'authenticité et l'intégrité d'une facture, avec la signature électronique qualifiée et l'EDI : des contrôles documentés relient la facture à la livraison ou à la prestation.

**Formules clés :** ETP libérés = (volume × temps unitaire économisé) ÷ temps annuel d'un ETP ; taux d'automatisation = cas traités sans intervention ÷ cas totaux ; délai de récupération = investissement ÷ économies nettes annuelles

```diagram
{"type":"timeline","title":"Calendrier de la facturation électronique B2B (LF 2024)","items":[{"when":"1ᵉʳ sept. 2026","label":"Réception obligatoire pour toutes les entreprises","note":"Toute entreprise assujettie doit pouvoir recevoir via une plateforme agréée"},{"when":"1ᵉʳ sept. 2026","label":"Émission : grandes entreprises et ETI","note":"Avec l'e-reporting associé"},{"when":"1ᵉʳ sept. 2027","label":"Émission : PME et microentreprises","note":"Fin de la montée en charge"}]}
```

## Exemple
Un service comptable saisit 24 000 factures fournisseurs par an, 5 minutes chacune. Un robot traite 75 % des factures sans intervention ; les exceptions restent manuelles. Coût : développement 20 000 €, licence et maintenance 15 000 € par an ; un ETP = 1 600 heures, coût horaire chargé 35 €.
Temps libéré = 24 000 × 75 % × 5 min = 90 000 min = 1 500 h, soit 1 500 ÷ 1 600 = **0,94 ETP**.
Économie brute = 1 500 × 35 = 52 500 € ; économie nette = 52 500 − 15 000 = 37 500 € par an ; délai de récupération = 20 000 ÷ 37 500 = 0,53 an, soit **environ 6 mois et demi**.
Le gain n'est réel que si le temps libéré est réaffecté (contrôles, analyse) : 0,94 ETP ne se traduit pas mécaniquement par une suppression de poste.

## Erreurs fréquentes
- Choisir pour un premier robot un processus à fort jugement (réclamations rédigées librement) ou à faible volume (dix dossiers par an) : la RPA exige volume, règles stables et données structurées.
- Automatiser un processus dont l'organisation sera revue dans six mois : le robot devra être réécrit ; on stabilise et simplifie d'abord.
- Compter en ETP libérés le temps des exceptions encore traitées à la main : seuls les cas traités sans intervention entrent dans l'économie.
- Croire qu'un PDF envoyé par courriel satisfait l'obligation de facturation électronique : il faut des données structurées transmises par une plateforme agréée.

## À retenir
- La RPA travaille « par-dessus » les applications : rapide à déployer, mais fragile.
- Simplifier le processus avant de l'automatiser, puis superviser les robots comme des utilisateurs.
- Facturation électronique : réception pour tous depuis le 1ᵉʳ septembre 2026, émission échelonnée 2026-2027 selon la taille.

**Notions liées :** [Progiciels de gestion intégrés (ERP)](/cours/erp-progiciels-integres) · [Intelligence artificielle (dont générative)](/cours/intelligence-artificielle-generative) · [Achats-fournisseurs — contrôles clés](/cours/achats-fournisseurs-controles-cles) · [TVA : droit à déduction](/cours/tva-droits-deduction)
