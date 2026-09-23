import { NextRequest, NextResponse } from 'next/server'
import { CANADA_EVISA_ID } from '@/lib/form-fields'
import { prisma } from '@/lib/prisma'

export const runtime = 'nodejs'


export async function POST(request: NextRequest) {
  const requestOrigin = new URL(request.url).origin
  const origin = request.headers.get('origin')
  if (origin && origin !== requestOrigin)
    return NextResponse.json({ error: 'Invalid request.' }, { status: 403 })

  const body = (await request.json().catch(() => ({}))) as { reference?: unknown; email?: unknown }
  const reference = typeof body.reference === 'string' ? body.reference.trim().toUpperCase() : ''
  const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : ''
  if (!/^APP-\d{13}-[A-Z0-9]{9}$/i.test(reference) || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email))
    return NextResponse.json({ error: 'Invalid credentials.' }, { status: 422 })

  const application = await prisma.evisa_applications.findFirst({
    where: { applicationNumber: reference, applicantEmail: email, evisaId: CANADA_EVISA_ID },
    select: {
      applicationNumber: true,
      applicantName: true,
      applicantEmail: true,
      dateOfEntry: true,
      totalAmount: true,
      governmentFee: true,
      serviceFee: true,
      status: true,
      paymentStatus: true,
      submittedAt: true,
      updatedAt: true,
      processedAt: true,
      rejectionReason: true,
      formData: true,
    },
  })
  if (!application)
    return NextResponse.json({ error: 'Application not found.' }, { status: 404 })

  let form: Record<string, unknown> = {}
  try {
    const parsed = JSON.parse(application.formData) as unknown
    if (parsed && typeof parsed === 'object') form = parsed as Record<string, unknown>
  } catch {
    // Older records may contain malformed JSON; the core application remains visible.
  }

  const safeText = (key: string) => typeof form[key] === 'string' ? form[key] : null

  return NextResponse.json({
    applicationNumber: application.applicationNumber,
    applicantName: application.applicantName,
    applicantEmail: application.applicantEmail,
    status: application.status,
    paymentStatus: application.paymentStatus,
    submittedAt: application.submittedAt,
    updatedAt: application.updatedAt,
    processedAt: application.processedAt,
    rejectionReason: application.status === 'REJECTED' ? application.rejectionReason : null,
    totalAmount: application.totalAmount,
    governmentFee: application.governmentFee,
    serviceFee: application.serviceFee,
    details: {
      nationality: safeText('nationality'),
      countryOfResidence: safeText('country_of_residence'),
      purposeOfVisit: safeText('purpose_of_visit'),
      arrivalDate: safeText('intended_arrival_date') ?? application.dateOfEntry?.toISOString().slice(0, 10) ?? null,
      departureDate: safeText('intended_departure_date'),
      flightNumber: safeText('flight_cruise_number'),
      accommodation: safeText('accommodation_details'),
    },
  }, {
    headers: { 'Cache-Control': 'no-store, private' },
  })
}
