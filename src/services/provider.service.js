import prisma from '@/lib/db/prisma'

export async function getProviders(filters = {}) {
  const where = { verified: true }
  
  if (filters.category) {
    where.categories = { has: filters.category }
  }
  
  if (filters.search) {
    where.user = {
      name: { contains: filters.search, mode: 'insensitive' }
    }
  }

  return await prisma.providerProfile.findMany({
    where,
    include: {
      user: { select: { name: true, email: true, image: true } },
    },
    orderBy: { rating: 'desc' },
  })
}

export async function getProviderBySlug(slug) {
  return await prisma.providerProfile.findUnique({
    where: { slug },
    include: {
      user: { select: { name: true, email: true, image: true } },
      services: { where: { active: true } },
      reviews: {
        where: { hidden: false },
        include: { client: { select: { name: true } } },
        orderBy: { createdAt: 'desc' },
      },
    },
  })
}
