/**
 * Zod configuré sans compilation des schémas par `new Function` : compatible avec la politique de sécurité
 * du contenu (pas de 'unsafe-eval'), sans alerte du navigateur. Les modules de schémas importent `z` d'ici.
 */
import { z } from 'zod'

z.config({ jitless: true })

export { z }
