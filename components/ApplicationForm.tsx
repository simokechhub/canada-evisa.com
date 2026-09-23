'use client'

import { useEffect, useMemo, useState } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import CountryCombobox from '@/components/CountryCombobox'
import type { FormField, FormStep } from '@/lib/form-fields'
import type { Locale } from '@/lib/i18n'
import { path } from '@/lib/routes'
import { formatCad, formatUsd, OFFICIAL_FEE_CAD, OFFICIAL_FEE_USD, SERVICE_FEE_USD, TOTAL_FEE_USD } from '@/lib/site'

/** Le code Stripe n'est téléchargé qu'une fois l'étape de paiement atteinte. */
const EmbeddedStripeCheckout = dynamic(() => import('@/components/EmbeddedStripeCheckout'), {
  ssr: false,
})

type Values = Record<string, string>

const STORAGE_KEY = 'canada-eta-session-draft'
const isEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)
const today = () => new Date().toISOString().slice(0, 10)

/** Traductions des groupes de champs de la base (enregistrés en anglais). */
const groupNamesFr: Record<string, string> = {
  'General Information': 'Informations générales',
  'Personal Information': 'Informations personnelles',
  'Contact Information': 'Coordonnées',
  'Passport Information': 'Passeport',
  'Travel Information': 'Voyage',
  'Accommodation Information': 'Hébergement',
  'Emergency Contact': 'Contact d’urgence',
  'Additional Information': 'Informations complémentaires',
}

const demoDate = (days: number) => {
  const date = new Date()
  date.setUTCDate(date.getUTCDate() + days)
  return date.toISOString().slice(0, 10)
}

/** Valeurs de démonstration (`?demo=1`), déduites du type de chaque champ. */
function demoValue(field: FormField): string {
  const byName: Record<string, string> = {
    given_names: 'Jean',
    family_name: 'Dupont',
    date_of_birth: '1990-05-15',
    city_of_birth: 'Lyon',
    home_address: '12 avenue des Voyageurs, 75008 Paris, France',
    passport_number: 'TEST123456',
    passport_date_of_issue: demoDate(-365),
    passport_date_of_expiry: demoDate(1095),
    email: 'jean.dupont.test@example.com',
  }
  if (byName[field.name]) return byName[field.name]
  switch (field.type) {
    case 'country': return 'FR'
    case 'tel': return '33 6 12 34 56 78'
    case 'date': return demoDate(30)
    case 'radio':
    case 'select': return field.options[0]?.value ?? ''
    case 'email': return 'jean.dupont.test@example.com'
    default: return 'Test'
  }
}

