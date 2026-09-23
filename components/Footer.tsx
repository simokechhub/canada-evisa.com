import Link from 'next/link'
import Logo from '@/components/Logo'
import { format, type Locale } from '@/lib/i18n'
import { getDictionary } from '@/lib/dictionary'
import { nationalityPath, path, type RouteKey } from '@/lib/routes'
import { getNationalities, nationalityCount } from '@/lib/nationalities'
import { site } from '@/lib/site'

type Column = { title: string; links: { key: RouteKey; label: string }[] }

export default function Footer({ locale }: { locale: Locale }) {
  const t = getDictionary(locale)
  const f = t.footer
  /**
   * Choix éditorial : les marchés francophones prioritaires, mis en avant sur
   * tout le site. L'équilibrage du maillage entre les 26 pays est assuré
   * ailleurs, par la rotation de `relatedNationalities`.
   */
  const popular = getNationalities(locale).slice(0, 10)

  const columns: Column[] = [
    {
      title: f.columns.process,
      links: [
        { key: 'apply', label: f.links.apply },
        { key: 'requirements', label: f.links.requirements },
        { key: 'tracking', label: f.links.tracking },
      ],
    },
    {
      title: f.columns.info,
      links: [
        { key: 'guides', label: f.links.guides },
        { key: 'faq', label: f.links.faq },
        { key: 'nationalities', label: f.links.nationalities },
        { key: 'contact', label: f.links.contact },
      ],
    },
    {
      title: f.columns.site,
      links: [
        { key: 'legalNotice', label: f.links.legalNotice },
        { key: 'privacy', label: f.links.privacy },
        { key: 'terms', label: f.links.terms },
      ],
    },
  ]

  return (
    <footer className="mt-16 overflow-hidden border-t border-white/10 bg-ocean-900 text-slate-300">
      <div className="container-page py-16">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_repeat(3,1fr)]">
          <div>
            <Logo locale={locale} inverted />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-ocean-100/70">
              {format(f.tagline, { hours: t.hours })}
            </p>
            <dl className="mt-5 space-y-1.5 text-sm">
              <div>
                <dt className="sr-only">{f.emailLabel}</dt>
                <dd>
                  <a href={`mailto:${site.email}`} className="hover:text-white">
                    {site.email}
                  </a>
                </dd>
              </div>
            </dl>
          </div>

          {columns.map((column) => (
            <div key={column.title}>
              <h2 className="text-sm font-semibold text-white">{column.title}</h2>
              <ul className="mt-4 space-y-2.5 text-sm">
                {column.links.map((link) => (
                  <li key={link.key}>
                    <Link
                      href={path(link.key, locale)}
                      className="text-slate-400 transition hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 border-t border-white/10 pt-8">
          <h2 className="text-sm font-semibold text-white">{f.popular}</h2>
          <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-400">
            {popular.map((item) => (
              <li key={item.slug}>
                <Link
                  href={nationalityPath(item.slug, locale)}
                  className="transition hover:text-white"
                >
                  {item.countryShort}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href={path('nationalities', locale)}
                className="font-medium text-ocean-300 hover:text-white"
              >
                {format(t.actions.allNationalities, { count: nationalityCount })}
              </Link>
            </li>
          </ul>
        </div>

        <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-5 text-sm leading-relaxed text-slate-300">
          <p className="font-semibold text-white">{f.independenceTitle}</p>
          <p className="mt-2">{t.disclaimer}</p>
          <p className="mt-2">
            {f.officialPortal} :{' '}
            <a
              href={locale === 'fr' ? site.officialPortalFr : site.officialPortal}
              rel="noopener noreferrer nofollow"
              target="_blank"
              className="underline decoration-slate-500 underline-offset-2 hover:text-white"
            >
              canada.ca
            </a>
          </p>
        </div>

        <p className="mt-8 text-xs text-slate-500">
          © {new Date().getFullYear()} {site.legalName}. {f.rights}
        </p>
      </div>
    </footer>
  )
}
