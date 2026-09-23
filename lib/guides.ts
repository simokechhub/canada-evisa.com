import { locales, type Locale, type Localized } from '@/lib/i18n'

export type GuideRecord = {
  slug: Localized<string>
  title: Localized<string>
  /** Accroche des cartes, volontairement courte. */
  excerpt: Localized<string>
  /** Texte de la balise description : plus explicite, il porte le mot-clé. */
  metaDescription: Localized<string>
  category: Localized<string>
  readingTime: Localized<string>
  /** Dates éditoriales, au format ISO. Servent au sitemap et au balisage Article. */
  published: string
  revised: string
}

export type Guide = {
  slug: string
  slugs: Localized<string>
  title: string
  excerpt: string
  metaDescription: string
  category: string
  readingTime: string
  published: string
  revised: string
}

export const guideRecords: GuideRecord[] = [
  {
    slug: { fr: 'quand-partir', en: 'when-to-go' },
    title: {
      fr: 'Quand partir au Canada selon les saisons',
      en: 'When to visit Canada, season by season',
    },
    excerpt: {
      fr: 'Été, couleurs d’automne, hiver enneigé : le calendrier pour choisir la meilleure période selon votre projet.',
      en: 'Summer, autumn colours, snowy winter: a calendar for choosing the best time for your trip.',
    },
    metaDescription: {
      fr: 'Été, couleurs d’automne, hiver et printemps : le calendrier saison par saison pour choisir quand partir au Canada, et quand demander son AVE.',
      en: 'Summer, autumn colours, winter and spring: a season-by-season calendar for choosing when to visit Canada, and when to apply for your eTA.',
    },
    category: { fr: 'Préparer son voyage', en: 'Trip planning' },
    readingTime: { fr: '6 min', en: '6 min' },
    published: '2026-09-23',
    revised: '2026-09-23',
  },
  {
    slug: { fr: 'preparer-sa-demande', en: 'prepare-your-application' },
    title: {
      fr: 'Réussir sa demande d’AVE du premier coup',
      en: 'Getting your eTA application right first time',
    },
    excerpt: {
      fr: 'Numéro de passeport, double nationalité, adresse e-mail : les points qui font échouer une demande et comment les éviter.',
      en: 'Passport number, dual nationality, email address: the details that derail an application and how to avoid them.',
    },
    metaDescription: {
      fr: 'Numéro de passeport, double nationalité, e-mail, documents supplémentaires : comment réussir sa demande d’AVE Canada (eTA) du premier coup.',
      en: 'Passport number, dual nationality, email, additional documents: how to get your Canada eTA application right first time.',
    },
    category: { fr: 'Formalités', en: 'Formalities' },
    readingTime: { fr: '6 min', en: '6 min' },
    published: '2026-09-23',
    revised: '2026-09-23',
  },
  {
    slug: { fr: 'quelle-ville', en: 'which-city' },
    title: {
      fr: 'Montréal, Toronto, Vancouver : quelle ville choisir',
      en: 'Montreal, Toronto, Vancouver: choosing your city',
    },
    excerpt: {
      fr: 'Ce que chaque grande ville apporte, comment circuler entre elles et combien de jours prévoir.',
      en: 'What each major city offers, how to travel between them and how many days to plan.',
    },
    metaDescription: {
      fr: 'Montréal, Québec, Toronto ou Vancouver : ce que chaque ville canadienne apporte, les distances entre elles et combien de jours prévoir.',
      en: 'Montreal, Quebec City, Toronto or Vancouver: what each Canadian city offers, the distances between them and how many days to plan.',
    },
    category: { fr: 'Sur place', en: 'On the ground' },
    readingTime: { fr: '7 min', en: '7 min' },
    published: '2026-09-23',
    revised: '2026-09-23',
  },
]

export function getGuides(locale: Locale): Guide[] {
  return guideRecords.map((record) => ({
    slug: record.slug[locale],
    slugs: record.slug,
    title: record.title[locale],
    excerpt: record.excerpt[locale],
    metaDescription: record.metaDescription[locale],
    category: record.category[locale],
    readingTime: record.readingTime[locale],
    published: record.published,
    revised: record.revised,
  }))
}

export const getGuide = (slug: string, locale: Locale) =>
  getGuides(locale).find((guide) => guide.slug === slug)

export const guideSlugPairs = guideRecords.map((record) =>
  Object.fromEntries(locales.map((locale) => [locale, record.slug[locale]])) as Localized<string>,
)

/**
 * Les autres guides, pour le bloc « à lire aussi » en fin d'article.
 * L'ordre tourne à partir du guide courant : chaque article en reçoit ainsi
 * autant qu'il en émet, sans que le premier du fichier capte tous les liens.
 */
export function relatedGuides(slug: string, locale: Locale, count = 2): Guide[] {
  const all = getGuides(locale)
  const index = all.findIndex((guide) => guide.slug === slug)
  if (index === -1) return all.slice(0, count)
  return Array.from({ length: all.length - 1 }, (_, offset) =>
    all[(index + offset + 1) % all.length],
  ).slice(0, count)
}
