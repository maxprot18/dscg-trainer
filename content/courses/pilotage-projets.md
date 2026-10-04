# Pilotage des projets : planification, coûts, risques

**Références :** programme DSCG UE3 (arrêté du 4 août 2025) ; norme ISO 21502:2020 (management de projet) ; PMI, PMBOK (méthode de la valeur acquise)

**Enjeu :** planifier un projet (durée minimale, marges) puis suivre son avancement en séparant l'effet coût de l'effet délai ; à l'examen, on calcule un chemin critique et les indicateurs de la valeur acquise (CPI, SPI, estimation à terminaison).

Un **projet** est un ensemble d'activités unique, temporaire, orienté vers un objectif, sous contraintes de coût, de délai et de qualité (triangle coût-délai-qualité : agir sur l'une déplace les autres). Le maître d'ouvrage exprime le besoin et finance ; le maître d'œuvre réalise ; un comité de pilotage arbitre aux jalons.

**Planification** :
- découpage en tâches (organigramme des tâches, WBS), estimation des durées et des charges (jours-hommes) ;
- réseau PERT : antériorités entre tâches ; dates au plus tôt (passage aller : on retient le maximum des fins des tâches antérieures) et au plus tard (passage retour : on retient le minimum) ;
- **chemin critique** : suite des tâches de marge totale nulle ; sa durée est la durée minimale du projet et tout retard sur l'une de ses tâches décale la fin ;
- marge totale = date au plus tard − date au plus tôt d'une tâche (retard possible sans décaler la fin du projet) ; marge libre = retard possible sans décaler le début au plus tôt des tâches suivantes ;
- diagramme de Gantt : représentation calendaire des tâches, des jalons et de la charge des ressources.

**Suivi par la valeur acquise** (à une date donnée) : VP = valeur planifiée (budget du travail prévu à cette date) ; VA = valeur acquise (budget du travail réellement réalisé = % d'avancement physique × budget à l'achèvement BAC) ; CR = coût réel du travail réalisé.
- écart de coût = VA − CR (négatif : surcoût) ; écart de délai = VA − VP (exprimé en euros ; négatif : retard) ;
- CPI = VA ÷ CR (< 1 : surcoût) ; SPI = VA ÷ VP (< 1 : retard) ;
- estimation à terminaison EAC = BAC ÷ CPI si la performance de coût observée se maintient ; reste à faire = EAC − CR ; écart à terminaison = BAC − EAC.

**Risques projet** : identification, évaluation (probabilité × impact), réponses (éviter, réduire, transférer, accepter), provision pour aléas dans le budget, revues de jalons et plan de secours pour les risques majeurs.

**Formules clés :** CPI = VA ÷ CR ; SPI = VA ÷ VP ; EAC = BAC ÷ CPI ; marge totale = au plus tard − au plus tôt

## Exemple
Refonte d'un site de vente en ligne : BAC 480 000 €. À la fin du sixième mois, VP = 260 000 €, avancement physique 50 %, CR = 300 000 €. VA = 50 % × 480 000 = 240 000 €. Écart de coût = 240 000 − 300 000 = −60 000 € ; CPI = 240 000 ÷ 300 000 = 0,80 (chaque euro dépensé ne produit que 0,80 € de travail). Écart de délai = 240 000 − 260 000 = −20 000 € ; SPI = 240 000 ÷ 260 000 ≈ 0,923 : léger retard. Si la performance de coût se maintient : EAC = 480 000 ÷ 0,80 = 600 000 €, reste à faire = 600 000 − 300 000 = 300 000 €, écart à terminaison = 480 000 − 600 000 = −120 000 €.
À l'inverse, avec VP = 500 000 €, VA = 450 000 € et CR = 420 000 €, le projet est en retard (SPI = 0,90) mais le travail réalisé a coûté moins que prévu (CPI ≈ 1,07).

## Erreurs fréquentes
- Définir le chemin critique par les tâches les plus coûteuses, les plus risquées ou les plus consommatrices de ressources : c'est la suite des tâches de marge totale nulle, la plus longue du réseau.
- Lire VA > CR comme une avance sur le planning : c'est une performance de coût favorable ; le délai se lit en comparant VA et VP.
- Valoriser la VA au coût réel : elle se valorise toujours au coût budgété (% d'avancement × BAC).
- Conclure sur le seul écart CR − VP : il mélange effet coût et effet délai ; il faut passer par la VA.

## À retenir
- La VA est toujours valorisée au coût budgété, jamais au coût réel.
- CPI pour le coût, SPI pour le délai ; EAC = BAC ÷ CPI prolonge la performance de coût observée.
- Un retard sur une tâche non critique est sans effet sur la fin du projet tant qu'il reste inférieur à sa marge totale ; raccourcir une tâche hors du chemin critique ne raccourcit pas le projet.

**Notions liées :** [Gestion des projets SI](/cours/gestion-projets-si) · [Gestion des risques et contrôle interne](/cours/gestion-risques-controle-interne) · [Pilotage des processus : ABC, coûts cibles, qualité](/cours/pilotage-processus-abc) · [Gestion prévisionnelle et budgets](/cours/gestion-previsionnelle-budgets)
