import type { Metadata } from 'next'
import Link from 'next/link'
import ClearApplicationDraft from '@/components/ClearApplicationDraft'
import { confirmCheckoutPayment } from '@/lib/confirm-payment'
import { path } from '@/lib/routes'

export const metadata: Metadata = {
  title: 'Paiement reçu',
  robots: { index: false, follow: false },
}

export default async function Page({ searchParams }: { searchParams: Promise<{ session_id?: string }> }) {
  const { session_id } = await searchParams
  const payment = await confirmCheckoutPayment(session_id)
  return (
    <div className="container-page py-20">
      <ClearApplicationDraft />
      <div className="card mx-auto max-w-2xl text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-ocean-100 text-2xl text-ocean-800">✓</div>
        <h1 className="mt-6 text-3xl font-bold">{payment?.paid ? 'Paiement confirmé' : 'Confirmation en cours'}</h1>
        <p className="mt-4 leading-relaxed text-slate-600">
          Votre demande a été enregistrée. La confirmation du paiement peut prendre quelques secondes.
          Conservez votre référence pour suivre le dossier.
        </p>
        {payment?.applicationNumber && (
          <p className="mt-6 rounded-xl bg-slate-50 px-4 py-3 font-mono font-semibold text-ocean-900">
            {payment.applicationNumber}
          </p>
        )}
        <Link href={path('tracking', 'fr')} className="btn-primary mt-8">Suivre mon dossier</Link>
      </div>
    </div>
  )
}
