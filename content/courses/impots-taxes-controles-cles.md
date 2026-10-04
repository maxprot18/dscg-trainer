# Impôts et taxes — contrôles clés

**Références :** NEP 315 (contrôle interne pertinent pour l'audit) ; NEP 330 (procédures en réponse à l'évaluation des risques, tests de procédures) ; CGI art. 1668 (acomptes et solde d'IS) ; CGI art. 287 (déclarations de TVA)

**Enjeu :** le risque fiscal se prévient surtout en amont (calendrier, rapprochements avant dépôt, paramétrage) ; l'examen demande de distinguer un vrai contrôle clé (qui détecte ou prévient une anomalie) d'une simple commodité, et de savoir comment le CAC le teste pour s'appuyer dessus.

Le CAC identifie les contrôles qui préviennent ou détectent les anomalies du cycle, puis teste ceux sur lesquels il veut s'appuyer (NEP 330). Un contrôle n'est utile à l'audit que s'il laisse une trace (visa, écart expliqué, journal des modifications).

- **Calendrier fiscal** : recensement des échéances déclaratives et de paiement (acomptes d'IS, déclarations de TVA, taxes locales, liasse) avec un responsable par échéance ; contrôle préventif des retards et des pénalités.
- **Rapprochement mensuel TVA** : TVA collectée et déductible de la comptabilité rapprochées de la déclaration avant dépôt ; CA comptable rapproché du CA déclaré, écarts expliqués (exonérations, exigibilité à l'encaissement des prestations, acomptes reçus) ; revue et signature par une personne autre que le préparateur.
- **Séparation des tâches et approbation** : la personne qui prépare la déclaration n'est pas celle qui la valide ; validation documentée par un responsable avant dépôt et paiement.
- **Paramétrage du système** : codes et taux de TVA dans le logiciel de facturation, modifications réservées à des personnes habilitées et tracées (contrôles généraux informatiques : gestion des accès et des changements). Un contrôle automatisé ne vaut que si ces contrôles généraux sont efficaces sur tout l'exercice.
- **Calcul de l'IS** : liasse et tableau de passage du résultat comptable au résultat fiscal revus par un responsable ou un conseil ; suivi des déficits reportables et des crédits d'impôt.
- **Veille fiscale** : mise à jour des taux et règles, recours à un conseil pour les opérations inhabituelles.

```diagram
{"type":"timeline","title":"Échéances fiscales d'un exercice clos le 31/12 (régime réel normal)","items":[{"when":"15 mars","label":"1er acompte d'IS","note":"Sur N−2, régularisé au 2e acompte"},{"when":"entre le 15 et le 24","label":"CA3 mensuelle","note":"TVA du mois précédent, rapprochée avant dépôt"},{"when":"15 juin","label":"2e acompte d'IS","note":"Acompte de CFE (50 %) si CFE N−1 > 3 000 €"},{"when":"15 septembre","label":"3e acompte d'IS"},{"when":"15 décembre","label":"4e acompte d'IS","note":"Solde de CFE"},{"when":"début mai N+1","label":"Liasse fiscale","note":"Tableau de passage revu"},{"when":"15 mai N+1","label":"Solde d'IS","note":"Relevé de solde, régularisation du 444"}]}
```

**Test d'un contrôle :** demande d'informations + inspection des preuves d'exécution (rapprochements signés, écarts expliqués) + réexécution sur quelques mois répartis dans l'exercice ; un mois sans trace est un écart, qui remet en cause la confiance accordée au contrôle.

## Exemple
Le CAC teste le rapprochement mensuel TVA de la société Alkaïd sur les déclarations de mars, juillet et novembre N. Mars : TVA collectée comptable 212 400 €, déclarée 204 000 €, écart de 8 400 € annoté « régularisation » sans détail ni visa du responsable. Juillet et novembre : rapprochements à zéro, visés.
L'écart de mars correspond à 42 000 € HT de ventes non déclarées ; il n'a été ni expliqué ni revu, le contrôle n'a donc pas fonctionné ce mois-là. Conclusion : le contrôle n'est pas fiable sur toute la période ; le CAC élargit le cadrage annuel CA / TVA déclarée et vérifie si la régularisation a été portée sur une déclaration ultérieure (intérêts de retard éventuels).

## Erreurs fréquentes
- Prendre l'archivage des déclarations, le prélèvement automatique ou un courriel de rappel pour des contrôles clés de l'exactitude : seul le rapprochement revu avant dépôt détecte une erreur de montant.
- S'appuyer sur un contrôle automatisé de l'ERP en vérifiant les taux à la seule date de clôture : il faut couvrir les modifications et les accès au paramétrage sur tout l'exercice.
- Considérer qu'un progiciel reconnu dispense de tester le contrôle : la NEP 330 impose de tester l'efficacité du contrôle sur lequel on s'appuie.
- Confondre contrôle préventif (calendrier, qui évite le retard) et contrôle détectif (rapprochement, qui révèle l'erreur).

## À retenir
- Un contrôle non documenté ne peut pas être testé : le CAC ne s'appuie pas dessus et renforce ses procédures substantives.
- Une interruption du contrôle sur une partie de l'exercice limite la confiance à la période couverte.
- Un contrôle automatisé fiable suppose des contrôles généraux informatiques efficaces.

**Notions liées :** [Impôts et taxes — risques](/cours/impots-taxes-risques) · [Audit en environnement informatisé](/cours/audit-environnement-informatise) · [Évaluation du contrôle interne](/cours/evaluation-controle-interne) · [IS — taux et déficits](/cours/is-taux-deficits)
