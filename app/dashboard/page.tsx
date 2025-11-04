import { auth } from '@clerk/nextjs/server'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { syncUserWithDB } from '@/lib/clerk-sync'
import prisma from '@/lib/db'

export default async function Dashboard() {
  const { userId, redirectToSignIn } = await auth()
  if (!userId) return redirectToSignIn()

  // Sync user data whenever they access the dashboard
  await syncUserWithDB()

  // Get Users forms and responses counts
  const formsCount = await prisma.form.count({
    where: {
      userId,
    },
  })

  const responseCount = await prisma.formResponse.count({
    where: {
      form: {
        userId,
      },
    },
  })

  // Get recent forms

  const recentForms = await prisma.form.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: 'desc',
    },
    take: 5,
    include: {
      _count: {
        select: { responses: true },
      },
    },
  })

  return (
    <div>
      <div className='space-y-6'>
        <h1 className='text-3xl font-bold'>Welcome, Naty</h1>
        <p className='text-gray-500 mt-1 '>
          Take a look to your forms and responses
        </p>
      </div>

      <div className='grid grid-cols-1 gap-4 md:grid-cols-3 mt-6'>
        <div className='bg-white rounded-lg shadow p-6 border'>
          <h2 className='text-xl font-medium'>Your Forms</h2>
          <p className='text-3xl font-bold mt-2'>{formsCount}</p>
          <Button className='mt-4' asChild>
            <Link href='/dashboard/forms'>View all Forms</Link>
          </Button>
        </div>

        <div className='bg-white rounded-lg shadow p-6 border'>
          <h2 className='text-xl font-medium'>Total Responses</h2>
          <p className='text-3xl font-bold mt-2'>{responseCount}</p>
        </div>

        <div className='bg-white rounded-lg shadow p-6 border'>
          <h2 className='text-xl font-medium'>Create New</h2>
          <p className='text-xl text-gray-500 mt-2'>
            Start creating a new form
          </p>
          <Button className='mt-4' asChild>
            <Link href='/dashboard/forms/create'>Create Form</Link>
          </Button>
        </div>
      </div>

      <div className='bg-white rounded-lg shadow p-6 border mt-6'>
        <h2 className='tect-xl font-medium mb-4'>Recent forms</h2>
        {recentForms.length === 0 ? (
          <p>{'You havent create any form yet.'}</p>
        ) : (
          <div className='space-y-4'>
            {recentForms.map((form) => (
              <div
                className='flex items-center justify-between border-b pb-4'
                key={form.id}
              >
                <div>
                  <h3 className='font-medium'>{form.title}</h3>
                  <p className='text-sm text-gray-500'>
                    {form._count.responses} responses - Created in {''}
                    {new Date(form.createdAt).toLocaleDateString()}
                    Responses created on 21 of april of 2025
                  </p>
                </div>
                <div className='flex gap-2'>
                  <Button asChild>
                    <Link href={`/dashboard/forms/${form.id}`}>View</Link>
                  </Button>
                  <Button>
                    <Link href={`/dashboard/forms/${form.id}/responses`}>
                      Responses
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
        <div className='space-y-4'></div>
      </div>
    </div>
  )
}
