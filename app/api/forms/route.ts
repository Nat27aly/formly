import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

import prisma from '@/lib/db'

export async function POST(req: Request) {
  const { userId } = await auth()

  if (!userId) {
    return new NextResponse('Unauthorized', { status: 401 })
  }

  const { title, description, questions } = await req.json()
  // Validation
  if (!title) {
    return new NextResponse('Title is required', { status: 400 })
  }
  if (!questions || questions.length === 0) {
    return new NextResponse('At least one question is required', {
      status: 400,
    })
  }

  const form = await prisma.form.create({
    data: {
      title,
      description,
      userId,
      questions: {
        create: questions.map((q: { text: string }, index: number) => ({
          text: q.text,
          order: index,
        })),
      },
    },
    include: {
      questions: true,
    },
  })
  return NextResponse.json(form)
}
