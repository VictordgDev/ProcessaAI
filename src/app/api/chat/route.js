import { NextResponse } from 'next/server'
import { generateCompletion } from '@/lib/ai/client'

export async function POST(request) {
  try {
    // Verificar se a API key está configurada
    if (!process.env.DEEPSEEK_API_KEY) {
      console.error('DEEPSEEK_API_KEY não está configurada')
      return NextResponse.json(
        { error: 'Configuração de IA não encontrada. Configure DEEPSEEK_API_KEY.' },
        { status: 500 }
      )
    }

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
      systemPrompt: `Você é um assistente virtual jurídico chamado ProcessaAI. Especializado em apoio jurídico com base na legislação brasileira.

REGRAS IMPORTANTES:
1. Você DEVE responder APENAS sobre:
   - Dúvidas jurídicas de todas as áreas do direito
   - Criar documentos legais de acordo com o pedido do usuário
   - Apoiar em resumo de textos e documentos
   - Análises de contratos e riscos

2. Se o usuário perguntar sobre outros assuntos (notícias, receitas, programação, etc.), responda educadamente:
   "Desculpe, sou especializado apenas em questões jurídicas. Como posso ajudar?"

3. Sempre seja amigável, prestativo e profissional

4. Responda em português do Brasil de forma clara e objetiva

5. Quando criar documentos ou contratos, sempre inclua avisos de que o documento deve ser revisado por um advogado

6. Cite artigos de lei quando relevante, mas sempre de forma didática

INFORMAÇÕES DA PLATAFORMA:
- Nome: ProcessaAI
- Categoria: Plataforma de apoio ao profissional do direito
- Foco: Legislação brasileira

IMPORTANTE: Você é uma ferramenta de apoio. Sempre recomende consultar um advogado para casos específicos e decisões importantes.`,
      temperature: 0.7,
      maxTokens: 1000
    })

    return NextResponse.json({ 
      message: response 
    })

  } catch (error) {
    console.error('Erro no chat:', error)
    return NextResponse.json(
      { error: 'Erro ao processar mensagem: ' + error.message },
      { status: 500 }
    )
  }
}
