# Trésorerie — pièges classiques

**Références :** NEP 505 (confirmations externes) ; NEP 240 (fraude) ; C. com. art. L123-19 (non-compensation) et L821-10 (révélation des faits délictueux) ; PCG art. 420-7 (liquidités en devises, règl. ANC 2014-03) ; PCG comptes 5124, 58, 666, 766, 451, 455

**Enjeu :** la trésorerie paraît simple à auditer, mais l'examen y place des pièges de présentation (compensation, devises, cash pooling) et de césure (chèques conservés, encaissements rattachés à tort) qui modifient les ratios sans toujours toucher le résultat.

- **Disponibilités en devises** : converties au cours de clôture, l'écart est porté directement en résultat financier (666 perte, 766 gain), **gains latents compris**. Contrairement aux créances et dettes en devises, on n'utilise ni les écarts de conversion 476 / 477 ni la provision pour perte de change : la liquidité est immédiatement réalisable, le gain n'est donc pas « latent » au sens du principe de prudence.
- **Compensation** : un découvert dans une banque ne se compense pas avec un solde positif dans une autre (L123-19) ; le découvert figure au passif en emprunts et dettes auprès des établissements de crédit, non en dettes fournisseurs.
- **Chèques émis mais conservés** : chèques comptabilisés au 31/12 et remis aux fournisseurs en N+1 ; disponibilités et dettes fournisseurs sont minorées du même montant, le résultat est inchangé mais le ratio de liquidité est amélioré. Indice : délai anormal entre la date d'émission et le débit en banque.
- **Encaissements de N+1 rattachés à N** : journal de banque maintenu ouvert ; trésorerie surévaluée et créances minorées. Indice : remises du 31/12 créditées tardivement ou partiellement sur le relevé de janvier.
- **Virements internes et cavalerie** : un compte 58 non soldé, ou un virement enregistré à l'arrivée sans la sortie, fausse la trésorerie ; rapprocher les dates de débit et de crédit sur les deux relevés.
- **Fonds indisponibles** : compte nanti, séquestre, dépôt de garantie bloqué → information en annexe (engagements donnés) ; ils restent en disponibilités mais ne sont pas librement utilisables.
- **Comptes courants de trésorerie de groupe (cash pooling)** : créance ou dette envers une entité liée (451 / 455), jamais une disponibilité, même si le solde est remboursable à vue.
- **Suspens « divers »** : jamais validés globalement ; un suspens côté comptabilité non dénoué peut masquer un détournement.
- **Confirmation** : demandée et reçue par l'auditeur (NEP 505) ; un relevé ou une attestation fournis par l'entité peuvent être falsifiés.
- **Révélation des faits délictueux** : obligation du Code de commerce envers le procureur de la République, distincte de la démarche de la NEP 240.

```diagram
{"type":"tree","title":"Ce solde bancaire est-il une disponibilité et comment le présenter ?","root":{"label":"Solde au 31/12 sur un compte","children":[{"edge":"compte courant de groupe","label":"451 / 455 : créance ou dette liée","note":"Pas une disponibilité"},{"edge":"découvert","label":"Passif : dettes auprès des établissements de crédit","note":"Aucune compensation entre banques"},{"edge":"en devises","label":"Convertir au cours de clôture","note":"Écart en 666 ou 766, gain compris"},{"edge":"nanti ou bloqué","label":"Disponibilité + annexe","note":"Engagement donné"}]}}
```

**Formules clés :** écart de change = solde en devises / cours de clôture (devises pour 1 €) − contre-valeur comptable en euros ; ratio de liquidité générale = actif circulant / dettes à court terme

## Exemple
Au 31/12/N : compte en dollars de 150 000 USD inscrit pour 140 000 € (cours de clôture 1 € = 1,08 USD) ; chèques fournisseurs de 60 000 € comptabilisés le 30/12 et conservés au coffre jusqu'au 10/01/N+1. Avant correction : actif circulant 900 000 €, dettes à court terme 600 000 €.
Devises : 150 000 / 1,08 = 138 888,89 € ; perte de change de **1 111,11 €** (débit 666, crédit 5124), sans écart de conversion. Chèques : réintégration de 60 000 € en disponibilités et en dettes fournisseurs ; le résultat ne bouge pas, mais le ratio de liquidité passe de 900 000 / 600 000 = 1,50 à 960 000 / 660 000 = **1,45**.

## Erreurs fréquentes
- Présenter la trésorerie nette (solde positif − découvert) sur une seule ligne : la compensation est interdite, le découvert est une dette financière au passif.
- Ne constater que la perte de change sur un compte en devises, par prudence : pour les disponibilités, gains et pertes passent tous deux en résultat.
- Croire que des chèques conservés minorent le résultat : ils minorent l'actif et le passif du même montant ; seul le ratio de liquidité est faussé.
- Classer le solde du compte courant de cash pooling en disponibilités : c'est une créance (451) sur la centralisatrice, à présenter comme telle.

## À retenir
- Disponibilités en devises : gains et pertes latents en résultat, sans 476 / 477.
- Un même montant qui minore actif et passif laisse le résultat inchangé mais modifie les ratios.
- Le compte 58 doit être soldé à la clôture ; un solde résiduel est un indice de virement non dénoué ou de cavalerie.

**Notions liées :** [Trésorerie — procédures substantives](/cours/tresorerie-procedures-substantives) · [Opérations en devises en PCG](/cours/operations-devises-pcg) · [Cash pooling](/cours/cash-pooling-centralisation) · [Révélation des faits délictueux et alerte](/cours/revelation-faits-delictueux-alerte)
