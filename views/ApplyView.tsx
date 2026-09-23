import Link from 'next/link'
import ApplicationForm from '@/components/ApplicationForm'
import Breadcrumbs from '@/components/Breadcrumbs'
import type { Locale } from '@/lib/i18n'
import { getDictionary } from '@/lib/dictionary'
import { getFormSteps } from '@/lib/form-fields'
import { path } from '@/lib/routes'

export default async function ApplyView({ locale }: { locale: Locale }) {
  const t = getDictionary(locale)
  const steps = await getFormSteps()

  return (
    <>
      <div className="page-hero">
        <div className="container-page relative z-10 py-14 sm:py-20">
          <Breadcrumbs items={[{ label: t.nav.apply }]} locale={locale} />
          <h1 className="mt-6 max-w-4xl text-4xl font-bold leading-tight sm:text-6xl">{t.applyPage.title}</h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
            {t.applyPage.intro}{' '}
            <Link
              href={path('requirements', locale)}
              className="font-medium text-ocean-700 underline underline-offset-2"
            >
              {t.applyPage.introLink}
            </Link>
            .
          </p>
        </div>
      </div>

      <div className="container-page py-12 sm:py-16">
        <ApplicationForm locale={locale} steps={steps} />
      </div>
    </>
  )
}
