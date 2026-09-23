import type { Locale } from '@/lib/i18n'
import { getDictionary } from '@/lib/dictionary'

export default function RequirementsList({
  locale,
  limit,
}: {
  locale: Locale
  limit?: number
}) {
  const t = getDictionary(locale)
  const list = limit ? t.requirements.slice(0, limit) : t.requirements

  return (
    <ul className="grid gap-5 md:grid-cols-2">
      {list.map((item) => (
        <li key={item.title} className="card group flex gap-4 transition duration-300 hover:-translate-y-0.5 hover:border-ocean-300">
          <span
            aria-hidden
            className={`mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl transition group-hover:rotate-3 ${
              item.mandatory ? 'bg-sand-400 text-white' : 'bg-sand-100 text-sand-500'
            }`}
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.2">
              {item.mandatory ? (
                <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
              ) : (
                <path d="M12 8v5m0 3.5h.01" strokeLinecap="round" />
              )}
            </svg>
          </span>
          <div>
            <h3 className="text-base font-bold">
              {item.title}
              {!item.mandatory && (
                <span className="ml-2 align-middle text-[11px] font-medium uppercase tracking-wide text-sand-500">
                  {t.optionalTag}
                </span>
              )}
            </h3>
            <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{item.description}</p>
          </div>
        </li>
      ))}
    </ul>
  )
}
