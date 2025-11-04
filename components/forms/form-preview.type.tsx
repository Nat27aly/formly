import { Question } from '@/lib/generated/prisma'

export type FormPreviewProps = {
  form: {
    id: string
    title: string
    description: string | null
    questions: Question[]
  }
}
