import { NextResponse } from 'next/server'
import { generateCompletion } from '@/lib/ai/client'

export async function POST(request) {
  try {
    const { messages } = await request.json()

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Mensagens inválidas' },
        { status: 400 }
      )
    }

    // Pegar a última mensagem do usuário
    const userMessage = messages[messages.length - 1]?.content

    if (!userMessage) {
      return NextResponse.json(
        { error: 'Mensagem vazia' },
        { status: 400 }
      )
    }

    // Gerar resposta com DeepSeek
    const response = await generateCompletion(userMessage, {
      systemPrompt: `Você é um assistente da PontesIA, uma plataforma que conecta clientes e prestadores de serviços.
      
Suas funções:
- Ajudar usuários a encontrar prestadores de serviços
- Explicar como a plataforma funciona
- Orientar sobre criação de solicitações de serviço
- Responder dúvidas sobre categorias e serviços disponíveis
- Ser amigável, prestativo e profissional

Sempre responda em português do Brasil de forma clara e objetiva.`,
      temperature: 0.7,
      maxTokens: 500
    })

    return NextResponse.json({ 
      message: response 
    })

  } catch (error) {
    console.error('Erro no chat:', error)
    return NextResponse.json(
      { error: 'Erro ao processar mensagem' },
      { status: 500 }
    )
  }
}
