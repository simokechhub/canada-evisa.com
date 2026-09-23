import type { Metadata } from 'next'
import RequirementsView from '@/views/RequirementsView'
import { getDictionary } from '@/lib/dictionary'
import { routeMetadata } from '@/lib/metadata'

const locale = 'fr' as const
const t = getDictionary(locale)

export const metadata: Metadata = routeMetadata(
  locale,
  'requirements',
  t.requirementsPage.metaTitle,
  t.requirementsPage.metaDescription,
)

export default function Page() {
  return <RequirementsView locale={locale} />
}
