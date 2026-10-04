# Immobilisations — pièges classiques

**Références :** PCG art. 213-1 s. (coût d'entrée), art. 214-9 (composants), art. 214-15 s. (dépréciation) ; NEP 330 ; NEP 540

**Enjeu :** les anomalies du cycle tiennent moins à des erreurs de calcul qu'à des règles mal appliquées (frais incorporés à tort, terrain amorti, composant passé en entretien, dépréciation calculée sur la seule valeur vénale) ; ce sont les distracteurs favoris des QCM et des cas d'audit.

- **Frais exclus du coût** : formation du personnel, publicité et lancement, frais administratifs généraux, pertes opérationnelles initiales sont des charges ; à l'inverse, transport, installation, montage et essais de bon fonctionnement s'incorporent au coût.
- **Terrain amorti** : un terrain ne s'amortit pas (durée d'utilisation non limitée, hors terrains de gisement) ; le prix d'un immeuble doit être ventilé entre terrain et construction, seule la construction étant amortie.
- **Date de départ** : l'amortissement commence à la mise en service, pas à la commande ni à la facture ni à la livraison ; une immobilisation en cours (23) ne s'amortit pas.
- **Remplacement d'un composant** (toiture, moteur, révision majeure) : le nouveau composant s'immobilise et l'ancien sort de l'actif (sortie de sa VNC) ; le passer en entretien sous-évalue l'actif et le résultat.
- **Mise au rebut oubliée** : même totalement amorti, le bien doit être sorti (brut et amortissements) ; sinon le brut et les amortissements sont surévalués du même montant, sans effet sur le résultat mais avec une information fausse en annexe.
- **Crédit-bail** : dans les comptes sociaux, le bien n'est pas inscrit à l'actif du preneur ; les redevances sont des charges et les engagements figurent en annexe (le retraitement n'existe qu'en consolidation).
- **Dépréciation** : comparer la VNC à la valeur actuelle, la plus élevée de la valeur vénale nette et de la valeur d'usage ; retenir la seule valeur vénale peut surestimer la dépréciation. Après dépréciation, le plan d'amortissement est révisé sur la durée résiduelle à partir de la nouvelle VNC.

```diagram
{"type":"tree","title":"Faut-il déprécier l'immobilisation à la clôture ?","root":{"label":"Indice de perte de valeur ?","children":[{"edge":"non","label":"Pas de test","note":"Plan d'amortissement inchangé"},{"edge":"oui","label":"Valeur actuelle = max(vénale nette ; usage)","children":[{"edge":"VNC ≤ valeur actuelle","label":"Aucune dépréciation"},{"edge":"VNC > valeur actuelle","label":"Dépréciation = VNC − valeur actuelle","note":"Plan révisé sur la durée résiduelle"}]}]}}
```

**Formules clés :** valeur actuelle = max(valeur vénale nette des coûts de sortie ; valeur d'usage) ; dépréciation = max(0 ; VNC − valeur actuelle)

## Exemple
Castor a acquis une machine 300 000 € le 01/01/N−3, amortie en linéaire sur 8 ans. Fin N, la perte d'un client en réduit l'utilisation de moitié (indice). Valeur vénale 110 000 €, coûts de sortie 5 000 € ; flux nets attendus 32 000 € par an pendant 4 ans (fin d'année), taux 8 %.
VNC au 31/12/N = 300 000 − 4 × 37 500 = 150 000 €. Valeur vénale nette = 105 000 €. Valeur d'usage = 32 000 × (1 − 1,08⁻⁴) / 0,08 ≈ 105 988 €. Valeur actuelle = 105 988 € → dépréciation = 150 000 − 105 988 ≈ **44 012 €** (débit 6816, crédit 2915). Retenir la seule valeur vénale nette aurait donné 45 000 €. Nouvelle annuité à partir de N+1 : 105 988 / 4 ≈ 26 497 €.

## Erreurs fréquentes
- Incorporer au coût d'entrée la formation des opérateurs, la campagne de lancement ou les pertes de montée en cadence : ce sont des charges ; seuls les coûts directement attribuables (installation, essais) entrent au coût.
- Juger anormal qu'un bien en crédit-bail soit absent de l'actif des comptes sociaux : c'est le traitement correct ; l'anomalie serait l'absence d'information en annexe.
- Négliger la sortie d'un bien totalement amorti « puisque la VNC est nulle » : le bilan et le tableau des immobilisations restent faux.
- Déprécier sur la base de la seule valeur vénale sans examiner la valeur d'usage, ou oublier de réviser le plan d'amortissement après dépréciation.

## À retenir
- Une correction « charge → immobilisation » s'accompagne d'une dotation prorata temporis.
- Une sortie de bien totalement amorti n'a pas d'effet sur le résultat mais corrige le bilan.
- Le compte de résultat ne doit pas porter de dotation sur un terrain ni sur un bien encore en cours.

**Notions liées :** [Immobilisations en PCG](/cours/immobilisations-pcg) · [Amortissements et dépréciations en PCG](/cours/amortissements-depreciations-pcg) · [IAS 36 — Dépréciation d'actifs](/cours/ias-36-depreciation-actifs) · [Immobilisations — risques](/cours/immobilisations-risques)
