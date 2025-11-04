'use client'

import Link from 'next/link'
import { useState } from 'react'

import FormCard from '@/components/forms/form-card'
import type { FormListProps } from '@/components/forms/form-list.type'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

// Search forms function
export default function FormList({ forms }: FormListProps) {
  const [searchValue, setSearchValue] = useState<string>('')

  // Handle input search with lower case
  const filteredForms = forms.filter((form) =>
    form.title.toLowerCase().includes(searchValue.toLowerCase()),
  )

  return (
    <div>
      <div className='flex flex-col sm:flex-row gap-4 items-center justify-between'>
        <Input
          placeholder='Search forms...'
          value={searchValue}
          onChange={(event) => setSearchValue(event.target.value)}
          className='max-w-sm'
        />
        <Button>
          <Link href={'/dashboard/forms/create'}>Create form</Link>
        </Button>
      </div>

      {filteredForms.length === 0 ? (
        <div className='text-center py-8'>
          <p className='text-gray-500'>
            No forms found. Lets create your first form!
          </p>
        </div>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {filteredForms.map((form) => (
            <FormCard
              key={form.id}
              id={form.id}
              title={form.title}
              description={form.description}
              responsesCount={form._count.responses}
              createdAt={form.createdAt}
            />
          ))}
        </div>
      )}
    </div>
  )
}
