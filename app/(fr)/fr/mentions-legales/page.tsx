import type { Metadata } from 'next'
import LegalPage from '@/components/LegalPage'
import { getDictionary } from '@/lib/dictionary'
import { routeMetadata } from '@/lib/metadata'

const locale = 'fr' as const
const t = getDictionary(locale).legal.notice

export const metadata: Metadata = routeMetadata(locale, 'legalNotice', t.metaTitle, t.metaDescription)

export default function Page() {
  return <LegalPage locale={locale} title={t.title} blocks={t.blocks} />
}
