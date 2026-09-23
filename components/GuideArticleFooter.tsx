'use client'

import { usePathname } from 'next/navigation'
import GuideCards from '@/components/GuideCards'
import JsonLd from '@/components/JsonLd'
import Section from '@/components/Section'
import type { Locale } from '@/lib/i18n'
import { getDictionary } from '@/lib/dictionary'
import { getGuide, relatedGuides } from '@/lib/guides'
import { guidePath } from '@/lib/routes'
import { articleSchema } from '@/lib/schema'

/**
 * Balisage Article et bloc « à lire également » des guides.
 * Le slug est lu dans l'URL, comme pour le fil d'Ariane : les articles sont
 * des pages MDX, elles ne reçoivent pas de `params`.
 */
export default function GuideArticleFooter({ locale }: { locale: Locale }) {
  const pathname = usePathname()
  const t = getDictionary(locale)
  const slug = pathname.split('/').filter(Boolean).pop() ?? ''
  const guide = getGuide(slug, locale)

  if (!guide) return null

  const schema = articleSchema({
    locale,
    headline: guide.title,
    description: guide.metaDescription,
    url: guidePath(guide.slug, locale),
    published: guide.published,
    modified: guide.revised,
  })

  return (
    <>
      <JsonLd data={schema} />
      <Section title={t.guidesPage.relatedTitle} className="bg-slate-50">
        <GuideCards guides={relatedGuides(guide.slug, locale)} locale={locale} />
      </Section>
    </>
  )
}
