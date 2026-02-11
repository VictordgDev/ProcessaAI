# ProcessaAI

Plataforma de apoio jurídico inteligente com IA baseada na legislação brasileira.

> 📚 **Documentação Completa:** Veja [RESUMO.md](RESUMO.md) para setup, configuração e troubleshooting.

## 🚀 Stack Tecnológica

- **Hosting**: Vercel
- **App**: Next.js 14 (App Router) em JavaScript
- **Frontend**: React + Tailwind CSS
- **Backend**: Next.js Route Handlers (Serverless Functions)
- **Database**: Neon (PostgreSQL)
- **ORM**: Prisma
- **Auth**: NextAuth.js (Auth.js)
- **IA**: DeepSeek API (compatível com OpenAI SDK)

## 🚀 Setup Rápido

```bash
# 1. Instalar dependências
npm install

# 2. Configurar .env (veja RESUMO.md)
cp .env.example .env

# 3. Configurar banco
npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed

# 4. Iniciar
npm run dev
```

Acesse: http://localhost:3000

## 📚 Documentação

Toda a documentação está consolidada em [RESUMO.md](RESUMO.md):

- Setup e instalação
- Configuração DeepSeek API
- Estrutura do projeto
- Deploy na Vercel
- Troubleshooting
- Scripts disponíveis

## 🔐 Credenciais de Teste

Após o seed:

- **Admin**: admin@pontesia.com / admin123
- **Cliente**: cliente@example.com / client123
- **Prestador**: prestador@example.com / provider123

## 📄 Licença

MIT
