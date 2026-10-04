# Actualisation des flux de trésorerie disponibles (DCF) et valeur terminale

**Références :** méthodes d'évaluation usuelles (pratique de l'évaluation financière) ; modèle de croissance perpétuelle de Gordon-Shapiro appliqué à la valeur terminale

**Enjeu :** méthode de référence des évaluateurs, le DCF est le cœur des cas d'évaluation du DSCG : construire les flux à partir d'un plan d'affaires, les actualiser au CMPC, calculer une valeur terminale, puis passer de la valeur d'entreprise à la valeur des titres.

La méthode DCF évalue l'actif économique (valeur d'entreprise, VE) par l'actualisation, au CMPC, des flux de trésorerie disponibles (FTD, ou *free cash flows to the firm*) revenant à l'ensemble des apporteurs de capitaux, actionnaires et prêteurs.

**Flux de trésorerie disponible** = EBIT × (1 − t) + dotations aux amortissements et provisions − investissements − variation du BFR d'exploitation.
- L'impôt est un impôt normatif calculé sur le résultat d'exploitation, comme si l'entreprise n'était pas endettée : l'économie d'impôt sur les intérêts est déjà prise en compte dans le CMPC (coût de la dette après impôt) ; la compter aussi dans le flux la compterait deux fois.
- Les frais financiers et les remboursements d'emprunt ne sont jamais déduits des FTD : ils rémunèrent les prêteurs, qui sont déjà servis par la dette nette retranchée à la fin.
- Une hausse du BFR consomme de la trésorerie et diminue le flux ; une baisse l'augmente.

**Valeur d'entreprise** = Σ FTDₜ (1 + CMPC)⁻ᵗ (t = 1 à n, horizon explicite de 5 à 10 ans) + VTₙ (1 + CMPC)⁻ⁿ.
- Valeur terminale par Gordon-Shapiro : VTₙ = FTDₙ₊₁ / (CMPC − g) = FTDₙ × (1 + g) / (CMPC − g), avec g < CMPC et cohérent avec la croissance de long terme de l'économie (1 à 3 %) ; le flux normatif de l'année n suppose des investissements proches des amortissements.
- Variante : multiple de sortie (VE / EBITDA) appliqué à l'agrégat de l'année n.

**Valeur des capitaux propres** = VE − dette financière nette − intérêts minoritaires − provisions assimilables à des dettes (retraites) + actifs hors exploitation (participations non consolidées, trésorerie excédentaire, immeubles de placement).

**Formules clés :** VE = Σ FTDₜ / (1 + CMPC)ᵗ + [FTDₙ (1 + g) / (CMPC − g)] / (1 + CMPC)ⁿ ; VCP = VE − dette nette

```diagram
{"type":"flow","title":"Du plan d'affaires à la valeur des actions (DCF)","steps":[{"label":"EBIT × (1 − t)","note":"impôt normatif, sans effet de la dette"},{"label":"+ DAP − Inv. − ΔBFR","note":"= flux de trésorerie disponible"},{"label":"Actualisation au CMPC","note":"années 1 à n"},{"label":"+ Valeur terminale","note":"FTDₙ (1 + g) / (CMPC − g), actualisée n ans"},{"label":"= Valeur d'entreprise","note":"actif économique"},{"label":"− Dette nette","note":"= valeur des capitaux propres"}]}
```

## Exemple
Plan sur 3 ans : année 1, EBIT 150, IS 25 %, dotations 40, investissements 45, hausse du BFR 7,5 (en M€) ; FTD₁ = 150 × 0,75 + 40 − 45 − 7,5 = 100. FTD₂ = 110 et FTD₃ = 120 ; CMPC 8 % ; g = 2 % ; dette nette 300.
VT₃ = 120 × 1,02 / (0,08 − 0,02) = 2 040. Flux actualisés : 100 / 1,08 + 110 / 1,08² + 120 / 1,08³ = 282,2 ; VT actualisée : 2 040 / 1,08³ = 1 619,4.
VE = 282,2 + 1 619,4 = 1 901,6 M€ ; **VCP = 1 901,6 − 300 = 1 601,6 M€**. La valeur terminale pèse 85 % de la VE : la sensibilité à g et au CMPC doit être testée.

## Erreurs fréquentes
- Déduire les frais financiers des flux actualisés au CMPC : le coût de la dette est dans le taux, pas dans le flux (double comptage).
- Ne pas actualiser la valeur terminale, ou l'actualiser sur n + 1 ans : VT₃ est une valeur en fin d'année 3, actualisée sur 3 périodes (ici 2 322 M€ au lieu de 1 901,6 si on l'oublie).
- Calculer VT avec FTDₙ au lieu de FTDₙ × (1 + g) : la formule de Gordon utilise le flux de l'année suivante.
- Confondre valeur d'entreprise et valeur des capitaux propres : la dette nette doit être retranchée (et la trésorerie excédentaire ajoutée).

## À retenir
- La valeur terminale est calculée en fin d'année n mais doit être actualisée sur n périodes.
- Elle représente souvent plus de 60 % de la VE : tester la sensibilité au CMPC et à g.
- Ne pas confondre DCF entité (FTD, CMPC, VE) et approche actionnaire (flux après dette, coût des capitaux propres, VCP directe).

**Notions liées :** [Coût du capital : MEDAF et CMPC](/cours/cout-capital-cmpc-medaf) · [Multiples boursiers et de transactions](/cours/methodes-comparatives-multiples) · [Gordon-Shapiro et Bates](/cours/evaluation-dividendes-gordon) · [Flux de trésorerie d'un projet](/cours/flux-tresorerie-projet)
