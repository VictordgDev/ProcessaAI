export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-4">Planos e Preços</h1>
        <p className="text-center text-gray-600 mb-12">Escolha o plano ideal para você</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-lg shadow">
            <h3 className="text-2xl font-bold mb-4">Gratuito</h3>
            <p className="text-4xl font-bold mb-6">R$ 0<span className="text-lg text-gray-600">/mês</span></p>
            <ul className="space-y-3 mb-8">
              <li>✓ Criar solicitações</li>
              <li>✓ Buscar prestadores</li>
              <li>✓ Chat básico</li>
            </ul>
            <button className="w-full py-3 bg-gray-200 rounded-lg">Plano Atual</button>
          </div>

          <div className="bg-blue-600 text-white p-8 rounded-lg shadow-lg transform scale-105">
            <h3 className="text-2xl font-bold mb-4">Prestador</h3>
            <p className="text-4xl font-bold mb-6">R$ 49<span className="text-lg">/mês</span></p>
            <ul className="space-y-3 mb-8">
              <li>✓ Perfil destacado</li>
              <li>✓ Receber solicitações</li>
              <li>✓ Chat ilimitado</li>
              <li>✓ Sugestões de IA</li>
            </ul>
            <button className="w-full py-3 bg-white text-blue-600 rounded-lg font-semibold">Começar Agora</button>
          </div>

          <div className="bg-white p-8 rounded-lg shadow">
            <h3 className="text-2xl font-bold mb-4">Empresarial</h3>
            <p className="text-4xl font-bold mb-6">R$ 199<span className="text-lg text-gray-600">/mês</span></p>
            <ul className="space-y-3 mb-8">
              <li>✓ Múltiplos prestadores</li>
              <li>✓ Análises avançadas</li>
              <li>✓ Suporte prioritário</li>
              <li>✓ API personalizada</li>
            </ul>
            <button className="w-full py-3 bg-gray-900 text-white rounded-lg">Contatar Vendas</button>
          </div>
        </div>
      </div>
    </div>
  )
}
