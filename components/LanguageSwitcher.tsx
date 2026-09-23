'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { localeLabel, otherLocale, type Locale } from '@/lib/i18n'
import { getDictionary } from '@/lib/dictionary'
import { counterpart } from '@/lib/routes'

/**
 * Renvoie vers la même page dans l'autre langue quand elle existe,
 * vers l'accueil de cette langue sinon.
 */
export default function LanguageSwitcher({
  locale,
  className = '',
}: {
  locale: Locale
  className?: string
}) {
  const pathname = usePathname()
  const target = otherLocale(locale)
  const t = getDictionary(locale)

  return (
    <Link
      href={counterpart(pathname, target)}
      hrefLang={target}
      lang={target}
      title={t.header.switchLanguage}
      className={`inline-flex items-center gap-1.5 rounded-full border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 transition hover:border-ocean-300 hover:text-ocean-800 ${className}`}
    >
      <svg
        aria-hidden
        viewBox="0 0 24 24"
        className="h-3.5 w-3.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3c2.5 2.6 2.5 15 0 18M12 3c-2.5 2.6-2.5 15 0 18" />
      </svg>
      {localeLabel[target]}
    </Link>
  )
}
