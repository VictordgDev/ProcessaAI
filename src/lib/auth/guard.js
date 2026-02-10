import { getSession } from './session'
import { NextResponse } from 'next/server'

export async function requireAuth() {
  const session = await getSession()
  
  if (!session) {
    return { error: 'Não autenticado', status: 401 }
  }
  
  return { user: session.user }
}

export async function requireRole(allowedRoles) {
  const { user, error } = await requireAuth()
  
  if (error) {
    return { error, status: 401 }
  }
  
  if (!allowedRoles.includes(user.role)) {
    return { error: 'Acesso negado', status: 403 }
  }
  
  return { user }
}

export function unauthorized(message = 'Não autorizado') {
  return NextResponse.json({ error: message }, { status: 401 })
}

export function forbidden(message = 'Acesso negado') {
  return NextResponse.json({ error: message }, { status: 403 })
}
