# 🔄 Rotas Atualizadas - Correção de Conflitos

## ⚠️ Problema Resolvido

Os route groups `(admin)`, `(client)`, `(provider)`, `(public)`, `(auth)` e `(docs)` foram removidos porque causavam conflitos de rotas no Next.js.

Route groups não criam segmentos de URL, então `/admin/dashboard` e `/client/dashboard` ambos tentavam resolver para `/dashboard`, causando erro.

## ✅ Nova Estrutura de Rotas

### Rotas Públicas
- `/` - Landing page com chat
- `/login` - Login
- `/register` - Cadastro
- `/forgot-password` - Recuperar senha
- `/providers` - Buscar prestadores
- `/providers/[slug]` - Perfil público do prestador
- `/pricing` - Planos e preços
- `/api-docs` - Documentação da API

### Rotas do Cliente (requer role: client)
- `/client/dashboard` - Dashboard do cliente
- `/client/requests` - Lista de solicitações
- `/client/requests/[id]` - Detalhe da solicitação + chat
- `/client/settings` - Configurações

### Rotas do Prestador (requer role: provider)
- `/provider/dashboard` - Dashboard do prestador
- `/provider/inbox` - Solicitações recebidas
- `/provider/services` - CRUD de serviços
- `/provider/profile` - Editar perfil
- `/provider/settings` - Configurações

### Rotas Admin (requer role: admin)
- `/admin/dashboard` - Dashboard admin
- `/admin/users` - Gerenciar usuários
- `/admin/providers` - Gerenciar prestadores
- `/admin/requests` - Gerenciar solicitações
- `/admin/settings` - Configurações do sistema

## 🔐 Middleware Atualizado

O middleware agora protege as rotas baseado no prefixo:

```javascript
// Rotas do cliente
if (pathname.startsWith('/client')) {
  if (role !== 'client') redirect('/login')
}

// Rotas do prestador
if (pathname.startsWith('/provider')) {
  if (role !== 'provider') redirect('/login')
}

// Rotas do admin
if (pathname.startsWith('/admin')) {
  if (role !== 'admin') redirect('/login')
}
```

## 📝 Alterações Necessárias

Se você já tinha código que referenciava as rotas antigas, atualize:

### Antes (com route groups):
```javascript
router.push('/dashboard')  // ❌ Ambíguo
router.push('/requests')   // ❌ Ambíguo
router.push('/settings')   // ❌ Ambíguo
```

### Depois (rotas explícitas):
```javascript
router.push('/client/dashboard')    // ✅ Cliente
router.push('/provider/dashboard')  // ✅ Prestador
router.push('/admin/dashboard')     // ✅ Admin
```

## 🚀 Deploy na Vercel

Agora o build deve funcionar corretamente! As rotas estão todas explícitas e sem conflitos.

Execute:
```bash
npm run build
```

Se o build passar localmente, o deploy na Vercel também funcionará.
