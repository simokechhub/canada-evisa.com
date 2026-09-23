import Link from 'next/link'
import Hero from '@/components/Hero'
import Section from '@/components/Section'
import Steps from '@/components/Steps'
import TrustBar from '@/components/TrustBar'
import FaqAccordion from '@/components/FaqAccordion'
import RequirementsList from '@/components/RequirementsList'
import NationalityGrid from '@/components/NationalityGrid'
import CtaSection from '@/components/CtaSection'
import JsonLd from '@/components/JsonLd'
import { format, type Locale } from '@/lib/i18n'
import { getDictionary } from '@/lib/dictionary'
import { getNationalities, nationalityCount } from '@/lib/nationalities'
import { path } from '@/lib/routes'
import { organizationSchema, websiteSchema } from '@/lib/schema'

export default function HomeView({ locale }: { locale: Locale }) {
  const t = getDictionary(locale)
  const h = t.home
  const featured = getNationalities(locale).slice(0, 6)

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    inLanguage: locale,
    mainEntity: t.faqs.slice(0, 6).map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  }

  return (
    <>
      <JsonLd data={organizationSchema(locale)} />
      <JsonLd data={websiteSchema(locale)} />
      <JsonLd data={faqSchema} />
      <Hero locale={locale} />
      <TrustBar locale={locale} />

      <Section eyebrow={h.stepsEyebrow} title={h.stepsTitle} description={h.stepsText}>
        <Steps locale={locale} />
      </Section>

      <Section
        eyebrow={h.requirementsEyebrow}
        title={h.requirementsTitle}
        description={h.requirementsText}
        className="bg-slate-50"
      >
        <RequirementsList locale={locale} limit={4} />
        <div className="mt-8">
          <Link href={path('requirements', locale)} className="btn-secondary">
            {t.actions.seeFullList}
          </Link>
        </div>
      </Section>

      <Section
        eyebrow={h.nationalitiesEyebrow}
        title={h.nationalitiesTitle}
        description={h.nationalitiesText}
      >
        <NationalityGrid items={featured} locale={locale} />
        <div className="mt-8">
          <Link href={path('nationalities', locale)} className="btn-secondary">
            {format(t.actions.allNationalities, { count: nationalityCount })}
          </Link>
        </div>
      </Section>

      <Section eyebrow={h.faqEyebrow} title={h.faqTitle} align="center">
        <FaqAccordion locale={locale} limit={6} />
        <div className="mt-8 text-center">
          <Link href={path('faq', locale)} className="btn-secondary">
            {t.actions.allQuestions}
          </Link>
        </div>
      </Section>

      <CtaSection locale={locale} />
    </>
  )
}
