import Breadcrumbs from '@/components/Breadcrumbs'
import { format, type Locale } from '@/lib/i18n'
import { getDictionary, type LegalBlock } from '@/lib/dictionary'
import {
  formatCad,
  formatUsd,
  OFFICIAL_FEE_CAD,
  OFFICIAL_FEE_USD,
  SERVICE_FEE_USD,
  site,
  TOTAL_FEE_USD,
} from '@/lib/site'

/** Rendu commun aux mentions légales, à la confidentialité et aux CGS. */
export default function LegalPage({
  locale,
  title,
  blocks,
}: {
  locale: Locale
  title: string
  blocks: LegalBlock[]
}) {
  const t = getDictionary(locale)
  const vars = {
    legalName: site.legalName,
    address: site.address,
    disclaimer: t.disclaimer,
  }

  return (
    <>
      <div className="page-hero">
        <div className="container-page relative z-10 py-14 sm:py-20">
          <Breadcrumbs items={[{ label: title }]} locale={locale} />
          <h1 className="mt-5 text-3xl font-semibold sm:text-4xl">{title}</h1>
          <p className="mt-3 text-sm text-slate-500">
            {t.legal.updatedLabel} {t.legal.updatedAt}
          </p>
        </div>
      </div>

      <div className="container-page py-12 sm:py-16">
        <div className="prose-page">
          {blocks.map((block, index) => {
            switch (block.kind) {
              case 'callout':
                return (
                  <p
                    key={index}
                    className="rounded-xl border border-sand-200 bg-sand-50 p-4 text-sm text-ocean-950"
                  >
                    <strong>{block.strong}</strong> {block.text}
                  </p>
                )
              case 'heading':
                return <h2 key={index}>{block.text}</h2>
              case 'paragraph':
                return <p key={index}>{format(block.text, vars)}</p>
              case 'list':
                return (
                  <ul key={index}>
                    {block.items.map((item) => (
                      <li key={item}>{format(item, vars)}</li>
                    ))}
                  </ul>
                )
              case 'contact':
                return (
                  <p key={index}>
                    <a href={`mailto:${site.email}`}>{site.email}</a>
                  </p>
                )
              case 'plans':
                return (
                  <ul key={index}>
                    <li>
                      {locale === 'fr' ? 'Redevance officielle IRCC : ' : 'Official IRCC fee: '}
                      {formatCad(OFFICIAL_FEE_CAD, locale)} ({formatUsd(OFFICIAL_FEE_USD, locale)})
                    </li>
                    <li>
                      {locale === 'fr' ? 'Frais de service : ' : 'Service fee: '}
                      {formatUsd(SERVICE_FEE_USD, locale)}
                    </li>
                    <li>
                      <strong>
                        {locale === 'fr' ? 'Total par voyageur : ' : 'Total per traveller: '}
                        {formatUsd(TOTAL_FEE_USD, locale)}
                      </strong>
                    </li>
                  </ul>
                )
              default:
                return null
            }
          })}
        </div>
      </div>
    </>
  )
}
