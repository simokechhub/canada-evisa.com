'use client'

import { usePathname } from 'next/navigation'
import Breadcrumbs from '@/components/Breadcrumbs'
import type { Locale } from '@/lib/i18n'
import { getDictionary } from '@/lib/dictionary'
import { getGuide } from '@/lib/guides'
import { path } from '@/lib/routes'

export default function GuideBreadcrumbs({ locale }: { locale: Locale }) {
  const pathname = usePathname()
  const t = getDictionary(locale)
  const slug = pathname.split('/').filter(Boolean).pop() ?? ''
  const guide = getGuide(slug, locale)

  return (
    <Breadcrumbs
      locale={locale}
      items={[
        { href: path('guides', locale), label: t.nav.guides },
        { label: guide?.title ?? t.guidesPage.breadcrumbArticle },
      ]}
    />
  )
}
