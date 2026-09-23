import { NextRequest, NextResponse } from 'next/server'
import { markApplicationPaid } from '@/lib/mark-paid'
import { getStripe } from '@/lib/stripe'

export const runtime = 'nodejs'

export async function POST(request: NextRequest) {
  const requestOrigin = new URL(request.url).origin
  const origin = request.headers.get('origin')
  if (origin && origin !== requestOrigin)
    return NextResponse.json({ error: 'Invalid request origin.' }, { status: 403 })

  const body = (await request.json().catch(() => ({}))) as { paymentIntentId?: unknown }
  const paymentIntentId = typeof body.paymentIntentId === 'string' ? body.paymentIntentId : ''
  if (!paymentIntentId.startsWith('pi_'))
    return NextResponse.json({ error: 'Invalid payment reference.' }, { status: 400 })

  try {
    const paymentIntent = await getStripe().paymentIntents.retrieve(paymentIntentId)
    const applicationId = paymentIntent.metadata.applicationId
    const applicationNumber = paymentIntent.metadata.applicationNumber
    if (!applicationId || !applicationNumber)
      return NextResponse.json({ error: 'Application not found.' }, { status: 404 })
    if (paymentIntent.status !== 'succeeded')
      return NextResponse.json({ error: 'Payment is not confirmed.' }, { status: 409 })

    await markApplicationPaid(applicationId, paymentIntent.id)

    return NextResponse.json({ applicationNumber })
  } catch {
    return NextResponse.json({ error: 'Unable to confirm payment.' }, { status: 502 })
  }
}
