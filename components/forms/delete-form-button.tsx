'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'

import { DeleteFormButtonProps } from '@/components/forms/delete-form-button.type'
import { Button } from '@/components/ui/button'

export default function DeleteFormButton({ formId }: DeleteFormButtonProps) {
  const [isDeleting, setIsDeleting] = useState(false)

  const router = useRouter()

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to DELETE this form?')) return

    setIsDeleting(true)

    try {
      const response = await fetch(`/api/forms/${formId}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        const error = await response.text()
        throw new Error(error)
      }

      toast.success('Form deleted sucessfully')
      router.refresh()
    } catch (e) {
      console.error('Failed to delete form', e)
      toast.error('Failed to delete the form. Please try again')
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <Button
      className='flex-1'
      variant='destructive'
      disabled={isDeleting}
      onClick={handleDelete}
    >
      {isDeleting ? 'Deleting...' : 'Delete'}
    </Button>
  )
}
