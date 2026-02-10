import { NextResponse } from 'next/server'
import prisma from '@/lib/db/prisma'
import { requireRole } from '@/lib/auth/guard'
import { ROLES } from '@/constants/roles'

export async function PATCH(request, { params }) {
  const { user, error } = await requireRole([ROLES.ADMIN])
  if (error) return NextResponse.json({ error }, { status: 401 })

  try {
    const { id } = params
    const { hidden } = await request.json()

    const review = await prisma.review.update({
      where: { id },
      data: { hidden },
    })

    return NextResponse.json(review)
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao atualizar avaliação' }, { status: 500 })
  }
}
