# PontesIA

Plataforma inteligente para conectar clientes a prestadores de serviços, com interface de chat baseada em IA.

> 🚀 **Início Rápido:** Veja o [SETUP_CHECKLIST.md](SETUP_CHECKLIST.md) para configurar em minutos!
> 
> 📖 **Guia Completo:** [QUICKSTART.md](QUICKSTART.md) | **Estrutura:** [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md)

## 🚀 Stack Tecnológica

- **Hosting**: Vercel
- **App**: Next.js 14 (App Router) em JavaScript
- **Frontend**: React + Tailwind CSS
- **Backend**: Next.js Route Handlers (Serverless Functions)
- **Database**: Neon (PostgreSQL)
- **ORM**: Prisma
- **Auth**: NextAuth.js (Auth.js)
- **IA**: OpenAI (configurável)

## 📋 Pré-requisitos

- Node.js 18+ 
- npm ou yarn
- Conta no Neon (PostgreSQL)
- Conta no Vercel (para deploy)
- API Key do OpenAI (opcional, para IA)

## 🛠️ Instalação

1. Clone o repositório e instale as dependências:

```bash
npm install
```

2. Configure as variáveis de ambiente:

```bash
cp .env.example .env.local
```

Edite `.env.local` com suas credenciais:
- `DATABASE_URL`: Pooled connection string do Neon
- `DIRECT_URL`: Direct connection string do Neon
- `NEXTAUTH_SECRET`: Gere com `openssl rand -base64 32`
- `OPENAI_API_KEY`: Sua chave da OpenAI

3. Configure o banco de dados:

```bash
npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed
```

4. Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

Acesse http://localhost:3000

## 📁 Estrutura do Projeto

```
PontesIA/
├── src/
│   ├── app/                    # App Router (Next.js 14)
│   │   ├── (public)/          # Rotas públicas
│   │   ├── (auth)/            # Login/Registro
│   │   ├── (client)/          # Área do cliente
│   │   ├── (provider)/        # Área do prestador
│   │   ├── (admin)/           # Área administrativa
│   │   └── api/               # Backend (serverless)
│   ├── components/            # Componentes React
│   ├── lib/                   # Utilitários
│   │   ├── db/               # Prisma client
│   │   ├── auth/             # NextAuth config
│   │   └── ai/               # Integração IA
│   ├── services/             # Lógica de negócio
│   └── constants/            # Constantes
├── prisma/
│   ├── schema.prisma         # Schema do banco
│   └── seed.js               # Dados iniciais
└── public/                   # Assets estáticos
```

## 👥 Roles e Permissões

- **Client**: Cria solicitações, busca prestadores, envia mensagens
- **Provider**: Recebe solicitações, oferece serviços, responde clientes
- **Admin**: Gerencia usuários, moderação, configurações

## 🔐 Credenciais de Teste (após seed)

- **Admin**: admin@pontesia.com / admin123
- **Cliente**: cliente@example.com / client123
- **Prestador**: prestador@example.com / provider123

## 🚢 Deploy na Vercel

### Passo 1: Preparar o Repositório

1. Inicialize o Git (se ainda não fez):
```bash
git init
git add .
git commit -m "Initial commit"
```

2. Crie um repositório no GitHub/GitLab/Bitbucket e faça push:
```bash
git remote add origin <seu-repositorio>
git push -u origin main
```

### Passo 2: Configurar Neon (Banco de Dados)

1. Acesse https://neon.tech e crie uma conta
2. Crie um novo projeto PostgreSQL
3. Copie as connection strings:
   - **Pooled connection** (para DATABASE_URL)
   - **Direct connection** (para DIRECT_URL)

### Passo 3: Deploy na Vercel

1. Acesse https://vercel.com e faça login
2. Clique em "Add New Project"
3. Importe seu repositório do GitHub
4. Configure as variáveis de ambiente:

**Environment Variables necessárias:**

```env
# Database (Neon)
DATABASE_URL=postgresql://user:password@host.neon.tech/dbname?sslmode=require&pgbouncer=true
DIRECT_URL=postgresql://user:password@host.neon.tech/dbname?sslmode=require

# NextAuth
NEXTAUTH_URL=https://seu-dominio.vercel.app
NEXTAUTH_SECRET=<gere com: openssl rand -base64 32>

# OpenAI (opcional)
OPENAI_API_KEY=sk-...

# Node
NODE_ENV=production
```

5. Clique em "Deploy"

### Passo 4: Executar Migrations no Banco

Após o primeiro deploy, você precisa rodar as migrations:

**Opção A: Via Vercel CLI (recomendado)**
```bash
npm i -g vercel
vercel login
vercel env pull .env.local
npm run prisma:migrate
npm run prisma:seed
```

**Opção B: Localmente com DIRECT_URL**
```bash
# No .env.local, use o DIRECT_URL do Neon
npm run prisma:migrate
npm run prisma:seed
```

