import { NextResponse } from 'next/server'
import prisma from '@/lib/db/prisma'

export async function GET(request, { params }) {
  try {
    const { slug } = params

    const provider = await prisma.providerProfile.findUnique({
      where: { slug },
      include: {
        user: { select: { name: true, email: true, image: true } },
        services: { where: { active: true } },
        reviews: {
          where: { hidden: false },
          include: { client: { select: { name: true } } },
          orderBy: { createdAt: 'desc' },
          take: 10,
        },
      },
    })

    if (!provider) {
      return NextResponse.json({ error: 'Prestador não encontrado' }, { status: 404 })
    }

    return NextResponse.json(provider)
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao buscar prestador' }, { status: 500 })
  }
}
