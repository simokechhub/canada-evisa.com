import type { Locale } from '@/lib/i18n'
import { getDictionary } from '@/lib/dictionary'
import type { FaqItem } from '@/lib/nationality-faq'

export default function FaqAccordion({
  locale,
  limit,
  items,
}: {
  locale: Locale
  limit?: number
  /** Questions propres à la page ; à défaut, la FAQ générique du site. */
  items?: FaqItem[]
}) {
  const faqs = items ?? getDictionary(locale).faqs
  const list = limit ? faqs.slice(0, limit) : faqs

  return (
    <div className="mx-auto max-w-4xl space-y-3">
      {list.map((faq) => (
        <details key={faq.question} className="group rounded-2xl border border-ocean-950/[0.08] bg-white px-6 py-5 shadow-card open:border-ocean-200 open:bg-ocean-50/40">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[15px] font-bold text-ocean-950 marker:hidden sm:text-base">
            {faq.question}
            <svg
              aria-hidden
              viewBox="0 0 24 24"
              className="h-9 w-9 shrink-0 rounded-full bg-ocean-50 p-2 text-ocean-600 transition group-open:rotate-45 group-open:bg-ocean-950 group-open:text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M12 5v14M5 12h14" strokeLinecap="round" />
            </svg>
          </summary>
          <p className="mt-4 max-w-3xl pr-10 text-sm leading-relaxed text-slate-600">{faq.answer}</p>
        </details>
      ))}
    </div>
  )
}
