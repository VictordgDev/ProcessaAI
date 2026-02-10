# 📁 Estrutura do Projeto PontesIA

## Visão Geral

```
PontesIA/
├── 📄 Configuração
│   ├── package.json              # Dependências e scripts
│   ├── next.config.js            # Config do Next.js
│   ├── tailwind.config.js        # Config do Tailwind
│   ├── jsconfig.json             # Aliases de import
│   ├── middleware.js             # Proteção de rotas por role
│   └── .env.local                # Variáveis de ambiente
│
├── 🗄️ Banco de Dados
│   └── prisma/
│       ├── schema.prisma         # Schema do banco (modelos)
│       ├── seed.js               # Dados iniciais
│       └── migrations/           # Histórico de migrations
│
├── 🎨 Frontend (Next.js App Router)
│   └── src/app/
│       ├── layout.js             # Layout raiz
│       ├── page.js               # Landing page (chat)
│       ├── globals.css           # Estilos globais
│       ├── not-found.js          # Página 404
│       │
│       ├── (public)/             # Rotas públicas
│       │   ├── providers/        # Busca de prestadores
│       │   └── pricing/          # Planos e preços
│       │
│       ├── (auth)/               # Autenticação
│       │   ├── login/
│       │   ├── register/
│       │   └── forgot-password/
│       │
│       ├── (client)/             # Área do Cliente
│       │   ├── dashboard/
│       │   ├── requests/         # Solicitações
│       │   └── settings/
│       │
│       ├── (provider)/           # Área do Prestador
│       │   ├── dashboard/
│       │   ├── inbox/            # Solicitações recebidas
│       │   ├── services/         # CRUD serviços
│       │   ├── profile/
│       │   └── settings/
│       │
│       ├── (admin)/              # Área Admin
│       │   ├── dashboard/
│       │   ├── users/
│       │   ├── providers/
│       │   ├── requests/
│       │   └── settings/
│       │
│       └── (docs)/
│           └── api-docs/         # Documentação da API
│
├── 🔌 Backend (API Routes)
│   └── src/app/api/
│       ├── health/               # Health check
│       ├── auth/
│       │   ├── [...nextauth]/    # NextAuth config
│       │   └── register/         # Registro de usuários
│       │
│       ├── providers/            # CRUD prestadores
│       ├── services/             # CRUD serviços
│       ├── requests/             # CRUD solicitações
│       ├── messages/             # Chat/mensagens
│       ├── reviews/              # Avaliações
│       │
│       ├── ai/                   # Integração IA
│       │   ├── process-request/  # Classificar solicitação
│       │   └── suggest-reply/    # Sugerir resposta
│       │
│       └── admin/                # Rotas admin
│           ├── users/
│           ├── settings/
│           └── audit/
│
├── 🧩 Componentes
│   └── src/components/
│       ├── ui/                   # Componentes base (Button, Input, etc)
│       ├── layout/               # Navbar, Sidebar, Footer
│       ├── client/               # Componentes do cliente
│       ├── provider/             # Componentes do prestador
│       └── admin/                # Componentes do admin
│
├── 🛠️ Utilitários
│   └── src/lib/
│       ├── db/
│       │   ├── prisma.js         # Prisma singleton
│       │   └── queries.js        # Queries reutilizáveis
│       │
│       ├── auth/
│       │   ├── options.js        # Config NextAuth
│       │   ├── session.js        # Helpers de sessão
│       │   └── guard.js          # Proteção de rotas
│       │
│       ├── ai/
│       │   ├── client.js         # Cliente OpenAI
│       │   ├── prompts.js        # Prompts versionados
│       │   └── parser.js         # Parse de respostas
│       │
│       ├── validators/           # Validação de dados
│       │   ├── user.js
│       │   ├── request.js
│       │   └── service.js
│       │
│       ├── logger.js             # Sistema de logs
│       └── utils.js              # Funções utilitárias
│
├── 💼 Lógica de Negócio
│   └── src/services/
│       ├── provider.service.js   # Lógica de prestadores
│       ├── service.service.js    # Lógica de serviços
│       ├── request.service.js    # Lógica de solicitações
│       ├── message.service.js    # Lógica de mensagens
│       ├── review.service.js     # Lógica de avaliações
│       └── ai.service.js         # Lógica de IA
│
├── 📊 Constantes
│   └── src/constants/
│       ├── roles.js              # client/provider/admin
│       └── statuses.js           # Status de solicitações
│
├── 🌐 Assets Públicos
│   └── public/
│       ├── images/
│       └── favicon.ico
│
└── 📚 Documentação
    ├── README.md                 # Documentação principal
    ├── QUICKSTART.md             # Guia rápido
    ├── PROJECT_STRUCTURE.md      # Este arquivo
    └── scripts/
        ├── setup-db.md           # Setup do Neon
        └── seed.md               # Documentação do seed

```

## 🎯 Fluxo de Dados

```
Cliente → Frontend (React) → API Route → Service → Prisma → Neon (PostgreSQL)
                                  ↓
                              Middleware (Auth/Role Check)
                                  ↓
                              IA Service (OpenAI)
```

## 🔐 Proteção de Rotas

### Middleware (middleware.js)
- Verifica autenticação
- Valida role do usuário
- Redireciona se não autorizado

### Guards (src/lib/auth/guard.js)
- `requireAuth()` - Requer autenticação
- `requireRole([roles])` - Requer role específico

## 📦 Principais Dependências

- **next** - Framework React
- **react** - Biblioteca UI
- **tailwindcss** - Estilização
- **prisma** - ORM
- **next-auth** - Autenticação
- **bcryptjs** - Hash de senhas
- **openai** - Integração IA
- **zod** - Validação (opcional)

## 🚀 Comandos Úteis

```bash
# Desenvolvimento
npm run dev                    # Inicia servidor dev
npm run build                  # Build para produção
npm run start                  # Inicia servidor produção

# Banco de Dados
npm run prisma:generate        # Gera Prisma Client
npm run prisma:migrate         # Executa migrations
npm run prisma:studio          # Interface visual
npm run prisma:seed            # Popula banco

# Qualidade
npm run lint                   # Lint do código
```

## 📝 Convenções

### Nomenclatura
- **Componentes**: PascalCase (ex: `UserCard.js`)
- **Utilitários**: camelCase (ex: `formatDate.js`)
- **Constantes**: UPPER_SNAKE_CASE (ex: `ROLES.CLIENT`)
- **API Routes**: kebab-case (ex: `process-request/route.js`)

### Estrutura de Arquivos
- **Pages**: `page.js` (App Router)
- **Layouts**: `layout.js`
- **API Routes**: `route.js`
- **Componentes**: `ComponentName.js`

### Imports
Use aliases configurados em `jsconfig.json`:
```javascript
import prisma from '@/lib/db/prisma'
import { ROLES } from '@/constants/roles'
import Button from '@/components/ui/Button'
```
