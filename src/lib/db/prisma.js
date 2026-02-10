import { PrismaClient } from '@prisma/client'

// Singleton para evitar múltiplas conexões em dev (hot-reload)
const globalForPrisma = global

const prisma = globalForPrisma.prisma || new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
})

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}

export default prisma
