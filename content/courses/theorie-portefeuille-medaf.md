# Théorie du portefeuille, diversification et MEDAF

**Références :** Markowitz (1952), sélection de portefeuille ; Sharpe (1964), modèle d'équilibre des actifs financiers ; PCG (règl. ANC 2014-03), comptes 503, 667 et 767

**Enjeu :** expliquer pourquoi seul le risque de marché est rémunéré et en déduire la rentabilité exigée d'un titre ; à l'examen, on calcule la rentabilité et le risque d'un portefeuille de deux titres, un bêta, puis on juge si une action est sur- ou sous-évaluée par rapport à la droite de marché des titres.

- **Rentabilité et risque d'un titre** : rentabilité espérée E(R) (moyenne des rentabilités possibles pondérées par leurs probabilités) ; risque mesuré par l'écart-type σ (ou la variance) des rentabilités.
- **Portefeuille de deux titres** (poids x et 1 − x) : E(R_P) = x E(R_A) + (1 − x) E(R_B) ; σ²_P = x² σ²_A + (1 − x)² σ²_B + 2x(1 − x) ρ σ_A σ_B, avec cov(A, B) = ρ σ_A σ_B. La rentabilité est une moyenne pondérée ; le risque ne l'est pas, sauf si ρ = 1.
- **Diversification** : dès que ρ < 1, σ_P est inférieur à la moyenne pondérée des écarts-types ; avec ρ = −1, on peut même annuler le risque. Avec un grand nombre de titres, le **risque spécifique** (diversifiable : propre à l'entreprise, à son secteur, à son dirigeant) disparaît ; il reste le **risque systématique** (de marché : conjoncture, taux, inflation), non diversifiable.
- **Frontière efficiente** : ensemble des portefeuilles qui offrent la rentabilité maximale pour un risque donné. Avec un actif sans risque, la meilleure combinaison est sur la **droite de marché des capitaux** (CML), tangente au portefeuille de marché M : E(R_P) = r_f + [(E(R_M) − r_f)/σ_M] × σ_P (portefeuilles efficients seulement). Tout investisseur détient alors M et l'actif sans risque, dans une proportion qui dépend de son aversion au risque (théorème de séparation).
- **Bêta** : β_i = cov(R_i, R_M) / σ²_M ; β > 1 : titre plus sensible que le marché ; β du marché = 1 ; β de l'actif sans risque = 0 ; β d'un portefeuille = moyenne pondérée des bêtas.
- **MEDAF** et **droite de marché des titres** (SML) : E(R_i) = r_f + β_i [E(R_M) − r_f] ; seul le risque systématique est rémunéré, le risque spécifique pouvant être éliminé gratuitement. Un titre dont la rentabilité attendue dépasse celle de la SML (alpha positif) est sous-évalué : son prix devrait monter jusqu'à ramener sa rentabilité sur la droite.
- **Comptabilisation des titres de placement** : entrée au coût d'acquisition (503) ; à la cession, en cas de titres fongibles, coût de sortie au coût moyen pondéré ou selon la méthode « premier entré, premier sorti » ; résultat de cession net en 767 (produit net) ou 667 (charge nette).

**Formules clés :** σ²_P = x²σ²_A + (1−x)²σ²_B + 2x(1−x)ρσ_Aσ_B ; β = cov(R_i, R_M)/σ²_M ; E(R_i) = r_f + β (E(R_M) − r_f)

## Exemple
Titre A : E(R) = 8 %, σ = 20 % ; titre B : E(R) = 12 %, σ = 30 % ; ρ = 0,3. Portefeuille investi à 60 % en A et 40 % en B.
E(R_P) = 0,6 × 8 + 0,4 × 12 = 9,6 %. σ²_P = 0,6² × 0,2² + 0,4² × 0,3² + 2 × 0,6 × 0,4 × 0,3 × 0,2 × 0,3 = 0,0144 + 0,0144 + 0,00864 = 0,03744, d'où σ_P = 19,35 %, contre 24 % pour la moyenne pondérée des écarts-types : la diversification a retiré 4,65 points de risque.
MEDAF : r_f = 3 %, E(R_M) = 8 %, σ_M = 20 %, cov(R_A, R_M) = 0,036. β_A = 0,036 / 0,04 = 0,9 ; rentabilité d'équilibre = 3 + 0,9 × (8 − 3) = 7,5 %. Comme A est attendu à 8 %, il offre un alpha de +0,5 point : il est sous-évalué, au-dessus de la SML.

## Erreurs fréquentes
- Calculer le bêta avec l'écart-type du marché (0,036 / 0,2 = 0,18) au lieu de sa variance (0,036 / 0,04 = 0,9).
- Multiplier le bêta par E(R_M) au lieu de la prime de risque E(R_M) − r_f : avec les données ci-dessus, on obtiendrait 3 + 0,9 × 8 = 10,2 % au lieu de 7,5 %.
- Croire qu'un portefeuille très diversifié n'a plus aucun risque : il conserve tout le risque systématique, et c'est le seul qui soit rémunéré.
- Juger un titre « correctement évalué » parce que son bêta est inférieur à 1 : le bêta mesure le risque, pas l'écart entre rentabilité attendue et rentabilité d'équilibre.

## À retenir
- Le bêta se calcule avec la variance du marché, pas avec son écart-type.
- La CML concerne les portefeuilles efficients (risque total σ) ; la SML s'applique à tout titre (risque systématique β).
- La prime de risque du marché s'écrit E(R_M) − r_f ; ne pas multiplier β par E(R_M).
- Alpha positif = titre au-dessus de la SML = sous-évalué (à acheter).

**Notions liées :** [Coût du capital, CMPC et MEDAF](/cours/cout-capital-cmpc-medaf) · [Efficience des marchés](/cours/efficience-finance-comportementale) · [Évaluation des obligations et duration](/cours/evaluation-obligations-duration)
