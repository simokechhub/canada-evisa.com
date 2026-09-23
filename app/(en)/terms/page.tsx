import type { Metadata } from 'next'
import LegalPage from '@/components/LegalPage'
import { getDictionary } from '@/lib/dictionary'
import { routeMetadata } from '@/lib/metadata'

const locale = 'en' as const
const t = getDictionary(locale).legal.terms

export const metadata: Metadata = routeMetadata(locale, 'terms', t.metaTitle, t.metaDescription)

export default function Page() {
  return <LegalPage locale={locale} title={t.title} blocks={t.blocks} />
}
