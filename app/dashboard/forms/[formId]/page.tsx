import { auth } from '@clerk/nextjs/server'
import Link from 'next/link'
import { redirect } from 'next/navigation'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import prisma from '@/lib/db'

export default async function FormDetailsPage({
  params,
}: {
  params: Promise<{ formId: string }>
}) {
  // Check if the user is Sign In
  const { userId, redirectToSignIn } = await auth()
  const { formId } = await params

  if (!userId) return redirectToSignIn()

  // Get data: formID from Prisma and stracts info
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
      _count: {
        select: {
          responses: true,
        },
      },
    },
  })

  if (!form) {
    redirect('/dashboard/forms')
  }
  if (form.userId !== userId) {
    redirect('/dashboard/forms')
  }

  const formUrl = `${process.env.NEXT_PUBLIC_APP_URL || ''}forms/${formId}`

  return (
    <div className='max-w-3xl mx-auto space-y-6'>
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-3xl font-bold'>{form?.title}</h1>
          {form.description && (
            <p className='text-gray-500 mt-1'>{form.description}</p>
          )}
        </div>
        <div className='flex gap-2'>
          <Button asChild variant='outline'>
            <Link href={`/dashboard/forms/${formId}/edit`}>Edit</Link>
          </Button>
          <Button asChild>
            <Link href={`/dashboard/forms/${formId}/responses`}>
              View Responses ({form._count.responses})
            </Link>
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Share your form</CardTitle>
          <CardDescription>
            Share this link others to collect responses
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className='p-2 border rounded-md bg-gray-50'>{formUrl}</p>
        </CardContent>
      </Card>

      <div className='space-y-4'>
        <h2 className='text-xl font-bold'>Questions</h2>
        <div className='space-y-2'>
          {form.questions.map((question, index) => (
            <Card key={question.id}>
              <CardContent className='p-4'>
                <p className='font-medium'>
                  {index + 1}. {question.text}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
