import { auth } from '@clerk/nextjs/server'
import Link from 'next/link'

import FormList from '@/components/forms/form-list'
import { Button } from '@/components/ui/button'
import prisma from '@/lib/db'

export default async function FormPage() {
  const { userId, redirectToSignIn } = await auth()

  // Validation
  if (!userId) return redirectToSignIn()

  // Get de Forms
  const forms = await prisma.form.findMany({
    where: {
      userId,
    },
    include: {
      _count: {
        select: {
          responses: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  return (
    <div className='space-y-6'>
      <div>
        <h1 className='text-3xl font-bold '>My Forms</h1>
        <p className='text-gray-500 mt-2'>Create and manage your forms</p>
      </div>

      <FormList forms={forms} />
    </div>
  )
}
