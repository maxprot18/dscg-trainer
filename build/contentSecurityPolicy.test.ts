import { createHash } from 'node:crypto'
import { describe, expect, it } from 'vitest'

import { buildPolicy, inlineScriptHashes } from './contentSecurityPolicy.ts'

describe('politique de sécurité du contenu', () => {
  const html = '<head><script>\n  var a = 1\n</script><script type="module" src="/x.js"></script></head>'

  it('calcule l’empreinte des seuls scripts en ligne', () => {
    const expected = createHash('sha256').update('\n  var a = 1\n', 'utf8').digest('base64')
    expect(inlineScriptHashes(html)).toEqual([`'sha256-${expected}'`])
  })

  it('interdit les scripts externes, les objets et les formulaires', () => {
    const policy = buildPolicy(html)
    expect(policy).toContain("default-src 'self'")
    expect(policy).toMatch(/script-src 'self' 'sha256-/)
    expect(policy).toContain("object-src 'none'")
    expect(policy).not.toContain('unsafe-eval')
  })
})
