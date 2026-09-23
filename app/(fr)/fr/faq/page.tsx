import type { Metadata } from 'next'
import FaqView from '@/views/FaqView'
import { getDictionary } from '@/lib/dictionary'
import { routeMetadata } from '@/lib/metadata'

const locale = 'fr' as const
const t = getDictionary(locale)

export const metadata: Metadata = routeMetadata(
  locale,
  'faq',
  t.faqPage.metaTitle,
  t.faqPage.metaDescription,
)

export default function Page() {
  return <FaqView locale={locale} />
}
