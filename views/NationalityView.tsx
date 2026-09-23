import Link from 'next/link'
import { notFound } from 'next/navigation'
import Section from '@/components/Section'
import RequirementsList from '@/components/RequirementsList'
import FaqAccordion from '@/components/FaqAccordion'
import NationalityGrid from '@/components/NationalityGrid'
import GuideCards from '@/components/GuideCards'
import Breadcrumbs from '@/components/Breadcrumbs'
import CtaSection from '@/components/CtaSection'
import JsonLd from '@/components/JsonLd'
import { format, type Locale } from '@/lib/i18n'
import { getDictionary } from '@/lib/dictionary'
import { getGuides } from '@/lib/guides'
import { nationalityFaqs } from '@/lib/nationality-faq'
import { getNationality, nationalityCount, relatedNationalities } from '@/lib/nationalities'
import { nationalityPath, path } from '@/lib/routes'
import { articleSchema } from '@/lib/schema'
import { formatCad, OFFICIAL_FEE_CAD, revised } from '@/lib/site'

export default function NationalityView({
  locale,
  slug,
}: {
  locale: Locale
  slug: string
}) {
  const data = getNationality(slug, locale)
  if (!data) notFound()

  const t = getDictionary(locale)
  const p = t.nationalityPage
  const template = t.templates[data.templateType]
  const related = relatedNationalities(data, locale)
  const vars = {
    demonym: data.demonym,
    country: data.country,
    countryShort: data.countryShort,
    nationality: data.nationality,
    adjective: data.adjective,
    season: data.highSeason,
  }

  const schema = articleSchema({
    locale,
    headline: format(p.metaTitle, vars),
    description: format(p.metaDescription, vars),
    url: nationalityPath(data.slug, locale),
    published: revised.nationalities,
    modified: revised.nationalities,
  })

  const faqs = nationalityFaqs(data, locale)
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    inLanguage: locale,
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  }

  /** Faits propres au pays : c'est ce qui distingue la page des 25 autres. */
  const facts = [
    { label: p.facts.nationality, value: data.nationality },
    { label: p.facts.authorisation, value: p.facts.required },
    { label: p.facts.officialFee, value: formatCad(OFFICIAL_FEE_CAD, locale) },
    { label: p.facts.flightDuration, value: data.flightDuration },
    { label: p.facts.timezone, value: data.timezone },
    { label: p.facts.currency, value: data.currency },
  ]

  return (
    <>
      <JsonLd data={schema} />
      <JsonLd data={faqSchema} />

      <div className="bg-ocean-950">
        <div className="container-page py-12 sm:py-16">
          <div className="[&_a]:text-ocean-300 [&_span]:text-ocean-200">
            <Breadcrumbs
              locale={locale}
              items={[
                { href: path('nationalities', locale), label: t.nav.nationalities },
                { label: data.countryShort },
              ]}
            />
          </div>

          <p className="eyebrow mt-6 text-ocean-300">{template.label}</p>
          <h1 className="mt-2 max-w-3xl text-3xl font-semibold text-white sm:text-4xl">
            {format(p.title, vars)}
          </h1>
          <p className="mt-4 max-w-2xl text-[16px] leading-relaxed text-ocean-100">
            {format(template.summary, vars)}
          </p>

          <dl className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {facts.map((item) => (
              <div key={item.label} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <dt className="text-xs uppercase tracking-wide text-ocean-300">{item.label}</dt>
                <dd className="mt-1.5 text-sm font-medium text-white">{item.value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href={path('apply', locale)}
              className="btn bg-white text-ocean-900 hover:bg-ocean-50"
            >
              {t.actions.start}
            </Link>
            <Link
              href={path('requirements', locale)}
              className="btn border border-white/25 text-white hover:bg-white/10"
            >
              {t.nav.requirements}
            </Link>
          </div>
        </div>
      </div>

      <Section eyebrow={format(p.beforeEyebrow, vars)} title={p.beforeTitle}>
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="card lg:col-span-2">
            <h3 className="text-lg font-semibold">{p.flightsTitle}</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-700">{data.flightInfo}</p>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              {format(p.routeText, vars)}
            </p>

            <dl className="mt-5 grid gap-4 border-t border-slate-200 pt-5 sm:grid-cols-2">
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  {p.airportsTitle}
                </dt>
                <dd className="mt-1.5 text-sm leading-relaxed text-slate-700">
                  {data.airports.join(' · ')}
                </dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  {p.carriersTitle}
                </dt>
                <dd className="mt-1.5 text-sm leading-relaxed text-slate-700">
                  {data.carriers.join(' · ')}
                </dd>
              </div>
            </dl>

            <p className="mt-5 text-sm leading-relaxed text-slate-600">
              <strong className="font-semibold text-ocean-950">{p.highSeasonStrong}</strong>{' '}
              {format(p.highSeasonText, vars)}
            </p>
          </div>

          <div className="space-y-6">
            <div className="card">
              <h3 className="text-base font-semibold">{p.passportTitle}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{data.passportNote}</p>
            </div>

            <div className={`card ${data.yellowFever ? 'border-sand-300 bg-sand-50' : ''}`}>
              <h3 className="text-base font-semibold">{p.healthTitle}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-700">
                {format(data.yellowFever ? p.healthRequired : p.healthNotRequired, vars)}
              </p>
            </div>

            {data.transitWarning && (
              <div className="card border-sand-300 bg-sand-50">
                <h3 className="text-base font-semibold">{p.watchTitle}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ocean-950">
                  {data.transitWarning}
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {template.focus.map((item) => (
            <div key={item.title} className="card">
              <h3 className="text-base font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section
        eyebrow={p.goodToKnowEyebrow}
        title={format(p.goodToKnowTitle, vars)}
        className="bg-slate-50"
      >
        {/* Informations pratiques propres au pays : ce qui distingue vraiment les pages. */}
        <div className="card mb-6">
          <h3 className="text-lg font-semibold">{format(p.tripIdeaTitle, vars)}</h3>
          <p className="mt-2 text-[15px] leading-relaxed text-slate-700">{data.tripIdea}</p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { title: p.usTripTitle, body: data.usTrip },
            { title: p.plugsTitle, body: data.plugs },
            { title: p.languageTitle, body: data.language },
          ].map((item) => (
            <div key={item.title} className="card">
              <h3 className="text-base font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.body}</p>
            </div>
          ))}
        </div>
        {data.specialNote && (
          <div className="card mt-6 border-sand-300 bg-sand-50">
            <h3 className="text-base font-semibold">{p.specialTitle}</h3>
            <p className="mt-2 text-sm leading-relaxed text-ocean-950">{data.specialNote}</p>
          </div>
        )}
      </Section>

      <Section eyebrow={p.docsEyebrow} title={format(p.docsTitle, vars)}>
        <RequirementsList locale={locale} limit={4} />
        <div className="mt-8">
          <Link href={path('requirements', locale)} className="btn-secondary">
            {t.actions.seeFullList}
          </Link>
        </div>
      </Section>


      <Section eyebrow={p.faqEyebrow} title={format(p.faqTitle, vars)} align="center">
        <FaqAccordion locale={locale} items={faqs} />
        <div className="mt-8 text-center">
          <Link href={path('faq', locale)} className="btn-secondary">
            {p.faqMore}
          </Link>
        </div>
      </Section>

      <Section eyebrow={p.guidesEyebrow} title={p.guidesTitle}>
        <GuideCards guides={getGuides(locale)} locale={locale} />
      </Section>

      <Section eyebrow={p.relatedEyebrow} title={p.relatedTitle} className="bg-slate-50">
        <NationalityGrid items={related} locale={locale} />
        <div className="mt-8">
          <Link href={path('nationalities', locale)} className="btn-secondary">
            {format(t.actions.allNationalities, { count: nationalityCount })}
          </Link>
        </div>
      </Section>

      <CtaSection
        locale={locale}
        title={format(p.ctaTitle, vars)}
        description={p.ctaText}
      />
    </>
  )
}
