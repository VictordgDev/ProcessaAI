export default function ApiDocsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8">Documentação da API</h1>

        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-2xl font-bold mb-4">Autenticação</h2>
          <p className="text-gray-600 mb-4">
            A API usa NextAuth para autenticação. Todas as rotas protegidas requerem sessão válida.
          </p>
          <div className="bg-gray-100 p-4 rounded">
            <code>POST /api/auth/signin</code>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-2xl font-bold mb-4">Endpoints</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg mb-2">Prestadores</h3>
              <ul className="space-y-2 text-sm">
                <li><code className="bg-gray-100 px-2 py-1 rounded">GET /api/providers</code> - Listar prestadores</li>
                <li><code className="bg-gray-100 px-2 py-1 rounded">GET /api/providers/[slug]</code> - Perfil do prestador</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-2">Serviços</h3>
              <ul className="space-y-2 text-sm">
                <li><code className="bg-gray-100 px-2 py-1 rounded">GET /api/services</code> - Listar serviços</li>
                <li><code className="bg-gray-100 px-2 py-1 rounded">POST /api/services</code> - Criar serviço (provider)</li>
                <li><code className="bg-gray-100 px-2 py-1 rounded">PATCH /api/services/[id]</code> - Atualizar serviço</li>
                <li><code className="bg-gray-100 px-2 py-1 rounded">DELETE /api/services/[id]</code> - Deletar serviço</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-2">Solicitações</h3>
              <ul className="space-y-2 text-sm">
                <li><code className="bg-gray-100 px-2 py-1 rounded">GET /api/requests</code> - Listar solicitações</li>
                <li><code className="bg-gray-100 px-2 py-1 rounded">POST /api/requests</code> - Criar solicitação (client)</li>
                <li><code className="bg-gray-100 px-2 py-1 rounded">GET /api/requests/[id]</code> - Detalhe da solicitação</li>
                <li><code className="bg-gray-100 px-2 py-1 rounded">PATCH /api/requests/[id]</code> - Atualizar solicitação</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-2">Mensagens</h3>
              <ul className="space-y-2 text-sm">
                <li><code className="bg-gray-100 px-2 py-1 rounded">GET /api/messages/[requestId]</code> - Mensagens do chat</li>
                <li><code className="bg-gray-100 px-2 py-1 rounded">POST /api/messages/[requestId]</code> - Enviar mensagem</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-2">IA</h3>
              <ul className="space-y-2 text-sm">
                <li><code className="bg-gray-100 px-2 py-1 rounded">POST /api/ai/process-request</code> - Classificar solicitação</li>
                <li><code className="bg-gray-100 px-2 py-1 rounded">POST /api/ai/suggest-reply</code> - Sugerir resposta</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold mb-4">Roles e Permissões</h2>
          <ul className="space-y-2">
            <li><strong>client:</strong> Criar solicitações, buscar prestadores, enviar mensagens</li>
            <li><strong>provider:</strong> Receber solicitações, gerenciar serviços, responder clientes</li>
            <li><strong>admin:</strong> Acesso total, moderação, configurações</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
