import Link from 'next/link'
import { format, type Locale } from '@/lib/i18n'
import { getDictionary } from '@/lib/dictionary'
import { nationalityPath } from '@/lib/routes'
import type { Nationality } from '@/lib/nationalities'

export default function NationalityGrid({
  items,
  locale,
}: {
  items: Nationality[]
  locale: Locale
}) {
  const t = getDictionary(locale)

  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <li key={item.slug}>
          <Link
            href={nationalityPath(item.slug, locale)}
            className="card group relative flex h-full flex-col overflow-hidden transition duration-300 hover:-translate-y-1 hover:border-ocean-300 hover:shadow-xl"
          >
            <span className="eyebrow">{item.region}</span>
            <span aria-hidden className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full bg-ocean-50 text-ocean-700 transition group-hover:bg-ocean-950 group-hover:text-white">→</span>
            <span className="mt-3 pr-10 text-lg font-bold text-ocean-950 group-hover:text-ocean-700">
              {item.countryShort}
            </span>
            <span className="mt-1.5 flex-1 text-sm leading-relaxed text-slate-600">
              {format(t.nationalitiesPage.cardText, { demonym: item.demonym })}
            </span>
            <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-ocean-700">
              {t.actions.viewPage}
              <svg
                aria-hidden
                viewBox="0 0 24 24"
                className="hidden h-4 w-4 transition group-hover:translate-x-0.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  )
}
