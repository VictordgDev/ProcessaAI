# Seed do Banco de Dados

O arquivo `prisma/seed.js` cria dados iniciais para desenvolvimento e testes.

## Dados criados

### Usuários

1. **Admin**
   - Email: admin@pontesia.com
   - Senha: admin123
   - Role: admin

2. **Cliente**
   - Email: cliente@example.com
   - Senha: client123
   - Role: client

3. **Prestador**
   - Email: prestador@example.com
   - Senha: provider123
   - Role: provider
   - Slug: maria-santos

### Serviços

- Desenvolvimento de Website (R$ 2.500)
- Design de Logo (R$ 500)

## Como executar

```bash
npm run prisma:seed
```

## Personalizar

Edite o arquivo `prisma/seed.js` para adicionar mais dados conforme necessário.
