# Efficience des marchés et finance comportementale

**Références :** hypothèse d'efficience des marchés (Fama, 1970) ; finance comportementale (Kahneman et Tversky, théorie des perspectives, 1979) ; effet de disposition (Shefrin et Statman, 1985)

**Enjeu :** l'efficience fonde toute la finance de marché (MEDAF, évaluation par les flux, inutilité du market timing) ; à l'examen, on demande de qualifier la forme d'efficience à partir d'une étude d'événement ou de nommer le biais comportemental illustré par un cas.

Un marché est **efficient** si les prix reflètent à tout instant l'information disponible : aucun investisseur ne peut obtenir durablement une rentabilité anormale (ajustée du risque) à partir de cette information. Le prix n'est pas « juste » au sens absolu : il est la meilleure estimation possible compte tenu de ce que l'on sait, et il ne bouge qu'à l'arrivée d'une information nouvelle, par nature imprévisible.

- **Forme faible** : les cours reflètent l'information contenue dans les prix passés ; l'analyse technique (chartisme) ne permet pas de battre le marché. Test : absence d'autocorrélation des rentabilités (marche aléatoire).
- **Forme semi-forte** : les cours reflètent toute l'information publique (comptes, annonces, communiqués) ; l'analyse fondamentale ne procure pas de rentabilité anormale durable, puisque tout le monde dispose des mêmes données. Test : **études d'événements**.
- **Forme forte** : les cours reflètent aussi l'information privée ; même un initié ne gagnerait pas. Elle n'est pas vérifiée (les initiés gagnent), d'où l'interdiction des opérations d'initiés.

**Étude d'événement** : rentabilité anormale RA_t = R_t − (α + β × R_M,t), le modèle de marché étant estimé sur une période antérieure à l'événement ; rentabilité anormale cumulée RAC = Σ RA_t sur la fenêtre. Un ajustement rapide et complet le jour de l'annonce est compatible avec l'efficience semi-forte ; une dérive après l'annonce (sous-réaction) ou une réaction avant l'annonce (fuite) la met en défaut.

**Finance comportementale** : les investisseurs ne sont pas toujours rationnels et les limites de l'arbitrage (coûts, risque, horizon des arbitragistes) empêchent de corriger tous les écarts.
- Excès de confiance (trop de transactions), biais d'ancrage (fixation sur un prix de référence), biais de disponibilité (surpondérer l'information récente ou frappante), comportement mimétique (bulles puis krachs).
- Aversion aux pertes (théorie des perspectives : une perte pèse environ deux fois plus qu'un gain de même montant) et **effet de disposition** : vendre trop tôt les titres gagnants, conserver trop longtemps les perdants.
- Anomalies observées : effet taille, effet momentum, sur-réaction puis retournement à long terme, effet calendaire.

**Formules clés :** RA_t = R_t − (α + β R_M,t) ; RAC = Σ RA_t

## Exemple
Modèle de marché estimé pour l'action Nerval : α = 0,1 % par jour, β = 1,2. Autour de l'annonce d'un contrat majeur (jour J), on observe : J−2 : R = 0,3 %, R_M = 0,4 % ; J−1 : 0,6 % et 0,2 % ; J : 4,3 % et 0,5 % ; J+1 : 0,2 % et 0,1 % ; J+2 : −0,1 % et 0 %.
RA_J = 4,3 − (0,1 + 1,2 × 0,5) = 3,6 % ; les autres jours : −0,28 %, +0,26 %, −0,02 %, −0,20 %, soit une RAC de 3,36 % sur la fenêtre [J−2 ; J+2].
Lecture : la rentabilité anormale est concentrée le jour J, sans dérive ensuite ni réaction notable avant : l'ajustement est rapide et complet, ce qui est compatible avec l'efficience semi-forte et n'indique pas de fuite d'information.

## Erreurs fréquentes
- Conclure à la forme forte parce que les cours s'ajustent dès la publication : l'étude d'événement teste la réaction à une information **publique**, donc la forme semi-forte.
- Penser qu'un analyste travaillant finement les comptes publiés bat durablement le marché sous l'efficience semi-forte : il ne fait qu'exploiter une information déjà intégrée dans les prix.
- Confondre effet de disposition et mimétisme : garder un titre perdant « pour ne pas réaliser la perte » relève de l'aversion aux pertes, pas de l'imitation des autres investisseurs.
- Croire qu'efficience signifie prix stables ou prévisibles : au contraire, des prix qui intègrent toute l'information varient de façon imprévisible.

## À retenir
- Efficience ne veut pas dire prix « justes » ni prévisibles : les variations futures sont imprévisibles.
- Chaque forme inclut la précédente (forte ⇒ semi-forte ⇒ faible).
- Une rentabilité anormale avant l'annonce publique suggère une fuite d'information privilégiée ; une dérive après l'annonce suggère une sous-réaction.
- Les biais comportementaux expliquent les anomalies ; ils ne permettent pas pour autant de les exploiter sans risque.

**Notions liées :** [Théorie du portefeuille et MEDAF](/cours/theorie-portefeuille-medaf) · [Organisation des marchés et régulation](/cours/organisation-marches-regulation) · [Introduction en bourse](/cours/introduction-bourse)
