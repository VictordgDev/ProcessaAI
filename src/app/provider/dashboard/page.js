export default function ProviderDashboard() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard do Prestador</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Solicitações Recebidas</h3>
          <p className="text-4xl font-bold text-blue-600">8</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Serviços Ativos</h3>
          <p className="text-4xl font-bold text-green-600">5</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Avaliação</h3>
          <p className="text-4xl font-bold text-yellow-600">4.8</p>
        </div>
      </div>
    </div>
  )
}
