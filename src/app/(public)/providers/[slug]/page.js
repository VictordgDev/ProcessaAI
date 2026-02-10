export default async function ProviderProfilePage({ params }) {
  const { slug } = params

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Perfil do Prestador</h1>
        <p className="text-gray-600">Slug: {slug}</p>
        <p className="text-sm text-gray-500 mt-4">Implementar busca no banco e exibição completa do perfil</p>
      </div>
    </div>
  )
}
