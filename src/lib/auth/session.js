import { getServerSession } from 'next-auth'
import { authOptions } from './options'

export async function getSession() {
  return await getServerSession(authOptions)
}

export async function getCurrentUser() {
  const session = await getSession()
  return session?.user
}
