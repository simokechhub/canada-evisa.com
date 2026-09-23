import HomeView from '@/views/HomeView'

const locale = 'en' as const

export default function Page() {
  return <HomeView locale={locale} />
}
