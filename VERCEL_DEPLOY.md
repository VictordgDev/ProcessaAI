# 🚀 Deploy na Vercel - Guia Completo

## ✅ Pré-requisitos

- [x] Conta no GitHub
- [x] Conta na Vercel (https://vercel.com)
- [x] Conta no Neon (https://neon.tech)
- [x] Projeto commitado no GitHub

## 📋 Passo a Passo

### 1️⃣ Preparar Banco de Dados (Neon)

1. Acesse https://neon.tech
2. Crie um novo projeto PostgreSQL
3. Anote as connection strings:
   - **Pooled connection** (para DATABASE_URL)
   - **Direct connection** (para DIRECT_URL)

### 2️⃣ Fazer Push para GitHub

```bash
# Inicializar Git (se ainda não fez)
git init
git add .
git commit -m "Initial commit - PontesIA"

# Criar repositório no GitHub e fazer push
git remote add origin https://github.com/seu-usuario/pontes-ia.git
git branch -M main
git push -u origin main
```

### 3️⃣ Conectar na Vercel

1. Acesse https://vercel.com
2. Clique em "Add New Project"
3. Selecione "Import Git Repository"
4. Escolha seu repositório do GitHub
5. Clique em "Import"

### 4️⃣ Configurar Variáveis de Ambiente

Na tela de configuração do projeto, adicione as seguintes variáveis:

#### Environment Variables:

```env
# Database (Neon) - OBRIGATÓRIO
DATABASE_URL=postgresql://user:password@host.neon.tech/dbname?sslmode=require&pgbouncer=true
DIRECT_URL=postgresql://user:password@host.neon.tech/dbname?sslmode=require

# NextAuth - OBRIGATÓRIO
NEXTAUTH_URL=https://seu-projeto.vercel.app
NEXTAUTH_SECRET=<gerar com: openssl rand -base64 32>

# OpenAI - OPCIONAL (só se quiser usar IA)
OPENAI_API_KEY=sk-...

# Node - OBRIGATÓRIO
NODE_ENV=production
```

**⚠️ IMPORTANTE:**
- Cole as connection strings EXATAS do Neon
- Use a **pooled connection** para DATABASE_URL
- Use a **direct connection** para DIRECT_URL
- Gere um NEXTAUTH_SECRET único: `openssl rand -base64 32`
- NEXTAUTH_URL deve ser a URL final do seu projeto Vercel

### 5️⃣ Configurações do Build (Opcional)

A Vercel detecta automaticamente Next.js, mas você pode verificar:

- **Framework Preset:** Next.js
- **Build Command:** `npm run build`
- **Output Directory:** `.next`
- **Install Command:** `npm install`
- **Root Directory:** `./` (deixe vazio ou use `./`)

### 6️⃣ Deploy

1. Clique em "Deploy"
2. Aguarde o build (2-5 minutos)
3. Se houver erro, verifique os logs

### 7️⃣ Executar Migrations

Após o primeiro deploy bem-sucedido, você precisa criar as tabelas no banco:

#### Opção A: Via Vercel CLI (Recomendado)

```bash
# Instalar Vercel CLI
npm i -g vercel

# Login
vercel login

# Baixar variáveis de ambiente
vercel env pull .env.local

# Executar migrations
npx prisma migrate deploy

# Executar seed (dados iniciais)
node prisma/seed.js
```

#### Opção B: Localmente com DIRECT_URL

```bash
# No .env.local, configure DIRECT_URL do Neon
DIRECT_URL="postgresql://..."

# Executar migrations
npx prisma migrate deploy

# Executar seed
node prisma/seed.js
```

### 8️⃣ Verificar Deploy

1. Acesse a URL do seu projeto: `https://seu-projeto.vercel.app`
2. Teste a página inicial
3. Teste o login com credenciais do seed:
   - Email: `admin@pontesia.com`
   - Senha: `admin123`
4. Verifique `/api/health` para confirmar conexão com banco

## 🔧 Troubleshooting

### ❌ Erro: "Can't reach database server"

**Solução:**
1. Verifique se DATABASE_URL está correto
2. Certifique-se de usar a **pooled connection string**
3. No Neon, vá em Settings → IP Allow e adicione `0.0.0.0/0` (permitir todos)

### ❌ Erro: "Invalid `prisma.xxx()` invocation"

**Solução:**
1. Execute localmente: `npm run prisma:generate`
2. Commit e push novamente
3. A Vercel executará o build automaticamente

### ❌ Erro: "NEXTAUTH_SECRET is not set"

**Solução:**
1. Gere um secret: `openssl rand -base64 32`
2. Adicione nas variáveis de ambiente da Vercel
3. Faça redeploy (Settings → Deployments → ... → Redeploy)

### ❌ Erro: "Table does not exist"

**Solução:**
1. Você esqueceu de executar as migrations
2. Execute: `npx prisma migrate deploy` (veja passo 7)

### ❌ Build falhou com "route conflicts"

**Solução:**
1. Certifique-se de que está usando a versão corrigida (sem route groups)
2. Veja [CORRECOES_VERCEL.md](CORRECOES_VERCEL.md)
3. As rotas devem ser: `/client/dashboard`, `/provider/dashboard`, etc.

## 🔄 Deploy Automático

Após configuração inicial, cada push para a branch `main` fará deploy automático!

```bash
# Fazer alterações
git add .
git commit -m "feat: nova funcionalidade"
git push

# Vercel fará deploy automaticamente
```

## 🌐 Domínio Customizado (Opcional)

1. Na Vercel, vá em Settings → Domains
2. Adicione seu domínio
3. Configure DNS conforme instruções
4. Atualize NEXTAUTH_URL para o novo domínio

## 📊 Monitoramento

### Logs
- Acesse Vercel Dashboard → Seu Projeto → Logs
- Veja logs em tempo real de erros e requisições

### Analytics
- Vercel oferece analytics gratuito
- Veja métricas de performance e uso

### Database
- Acesse Neon Dashboard para ver queries
- Monitore uso de conexões e storage

## ✅ Checklist Final

- [ ] Banco de dados criado no Neon
- [ ] Variáveis de ambiente configuradas na Vercel
- [ ] Primeiro deploy bem-sucedido
- [ ] Migrations executadas
- [ ] Seed executado
- [ ] Login testado
- [ ] `/api/health` retorna OK
- [ ] Todas as rotas funcionando

## 🎉 Pronto!

Seu projeto está no ar! 

**URL:** https://seu-projeto.vercel.app

Agora você pode:
- Compartilhar o link
- Adicionar domínio customizado
- Continuar desenvolvendo (deploy automático)
- Monitorar uso e performance

## 📚 Recursos Úteis

- [Documentação Vercel](https://vercel.com/docs)
- [Documentação Next.js](https://nextjs.org/docs)
- [Documentação Neon](https://neon.tech/docs)
- [Documentação Prisma](https://www.prisma.io/docs)
