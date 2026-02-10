import prisma from './prisma'

// Helpers de query reutilizáveis

export async function getUserById(id) {
  return await prisma.user.findUnique({
    where: { id },
    include: { providerProfile: true },
  })
}

export async function getProviderBySlug(slug) {
  return await prisma.providerProfile.findUnique({
    where: { slug },
    include: {
      user: true,
      services: { where: { active: true } },
    },
  })
}

export async function getRequestWithMessages(requestId) {
  return await prisma.request.findUnique({
    where: { id: requestId },
    include: {
      client: true,
      provider: { include: { user: true } },
      messages: {
        include: { user: true },
        orderBy: { createdAt: 'asc' },
      },
    },
  })
}
