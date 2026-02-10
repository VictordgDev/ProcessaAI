import { NextResponse } from 'next/server'
import prisma from '@/lib/db/prisma'
import { requireRole } from '@/lib/auth/guard'
import { ROLES } from '@/constants/roles'

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const providerId = searchParams.get('providerId')

    const where = { hidden: false }
    if (providerId) where.providerId = providerId

    const reviews = await prisma.review.findMany({
      where,
      include: { client: { select: { name: true } } },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(reviews)
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao buscar avaliações' }, { status: 500 })
  }
}

export async function POST(request) {
  const { user, error } = await requireRole([ROLES.CLIENT])
  if (error) return NextResponse.json({ error }, { status: 401 })

  try {
    const { providerId, rating, comment } = await request.json()

    const review = await prisma.review.create({
      data: {
        clientId: user.id,
        providerId,
        rating,
        comment,
      },
    })

    // Atualizar rating do prestador
    const reviews = await prisma.review.findMany({
      where: { providerId, hidden: false },
    })
    const avgRating = reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length

    await prisma.providerProfile.update({
      where: { id: providerId },
      data: {
        rating: avgRating,
        reviewCount: reviews.length,
      },
    })

    return NextResponse.json(review, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao criar avaliação' }, { status: 500 })
  }
}
