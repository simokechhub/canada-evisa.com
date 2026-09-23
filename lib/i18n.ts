export const locales = ['en', 'fr'] as const

export type Locale = (typeof locales)[number]

/** L'anglais est servi à la racine ; le français vit sous /fr. */
export const defaultLocale: Locale = 'en'

/** Une valeur déclinée dans chaque langue du site. */
export type Localized<T> = Record<Locale, T>

export const isLocale = (value: string): value is Locale =>
  (locales as readonly string[]).includes(value)

export const pick = <T,>(value: Localized<T>, locale: Locale): T => value[locale]

export const otherLocale = (locale: Locale): Locale => (locale === 'fr' ? 'en' : 'fr')

/** Étiquette de l'IETF language tag, pour <html lang> et les balises hreflang. */
export const htmlLang: Localized<string> = { fr: 'fr', en: 'en' }

export const openGraphLocale: Localized<string> = { fr: 'fr_FR', en: 'en_GB' }

/** Locale Intl utilisée pour les montants et les dates. */
export const intlLocale: Localized<string> = { fr: 'fr-FR', en: 'en-GB' }

export const localeLabel: Localized<string> = { fr: 'Français', en: 'English' }

/** Remplace les jetons {clé} d'un gabarit par les valeurs fournies. */
export function format(template: string, vars: Record<string, string | number>) {
  return template.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in vars ? String(vars[key]) : match,
  )
}
