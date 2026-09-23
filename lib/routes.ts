import { locales, type Locale, type Localized } from '@/lib/i18n'
import { guideSlugPairs } from '@/lib/guides'
import { nationalitySlugPairs } from '@/lib/nationalities'

export type RouteKey =
  | 'home'
  | 'apply'
  | 'requirements'
  | 'nationalities'
  | 'guides'
  | 'faq'
  | 'contact'
  | 'tracking'
  | 'legalNotice'
  | 'privacy'
  | 'terms'

/** L'anglais est servi à la racine, le français sous /fr, avec des slugs traduits. */
export const routes: Record<RouteKey, Localized<string>> = {
  home: { en: '/', fr: '/fr' },
  apply: { en: '/apply', fr: '/fr/demande' },
  requirements: { en: '/requirements', fr: '/fr/conditions-requises' },
  nationalities: { en: '/nationalities', fr: '/fr/nationalites' },
  guides: { en: '/guides', fr: '/fr/guides' },
  faq: { en: '/faq', fr: '/fr/faq' },
  contact: { en: '/contact', fr: '/fr/contact' },
  tracking: { en: '/track', fr: '/fr/suivi' },
  legalNotice: { en: '/legal-notice', fr: '/fr/mentions-legales' },
  privacy: { en: '/privacy', fr: '/fr/confidentialite' },
  terms: { en: '/terms', fr: '/fr/conditions-generales' },
}

export const path = (key: RouteKey, locale: Locale) => routes[key][locale]

const nationalityBase: Localized<string> = {
  en: '/canada-evisa',
  fr: '/fr/ave-canada',
}

export const nationalityPath = (slug: string, locale: Locale) =>
  `${nationalityBase[locale]}/${slug}`

export const guidePath = (slug: string, locale: Locale) =>
  `${routes.guides[locale]}/${slug}`

/**
 * Toutes les correspondances d'URL entre langues, utilisées par le sélecteur
 * de langue pour rester sur la même page en changeant de version.
 */
export const pathPairs: Localized<string>[] = [
  ...Object.values(routes),
  ...nationalitySlugPairs.map(
    (pair) =>
      Object.fromEntries(
        locales.map((locale) => [locale, nationalityPath(pair[locale], locale)]),
      ) as Localized<string>,
  ),
  ...guideSlugPairs.map(
    (pair) =>
      Object.fromEntries(
        locales.map((locale) => [locale, guidePath(pair[locale], locale)]),
      ) as Localized<string>,
  ),
]

/** URL équivalente de `pathname` dans l'autre langue, ou l'accueil à défaut. */
export function counterpart(pathname: string, target: Locale): string {
  const clean = pathname.length > 1 ? pathname.replace(/\/$/, '') : pathname
  const pair = pathPairs.find((entry) =>
    locales.some((locale) => entry[locale] === clean),
  )
  return pair ? pair[target] : routes.home[target]
}
