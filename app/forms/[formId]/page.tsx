import { notFound } from 'next/navigation'

import FormPreview from '@/components/forms/form-preview'
import prisma from '@/lib/db'

export default async function PublicFormPage({
  params,
}: {
  params: Promise<{ formId: string }>
}) {
  const { formId } = await params

  const form = await prisma.form.findUnique({
    where: {
      id: formId,
    },
    include: {
      questions: {
        orderBy: {
          order: 'asc',
        },
      },
    },
  })

  if (!form) {
    return notFound()
  }

  return (
    <div className='min-h-screen bg-gray-50 py-12 '>
      <div className='container max-w-3xl mx-auto bg-white p-6 rounded-lg shadow'>
        <FormPreview form={form} />
      </div>
    </div>
  )
}
