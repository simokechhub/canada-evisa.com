import Image from 'next/image'
import Link from 'next/link'
import type { Locale } from '@/lib/i18n'
import { getDictionary } from '@/lib/dictionary'
import { MAPLE_LEAF_PATH } from '@/lib/maple-leaf'
import { path } from '@/lib/routes'

/**
 * Photo du hero, à déposer dans public/images/ (ex. '/images/canada-hero.webp').
 * `null` affiche le fond de remplacement.
 */
const HERO_IMAGE: string | null = null

export default function Hero({ locale }: { locale: Locale }) {
  const t = getDictionary(locale)
  const h = t.home

  return (
    <section className="relative min-h-[720px] overflow-hidden bg-ocean-50">
      {/*
        Élément LCP de la page. `next/image` sert une taille adaptée à l'écran
        (un mobile ne télécharge plus la version 1920 px) en AVIF/WebP, et
        `priority` la précharge dès l'en-tête du document. Qualité 60 : l'image
        est en grande partie couverte par un dégradé blanc, la perte ne se voit pas.
      */}
      {HERO_IMAGE ? (
        <Image
          src={HERO_IMAGE}
          alt=""
          fill
          priority
          fetchPriority="high"
          quality={60}
          sizes="100vw"
          className="object-cover object-[68%_center]"
        />
      ) : (
        // En attendant la photo : fond clair et feuille d'érable en filigrane.
        <div aria-hidden className="absolute inset-0 overflow-hidden bg-gradient-to-br from-white via-ocean-50 to-ocean-100">
          <svg viewBox="0 0 4800 4800" className="absolute -right-24 top-1/2 h-[140%] -translate-y-1/2 opacity-[0.08] sm:right-0 lg:h-[125%]">
            <path fill="#d52b1e" d={MAPLE_LEAF_PATH} />
          </svg>
        </div>
      )}
      <div aria-hidden className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,.97)_0%,rgba(251,250,250,.94)_38%,rgba(250,244,244,.5)_66%,rgba(22,23,28,.06)_100%)]" />
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white/45 to-transparent" />
      <div className="container-page relative flex min-h-[720px] items-center py-16 sm:py-24">
        <div className="w-full">
          <div className="max-w-3xl">
            <p className="inline-flex items-center gap-2 rounded-full border border-ocean-950/10 bg-white/75 px-4 py-2 text-xs font-semibold text-ocean-800 shadow-sm backdrop-blur-md">
              <span aria-hidden className="h-2 w-2 rounded-full bg-sand-400 shadow-[0_0_0_4px_rgba(213,43,30,.16)]" />
              {h.heroBadge}
            </p>

            <h1 className="mt-7 max-w-3xl text-5xl font-bold leading-[1.02] tracking-[-0.055em] text-ocean-950 sm:text-6xl lg:text-7xl">
              {h.heroTitle}
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-700 sm:text-xl">
              {h.heroText}
            </p>

            <ul className="mt-7 flex flex-wrap gap-x-6 gap-y-3">
              {h.heroBullets.map((bullet) => (
                <li key={bullet} className="flex items-start gap-2 text-sm font-semibold text-ocean-950">
                  <svg
                    aria-hidden
                    viewBox="0 0 24 24"
                    className="mt-0.5 h-4 w-4 shrink-0 text-sand-500"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.4"
                  >
                    <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {bullet}
                </li>
              ))}
            </ul>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href={path('apply', locale)}
                className="btn bg-sand-400 px-8 text-white shadow-[0_14px_35px_-12px_rgba(213,43,30,.55)] hover:-translate-y-0.5 hover:bg-sand-300"
              >
                {t.actions.start}
                <span aria-hidden>→</span>
              </Link>
              <Link
                href={path('requirements', locale)}
                className="btn border border-ocean-950/15 bg-white/75 text-ocean-950 shadow-sm backdrop-blur hover:bg-white"
              >
                {t.actions.seeRequirements}
              </Link>
              <Link
                href={path('tracking', locale)}
                className="btn border border-ocean-950/15 bg-white/75 text-ocean-950 shadow-sm backdrop-blur hover:bg-white"
              >
                {t.footer.links.tracking}
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
