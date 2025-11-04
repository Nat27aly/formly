'use client'

import { useRouter } from 'next/navigation'
import { FormEvent, useState } from 'react'
import { toast } from 'sonner'

import { FormPreviewProps } from '@/components/forms/form-preview.type'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

export default function FormPreview({ form }: FormPreviewProps) {
  const router = useRouter()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [answers, setAnswers] = useState(
    // Initial state of answers that will be handled in handleAnswerChange
    form.questions.map((q) => ({ questionId: q.id, text: '' })),
  )
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  const sortedQuestions = form.questions.sort((a, b) => a.order - b.order)

  const handleAnswerChange = (questionId: string, text: string) => {
    setAnswers((prev) => {
      // The questions not changed keep the inital state :a
      return prev.map((a) => (a.questionId === questionId ? { ...a, text } : a))
    })
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    setIsSubmitting(true)

    // Validate empty fields
    const emptyAnswers = answers.some((a) => !a.text.trim())
    if (emptyAnswers) {
      toast.error('All questions are required!')
      return
    }

    try {
      const response = await fetch('/api/responses', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          formId: form.id,
          answers,
          respondentName: name,
          respondentEmail: email,
        }),
      })

      if (!response.ok) {
        throw new Error(await response.text())
      }

      toast.success('Response submitted', {
        description: 'Thank you for completing this form.',
      })

      // Reset form after the response get submitted
      setAnswers(form.questions.map((q) => ({ questionId: q.id, text: '' })))
      setName('')
      setEmail('')

      // Redirect to thank u page ot Home
      router.push('/')
    } catch (e) {
      console.error('Error submitting form: ', e)
      toast.error('Error', {
        description: 'Something ent wrong while submitting your response.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className='max-w-xl mx-auto'>
      <div className='mb-8'>
        <h1 className='text-2xl font-bold'>{form.title}</h1>
        {form.description && (
          <p className='mt-2 text-gray-600'>{form.description}</p>
        )}
      </div>

      <form className='space-y-6' onSubmit={handleSubmit}>
        <div className='space-y-4 '>
          <Label>Your Name (optional)</Label>
          <Input
            className='mt-1'
            disabled={isSubmitting}
            placeholder='Enter your name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className='space-y-4'>
          <Label>Your Email (optional)</Label>
          <Input
            className='mt-1'
            disabled={isSubmitting}
            placeholder='Enter your Email'
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className='space-y-4'>
          {sortedQuestions.map((question, index) => (
            <div key={question.id} className='space-y-2'>
              <Label className='font-medium'>
                {index + 1}. {question.text}
              </Label>
              <Textarea
                disabled={isSubmitting}
                placeholder='Type your answer here'
                value={
                  answers.find((a) => a.questionId === question.id)?.text || ''
                }
                onChange={(e) =>
                  handleAnswerChange(question.id, e.target.value)
                }
              />
            </div>
          ))}
        </div>
        <div className='flex justify-end'>
          <Button type='submit' disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : 'Submit Response'}
          </Button>
        </div>
      </form>
    </div>
  )
}
