'use client'

import { useState } from 'react'
import { CardCvcElement, CardExpiryElement, CardNumberElement, Elements, useElements, useStripe } from '@stripe/react-stripe-js'
// `/pure` : contrairement à l'import par défaut, n'injecte pas stripe.js dès
// l'import du module. Le script (~250 Ko) ne se charge qu'à l'étape de paiement.
import type { Stripe } from '@stripe/stripe-js'
import { loadStripe } from '@stripe/stripe-js/pure'
import { formatUsd, TOTAL_FEE_USD } from '@/lib/site'

const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
let stripePromise: Promise<Stripe | null> | null = null
const getStripePromise = () => {
  if (publishableKey && !stripePromise) stripePromise = loadStripe(publishableKey)
  return stripePromise
}

export default function EmbeddedStripeCheckout({
  clientSecret,
  locale,
  onSuccess,
}: {
  clientSecret: string
  locale: 'fr' | 'en'
  onSuccess: (applicationNumber: string) => void
}) {
  const stripe = getStripePromise()
  if (!stripe) {
    return (
      <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800" role="alert">
        {locale === 'fr'
          ? 'Le paiement sécurisé est momentanément indisponible.'
          : 'Secure payment is temporarily unavailable.'}
      </p>
    )
  }

  return (
    <Elements
      stripe={stripe}
      options={{
        clientSecret,
        locale,
        appearance: {
          theme: 'stripe',
          variables: {
            colorPrimary: '#d52b1e',
            colorText: '#123b3a',
            colorDanger: '#b42318',
            borderRadius: '12px',
            fontFamily: 'ui-sans-serif, system-ui, sans-serif',
          },
        },
      }}
    >
      <StripePaymentForm clientSecret={clientSecret} locale={locale} onSuccess={onSuccess} />
    </Elements>
  )
}

