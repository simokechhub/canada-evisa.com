import type { Locale } from '@/lib/i18n'
import { fr, type Dictionary, type LegalBlock } from '@/lib/dictionary/fr'
import { en } from '@/lib/dictionary/en'

const dictionaries: Record<Locale, Dictionary> = { fr, en }

export const getDictionary = (locale: Locale): Dictionary => dictionaries[locale]

export type { Dictionary, LegalBlock }
