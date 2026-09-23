import '@/app/globals.css'
import type { Metadata } from 'next'
import SiteShell from '@/components/SiteShell'
import { inter } from '@/lib/font'
import { htmlLang } from '@/lib/i18n'
import { rootMetadata } from '@/lib/metadata'

const locale = 'fr' as const

export const metadata: Metadata = rootMetadata(locale)

export default function FrenchRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={htmlLang[locale]} className={inter.variable}>
      <SiteShell locale={locale}>{children}</SiteShell>
    </html>
  )
}
