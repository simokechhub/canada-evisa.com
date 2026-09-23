import HomeView from '@/views/HomeView'

const locale = 'fr' as const

export default function Page() {
  return <HomeView locale={locale} />
}
