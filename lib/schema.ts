import { htmlLang, type Locale } from '@/lib/i18n'
import { getDictionary } from '@/lib/dictionary'
import { path } from '@/lib/routes'
import { site } from '@/lib/site'

export const absoluteUrl = (pathname: string) =>
  `${site.url}${pathname === '/' ? '' : pathname}`

const ORGANISATION_ID = `${site.url}/#organization`
const WEBSITE_ID = `${site.url}/#website`

/**
 * Identité de l'éditeur. Référencée par `@id` depuis les autres blocs plutôt
 * que recopiée, pour que Google rattache tout au même nœud.
 */
export function organizationSchema(locale: Locale) {
  const t = getDictionary(locale)

  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': ORGANISATION_ID,
    name: site.name,
    legalName: site.legalName,
    url: site.url,
    email: site.email,
    description: t.meta.description,
    logo: {
      '@type': 'ImageObject',
      url: absoluteUrl('/images/og-cover.jpg'),
      width: 1200,
      height: 630,
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: '1309 Coffeen Avenue, STE 1200',
      addressLocality: 'Sheridan',
      addressRegion: 'WY',
      postalCode: '82801',
      addressCountry: 'US',
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'customer support',
        email: site.email,
        availableLanguage: ['fr', 'en'],
      },
    ],
  }
}

export function websiteSchema(locale: Locale) {
  const t = getDictionary(locale)

  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: absoluteUrl(path('home', locale)),
    name: site.name,
    description: t.meta.description,
    inLanguage: htmlLang[locale],
    publisher: { '@id': ORGANISATION_ID },
  }
}

export type BreadcrumbEntry = { name: string; url?: string }

export function breadcrumbSchema(entries: BreadcrumbEntry[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: entries.map((entry, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: entry.name,
      ...(entry.url ? { item: absoluteUrl(entry.url) } : {}),
    })),
  }
}

export function articleSchema({
  locale,
  headline,
  description,
  url,
  published,
  modified,
}: {
  locale: Locale
  headline: string
  description: string
  url: string
  published: string
  modified: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline,
    description,
    inLanguage: htmlLang[locale],
    mainEntityOfPage: { '@type': 'WebPage', '@id': absoluteUrl(url) },
    image: [absoluteUrl('/images/og-cover.jpg')],
    datePublished: published,
    dateModified: modified,
    author: { '@id': ORGANISATION_ID },
    publisher: { '@id': ORGANISATION_ID },
  }
}
