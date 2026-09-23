import { NextRequest, NextResponse } from 'next/server'
import { getStripe } from '@/lib/stripe'

export const runtime = 'nodejs'

export async function POST(request: NextRequest) {
  const requestOrigin = new URL(request.url).origin
  const origin = request.headers.get('origin')
  if (origin && origin !== requestOrigin)
    return NextResponse.json({ error: 'Invalid request origin.' }, { status: 403 })

  const body = (await request.json().catch(() => ({}))) as { clientSecret?: unknown }
  const clientSecret = typeof body.clientSecret === 'string' ? body.clientSecret : ''
  const paymentIntentId = clientSecret.split('_secret_')[0]
  if (!paymentIntentId.startsWith('pi_') || !clientSecret.includes('_secret_'))
    return NextResponse.json({ error: 'Invalid payment reference.' }, { status: 400 })

  try {
    const paymentIntent = await getStripe().paymentIntents.retrieve(paymentIntentId)
    if (paymentIntent.client_secret !== clientSecret || !paymentIntent.metadata.applicationId)
      return NextResponse.json({ error: 'Invalid payment reference.' }, { status: 403 })

    return NextResponse.json({
      paymentIntentId: paymentIntent.id,
      status: paymentIntent.status,
      errorCode: paymentIntent.last_payment_error?.code ?? null,
      errorMessage: paymentIntent.last_payment_error?.message ?? null,
    })
  } catch {
    return NextResponse.json({ error: 'Unable to check payment.' }, { status: 502 })
  }
}
