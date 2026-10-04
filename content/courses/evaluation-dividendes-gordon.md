# Actualisation des dividendes (Gordon-Shapiro) et méthode de Bates

**Références :** modèle d'actualisation des dividendes (Gordon-Shapiro, 1956) ; modèle de Bates ; méthodes d'évaluation usuelles

**Enjeu :** modèle le plus simple de la finance d'entreprise, il sert à l'examen pour évaluer une action, retrouver le coût des capitaux propres implicite d'un cours, ou calculer la valeur terminale d'un DCF ; il faut maîtriser le décalage D₀ / D₁ et le choix entre croissance perpétuelle et croissance temporaire.

La valeur d'une action est la valeur actuelle des dividendes futurs, actualisés au coût des capitaux propres k : l'actionnaire minoritaire ne reçoit que des dividendes et un prix de revente, lui-même égal à la valeur des dividendes ultérieurs.

**Gordon-Shapiro** (dividendes croissant à taux constant g à l'infini, avec g < k) : P₀ = D₁ / (k − g), avec D₁ = D₀ × (1 + g).
- Taux de croissance soutenable : g = taux de rétention × rentabilité des capitaux propres = (1 − d) × ROE, d étant le taux de distribution ; une entreprise qui distribue tout ne croît pas par autofinancement.
- Rentabilité implicite exigée : k = D₁ / P₀ + g (rendement + croissance) ; lecture inverse du modèle à partir du cours observé.
- Cas particulier g = 0 : P₀ = D / k ; appliqué au bénéfice, c'est la valeur de rendement V = B / k.
- PER théorique rapporté au bénéfice courant : P₀ / BPA₀ = d × (1 + g) / (k − g) (et d / (k − g) rapporté à BPA₁) ; il augmente avec g et diminue avec k.

**Méthode de Bates** (croissance forte mais temporaire) : on actualise les dividendes d'une période explicite de n années, puis un prix de revente estimé par un PER de sortie appliqué au bénéfice de l'année n.
- P₀ = Σ Dₜ (1 + k)⁻ᵗ (t = 1 à n) + PERₙ × BPAₙ × (1 + k)⁻ⁿ.
- Elle s'utilise notamment quand g ≥ k pendant la phase de croissance, cas où Gordon-Shapiro n'a pas de sens (dénominateur nul ou négatif) ; le PER de sortie, plus bas que le PER actuel, traduit le retour à une croissance normale.

**Formules clés :** P₀ = D₁ / (k − g) ; k = D₁ / P₀ + g ; g = (1 − d) × ROE ; Bates : P₀ = Σ Dₜ (1 + k)⁻ᵗ + PERₙ × BPAₙ (1 + k)⁻ⁿ

## Exemple
Gordon-Shapiro : dernier dividende D₀ = 2 €, g = 3 %, k = 8 %. D₁ = 2 × 1,03 = 2,06 € ; P₀ = 2,06 / (0,08 − 0,03) = **41,20 €**. Vérification : k = 2,06 / 41,20 + 3 % = 8 %.
Bates : BPA₀ = 4 €, croissance 15 % pendant 3 ans, distribution 40 %, PER de sortie 12, k = 9 %. Dividendes : 1,84 ; 2,116 ; 2,433 € (BPA₃ = 6,083 €), valeur actuelle 5,35 €. Prix de revente = 12 × 6,083 = 73,00 €, actualisé 56,37 €.
P₀ = 5,35 + 56,37 = **61,72 €** ; Gordon-Shapiro serait ici inapplicable (g = 15 % > k = 9 %).

## Erreurs fréquentes
- Utiliser D₀ au lieu de D₁ : 2 / 0,05 = 40 € au lieu de 41,20 €.
- Calculer la rentabilité implicite en oubliant la croissance : k = D₁ / P₀ (5 %) au lieu de D₁ / P₀ + g (8 %) ; ou en utilisant D₀ au numérateur du rendement.
- Appliquer Gordon-Shapiro avec g ≥ k, ou avec un g de court terme (15 %) comme croissance perpétuelle : la perpétuité exige g inférieur à la croissance de l'économie.
- Prendre le ROE pour g : la croissance soutenable est le ROE multiplié par le taux de rétention (1 − d).

## À retenir
- Gordon-Shapiro utilise le prochain dividende D₁, pas le dernier versé D₀.
- La valeur est très sensible à l'écart k − g : un point de g en plus peut changer la valeur de 25 %.
- La méthode évalue une participation minoritaire (l'actionnaire ne perçoit que des dividendes) et suppose une politique de distribution stable.
- Croissance forte temporaire : Bates (dividendes explicites + PER de sortie), pas Gordon.

**Notions liées :** [Actualisation des flux (DCF)](/cours/actualisation-flux-dcf) · [Coût du capital : MEDAF et CMPC](/cours/cout-capital-cmpc-medaf) · [Structure du capital et dividendes](/cours/structure-capital-dividendes) · [Évaluation des obligations et duration](/cours/evaluation-obligations-duration)
