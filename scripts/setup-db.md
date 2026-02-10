# Setup do Banco de Dados (Neon + Prisma)

## 1. Criar conta no Neon

1. Acesse https://neon.tech
2. Crie uma conta gratuita
3. Crie um novo projeto

## 2. Obter Connection Strings

No dashboard do Neon, você verá duas connection strings:

### Pooled Connection (para Prisma em serverless)
```
postgresql://user:password@host.neon.tech/dbname?sslmode=require&pgbouncer=true
```

### Direct Connection (para migrations)
```
postgresql://user:password@host.neon.tech/dbname?sslmode=require
```

## 3. Configurar .env.local

Copie as strings para o arquivo `.env.local`:

```env
DATABASE_URL="postgresql://user:password@host.neon.tech/dbname?sslmode=require&pgbouncer=true"
DIRECT_URL="postgresql://user:password@host.neon.tech/dbname?sslmode=require"
```

## 4. Executar Migrations

```bash
npm run prisma:generate
npm run prisma:migrate
```

## 5. Popular banco com dados iniciais

```bash
npm run prisma:seed
```

## 6. Verificar no Prisma Studio

```bash
npm run prisma:studio
```

Abrirá interface visual em http://localhost:5555

## Troubleshooting

### Erro de conexão
- Verifique se as connection strings estão corretas
- Certifique-se de que o IP está na whitelist do Neon (geralmente "Allow all" para desenvolvimento)

### Erro em migrations
- Use DIRECT_URL para migrations
- Use DATABASE_URL (pooled) para queries da aplicação
