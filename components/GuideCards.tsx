import Link from 'next/link'
import { format, type Locale } from '@/lib/i18n'
import { getDictionary } from '@/lib/dictionary'
import type { Guide } from '@/lib/guides'
import { guidePath } from '@/lib/routes'

/** Grille d'articles, partagée par le hub, les pages pays et les fins d'article. */
export default function GuideCards({
  guides,
  locale,
}: {
  guides: Guide[]
  locale: Locale
}) {
  const t = getDictionary(locale)

  return (
    <ul className="grid gap-6 md:grid-cols-3">
      {guides.map((guide) => (
        <li key={guide.slug}>
          <Link
            href={guidePath(guide.slug, locale)}
            className="card group flex h-full flex-col transition duration-300 hover:-translate-y-1 hover:border-ocean-300 hover:shadow-xl"
          >
            <span className="eyebrow">{guide.category}</span>
            <h3 className="mt-3 text-xl font-bold group-hover:text-ocean-700">{guide.title}</h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">{guide.excerpt}</p>
            <span className="mt-4 text-xs text-slate-500">
              {format(t.guidesPage.reading, { time: guide.readingTime })}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  )
}
