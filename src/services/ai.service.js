import { generateCompletion } from '@/lib/ai/client'
import { PROMPTS, fillPrompt } from '@/lib/ai/prompts'
import { parseJSON } from '@/lib/ai/parser'

export async function classifyRequest(description) {
  const prompt = fillPrompt(PROMPTS.CLASSIFY_REQUEST, { description })
  const response = await generateCompletion(prompt, {
    temperature: 0.3,
    maxTokens: 500,
  })
  return parseJSON(response)
}

export async function suggestReply(requestDescription, providerName, categories) {
  const prompt = fillPrompt(PROMPTS.SUGGEST_REPLY, {
    description: requestDescription,
    providerName,
    categories,
  })
  return await generateCompletion(prompt, {
    temperature: 0.7,
    maxTokens: 300,
  })
}
