'use client'

import { useMemo, useState } from 'react'
import type { Locale } from '@/lib/i18n'
import { getCountryOptions } from '@/lib/countries'

const normalize = (value: string) => value
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '')
  .toLowerCase()

export default function CountryCombobox({
  id,
  value,
  locale,
  onChange,
}: {
  id: string
  value: string
  locale: Locale
  onChange: (value: string) => void
}) {
  const options = useMemo(() => getCountryOptions(locale), [locale])
  const selected = options.find((country) =>
    country.code === value || country.name === value || country.englishName === value
  )
  const [query, setQuery] = useState(selected?.name ?? '')
  const [open, setOpen] = useState(false)

  const filtered = useMemo(() => {
    const term = normalize(query.trim())
    if (!term) return options
    return options.filter((country) =>
      normalize(`${country.name} ${country.englishName} ${country.code}`).includes(term)
    )
  }, [options, query])

  const choose = (code: string, name: string) => {
    onChange(code)
    setQuery(name)
    setOpen(false)
  }

  return (
    <div className="relative">
      <div className="relative">
        {selected && <span aria-hidden className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-xl">{selected.flag}</span>}
        <input
          id={id}
          type="search"
          role="combobox"
          aria-expanded={open}
          aria-controls={`${id}-options`}
          aria-autocomplete="list"
          className={`field-input ${selected ? 'pl-12' : ''}`}
          placeholder={locale === 'fr' ? 'Rechercher un pays…' : 'Search for a country…'}
          autoComplete="off"
          value={open ? query : selected?.name ?? query}
          onFocus={() => {
            setQuery(selected?.name ?? query)
            setOpen(true)
          }}
          onBlur={() => window.setTimeout(() => setOpen(false), 150)}
          onChange={(event) => {
            setQuery(event.target.value)
            onChange('')
            setOpen(true)
          }}
          onKeyDown={(event) => {
            if (event.key === 'Escape') setOpen(false)
            if (event.key === 'Enter' && open && filtered[0]) {
              event.preventDefault()
              choose(filtered[0].code, filtered[0].name)
            }
          }}
        />
      </div>

      {open && (
        <ul id={`${id}-options`} role="listbox" className="absolute z-30 mt-2 max-h-72 w-full overflow-auto rounded-2xl border border-slate-200 bg-white p-2 shadow-xl">
          {filtered.length ? filtered.map((country) => (
            <li key={country.code} role="option" aria-selected={country.code === selected?.code}>
              <button
                type="button"
                className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm text-slate-700 hover:bg-ocean-50 hover:text-ocean-950"
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => choose(country.code, country.name)}
              >
                <span aria-hidden className="text-xl">{country.flag}</span>
                <span className="flex-1">{country.name}</span>
                <span className="text-xs font-medium text-slate-400">{country.code}</span>
              </button>
            </li>
          )) : (
            <li className="px-3 py-4 text-sm text-slate-500">
              {locale === 'fr' ? 'Aucun pays trouvé.' : 'No country found.'}
            </li>
          )}
        </ul>
      )}
    </div>
  )
}
