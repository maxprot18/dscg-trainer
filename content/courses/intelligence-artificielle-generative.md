# Intelligence artificielle (dont générative) : usages, limites, encadrement

**Références :** règlement (UE) 2024/1689 sur l'intelligence artificielle (AI Act), art. 2, 3, 4, 5, 6, 50, 99, 113 et annexe III, modifié par le règlement (UE) 2026/1744 (« omnibus IA », report du haut risque) ; RGPD art. 22 (décision entièrement automatisée) ; recommandations CNIL sur l'IA

**Enjeu :** l'IA entre dans la fonction finance (détection de fraude, scoring, assistants rédactionnels) ; l'examen attend de lire les indicateurs d'un classifieur, de repérer les risques d'un usage d'IA générative et de classer un système dans les catégories de l'AI Act.

**Apprentissage automatique** : un modèle apprend des régularités à partir de données. **Supervisé** (données étiquetées : prédire une fraude, un défaut de paiement), **non supervisé** (regroupement, détection d'anomalies sans étiquette), par renforcement (récompense d'une suite de décisions). Risques : biais des données d'entraînement reproduits puis amplifiés, **surapprentissage** (excellent sur les données d'apprentissage, médiocre sur des données nouvelles), opacité des modèles complexes (« boîte noire »), dérive dans le temps.

**Mesure de performance d'un classifieur** (ex. détection de fraude) :
- **rappel** = vrais positifs ÷ (vrais positifs + faux négatifs) : part des fraudes réelles détectées ;
- **précision** = vrais positifs ÷ (vrais positifs + faux positifs) : part des alertes justifiées ;
- l'exactitude globale (cas bien classés ÷ total) est trompeuse quand la classe recherchée est rare : prédire « jamais de fraude » donne 99 % d'exactitude si 1 % des opérations sont frauduleuses. Le réglage du seuil arbitre entre rappel (ne rien manquer) et précision (ne pas noyer les analystes).

**IA générative** : grands modèles de langage qui produisent le texte, le code ou l'image le plus probable à partir d'une consigne. Usages en finance : synthèse de documents, rédaction de notes et de courriers, aide à l'analyse, assistants de recherche dans la documentation interne. Limites : **hallucinations** (réponses fausses mais plausibles : chiffre, article, jurisprudence inventés), confidentialité des données saisies dans un outil public, droits d'auteur, dépendance au fournisseur, coût. Parades : génération augmentée par récupération de documents internes (RAG) avec citation des sources, vérification humaine systématique, outils déployés dans un environnement maîtrisé, charte d'usage et formation.