function StripePaymentForm({
  clientSecret,
  locale,
  onSuccess,
}: {
  clientSecret: string
  locale: 'fr' | 'en'
  onSuccess: (applicationNumber: string) => void
}) {
  const stripe = useStripe()
  const elements = useElements()
  const [processing, setProcessing] = useState(false)
  const [paymentError, setPaymentError] = useState<string | null>(null)
  const [cardReady, setCardReady] = useState(false)
  const fr = locale === 'fr'

  const pay = async () => {
    if (!stripe || !elements || processing) return
    setProcessing(true)
    setPaymentError(null)

    const card = elements.getElement(CardNumberElement)
    if (!card) {
      setPaymentError(fr ? 'Le formulaire de paiement ne peut pas être chargé. Actualisez la page.' : 'The payment form could not be loaded. Refresh the page.')
      setProcessing(false)
      return
    }

    const confirmation = stripe.confirmCardPayment(clientSecret, { payment_method: { card } })
    const result = await Promise.race([
      confirmation,
      new Promise<null>((resolve) => window.setTimeout(() => resolve(null), 8000)),
    ])

    if (!result) {
      try {
        const response = await fetch('/api/applications/payment-status', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ clientSecret }),
        })
        const status = (await response.json()) as {
          paymentIntentId?: string
          status?: string
          errorCode?: string | null
          errorMessage?: string | null
        }
        if (status.status === 'succeeded' && status.paymentIntentId) {
          await finishPayment(status.paymentIntentId, fr, onSuccess, setPaymentError, setProcessing)
          return
        }
        if (status.errorCode || status.errorMessage) {
          setPaymentError(
            status.errorCode === 'card_declined'
              ? (fr ? 'La carte a été refusée. Utilisez une autre carte ou contactez votre banque.' : 'The card was declined. Use another card or contact your bank.')
              : status.errorMessage || (fr ? 'La transaction a échoué.' : 'The transaction failed.'),
          )
        } else {
          setPaymentError(fr ? 'La confirmation du paiement prend trop de temps. Réessayez.' : 'Payment confirmation is taking too long. Please try again.')
        }
      } catch {
        setPaymentError(fr ? 'Impossible de vérifier le paiement. Réessayez.' : 'Unable to verify payment. Please try again.')
      }
      setProcessing(false)
      return
    }

    if (result.error) {
      setPaymentError(result.error.message || (fr ? 'La transaction a été refusée.' : 'The transaction was declined.'))
      setProcessing(false)
      return
    }

    if (result.paymentIntent?.status !== 'succeeded') {
      setPaymentError(fr ? 'Le paiement n’a pas pu être confirmé. Réessayez.' : 'The payment could not be confirmed. Please try again.')
      setProcessing(false)
      return
    }

    await finishPayment(result.paymentIntent.id, fr, onSuccess, setPaymentError, setProcessing)
  }

  return (
    <div className="space-y-5">
      <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-6">
        <p className="mb-4 text-sm font-semibold text-ocean-950">
          {fr ? 'Informations de carte' : 'Card details'}
        </p>
        {!cardReady && (
          <p className="mb-3 animate-pulse text-sm text-slate-500">
            {fr ? 'Chargement du formulaire sécurisé…' : 'Loading secure payment form…'}
          </p>
        )}
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className="mb-2 block text-sm font-medium text-slate-700">{fr ? 'Numéro de carte' : 'Card number'}</label>
            <StripeField>
              <CardNumberElement
                options={cardOptions('1234 1234 1234 1234')}
                onReady={() => setCardReady(true)}
                onChange={(event) => setPaymentError(event.error?.message ?? null)}
              />
            </StripeField>
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">{fr ? 'Date d’expiration' : 'Expiry date'}</label>
            <StripeField>
              <CardExpiryElement
                options={cardOptions(fr ? 'MM / AA' : 'MM / YY')}
                onChange={(event) => setPaymentError(event.error?.message ?? null)}
              />
            </StripeField>
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">CVC</label>
            <StripeField>
              <CardCvcElement
                options={cardOptions('CVC')}
                onChange={(event) => setPaymentError(event.error?.message ?? null)}
              />
            </StripeField>
          </div>
        </div>
      </div>
      <button type="button" onClick={() => void pay()} disabled={!stripe || !elements || !cardReady || processing} className="btn-primary w-full">
        {processing ? (fr ? 'Paiement en cours…' : 'Payment in progress…') : (fr ? `Payer ${formatUsd(TOTAL_FEE_USD, locale)}` : `Pay ${formatUsd(TOTAL_FEE_USD, locale)}`)}
      </button>
      {paymentError && (
        <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-800" role="alert" aria-live="polite">
          {paymentError}
        </p>
      )}
      <p className="text-center text-xs text-slate-500">
        {fr ? 'Paiement chiffré et traité par Stripe.' : 'Encrypted payment processed by Stripe.'}
      </p>
    </div>
  )
}

async function finishPayment(
  paymentIntentId: string,
  fr: boolean,
  onSuccess: (applicationNumber: string) => void,
  setPaymentError: (message: string | null) => void,
  setProcessing: (value: boolean) => void,
) {
  try {
    const response = await fetch('/api/applications/confirm', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ paymentIntentId }),
    })
    const confirmation = (await response.json()) as { applicationNumber?: string; error?: string }
    if (!response.ok || !confirmation.applicationNumber)
      throw new Error(confirmation.error || 'Confirmation unavailable')
    onSuccess(confirmation.applicationNumber)
  } catch {
    setPaymentError(
      fr
        ? 'Le paiement a été accepté, mais la confirmation prend plus de temps que prévu. Contactez-nous si ce message persiste.'
        : 'Payment was accepted, but confirmation is taking longer than expected. Contact us if this message persists.',
    )
    setProcessing(false)
  }
}

function StripeField({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-14 rounded-xl border border-slate-300 bg-white px-4 py-[17px] focus-within:border-ocean-600 focus-within:ring-2 focus-within:ring-ocean-100">
      {children}
    </div>
  )
}

function cardOptions(placeholder: string) {
  return {
    placeholder,
    style: {
      base: {
        color: '#123b3a',
        fontFamily: 'Arial, sans-serif',
        fontSize: '16px',
        fontSmoothing: 'antialiased',
        '::placeholder': { color: '#64748b' },
      },
      invalid: { color: '#b42318', iconColor: '#b42318' },
    },
  }
}
