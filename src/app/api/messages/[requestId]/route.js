import { NextResponse } from 'next/server'
import prisma from '@/lib/db/prisma'
import { requireAuth } from '@/lib/auth/guard'

export async function GET(request, { params }) {
  const { user, error } = await requireAuth()
  if (error) return NextResponse.json({ error }, { status: 401 })

  try {
    const { requestId } = params

    const messages = await prisma.message.findMany({
      where: { requestId },
      include: { user: { select: { name: true, role: true } } },
      orderBy: { createdAt: 'asc' },
    })

    return NextResponse.json(messages)
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao buscar mensagens' }, { status: 500 })
  }
}

export async function POST(request, { params }) {
  const { user, error } = await requireAuth()
  if (error) return NextResponse.json({ error }, { status: 401 })

  try {
    const { requestId } = params
    const { content } = await request.json()

    const message = await prisma.message.create({
      data: {
        requestId,
        userId: user.id,
        content,
      },
      include: { user: { select: { name: true, role: true } } },
    })

    return NextResponse.json(message, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao enviar mensagem' }, { status: 500 })
  }
}
