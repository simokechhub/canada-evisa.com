import type { Metadata } from 'next'
import Link from 'next/link'
import ClearApplicationDraft from '@/components/ClearApplicationDraft'
import { confirmCheckoutPayment } from '@/lib/confirm-payment'
import { path } from '@/lib/routes'

export const metadata: Metadata = {
  title: 'Payment received',
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
        <h1 className="mt-6 text-3xl font-bold">{payment?.paid ? 'Payment confirmed' : 'Confirmation in progress'}</h1>
        <p className="mt-4 leading-relaxed text-slate-600">
          Your application has been saved. Payment confirmation may take a few seconds.
          Keep your reference to track the application.
        </p>
        {payment?.applicationNumber && (
          <p className="mt-6 rounded-xl bg-slate-50 px-4 py-3 font-mono font-semibold text-ocean-900">
            {payment.applicationNumber}
          </p>
        )}
        <Link href={path('tracking', 'en')} className="btn-primary mt-8">Track my application</Link>
      </div>
    </div>
  )
}
