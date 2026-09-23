import { markApplicationPaid } from '@/lib/mark-paid'
import { getStripe } from '@/lib/stripe'

export async function confirmCheckoutPayment(sessionId?: string) {
  if (!sessionId?.startsWith('cs_')) return null

  try {
    const session = await getStripe().checkout.sessions.retrieve(sessionId)
    const applicationId = session.metadata?.applicationId
    const applicationNumber = session.metadata?.applicationNumber
    if (!applicationId || !applicationNumber) return null

    if (session.payment_status === 'paid') {
      const paymentIntent =
        typeof session.payment_intent === 'string'
          ? session.payment_intent
          : session.payment_intent?.id
      await markApplicationPaid(applicationId, paymentIntent ?? null)
    }

    return { applicationNumber, paid: session.payment_status === 'paid' }
  } catch {
    return null
  }
}
