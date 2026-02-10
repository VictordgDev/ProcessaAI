import { NextResponse } from 'next/server'
import { requireRole } from '@/lib/auth/guard'
import { ROLES } from '@/constants/roles'
import { generateCompletion } from '@/lib/ai/client'
import { PROMPTS, fillPrompt } from '@/lib/ai/prompts'
import prisma from '@/lib/db/prisma'

export async function POST(request) {
  const { user, error } = await requireRole([ROLES.PROVIDER, ROLES.ADMIN])
  if (error) return NextResponse.json({ error }, { status: 401 })

  try {
    const { requestId } = await request.json()

    const req = await prisma.request.findUnique({
      where: { id: requestId },
    })

    if (!req) {
      return NextResponse.json({ error: 'Solicitação não encontrada' }, { status: 404 })
    }

    const provider = await prisma.providerProfile.findUnique({
      where: { userId: user.id },
      include: { user: true },
    })

    const prompt = fillPrompt(PROMPTS.SUGGEST_REPLY, {
      description: req.description,
      providerName: provider.user.name,
      categories: provider.categories.join(', '),
    })

    const suggestion = await generateCompletion(prompt, {
      temperature: 0.7,
      maxTokens: 300,
    })

    return NextResponse.json({ suggestion })
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao gerar sugestão' }, { status: 500 })
  }
}
