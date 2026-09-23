import { randomUUID } from 'node:crypto'
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getStripe } from '@/lib/stripe'
import { getCountryOptions } from '@/lib/countries'
import { CANADA_EVISA_ID, CANADA_EVISA_TYPE_ID, getFormSteps } from '@/lib/form-fields'
import { OFFICIAL_FEE_USD, SERVICE_FEE_USD, TOTAL_FEE_USD } from '@/lib/site'

export const runtime = 'nodejs'

const clean = (value: unknown, maxLength = 2000) =>
  typeof value === 'string' ? value.trim().slice(0, maxLength) : ''

const isoDate = /^\d{4}-\d{2}-\d{2}$/
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const today = () => new Date().toISOString().slice(0, 10)

export async function POST(request: NextRequest) {
  const requestOrigin = new URL(request.url).origin
  const origin = request.headers.get('origin')
  if (origin && origin !== requestOrigin) {
    return NextResponse.json({ error: 'Invalid request origin.' }, { status: 403 })
  }

  let raw: Record<string, unknown>
  try {
    raw = (await request.json()) as Record<string, unknown>
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 })
  }

  const locale = raw.locale === 'en' ? 'en' : 'fr'
  if (raw.consent !== true)
    return NextResponse.json({ error: 'Consent is required.', fields: ['consent'] }, { status: 422 })

  // Mêmes définitions que le formulaire : les deux ne peuvent pas diverger.
  const fields = (await getFormSteps()).flatMap((step) => step.fields)
  const countryOptions = [...getCountryOptions('en'), ...getCountryOptions('fr')]
  const values: Record<string, string> = {}
  const invalid: string[] = []

  for (const field of fields) {
    let value = clean(raw[field.name], field.type === 'textarea' ? 2000 : 300)
    if (!value) {
      if (field.required) invalid.push(field.name)
      values[field.name] = ''
      continue
    }

    switch (field.type) {
      case 'email':
        if (!emailPattern.test(value)) invalid.push(field.name)
        value = value.toLowerCase()
        break
      case 'tel':
        if (value.replace(/\D/g, '').length < 8) invalid.push(field.name)
        break
      case 'date':
        if (!isoDate.test(value)) invalid.push(field.name)
        break
      case 'number':
        if (Number.isNaN(Number(value))) invalid.push(field.name)
        break
      case 'country': {
        const lower = value.toLowerCase()
        const match = countryOptions.find((country) =>
          country.code.toLowerCase() === lower ||
          country.name.toLowerCase() === lower ||
          country.englishName.toLowerCase() === lower,
        )
        if (match) value = match.code
        else invalid.push(field.name)
        break
      }
      case 'radio':
      case 'select':
        if (field.options.length > 0 && !field.options.some((option) => option.value === value))
          invalid.push(field.name)
        break
    }
    values[field.name] = value
  }

  // Cohérence des dates du passeport, quand les champs existent.
  if (values.date_of_birth && values.date_of_birth >= today()) invalid.push('date_of_birth')
  if (values.passport_date_of_expiry && values.passport_date_of_expiry <= today())
    invalid.push('passport_date_of_expiry')
  if (
    values.passport_date_of_issue &&
    values.passport_date_of_expiry &&
    values.passport_date_of_issue >= values.passport_date_of_expiry
  )
    invalid.push('passport_date_of_issue')

  if (invalid.length > 0) {
    return NextResponse.json({ error: 'Invalid or missing fields.', fields: [...new Set(invalid)] }, { status: 422 })
  }

  const email = values.email
  if (!email) {
    return NextResponse.json({ error: 'Email address is required.', fields: ['email'] }, { status: 422 })
  }

  const now = new Date()
  const id = randomUUID()
  const applicationNumber = `APP-${Date.now()}-${randomUUID().replaceAll('-', '').slice(0, 9)}`
  const applicantName =
    [values.given_names, values.family_name].filter(Boolean).join(' ').trim() || email

  await prisma.evisa_applications.create({
    data: {
      id,
      evisaId: CANADA_EVISA_ID,
      evisaTypeId: CANADA_EVISA_TYPE_ID,
      applicationNumber,
      formData: JSON.stringify({
        ...values,
        applicantEmail: email,
        locale,
        source: 'canada-evisa.com',
        currency: 'USD',
      }),
      applicantEmail: email,
      applicantName,
      totalAmount: TOTAL_FEE_USD,
      governmentFee: OFFICIAL_FEE_USD,
      serviceFee: SERVICE_FEE_USD,
      paymentStatus: 'PENDING',
      status: 'PENDING',
      submittedAt: now,
      updatedAt: now,
    },
  })

  try {
    const paymentIntent = await getStripe().paymentIntents.create({
      amount: Math.round(TOTAL_FEE_USD * 100),
      currency: 'usd',
      receipt_email: email,
      description:
        locale === 'en'
          ? 'Canada eTA application assistance'
          : 'Assistance à la demande d’AVE Canada',
      automatic_payment_methods: { enabled: true, allow_redirects: 'never' },
      metadata: {
        applicationId: id,
        applicationNumber,
        evisaId: CANADA_EVISA_ID,
        source: 'canada-evisa.com',
      },
    })

    if (!paymentIntent.client_secret) throw new Error('Stripe did not return a PaymentIntent client secret')
    return NextResponse.json({ clientSecret: paymentIntent.client_secret, applicationNumber })
  } catch (error) {
    await prisma.evisa_applications.delete({ where: { id } }).catch(() => undefined)
    console.error('Unable to create Stripe PaymentIntent', error)
    return NextResponse.json({ error: 'Unable to start secure payment.' }, { status: 502 })
  }
}
