import { randomUUID } from 'node:crypto'
import { after, NextRequest, NextResponse } from 'next/server'
import { contactAlertEmail } from '@/lib/emails'
import { notificationRecipient, sendMail } from '@/lib/mailer'
import { prisma } from '@/lib/prisma'

export const runtime = 'nodejs'

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const clean = (value: unknown, maxLength: number) =>
  typeof value === 'string' ? value.trim().slice(0, maxLength) : ''

export async function POST(request: NextRequest) {
  const requestOrigin = new URL(request.url).origin
  const origin = request.headers.get('origin')
  if (origin && origin !== requestOrigin)
    return NextResponse.json({ error: 'Invalid request origin.' }, { status: 403 })

  const body = (await request.json().catch(() => ({}))) as Record<string, unknown>
  // Invisible honeypot: bots commonly fill every field.
  if (clean(body.website, 200)) return NextResponse.json({ received: true })

  const name = clean(body.name, 160)
  const email = clean(body.email, 254).toLowerCase()
  const subject = clean(body.subject, 100)
  const reference = clean(body.reference, 100)
  const message = clean(body.message, 5000)
  const locale = body.locale === 'fr' ? 'fr' : 'en'

  if (!name || !emailPattern.test(email) || message.length < 20)
    return NextResponse.json({ error: 'Invalid contact details.' }, { status: 422 })

  const storedMessage = [
    `Locale: ${locale}`,
    `Subject: ${subject || 'general'}`,
    reference ? `Application reference: ${reference}` : '',
    '',
    message,
  ].filter((line, index) => line || index === 3).join('\n')

  const now = new Date()
  await prisma.contacts.create({
    data: {
      id: randomUUID(),
      name,
      email,
      message: storedMessage,
      status: 'PENDING',
      createdAt: now,
      updatedAt: now,
    },
  })

  // Le message est déjà en base : l'alerte part après la réponse, et son
  // éventuel échec n'affecte pas le visiteur.
  after(() =>
    sendMail({
      to: notificationRecipient(),
      replyTo: email,
      ...contactAlertEmail({ name, email, subject, reference, message, locale }),
    }),
  )

  return NextResponse.json({ received: true })
}
