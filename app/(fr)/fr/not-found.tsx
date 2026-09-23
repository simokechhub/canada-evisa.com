import NotFoundView from '@/views/NotFoundView'
import { getDictionary } from '@/lib/dictionary'

const locale = 'fr' as const

export const metadata = {
  title: getDictionary(locale).notFound.metaTitle,
}

export default function NotFound() {
  return <NotFoundView locale={locale} />
}
