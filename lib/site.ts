import { intlLocale, type Locale } from '@/lib/i18n'

/**
 * Faits propres à l'entreprise, indépendants de la langue.
 * Les textes traduits vivent dans `lib/dictionary`.
 *
 * ⚠️ À confirmer avant mise en ligne :
 * - `email` : la messagerie du domaine canada-evisa.com doit exister (MX).
 * - `legalName` / `address` : repris de l’autre site du groupe, à confirmer.
 * - `OFFICIAL_FEE_USD` : contre-valeur en USD des 7 CAD, voir plus bas.
 */
export const site = {
  name: 'Canada eVisa',
  legalName: 'GOVCONSULT LLC',
  url: 'https://www.canada-evisa.com',
  email: 'contact@canada-evisa.com',
  address: '1309 Coffeen Avenue, STE 1200, Sheridan, Wyoming 82801, United States',
  /** Seul site officiel de demande d'AVE (gouvernement du Canada). */
  officialPortal: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/visit-canada/eta.html',
  officialPortalFr: 'https://www.canada.ca/fr/immigration-refugies-citoyennete/services/visiter-canada/ave.html',
} as const

/**
 * Dates de dernière révision éditoriale, au format ISO.
 * Elles alimentent <lastmod> : à mettre à jour quand le contenu change
 * réellement, jamais à chaque déploiement.
 */
export const revised = {
  pages: '2026-09-23',
  nationalities: '2026-09-23',
} as const

/** Redevance officielle d'IRCC, en dollars canadiens (canada.ca, septembre 2026). */
export const OFFICIAL_FEE_CAD = 7
/**
 * Contre-valeur en USD de la redevance, facturée au client avec les frais de
 * service (Stripe ne débite qu'une devise). ⚠️ Taux à confirmer.
 */
export const OFFICIAL_FEE_USD = 5.1
export const SERVICE_FEE_USD = 20
export const TOTAL_FEE_USD = Math.round((OFFICIAL_FEE_USD + SERVICE_FEE_USD) * 100) / 100

const formatCurrency = (currency: 'USD' | 'CAD') => (amount: number, locale: Locale) =>
  new Intl.NumberFormat(intlLocale[locale], {
    style: 'currency',
    currency,
    minimumFractionDigits: Number.isInteger(amount) ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(amount)

export const formatUsd = formatCurrency('USD')
export const formatCad = formatCurrency('CAD')
