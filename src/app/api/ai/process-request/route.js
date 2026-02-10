import { NextResponse } from 'next/server'
import { requireAuth } from '@/lib/auth/guard'
import { generateCompletion } from '@/lib/ai/client'
import { PROMPTS, fillPrompt } from '@/lib/ai/prompts'
import { parseJSON } from '@/lib/ai/parser'

export async function POST(request) {
  const { user, error } = await requireAuth()
  if (error) return NextResponse.json({ error }, { status: 401 })

  try {
    const { description } = await request.json()

    const prompt = fillPrompt(PROMPTS.CLASSIFY_REQUEST, { description })
    const response = await generateCompletion(prompt, {
      temperature: 0.3,
      maxTokens: 500,
    })

    const parsed = parseJSON(response)

    return NextResponse.json({
      category: parsed.category,
      summary: parsed.summary,
      keywords: parsed.keywords,
    })
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao processar com IA' }, { status: 500 })
  }
}
