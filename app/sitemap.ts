import type { MetadataRoute } from 'next'
import { locales, type Locale } from '@/lib/i18n'
import { guideRecords } from '@/lib/guides'
import { nationalityRecords } from '@/lib/nationalities'
import { guidePath, nationalityPath, routes, type RouteKey } from '@/lib/routes'
import { revised, site } from '@/lib/site'

type ChangeFrequency =
  | 'always'
  | 'hourly'
  | 'daily'
  | 'weekly'
  | 'monthly'
  | 'yearly'
  | 'never'

/**
 * Les pages indexables uniquement : `tracking` en est absente parce que
 * robots.txt l'interdit au crawl — l'annoncer ici produirait l'avertissement
 * « URL envoyée bloquée par robots.txt » dans Search Console.
 */
const staticRoutes: {
  key: RouteKey
  priority: number
  changeFrequency: ChangeFrequency
}[] = [
  { key: 'home', priority: 1, changeFrequency: 'weekly' },
  { key: 'apply', priority: 0.9, changeFrequency: 'monthly' },
  { key: 'requirements', priority: 0.8, changeFrequency: 'monthly' },
  { key: 'nationalities', priority: 0.8, changeFrequency: 'monthly' },
  { key: 'guides', priority: 0.6, changeFrequency: 'weekly' },
  { key: 'faq', priority: 0.6, changeFrequency: 'monthly' },
  { key: 'contact', priority: 0.4, changeFrequency: 'yearly' },
  { key: 'legalNotice', priority: 0.2, changeFrequency: 'yearly' },
  { key: 'privacy', priority: 0.2, changeFrequency: 'yearly' },
  { key: 'terms', priority: 0.2, changeFrequency: 'yearly' },
]

const absolute = (pathname: string) =>
  `${site.url}${pathname === '/' ? '' : pathname}`

/** Chaque entrée déclare ses équivalents dans l'autre langue (hreflang). */
const alternates = (paths: Record<Locale, string>) => ({
  languages: {
    ...Object.fromEntries(
      locales.map((locale) => [locale, absolute(paths[locale])]),
    ),
    'x-default': absolute(paths.en),
  } as Record<string, string>,
})

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = []

  for (const locale of locales) {
    for (const route of staticRoutes) {
      entries.push({
        url: absolute(routes[route.key][locale]),
        lastModified: revised.pages,
        changeFrequency: route.changeFrequency,
        priority: route.priority,
        alternates: alternates(routes[route.key]),
      })
    }

    for (const record of nationalityRecords) {
      entries.push({
        url: absolute(nationalityPath(record.slug[locale], locale)),
        lastModified: revised.nationalities,
        changeFrequency: 'monthly',
        priority: 0.8,
        alternates: alternates({
          fr: nationalityPath(record.slug.fr, 'fr'),
          en: nationalityPath(record.slug.en, 'en'),
        }),
      })
    }

    for (const record of guideRecords) {
      entries.push({
        url: absolute(guidePath(record.slug[locale], locale)),
        lastModified: record.revised,
        changeFrequency: 'monthly',
        priority: 0.5,
        alternates: alternates({
          fr: guidePath(record.slug.fr, 'fr'),
          en: guidePath(record.slug.en, 'en'),
        }),
      })
    }
  }

  return entries
}
