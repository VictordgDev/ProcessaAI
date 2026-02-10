import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function generateCompletion(prompt, options = {}) {
  try {
    const response = await openai.chat.completions.create({
      model: options.model || 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: options.systemPrompt || 'Você é um assistente útil.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: options.temperature || 0.7,
      max_tokens: options.maxTokens || 1000,
    })

    return response.choices[0].message.content
  } catch (error) {
    console.error('Erro ao gerar completion:', error)
    throw new Error('Falha ao processar com IA')
  }
}

export default openai
