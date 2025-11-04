import { auth, currentUser } from '@clerk/nextjs/server'

import prisma from '@/lib/db'

export async function syncUserWithDB() {
  try {
    const { userId } = await auth()
    const user = await currentUser()

    if (!userId || !user) {
      console.error('No authenticated user found')
      return null
    }
    // Upsert user to DB

    const dbUser = await prisma.user.upsert({
      where: {
        id: userId,
      },
      update: {
        email: user.emailAddresses[0]?.emailAddress || '',
        username: user.username || user?.firstName || 'user',
      },
      create: {
        id: userId,
        email: user.emailAddresses[0]?.emailAddress || '',
        username: user.username || user?.firstName || 'user',
      },
    })
    console.log('User sync with DDBB', dbUser.id)
    return dbUser
  } catch (error) {
    console.error('Error syncing user with DDBB')
    return null
  }
}
