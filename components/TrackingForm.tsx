'use client'

import { useState } from 'react'
import type { Locale } from '@/lib/i18n'
import { getDictionary } from '@/lib/dictionary'
import { countryName } from '@/lib/countries'

type ApplicationResult = {
  applicationNumber: string
  applicantName: string
  applicantEmail: string
  status: string
  paymentStatus: string
  submittedAt: string
  updatedAt: string
  processedAt: string | null
  rejectionReason: string | null
  totalAmount: number
  governmentFee: number
  serviceFee: number
  details: {
    nationality: string | null
    countryOfResidence: string | null
    purposeOfVisit: string | null
    arrivalDate: string | null
    departureDate: string | null
    flightNumber: string | null
    accommodation: string | null
  }
}

const statusOrder = ['SUBMITTED', 'PROCESSING', 'APPROVED']

export default function TrackingForm({ locale }: { locale: Locale }) {
  const t = getDictionary(locale).trackingForm
  const fr = locale === 'fr'
  const [reference, setReference] = useState('')
  const [email, setEmail] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<ApplicationResult | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    const clean = reference.trim().toUpperCase()
    if (!/^APP-\d{13}-[A-Z0-9]{9}$/i.test(clean) || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) {
      setError(t.error)
      setResult(null)
      return
    }
    setLoading(true)
    setError(null)
    setResult(null)
    try {
      const response = await fetch('/api/applications/status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reference: clean, email: email.trim() }),
      })
      const data = (await response.json()) as ApplicationResult & { error?: string }
      if (!response.ok || !data.applicationNumber) throw new Error(data.error)
      setResult(data)
    } catch {
      setError(fr
        ? 'Aucune demande ne correspond à cette référence et cette adresse e-mail. Vérifiez les deux valeurs exactement.'
        : 'No application matches this reference and email address. Check both values exactly.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-8">
      <div className="card">
        <form onSubmit={handleSubmit} noValidate>
          <h2 className="text-xl font-semibold">{t.title}</h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            {fr
              ? 'La référence commence par APP-. Utilisez la même adresse e-mail que lors du paiement.'
              : 'The reference starts with APP-. Use the same email address entered at payment.'}
          </p>

          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="reference" className="field-label">{t.reference}</label>
              <input id="reference" className="field-input uppercase" placeholder="APP-0000000000000-XXXXXXXXX" autoComplete="off" value={reference} onChange={(event) => setReference(event.target.value)} />
            </div>
            <div>
              <label htmlFor="tracking-email" className="field-label">{t.email}</label>
              <input id="tracking-email" type="email" className="field-input" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} />
            </div>
          </div>

          {error && <p className="field-error mt-4" role="alert">{error}</p>}

          <button type="submit" className="btn-primary mt-6" disabled={loading}>
            {loading ? (fr ? 'Recherche…' : 'Searching…') : t.submit}
          </button>
        </form>
      </div>

      {result && <ApplicationDetails application={result} locale={locale} />}
    </div>
  )
}

