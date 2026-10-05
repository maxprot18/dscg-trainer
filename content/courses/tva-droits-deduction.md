# TVA : droit à déduction, coefficient de déduction et régularisations

**Références :** CGI art. 271 ; CGI ann. II art. 205 à 208 ; PCG comptes 44562, 44566, 44567

**Enjeu :** la TVA n'est neutre pour l'entreprise que si elle récupère la taxe d'amont ; l'examen teste le calcul du coefficient de déduction d'un assujetti partiel et les régularisations sur immobilisations qui en découlent.

**Principe** (art. 271) : la TVA qui a grevé les éléments du prix d'une opération imposable est déductible de la TVA applicable à cette opération. Conditions : facture régulière mentionnant la TVA, TVA exigible chez le fournisseur (livraison pour les biens ; encaissement du prix pour les services, sauf option du prestataire pour les débits), bien ou service utilisé pour des opérations ouvrant droit à déduction. La déduction s'exerce sur la déclaration du mois où le droit est né ; une omission peut être réparée sur une déclaration ultérieure jusqu'au 31 décembre de la deuxième année qui suit celle de l'omission (ann. II art. 208).

**Coefficient de déduction** (ann. II art. 205 et 206) : TVA déductible = TVA d'amont × coefficient de déduction, produit de trois coefficients :
- **assujettissement** : part d'utilisation pour des opérations dans le champ de la TVA (1 si usage exclusif pour des opérations imposables ou exonérées dans le champ, 0 pour un bien affecté à une activité hors champ, comme l'activité non économique d'une association) ;
- **taxation** : CA ouvrant droit à déduction / CA total des opérations dans le champ ; il vaut 1 pour un bien affecté exclusivement à des opérations taxées (ou exonérées avec droit à déduction : LIC, exportations) et 0 pour un bien affecté exclusivement à des opérations exonérées sans droit à déduction. Sont exclus du calcul notamment les cessions de biens d'investissement et les opérations immobilières et financières accessoires ;
- **admission** : 0 pour les biens et services exclus du droit à déduction (véhicules de tourisme et leurs frais, sauf exceptions comme les taxis, auto-écoles et loueurs ; transport de personnes ; logement des dirigeants et du personnel ; cadeaux au-delà d'un seuil de faible valeur par bénéficiaire et par an), 1 sinon ; 0,8 pour le gazole et l'essence des véhicules de tourisme.

```diagram
{"type":"flow","title":"Du montant de TVA facturé à la TVA déductible","steps":[{"label":"TVA d'amont facturée","note":"facture régulière, TVA exigible chez le fournisseur"},{"label":"× coefficient d'assujettissement","note":"part d'utilisation dans le champ de la TVA"},{"label":"× coefficient de taxation","note":"CA ouvrant droit à déduction / CA dans le champ"},{"label":"× coefficient d'admission","note":"0 si exclusion (véhicule de tourisme, logement…), 0,8 carburant"},{"label":"= TVA déductible","note":"comptes 44562 ou 44566 ; crédit éventuel en 44567"}]}
```

**Calendrier** : coefficients provisoires (données de l'année précédente) appliqués en cours d'année, coefficients définitifs arrêtés avant le 25 avril de l'année suivante, avec régularisation de la différence sur la déclaration correspondante.

**Régularisations des immobilisations** (ann. II art. 207) : si le coefficient de déduction d'une année de la période de régularisation varie de plus de 10 points par rapport au coefficient initial (définitif de l'année d'acquisition), une régularisation annuelle est opérée : TVA initiale × (coefficient de l'année − coefficient initial) / 5 pour un bien meuble (période de 5 ans, année d'acquisition comprise), / 20 pour un immeuble. Résultat négatif = reversement, positif = complément de déduction. Une **régularisation globale** intervient aussi pour les années restantes en cas de cession du bien pendant la période (cession non soumise à TVA : reversement ; cession soumise à TVA d'un bien dont la déduction était partielle : complément).

**Recodification (ord. n° 2025-1247)** : à compter du 1er janvier 2027, ces règles sont reprises à droit constant dans le code des impositions sur les biens et services (ord. n° 2025-1247 du 17 décembre 2025) : les numéros du CGI cités ici changent, pas le fond.

**Formules clés :** coefficient de déduction = assujettissement × taxation × admission ; régularisation annuelle = TVA initiale × Δ coefficient / 5 (ou / 20)

## Exemple
La SA Lannion acquiert en N une machine grevée de 20 000 € de TVA, affectée à l'ensemble de son activité, dans le champ (assujettissement 1), avec un coefficient de taxation définitif de 0,80 pour N et un coefficient d'admission de 1. TVA déduite en N : 20 000 × 1 × 0,80 × 1 = 16 000 €.
En N+1 le coefficient de déduction est de 0,74 (écart de 6 points : aucune régularisation). En N+2 il tombe à 0,65 : écart de 15 points > 10, régularisation = 20 000 × (0,65 − 0,80) / 5 = −600 €, soit **600 € à reverser** sur la déclaration déposée avant le 25 avril N+3.

## Erreurs fréquentes
- Comparer le coefficient de l'année au coefficient de l'année précédente : la référence est le coefficient initial (définitif de l'année d'acquisition).
- Oublier de diviser par 5 (ou 20) : la régularisation ne porte que sur une année de la période, pas sur la totalité de la TVA.
- N'appliquer qu'un seul coefficient (assujettissement ou taxation) alors que les trois se multiplient.
- Déduire la TVA sur un véhicule de tourisme ou sur des billets de train pour le personnel : coefficient d'admission nul ; le véhicule utilitaire, lui, ouvre droit à déduction intégrale.

## À retenir
- Le gazole et l'essence des véhicules de tourisme sont déductibles à 80 % (100 % pour les utilitaires) ; le véhicule de tourisme lui-même est exclu.
- La variation de plus de 10 points se mesure par rapport au coefficient initial, pas par rapport à l'année précédente.
- Le crédit de TVA d'une période s'impute sur les périodes suivantes (44567) ou fait l'objet d'un remboursement.

**Notions liées :** [TVA : territorialité et opérations internationales](/cours/tva-operations-internationales) · [Immobilisations en PCG](/cours/immobilisations-pcg) · [Cycle impôts et taxes : risques d'audit](/cours/impots-taxes-risques)
