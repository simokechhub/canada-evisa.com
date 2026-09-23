import Link from 'next/link'
import { format, type Locale } from '@/lib/i18n'
import { getDictionary } from '@/lib/dictionary'
import { path } from '@/lib/routes'
import { MAPLE_LEAF_PATH } from '@/lib/maple-leaf'
import { site } from '@/lib/site'

export default function Logo({
  locale,
  inverted = false,
}: {
  locale: Locale
  inverted?: boolean
}) {
  const t = getDictionary(locale)

  return (
    <Link
      href={path('home', locale)}
      className="inline-flex items-center gap-3"
      aria-label={format(t.header.logoAria, { name: site.name })}
    >
      <span
        aria-hidden
        className={`h-10 w-12 overflow-hidden rounded-[12px] border shadow-[0_8px_20px_-10px_rgba(22,23,28,.7)] ${
          inverted ? 'border-white/20' : 'border-slate-200'
        }`}
      >
        {/* Drapeau du Canada, recadré au centre pour tenir dans la pastille. */}
        <svg viewBox="-2400 0 9600 4800" preserveAspectRatio="xMidYMid slice" className="h-full w-full">
          <rect x="-2400" width="9600" height="4800" fill="#d52b1e" />
          <rect width="4800" height="4800" fill="#ffffff" />
          <path fill="#d52b1e" d={MAPLE_LEAF_PATH} />
        </svg>
      </span>
      <span className="leading-tight">
        <span className={`block text-base font-bold tracking-[-0.03em] ${inverted ? 'text-white' : 'text-ocean-950'}`}>
          {site.name}
        </span>
      </span>
    </Link>
  )
}
