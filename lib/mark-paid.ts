import { after } from 'next/server'
import { applicationConfirmationEmail } from '@/lib/emails'
import { isLocale, type Locale } from '@/lib/i18n'
import { sendMail } from '@/lib/mailer'
import { prisma } from '@/lib/prisma'

/**
 * Passe une demande à « payée » et envoie la confirmation au client.
 *
 * Quatre chemins peuvent confirmer le même paiement (retour du navigateur,
 * plusieurs événements du webhook Stripe), souvent à quelques millisecondes
 * d'intervalle. La mise à jour est donc conditionnelle : seul l'appel qui fait
 * réellement passer la demande de « non payée » à « payée » voit `count === 1`,
 * et lui seul envoie l'e-mail. Les autres ne font rien.
 */
export async function markApplicationPaid(applicationId: string, paymentIntentId: string | null) {
  const { count } = await prisma.evisa_applications.updateMany({
    where: { id: applicationId, paymentStatus: { not: 'PAID' } },
    data: {
      stripePaymentId: paymentIntentId,
      paymentStatus: 'PAID',
      status: 'SUBMITTED',
      updatedAt: new Date(),
    },
  })

  if (count === 1) {
    // Après la réponse : le SMTP ne retarde ni le client ni l'accusé du webhook.
    after(() => sendConfirmation(applicationId))
  }

  return count === 1
}

async function sendConfirmation(applicationId: string) {
  try {
    const application = await prisma.evisa_applications.findUnique({
      where: { id: applicationId },
      select: {
        applicantEmail: true,
        applicantName: true,
        applicationNumber: true,
        totalAmount: true,
        formData: true,
      },
    })
    if (!application) return

    const email = applicationConfirmationEmail({
      locale: localeOf(application.formData),
      name: application.applicantName,
      reference: application.applicationNumber,
      amount: application.totalAmount,
    })

    await sendMail({ to: application.applicantEmail, ...email })
  } catch (error) {
    console.error('[mark-paid] confirmation non envoyée :', applicationId, error)
  }
}

function localeOf(formData: string): Locale {
  try {
    const locale = (JSON.parse(formData) as { locale?: unknown }).locale
    return typeof locale === 'string' && isLocale(locale) ? locale : 'fr'
  } catch {
    return 'fr'
  }
}
