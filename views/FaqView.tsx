import Link from 'next/link'
import Section from '@/components/Section'
import FaqAccordion from '@/components/FaqAccordion'
import Breadcrumbs from '@/components/Breadcrumbs'
import CtaSection from '@/components/CtaSection'
import JsonLd from '@/components/JsonLd'
import type { Locale } from '@/lib/i18n'
import { getDictionary } from '@/lib/dictionary'
import { path } from '@/lib/routes'

export default function FaqView({ locale }: { locale: Locale }) {
  const t = getDictionary(locale)
  const p = t.faqPage

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    inLanguage: locale,
    mainEntity: t.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  }

  return (
    <>
      <JsonLd data={schema} />

      <div className="page-hero">
        <div className="container-page relative z-10 py-14 sm:py-20">
          <Breadcrumbs items={[{ label: t.nav.faq }]} locale={locale} />
          <h1 className="mt-5 text-3xl font-semibold sm:text-4xl">{p.title}</h1>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-slate-600">
            {p.intro}{' '}
            <Link
              href={path('contact', locale)}
              className="font-medium text-ocean-700 underline underline-offset-2"
            >
              {p.introLink}
            </Link>
            {p.introEnd}
          </p>
        </div>
      </div>

      <Section>
        <FaqAccordion locale={locale} />
      </Section>

      <CtaSection locale={locale} />
    </>
  )
}
