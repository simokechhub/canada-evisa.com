import nodemailer, { type Transporter } from 'nodemailer'
import { site } from '@/lib/site'

/**
 * Envoi SMTP (messagerie Hostinger). Configuration par variables d'environnement :
 *
 *   SMTP_HOST=smtp.hostinger.com
 *   SMTP_PORT=465                      465 = TLS implicite, 587 = STARTTLS
 *   SMTP_USER=contact@canada-evisa.com
 *   SMTP_PASS=…                        mot de passe de la boîte, jamais dans le dépôt
 *   SMTP_FROM=contact@canada-evisa.com
 *   CONTACT_NOTIFY_TO=…                facultatif, destinataire des alertes (défaut : site.email)
 *
 * Les envois sont « au mieux » : une panne SMTP ne doit jamais faire échouer
 * un paiement ou un formulaire de contact. Les erreurs sont journalisées.
 */

type Mail = {
  to: string
  subject: string
  text: string
  html: string
  replyTo?: string
}

let transporter: Transporter | null | undefined

function getTransporter(): Transporter | null {
  if (transporter !== undefined) return transporter

  const host = process.env.SMTP_HOST
  // `||` et non `??` : une variable présente mais vide dans .env compte comme absente.
  const port = Number(process.env.SMTP_PORT || 465)
  const user = process.env.SMTP_USER || process.env.SMTP_FROM
  const pass = process.env.SMTP_PASS

  if (!host || !user || !pass) {
    console.warn('[mailer] SMTP non configuré : aucun e-mail ne sera envoyé.')
    transporter = null
    return transporter
  }

  transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
    // Borne l'attente : une fonction serverless ne doit pas rester bloquée.
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 15_000,
  })
  return transporter
}

export const notificationRecipient = () => process.env.CONTACT_NOTIFY_TO || site.email

export async function sendMail(mail: Mail): Promise<boolean> {
  const transport = getTransporter()
  if (!transport) return false

  const from = process.env.SMTP_FROM || process.env.SMTP_USER

  try {
    await transport.sendMail({
      from: `"${site.name}" <${from}>`,
      to: mail.to,
      replyTo: mail.replyTo,
      subject: mail.subject,
      text: mail.text,
      html: mail.html,
    })
    return true
  } catch (error) {
    console.error('[mailer] échec d’envoi :', mail.subject, error)
    return false
  }
}
