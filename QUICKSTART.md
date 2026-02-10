# 🚀 Guia Rápido - PontesIA

## Setup em 5 minutos

### 1. Instalar dependências
```bash
npm install
```

### 2. Configurar Banco de Dados (Neon)

1. Acesse https://neon.tech e crie uma conta
2. Crie um novo projeto PostgreSQL
3. Copie as connection strings do dashboard

### 3. Configurar variáveis de ambiente

Edite o arquivo `.env.local`:

```env
# Cole suas connection strings do Neon
DATABASE_URL="postgresql://..."
DIRECT_URL="postgresql://..."

# Gere um secret
NEXTAUTH_SECRET="<execute: openssl rand -base64 32>"

# Mantenha como está para desenvolvimento
NEXTAUTH_URL="http://localhost:3000"
```

### 4. Configurar banco de dados

```bash
npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed
```

### 5. Iniciar servidor

```bash
npm run dev
```

Acesse: http://localhost:3000

## 🔐 Credenciais de Teste

Após executar o seed, você pode fazer login com:

**Admin:**
- Email: admin@pontesia.com
- Senha: admin123

**Cliente:**
- Email: cliente@example.com
- Senha: client123

**Prestador:**
- Email: prestador@example.com
- Senha: provider123

## 📍 Rotas Principais

- `/` - Landing page com chat
- `/login` - Login
- `/register` - Cadastro (escolha entre Cliente ou Prestador)
- `/providers` - Buscar prestadores
- `/pricing` - Planos e preços
- `/client/dashboard` - Dashboard do cliente
- `/provider/dashboard` - Dashboard do prestador
- `/admin/dashboard` - Dashboard admin
- `/api/health` - Health check da API

## 🐛 Problemas Comuns

### Erro: "Can't reach database server"
- Verifique se as connection strings estão corretas no `.env.local`
- Certifique-se de que copiou a **pooled connection** para DATABASE_URL

### Erro: "Prisma Client not generated"
```bash
npm run prisma:generate
```

### Erro: "Table does not exist"
```bash
npm run prisma:migrate
```

### Porta 3000 já em uso
```bash
# Use outra porta
PORT=3001 npm run dev
```

## 📚 Próximos Passos

1. Explore a estrutura de pastas em `src/`
2. Veja a documentação da API em `/api-docs`
3. Customize os componentes em `src/components/`
4. Adicione novas funcionalidades nos services em `src/services/`
5. Configure integração com IA real em `src/lib/ai/`

## 🚢 Deploy

Quando estiver pronto para deploy:

1. Faça push para GitHub
2. Conecte na Vercel
3. Configure as mesmas variáveis de ambiente
4. Deploy automático!

Veja instruções completas no `README.md`
