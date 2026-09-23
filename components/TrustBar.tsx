import { format, type Locale } from '@/lib/i18n'
import { getDictionary } from '@/lib/dictionary'
import { nationalityCount } from '@/lib/nationalities'

export default function TrustBar({ locale }: { locale: Locale }) {
  const items = getDictionary(locale).trust

  return (
    <div className="relative z-10 -mt-1 border-y border-ocean-950/[0.08] bg-white/95 text-ocean-950 shadow-[0_12px_36px_-30px_rgba(22,23,28,.35)]">
      {/*
        Deux colonnes en dessous de lg, quatre au-dessus : le séparateur vertical
        et le retrait gauche dépendent donc de la position de l'élément dans sa
        ligne, pas seulement de son rang (un `divide-x` marquait à tort le 3ᵉ
        élément, qui ouvre la deuxième ligne sur mobile et tablette).
      */}
      <div className="container-page grid grid-cols-2 gap-y-6 py-7 lg:grid-cols-4 lg:gap-y-0">
        {items.map((item) => (
          <div
            key={item.label}
            className="border-ocean-950/10 px-4 odd:pl-0 even:border-l sm:px-7 sm:odd:pl-0 lg:[&:nth-child(3)]:border-l lg:[&:nth-child(3)]:pl-7"
          >
            <p className="text-2xl font-bold text-ocean-700 sm:text-3xl">
              {format(item.value, { count: nationalityCount })}
            </p>
            <p className="mt-1 text-xs leading-snug text-slate-600 sm:text-sm">{item.label}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
