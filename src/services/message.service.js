import prisma from '@/lib/db/prisma'

export async function getMessagesByRequest(requestId) {
  return await prisma.message.findMany({
    where: { requestId },
    include: {
      user: { select: { name: true, role: true } },
    },
    orderBy: { createdAt: 'asc' },
  })
}

export async function createMessage(requestId, userId, content) {
  return await prisma.message.create({
    data: {
      requestId,
      userId,
      content,
    },
    include: {
      user: { select: { name: true, role: true } },
    },
  })
}
