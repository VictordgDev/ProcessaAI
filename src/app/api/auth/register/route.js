import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import prisma from '@/lib/db/prisma'
import { slugify } from '@/lib/utils'

export async function POST(request) {
  try {
    const { name, email, password, role } = await request.json()

    // Verificar se email já existe
    const existing = await prisma.user.findUnique({ where: { email } })
    if (existing) {
      return NextResponse.json({ error: 'Email já cadastrado' }, { status: 400 })
    }

    // Hash da senha
    const hashedPassword = await bcrypt.hash(password, 10)

    // Criar usuário
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: role || 'client',
      },
    })

    // Se for prestador, criar perfil
    if (role === 'provider') {
      const slug = slugify(name) + '-' + Math.random().toString(36).substring(7)
      await prisma.providerProfile.create({
        data: {
          userId: user.id,
          slug,
        },
      })
    }

    return NextResponse.json(
      { message: 'Conta criada com sucesso', userId: user.id },
      { status: 201 }
    )
  } catch (error) {
    console.error('Erro ao criar conta:', error)
    return NextResponse.json({ error: 'Erro ao criar conta' }, { status: 500 })
  }
}
