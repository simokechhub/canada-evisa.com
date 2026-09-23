import Link from 'next/link'
import JsonLd from '@/components/JsonLd'
import type { Locale } from '@/lib/i18n'
import { getDictionary } from '@/lib/dictionary'
import { path } from '@/lib/routes'
import { breadcrumbSchema } from '@/lib/schema'

export type Crumb = { href?: string; label: string }

export default function Breadcrumbs({
  items,
  locale,
}: {
  items: Crumb[]
  locale: Locale
}) {
  const t = getDictionary(locale).breadcrumb
  const home = path('home', locale)

  /** Le balisage est dérivé du fil affiché : les deux ne peuvent pas diverger. */
  const schema = breadcrumbSchema([
    { name: t.home, url: home },
    ...items.map((item) => ({ name: item.label, url: item.href })),
  ])

  return (
    <>
      <JsonLd data={schema} />
      <nav aria-label={t.aria} className="text-xs text-slate-500">
        <ol className="flex flex-wrap items-center gap-1.5">
          <li>
            <Link href={home} className="hover:text-ocean-700">
              {t.home}
            </Link>
          </li>
          {items.map((item, index) => (
            <li key={`${item.label}-${index}`} className="flex items-center gap-1.5">
              <span aria-hidden className="text-slate-300">
                /
              </span>
              {item.href ? (
                <Link href={item.href} className="hover:text-ocean-700">
                  {item.label}
                </Link>
              ) : (
                <span className="font-medium text-slate-700" aria-current="page">
                  {item.label}
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  )
}
