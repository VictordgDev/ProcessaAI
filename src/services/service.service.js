import prisma from '@/lib/db/prisma'

export async function getServices(filters = {}) {
  const where = { active: true }
  
  if (filters.providerId) {
    where.providerId = filters.providerId
  }
  
  if (filters.category) {
    where.category = filters.category
  }

  return await prisma.service.findMany({
    where,
    include: {
      provider: {
        include: { user: { select: { name: true } } },
      },
    },
  })
}

export async function createService(providerId, data) {
  return await prisma.service.create({
    data: {
      providerId,
      ...data,
    },
  })
}

export async function updateService(serviceId, data) {
  return await prisma.service.update({
    where: { id: serviceId },
    data,
  })
}

export async function deleteService(serviceId) {
  return await prisma.service.delete({
    where: { id: serviceId },
  })
}
