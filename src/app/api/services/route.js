import { NextResponse } from 'next/server'
import prisma from '@/lib/db/prisma'
import { requireRole } from '@/lib/auth/guard'
import { ROLES } from '@/constants/roles'

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const providerId = searchParams.get('providerId')
    const category = searchParams.get('category')

    const where = { active: true }
    if (providerId) where.providerId = providerId
    if (category) where.category = category

    const services = await prisma.service.findMany({
      where,
      include: {
        provider: {
          include: { user: { select: { name: true } } },
        },
      },
    })

    return NextResponse.json(services)
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao buscar serviços' }, { status: 500 })
  }
}

export async function POST(request) {
  const { user, error } = await requireRole([ROLES.PROVIDER])
  if (error) return NextResponse.json({ error }, { status: 401 })

  try {
    const body = await request.json()
    const { title, description, category, price, priceType } = body

    const provider = await prisma.providerProfile.findUnique({
      where: { userId: user.id },
    })

    if (!provider) {
      return NextResponse.json({ error: 'Perfil de prestador não encontrado' }, { status: 404 })
    }

    const service = await prisma.service.create({
      data: {
        providerId: provider.id,
        title,
        description,
        category,
        price: price ? parseFloat(price) : null,
        priceType: priceType || 'negotiable',
      },
    })

    return NextResponse.json(service, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao criar serviço' }, { status: 500 })
  }
}
