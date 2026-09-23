import type { Locale } from '@/lib/i18n'
import { getDictionary } from '@/lib/dictionary'
import { site } from '@/lib/site'

export default function DisclaimerBanner({ locale }: { locale: Locale }) {
  const t = getDictionary(locale).banner
  const officialUrl = locale === 'fr' ? site.officialPortalFr : site.officialPortal

  return (
    <div className="border-b border-ocean-950/10 bg-ocean-950 text-white">
      <div className="container-page flex flex-wrap items-center justify-center gap-x-2 gap-y-1 py-2 text-center text-[11px] sm:text-xs">
        <span className="font-semibold">{t.strong}</span>
        <span className="text-ocean-100">
          {t.text}{' '}
          <a
            href={officialUrl}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="font-medium underline decoration-sand-400 underline-offset-2 hover:text-white"
          >
            {t.link}
          </a>
          .
        </span>
      </div>
    </div>
  )
}
