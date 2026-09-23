import Breadcrumbs from '@/components/Breadcrumbs'
import Section from '@/components/Section'
import GuideCards from '@/components/GuideCards'
import CtaSection from '@/components/CtaSection'
import type { Locale } from '@/lib/i18n'
import { getDictionary } from '@/lib/dictionary'
import { getGuides } from '@/lib/guides'

export default function GuidesView({ locale }: { locale: Locale }) {
  const t = getDictionary(locale)
  const p = t.guidesPage

  return (
    <>
      <div className="page-hero">
        <div className="container-page relative z-10 py-14 sm:py-20">
          <Breadcrumbs items={[{ label: t.nav.guides }]} locale={locale} />
          <h1 className="mt-6 max-w-4xl text-4xl font-bold leading-tight sm:text-6xl">{p.title}</h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">{p.intro}</p>
        </div>
      </div>

      <Section>
        <GuideCards guides={getGuides(locale)} locale={locale} />
      </Section>

      <CtaSection locale={locale} />
    </>
  )
}
