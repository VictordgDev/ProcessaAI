export function parseJSON(text) {
  try {
    // Tentar extrair JSON de markdown code blocks
    const jsonMatch = text.match(/```json\n([\s\S]*?)\n```/) || text.match(/```\n([\s\S]*?)\n```/)
    
    if (jsonMatch) {
      return JSON.parse(jsonMatch[1])
    }
    
    // Tentar parse direto
    return JSON.parse(text)
  } catch (error) {
    console.error('Erro ao fazer parse do JSON:', error)
    throw new Error('Resposta da IA em formato inválido')
  }
}

export function extractCategory(aiResponse) {
  const parsed = parseJSON(aiResponse)
  return parsed.category || 'Outros'
}

export function extractSummary(aiResponse) {
  const parsed = parseJSON(aiResponse)
  return parsed.summary || ''
}
