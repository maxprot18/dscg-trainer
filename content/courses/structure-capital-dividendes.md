# Structure du capital et politique de dividende

**Références :** Modigliani et Miller (1958, 1961, 1963) ; théorie du compromis ; Myers et Majluf (1984) ; Jensen (1986)

**Enjeu :** l'endettement crée-t-il de la valeur ? Les propositions de Modigliani-Miller donnent le cadre de référence, que les théories ultérieures (compromis, hiérarchie, agence, signal) nuancent ; à l'examen, on calcule k_cp et la valeur avec ou sans impôt, puis on commente une décision de financement ou de dividende.

**Modigliani-Miller sans impôt (1958)**, marchés parfaits : la valeur de l'entreprise ne dépend pas de sa structure financière (V_L = V_U), car la valeur vient des actifs, pas de la façon de les financer. Le coût des capitaux propres croît avec l'endettement, exactement de ce qu'il faut pour compenser la dette moins chère : k_cp = k_u + (k_u − k_d) × D / C ; le CMPC reste égal à k_u.

**Avec impôt sur les sociétés (1963)**, dette perpétuelle : la déductibilité des intérêts crée une économie d'impôt annuelle t × k_d × D, dont la valeur actuelle au taux k_d est t × D. V_L = V_U + t × D ; k_cp = k_u + (k_u − k_d) × (1 − t) × D / C ; CMPC = k_u × (1 − t × D / V_L), décroissant avec l'endettement. Pris à la lettre, le modèle conduirait à s'endetter au maximum.

**Théorie du compromis** : la structure optimale égalise, à la marge, l'avantage fiscal de la dette et les coûts de faillite et de détresse financière (clients et fournisseurs perdus, ventes forcées d'actifs) ainsi que les coûts d'agence de la dette. Elle implique un ratio d'endettement cible.

**Financement hiérarchique (pecking order)** : à cause de l'asymétrie d'information, l'entreprise préfère l'autofinancement, puis la dette, et en dernier recours l'augmentation de capital (interprétée par le marché comme le signe d'actions surévaluées). Pas de ratio cible : l'endettement résulte du cumul des besoins passés.

**Politique de dividende**
- MM (1961) : en marchés parfaits, neutralité du dividende ; la valeur dépend de la politique d'investissement, l'actionnaire pouvant fabriquer lui-même son dividende en vendant des titres.
- Imperfections : signal (hausse du dividende = confiance des dirigeants dans les résultats futurs), coûts d'agence (le dividende réduit la trésorerie disponible laissée aux dirigeants, Jensen), effet de clientèle et fiscalité des actionnaires, rachats d'actions comme substitut.

**Formules clés :** V_L = V_U + t × D ; k_cp = k_u + (k_u − k_d)(1 − t) D / C ; CMPC = k_u (1 − t D / V_L)

## Exemple
Entreprise non endettée valant V_U = 10 M€, k_u = 10 %. Elle émet 4 M€ de dette perpétuelle à k_d = 5 % pour racheter des actions ; IS 25 %.
Sans impôt : V_L = 10 M€, C = 6 M€, k_cp = 10 % + (10 % − 5 %) × 4 / 6 = 13,33 % ; CMPC = 6/10 × 13,33 % + 4/10 × 5 % = 10 %, inchangé.
Avec impôt : V_L = 10 + 0,25 × 4 = 11 M€, C = 11 − 4 = 7 M€ ; k_cp = 10 % + 5 % × 0,75 × 4 / 7 = 12,14 % ; CMPC = 10 % × (1 − 0,25 × 4 / 11) = 9,09 %. Vérification : 7/11 × 12,14 % + 4/11 × 5 % × 0,75 = 9,09 %.

## Erreurs fréquentes
- Appliquer la formule avec (1 − t) dans un monde sans impôt : sans IS, k_cp = k_u + (k_u − k_d) × D / C, soit 13,33 % et non 12,5 % dans l'exemple.
- Croire qu'avec impôt la structure optimale est un endettement maximal : la théorie du compromis arrête l'endettement quand le coût marginal de la détresse financière égale l'avantage fiscal marginal.
- Attribuer au pecking order une préférence pour l'augmentation de capital : c'est la source de dernier recours.
- Déduire de MM (1961) qu'une hausse du dividende augmente la valeur : en marchés parfaits elle est neutre ; l'effet positif observé relève du signal, hors du modèle.

## À retenir
- Sans impôt, l'effet de levier accroît k_cp sans changer la valeur ; avec impôt, la valeur augmente de t × D.
- Le pecking order n'a pas de ratio cible ; le compromis, si.
- Le dividende n'informe que par ce qu'il révèle (signal, discipline des dirigeants), pas par lui-même.

**Notions liées :** [Coût du capital, CMPC et MEDAF](/cours/cout-capital-cmpc-medaf) · [Structure financière et endettement](/cours/structure-financiere-endettement) · [Rentabilité et effet de levier](/cours/rentabilite-effet-levier) · [Choix des modalités de financement](/cours/choix-modalites-financement)
