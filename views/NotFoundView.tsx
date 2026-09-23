import Link from 'next/link'
import type { Locale } from '@/lib/i18n'
import { getDictionary } from '@/lib/dictionary'
import { getNationalities } from '@/lib/nationalities'
import { nationalityPath, path } from '@/lib/routes'

export default function NotFoundView({ locale }: { locale: Locale }) {
  const t = getDictionary(locale)
  const p = t.notFound
  const suggestions = getNationalities(locale).slice(0, 6)

  return (
    <div className="container-page py-20 text-center sm:py-28">
      <p className="eyebrow">{p.eyebrow}</p>
      <h1 className="mt-3 text-3xl font-semibold sm:text-4xl">{p.title}</h1>
      <p className="mx-auto mt-4 max-w-lg text-[15px] leading-relaxed text-slate-600">{p.text}</p>

      <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <Link href={path('home', locale)} className="btn-primary">
          {t.actions.backHome}
        </Link>
        <Link href={path('apply', locale)} className="btn-secondary">
          {t.nav.apply}
        </Link>
      </div>

      <ul className="mx-auto mt-12 flex max-w-2xl flex-wrap justify-center gap-x-5 gap-y-2 text-sm">
        {suggestions.map((item) => (
          <li key={item.slug}>
            <Link
              href={nationalityPath(item.slug, locale)}
              className="text-ocean-700 underline decoration-ocean-200 underline-offset-2 hover:text-ocean-900"
            >
              {item.countryShort}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
