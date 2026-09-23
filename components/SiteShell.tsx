import Header from '@/components/Header'
import DisclaimerBanner from '@/components/DisclaimerBanner'
import Footer from '@/components/Footer'
import TawkChat from '@/components/TawkChat'
import type { Locale } from '@/lib/i18n'
import { getDictionary } from '@/lib/dictionary'

/** Chrome commun aux deux versions linguistiques du site. */
export default function SiteShell({
  locale,
  children,
}: {
  locale: Locale
  children: React.ReactNode
}) {
  const t = getDictionary(locale)

  return (
    <body className="flex min-h-screen flex-col font-sans">
      <a
        href="#contenu"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-ocean-800 focus:shadow-lg"
      >
        {t.header.skipToContent}
      </a>
      <DisclaimerBanner locale={locale} />
      <Header locale={locale} />
      <main id="contenu" className="flex-1">
        {children}
      </main>
      <Footer locale={locale} />
      <TawkChat />
    </body>
  )
}
