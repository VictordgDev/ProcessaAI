# 📚 ProcessaAI - Documentação Consolidada

## Índice

1. [Sobre o Projeto](#1-sobre-o-projeto)
2. [Stack Tecnológica](#2-stack-tecnológica)
3. [Setup Rápido](#3-setup-rápido)
4. [Configuração DeepSeek API](#4-configuração-deepseek-api)
5. [Estrutura do Projeto](#5-estrutura-do-projeto)
6. [Deploy na Vercel](#6-deploy-na-vercel)
7. [Credenciais de Teste](#7-credenciais-de-teste)
8. [Scripts Disponíveis](#8-scripts-disponíveis)
9. [Troubleshooting](#9-troubleshooting)

---

## 1. Sobre o Projeto

Plataforma de apoio jurídico inteligente com IA (DeepSeek) baseada na legislação brasileira.

**Funcionalidades principais:**
- Chat jurídico com IA na página inicial (sem necessidade de login)
- Responde dúvidas sobre todas as áreas do direito
- Cria documentos legais personalizados
- Resume textos e documentos jurídicos
- Analisa contratos e identifica riscos
- Sistema de autenticação com 3 roles (Client, Provider, Admin)

**Áreas do Direito Cobertas:**
- Direito Civil
- Direito Trabalhista
- Direito Penal
- Direito Empresarial
- Direito do Consumidor
- E todas as demais áreas do direito brasileiro

---

## 2. Stack Tecnológica

- **Hosting**: Vercel
- **Framework**: Next.js 14 (App Router) + React 18
- **Estilização**: Tailwind CSS
- **Backend**: Next.js API Routes (Serverless)
- **Banco de Dados**: Neon PostgreSQL
- **ORM**: Prisma
- **Autenticação**: NextAuth.js
- **IA**: DeepSeek API (compatível com OpenAI SDK)

---

## 3. Setup Rápido

### Pré-requisitos
- Node.js 18+
- Conta no Neon (PostgreSQL)
- Conta no DeepSeek (para IA)

### Instalação

```bash
# 1. Instalar dependências
npm install

# 2. Configurar variáveis de ambiente
cp .env.example .env

# Edite o .env com suas credenciais:
# - DATABASE_URL (pooled connection do Neon)
# - DIRECT_URL (direct connection do Neon)
# - NEXTAUTH_SECRET (gere com: openssl rand -base64 32)
# - DEEPSEEK_API_KEY (sua chave do DeepSeek)
# - DEEPSEEK_BASE_URL=https://api.deepseek.com

# 3. Configurar banco de dados
npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed

# 4. Iniciar servidor
npm run dev
```

Acesse: http://localhost:3000

---

## 4. Configuração DeepSeek API

### Por que DeepSeek?
- Custo muito menor que OpenAI (~$0.14 por 1M tokens vs ~$5 da OpenAI)
- API compatível com SDK da OpenAI
- Qualidade similar para tarefas de chat

### Configuração Local

Adicione no arquivo `.env`:

```env
DEEPSEEK_API_KEY="sua-chave-aqui"
DEEPSEEK_BASE_URL="https://api.deepseek.com"
```

**⚠️ IMPORTANTE:** Nunca commite o arquivo `.env` no Git!

### Configuração na Vercel

1. Acesse: https://vercel.com/dashboard
2. Vá em **Settings** → **Environment Variables**
3. Adicione:
   - `DEEPSEEK_API_KEY` = sua chave
   - `DEEPSEEK_BASE_URL` = https://api.deepseek.com
4. Selecione todos os ambientes (Production, Preview, Development)
5. Faça redeploy

### Obter Chave da API

1. Acesse: https://platform.deepseek.com
2. Crie uma conta
3. Vá em API Keys
4. Gere uma nova chave

### Modelos Disponíveis
- `deepseek-chat` (padrão) - Chat geral
- `deepseek-coder` - Otimizado para código

### Rotas que Usam IA
- `/api/chat` - Chat público na home
- `/api/ai/process-request` - Classifica solicitações
- `/api/ai/suggest-reply` - Sugere respostas

---

## 5. Estrutura do Projeto

```
PontesIA/
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── page.js              # Landing page com chat
│   │   ├── login/               # Autenticação
│   │   ├── register/            # Cadastro
│   │   ├── client/              # Área do cliente
│   │   ├── provider/            # Área do prestador
│   │   ├── admin/               # Área administrativa
│   │   └── api/                 # Backend
│   │       ├── chat/            # Chat com DeepSeek (público)
│   │       ├── auth/            # NextAuth
│   │       ├── ai/              # Rotas de IA
│   │       ├── providers/       # CRUD prestadores
│   │       ├── services/        # CRUD serviços
│   │       ├── requests/        # CRUD solicitações
│   │       └── messages/        # Sistema de mensagens
│   │
│   ├── components/              # Componentes React
│   │   ├── ui/                  # Componentes base
│   │   ├── layout/              # Layout components
│   │   ├── client/              # Componentes do cliente
│   │   ├── provider/            # Componentes do prestador
│   │   └── admin/               # Componentes do admin
│   │
│   ├── lib/                     # Utilitários
│   │   ├── db/                  # Prisma client
│   │   ├── auth/                # NextAuth config
│   │   ├── ai/                  # Cliente DeepSeek
│   │   └── validators/          # Validação de dados
│   │
│   ├── services/                # Lógica de negócio
│   └── constants/               # Constantes (roles, status)
│
├── prisma/
│   ├── schema.prisma            # Schema do banco
│   ├── seed.js                  # Dados iniciais
│   └── migrations/              # Histórico de migrations
│
├── public/                      # Assets estáticos
├── middleware.js                # Proteção de rotas
└── .env                         # Variáveis de ambiente (não commitar!)
```

### Principais Arquivos

- `src/lib/ai/client.js` - Cliente DeepSeek configurado
- `src/app/api/chat/route.js` - API do chat público
- `src/app/page.js` - Landing page com chat
- `middleware.js` - Proteção de rotas por role
- `prisma/schema.prisma` - Modelos do banco

---

## 6. Deploy na Vercel

### Passo 1: Preparar Repositório

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <seu-repositorio>
git push -u origin main
```

### Passo 2: Configurar Neon

1. Acesse: https://neon.tech
2. Crie um projeto PostgreSQL
3. Copie as connection strings:
   - Pooled connection (para DATABASE_URL)
   - Direct connection (para DIRECT_URL)

### Passo 3: Deploy na Vercel

1. Acesse: https://vercel.com
2. Clique em "Add New Project"
3. Importe seu repositório
4. Configure variáveis de ambiente:

```env
DATABASE_URL=postgresql://...?pgbouncer=true
DIRECT_URL=postgresql://...
NEXTAUTH_URL=https://seu-app.vercel.app
NEXTAUTH_SECRET=<gere com: openssl rand -base64 32>
DEEPSEEK_API_KEY=sk-...
DEEPSEEK_BASE_URL=https://api.deepseek.com
NODE_ENV=production
```

5. Clique em "Deploy"

### Passo 4: Executar Migrations

```bash
# Instalar Vercel CLI
npm i -g vercel

# Login e baixar variáveis
vercel login
vercel env pull .env.local

# Executar migrations e seed
npm run prisma:migrate
npm run prisma:seed
```

### Deploy Automático

Após configuração inicial, cada push para `main` faz deploy automático.

---

## 7. Credenciais de Teste

Após executar `npm run prisma:seed`:

**Admin:**
- Email: `admin@pontesia.com`
- Senha: `admin123`

**Cliente:**
- Email: `cliente@example.com`
- Senha: `client123`

**Prestador:**
- Email: `prestador@example.com`
- Senha: `provider123`

---

## 8. Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev              # Servidor de desenvolvimento
npm run build            # Build para produção
npm run start            # Servidor de produção

# Banco de Dados
npm run prisma:generate  # Gera Prisma Client
npm run prisma:migrate   # Executa migrations
npm run prisma:studio    # Interface visual do banco
npm run prisma:seed      # Popula banco com dados

# Qualidade
npm run lint             # Lint do código
```

---

## 9. Troubleshooting

### Erro 500 no chat

**Causa:** Variável `DEEPSEEK_API_KEY` não configurada

**Solução:**
1. Verifique se o `.env` tem a chave
2. Reinicie o servidor: `Ctrl+C` e `npm run dev`
3. Verifique os logs do console para ver o erro específico

### "Can't reach database server"

**Solução:**
- Verifique se `DATABASE_URL` está correto
- Use a **pooled connection string** do Neon
- Certifique-se de que o IP está permitido no Neon

### "Prisma Client not generated"

**Solução:**
```bash
npm run prisma:generate
```

### "Table does not exist"

**Solução:**
```bash
npm run prisma:migrate
```

### "Invalid NEXTAUTH_SECRET"

**Solução:**
```bash
# Gere um novo secret
openssl rand -base64 32

# Adicione no .env
NEXTAUTH_SECRET="<secret-gerado>"
```

### Porta 3000 em uso

**Solução:**
```bash
PORT=3001 npm run dev
```

### Chat não responde (erro 500)

**Checklist:**
1. ✅ Variável `DEEPSEEK_API_KEY` configurada no `.env`
2. ✅ Servidor reiniciado após adicionar variável
3. ✅ Chave da API é válida (teste no painel do DeepSeek)
4. ✅ Verifique logs do console para erro específico

### Deploy na Vercel falha

**Solução:**
1. Verifique se todas as variáveis de ambiente estão configuradas
2. Certifique-se de que `npm run build` funciona localmente
3. Verifique os logs de build na Vercel
4. Execute `npm run prisma:generate` antes do build

---

## 📞 Suporte

- Documentação DeepSeek: https://platform.deepseek.com/api-docs
- Documentação Neon: https://neon.tech/docs
- Documentação Next.js: https://nextjs.org/docs
- Documentação Prisma: https://www.prisma.io/docs

---

**Última atualização:** Fevereiro 2026
