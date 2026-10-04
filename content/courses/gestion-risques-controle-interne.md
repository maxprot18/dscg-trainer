# Gestion des risques et contrôle interne (cartographie, COSO)

**Références :** COSO, *Internal Control – Integrated Framework* (2013) ; COSO, *Enterprise Risk Management – Integrating with Strategy and Performance* (2017) ; norme ISO 31000:2018 ; AMF, cadre de référence sur les dispositifs de gestion des risques et de contrôle interne (2010) ; IIA, modèle des trois lignes (2020)

**Enjeu :** donner à la direction et aux organes de gouvernance une assurance raisonnable que les objectifs seront atteints, en identifiant les risques et en les traitant au bon coût ; à l'examen, on construit une cartographie des risques et on propose des contrôles, en se référant au COSO.

**Contrôle interne** : dispositif mis en œuvre par la direction et le personnel pour donner une **assurance raisonnable** (jamais absolue : collusion, contournement par la direction, erreur humaine, rapport coût-bénéfice) quant à l'atteinte de trois catégories d'objectifs : opérations (efficacité, protection des actifs), reporting (fiabilité de l'information), conformité aux lois et règlements.
- COSO 2013 : cinq composantes (environnement de contrôle ; évaluation des risques ; activités de contrôle ; information et communication ; activités de pilotage) déclinées en 17 principes. Le contrôle budgétaire n'en est pas une composante : c'est un outil de gestion qui peut constituer une activité de contrôle.
- Activités de contrôle : séparation des tâches incompatibles (autorisation, enregistrement, conservation des actifs, contrôle), autorisations et délégations, rapprochements, contrôles d'accès informatiques, contrôles physiques, supervision.

**Gestion des risques (ERM)** : identifier, évaluer, traiter et suivre les événements susceptibles d'affecter les objectifs, en lien avec la stratégie et l'**appétence au risque** (niveau de risque que l'organisation accepte de prendre). COSO ERM 2017 : cinq composantes, 20 principes. ISO 31000 : principes, cadre et processus (identification, analyse, évaluation, traitement, surveillance).

**Cartographie des risques** : chaque risque est noté en probabilité (fréquence) et en impact (gravité), souvent sur une échelle de 1 à 4 ou 1 à 5.
- Criticité = probabilité × impact ; représentation en matrice (zones de priorité). En valeur, l'espérance de perte annuelle = probabilité annuelle × impact en euros.
- Risque brut (inhérent) : avant dispositifs de maîtrise ; risque net (résiduel) : après prise en compte des contrôles existants. La priorité va aux risques nets qui dépassent l'appétence.
- Traitements : éviter (renoncer à l'activité), réduire (contrôles, prévention), transférer (assurance, sous-traitance), accepter (risque dans l'appétence, ou coût du traitement supérieur au gain). L'arbre ci-dessous est une grille de lecture, pas une règle du COSO ou d'ISO 31000 : en pratique, les traitements se combinent (réduire, puis assurer le résiduel).

```diagram
{"type":"tree","title":"Choisir un traitement selon le risque net (synthèse pédagogique)","root":{"label":"Risque net dans l'appétence ?","children":[{"edge":"oui","label":"Accepter et surveiller"},{"edge":"non","label":"Traitement moins coûteux que la perte évitée ?","children":[{"edge":"oui","label":"Réduire ou transférer","note":"contrôles, prévention, assurance"},{"edge":"non","label":"Éviter","note":"renoncer à l'activité"}]}]}}
```

**Trois lignes (IIA)** : première ligne = management opérationnel (propriétaire des risques et des contrôles) ; deuxième ligne = fonctions de gestion des risques, conformité, contrôle interne (appui et surveillance) ; troisième ligne = audit interne, assurance indépendante rendue à l'organe de gouvernance (comité d'audit). Le commissaire aux comptes est externe au modèle.

**Formules clés :** criticité = probabilité × impact ; espérance de perte = p × impact ; gain net d'un dispositif = (perte attendue brute − perte attendue nette) − coût du dispositif

## Exemple
Un distributeur estime le risque de rançongiciel à une probabilité annuelle de 15 % pour un impact de 600 000 € : perte attendue brute = 0,15 × 600 000 = 90 000 € par an. Un dispositif (sauvegardes isolées, authentification renforcée) coûtant 30 000 € par an ramènerait la probabilité à 5 % : perte attendue nette = 0,05 × 600 000 = 30 000 €. Gain net = (90 000 − 30 000) − 30 000 = 30 000 € par an : le traitement « réduire » est justifié ; une assurance cyber pour l'impact résiduel relèverait du « transférer ».

## Erreurs fréquentes
- Compter le contrôle budgétaire parmi les cinq composantes du COSO 2013 : les composantes sont l'environnement de contrôle, l'évaluation des risques, les activités de contrôle, l'information et la communication, le pilotage.
- Placer le responsable de la conformité en première ligne ou l'audit interne en deuxième : la conformité est en deuxième ligne, l'audit interne en troisième ; le commissaire aux comptes n'appartient pas au modèle.
- Confier à une même personne la création des fournisseurs dans le fichier des tiers et la validation des paiements : c'est le cumul de tâches incompatibles qui permet la fraude au fournisseur fictif.
- Promettre une assurance absolue : même bien conçu et appliqué, le contrôle interne reste limité par la collusion, le contournement par la direction et l'erreur humaine.

## À retenir
- Le contrôle interne donne une assurance raisonnable, jamais absolue.
- La séparation des tâches incompatibles est le contrôle préventif de base contre la fraude.
- Un risque brut critique peut devenir acceptable en net si les contrôles sont efficaces ; la priorité porte sur les risques nets hors appétence.
- L'audit interne évalue le dispositif, il ne le gère pas.

**Notions liées :** [Évaluation du contrôle interne par l'auditeur](/cours/evaluation-controle-interne) · [Approche par les risques](/cours/approche-par-risques) · [Politique de sécurité et continuité](/cours/politique-securite-continuite) · [Pilotage des projets](/cours/pilotage-projets)
