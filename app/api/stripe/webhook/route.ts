import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { prisma } from '@/lib/prisma'
import { markApplicationPaid } from '@/lib/mark-paid'
import { getStripe } from '@/lib/stripe'

export const runtime = 'nodejs'

export async function POST(request: NextRequest) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET
  const signature = request.headers.get('stripe-signature')
  if (!webhookSecret || !signature) {
    return NextResponse.json({ error: 'Webhook is not configured.' }, { status: 400 })
  }

  let event: Stripe.Event
  try {
    event = getStripe().webhooks.constructEvent(await request.text(), signature, webhookSecret)
  } catch {
    return NextResponse.json({ error: 'Invalid webhook signature.' }, { status: 400 })
  }

  if (
    event.type === 'checkout.session.completed' ||
    event.type === 'checkout.session.async_payment_succeeded'
  ) {
    const session = event.data.object as Stripe.Checkout.Session
    const applicationId = session.metadata?.applicationId
    if (applicationId) {
      const paymentIntent =
        typeof session.payment_intent === 'string'
          ? session.payment_intent
          : session.payment_intent?.id
      await markApplicationPaid(applicationId, paymentIntent ?? null)
    }
  }

  if (event.type === 'payment_intent.succeeded') {
    const paymentIntent = event.data.object as Stripe.PaymentIntent
    const applicationId = paymentIntent.metadata.applicationId
    if (applicationId) {
      await markApplicationPaid(applicationId, paymentIntent.id)
    }
  }

  if (event.type === 'payment_intent.payment_failed') {
    const paymentIntent = event.data.object as Stripe.PaymentIntent
    const applicationId = paymentIntent.metadata.applicationId
    if (applicationId) {
      await prisma.evisa_applications.updateMany({
        where: { id: applicationId },
        data: { paymentStatus: 'FAILED', updatedAt: new Date() },
      })
    }
  }

  return NextResponse.json({ received: true })
}
