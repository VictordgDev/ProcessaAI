import { NextResponse } from 'next/server'
import { requireRole } from '@/lib/auth/guard'
import { ROLES } from '@/constants/roles'

export async function GET(request) {
  const { user, error } = await requireRole([ROLES.ADMIN])
  if (error) return NextResponse.json({ error }, { status: 401 })

  return NextResponse.json({ message: 'Configurações do sistema' })
}

export async function PATCH(request) {
  const { user, error } = await requireRole([ROLES.ADMIN])
  if (error) return NextResponse.json({ error }, { status: 401 })

  return NextResponse.json({ message: 'Configurações atualizadas' })
}
