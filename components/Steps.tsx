import type { Locale } from '@/lib/i18n'
import { getDictionary } from '@/lib/dictionary'

export default function Steps({ locale }: { locale: Locale }) {
  const steps = getDictionary(locale).steps

  return (
    <ol className="relative grid gap-5 md:grid-cols-2 lg:grid-cols-4">
      {steps.map((step, index) => (
        <li key={step.title} className="card group relative overflow-hidden transition duration-300 hover:-translate-y-1 hover:border-ocean-300">
          <span aria-hidden className="absolute -right-2 -top-8 text-[7rem] font-black text-ocean-950/[0.035]">{index + 1}</span>
          <span
            aria-hidden
            className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sand-400 text-sm font-bold text-white shadow-lg transition group-hover:rotate-3"
          >
            {index + 1}
          </span>
          <h3 className="mt-6 text-lg font-bold">{step.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">{step.description}</p>
        </li>
      ))}
    </ol>
  )
}
