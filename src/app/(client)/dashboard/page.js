export default function ClientDashboard() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard do Cliente</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Solicitações Ativas</h3>
          <p className="text-4xl font-bold text-blue-600">3</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Concluídas</h3>
          <p className="text-4xl font-bold text-green-600">12</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Mensagens</h3>
          <p className="text-4xl font-bold text-purple-600">5</p>
        </div>
      </div>
    </div>
  )
}
