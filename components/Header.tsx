'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import Logo from '@/components/Logo'
import LanguageSwitcher from '@/components/LanguageSwitcher'
import type { Locale } from '@/lib/i18n'
import { getDictionary } from '@/lib/dictionary'
import { path, type RouteKey } from '@/lib/routes'

const navKeys: RouteKey[] = [
  'apply',
  'requirements',
  'nationalities',
  'guides',
  'faq',
]

export default function Header({ locale }: { locale: Locale }) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const t = getDictionary(locale)

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  const nav = navKeys.map((key) => ({
    href: path(key, locale),
    label: t.nav[key as keyof typeof t.nav],
  }))

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`)

  /**
   * Menu complet à partir de xl (1280 px) : en dessous, les six liens, le
   * sélecteur de langue et les deux boutons ne tiennent pas sur une ligne,
   * on bascule donc sur le menu repliable.
   */
  return (
    <header className="sticky top-0 z-40 border-b border-ocean-950/[0.08] bg-white/85 backdrop-blur-xl">
      <div className="container-page flex h-[4.75rem] items-center justify-between gap-4">
        <Logo locale={locale} />

        <nav aria-label={t.header.mainNav} className="hidden xl:block">
          <ul className="flex items-center gap-0.5">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? 'page' : undefined}
                  className={`whitespace-nowrap rounded-full px-3 py-2 text-[13px] font-medium transition ${
                    isActive(item.href)
                      ? 'bg-ocean-50 font-semibold text-ocean-900'
                      : 'text-slate-600 hover:bg-ocean-50 hover:text-ocean-900'
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center gap-3 xl:flex">
          <LanguageSwitcher locale={locale} />
          <Link
            href={path('tracking', locale)}
            aria-current={isActive(path('tracking', locale)) ? 'page' : undefined}
            className="whitespace-nowrap rounded-full border border-slate-200 px-4 py-2 text-[13px] font-medium text-ocean-900 transition hover:border-ocean-300 hover:bg-ocean-50"
          >
            {t.footer.links.tracking}
          </Link>
          <Link href={path('apply', locale)} className="btn-primary whitespace-nowrap !px-5 !py-2.5">
            {t.actions.start}
            <span aria-hidden>→</span>
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="menu-mobile"
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-ocean-900 xl:hidden"
        >
          <span className="sr-only">{open ? t.header.closeMenu : t.header.openMenu}</span>
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div id="menu-mobile" className="border-t border-slate-200 bg-white xl:hidden">
          <nav aria-label={t.header.mobileNav} className="container-page py-3">
            <ul className="space-y-1">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? 'page' : undefined}
                    className={`block rounded-xl px-3 py-2.5 text-sm ${
                      isActive(item.href)
                        ? 'bg-ocean-50 font-semibold text-ocean-800'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <Link href={path('apply', locale)} className="btn-primary mt-3 w-full">
              {t.actions.start}
            </Link>
            <Link href={path('tracking', locale)} className="btn-secondary mt-2 w-full">
              {t.footer.links.tracking}
            </Link>
            <div className="mt-3">
              <LanguageSwitcher locale={locale} />
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
