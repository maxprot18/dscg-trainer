# Évaluation du contrôle interne et communication des faiblesses

**Références :** NEP 315 et NEP 330 révisées (arrêté du 13 novembre 2024, exercices ouverts à compter du 19 novembre 2024 ; correspondance ISA 315 et ISA 330) ; NEP 265 « Communication des faiblesses du contrôle interne » (ISA 265) ; C. com., communications aux organes d'administration ou de surveillance (art. L. 821-63, ancien art. L. 823-16, renuméroté par l'ordonnance n° 2023-1142)

**Enjeu :** le contrôle interne de l'entité conditionne la confiance que le CAC peut accorder aux comptes et donc l'étendue de ses propres contrôles ; à l'examen, on attend de distinguer prise de connaissance et test d'efficacité, de qualifier une faiblesse (séparation des fonctions) et d'en tirer la conséquence sur les procédures de substance.

- Le contrôle interne est un processus mis en œuvre par la direction et le personnel pour fournir une assurance raisonnable sur la fiabilité de l'information financière, l'efficacité des opérations et le respect des textes. Il ne donne jamais une garantie absolue : collusion, contournement par la direction, erreur humaine, coût disproportionné d'un contrôle.
- Composantes (NEP 315 révisée) : environnement de contrôle ; processus d'évaluation par l'entité des risques liés à son activité ; processus de suivi (surveillance) du système de contrôle interne ; système d'information et communication relatifs à l'élaboration de l'information financière ; activités (procédures) de contrôle, dont les contrôles généraux informatiques. Le seuil de signification ou le plan de mission sont des outils du CAC, pas des composantes.
- Prise de connaissance obligatoire du contrôle interne pertinent pour l'audit : le CAC évalue la conception des contrôles et vérifie qu'ils ont été mis en œuvre (entretiens, observation, inspection, test de cheminement d'une opération de bout en bout). Cette étape sert à évaluer le risque lié au contrôle ; elle ne prouve pas que le contrôle a fonctionné toute l'année.
- Tests de procédures (NEP 330) : réalisés si le CAC prévoit de s'appuyer sur un contrôle pour réduire ses procédures de substance, ou si les procédures de substance seules ne suffisent pas (opérations nombreuses traitées automatiquement). Ils portent sur l'efficacité du contrôle pendant toute la période où le CAC s'appuie dessus (réexécution, inspection des visas, demandes d'information, observation).
- Contrôles clés : séparation des fonctions (autorisation, enregistrement, détention des actifs, contrôle), autorisations et seuils d'approbation, rapprochements (banque, fournisseurs, stocks), contrôles d'accès informatiques, inventaires physiques, revue par la hiérarchie.
- Faiblesse : contrôle absent, mal conçu ou qui ne fonctionne pas, de sorte qu'il ne prévient pas ou ne détecte et corrige pas une anomalie en temps voulu. Conséquence : risque lié au contrôle élevé, pas d'appui possible sur ce contrôle, procédures de substance étendues sur les assertions concernées.
- Communication (NEP 265) : le CAC communique, en temps utile et par écrit pour les plus importantes, les faiblesses relevées qu'il estime d'une importance suffisante à la direction et, le cas échéant, aux organes d'administration ou de surveillance et au comité d'audit. Ce n'est ni une opinion sur le contrôle interne ni un motif en soi de réserve : la réserve ne porte que sur les comptes.

**Formules clés :** taux d'écart d'un test de procédures = nombre d'écarts ÷ nombre d'éléments testés, comparé au taux d'écart tolérable

```diagram
{"type":"tree","title":"Du contrôle identifié à l'étendue des procédures de substance","root":{"label":"Le CAC prévoit-il de s'appuyer sur le contrôle ?","children":[{"edge":"non","label":"Procédures de substance seules","note":"Prise de connaissance et mise en œuvre vérifiées, pas de test d'efficacité"},{"edge":"oui","label":"Test de procédures sur la période","children":[{"edge":"taux d'écart ≤ tolérable","label":"Substance réduite, jamais supprimée"},{"edge":"taux d'écart > tolérable","label":"RC élevé : substance étendue","note":"Faiblesse communiquée (NEP 265)"}]}]}}
```

## Exemple
Chez Ambre SAS, chaque facture fournisseur doit être rapprochée du bon de réception et visée par le responsable achats avant comptabilisation. Le CAC prévoit de s'appuyer sur ce contrôle pour alléger ses tests sur les charges ; il fixe un taux d'écart tolérable de 5 % et sélectionne 40 factures sur l'exercice. Cas 1 : 1 facture sans visa, taux d'écart = 1 ÷ 40 = 2,5 % ≤ 5 % : le contrôle est jugé efficace, les procédures de substance sur les achats sont réduites (mais pas supprimées). Cas 2 : 3 factures sans visa (dont deux de la même période où le responsable était absent), taux = 3 ÷ 40 = 7,5 % > 5 % : le CAC ne s'appuie pas sur le contrôle, évalue le risque lié au contrôle à élevé, étend ses tests de détail sur les charges et la séparation des exercices, et communique la faiblesse à la direction (NEP 265).

## Erreurs fréquentes
- Conclure d'un test de cheminement que les contrôles « ont fonctionné efficacement toute l'année » : il confirme la compréhension du processus et la mise en œuvre, pas l'efficacité sur la période.
- Se dispenser de procédures de substance sur un poste significatif parce que les contrôles sont efficaces : la NEP 330 impose des procédures de substance pour chaque poste significatif.
- Tester sur échantillon un dispositif dont la faiblesse est évidente (une même personne encaisse, comptabilise et établit les avoirs) : on ne teste pas un contrôle que l'on sait défaillant, on étend la substance.
- Refuser de certifier au motif que le contrôle interne est défaillant : l'opinion porte sur les comptes ; une faiblesse se traduit par davantage de travaux et une communication, pas automatiquement par une réserve.

## À retenir
- Prise de connaissance (conception et mise en œuvre) ≠ test d'efficacité : un test de cheminement ne prouve pas que le contrôle a fonctionné toute l'année.
- Contrôle défaillant → risque lié au contrôle élevé → procédures de substance plus étendues ; on ne teste pas un contrôle que l'on sait défaillant.
- Le CAC ne recherche pas toutes les faiblesses ; il communique celles relevées au cours de l'audit.
- Les limites inhérentes (collusion, contournement par la direction) imposent toujours des procédures de substance sur les postes significatifs.

**Notions liées :** [Approche par les risques](/cours/approche-par-risques) · [Procédures en réponse aux risques évalués](/cours/reponses-risques-evalues) · [Communication avec la gouvernance](/cours/communication-gouvernance-rapport-complementaire) · [Gestion des risques et contrôle interne](/cours/gestion-risques-controle-interne)
