'use client'

import { useRouter } from 'next/navigation'
import { ChangeEvent, FormEvent, useState } from 'react'
import { toast } from 'sonner'
import { v4 as uuidv4 } from 'uuid'

import {
  FormBuilderProps,
  FormState,
  Question,
} from '@/components/forms/form-builder.type'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

export default function FormBuilder({
  initialData = {
    title: '',
    description: '',
    questions: [
      {
        id: uuidv4(),
        text: '',
      },
    ],
  },
  isEditing = false,
  formId,
}: FormBuilderProps) {
  const router = useRouter()

  const [isSumitting, setIsSumitting] = useState(false)

  const [form, setForm] = useState<FormState>(initialData)

  function handleChange(
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) {
    // Desestructuramos id y value de current Target
    const { id, value } = e.currentTarget

    setForm((prev) => ({ ...prev, [id]: value }))
  }

  // Se abstrajo la funcionalidad de esas dos funciones en una

  /*
    function handleTitleChange(e: ChangeEvent<HTMLInputElement>) {
        const value = e.currentTarget.value
        setForm(prev => ({...prev, title: value}))
    }

    function handleDescriptionChange(e: ChangeEvent<HTMLTextAreaElement>) {
        const value = e.currentTarget.value
        setForm(prev => ({...prev, description: value}))
    }

     */

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (!form.title.trim()) {
      toast.error('Title is required')
      return
    }

    const emptyQuestion = form.questions.some((q) => !q.text.trim())

    if (emptyQuestion) {
      toast.error('All questions must have text')
      return
    }

    try {
      setIsSumitting(true)

      // C - url y method por el isEditing -----------------------------
      const url = isEditing ? `/api/forms/${formId}` : '/api/forms'
      const method = isEditing ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      })

      if (!response.ok) {
        const error = await response.text()
        throw new Error(error)
      }

      const data = await response.json()

      toast.success(isEditing ? 'Form updated!' : 'Form created!', {
        description: 'Your form has been saved succsfully',
      })

      // C
      /*toast.success('Form created!', {
        description: 'Your form has been saved succsfully',
      })*/

      router.push(`/dashboard/forms/${data.id}`)
      router.refresh()
    } catch (e) {
      console.error('Error saving form: ', e)
      toast.error('Error', {
        description: 'Oh no! there was an error while saving your form',
      })
    } finally {
      setIsSumitting(false)
    }
  }

  const handleAddQuestion = () => {
    const question: Question = {
      id: uuidv4(),
      text: '',
    }

    setForm((prev) => ({ ...prev, questions: [...prev.questions, question] }))
  }

  const handleRemoveQuestion = (question: Question) => {
    if (form.questions.length > 1) {
      const newArray: Question[] = form.questions.filter(
        (q) => q.id !== question.id,
      )
      setForm({ ...form, questions: newArray })
    } else {
      toast.error('Form must have at least one question')
    }
  }

  const handleQuestionInput = (
    e: ChangeEvent<HTMLTextAreaElement>,
    index: number,
  ) => {
    const updatedQuestions = [...form.questions]
    updatedQuestions[index].text = e.currentTarget.value

    setForm((prev) => ({ ...prev, questions: updatedQuestions }))
  }

  return (
    <form className='space-y-6' onSubmit={handleSubmit}>
      <div className='space-y-4'>
        <div>
          <Label htmlFor='title'>Title</Label>
          <Input
            id='title'
            value={form.title}
            onChange={handleChange}
            placeholder='Enter form title'
            className='mt-1'
          />
        </div>
        <div>
          <Label htmlFor='description'>Description (optional)</Label>
          <Textarea
            id='description'
            value={form.description}
            onChange={handleChange}
            placeholder='Enter form description'
            className='mt-1'
          />
        </div>
      </div>

      <div className='space-y-6'>
        <div className='flex items-center justify-between'>
          <h3 className='text-lg font-medium'>Questions</h3>
          <Button variant='default' type='button' onClick={handleAddQuestion}>
            Add Question
          </Button>
        </div>

        {form.questions.map((question, index) => (
          <div key={question.id} className='space-y-2 p-2 border rounded-md'>
            <div className='flex items-center justify-between'>
              <Label htmlFor={`Question-${index}`}>Question {index + 1}</Label>
              <Button
                variant='ghost'
                type='button'
                size='sm'
                className='text-red-500 hover:text-red-700'
                onClick={() => {
                  handleRemoveQuestion(question)
                }}
              >
                remove
              </Button>
            </div>
            <Textarea
              id={`Question-${index}`}
              value={question.text}
              onChange={(e) => {
                handleQuestionInput(e, index)
              }}
              placeholder='Enter your question'
              className='mt-1'
            />
          </div>
        ))}
      </div>

      <div className='flex gap-2 justify-end'>
        <Button
          type='button'
          variant='outline'
          onClick={() => router.back()}
          disabled={isSumitting}
        >
          Cancel
        </Button>
        <Button type='submit' disabled={isSumitting}>
          {isSumitting
            ? 'Saving...'
            : isEditing
              ? 'Update form'
              : 'Create form'}
        </Button>
      </div>
    </form>
  )
}
