import type { Metadata } from 'next'
import TrackingView from '@/views/TrackingView'
import { getDictionary } from '@/lib/dictionary'
import { routeMetadata } from '@/lib/metadata'

const locale = 'fr' as const
const t = getDictionary(locale)

export const metadata: Metadata = routeMetadata(
  locale,
  'tracking',
  t.trackingPage.metaTitle,
  t.trackingPage.metaDescription,
)

export default function Page() {
  return <TrackingView locale={locale} />
}
