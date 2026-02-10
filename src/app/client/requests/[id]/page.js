export default function RequestDetail({ params }) {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Solicitação #{params.id}</h1>
      <p className="text-gray-600">Detalhe da solicitação + chat + status</p>
    </div>
  )
}
