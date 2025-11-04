import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import prisma from '@/lib/db'

export default function Home() {
  return (
    <div className='flex flex-col min-h-screen '>
      <header className='bg-white border-gray-200 py-4 '>
        <div className='container mx-auto px-4 flex justify-between items center '>
          <h1 className='text-2xl font-bold '>Formly</h1>
          <div className='flex gap-2'>
            {' '}
            {/* Nat className */}
            <SignedOut>
              <SignInButton>
                <Button>Sign in</Button>
              </SignInButton>
              <SignUpButton>
                {/* Nat add button SignUp*/}
                <Button>Sign Up</Button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <Button asChild>
                <Link href='/dashboard'>Dashboard</Link>
              </Button>
              <UserButton />
              {/* Nat add button SignUp*/}
            </SignedIn>
          </div>
        </div>
      </header>
      <div className='bg-blue-50 flex-1 '>
        <div className='container mx-auto px-4 py-20 text-center'>
          <h2 className='text-4xl md:text-6xl font-bold mb-6'>
            Create your custom form in few simple steps.
          </h2>
          <p className='text-lg md:text-xl text-gray-700 mb-8 max-w-xl mx-auto'>
            Build forms, share tem, collect responses and analyze data, all in
            the same platform, lets do it.
          </p>
          <SignedIn>
            <Button asChild size='lg'>
              <Link href='/dashboard/forms/create'>Create a Form</Link>
            </Button>
          </SignedIn>
          <SignedOut>
            <SignInButton>
              <Button>Get started</Button>
            </SignInButton>
          </SignedOut>
        </div>
      </div>
    </div>
  )
}
