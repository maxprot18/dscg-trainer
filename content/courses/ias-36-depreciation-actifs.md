# IAS 36 — Dépréciation d'actifs

**Références :** IAS 36 §6, §9-10, §12-14, §18-19, §30-57, §59-64, §66-70, §80-90, §104-105, §110-124 (règl. UE 2023/1803)

**Enjeu :** décider quand tester un actif, calculer la valeur recouvrable, imputer une perte sur une unité génératrice de trésorerie (UGT) contenant du goodwill et reprendre une perte ; calcul de cas pratique très fréquent, lié à IFRS 3 et IAS 16.

**Quand tester ?**
- à chaque clôture, rechercher un **indice** de perte de valeur, externe (baisse de valeur de marché supérieure à l'usure attendue, hausse des taux, environnement défavorable, capitalisation boursière inférieure à l'actif net) ou interne (obsolescence ou dommage, restructuration ou arrêt prévu, performance inférieure aux prévisions) (§9, §12-14) ; sans indice, aucun test n'est nécessaire ;
- test **annuel obligatoire**, même sans indice, et à tout moment de l'année pourvu que ce soit à la même date chaque année : goodwill, immobilisations incorporelles à durée d'utilité indéterminée ou pas encore prêtes à être utilisées (§10).

**Valeur recouvrable (§18)** = max (juste valeur diminuée des coûts de sortie ; valeur d'utilité). Si l'une des deux excède la valeur comptable, pas de perte et il est inutile de calculer l'autre (§19). La juste valeur diminuée des coûts de sortie suit IFRS 13 ; les coûts de sortie sont les coûts marginaux directement attribuables (frais d'acte, démontage), hors charges financières et impôt.

**Valeur d'utilité (§30-57)** : flux de trésorerie futurs de l'actif en l'état, fondés sur des budgets récents, sur 5 ans au plus sauf justification, puis extrapolés avec un taux de croissance stable ou décroissant (§33) ; hors restructurations non engagées et hors investissements d'amélioration (§44) ; actualisés à un taux **avant impôt** reflétant le risque spécifique de l'actif (§55) ; flux hors financement et hors impôt (§50) ; les flux nets de sortie de l'actif à la fin de sa durée d'utilité sont inclus (§39c).

**Perte de valeur (§59-64)** = valeur comptable − valeur recouvrable, en résultat (ou en diminution de l'écart de réévaluation pour un actif réévalué, le surplus en résultat) ; amortissements futurs recalculés sur la nouvelle base et la durée restante (§63) ; impôt différé ajusté (§64).

**Unité génératrice de trésorerie (§6, §66-70)** : plus petit groupe identifiable d'actifs générant des entrées de trésorerie largement indépendantes de celles d'autres actifs ; un actif ou groupe d'actifs dont la production a un marché actif constitue obligatoirement une UGT, même si cette production est utilisée en interne (§70). Un actif qui ne génère pas de flux propres (siège, machine isolée d'une chaîne) est testé au niveau de son UGT ; les actifs de support sont affectés aux UGT sur une base raisonnable (§100-102). Le goodwill est affecté dès l'acquisition aux UGT ou groupes d'UGT qui bénéficient des synergies, au plus au niveau d'un secteur opérationnel (§80).

```diagram
{"type":"flow","title":"Test de dépréciation d'une UGT contenant du goodwill","steps":[{"label":"Indice ou test annuel","note":"Goodwill : test annuel obligatoire (§10)"},{"label":"Valeur comptable de l'UGT","note":"Actifs affectés + goodwill (§75-76)"},{"label":"Valeur recouvrable","note":"Max (JV − coûts de sortie ; valeur d'utilité)"},{"label":"Perte = VC − VR","note":"Si VC > VR"},{"label":"Imputation sur le goodwill","note":"En premier, intégralement (§104a)"},{"label":"Puis prorata des autres actifs","note":"Sans descendre sous leur VR individuelle ni sous zéro (§105)"}]}
```

**Imputation d'une perte sur une UGT (§104-105)** : d'abord sur le goodwill, puis sur les autres actifs du champ d'IAS 36 au prorata de leur valeur comptable ; aucun actif ne descend sous le plus élevé de sa juste valeur diminuée des coûts de sortie, de sa valeur d'utilité et de zéro ; l'excédent non imputé est réparti sur les autres actifs au prorata. Les stocks, créances et impôts différés ne sont pas dépréciés par IAS 36 (§2).

**Reprise (§110-124)** : si un indice montre que la perte a diminué ou disparu par un changement d'estimation (§114), reprise en résultat plafonnée à la valeur comptable, nette d'amortissements, qu'aurait eue l'actif sans dépréciation (§117). **Jamais de reprise sur le goodwill** (§124), car l'amélioration serait un goodwill généré en interne.

## Exemple
L'UGT Nord de Polaris comprend au 31/12/N : goodwill 200 k€, immeuble 600 k€, machines 400 k€ (total 1 200 k€). Valeur d'utilité de l'UGT : 900 k€, supérieure à sa juste valeur nette ; la juste valeur diminuée des coûts de sortie de l'immeuble est de 570 k€.
Perte = 1 200 − 900 = 300 k€ : goodwill ramené à 0 (200 k€) ; reste 100 k€ au prorata : immeuble 100 × 600/1 000 = 60 k€, machines 40 k€. Mais l'immeuble ne peut descendre sous 570 k€ : sa dépréciation est limitée à 30 k€, et les 30 k€ non imputés vont sur les machines, soit 70 k€ (VNC 330 k€).
En N+2, la valeur recouvrable de l'UGT remonte : seules les dépréciations de l'immeuble et des machines sont reprises, dans la limite de leur VNC sans dépréciation ; les 200 k€ de goodwill sont définitivement perdus.

## Erreurs fréquentes
- Retenir le plus faible des deux montants, ou calculer systématiquement les deux : la valeur recouvrable est le plus élevé, et un seul suffit s'il dépasse la valeur comptable.
- Actualiser la valeur d'utilité à un taux après impôt ou intégrer les flux d'une restructuration décidée mais non engagée : taux avant impôt, actif dans son état actuel.
- Reprendre une perte de valeur sur le goodwill ou reprendre une perte au-delà de la VNC qu'aurait eue l'actif : interdit (§117, §124).
- Tester seulement en présence d'un indice un goodwill ou une incorporelle à durée indéterminée : test annuel obligatoire.

## À retenir
- Valeur recouvrable = le plus élevé des deux montants, pas le plus faible.
- Taux d'actualisation avant impôt, flux de l'actif dans son état actuel, horizon de 5 ans sauf justification.
- Le goodwill absorbe la perte en premier et ne se reprend jamais ; les autres actifs ne descendent pas sous leur propre valeur recouvrable.

**Notions liées :** [IFRS 3 — Regroupements d'entreprises](/cours/ifrs-3-regroupements-entreprises) · [Écarts d'acquisition](/cours/ecarts-acquisition) · [Amortissements et dépréciations en PCG](/cours/amortissements-depreciations-pcg) · [IAS 38 — Immobilisations incorporelles](/cours/ias-38-immobilisations-incorporelles)
