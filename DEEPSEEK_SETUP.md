# Configuração DeepSeek API

## ⚠️ IMPORTANTE - SEGURANÇA
A chave de API que você compartilhou (`sk-fe3a67f0fdc24b138433ec01387b957b`) foi exposta publicamente. Por segurança:

1. **Revogue essa chave imediatamente** no painel do DeepSeek
2. **Gere uma nova chave** para usar no projeto

## Configuração Local

1. Crie um arquivo `.env` na raiz do projeto (se ainda não existir):

```bash
cp .env.example .env
```

2. Adicione sua nova chave de API no arquivo `.env`:

```env
DEEPSEEK_API_KEY="sua-nova-chave-aqui"
DEEPSEEK_BASE_URL="https://api.deepseek.com"
```

3. **NUNCA** commite o arquivo `.env` no Git (já está no `.gitignore`)

## Configuração na Vercel

### Opção 1: Via Dashboard (Recomendado)

1. Acesse seu projeto na Vercel: https://vercel.com/dashboard
2. Vá em **Settings** → **Environment Variables**
3. Adicione as seguintes variáveis:
   - **Name:** `DEEPSEEK_API_KEY`
   - **Value:** sua nova chave de API
   - **Environment:** Production, Preview, Development (selecione todos)
   
4. Adicione também:
   - **Name:** `DEEPSEEK_BASE_URL`
   - **Value:** `https://api.deepseek.com`
   - **Environment:** Production, Preview, Development

5. Faça um novo deploy ou clique em **Redeploy** para aplicar as variáveis

### Opção 2: Via CLI da Vercel

```bash
# Instale a CLI da Vercel (se ainda não tiver)
npm i -g vercel

# Adicione as variáveis
vercel env add DEEPSEEK_API_KEY
# Cole sua chave quando solicitado

vercel env add DEEPSEEK_BASE_URL
# Cole: https://api.deepseek.com
```

## Modelos Disponíveis

O DeepSeek oferece os seguintes modelos:
- `deepseek-chat` (padrão configurado) - Modelo de chat geral
- `deepseek-coder` - Otimizado para código

## Custos

O DeepSeek é significativamente mais barato que OpenAI:
- Input: ~$0.14 por 1M tokens
- Output: ~$0.28 por 1M tokens

## Testando a Configuração

Após configurar, teste a API:

```bash
npm run dev
```

Acesse as rotas que usam IA:
- `/api/ai/process-request`
- `/api/ai/suggest-reply`

## Troubleshooting

Se encontrar erros:

1. Verifique se a variável está definida:
```bash
echo $DEEPSEEK_API_KEY  # Linux/Mac
echo %DEEPSEEK_API_KEY%  # Windows CMD
```

2. Reinicie o servidor de desenvolvimento após adicionar variáveis

3. Na Vercel, verifique os logs em **Deployments** → **Functions** para ver erros de API

## Documentação Oficial

- DeepSeek API: https://platform.deepseek.com/api-docs
- Pricing: https://platform.deepseek.com/pricing
