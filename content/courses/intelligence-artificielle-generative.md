# Intelligence artificielle (dont générative) : usages, limites, encadrement

**Références :** règlement (UE) 2024/1689 sur l'intelligence artificielle (AI Act), art. 2, 3, 5, 6, 50 et annexe III ; RGPD art. 22

**Apprentissage automatique** : un modèle apprend des régularités à partir de données. **Supervisé** (données étiquetées : prédire une fraude, un défaut de paiement), **non supervisé** (regroupement, détection d'anomalies sans étiquette), par renforcement. Risques : biais des données d'entraînement, **surapprentissage** (excellent sur les données d'apprentissage, médiocre sur des données nouvelles), opacité.

**Mesure de performance d'un classifieur** (ex. détection de fraude) :
- **rappel** = vrais positifs ÷ (vrais positifs + faux négatifs) : part des fraudes réelles détectées ;
- **précision** = vrais positifs ÷ (vrais positifs + faux positifs) : part des alertes justifiées ;
- l'exactitude globale est trompeuse quand la classe recherchée est rare.

**IA générative** : grands modèles de langage qui produisent texte, code ou images. Usages en finance : synthèse de documents, rédaction, aide à l'analyse, assistants. Limites : **hallucinations** (réponses fausses mais plausibles), confidentialité des données saisies, droits d'auteur, dépendance au fournisseur. Parades : génération augmentée par récupération de documents internes (RAG), vérification humaine, outils déployés dans un environnement maîtrisé.

**AI Act** : approche par les risques.
- **pratiques interdites** (art. 5) : notation sociale, manipulation, reconnaissance des émotions au travail ou à l'école (hors raisons médicales ou de sécurité)… ;
- **haut risque** (art. 6, annexe III) : notamment recrutement et gestion des travailleurs, évaluation de la solvabilité des personnes physiques, éducation ; obligations de gestion des risques, qualité des données, documentation, contrôle humain ;
- **transparence** (art. 50) : informer les personnes qu'elles interagissent avec une IA, signaler les contenus générés (hypertrucages) ;
- risque minimal : pas d'obligation spécifique. Les modèles d'IA à usage général ont leurs propres obligations.
Champ territorial (art. 2) : fournisseurs qui mettent un système sur le marché de l'UE, **où qu'ils soient établis**, et déployeurs établis dans l'UE. Entrée en vigueur le 1er août 2024, application progressive.

## À retenir
- Trier des candidatures avec une IA relève du haut risque, pas d'une simple obligation de transparence.
- Un modèle exact à 98 % peut être inutile si la fraude ne représente que 1 % des cas.
- Une IA générative doit être vérifiée : elle ne garantit pas l'exactitude de ses réponses.
