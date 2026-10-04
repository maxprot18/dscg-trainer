# Achats-fournisseurs — contrôles clés

**Références :** NEP 315 (compréhension du contrôle interne) ; NEP 330 (tests de procédures) ; NEP 265 (communication des faiblesses du contrôle interne)

**Enjeu :** le cas d’audit décrit une organisation des achats et demande d’en relever les faiblesses, de dire quel risque chacune crée et quelle conséquence le CAC en tire sur ses travaux.

Le cycle suit la chaîne besoin → commande → réception → facture → comptabilisation → paiement. Un contrôle clé par étape, chacun rattaché à une assertion :
- **Commande** : bon de commande autorisé selon des délégations de signature, fournisseurs référencés après mise en concurrence (réalité, mesure).
- **Réception** : bons de réception prénumérotés, établis par le magasin, indépendant des acheteurs ; suivi des réceptions non encore facturées, qui sert de base au 408 (exhaustivité, séparation).
- **Facture** : rapprochement à trois (commande / réception / facture : quantités, prix, conditions) avant le bon à payer ; contrôle arithmétique (réalité, mesure).
- **Fichier fournisseurs** : création et modification des fournisseurs et des RIB réservées à une personne qui ne paie pas ; changement de RIB confirmé par contre-appel au numéro déjà connu du fournisseur ; revue du journal des modifications (prévention du détournement).
- **Paiement** : règlement sur facture approuvée uniquement, double signature au-delà d’un seuil, mention « payé » ou blocage informatique de la facture réglée (doubles paiements).
- **Comptabilisation** : rapprochement auxiliaire / collectif 401, rapprochement des relevés fournisseurs, revue des soldes débiteurs (exhaustivité, existence).

```diagram
{"type":"flow","title":"Cycle achats : un contrôle clé par étape","steps":[{"label":"Commande","note":"autorisée selon délégations"},{"label":"Réception","note":"BR prénumérotés par le magasin, indépendant des acheteurs"},{"label":"Facture","note":"rapprochement à trois avant bon à payer"},{"label":"Fichier fournisseurs","note":"RIB modifié par qui ne paie pas, contre-appel"},{"label":"Paiement","note":"double signature ; facture bloquée après règlement"},{"label":"Comptabilisation","note":"auxiliaire ↔ 401 ; relevés fournisseurs"}]}
```

**Séparation des tâches :** commande, réception, comptabilisation, gestion du fichier fournisseurs et paiement sont des fonctions incompatibles. Le cumul le plus dangereux est modifier les RIB et préparer les virements : le paiement d’un vrai fournisseur peut être redirigé.

**Tests de procédures (NEP 330) :** si le CAC s’appuie sur un contrôle, il teste son fonctionnement sur toute la période (inspection des bons à payer visés, réexécution d’un rapprochement, observation). Il compare le taux de déviation observé au taux de déviation tolérable ; s’il le dépasse, il ne s’appuie pas sur le contrôle et étend ses procédures substantives. Une faiblesse significative est communiquée par écrit à la direction et à la gouvernance (NEP 265).

**Formules clés :** taux de déviation observé = nombre d’écarts / taille de l’échantillon

## Exemple
Le CAC veut s’appuyer sur le rapprochement à trois pour réduire ses tests sur la réalité des achats. Il sélectionne 50 bons à payer de l’exercice, avec un taux de déviation tolérable de 5 %. Trois factures ont été payées sans bon de réception rapproché.
Taux observé = 3 / 50 = **6 %** > 5 % : le contrôle n’est pas jugé efficace. Conséquences : aucun allègement des procédures substantives, extension du test de réalité des achats (factures → commande, réception) et du contrôle des soldes débiteurs ; la faiblesse est communiquée à la direction (NEP 265). Les trois factures elles-mêmes sont examinées : le défaut de contrôle n’est pas une anomalie, la facture indue, s’il y en a, l’est.

## Erreurs fréquentes
- Attendre du lettrage mensuel ou du contrôle arithmétique qu’ils empêchent le paiement de marchandises jamais reçues : seul le rapprochement facture / commande / réception, avant le bon à payer, le fait.
- Juger le cumul « commande + réception » plus dangereux que « RIB + virements » : le premier facilite des achats injustifiés au profit d’un vrai fournisseur, le second permet de détourner les fonds.
- Confondre le contrôle « facture bloquée après paiement » avec un contrôle d’exhaustivité : il prévient les doubles paiements (réalité des décaissements), qui se traduisent sinon par des soldes fournisseurs débiteurs.
- Conclure d’un contrôle défaillant qu’il existe une anomalie dans les comptes : il modifie seulement l’étendue des travaux ; l’anomalie éventuelle se prouve par les tests substantifs.

## À retenir
- Le rapprochement à trois couvre la réalité et la mesure ; le suivi des réceptions non facturées couvre l’exhaustivité.
- Un contrôle défaillant n’est pas une anomalie dans les comptes : il modifie l’étendue des travaux.
- Le changement de RIB est le point de contrôle le plus sensible du cycle.

**Notions liées :** [Ventes-clients — contrôles clés](/cours/ventes-clients-controles-cles) · [Évaluation du contrôle interne](/cours/evaluation-controle-interne) · [Trésorerie — contrôles clés](/cours/tresorerie-controles-cles) · [Achats-fournisseurs — risques](/cours/achats-fournisseurs-risques)
