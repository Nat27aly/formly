import { auth } from '@clerk/nextjs/server'
import React from 'react'

import Header from '@/components/layout/header'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { isAuthenticated, redirectToSignIn } = await auth()

  if (!isAuthenticated) return redirectToSignIn()

  return (
    <div className='min-h-screen flex flex-col'>
      <Header />
      <main className='flex-1 container mx-auto p-4'>{children}</main>
    </div>
  )
}
