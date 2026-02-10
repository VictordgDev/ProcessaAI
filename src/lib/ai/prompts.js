export const PROMPTS = {
  CLASSIFY_REQUEST: `Você é um assistente que classifica solicitações de serviços.
Analise a solicitação e retorne um JSON com:
- category: categoria principal (Tecnologia, Design, Consultoria, Educação, Saúde, Outros)
- summary: resumo em 1-2 frases
- keywords: array de palavras-chave relevantes

Solicitação: {description}

Retorne apenas o JSON, sem texto adicional.`,

  SUGGEST_REPLY: `Você é um assistente que ajuda prestadores de serviço a responder solicitações.
Baseado na solicitação do cliente, sugira uma resposta profissional e cordial.

Solicitação: {description}

Perfil do prestador:
- Nome: {providerName}
- Especialidades: {categories}

Gere uma resposta que:
1. Demonstre interesse e profissionalismo
2. Mencione experiência relevante
3. Sugira próximos passos
4. Seja concisa (2-3 parágrafos)`,
}

export function fillPrompt(template, variables) {
  let filled = template
  for (const [key, value] of Object.entries(variables)) {
    filled = filled.replace(`{${key}}`, value)
  }
  return filled
}
