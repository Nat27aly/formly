import Link from 'next/link'

import DeleteFormButton from '@/components/forms/delete-form-button'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export default function FormCard(props: FormCardProps) {
  // Desetructuración de las Props
  const { id, title, description, createdAt, responsesCount } = props

  const formattedDate = new Date(createdAt).toLocaleDateString()

  return (
    <Card className='mt-12'>
      <CardHeader>
        <CardTitle className='truncate pb-2'>{title}</CardTitle>
        {description && (
          <CardDescription className='line-clamp-2'>
            {description}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent className='flex-1'>
        <p className='text-sm text-gray-500'>({responsesCount}) responses</p>
        <p className='text-sm text-gray-500'>Creation Date: {formattedDate}</p>
      </CardContent>
      <CardFooter className='flex justify-between gap-2'>
        <Button asChild variant='outline' className='flex-1'>
          <Link href={`/dashboard/forms/${id}`}>View</Link>
        </Button>
        <Button asChild className='flex-1'>
          <Link href={`/dashboard/forms/${id}/responses`}>Responses</Link>
        </Button>
        <DeleteFormButton formId={id} />
      </CardFooter>
    </Card>
  )
}