export default function ApplicationForm({ locale, steps }: { locale: Locale; steps: FormStep[] }) {
  const fr = locale === 'fr'
  const allFields = useMemo(() => steps.flatMap((step) => step.fields), [steps])

  const copy = useMemo(() => ({
    payment: fr ? 'Paiement' : 'Payment',
    required: fr ? 'Ce champ est obligatoire.' : 'This field is required.',
    invalidEmail: fr ? 'Saisissez une adresse e-mail valide.' : 'Enter a valid email address.',
    invalidPhone: fr ? 'Saisissez un numéro de téléphone valide (au moins 8 chiffres).' : 'Enter a valid phone number (at least 8 digits).',
    invalidBirth: fr ? 'La date de naissance doit être passée.' : 'The date of birth must be in the past.',
    expiredPassport: fr ? 'Le passeport doit être en cours de validité.' : 'The passport must be valid.',
    issueAfterExpiry: fr ? 'La date de délivrance doit précéder la date d’expiration.' : 'The issue date must be before the expiry date.',
    restored: fr ? 'Votre saisie de cette session a été restaurée.' : 'Your entry from this session has been restored.',
    next: fr ? 'Continuer' : 'Continue',
    back: fr ? 'Étape précédente' : 'Previous step',
    pay: fr ? 'Continuer vers le paiement' : 'Continue to payment',
    paying: fr ? 'Préparation du paiement sécurisé…' : 'Preparing secure payment…',
    submitError: fr ? 'Impossible de lancer le paiement. Vérifiez vos informations puis réessayez.' : 'Unable to start payment. Check your details and try again.',
    choose: fr ? 'Choisir…' : 'Choose…',
    optional: fr ? 'Facultatif' : 'Optional',
    priceTitle: fr ? 'Tarif par voyageur' : 'Price per traveller',
    officialFee: fr ? 'Redevance officielle IRCC' : 'Official IRCC fee',
    officialNote: fr ? `${formatCad(OFFICIAL_FEE_CAD, locale)}, facturés en USD` : `${formatCad(OFFICIAL_FEE_CAD, locale)}, charged in USD`,
    serviceFee: fr ? 'Frais de service' : 'Service fee',
    secure: fr ? 'Paiement sécurisé par Stripe' : 'Secure payment by Stripe',
    consent: fr
      ? 'Je confirme l’exactitude des informations et j’accepte les conditions générales ainsi que la politique de confidentialité. Je sais que je peux aussi faire ma demande directement sur canada.ca pour 7 CAD.'
      : 'I confirm that the information is accurate and accept the terms of service and privacy policy. I understand I can also apply directly on canada.ca for CAD 7.',
  }), [fr, locale])

  const stepTitles = [
    ...steps.map((step) => (fr ? groupNamesFr[step.name] ?? step.name : step.name)),
    copy.payment,
  ]
  const lastStep = stepTitles.length - 1
  const emptyValues = useMemo(() => Object.fromEntries(allFields.map((field) => [field.name, ''])), [allFields])

  const [step, setStep] = useState(0)
  const [values, setValues] = useState<Values>(emptyValues)
  const [consent, setConsent] = useState(false)
  const [errors, setErrors] = useState<Record<string, string | undefined>>({})
  const [restored, setRestored] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [checkoutClientSecret, setCheckoutClientSecret] = useState<string | null>(null)
  const [applicationNumber, setApplicationNumber] = useState<string | null>(null)
  const [paymentSucceeded, setPaymentSucceeded] = useState(false)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.get('demo') === '1') {
      setValues(Object.fromEntries(allFields.map((field) => [field.name, demoValue(field)])))
      return
    }
    try {
      const saved = window.sessionStorage.getItem(STORAGE_KEY)
      if (!saved) return
      setValues((current) => ({ ...current, ...(JSON.parse(saved) as Values) }))
      setRestored(true)
    } catch {
      // Le formulaire reste utilisable sans sessionStorage.
    }
  }, [allFields])

  useEffect(() => {
    try {
      if (Object.values(values).some((value) => value.trim()))
        window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(values))
    } catch {
      // sessionStorage est facultatif.
    }
  }, [values])

  const update = (name: string, value: string) => {
    setValues((current) => ({ ...current, [name]: value }))
    setErrors((current) => ({ ...current, [name]: undefined, submit: undefined }))
  }

  const validateStep = (index: number) => {
    const next: Record<string, string> = {}
    for (const field of steps[index]?.fields ?? []) {
      const value = (values[field.name] ?? '').trim()
      if (!value) {
        if (field.required) next[field.name] = copy.required
        continue
      }
      if (field.type === 'email' && !isEmail(value)) next[field.name] = copy.invalidEmail
      if (field.type === 'tel' && value.replace(/\D/g, '').length < 8) next[field.name] = copy.invalidPhone
    }
    if (values.date_of_birth && values.date_of_birth >= today() && steps[index]?.fields.some((f) => f.name === 'date_of_birth'))
      next.date_of_birth = copy.invalidBirth
    if (steps[index]?.fields.some((f) => f.name === 'passport_date_of_expiry')) {
      if (values.passport_date_of_expiry && values.passport_date_of_expiry <= today())
        next.passport_date_of_expiry = copy.expiredPassport
      if (values.passport_date_of_issue && values.passport_date_of_expiry && values.passport_date_of_issue >= values.passport_date_of_expiry)
        next.passport_date_of_issue = copy.issueAfterExpiry
    }
    if (index === steps.length - 1 && !consent) next.consent = copy.required
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const initializePayment = async () => {
    if (submitting) return
    setSubmitting(true)
    setErrors({})
    try {
      const response = await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...values, consent, locale }),
      })
      const result = (await response.json()) as { clientSecret?: string; applicationNumber?: string; error?: string }
      if (!response.ok || !result.clientSecret) throw new Error(result.error || 'Checkout unavailable')
      setCheckoutClientSecret(result.clientSecret)
      setApplicationNumber(result.applicationNumber ?? null)
      setStep(lastStep)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch {
      setErrors({ submit: copy.submitError })
    } finally {
      setSubmitting(false)
    }
  }

  const goNext = () => {
    if (!validateStep(step)) return
    if (step === steps.length - 1) {
      void initializePayment()
      return
    }
    setStep((current) => Math.min(current + 1, lastStep))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const goBack = () => {
    setErrors({})
    setStep((current) => Math.max(current - 1, 0))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const paymentConfirmed = (reference: string) => {
    setApplicationNumber(reference)
    setPaymentSucceeded(true)
    try {
      window.sessionStorage.removeItem(STORAGE_KEY)
    } catch {
      // sessionStorage est facultatif.
    }
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const startAnotherApplication = () => {
    setValues(emptyValues)
    setConsent(false)
    setErrors({})
    setCheckoutClientSecret(null)
    setApplicationNumber(null)
    setPaymentSucceeded(false)
    setRestored(false)
    setStep(0)
    try {
      window.sessionStorage.removeItem(STORAGE_KEY)
    } catch {
      // sessionStorage est facultatif.
    }
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const renderField = (field: FormField) => {
    const id = `field-${field.name}`
    const label = `${field.label[locale]}${field.required ? '' : ` (${copy.optional})`}`
    const placeholder = field.placeholder?.[locale]
    const value = values[field.name] ?? ''
    const full = field.type === 'textarea'
    const common = {
      id,
      name: field.name,
      className: 'field-input',
      value,
      onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
        update(field.name, event.target.value),
    }

    let control: React.ReactNode
    switch (field.type) {
      case 'textarea':
        control = <textarea {...common} rows={3} placeholder={placeholder} />
        break
      case 'select':
        control = (
          <select {...common}>
            <option value="">{copy.choose}</option>
            {field.options.map((option) => (
              <option key={option.value} value={option.value}>{option.label[locale]}</option>
            ))}
          </select>
        )
        break
      case 'radio':
        control = (
          <div role="radiogroup" aria-labelledby={`${id}-label`} className="flex flex-wrap gap-3 pt-1">
            {field.options.map((option) => (
              <label key={option.value} className="flex cursor-pointer items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm has-[:checked]:border-ocean-400 has-[:checked]:bg-ocean-50">
                <input
                  type="radio"
                  name={field.name}
                  value={option.value}
                  checked={value === option.value}
                  onChange={() => update(field.name, option.value)}
                  className="accent-ocean-600"
                />
                {option.label[locale]}
              </label>
            ))}
          </div>
        )
        break
      case 'country':
        control = <CountryCombobox id={id} value={value} locale={locale} onChange={(next) => update(field.name, next)} />
        break
      default:
        control = (
          <input
            {...common}
            type={field.type}
            placeholder={field.type === 'date' ? undefined : placeholder}
            autoComplete="off"
            inputMode={field.type === 'tel' ? 'tel' : undefined}
          />
        )
    }

    return (
      <div key={field.name} className={full ? 'sm:col-span-2' : ''}>
        <label id={`${id}-label`} htmlFor={field.type === 'radio' ? undefined : id} className="field-label">{label}</label>
        {control}
        {errors[field.name] && <p className="field-error" role="alert">{errors[field.name]}</p>}
      </div>
    )
  }

  if (paymentSucceeded) {
    return (
      <section className="card mx-auto max-w-3xl text-center" aria-live="polite">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-ocean-100 text-3xl text-ocean-800">✓</div>
        <h2 className="mt-6 text-3xl font-bold text-ocean-950">
          {fr ? 'Votre demande a bien été reçue' : 'Your application has been received'}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-slate-600">
          {fr
            ? 'Votre demande est en cours de traitement. Conservez la référence ci-dessous : elle permet de suivre le dossier. Les prochaines mises à jour seront envoyées à votre adresse e-mail ; pensez à vérifier les courriers indésirables.'
            : 'Your application is being processed. Keep the reference below to track it. Future updates will be sent to your email address; remember to check your spam or junk folder.'}
        </p>
        {applicationNumber && (
          <p className="mx-auto mt-6 max-w-md rounded-xl bg-slate-50 px-4 py-3 font-mono font-semibold text-ocean-900">
            {applicationNumber}
          </p>
        )}
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href={path('tracking', locale)} className="btn-secondary">
            {fr ? 'Suivre ma demande' : 'Track my application'}
          </Link>
          <button type="button" className="btn-primary" onClick={startAnotherApplication}>
            {fr ? 'Faire une autre demande' : 'Start another application'}
          </button>
        </div>
      </section>
    )
  }

  return (
    <form onSubmit={(event) => { event.preventDefault(); goNext() }} noValidate className="mx-auto max-w-4xl">
      <ol className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {stepTitles.map((title, index) => (
          <li key={title} className="text-xs">
            <div className={`h-1 rounded-full ${index > step ? 'bg-slate-200' : 'bg-ocean-500'}`} />
            <p className={`mt-2 ${index === step ? 'font-semibold text-ocean-800' : index < step ? 'text-ocean-600' : 'text-slate-400'}`}>
              <span className="tabular-nums">{index + 1}.</span> {title}
            </p>
          </li>
        ))}
      </ol>

      {restored && step === 0 && (
        <p className="mb-4 rounded-xl border border-ocean-200 bg-ocean-50 px-4 py-3 text-sm text-ocean-900">{copy.restored}</p>
      )}

      <div className="card">
        <h2 className="text-xl font-semibold">{stepTitles[step]}</h2>

        {step < steps.length && (
          <div className="mt-6 grid gap-5 sm:grid-cols-2">{steps[step].fields.map(renderField)}</div>
        )}

        {step === steps.length - 1 && (
          <div className="mt-6 space-y-4">
            <div>
              <label htmlFor="consent" className="flex cursor-pointer items-start gap-3">
                <input
                  id="consent"
                  type="checkbox"
                  checked={consent}
                  onChange={(event) => { setConsent(event.target.checked); setErrors((current) => ({ ...current, consent: undefined, submit: undefined })) }}
                  className="mt-0.5 h-4 w-4 rounded accent-ocean-600"
                />
                <span className="text-sm text-slate-700">
                  {copy.consent}{' '}
                  <Link className="text-ocean-700 underline" href={path('terms', locale)}>{fr ? 'Conditions' : 'Terms'}</Link>
                  {' · '}
                  <Link className="text-ocean-700 underline" href={path('privacy', locale)}>{fr ? 'Confidentialité' : 'Privacy'}</Link>
                </span>
              </label>
              {errors.consent && <p className="field-error" role="alert">{errors.consent}</p>}
            </div>
            {errors.submit && <p className="field-error" role="alert">{errors.submit}</p>}
          </div>
        )}

        {step === lastStep && checkoutClientSecret && (
          <div className="mt-6 space-y-6">
            <div className="rounded-2xl border border-ocean-200 bg-ocean-50/60 p-5">
              <div className="flex flex-wrap items-end justify-between gap-3">
                <p className="text-sm font-semibold text-ocean-800">{copy.priceTitle}</p>
                <p className="text-2xl font-bold text-ocean-950">{formatUsd(TOTAL_FEE_USD, locale)}</p>
              </div>
              <dl className="mt-4 space-y-2 border-t border-ocean-200 pt-4 text-sm">
                <Row label={`${copy.officialFee} (${copy.officialNote})`}>{formatUsd(OFFICIAL_FEE_USD, locale)}</Row>
                <Row label={copy.serviceFee}>{formatUsd(SERVICE_FEE_USD, locale)}</Row>
              </dl>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-semibold text-ocean-950">{copy.secure}</h3>
              <EmbeddedStripeCheckout clientSecret={checkoutClientSecret} locale={locale} onSuccess={paymentConfirmed} />
            </div>
          </div>
        )}

        {step < lastStep && (
          <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
            {step > 0 ? <button type="button" onClick={goBack} className="btn-secondary" disabled={submitting}>{copy.back}</button> : <span />}
            <button type="button" onClick={goNext} className="btn-primary" disabled={submitting}>
              {step === steps.length - 1 ? (submitting ? copy.paying : copy.pay) : copy.next}
            </button>
          </div>
        )}
      </div>
    </form>
  )
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return <div className="flex justify-between gap-4"><dt className="text-slate-500">{label}</dt><dd className="text-right font-medium text-slate-800">{children}</dd></div>
}
