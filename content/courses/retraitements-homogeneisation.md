# Retraitements d'homogénéisation des comptes individuels

**Références :** règl. ANC 2020-01 art. 271-5 (homogénéité), 272-1 (écritures fiscales), 272-2 (crédit-bail) et 272-7 à 272-14 (impôts différés) ; C. com. L233-22 ; IFRS 10 §19 et §B87 ; IAS 12 (règl. UE 2023/1803)

**Enjeu :** les comptes individuels obéissent à des règles nationales et fiscales ; la consolidation les ramène à une méthode unique de groupe, et l'examen note surtout le partage réserves / résultat et l'impôt différé attaché à chaque retraitement.

Les comptes consolidés sont établis selon des méthodes homogènes au sein du groupe : les comptes individuels sont retraités avant cumul lorsque leurs méthodes diffèrent de celles du groupe, sauf incidence non significative. Les méthodes du groupe sont celles de la consolidante, qui peut retenir des options différentes de ses propres comptes sociaux.

**Principaux retraitements** :
- **Homogénéisation des méthodes** : durées et modes d'amortissement, évaluation des stocks (FIFO ou coût moyen pondéré), provisions, conversion des créances et dettes en devises, engagements de retraite comptabilisés ou non.
- **Élimination des écritures d'origine fiscale** : amortissements dérogatoires et provisions réglementées (hausse des prix, etc.) sont éliminés car ils ne traduisent aucune réalité économique (contrepartie : réserves pour l'antérieur, résultat pour le mouvement de l'exercice) ; l'impact d'un changement de méthode passé en résultat dans les comptes individuels est reclassé en report à nouveau d'ouverture.
- **Contrats de crédit-bail et assimilés** (transfert de propriété hautement probable, durée couvrant l'essentiel de la vie du bien ou valeur actualisée des paiements proche de sa valeur vénale) : le bien figure à l'actif et la dette à l'emprunt chez le preneur ; la redevance est remplacée par une dotation aux amortissements et une charge d'intérêts. Méthode préférentielle sous le règl. CRC 99-02, ce retraitement est obligatoire depuis le règl. ANC 2020-01, qui supprime les méthodes préférentielles propres au consolidé.
- **Impôts différés** : chaque retraitement qui crée un écart entre valeur consolidée et base fiscale entraîne un impôt différé (taux applicable au moment du dénouement) ; la fiscalité différée est obligatoire en consolidation alors qu'elle est absente des comptes sociaux.

```diagram
{"type":"flow","title":"Place des retraitements dans le processus de consolidation","steps":[{"label":"Comptes individuels","note":"PCG, options fiscales propres à chaque entité"},{"label":"Retraitements d'homogénéisation","note":"Méthodes de groupe, écritures fiscales annulées, crédit-bail, impôts différés"},{"label":"Cumul des comptes","note":"100 % en IG, quote-part en IP"},{"label":"Éliminations intra-groupe","note":"Opérations réciproques, résultats internes"},{"label":"Élimination des titres et partage","note":"Écart d'acquisition, réserves, intérêts minoritaires"},{"label":"États consolidés","note":"Bilan, résultat, flux, annexe"}]}
```

**Formules clés :** impact sur les capitaux propres = retraitement brut × (1 − t) ; dette de location en fin d'année = dette initiale − (redevance − intérêts)

## Exemple
Une filiale intégrée globalement présente au 31/12/N des amortissements dérogatoires de 17 000 €, dont 5 000 € dotés en N (solde au 1/1/N : 12 000 €). Taux d'impôt : 25 %.
Élimination : les 17 000 € de provision réglementée sont annulés ; part des exercices antérieurs : réserves + 12 000 × 0,75 = **9 000 €** ; part de l'exercice : résultat + 5 000 × 0,75 = **3 750 €** ; impôt différé passif = 17 000 × 0,25 = **4 250 €** (9 000 + 3 750 + 4 250 = 17 000).
Écriture de bilan : débit Amortissements dérogatoires 17 000 ; crédit Réserves 9 000, Résultat 3 750, Impôt différé passif 4 250. Au compte de résultat : débit Résultat 3 750 et Charge d'impôt différé 1 250 ; crédit Dotation aux amortissements dérogatoires 5 000.

## Erreurs fréquentes
- Maintenir les amortissements dérogatoires « parce qu'ils sont dans les capitaux propres » : en consolidation ils sont éliminés en totalité.
- Éliminer sans impôt différé « puisque l'impôt a déjà été payé » : la déduction fiscale obtenue se reversera, d'où un impôt différé passif.
- Traiter le retraitement du crédit-bail comme une option ou le réserver aux contrats longs : il est obligatoire pour tout contrat de location-financement (ANC 2020-01).
- Porter tout le retraitement d'un solde de bilan en résultat : seul le mouvement de l'exercice y passe, l'antérieur va en réserves.

## À retenir
- Retraitement d'un solde de bilan : séparer la part des exercices antérieurs (réserves) et celle de l'exercice (résultat).
- Une reprise d'amortissement dérogatoire éliminée diminue le résultat consolidé ; une dotation éliminée l'augmente.
- Crédit-bail : l'impact sur le résultat est l'écart entre (dotation + intérêts) et la redevance.
- Ne pas oublier l'impôt différé sur chaque retraitement.

**Notions liées :** [Impôts différés en consolidation](/cours/impots-differes-consolidation) · [Éliminations des opérations intra-groupe](/cours/eliminations-operations-intra-groupe) · [IFRS 16 — Contrats de location](/cours/ifrs-16-contrats-location) · [Amortissements et dépréciations en PCG](/cours/amortissements-depreciations-pcg)
