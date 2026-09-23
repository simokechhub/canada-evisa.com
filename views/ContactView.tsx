import Breadcrumbs from '@/components/Breadcrumbs'
import Section from '@/components/Section'
import ContactForm from '@/components/ContactForm'
import { format, type Locale } from '@/lib/i18n'
import { getDictionary } from '@/lib/dictionary'
import { site } from '@/lib/site'

export default function ContactView({ locale }: { locale: Locale }) {
  const t = getDictionary(locale)
  const p = t.contactPage

  return (
    <>
      <div className="page-hero">
        <div className="container-page relative z-10 py-14 sm:py-20">
          <Breadcrumbs items={[{ label: p.title }]} locale={locale} />
          <h1 className="mt-5 text-3xl font-semibold sm:text-4xl">{p.title}</h1>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-slate-600">
            {format(p.intro, { hours: t.hours })}
          </p>
        </div>
      </div>

      <Section>
        <div className="grid gap-10 lg:grid-cols-[1fr_0.8fr]">
          <ContactForm locale={locale} />

          <aside className="space-y-6">
            <div className="card">
              <h2 className="text-base font-semibold">{p.emailTitle}</h2>
              <p className="mt-2 text-sm text-slate-600">
                <a href={`mailto:${site.email}`} className="font-medium text-ocean-700">
                  {site.email}
                </a>
                <br />
                {p.emailReply}
              </p>
            </div>

            <div className="card">
              <h2 className="text-base font-semibold">{p.addressTitle}</h2>
              <p className="mt-2 text-sm text-slate-600">{site.address}</p>
            </div>

            <div className="card border-sand-200 bg-sand-50">
              <h2 className="text-base font-semibold">{p.urgentTitle}</h2>
              <p className="mt-2 text-sm leading-relaxed text-ocean-950">{p.urgentText}</p>
            </div>
          </aside>
        </div>
      </Section>
    </>
  )
}
