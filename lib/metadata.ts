import type { Metadata } from 'next'
import { locales, openGraphLocale, type Locale, type Localized } from '@/lib/i18n'
import { getDictionary } from '@/lib/dictionary'
import { getGuide } from '@/lib/guides'
import { guidePath, path, routes, type RouteKey } from '@/lib/routes'
import { site } from '@/lib/site'

type Options = {
  locale: Locale
  title: string
  description: string
  /** URL de la page dans chaque langue, pour le canonique et les hreflang. */
  paths: Localized<string>
  type?: 'website' | 'article'
  /** Dates ISO, pour les articles. */
  published?: string
  modified?: string
  /**
   * Supprime le suffixe « | Canada eVisa » du gabarit. À activer quand le
   * titre se suffit à lui-même : sinon on dépasse les ~60 caractères affichés
   * par Google et la fin du titre est tronquée dans les résultats.
   */
  absoluteTitle?: boolean
}

/** Visuel de partage, identique partout faute d'illustration par page. */
export const ogImage = {
  url: '/images/og-cover.jpg',
  width: 1200,
  height: 630,
  type: 'image/jpeg',
} as const

const imageFor = (alt: string) => [{ ...ogImage, alt }]

/** Canonique + alternates hreflang, identiques sur toutes les pages du site. */
export function buildMetadata({
  locale,
  title,
  description,
  paths,
  type = 'website',
  published,
  modified,
  absoluteTitle = false,
}: Options): Metadata {
  const canonical = paths[locale]

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: {
      canonical,
      languages: {
        ...Object.fromEntries(locales.map((code) => [code, paths[code]])),
        'x-default': paths.en,
      } as Record<string, string>,
    },
    openGraph: {
      type,
      locale: openGraphLocale[locale],
      url: `${site.url}${canonical === '/' ? '' : canonical}`,
      siteName: site.name,
      title,
      description,
      images: imageFor(title),
      ...(type === 'article' && published
        ? { publishedTime: published, modifiedTime: modified ?? published }
        : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: imageFor(title),
    },
  }
}

/** Raccourci pour les pages dont l'URL vient de la table de routes. */
export function routeMetadata(
  locale: Locale,
  key: RouteKey,
  title: string,
  description: string,
  absoluteTitle = false,
): Metadata {
  return buildMetadata({ locale, title, description, paths: routes[key], absoluteTitle })
}

export function rootMetadata(locale: Locale): Metadata {
  const t = getDictionary(locale)

  return {
    metadataBase: new URL(site.url),
    title: {
      default: t.meta.title,
      template: `%s | ${site.name}`,
    },
    description: t.meta.description,
    keywords: [...t.meta.keywords],
    alternates: {
      canonical: path('home', locale),
      languages: {
        en: routes.home.en,
        fr: routes.home.fr,
        'x-default': routes.home.en,
      },
    },
    openGraph: {
      type: 'website',
      locale: openGraphLocale[locale],
      url: `${site.url}${path('home', locale)}`,
      siteName: site.name,
      title: t.meta.title,
      description: t.meta.ogDescription,
      images: imageFor(t.meta.title),
    },
    twitter: {
      card: 'summary_large_image',
      title: t.meta.title,
      description: t.meta.twitterDescription,
      images: imageFor(t.meta.title),
    },
    robots: { index: true, follow: true },
    /**
     * Drapeau du Canada. Google affiche le favicon dans ses résultats et
     * exige une taille multiple de 48 px : le .ico en contient une, le SVG
     * s'adapte à toutes les tailles.
     */
    icons: {
      icon: [
        { url: '/favicon.ico', sizes: '48x48' },
        { url: '/favicon.svg', type: 'image/svg+xml' },
        { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      ],
      apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
    },
  }
}

/**
 * Métadonnées d'un article de guide, dérivées de `lib/guides`.
 * Sans ce passage obligé, les pages MDX héritaient de l'Open Graph du layout
 * racine : les six articles annonçaient le titre et l'URL de l'accueil.
 */
export function guideMetadata(slug: string, locale: Locale): Metadata {
  const guide = getGuide(slug, locale)
  if (!guide) return {}

  return buildMetadata({
    locale,
    title: guide.title,
    description: guide.metaDescription,
    type: 'article',
    absoluteTitle: true,
    published: guide.published,
    modified: guide.revised,
    paths: {
      fr: guidePath(guide.slugs.fr, 'fr'),
      en: guidePath(guide.slugs.en, 'en'),
    },
  })
}
