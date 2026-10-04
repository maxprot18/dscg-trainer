# Conformité réglementaire du SI (NIS 2, DORA)

**Références :** directive (UE) 2022/2555 du 14 décembre 2022 (NIS 2), art. 3, 20, 21, 23, 32 à 34 ; règlement (UE) 2022/2554 du 14 décembre 2022 (DORA), applicable depuis le 17 janvier 2025 ; RGPD art. 33 ; TFUE art. 288 (directive et règlement)

**Enjeu :** la cybersécurité n'est plus seulement une bonne pratique mais une obligation légale sanctionnée, déjà effective pour le secteur financier (DORA) et en cours de transposition pour des milliers d'entreprises (NIS 2) ; l'examen demande de qualifier une entité (essentielle, importante, financière), de dérouler le calendrier de notification d'un incident et de chiffrer un plafond d'amende.

**Directive ou règlement** : une directive fixe un résultat et doit être transposée par chaque État (TFUE art. 288) ; un règlement s'applique directement, sans loi nationale. NIS 2 est une directive, DORA un règlement.

**NIS 2** : élargit la première directive NIS (2016) à de nombreux secteurs (énergie, transports, santé, eau, infrastructures numériques, administrations, gestion des déchets, industrie manufacturière, agroalimentaire, produits chimiques, services postaux…). Transposition attendue au plus tard le **17 octobre 2024** ; en France, elle passe par le projet de loi relatif à la résilience des infrastructures critiques et au renforcement de la cybersécurité (adopté par le Sénat en mars 2025, examiné par l'Assemblée nationale à l'automne 2026, non promulgué à ce jour ; la Commission a saisi la Cour de justice de l'UE en juillet 2026 pour défaut de transposition), dont les textes d'application fixeront le calendrier effectif ; l'**ANSSI** sera l'autorité nationale et les entités concernées devront s'enregistrer auprès d'elle.
- **Entités essentielles** : en principe les grandes entreprises (au moins 250 salariés, ou plus de 50 M€ de chiffre d'affaires et plus de 43 M€ de total de bilan) des secteurs hautement critiques (annexe I), et certaines entités quelle que soit leur taille (opérateurs de services essentiels déjà désignés, prestataires de confiance qualifiés…).
- **Entités importantes** : les autres entités au moins de taille moyenne (50 salariés ou plus de 10 M€ de chiffre d'affaires et de bilan) des annexes I et II ; une grande entreprise d'un secteur de l'annexe II reste donc une entité importante.
- **Obligations** : les organes de direction approuvent les mesures de gestion des risques, en supervisent la mise en œuvre, suivent une formation et peuvent voir leur responsabilité engagée (art. 20) ; mesures techniques et organisationnelles proportionnées (analyse de risques, gestion des incidents, continuité et sauvegardes, sécurité de la chaîne d'approvisionnement, cryptographie, authentification multifacteur, sensibilisation) (art. 21). Le recours à un prestataire ou au cloud ne transfère pas la responsabilité.
- **Notification des incidents importants** (art. 23) : alerte précoce sous **24 heures** après en avoir pris connaissance, notification avec première évaluation sous **72 heures**, rapport final dans **un mois** après la notification ; obligation identique pour les entités essentielles et importantes.
- **Supervision et sanctions** : contrôle a priori et a posteriori pour les entités essentielles, a posteriori seulement pour les importantes ; amendes maximales d'au moins **10 M€ ou 2 %** du chiffre d'affaires annuel mondial de l'entreprise à laquelle l'entité appartient (essentielles) et **7 M€ ou 1,4 %** (importantes), le montant le plus élevé étant retenu.

```diagram
{"type":"timeline","title":"Notification d'un incident important (NIS 2, art. 23)","items":[{"when":"H+24","label":"Alerte précoce","note":"Soupçon d'acte malveillant, impact transfrontière ?"},{"when":"H+72","label":"Notification d'incident","note":"Première évaluation : gravité, impact, indicateurs"},{"when":"+1 mois","label":"Rapport final","note":"Cause, mesures prises, éventuel impact transfrontière"}]}
```

**DORA** (résilience opérationnelle numérique du secteur financier) : règlement applicable depuis le **17 janvier 2025** aux banques, entreprises d'investissement, assureurs, établissements de paiement et de monnaie électronique, sociétés de gestion, prestataires de services sur crypto-actifs, etc. Il prime sur NIS 2 pour ces entités (texte spécial). Cinq piliers : cadre de gestion du risque lié aux TIC sous la responsabilité de l'organe de direction ; classification et notification des incidents majeurs à l'autorité compétente (ACPR ou AMF en France, jamais la CNIL sauf données personnelles) ; tests de résilience, dont des tests de pénétration fondés sur la menace tous les trois ans pour les entités les plus importantes ; gestion du risque lié aux prestataires tiers de TIC (**registre d'information** des contrats, clauses obligatoires, stratégie de sortie, supervision des prestataires critiques par les autorités européennes de surveillance) ; partage d'informations sur les cybermenaces.

**Cumul avec le RGPD** : une violation de données personnelles déclenche en plus la notification à la CNIL sous 72 heures (art. 33) et, si le risque est élevé, l'information des personnes.

**Formules clés :** plafond d'amende NIS 2 = max(montant fixe ; taux × chiffre d'affaires annuel mondial), avec 10 M€ / 2 % (essentielle) ou 7 M€ / 1,4 % (importante)

## Exemple
Chimex fabrique des produits chimiques (annexe II de NIS 2) : 300 salariés, 80 M€ de chiffre d'affaires ; son groupe réalise 400 M€ de chiffre d'affaires mondial. Un vendredi à 9 h, la DSI découvre un rançongiciel qui a paralysé la production.
Qualification : secteur de l'annexe II, taille moyenne dépassée, pas de désignation particulière : **entité importante** (la taille de 300 salariés ne la rend pas essentielle).
Notification : alerte précoce avant **samedi 9 h**, notification d'incident avant **lundi 9 h**, rapport final dans le mois qui suit la notification ; si des données personnelles sont touchées, notification à la CNIL sous 72 heures.
Plafond d'amende : 1,4 % × 400 M€ = 5,6 M€ < 7 M€, donc **7 M€** (le montant le plus élevé) ; retenir 2 % (8 M€) serait l'erreur d'une entité essentielle.

## Erreurs fréquentes
- Ne prévoir qu'une notification unique sous 72 heures : c'est le délai du RGPD ; NIS 2 impose trois étapes (24 h, 72 h, un mois) et les deux obligations se cumulent.
- Faire de DORA une directive à transposer : c'est un règlement, directement applicable depuis le 17 janvier 2025.
- Faire primer NIS 2 sur DORA pour une banque ou un assureur : DORA est le texte spécial qui s'applique à la place de NIS 2.
- Qualifier d'essentielle toute entreprise de plus de 250 salariés : le seuil ne joue que pour l'annexe I ; une grande entreprise de l'annexe II est une entité importante, et l'appartenance à un groupe financier ne change pas sa qualification.

## À retenir
- NIS 2 est une directive (transposition nécessaire) ; DORA est un règlement (application directe).
- Les dirigeants sont personnellement impliqués : approbation, supervision, formation, responsabilité.
- Le recours à un prestataire ou au cloud ne transfère pas la responsabilité de la conformité : registre des contrats et clauses de sécurité sont exigés.

**Notions liées :** [Cybersécurité : menaces et analyse de risques](/cours/cybersecurite-menaces) · [Politique de sécurité et continuité](/cours/politique-securite-continuite) · [Protection des données personnelles dans le SI](/cours/protection-donnees-rgpd-si) · [Gestion des risques et contrôle interne](/cours/gestion-risques-controle-interne)
