import { NextResponse } from 'next/server'
import prisma from '@/lib/db/prisma'
import { requireRole } from '@/lib/auth/guard'
import { ROLES } from '@/constants/roles'

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const search = searchParams.get('search')

    const where = {
      verified: true,
    }

    if (category) {
      where.categories = { has: category }
    }

    if (search) {
      where.user = {
        name: { contains: search, mode: 'insensitive' }
      }
    }

    const providers = await prisma.providerProfile.findMany({
      where,
      include: {
        user: { select: { name: true, email: true } },
      },
      orderBy: { rating: 'desc' },
    })

    return NextResponse.json(providers)
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao buscar prestadores' }, { status: 500 })
  }
}

export async function POST(request) {
  const { user, error } = await requireRole([ROLES.ADMIN])
  if (error) return NextResponse.json({ error }, { status: 401 })

  try {
    const body = await request.json()
    // Implementar criação de prestador
    return NextResponse.json({ message: 'Prestador criado' }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao criar prestador' }, { status: 500 })
  }
}
