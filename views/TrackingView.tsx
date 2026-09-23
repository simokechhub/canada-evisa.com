import Link from 'next/link'
import Breadcrumbs from '@/components/Breadcrumbs'
import Section from '@/components/Section'
import TrackingForm from '@/components/TrackingForm'
import type { Locale } from '@/lib/i18n'
import { getDictionary } from '@/lib/dictionary'
import { path } from '@/lib/routes'

export default function TrackingView({ locale }: { locale: Locale }) {
  const t = getDictionary(locale)
  const p = t.trackingPage

  return (
    <>
      <div className="page-hero">
        <div className="container-page relative z-10 py-14 sm:py-20">
          <Breadcrumbs items={[{ label: p.title }]} locale={locale} />
          <h1 className="mt-5 text-3xl font-semibold sm:text-4xl">{p.title}</h1>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-slate-600">
            {p.intro}{' '}
            <Link
              href={path('contact', locale)}
              className="font-medium text-ocean-700 underline underline-offset-2"
            >
              {p.introLink}
            </Link>
            .
          </p>
        </div>
      </div>

      <Section>
        <div className="mx-auto max-w-5xl">
          <TrackingForm locale={locale} />
          <aside className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <h2 className="text-base font-semibold">{p.statesTitle}</h2>
            <ol className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {p.states.map((state, index) => (
                <li key={state.label} className="flex gap-3">
                  <span
                    aria-hidden
                    className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-ocean-50 text-xs font-semibold text-ocean-700"
                  >
                    {index + 1}
                  </span>
                  <span>
                    <span className="block text-sm font-medium text-ocean-950">{state.label}</span>
                    <span className="mt-0.5 block text-sm text-slate-600">{state.body}</span>
                  </span>
                </li>
              ))}
            </ol>
          </aside>
        </div>
      </Section>
    </>
  )
}
