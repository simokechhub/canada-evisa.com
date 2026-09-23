import type { Metadata } from 'next'
import ContactView from '@/views/ContactView'
import { getDictionary } from '@/lib/dictionary'
import { routeMetadata } from '@/lib/metadata'

const locale = 'en' as const
const t = getDictionary(locale)

export const metadata: Metadata = routeMetadata(
  locale,
  'contact',
  t.contactPage.metaTitle,
  t.contactPage.metaDescription,
)

export default function Page() {
  return <ContactView locale={locale} />
}
