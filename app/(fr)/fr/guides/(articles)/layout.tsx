import Link from 'next/link'
import GuideArticleFooter from '@/components/GuideArticleFooter'
import GuideBreadcrumbs from '@/components/GuideBreadcrumbs'
import CtaSection from '@/components/CtaSection'
import { getDictionary } from '@/lib/dictionary'
import { path } from '@/lib/routes'

const locale = 'fr' as const

export default function GuideArticleLayout({ children }: { children: React.ReactNode }) {
  const t = getDictionary(locale)

  return (
    <>
      <div className="page-hero">
        <div className="container-page py-6">
          <GuideBreadcrumbs locale={locale} />
        </div>
      </div>

      <article className="container-page py-12 sm:py-16">
        <div className="prose-page">{children}</div>

        <div className="mt-12 flex flex-wrap gap-3 border-t border-slate-200 pt-8">
          <Link href={path('apply', locale)} className="btn-primary">
            {t.actions.start}
          </Link>
          <Link href={path('guides', locale)} className="btn-secondary">
            {t.actions.allGuides}
          </Link>
        </div>
      </article>

      <GuideArticleFooter locale={locale} />

      <CtaSection locale={locale} />
    </>
  )
}
