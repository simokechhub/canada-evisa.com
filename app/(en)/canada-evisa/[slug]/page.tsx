import type { Metadata } from 'next'
import NationalityView from '@/views/NationalityView'
import { format } from '@/lib/i18n'
import { getDictionary } from '@/lib/dictionary'
import { buildMetadata } from '@/lib/metadata'
import { getNationality, nationalityRecords } from '@/lib/nationalities'
import { nationalityPath } from '@/lib/routes'

const locale = 'en' as const

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return nationalityRecords.map((record) => ({ slug: record.slug[locale] }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const data = getNationality(slug, locale)
  const t = getDictionary(locale)
  if (!data) return { title: t.notFound.metaTitle }

  const vars = {
    demonym: data.demonym,
    nationality: data.nationality,
    adjective: data.adjective,
    country: data.country,
    countryShort: data.countryShort,
  }

  return buildMetadata({
    locale,
    title: format(t.nationalityPage.metaTitle, vars),
    description: format(t.nationalityPage.metaDescription, vars),
    type: 'article',
    absoluteTitle: true,
    paths: {
      fr: nationalityPath(data.slugs.fr, 'fr'),
      en: nationalityPath(data.slugs.en, 'en'),
    },
  })
}

export default async function Page({ params }: Props) {
  const { slug } = await params
  return <NationalityView locale={locale} slug={slug} />
}
