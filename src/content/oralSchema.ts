/** Schéma Zod des sujets d'oral (validateur et tests ; l'application lit le JSON déjà validé). */
import { z } from '../lib/zod'

const text = () => z.string().refine((s) => s.trim().length > 0, { message: 'Le texte ne doit pas être vide' })

export const oralTopicSchema = z.object({
  id: z.string().regex(/^ue6-oral-\d{4}$/, { message: 'Identifiant attendu : ue6-oral-0001' }),
  theme: text(),
  notions: z.array(text()).min(1),
  title: text(),
  document: text().refine((s) => s.split(/\s+/).length >= 120 && s.split(/\s+/).length <= 450, {
    message: 'Le document doit compter entre 120 et 450 mots',
  }),
  task: text(),
  outline: z.array(text()).min(3).max(7),
  vocabulary: z.array(z.object({ term: text(), translation: text() })).min(4).max(12),
  jury_questions: z.array(text()).min(3).max(6),
  verified: z.boolean(),
})

export const oralFileSchema = z.object({ topics: z.array(oralTopicSchema) })
