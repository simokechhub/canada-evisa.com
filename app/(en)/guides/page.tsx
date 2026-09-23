import type { Metadata } from 'next'
import GuidesView from '@/views/GuidesView'
import { getDictionary } from '@/lib/dictionary'
import { routeMetadata } from '@/lib/metadata'

const locale = 'en' as const
const t = getDictionary(locale)

export const metadata: Metadata = routeMetadata(
  locale,
  'guides',
  t.guidesPage.metaTitle,
  t.guidesPage.metaDescription,
)

export default function Page() {
  return <GuidesView locale={locale} />
}