function ApplicationDetails({ application, locale }: { application: ApplicationResult; locale: Locale }) {
  const fr = locale === 'fr'
  const dateLocale = fr ? 'fr-FR' : 'en-GB'
  const date = (value: string | null) => value
    ? new Intl.DateTimeFormat(dateLocale, { day: '2-digit', month: 'long', year: 'numeric' }).format(new Date(value.length === 10 ? `${value}T12:00:00.000Z` : value))
    : '—'
  const money = (value: number) => new Intl.NumberFormat(dateLocale, { style: 'currency', currency: 'EUR' }).format(value)
  const currentIndex = statusOrder.indexOf(application.status)
  const fields = [
    [fr ? 'Voyageur' : 'Traveller', application.applicantName],
    [fr ? 'Nationalité' : 'Nationality', countryName(application.details.nationality, locale)],
    [fr ? 'Pays de résidence' : 'Country of residence', countryName(application.details.countryOfResidence, locale)],
    [fr ? 'Motif du séjour' : 'Purpose of visit', purposeLabel(application.details.purposeOfVisit, locale)],
    [fr ? 'Arrivée prévue' : 'Planned arrival', date(application.details.arrivalDate)],
    [fr ? 'Départ prévu' : 'Planned departure', date(application.details.departureDate)],
    [fr ? 'Vol ou croisière' : 'Flight or cruise', application.details.flightNumber],
    [fr ? 'Hébergement' : 'Accommodation', application.details.accommodation],
  ].filter((field): field is [string, string] => Boolean(field[1]))

  return (
    <section className="animate-fade-up overflow-hidden rounded-3xl border border-ocean-200 bg-white shadow-[0_24px_70px_-42px_rgba(22,23,28,.45)]" aria-live="polite">
      <div className="bg-ocean-950 px-6 py-6 text-white sm:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-ocean-300">{fr ? 'Résultat du suivi' : 'Tracking result'}</p>
            <h2 className="mt-2 break-all text-xl font-semibold">{application.applicationNumber}</h2>
            <p className="mt-1 text-sm text-ocean-100">{application.applicantEmail}</p>
          </div>
          <span className={`w-fit rounded-full px-4 py-2 text-sm font-semibold ${statusClass(application.status)}`}>
            {statusLabel(application.status, locale)}
          </span>
        </div>
      </div>

      <div className="space-y-8 p-6 sm:p-8">
        <div>
          <h3 className="text-base font-semibold text-ocean-950">{fr ? 'Avancement' : 'Progress'}</h3>
          <ol className="mt-5 grid gap-4 sm:grid-cols-3">
            {statusOrder.map((status, index) => {
              const active = application.status === 'REJECTED' ? index === 0 : index <= currentIndex
              return (
                <li key={status} className="flex items-center gap-3 sm:block">
                  <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold ${active ? 'bg-ocean-700 text-white' : 'bg-slate-100 text-slate-400'}`}>
                    {active ? '✓' : index + 1}
                  </span>
                  <p className={`text-sm font-medium sm:mt-2 ${active ? 'text-ocean-950' : 'text-slate-400'}`}>{statusLabel(status, locale)}</p>
                </li>
              )
            })}
          </ol>
        </div>

        {application.status === 'REJECTED' && (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-900">
            <p className="font-semibold">{fr ? 'Action requise' : 'Action required'}</p>
            <p className="mt-1">{application.rejectionReason || (fr ? 'Contactez-nous pour connaître la correction demandée.' : 'Contact us for details of the required correction.')}</p>
          </div>
        )}

        <div>
          <h3 className="text-base font-semibold text-ocean-950">{fr ? 'Informations de la demande' : 'Application details'}</h3>
          <dl className="mt-4 grid gap-x-8 gap-y-5 sm:grid-cols-2">
            {fields.map(([label, value]) => (
              <div key={label} className="border-b border-slate-100 pb-4">
                <dt className="text-xs font-medium uppercase tracking-wide text-slate-500">{label}</dt>
                <dd className="mt-1 break-words text-sm font-medium text-slate-900">{value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="grid gap-6 rounded-2xl bg-slate-50 p-5 sm:grid-cols-2">
          <div>
            <h3 className="text-sm font-semibold text-ocean-950">{fr ? 'Paiement' : 'Payment'}</h3>
            <p className="mt-2 text-sm"><strong>{paymentLabel(application.paymentStatus, locale)}</strong> · {money(application.totalAmount)}</p>
            <p className="mt-1 text-xs text-slate-500">{fr ? 'Redevance officielle' : 'Official fee'} {money(application.governmentFee)} · {fr ? 'Traitement' : 'Processing'} {money(application.serviceFee)}</p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-ocean-950">{fr ? 'Dates du dossier' : 'Application dates'}</h3>
            <p className="mt-2 text-sm">{fr ? 'Déposé le' : 'Submitted'} {date(application.submittedAt)}</p>
            <p className="mt-1 text-xs text-slate-500">{fr ? 'Dernière mise à jour' : 'Last updated'}: {date(application.updatedAt)}</p>
          </div>
        </div>

        <p className="text-xs leading-relaxed text-slate-500">
          {fr
            ? 'Pour votre sécurité, le numéro de passeport, les données médicales et les justificatifs ne sont jamais affichés sur cette page.'
            : 'For your security, passport numbers, medical data and supporting documents are never displayed on this page.'}
        </p>
      </div>
    </section>
  )
}

function statusLabel(status: string, locale: Locale) {
  const labels: Record<string, [string, string]> = {
    PENDING: ['En attente du paiement', 'Awaiting payment'],
    SUBMITTED: ['Demande reçue', 'Application received'],
    PROCESSING: ['En cours de vérification', 'Under review'],
    APPROVED: ['Demande approuvée', 'Application approved'],
    REJECTED: ['Action requise', 'Action required'],
    CANCELLED: ['Demande annulée', 'Application cancelled'],
  }
  return labels[status]?.[locale === 'fr' ? 0 : 1] ?? status
}

function paymentLabel(status: string, locale: Locale) {
  const labels: Record<string, [string, string]> = {
    PENDING: ['En attente', 'Pending'],
    PAID: ['Payé', 'Paid'],
    FAILED: ['Échec du paiement', 'Payment failed'],
    REFUNDED: ['Remboursé', 'Refunded'],
  }
  return labels[status]?.[locale === 'fr' ? 0 : 1] ?? status
}

function purposeLabel(value: string | null, locale: Locale) {
  if (!value) return null
  const labels: Record<string, [string, string]> = {
    Tourism: ['Tourisme', 'Tourism'],
    Business: ['Affaires', 'Business'],
    Transit: ['Transit', 'Transit'],
    'Visit Family or Friends': ['Visite à la famille ou à des amis', 'Visit family or friends'],
  }
  return labels[value]?.[locale === 'fr' ? 0 : 1] ?? value
}

function statusClass(status: string) {
  if (status === 'APPROVED') return 'bg-emerald-100 text-emerald-900'
  if (status === 'REJECTED' || status === 'CANCELLED') return 'bg-red-100 text-red-900'
  if (status === 'PROCESSING') return 'bg-amber-100 text-amber-950'
  return 'bg-white/10 text-white'
}
