'use client'

import { useState } from 'react'
import type { Locale } from '@/lib/i18n'
import { getDictionary } from '@/lib/dictionary'

type Errors = { name?: string; email?: string; message?: string }

const isEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)

export default function ContactForm({ locale }: { locale: Locale }) {
  const t = getDictionary(locale).contactForm
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [reference, setReference] = useState('')
  const [subject, setSubject] = useState('question')
  const [message, setMessage] = useState('')
  const [errors, setErrors] = useState<Errors>({})
  const [sent, setSent] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [website, setWebsite] = useState('')

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    const next: Errors = {}
    if (!name.trim()) next.name = t.errors.name
    if (!isEmail(email)) next.email = t.errors.email
    if (message.trim().length < 20) next.message = t.errors.message
    setErrors(next)
    if (Object.keys(next).length > 0) return
    setSubmitting(true)
    setSubmitError('')
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, reference, subject, message, website, locale }),
      })
      if (!response.ok) throw new Error('Contact request failed')
      setSent(true)
    } catch {
      setSubmitError(
        locale === 'fr'
          ? 'Votre message n’a pas pu être enregistré. Réessayez ou écrivez-nous directement par e-mail.'
          : 'Your message could not be saved. Try again or email us directly.',
      )
    } finally {
      setSubmitting(false)
    }
  }

  if (sent) {
    return (
      <div className="card animate-fade-up">
        <h2 className="text-xl font-semibold">{t.sentTitle}</h2>
        <p className="mt-3 text-sm leading-relaxed text-slate-600">{t.sentText}</p>
        <button type="button" className="btn-secondary mt-6" onClick={() => setSent(false)}>
          {t.sentBack}
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="card">
      <h2 className="text-xl font-semibold">{t.title}</h2>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <div className="hidden" aria-hidden="true">
          <label htmlFor="contact-website">Website</label>
          <input id="contact-website" tabIndex={-1} autoComplete="off" value={website} onChange={(event) => setWebsite(event.target.value)} />
        </div>
        <div>
          <label htmlFor="contact-name" className="field-label">
            {t.name}
          </label>
          <input
            id="contact-name"
            className="field-input"
            autoComplete="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          {errors.name && (
            <p className="field-error" role="alert">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="contact-email" className="field-label">
            {t.email}
          </label>
          <input
            id="contact-email"
            type="email"
            className="field-input"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          {errors.email && (
            <p className="field-error" role="alert">
              {errors.email}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="contact-subject" className="field-label">
            {t.subject}
          </label>
          <select
            id="contact-subject"
            className="field-input"
            value={subject}
            onChange={(event) => setSubject(event.target.value)}
          >
            <option value="question">{t.subjects.question}</option>
            <option value="dossier">{t.subjects.file}</option>
            <option value="refus">{t.subjects.refusal}</option>
            <option value="facturation">{t.subjects.billing}</option>
            <option value="autre">{t.subjects.other}</option>
          </select>
        </div>

        <div>
          <label htmlFor="contact-reference" className="field-label">
            {t.reference} <span className="font-normal text-slate-400">{t.optional}</span>
          </label>
          <input
            id="contact-reference"
            className="field-input"
            placeholder="SC-2026-000000"
            value={reference}
            onChange={(event) => setReference(event.target.value)}
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="contact-message" className="field-label">
            {t.message}
          </label>
          <textarea
            id="contact-message"
            rows={6}
            className="field-input resize-y"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
          />
          {errors.message && (
            <p className="field-error" role="alert">
              {errors.message}
            </p>
          )}
        </div>
      </div>

      <p className="mt-5 text-xs leading-relaxed text-slate-500">{t.warning}</p>

      {submitError && <p className="field-error mt-4" role="alert">{submitError}</p>}

      <button type="submit" className="btn-primary mt-6" disabled={submitting}>
        {submitting ? (locale === 'fr' ? 'Envoi…' : 'Sending…') : t.submit}
      </button>
    </form>
  )
}
