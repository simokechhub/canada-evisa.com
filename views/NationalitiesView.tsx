import Section from '@/components/Section'
import NationalityGrid from '@/components/NationalityGrid'
import Breadcrumbs from '@/components/Breadcrumbs'
import CtaSection from '@/components/CtaSection'
import { format, type Locale } from '@/lib/i18n'
import { getDictionary } from '@/lib/dictionary'
import { nationalitiesByRegion, nationalityCount } from '@/lib/nationalities'

export default function NationalitiesView({ locale }: { locale: Locale }) {
  const t = getDictionary(locale)
  const p = t.nationalitiesPage
  const groups = nationalitiesByRegion(locale)

  return (
    <>
      <div className="page-hero">
        <div className="container-page relative z-10 py-14 sm:py-20">
          <Breadcrumbs items={[{ label: t.nav.nationalities }]} locale={locale} />
          <h1 className="mt-5 max-w-3xl text-3xl font-semibold sm:text-4xl">{p.title}</h1>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-slate-600">
            {format(p.intro, { count: nationalityCount })}
          </p>
        </div>
      </div>

      {groups.map(([region, items], index) => (
        <Section
          key={region}
          eyebrow={format(p.countryCount, { count: items.length })}
          title={region}
          className={index % 2 === 1 ? 'bg-slate-50' : ''}
        >
          <NationalityGrid items={items} locale={locale} />
        </Section>
      ))}

      <CtaSection locale={locale} title={p.ctaTitle} description={p.ctaText} />
    </>
  )
}
