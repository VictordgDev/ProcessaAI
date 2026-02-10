import { NextResponse } from 'next/server'
import prisma from '@/lib/db/prisma'
import { requireRole } from '@/lib/auth/guard'
import { ROLES } from '@/constants/roles'

export async function PATCH(request, { params }) {
  const { user, error } = await requireRole([ROLES.PROVIDER, ROLES.ADMIN])
  if (error) return NextResponse.json({ error }, { status: 401 })

  try {
    const { id } = params
    const body = await request.json()

    const service = await prisma.service.findUnique({ where: { id } })
    if (!service) {
      return NextResponse.json({ error: 'Serviço não encontrado' }, { status: 404 })
    }

    const updated = await prisma.service.update({
      where: { id },
      data: body,
    })

    return NextResponse.json(updated)
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao atualizar serviço' }, { status: 500 })
  }
}

export async function DELETE(request, { params }) {
  const { user, error } = await requireRole([ROLES.PROVIDER, ROLES.ADMIN])
  if (error) return NextResponse.json({ error }, { status: 401 })

  try {
    const { id } = params

    await prisma.service.delete({ where: { id } })

    return NextResponse.json({ message: 'Serviço deletado' })
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao deletar serviço' }, { status: 500 })
  }
}
