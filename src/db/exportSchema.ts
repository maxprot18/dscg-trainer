/**
 * Validation d'un fichier de progression avant importation : un fichier malformé ou modifié à la main est
 * refusé avec un message clair au lieu d'être écrit tel quel dans la base (ce qui ferait planter les
 * statistiques). Chargé seulement par la page des réglages (Zod reste hors du fichier JS principal).
 */
import { z } from 'zod'

import type { ProgressExport } from './db'

/** Taille maximale acceptée (un an d'usage intensif tient dans quelques Mo). */
export const MAX_IMPORT_BYTES = 20 * 1024 * 1024

const id = z.string().min(1).max(200)
const time = z.number().finite().nonnegative()

const reviewState = z.object({
  notion: id,
  due: time,
  interval: z.number().finite().nonnegative(),
  ease: z.number().finite().positive(),
  repetitions: z.number().int().nonnegative(),
  lapses: z.number().int().nonnegative(),
  lastReview: time.optional(),
})

export const progressExportSchema = z.object({
  app: z.literal('dscg-trainer'),
  version: z.union([z.literal(1), z.literal(2)]),
  exportedAt: z.string(),
  attempts: z.array(
    z.object({
      id: z.number().int().positive().optional(),
      exerciseId: id,
      notion: id,
      date: time,
      answer: z.unknown(),
      correct: z.boolean(),
      score: z.number().min(0).max(1).optional(),
      durationMs: z.number().finite().nonnegative(),
      sessionId: z.number().int().positive().optional(),
    }),
  ),
  reviews: z.array(reviewState.extend({ prior: reviewState.optional() })),
  sessions: z.array(
    z.object({
      id: z.number().int().positive().optional(),
      mode: z.enum(['quick', 'theme', 'smart', 'exam', 'errors', 'cards', 'diagnostic', 'full']),
      startedAt: time,
      endedAt: time.optional(),
      scope: z.string().max(500).optional(),
      exerciseIds: z.array(id),
      search: z.string().max(2000).optional(),
    }),
  ),
  marks: z
    .array(
      z.object({
        id: z.number().int().positive().optional(),
        kind: z.enum(['bookmark', 'read']),
        target: id,
        date: time,
      }),
    )
    .optional(),
})

/** Lit et valide le texte d'un fichier exporté ; lève une erreur lisible sinon. */
export function parseProgressExport(text: string): ProgressExport {
  let raw: unknown
  try {
    raw = JSON.parse(text)
  } catch {
    throw new Error('ce fichier n’est pas un JSON valide')
  }
  const result = progressExportSchema.safeParse(raw)
  if (!result.success) {
    const issue = result.error.issues[0]
    const where = issue?.path.join('.') || 'racine'
    throw new Error(`fichier de progression non reconnu ou abîmé (${where} : ${issue?.message ?? 'format inattendu'})`)
  }
  return result.data as ProgressExport
}
