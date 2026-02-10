'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function ProvidersPage() {
  const [providers, setProviders] = useState([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({ category: '', search: '' })

  useEffect(() => {
    fetchProviders()
  }, [filters])

  const fetchProviders = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (filters.category) params.append('category', filters.category)
      if (filters.search) params.append('search', filters.search)
      
      const res = await fetch(`/api/providers?${params}`)
      const data = await res.json()
      setProviders(data)
    } catch (error) {
      console.error('Erro ao buscar prestadores:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Prestadores de Serviços</h1>
        
        <div className="mb-6 flex gap-4">
          <input
            type="text"
            placeholder="Buscar prestadores..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          />
          <select
            className="px-4 py-2 border border-gray-300 rounded-lg"
            value={filters.category}
            onChange={(e) => setFilters({ ...filters, category: e.target.value })}
          >
            <option value="">Todas as categorias</option>
            <option value="Tecnologia">Tecnologia</option>
            <option value="Design">Design</option>
            <option value="Consultoria">Consultoria</option>
            <option value="Educação">Educação</option>
          </select>
        </div>

        {loading ? (
          <div className="text-center py-12">Carregando...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {providers.map((provider) => (
              <Link
                key={provider.id}
                href={`/providers/${provider.slug}`}
                className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow"
              >
                <h3 className="text-xl font-semibold mb-2">{provider.user.name}</h3>
                <p className="text-gray-600 mb-4">{provider.bio}</p>
                <div className="flex items-center justify-between">
                  <span className="text-yellow-500">★ {provider.rating.toFixed(1)}</span>
                  <span className="text-sm text-gray-500">{provider.reviewCount} avaliações</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
