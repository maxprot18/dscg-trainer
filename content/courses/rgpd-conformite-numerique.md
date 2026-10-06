# Protection des données personnelles (RGPD) et conformité numérique

**Références :** règl. (UE) 2016/679 (RGPD) art. 4 à 6, 9, 12 à 22, 28, 30, 33 à 37, 44 à 49, 83 ; loi n° 78-17 du 6 janv. 1978 (Informatique et libertés), art. 82

**Enjeu :** l'entreprise traite en permanence des données de salariés et de clients ; il faut savoir sur quelle base légale, avec quelle documentation, dans quel délai réagir à une fuite et jusqu'à quel montant la CNIL peut sanctionner. Le cas pratique porte souvent sur la paie, la prospection ou une violation de données.

- **Donnée personnelle** : toute information se rapportant à une personne physique identifiée ou identifiable, directement ou indirectement (nom, identifiant, adresse IP, numéro de sécurité sociale…). Les données d'une personne morale n'en sont pas. Le **responsable de traitement** détermine les finalités et les moyens ; le **sous-traitant** (prestataire de paie, hébergeur) agit pour son compte, sur la base d'un contrat écrit fixant ses obligations (art. 28).
- **Principes (art. 5)** : licéité, loyauté et transparence ; limitation des finalités ; **minimisation** (seules les données nécessaires) ; exactitude ; limitation de la durée de conservation (archivage puis suppression) ; intégrité et confidentialité ; **responsabilité** (le responsable doit pouvoir démontrer sa conformité : « accountability »).
- **Bases légales (art. 6)** : consentement, exécution d'un contrat, **obligation légale**, sauvegarde des intérêts vitaux, mission d'intérêt public, **intérêt légitime**. Le consentement est rarement adapté dans la relation de travail (lien de subordination : il n'est pas libre) ; la paie et les déclarations sociales reposent sur l'obligation légale, la prospection B2B sur l'intérêt légitime. Les **données sensibles** (santé, opinions, origine, orientation sexuelle, données biométriques) sont interdites sauf exceptions (art. 9).
- **Droits des personnes** : information, accès, rectification, effacement, limitation, portabilité, opposition, décision non exclusivement automatisée ; réponse dans un délai d'**un mois**, prorogeable de deux mois selon la complexité (art. 12).
- **Documentation** : **registre des activités de traitement** (art. 30) ; la dispense des structures de moins de 250 salariés ne joue pas si le traitement est susceptible de comporter un risque, n'est pas occasionnel ou porte sur des données sensibles (la paie, traitement permanent, doit donc y figurer). Analyse d'impact (AIPD) pour les traitements à risque élevé (art. 35 : profilage, surveillance systématique, données sensibles à grande échelle).
- **Délégué à la protection des données (art. 37)** : obligatoire pour les autorités publiques et lorsque l'activité de base consiste en un suivi régulier et systématique à grande échelle des personnes ou en un traitement à grande échelle de données sensibles ; facultatif mais recommandé ailleurs. Il peut être interne, externe ou mutualisé.
- **Violation de données (art. 33-34)** : notification à la **CNIL** dans les meilleurs délais et, si possible, **72 heures** au plus tard après en avoir pris connaissance, sauf si la violation n'est pas susceptible d'engendrer un risque ; information des personnes concernées sans retard si le risque est élevé ; documentation de toute violation dans un registre interne, même non notifiée.
- **Transferts hors UE (art. 44 à 49)** : décision d'adéquation de la Commission, ou garanties appropriées (clauses contractuelles types, règles d'entreprise contraignantes ou BCR) ; à défaut, transfert possible seulement dans les cas dérogatoires de l'art. 49 (consentement explicite, exécution d'un contrat…).
- **Sanctions (art. 83)** : amendes administratives jusqu'à **10 M€ ou 2 %** du CA annuel mondial de l'exercice précédent (obligations du responsable et du sous-traitant : sécurité, notification, registre, DPO, AIPD) ; jusqu'à **20 M€ ou 4 %** (principes, bases légales, droits des personnes, transferts). Pour une entreprise, le **montant le plus élevé** des deux est retenu. La CNIL peut aussi mettre en demeure, limiter ou suspendre un traitement.
- **Traceurs (cookies)** : information claire et consentement préalable de l'internaute (loi Informatique et libertés, art. 82), sauf traceurs servant à la communication ou strictement nécessaires au service demandé ; la CNIL exige qu'il soit aussi simple de refuser que d'accepter.

**Formule clé :** plafond = max(montant fixe ; pourcentage × CA mondial N−1)

```diagram
{"type":"timeline","title":"Réagir à une violation de données","items":[{"when":"H0","label":"Découverte de la fuite","note":"Point de départ : prise de connaissance par le responsable"},{"when":"≤ 72 h","label":"Notification à la CNIL","note":"Sauf risque improbable pour les personnes (art. 33)"},{"when":"Sans retard","label":"Information des personnes","note":"Seulement si le risque est élevé (art. 34)"},{"when":"Toujours","label":"Registre interne des violations","note":"Même quand la notification n'est pas due"}]}
```

## Exemple
La SA Datavia (CA mondial N−1 : 800 M€) envoie des courriels de prospection à des particuliers sans aucune base légale et sans possibilité d'opposition ; par ailleurs, elle n'a pas notifié à la CNIL le vol d'un fichier clients découvert trois semaines plus tôt.
Solution : le défaut de base légale et l'atteinte au droit d'opposition relèvent de l'article 83 §5 : plafond = max(20 M€ ; 4 % × 800 = 32 M€) = **32 M€**. Le défaut de notification relève du §4 : max(10 M€ ; 2 % × 800 = 16 M€) = 16 M€. Les deux manquements sont distincts ; s'ils portent sur le même traitement ou des traitements liés, l'amende globale ne peut dépasser le plafond du manquement le plus grave (art. 83 §3), soit 32 M€.

## Erreurs fréquentes
- Fonder la transmission des données de paie aux organismes sociaux sur le consentement du salarié : la base est l'obligation légale ; le consentement n'est pas libre dans la relation de travail.
- Croire qu'une entreprise de moins de 250 salariés est dispensée de registre pour la paie : le traitement est permanent, la dispense ne s'applique pas.
- Retenir le pourcentage du CA quand le montant fixe est plus élevé (ou l'inverse) : c'est toujours le plus élevé des deux ; et ne pas confondre les barèmes des §4 (10 M€ / 2 %) et §5 (20 M€ / 4 %).
- Attendre d'avoir tout analysé avant de notifier : le délai de 72 heures court dès la prise de connaissance, une notification complémentaire restant possible.

## À retenir
- 72 heures pour notifier une violation à la CNIL ; information des personnes si le risque est élevé.
- Plafond d'amende : le plus élevé du montant fixe et du pourcentage du CA mondial ; 10 M€ / 2 % ou 20 M€ / 4 % selon le manquement.
- Moins de 250 salariés ne dispense pas du registre pour les traitements permanents (paie, clients).
- Dans la relation de travail, la base légale est l'obligation légale ou l'exécution du contrat, pas le consentement.

**Notions liées :** [RGPD et systèmes d'information](/cours/protection-donnees-rgpd-si) · [Conformité réglementaire des SI](/cours/conformite-reglementaire-si) · [Cybersécurité et menaces](/cours/cybersecurite-menaces) · [Lutte anticorruption et vigilance](/cours/anticorruption-vigilance-rse)
