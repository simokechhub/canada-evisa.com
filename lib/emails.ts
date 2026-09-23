import { format, type Locale } from '@/lib/i18n'
import { getDictionary } from '@/lib/dictionary'
import { path } from '@/lib/routes'
import { formatUsd, site } from '@/lib/site'

/** Tout texte saisi par un visiteur passe par ici avant d'entrer dans du HTML. */
const escapeHtml = (value: string) =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')

const layout = (body: string) => `<!doctype html>
<html><body style="margin:0;padding:24px;background:#f6f8f8;font-family:Arial,Helvetica,sans-serif;color:#0b2b29">
<div style="max-width:560px;margin:0 auto;background:#ffffff;border-radius:12px;padding:28px">
${body}
</div></body></html>`

/** Alerte interne : nouveau message via le formulaire de contact. */
export function contactAlertEmail(contact: {
  name: string
  email: string
  subject: string
  reference: string
  message: string
  locale: Locale
}) {
  const rows: [string, string][] = [
    ['Nom', contact.name],
    ['E-mail', contact.email],
    ['Sujet', contact.subject || 'général'],
    ['Référence dossier', contact.reference || '—'],
    ['Langue', contact.locale],
  ]

  return {
    subject: `[Contact] ${contact.subject || 'général'} — ${contact.name}`,
    text: [
      ...rows.map(([label, value]) => `${label} : ${value}`),
      '',
      contact.message,
      '',
      'Répondre à cet e-mail écrit directement au visiteur.',
    ].join('\n'),
    html: layout(`
<h1 style="font-size:18px;margin:0 0 16px">Nouveau message de contact</h1>
<table style="font-size:14px;border-collapse:collapse;margin-bottom:16px">
${rows
  .map(
    ([label, value]) =>
      `<tr><td style="padding:4px 12px 4px 0;color:#5b6b6a">${label}</td><td style="padding:4px 0"><strong>${escapeHtml(value)}</strong></td></tr>`,
  )
  .join('\n')}
</table>
<div style="font-size:14px;line-height:1.6;white-space:pre-wrap;background:#f6f8f8;border-radius:8px;padding:14px">${escapeHtml(contact.message)}</div>
<p style="font-size:12px;color:#5b6b6a;margin-top:16px">Répondre à cet e-mail écrit directement au visiteur.</p>`),
  }
}

/** Confirmation envoyée au client une fois le paiement validé. */
export function applicationConfirmationEmail(application: {
  locale: Locale
  name: string
  reference: string
  amount: number
}) {
  const { locale } = application
  const t = getDictionary(locale)
  const c = t.confirmationEmail
  const vars = {
    name: application.name,
    reference: application.reference,
    amount: formatUsd(application.amount, locale),
    siteName: site.name,
  }
  const trackUrl = `${site.url}${path('tracking', locale)}`

  const subject = format(c.subject, vars)
  const text = [
    format(c.greeting, vars),
    '',
    format(c.intro, vars),
    '',
    `${c.referenceLabel} : ${application.reference}`,
    '',
    c.nextTitle,
    c.nextText,
    '',
    `${c.trackLabel} : ${trackUrl}`,
    '',
    c.questions,
    '',
    format(c.signature, vars),
    '',
    '—',
    t.disclaimer,
  ].join('\n')

  const safe = (value: string) => escapeHtml(value)
  const html = layout(`
<p style="font-size:15px;margin:0 0 12px">${safe(format(c.greeting, vars))}</p>
<p style="font-size:15px;line-height:1.6;margin:0 0 20px">${safe(format(c.intro, vars))}</p>
<div style="background:#eefaf7;border-radius:10px;padding:14px 16px;margin:0 0 20px">
  <div style="font-size:12px;color:#5b6b6a;text-transform:uppercase;letter-spacing:.04em">${safe(c.referenceLabel)}</div>
  <div style="font-family:Menlo,Consolas,monospace;font-size:17px;font-weight:bold;margin-top:4px">${safe(application.reference)}</div>
</div>
<h2 style="font-size:16px;margin:0 0 6px">${safe(c.nextTitle)}</h2>
<p style="font-size:14px;line-height:1.6;margin:0 0 20px">${safe(c.nextText)}</p>
<p style="margin:0 0 24px"><a href="${trackUrl}" style="display:inline-block;background:#0b3b38;color:#ffffff;text-decoration:none;padding:11px 18px;border-radius:8px;font-size:14px;font-weight:bold">${safe(c.trackLabel)}</a></p>
<p style="font-size:14px;margin:0 0 4px">${safe(c.questions)}</p>
<p style="font-size:14px;margin:0 0 24px">${safe(format(c.signature, vars))}</p>
<p style="font-size:11px;line-height:1.5;color:#7a8a89;border-top:1px solid #e3e9e8;padding-top:14px;margin:0">${safe(t.disclaimer)}</p>`)

  return { subject, text, html }
}
