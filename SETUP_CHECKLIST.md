# ✅ Checklist de Setup - PontesIA

## 🎯 O que você precisa alterar para rodar o projeto

### 1️⃣ Variáveis de Ambiente (.env.local)

**OBRIGATÓRIO - Você DEVE configurar:**

```env
# 1. Criar conta no Neon (https://neon.tech)
# 2. Criar novo projeto PostgreSQL
# 3. Copiar as connection strings do dashboard

DATABASE_URL="COLE_AQUI_A_POOLED_CONNECTION_STRING"
DIRECT_URL="COLE_AQUI_A_DIRECT_CONNECTION_STRING"

# 4. Gerar secret com: openssl rand -base64 32
NEXTAUTH_SECRET="COLE_AQUI_O_SECRET_GERADO"

# 5. Manter como está para desenvolvimento local
NEXTAUTH_URL="http://localhost:3000"

# 6. OPCIONAL - Só necessário se quiser usar funcionalidades de IA
# Obter em: https://platform.openai.com/api-keys
OPENAI_API_KEY="sk-..."
```

### 2️⃣ Comandos para Executar

```bash
# Instalar dependências
npm install

# Gerar Prisma Client
npm run prisma:generate

# Criar tabelas no banco
npm run prisma:migrate

# Popular com dados de teste
npm run prisma:seed

# Iniciar servidor
npm run dev
```

### 3️⃣ Testar se Funcionou

1. Acesse: http://localhost:3000
2. Clique em "Entrar / Cadastrar"
3. Faça login com:
   - Email: `admin@pontesia.com`
   - Senha: `admin123`

## 🚀 Deploy na Vercel

### Variáveis de Ambiente na Vercel

Configure as mesmas variáveis do `.env.local`:

```
DATABASE_URL=<pooled connection do Neon>
DIRECT_URL=<direct connection do Neon>
NEXTAUTH_URL=https://seu-app.vercel.app
NEXTAUTH_SECRET=<mesmo secret gerado>
OPENAI_API_KEY=<sua chave OpenAI>
NODE_ENV=production
```

### Após Deploy

Execute migrations no banco:

```bash
# Instalar Vercel CLI
npm i -g vercel

# Login
vercel login

# Baixar variáveis de ambiente
vercel env pull .env.local

# Executar migrations
npm run prisma:migrate

# Executar seed
npm run prisma:seed
```

## 📋 Resumo Rápido

| Item | O que fazer | Onde |
|------|-------------|------|
| Banco de Dados | Criar conta e projeto | https://neon.tech |
| Connection Strings | Copiar do dashboard Neon | `.env.local` |
| Secret | Gerar com openssl | `.env.local` |
| Dependências | `npm install` | Terminal |
| Migrations | `npm run prisma:migrate` | Terminal |
| Seed | `npm run prisma:seed` | Terminal |
| Servidor | `npm run dev` | Terminal |
| Deploy | Conectar repositório | https://vercel.com |

## ❓ Problemas Comuns

### "Can't reach database server"
✅ Verifique se copiou corretamente as connection strings do Neon

### "Prisma Client not generated"
✅ Execute: `npm run prisma:generate`

### "Table does not exist"
✅ Execute: `npm run prisma:migrate`

### "Invalid NEXTAUTH_SECRET"
✅ Gere um novo: `openssl rand -base64 32`

### Porta 3000 em uso
✅ Use: `PORT=3001 npm run dev`

## 📚 Próximos Passos

1. ✅ Configure o ambiente local
2. ✅ Teste todas as funcionalidades
3. ✅ Customize o design e componentes
4. ✅ Adicione suas próprias features
5. ✅ Faça deploy na Vercel

## 🎉 Pronto!

Seu projeto está configurado e rodando. Explore a documentação:

- `README.md` - Documentação completa
- `QUICKSTART.md` - Guia rápido de 5 minutos
- `PROJECT_STRUCTURE.md` - Estrutura detalhada
- `/api-docs` - Documentação da API (no navegador)

**Dúvidas?** Verifique os arquivos de documentação ou a estrutura do código!
