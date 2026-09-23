import type { ReactNode } from 'react'

type Props = {
  eyebrow?: string
  title?: string
  description?: string
  children: ReactNode
  className?: string
  id?: string
  align?: 'left' | 'center'
}

export default function Section({
  eyebrow,
  title,
  description,
  children,
  className = '',
  id,
  align = 'left',
}: Props) {
  const heading = align === 'center' ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'

  return (
    <section id={id} className={`py-16 sm:py-24 ${className}`}>
      <div className="container-page">
        {(eyebrow || title || description) && (
          <div className={`mb-12 ${heading}`}>
            {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
            {title && <h2 className="text-3xl font-bold leading-[1.08] sm:text-5xl">{title}</h2>}
            {description && <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">{description}</p>}
          </div>
        )}
        {children}
      </div>
    </section>
  )
}
