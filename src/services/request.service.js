import prisma from '@/lib/db/prisma'
import { classifyRequest } from './ai.service'

export async function createRequest(clientId, data) {
  const { title, description, category } = data

  // Processar com IA se disponível
  let aiData = {}
  try {
    const aiResult = await classifyRequest(description)
    aiData = {
      aiCategory: aiResult.category,
      aiSummary: aiResult.summary,
    }
  } catch (error) {
    console.error('Erro ao processar com IA:', error)
  }

  return await prisma.request.create({
    data: {
      clientId,
      title,
      description,
      category: category || aiData.aiCategory || 'Outros',
      ...aiData,
    },
  })
}

export async function getRequestsByUser(userId, role) {
  const where = {}
  
  if (role === 'client') {
    where.clientId = userId
  } else if (role === 'provider') {
    const provider = await prisma.providerProfile.findUnique({
      where: { userId },
    })
    where.providerId = provider?.id
  }

  return await prisma.request.findMany({
    where,
    include: {
      client: { select: { name: true } },
      provider: { include: { user: { select: { name: true } } } },
    },
    orderBy: { createdAt: 'desc' },
  })
}
