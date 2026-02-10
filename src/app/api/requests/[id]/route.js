import { NextResponse } from 'next/server'
import prisma from '@/lib/db/prisma'
import { requireAuth } from '@/lib/auth/guard'

export async function GET(request, { params }) {
  const { user, error } = await requireAuth()
  if (error) return NextResponse.json({ error }, { status: 401 })

  try {
    const { id } = params

    const req = await prisma.request.findUnique({
      where: { id },
      include: {
        client: { select: { name: true, email: true } },
        provider: { include: { user: { select: { name: true } } } },
        messages: {
          include: { user: { select: { name: true } } },
          orderBy: { createdAt: 'asc' },
        },
      },
    })

    if (!req) {
      return NextResponse.json({ error: 'Solicitação não encontrada' }, { status: 404 })
    }

    return NextResponse.json(req)
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao buscar solicitação' }, { status: 500 })
  }
}

export async function PATCH(request, { params }) {
  const { user, error } = await requireAuth()
  if (error) return NextResponse.json({ error }, { status: 401 })

  try {
    const { id } = params
    const body = await request.json()

    const updated = await prisma.request.update({
      where: { id },
      data: body,
    })

    return NextResponse.json(updated)
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao atualizar solicitação' }, { status: 500 })
  }
}
