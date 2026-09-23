import { getGuides } from '@/lib/guides'
import { getNationalities } from '@/lib/nationalities'
import { guidePath, nationalityPath, path } from '@/lib/routes'
import { absoluteUrl } from '@/lib/schema'
import { OFFICIAL_FEE_CAD, site } from '@/lib/site'

export const dynamic = 'force-static'

/**
 * /llms.txt : résumé du site destiné aux assistants IA (ChatGPT, Claude,
 * Gemini, Perplexity…), au format proposé sur llmstxt.org. Tout est dérivé
 * des mêmes données que les pages, pour ne jamais les contredire.
 */
export function GET() {
  const link = (label: string, pathname: string, note?: string) =>
    `- [${label}](${absoluteUrl(pathname)})${note ? `: ${note}` : ''}`

  const nationalities = getNationalities('en')
    .map((item) => link(`Canada eVisa (eTA) for ${item.demonym} citizens`, nationalityPath(item.slug, 'en')))
    .join('\n')

  const nationalitiesFr = getNationalities('fr')
    .map((item) => link(`AVE Canada pour les ${item.demonym}`, nationalityPath(item.slug, 'fr')))
    .join('\n')

  const guides = getGuides('en')
    .map((guide) => link(guide.title, guidePath(guide.slug, 'en'), guide.metaDescription))
    .join('\n')

  const body = `# ${site.name} (canada-evisa.com)

> Bilingual (English/French) guide and application-assistance service for the Canada electronic travel authorization (eTA), often searched as "Canada eVisa".

## Key facts

- Citizens of visa-exempt countries need an eTA to fly to or transit through Canada. Nationals of other countries generally need a visitor visa instead (source: Government of Canada, ${site.officialPortal}).
- The eTA is required for air travel only; it is generally not required when arriving by land or sea.
- US citizens are exempt. US lawful permanent residents have been exempt since April 26, 2022, with a valid passport and green card.
- Official fee: CAD ${OFFICIAL_FEE_CAD}. Most applications are approved within minutes; some require additional documents.
- The eTA is electronically linked to the passport used to apply. A new passport requires a new eTA. Dual Canadian citizens must travel with a Canadian passport.
- The only official application website is canada.ca.

## Main pages

${link('Home: Canada eVisa (eTA)', path('home', 'en'))}
${link('Apply for a Canada eTA', path('apply', 'en'))}
${link('Requirements and documents', path('requirements', 'en'))}
${link('Rules by nationality', path('nationalities', 'en'))}
${link('Frequently asked questions', path('faq', 'en'))}
${link('Contact', path('contact', 'en'))}

## Guides

${guides}

## Canada eVisa by nationality

${nationalities}

## Version française

${link('Accueil : AVE Canada (eTA)', path('home', 'fr'))}
${link('Faire une demande', path('apply', 'fr'))}
${link('Conditions requises', path('requirements', 'fr'))}
${link('Questions fréquentes', path('faq', 'fr'))}

${nationalitiesFr}

## Optional

${link('Legal notice', path('legalNotice', 'en'))}
${link('Terms of service', path('terms', 'en'))}
${link('Privacy', path('privacy', 'en'))}
`

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}
