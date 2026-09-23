import Link from 'next/link'
import Section from '@/components/Section'
import RequirementsList from '@/components/RequirementsList'
import Steps from '@/components/Steps'
import Breadcrumbs from '@/components/Breadcrumbs'
import CtaSection from '@/components/CtaSection'
import type { Locale } from '@/lib/i18n'
import { getDictionary } from '@/lib/dictionary'
import { path } from '@/lib/routes'

export default function RequirementsView({ locale }: { locale: Locale }) {
  const t = getDictionary(locale)
  const p = t.requirementsPage

  return (
    <>
      <div className="page-hero">
        <div className="container-page relative z-10 py-14 sm:py-20">
          <Breadcrumbs items={[{ label: t.nav.requirements }]} locale={locale} />
          <h1 className="mt-6 max-w-4xl text-4xl font-bold leading-tight sm:text-6xl">{p.title}</h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">{p.intro}</p>
        </div>
      </div>

      <Section eyebrow={p.listEyebrow} title={p.listTitle}>
        <RequirementsList locale={locale} />
      </Section>

      <Section eyebrow={p.mistakesEyebrow} title={p.mistakesTitle} className="bg-slate-50">
        <ul className="grid gap-6 md:grid-cols-2">
          {p.mistakes.map((item) => (
            <li key={item.title} className="card">
              <h3 className="text-base font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.body}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section eyebrow={p.nextEyebrow} title={p.nextTitle}>
        <Steps locale={locale} />
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href={path('apply', locale)} className="btn-primary">
            {t.actions.start}
          </Link>
          <Link href={path('nationalities', locale)} className="btn-secondary">
            {t.actions.checkMyNationality}
          </Link>
        </div>
      </Section>

      <CtaSection locale={locale} />
    </>
  )
}
