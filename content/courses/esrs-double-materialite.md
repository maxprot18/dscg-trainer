# Normes ESRS et analyse de double matérialité

**Références :** Règlement délégué (UE) 2023/2772 (premier jeu d'ESRS), annexe I : ESRS 1 (exigences générales, chap. 3 double matérialité), ESRS 2 (informations générales, IRO-1 et IRO-2), ESRS E1 (changement climatique, E1-6 émissions brutes, E1-7 absorptions et crédits carbone) ; directive (UE) 2026/470 (mandat de simplification des ESRS) ; GHG Protocol (méthode de calcul des scopes)

**Enjeu :** les ESRS fixent le contenu de l'état de durabilité ; l'examen demande de connaître leur architecture, d'appliquer le raisonnement de double matérialité à un cas concret et de calculer ou de contrôler les émissions de gaz à effet de serre (GES) publiées selon E1.

- Premier jeu : deux normes transversales (ESRS 1 Exigences générales, ESRS 2 Informations générales) et dix normes thématiques : E1 Changement climatique, E2 Pollution, E3 Ressources aquatiques et marines, E4 Biodiversité et écosystèmes, E5 Utilisation des ressources et économie circulaire, S1 Effectifs de l'entreprise, S2 Travailleurs de la chaîne de valeur, S3 Communautés affectées, S4 Consommateurs et utilisateurs finaux, G1 Conduite des affaires. Les normes sectorielles prévues à l'origine ont été abandonnées par Omnibus I.
- ESRS 2 s'applique toujours (gouvernance, stratégie, gestion des IRO, indicateurs et cibles). Les normes thématiques s'appliquent selon le résultat de l'analyse de double matérialité ; une information jugée non matérielle peut être omise, mais si l'entreprise juge le changement climatique non matériel, elle fournit une explication détaillée de cette conclusion, avec une analyse prospective.
- Matérialité d'impact (de l'intérieur vers l'extérieur) : impacts réels ou potentiels, négatifs ou positifs, de l'entreprise et de sa chaîne de valeur sur les personnes et l'environnement, à court, moyen ou long terme. La gravité d'un impact négatif s'apprécie par son ampleur, son étendue et son caractère irrémédiable, et par sa probabilité s'il est potentiel.
- Matérialité financière (de l'extérieur vers l'intérieur) : risques et opportunités susceptibles d'avoir un effet significatif sur la situation financière, la performance, les flux de trésorerie, l'accès au financement ou le coût du capital, même s'ils ne sont pas encore comptabilisés.
- Une question est matérielle si elle l'est selon l'une **ou** l'autre dimension. Les deux analyses sont liées (un impact négatif devient souvent un risque réglementaire ou de réputation) et couvrent la chaîne de valeur amont et aval. Le processus (parties prenantes consultées, seuils, approbation) est lui-même décrit dans l'état de durabilité et vérifié par l'auditeur de durabilité.
- ESRS E1 : émissions brutes de GES en tCO₂e. Scope 1 : émissions directes des sources détenues ou contrôlées (combustion, procédés, flotte). Scope 2 : émissions indirectes liées à l'énergie achetée (électricité, chaleur, vapeur, froid), publiées selon la méthode fondée sur la **localisation** (facteur moyen du réseau) et selon la méthode fondée sur le **marché** (contrats d'énergie). Scope 3 : autres émissions indirectes de la chaîne de valeur (quinze catégories du GHG Protocol : achats, transport, utilisation des produits vendus, etc.).
- Les crédits carbone et les absorptions sont présentés séparément (E1-7) et ne viennent pas en déduction des émissions brutes ; les cibles de réduction s'expriment en émissions brutes.
- Connectivité : les informations de durabilité doivent être cohérentes avec les états financiers (provisions environnementales, quotas d'émission, dépréciations ou durées d'utilité liées au climat) et les renvois sont explicités.
- Simplification : sur avis technique de l'EFRAG (décembre 2025), la Commission a adopté le 3 juillet 2026 un acte délégué révisant les ESRS (exercices ouverts à compter du 1er janvier 2027, application anticipée possible), qui réduit d'environ 60 % le nombre de points de données obligatoires et clarifie la double matérialité, sans changer l'architecture (ESRS 1, ESRS 2, normes thématiques).

**Formules clés :** émissions totales = scope 1 + scope 2 + scope 3 (deux totaux : localisation et marché) ; intensité GES = émissions totales ÷ chiffre d'affaires net (tCO₂e par M€)

```diagram
{"type":"tree","title":"Une question de durabilité est-elle matérielle (ESRS 1) ?","root":{"label":"Impact réel ou potentiel significatif sur les personnes ou l'environnement ?","children":[{"edge":"oui","label":"Matérielle : informations de la norme thématique"},{"edge":"non","label":"Risque ou opportunité financier significatif ?","children":[{"edge":"oui","label":"Matérielle : informations de la norme thématique"},{"edge":"non","label":"Non matérielle (pour E1 : explication détaillée)"}]}]}}
```

## Exemple
Tilleul SA (chiffre d'affaires net 130 M€) publie selon E1, en tCO₂e : scope 1 = 4 500 (chaudières et flotte) ; scope 2 = 1 800 selon la méthode fondée sur la localisation et 600 selon la méthode fondée sur le marché (contrats d'électricité renouvelable) ; scope 3 = 21 000 (achats, transport amont, utilisation des produits) ; crédits carbone annulés dans l'exercice = 1 500. Total brut « localisation » = 4 500 + 1 800 + 21 000 = 27 300 tCO₂e ; total brut « marché » = 4 500 + 600 + 21 000 = 26 100 tCO₂e, publié à côté. Intensité = 27 300 ÷ 130 = 210 tCO₂e par M€ de chiffre d'affaires. Les 1 500 tCO₂e de crédits figurent dans E1-7 et ne réduisent aucun de ces totaux (25 800 serait faux).

## Erreurs fréquentes
- Exiger qu'une question soit matérielle à la fois en impact et en finance : une seule dimension suffit (ex. : risque de sécheresse pour des centres de données, matériel financièrement malgré un faible impact sur l'eau).
- Appliquer E1 ou S1 « parce que la norme existe » et omettre ESRS 2 : seule ESRS 2 est toujours obligatoire ; les thématiques dépendent de l'analyse.
- Déduire les crédits carbone des émissions brutes ou mélanger les deux méthodes du scope 2 dans un même total.
- Limiter la double matérialité aux opérations propres : la chaîne de valeur amont et aval est incluse.

## À retenir
- Double matérialité = impact OU financière, pas « impact ET financière » ; le processus est publié et vérifié.
- ESRS 2 est obligatoire ; E1 ne peut être écarté qu'avec une explication détaillée.
- Ne jamais déduire les crédits carbone des émissions brutes ; publier le scope 2 selon les deux méthodes.

**Notions liées :** [Cadre CSRD](/cours/cadre-csrd-perimetre) · [Reporting taxonomie verte](/cours/taxonomie-verte-reporting) · [Procédures d'audit de durabilité](/cours/procedures-audit-durabilite) · [Pilotage de la durabilité et bilan carbone](/cours/pilotage-durabilite-bilan-carbone)
