/**
 * Politique de sécurité du contenu (CSP) ajoutée au build de production. GitHub Pages ne permet pas
 * d'en-têtes HTTP : la politique passe par une balise <meta>. Les scripts en ligne de index.html (thème
 * appliqué avant le premier affichage) sont autorisés par leur empreinte SHA-256, calculée ici.
 * En développement, Vite injecte ses propres scripts : la politique n'est pas ajoutée.
 */
import { createHash } from 'node:crypto'
import type { Plugin } from 'vite'

export function inlineScriptHashes(html: string): string[] {
  return [...html.matchAll(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/g)].map(
    (m) => `'sha256-${createHash('sha256').update(m[1], 'utf8').digest('base64')}'`,
  )
}

export function buildPolicy(html: string): string {
  return [
    "default-src 'self'",
    `script-src 'self' ${inlineScriptHashes(html).join(' ')}`.trim(),
    // Les styles posés par React passent par le CSSOM ; 'unsafe-inline' couvre les attributs style des SVG.
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob:",
    // Enregistrement de l'oral : lecture et téléchargement d'un blob local.
    "media-src 'self' blob:",
    "connect-src 'self'",
    "worker-src 'self'",
    "manifest-src 'self'",
    "font-src 'self'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'none'",
  ].join('; ')
}

export function contentSecurityPolicy(): Plugin {
  return {
    name: 'dscg-content-security-policy',
    apply: 'build',
    transformIndexHtml: {
      order: 'post',
      handler(html) {
        const meta = `<meta http-equiv="Content-Security-Policy" content="${buildPolicy(html)}" />`
        return html.replace('<meta charset="UTF-8" />', `<meta charset="UTF-8" />\n    ${meta}`)
      },
    },
  }
}
