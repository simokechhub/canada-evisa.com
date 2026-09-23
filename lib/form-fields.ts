import { unstable_cache } from 'next/cache'
import { prisma } from '@/lib/prisma'

/** Fiche « eTA Canada » dans la base partagée (tables evisas / evisa_types). */
export const CANADA_EVISA_ID = 'cmfr7r9g70001x6ffvd9pb9u0'
export const CANADA_EVISA_TYPE_ID = 'cmfr8kwlx0003x6ffwlvw5lm6'

export type FieldType =
  | 'text'
  | 'textarea'
  | 'date'
  | 'email'
  | 'tel'
  | 'number'
  | 'country'
  | 'radio'
  | 'select'

type Bilingual = { en: string; fr: string }

export type FormField = {
  name: string
  type: FieldType
  required: boolean
  label: Bilingual
  placeholder: Bilingual | null
  /** `value` est toujours la valeur anglaise enregistrée en base. */
  options: { value: string; label: Bilingual }[]
}

export type FormStep = { id: string; name: string; fields: FormField[] }

/**
 * Types de la base → types du formulaire. La base mélange majuscules et
 * minuscules (« TEXT », « text », « PHONE », « tel »…). FILE n'est pas géré :
 * l'eTA ne demande aucune pièce justificative.
 */
const typeMap: Record<string, FieldType> = {
  text: 'text',
  textarea: 'textarea',
  date: 'date',
  email: 'email',
  phone: 'tel',
  tel: 'tel',
  number: 'number',
  country_select: 'country',
  radio: 'radio',
  select: 'select',
}

const parseList = (raw: string | null): string[] => {
  if (!raw) return []
  try {
    const parsed = JSON.parse(raw) as unknown
    return Array.isArray(parsed) ? parsed.map(String) : []
  } catch {
    return raw.split(',').map((item) => item.trim()).filter(Boolean)
  }
}

/** Champ ajouté par le site : la fiche Canada n'en contient pas, il est indispensable. */
export const EMAIL_FIELD: FormField = {
  name: 'email',
  type: 'email',
  required: true,
  label: { en: 'Email address', fr: 'Adresse e-mail' },
  placeholder: { en: 'name@example.com', fr: 'prenom.nom@exemple.com' },
  options: [],
}

async function loadFormSteps(): Promise<FormStep[]> {
  const [fields, groups] = await Promise.all([
    prisma.evisa_form_fields.findMany({
      where: { evisaId: CANADA_EVISA_ID },
      orderBy: { order: 'asc' },
    }),
    prisma.field_groups.findMany({ where: { isActive: true }, orderBy: { order: 'asc' } }),
  ])

  const steps = new Map<string, FormStep>()
  for (const group of groups) steps.set(group.id, { id: group.id, name: group.name, fields: [] })
  const ungrouped: FormStep = { id: 'other', name: 'Additional Information', fields: [] }

  for (const field of fields) {
    const type = typeMap[field.type.toLowerCase()]
    if (!type) continue

    const optionsEn = parseList(field.options)
    const optionsFr = parseList(field.optionsFr)

    const normalised: FormField = {
      name: field.name,
      type,
      required: field.required,
      label: { en: field.label, fr: field.labelFr || field.label },
      placeholder: field.placeholder
        ? { en: field.placeholder, fr: field.placeholderFr || field.placeholder }
        : null,
      // Aligné sur la liste anglaise : une option française sans équivalent
      // anglais (ex. « Autre ») n'aurait pas de valeur à enregistrer.
      options: optionsEn.map((value, index) => ({
        value,
        label: { en: value, fr: optionsFr[index] || value },
      })),
    }

    const step = (field.fieldGroupId && steps.get(field.fieldGroupId)) || ungrouped
    step.fields.push(normalised)
  }

  const result = [...steps.values(), ungrouped].filter((step) => step.fields.length > 0)
  const hasEmail = result.some((step) => step.fields.some((field) => field.type === 'email'))
  if (!hasEmail) result.push({ id: 'contact', name: 'Contact Information', fields: [EMAIL_FIELD] })
  return result
}

/**
 * Étapes du formulaire, relues au plus toutes les heures : une modification
 * faite dans l'administration apparaît sur le site sans redéploiement.
 */
export const getFormSteps = unstable_cache(loadFormSteps, ['canada-form-steps'], {
  revalidate: 3600,
  tags: ['form-fields'],
})