**AI Act** : approche par les risques, avec des obligations graduées.
- **pratiques interdites** (art. 5) : notation sociale, manipulation exploitant les vulnérabilités, reconnaissance des émotions au travail ou à l'école (hors raisons médicales ou de sécurité), identification biométrique à distance en temps réel sauf exceptions… ;
- **haut risque** (art. 6, annexe III) : notamment recrutement et gestion des travailleurs, évaluation de la solvabilité des personnes physiques, éducation, services essentiels ; le **fournisseur** doit mettre en place gestion des risques, qualité des données, documentation technique, journalisation, contrôle humain, marquage CE ; le **déployeur** utilise le système selon la notice, assure la surveillance humaine et informe les travailleurs concernés ;
- **transparence** (art. 50) : informer les personnes qu'elles interagissent avec une IA, signaler les contenus générés ou manipulés (hypertrucages) ;
- risque minimal : pas d'obligation spécifique ; les modèles d'IA à usage général ont leurs propres obligations (documentation, droit d'auteur, risques systémiques).
Champ territorial (art. 2) : fournisseurs qui mettent un système sur le marché de l'UE, **où qu'ils soient établis**, déployeurs établis dans l'UE, et fournisseurs ou déployeurs de pays tiers dont les résultats sont utilisés dans l'UE. Sanctions (art. 99) jusqu'à 35 M€ ou 7 % du chiffre d'affaires mondial pour les pratiques interdites.

```diagram
{"type":"timeline","title":"Application progressive de l'AI Act (art. 113)","items":[{"when":"1er août 2024","label":"Entrée en vigueur","note":"Règlement (UE) 2024/1689 publié au JOUE le 12 juillet 2024"},{"when":"2 févr. 2025","label":"Pratiques interdites","note":"Art. 5 applicable ; maîtrise de l'IA par le personnel (art. 4)"},{"when":"2 août 2025","label":"Modèles à usage général","note":"Obligations des fournisseurs de modèles, gouvernance, sanctions"},{"when":"2 août 2026","label":"Transparence (art. 50)","note":"Information des personnes, marquage des contenus générés ; le haut risque, prévu à cette date, est reporté par l'omnibus IA"},{"when":"2 déc. 2027","label":"Haut risque annexe III","note":"Recrutement, solvabilité, éducation… (date reportée par le règl. 2026/1744)"},{"when":"2 août 2028","label":"Produits réglementés","note":"Haut risque intégré à des produits de l'annexe I (machines, dispositifs médicaux) ; date initiale 2 août 2027 (art. 113), reportée par le règl. 2026/1744"}]}
```

**Formules clés :** rappel = VP ÷ (VP + FN) ; précision = VP ÷ (VP + FP) ; exactitude = (VP + VN) ÷ total

## Exemple
Un modèle de détection de virements frauduleux est testé sur 20 000 virements dont 200 sont frauduleux ; il déclenche 500 alertes, dont 150 visent des fraudes réelles. Rappel = 150 ÷ 200 = **75 %** (50 fraudes manquées) ; précision = 150 ÷ 500 = **30 %** (350 fausses alertes à traiter par les analystes) ; exactitude = (150 + 19 450) ÷ 20 000 = **98,0 %**, flatteuse mais sans intérêt pour juger la détection.
Usage génératif : le service comptable veut utiliser un assistant public pour résumer les contrats de location et rédiger les réponses aux demandes des commissaires aux comptes. Risques : contrats confidentiels transmis à un tiers hors contrat de sous-traitance, référence à un paragraphe d'IFRS 16 inventé, décisions non tracées. Solution : outil déployé dans l'environnement de l'entreprise avec RAG sur la documentation interne, relecture par un comptable qui reste signataire, journal des requêtes, charte d'usage.

## Erreurs fréquentes
- Classer un logiciel de tri automatique des CV dans la simple obligation de transparence : le recrutement figure à l'annexe III, c'est un système à **haut risque** ; ce n'est pas non plus une pratique interdite.
- Croire que l'entreprise qui achète le logiciel échappe au règlement, ou que l'AI Act ne vise que les fournisseurs établis dans l'UE : le déployeur a ses propres obligations (usage conforme, surveillance humaine, information des salariés) et le règlement a une portée extraterritoriale (art. 2).
- Juger un modèle sur son exactitude de 98 % : avec 1 % de fraudes, il faut lire le rappel et la précision.

## À retenir
- Trier des candidatures avec une IA relève du haut risque, pas d'une simple obligation de transparence.
- Un modèle exact à 98 % peut être inutile si la fraude ne représente que 1 % des cas : lire rappel et précision.
- Une IA générative doit être vérifiée : elle ne garantit pas l'exactitude de ses réponses et ne doit pas recevoir de données confidentielles hors cadre contractuel.
- AI Act : interdictions depuis février 2025, transparence depuis août 2026, haut risque de l'annexe III reporté au 2 décembre 2027 (omnibus IA), portée extraterritoriale ; le déployeur a aussi des obligations.

**Notions liées :** [Protection des données personnelles (RGPD)](/cours/protection-donnees-rgpd-si) · [Automatisation des processus et RPA](/cours/automatisation-processus-rpa) · [Cybersécurité : menaces](/cours/cybersecurite-menaces) · [Fraudes, lois et règlements](/cours/fraudes-lois-reglements)
