import Link from 'next/link'
import type { Locale } from '@/lib/i18n'
import { getDictionary } from '@/lib/dictionary'
import { path } from '@/lib/routes'

export default function CtaSection({
  locale,
  title,
  description,
}: {
  locale: Locale
  title?: string
  description?: string
}) {
  const t = getDictionary(locale)

  return (
    <section className="py-16 sm:py-24">
      <div className="container-page">
        <div className="relative overflow-hidden rounded-[2rem] border border-ocean-200 bg-gradient-to-br from-ocean-50 via-white to-sand-50 px-6 py-14 text-center shadow-[0_35px_90px_-50px_rgba(22,23,28,.35)] sm:px-12 sm:py-20">
          <div aria-hidden className="absolute -left-24 -top-32 h-80 w-80 rounded-full bg-ocean-200/50 blur-3xl" />
          <div aria-hidden className="absolute -bottom-28 -right-16 h-72 w-72 rounded-full bg-sand-200/60 blur-3xl" />
          <div className="relative">
          <p className="eyebrow mb-4">Canada · eTA</p>
          <h2 className="mx-auto max-w-3xl text-3xl font-bold leading-tight text-ocean-950 sm:text-5xl">
            {title ?? t.cta.title}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-slate-600">
            {description ?? t.cta.description}
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href={path('apply', locale)}
              className="btn bg-sand-400 px-8 text-white hover:bg-sand-300"
            >
              {t.actions.start}
            </Link>
          </div>
          <p className="mt-6 text-xs text-slate-500">{t.hours}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
