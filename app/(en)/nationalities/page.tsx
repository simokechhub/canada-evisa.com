import type { Metadata } from 'next'
import NationalitiesView from '@/views/NationalitiesView'
import { getDictionary } from '@/lib/dictionary'
import { routeMetadata } from '@/lib/metadata'

const locale = 'en' as const
const t = getDictionary(locale)

export const metadata: Metadata = routeMetadata(
  locale,
  'nationalities',
  t.nationalitiesPage.metaTitle,
  t.nationalitiesPage.metaDescription,
  true,
)

export default function Page() {
  return <NationalitiesView locale={locale} />
}