### Passo 5: Verificar Deploy

1. Acesse sua URL da Vercel
2. Teste o login com as credenciais do seed
3. Verifique a rota `/api/health` para confirmar conexão com banco

### Troubleshooting

**Erro: "Can't reach database server"**
- Verifique se DATABASE_URL está correto
- Certifique-se de usar a **pooled connection string**
- Verifique se o IP da Vercel está permitido no Neon (geralmente "Allow all")

**Erro: "Invalid `prisma.xxx()` invocation"**
- Execute `npm run prisma:generate` localmente
- Faça commit e push novamente
- A Vercel executará o build automaticamente

**Erro: "NEXTAUTH_SECRET is not set"**
- Gere um secret: `openssl rand -base64 32`
- Adicione nas variáveis de ambiente da Vercel
- Faça redeploy

### Deploy Automático

Após configuração inicial, cada push para a branch `main` fará deploy automático na Vercel.

## 📋 Checklist de Setup

### ✅ Desenvolvimento Local

- [ ] Clonar repositório
- [ ] Executar `npm install`
- [ ] Criar conta no Neon (https://neon.tech)
- [ ] Copiar `.env.example` para `.env.local`
- [ ] Configurar `DATABASE_URL` (pooled connection)
- [ ] Configurar `DIRECT_URL` (direct connection)
- [ ] Gerar `NEXTAUTH_SECRET` com `openssl rand -base64 32`
- [ ] Executar `npm run prisma:generate`
- [ ] Executar `npm run prisma:migrate`
- [ ] Executar `npm run prisma:seed`
- [ ] Executar `npm run dev`
- [ ] Testar login com credenciais do seed
- [ ] Verificar `/api/health`

### ✅ Deploy na Vercel

- [ ] Criar repositório no GitHub
- [ ] Fazer push do código
- [ ] Criar conta na Vercel (https://vercel.com)
- [ ] Importar repositório
- [ ] Configurar variáveis de ambiente:
  - [ ] `DATABASE_URL`
  - [ ] `DIRECT_URL`
  - [ ] `NEXTAUTH_URL`
  - [ ] `NEXTAUTH_SECRET`
  - [ ] `OPENAI_API_KEY` (opcional)
  - [ ] `NODE_ENV=production`
- [ ] Fazer primeiro deploy
- [ ] Executar migrations no banco
- [ ] Executar seed
- [ ] Testar aplicação em produção

### ✅ Configurações Opcionais

- [ ] Configurar domínio customizado na Vercel
- [ ] Configurar OpenAI API para funcionalidades de IA
- [ ] Configurar email provider para recuperação de senha
- [ ] Configurar OAuth providers (Google, GitHub, etc)
- [ ] Configurar analytics
- [ ] Configurar monitoring (Sentry, etc)

## 🔧 Alterações Necessárias para Produção

### 1. Variáveis de Ambiente (.env.local)

Você precisa alterar/configurar:

```env
# Neon Database - OBTER NO DASHBOARD DO NEON
DATABASE_URL="postgresql://user:password@host.neon.tech/dbname?sslmode=require&pgbouncer=true"
DIRECT_URL="postgresql://user:password@host.neon.tech/dbname?sslmode=require"

# NextAuth - GERAR NOVO SECRET
NEXTAUTH_URL="http://localhost:3000"  # Mudar para URL da Vercel em produção
NEXTAUTH_SECRET="<gerar com: openssl rand -base64 32>"

# OpenAI - OBTER EM https://platform.openai.com/api-keys
OPENAI_API_KEY="sk-..."  # Opcional, mas necessário para funcionalidades de IA
```

### 2. Middleware (middleware.js)

Já configurado! Protege rotas automaticamente por role.

### 3. Prisma (prisma/schema.prisma)

Já configurado com:
- Pooled connection para queries (DATABASE_URL)
- Direct connection para migrations (DIRECT_URL)

### 4. NextAuth (src/lib/auth/options.js)

Configurado com Credentials provider. Para adicionar OAuth:

```javascript
import GoogleProvider from 'next-auth/providers/google'

providers: [
  GoogleProvider({
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  }),
  // ... outros providers
]
```

## 📝 Scripts Disponíveis

- `npm run dev` - Servidor de desenvolvimento
- `npm run build` - Build para produção
- `npm run start` - Inicia servidor de produção
- `npm run prisma:generate` - Gera Prisma Client
- `npm run prisma:migrate` - Executa migrations
- `npm run prisma:studio` - Interface visual do banco
- `npm run prisma:seed` - Popula banco com dados iniciais

## 🤖 Integração com IA

A plataforma usa IA para:
- Classificar solicitações automaticamente
- Gerar resumos de pedidos
- Sugerir respostas para prestadores
- Extrair palavras-chave relevantes

Configure em `src/lib/ai/client.js` e `src/lib/ai/prompts.js`

## 📄 Licença

MIT
