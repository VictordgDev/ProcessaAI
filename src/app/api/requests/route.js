import { NextResponse } from 'next/server'
import prisma from '@/lib/db/prisma'
import { requireRole } from '@/lib/auth/guard'
import { ROLES } from '@/constants/roles'

export async function GET(request) {
  const { user, error } = await requireRole([ROLES.CLIENT, ROLES.PROVIDER, ROLES.ADMIN])
  if (error) return NextResponse.json({ error }, { status: 401 })

  try {
    const where = {}
    
    if (user.role === ROLES.CLIENT) {
      where.clientId = user.id
    } else if (user.role === ROLES.PROVIDER) {
      const provider = await prisma.providerProfile.findUnique({
        where: { userId: user.id },
      })
      where.providerId = provider?.id
    }

    const requests = await prisma.request.findMany({
      where,
      include: {
        client: { select: { name: true, email: true } },
        provider: { include: { user: { select: { name: true } } } },
      },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(requests)
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao buscar solicitações' }, { status: 500 })
  }
}

export async function POST(request) {
  const { user, error } = await requireRole([ROLES.CLIENT])
  if (error) return NextResponse.json({ error }, { status: 401 })

  try {
    const body = await request.json()
    const { title, description, category } = body

    const newRequest = await prisma.request.create({
      data: {
        clientId: user.id,
        title,
        description,
        category,
      },
    })

    return NextResponse.json(newRequest, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao criar solicitação' }, { status: 500 })
  }
}
