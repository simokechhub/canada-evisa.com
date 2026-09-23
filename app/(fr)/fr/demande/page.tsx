import type { Metadata } from 'next'
import ApplyView from '@/views/ApplyView'
import { getDictionary } from '@/lib/dictionary'
import { routeMetadata } from '@/lib/metadata'

/** Les champs viennent de la base : la page est régénérée au plus toutes les heures. */
export const revalidate = 3600

const locale = 'fr' as const
const t = getDictionary(locale)

export const metadata: Metadata = routeMetadata(
  locale,
  'apply',
  t.applyPage.metaTitle,
  t.applyPage.metaDescription,
)

export default function Page() {
  return <ApplyView locale={locale} />
}
