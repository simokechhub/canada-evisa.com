import raw from '@/data/nationalities.json'
import { locales, type Locale, type Localized } from '@/lib/i18n'

export type TemplateType = 'A' | 'B' | 'C'

/** Entrée brute du jeu de données : chaque texte porte ses deux langues. */
export type NationalityRecord = {
  slug: Localized<string>
  country: Localized<string>
  countryShort: Localized<string>
  nationality: Localized<string>
  adjective: Localized<string>
  demonym: Localized<string>
  region: Localized<string>
  currency: string
  templateType: TemplateType
  yellowFever: boolean
  flightInfo: Localized<string>
  transitWarning: Localized<string> | null
  airports: Localized<string[]>
  carriers: string[]
  flightDuration: Localized<string>
  timezone: Localized<string>
  highSeason: Localized<string>
  passportNote: Localized<string>
  /** Informations pratiques propres au pays, pour enrichir la page. */
  plugs: Localized<string>
  usTrip: Localized<string>
  language: Localized<string>
  specialNote: Localized<string> | null
  tripIdea: Localized<string>
}

/** Entrée résolue dans une langue, telle que la consomment les composants. */
export type Nationality = {
  slug: string
  slugs: Localized<string>
  country: string
  countryShort: string
  nationality: string
  adjective: string
  demonym: string
  region: string
  currency: string
  templateType: TemplateType
  yellowFever: boolean
  flightInfo: string
  transitWarning: string | null
  airports: string[]
  carriers: string[]
  flightDuration: string
  timezone: string
  highSeason: string
  passportNote: string
  plugs: string
  usTrip: string
  language: string
  specialNote: string | null
  tripIdea: string
}

export const nationalityRecords = raw as NationalityRecord[]

function resolve(record: NationalityRecord, locale: Locale): Nationality {
  return {
    slug: record.slug[locale],
    slugs: record.slug,
    country: record.country[locale],
    countryShort: record.countryShort[locale],
    nationality: record.nationality[locale],
    adjective: record.adjective[locale],
    demonym: record.demonym[locale],
    region: record.region[locale],
    currency: record.currency,
    templateType: record.templateType,
    yellowFever: record.yellowFever,
    flightInfo: record.flightInfo[locale],
    transitWarning: record.transitWarning ? record.transitWarning[locale] : null,
    airports: record.airports[locale],
    carriers: record.carriers,
    flightDuration: record.flightDuration[locale],
    timezone: record.timezone[locale],
    highSeason: record.highSeason[locale],
    passportNote: record.passportNote[locale],
    plugs: record.plugs[locale],
    usTrip: record.usTrip[locale],
    language: record.language[locale],
    specialNote: record.specialNote ? record.specialNote[locale] : null,
    tripIdea: record.tripIdea[locale],
  }
}

const cache = new Map<Locale, Nationality[]>()

export function getNationalities(locale: Locale): Nationality[] {
  const cached = cache.get(locale)
  if (cached) return cached
  const resolved = nationalityRecords.map((record) => resolve(record, locale))
  cache.set(locale, resolved)
  return resolved
}

export const getNationality = (slug: string, locale: Locale): Nationality | undefined =>
  getNationalities(locale).find((item) => item.slug === slug)

export const nationalitySlugs = (locale: Locale) =>
  nationalityRecords.map((record) => record.slug[locale])

/** Nombre de pages par nationalité, identique dans les deux langues. */
export const nationalityCount = nationalityRecords.length

/** Regroupe par région, régions triées par ordre alphabétique de la langue. */
export function nationalitiesByRegion(locale: Locale): [string, Nationality[]][] {
  const groups = new Map<string, Nationality[]>()
  for (const item of getNationalities(locale)) {
    const bucket = groups.get(item.region) ?? []
    bucket.push(item)
    groups.set(item.region, bucket)
  }
  return Array.from(groups.entries())
    .map(([region, items]) => {
      const sorted = [...items].sort((a, b) =>
        a.countryShort.localeCompare(b.countryShort, locale),
      )
      return [region, sorted] as [string, Nationality[]]
    })
    .sort((a, b) => a[0].localeCompare(b[0], locale))
}

/**
 * Quelques pages voisines à proposer en maillage interne.
 *
 * Le complément hors région est pris dans un ordre qui *tourne* à partir de la
 * page courante, et non dans l'ordre du fichier : sinon les premières entrées
 * du jeu de données captent tous les liens et la fin de liste n'en reçoit
 * aucun. Avec la rotation, chaque page en reçoit autant qu'elle en émet.
 */
export function relatedNationalities(
  current: Nationality,
  locale: Locale,
  count = 6,
): Nationality[] {
  const all = getNationalities(locale)
  const index = all.findIndex((item) => item.slug === current.slug)
  const ordered =
    index === -1
      ? all.filter((item) => item.slug !== current.slug)
      : Array.from(
          { length: all.length - 1 },
          (_, offset) => all[(index + offset + 1) % all.length],
        )

  /**
   * La même région d'abord, mais plafonnée à la moitié des emplacements :
   * sans ce quota, les dix pays européens se lient uniquement entre eux et
   * les régions représentées par un seul pays ne reçoivent presque rien.
   */
  const quota = Math.max(1, Math.floor(count / 2))
  const sameRegion = ordered
    .filter((item) => item.region === current.region)
    .slice(0, quota)
  const picked = new Set(sameRegion.map((item) => item.slug))
  const others = ordered.filter((item) => !picked.has(item.slug))
  return [...sameRegion, ...others].slice(0, count)
}

/** Toutes les paires de slugs, pour le sélecteur de langue. */
export const nationalitySlugPairs = nationalityRecords.map((record) =>
  Object.fromEntries(locales.map((locale) => [locale, record.slug[locale]])) as Localized<string>,
)
