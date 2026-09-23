import type { MetadataRoute } from 'next'
import { locales } from '@/lib/i18n'
import { routes } from '@/lib/routes'
import { site } from '@/lib/site'

/**
 * Robots des assistants IA (recherche en direct et index), nommés
 * explicitement : l'intention d'être lu et cité reste lisible, et une règle
 * plus restrictive ajoutée un jour pour `*` ne les couperait pas par erreur.
 */
const aiCrawlers = [
  'GPTBot', // OpenAI
  'OAI-SearchBot', // ChatGPT Search
  'ChatGPT-User', // ChatGPT, lecture à la demande
  'ClaudeBot', // Anthropic
  'Claude-SearchBot', // Claude, recherche
  'Claude-User', // Claude, lecture à la demande
  'Google-Extended', // Gemini
  'PerplexityBot',
  'Perplexity-User',
  'Applebot-Extended', // Apple Intelligence
]

export default function robots(): MetadataRoute.Robots {
  /** Le suivi de dossier et la page de confirmation n'ont rien à faire dans l'index. */
  const disallow = [
    ...locales.map((locale) => routes.tracking[locale]),
    '/apply/success',
    '/fr/demande/succes',
    '/api/',
  ]

  return {
    rules: [
      { userAgent: '*', allow: '/', disallow },
      { userAgent: aiCrawlers, allow: '/', disallow },
    ],
    sitemap: `${site.url}/sitemap.xml`,
  }
}
