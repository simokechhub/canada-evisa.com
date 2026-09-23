import type { MDXComponents } from 'mdx/types'
import Link from 'next/link'

/**
 * Composants utilisés par le rendu MDX (guides éditoriaux).
 * Les classes reprennent la feuille `.prose-page` de `app/globals.css`.
 */
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1 className="mb-5 text-3xl font-semibold sm:text-4xl">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="mb-3 mt-10 text-2xl font-semibold">{children}</h2>
    ),
    h3: ({ children }) => <h3 className="mb-2 mt-8 text-lg font-semibold">{children}</h3>,
    p: ({ children }) => <p className="mb-4 leading-relaxed text-slate-700">{children}</p>,
    ul: ({ children }) => (
      <ul className="mb-4 list-disc space-y-2 pl-6 text-slate-700">{children}</ul>
    ),
    ol: ({ children }) => (
      <ol className="mb-4 list-decimal space-y-2 pl-6 text-slate-700">{children}</ol>
    ),
    blockquote: ({ children }) => (
      <blockquote className="mb-4 rounded-r-xl border-l-4 border-ocean-300 bg-ocean-50/60 px-5 py-3 text-slate-700">
        {children}
      </blockquote>
    ),
    strong: ({ children }) => (
      <strong className="font-semibold text-ocean-950">{children}</strong>
    ),
    a: ({ href, children }) => {
      const target = href ?? '#'
      const internal = target.startsWith('/')
      const className =
        'font-medium text-ocean-700 underline decoration-ocean-300 underline-offset-2 hover:text-ocean-800'

      return internal ? (
        <Link href={target} className={className}>
          {children}
        </Link>
      ) : (
        <a href={target} target="_blank" rel="noopener noreferrer" className={className}>
          {children}
        </a>
      )
    },
    hr: () => <hr className="my-10 border-slate-200" />,
    ...components,
  }
}
