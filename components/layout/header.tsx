import { UserButton } from '@clerk/nextjs'
import Link from 'next/link'

import { Button } from '@/components/ui/button'

export default function Header() {
  return (
    <header className='bg-background border-b'>
      <div className='container flex h-16 items-center justify-between px-4 mx-auto'>
        <div className='flex items-center gap-6'>
          <Link className='text-2xl font-bold' href='/'>
            Formly
          </Link>
          <nav className='hidden md:flex gap-6'>
            <Link
              className='text-muted-foreground hover:text-foreground transition-colors'
              href='/dashboard'
            >
              Dashboard
            </Link>
            <Link
              className='text-muted-foreground hover:text-foreground transition-colors'
              href='/dashboard/forms'
            >
              My Forms
            </Link>
          </nav>
        </div>
        <div className='flex items-center gap-4'>
          <Button asChild variant='outline'>
            <Link href='/dashboard/forms/create'>Create Form</Link>
          </Button>
          <UserButton />
        </div>
      </div>
    </header>
  )
}
