const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Iniciando seed...')

  // Criar admin
  const adminPassword = await bcrypt.hash('admin123', 10)
  const admin = await prisma.user.upsert({
    where: { email: 'admin@pontesia.com' },
    update: {},
    create: {
      email: 'admin@pontesia.com',
      password: adminPassword,
      name: 'Administrador',
      role: 'admin',
      emailVerified: new Date(),
    },
  })
  console.log('✅ Admin criado:', admin.email)

  // Criar cliente de exemplo
  const clientPassword = await bcrypt.hash('client123', 10)
  const client = await prisma.user.upsert({
    where: { email: 'cliente@example.com' },
    update: {},
    create: {
      email: 'cliente@example.com',
      password: clientPassword,
      name: 'João Silva',
      role: 'client',
      emailVerified: new Date(),
    },
  })
  console.log('✅ Cliente criado:', client.email)

  // Criar prestador de exemplo
  const providerPassword = await bcrypt.hash('provider123', 10)
  const providerUser = await prisma.user.upsert({
    where: { email: 'prestador@example.com' },
    update: {},
    create: {
      email: 'prestador@example.com',
      password: providerPassword,
      name: 'Maria Santos',
      role: 'provider',
      emailVerified: new Date(),
    },
  })

  const providerProfile = await prisma.providerProfile.upsert({
    where: { userId: providerUser.id },
    update: {},
    create: {
      userId: providerUser.id,
      slug: 'maria-santos',
      bio: 'Profissional experiente em desenvolvimento web e design.',
      phone: '(11) 98765-4321',
      location: 'São Paulo, SP',
      categories: ['Tecnologia', 'Design'],
      verified: true,
      rating: 4.8,
      reviewCount: 15,
    },
  })
  console.log('✅ Prestador criado:', providerUser.email)

  // Criar serviços de exemplo
  await prisma.service.createMany({
    data: [
      {
        providerId: providerProfile.id,
        title: 'Desenvolvimento de Website',
        description: 'Criação de sites profissionais e responsivos',
        category: 'Tecnologia',
        price: 2500,
        priceType: 'fixed',
        active: true,
      },
      {
        providerId: providerProfile.id,
        title: 'Design de Logo',
        description: 'Criação de identidade visual para sua marca',
        category: 'Design',
        price: 500,
        priceType: 'fixed',
        active: true,
      },
    ],
  })
  console.log('✅ Serviços criados')

  console.log('🎉 Seed concluído!')
}

main()
  .catch((e) => {
    console.error('❌ Erro no seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
