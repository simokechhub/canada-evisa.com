import { format, intlLocale, type Locale } from '@/lib/i18n'
import { getDictionary } from '@/lib/dictionary'
import type { Nationality } from '@/lib/nationalities'

export type FaqItem = { question: string; answer: string }

const capitalise = (value: string) => value.charAt(0).toLocaleUpperCase() + value.slice(1)

const list = (items: string[], locale: Locale) =>
  new Intl.ListFormat(intlLocale[locale], { style: 'long', type: 'conjunction' }).format(items)

/**
 * Questions propres à un pays. Chaque réponse est tirée des données du pays
 * (`data/nationalities.json`) : rien n'est inventé, et le bloc diffère d'une
 * page à l'autre au lieu de répéter la FAQ générique sur les 52 pages.
 */
export function nationalityFaqs(data: Nationality, locale: Locale): FaqItem[] {
  const t = getDictionary(locale)
  const p = t.nationalityPage
  const q = p.countryFaq
  const vars = {
    demonym: data.demonym,
    nationality: data.nationality,
    adjective: data.adjective,
    country: data.country,
    countryShort: data.countryShort,
    flightDuration: capitalise(data.flightDuration),
    flightInfo: data.flightInfo,
    airports: list(data.airports, locale),
    carriers: list(data.carriers, locale),
    timezone: capitalise(data.timezone),
    season: data.highSeason,
  }

  const items: (FaqItem | null)[] = [
    { question: format(q.authorisationQ, vars), answer: format(q.authorisationA, vars) },
    { question: format(q.flightQ, vars), answer: format(q.flightA, vars) },
    { question: format(q.carriersQ, vars), answer: format(q.carriersA, vars) },
    {
      question: format(q.healthQ, vars),
      answer: format(data.yellowFever ? p.healthRequired : p.healthNotRequired, vars),
    },
    data.transitWarning
      ? { question: format(q.transitQ, vars), answer: data.transitWarning }
      : null,
    { question: format(q.timezoneQ, vars), answer: format(q.timezoneA, vars) },
    { question: format(q.seasonQ, vars), answer: format(q.seasonA, vars) },
    { question: format(q.passportQ, vars), answer: data.passportNote },
    { question: format(q.tripQ, vars), answer: data.tripIdea },
    { question: format(q.usTripQ, vars), answer: data.usTrip },
    { question: format(q.plugsQ, vars), answer: data.plugs },
    { question: format(q.languageQ, vars), answer: data.language },
  ]

  return items.filter((item): item is FaqItem => item !== null)
}
