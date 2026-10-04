# Protection des données personnelles dans le SI (RGPD)

**Références :** règlement (UE) 2016/679 (RGPD), art. 4, 5, 6, 9, 12 à 22, 25, 28, 30, 32 à 37, 83 et considérant 150 ; loi n° 78-17 du 6 janvier 1978 modifiée ; lignes directrices et référentiels de la CNIL

**Enjeu :** tout SI de gestion (paie, CRM, site marchand) traite des données personnelles ; l'examen demande de choisir la base légale, de qualifier les acteurs, de réagir à une violation dans les délais et de chiffrer le plafond d'une sanction.

**Donnée personnelle** (art. 4) : toute information se rapportant à une personne physique identifiée ou identifiable (nom, matricule, IBAN, adresse IP, géolocalisation). **Responsable du traitement** : détermine les finalités et les moyens ; **sous-traitant** (hébergeur, éditeur SaaS, prestataire de paie) : traite pour son compte, sur instruction documentée, sous un contrat écrit (art. 28) qui fixe sécurité, confidentialité, assistance, sort des données en fin de contrat et autorisation des sous-traitants ultérieurs. Le recours à un sous-traitant ne décharge pas le responsable.

**Principes** (art. 5) : licéité, loyauté, transparence ; limitation des finalités ; minimisation (seules les données nécessaires) ; exactitude ; limitation de la conservation (durée définie, puis archivage ou suppression) ; intégrité et confidentialité ; **responsabilité** (pouvoir démontrer la conformité).

**Bases légales** (art. 6, une par finalité) : consentement, exécution d'un contrat, obligation légale, intérêts vitaux, mission d'intérêt public, intérêts légitimes (avec mise en balance des droits des personnes). Données sensibles (santé, opinions, biométrie…) : interdiction de principe sauf exceptions (art. 9).

```diagram
{"type":"tree","title":"Choisir la base légale d'un traitement (art. 6)","root":{"label":"Pourquoi traite-t-on la donnée ?","children":[{"edge":"la loi l'impose","label":"Obligation légale (c)","note":"DSN, conservation comptable, LCB-FT"},{"edge":"exécuter un contrat","label":"Contrat (b)","note":"Livraison, facturation, paie du salarié"},{"edge":"mission publique","label":"Intérêt public (e)","note":"Autorités et organismes investis d'une mission"},{"edge":"intérêt de l'entreprise","label":"Intérêt légitime (f)","note":"Prospection B2B, sécurité du SI : mise en balance"},{"edge":"aucun des cas","label":"Consentement (a)","note":"Libre, spécifique, éclairé, univoque, retirable"}]}}
```

**Droits des personnes** (art. 15 à 22) : information, accès, rectification, effacement, limitation, portabilité (traitements fondés sur le consentement ou le contrat), opposition, pas de décision entièrement automatisée produisant des effets significatifs (sauf exceptions). Réponse dans **un mois**, prolongeable de **deux mois** si nécessaire (art. 12 §3).

**Outils de conformité** :
- **registre des traitements** (art. 30) : finalités, catégories de données et de personnes, destinataires, durées, mesures de sécurité ;
- protection des données dès la conception et par défaut (art. 25) : minimisation, pseudonymisation, droits d'accès restreints ;
- **sécurité** (art. 32) : chiffrement, contrôle des accès, sauvegardes, tests, adaptés au risque ;
- **AIPD** (analyse d'impact) avant un traitement susceptible d'engendrer un risque élevé (art. 35 : profilage, surveillance systématique, géolocalisation, données sensibles à grande échelle…) ;
- **DPO** obligatoire (art. 37) pour les autorités publiques et les organismes dont l'activité de base implique un suivi régulier et systématique à grande échelle ou des données sensibles à grande échelle ;
- violation de données : notification à la CNIL dans les meilleurs délais et, si possible, **72 heures** au plus tard après en avoir pris connaissance, sauf absence de risque (art. 33) ; information des personnes sans retard injustifié si le risque est élevé (art. 34) ; le sous-traitant avertit le responsable sans délai ; tout incident est documenté.

**Sanctions** (art. 83) : jusqu'à **10 M€ ou 2 %** du chiffre d'affaires annuel mondial de l'exercice précédent (obligations du responsable et du sous-traitant : registre, sécurité, AIPD, DPO…) ; jusqu'à **20 M€ ou 4 %** (principes, bases légales, droits des personnes, transferts hors UE). Pour une entreprise, le **montant le plus élevé** est retenu ; le chiffre d'affaires est celui de l'entreprise au sens du droit de la concurrence, c'est-à-dire du groupe (considérant 150). L'amende est une charge non déductible (compte 6582, pénalités et amendes).

## Exemple
Lundi 6 h, la DSI d'un site marchand constate l'exfiltration, par rançongiciel, du fichier de 40 000 clients (identité, courriel, IBAN non chiffrés). Prise de connaissance lundi 6 h → notification à la CNIL au plus tard **jeudi 6 h**, même si l'enquête n'est pas finie (notification complétée ensuite) ; IBAN en clair : risque élevé, donc **information des clients** sans retard (nature de la violation, conséquences, mesures, contact) ; l'hébergeur, sous-traitant, devait alerter l'entreprise sans délai mais ne notifie pas à sa place.
Sanction : la filiale (CA 80 M€) appartient à un groupe de 600 M€ de CA mondial ; le défaut de chiffrement relève de l'art. 32 (plafond 10 M€ ou 2 %). 2 % × 600 = 12 M€ > 10 M€ : plafond **12 M€** (et non 1,6 M€ sur le CA de la filiale, ni 10 M€).

## Erreurs fréquentes
- Ne notifier la CNIL que si les données sont publiées, ou seulement au-delà d'un nombre de victimes : la notification s'impose dès qu'un risque pour les personnes existe, dans les 72 heures.
- Compter sur l'hébergeur pour notifier la CNIL : le sous-traitant informe le responsable, qui reste tenu de la notification.
- Fonder la DSN ou la paie sur le consentement du salarié : la base légale est l'obligation légale ou le contrat ; le consentement, retirable, est rarement valable dans la relation de travail.
- Retenir le plus faible des deux montants du plafond, ou le chiffre d'affaires de la seule filiale : le plus élevé des deux, sur le chiffre d'affaires du groupe.

## À retenir
- Le plafond est le plus élevé des deux montants, calculé sur le chiffre d'affaires mondial du groupe.
- Violation : CNIL sous 72 heures si risque, personnes informées si risque élevé, incident documenté dans tous les cas.
- Le consentement est rarement une base adaptée entre employeur et salarié (déséquilibre de la relation).
- Le recours à un sous-traitant ou à un cloud ne transfère pas la responsabilité du traitement.

**Notions liées :** [Cybersécurité : menaces](/cours/cybersecurite-menaces) · [Politique de sécurité et continuité](/cours/politique-securite-continuite) · [Cloud, SaaS et externalisation](/cours/cloud-saas-externalisation) · [Intelligence artificielle : usages et encadrement](/cours/intelligence-artificielle-generative)
