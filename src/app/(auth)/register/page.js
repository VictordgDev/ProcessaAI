'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function RegisterPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [role, setRole] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleRoleSelect = (selectedRole) => {
    setRole(selectedRole)
    setStep(2)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (formData.password !== formData.confirmPassword) {
      setError('As senhas não coincidem')
      return
    }

    setLoading(true)

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, role }),
      })

      if (res.ok) {
        router.push('/login?registered=true')
      } else {
        const data = await res.json()
        setError(data.error || 'Erro ao criar conta')
      }
    } catch (err) {
      setError('Erro ao criar conta')
    } finally {
      setLoading(false)
    }
  }

  if (step === 1) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-4xl w-full px-4">
          <h1 className="text-3xl font-bold text-center mb-8">Como você quer usar o PontesIA?</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <button
              onClick={() => handleRoleSelect('client')}
              className="bg-white p-8 rounded-lg shadow hover:shadow-lg transition-shadow text-left"
            >
              <div className="text-4xl mb-4">👤</div>
              <h2 className="text-2xl font-bold mb-2">Sou Cliente</h2>
              <p className="text-gray-600">Quero encontrar prestadores de serviços</p>
            </button>

            <button
              onClick={() => handleRoleSelect('provider')}
              className="bg-white p-8 rounded-lg shadow hover:shadow-lg transition-shadow text-left"
            >
              <div className="text-4xl mb-4">💼</div>
              <h2 className="text-2xl font-bold mb-2">Sou Prestador</h2>
              <p className="text-gray-600">Quero oferecer meus serviços</p>
            </button>
          </div>

          <div className="text-center mt-6">
            <Link href="/login" className="text-sm text-blue-600 hover:underline">
              Já tem conta? Faça login
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow">
        <h1 className="text-2xl font-bold text-center mb-6">
          Criar conta como {role === 'client' ? 'Cliente' : 'Prestador'}
        </h1>
        
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Nome completo</label>
            <input
              type="text"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Senha</label>
            <input
              type="password"
              required
              minLength={6}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Confirmar senha</label>
            <input
              type="password"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
          >
            {loading ? 'Criando conta...' : 'Criar conta'}
          </button>
        </form>

        <button
          onClick={() => setStep(1)}
          className="w-full mt-4 text-sm text-gray-600 hover:underline"
        >
          ← Voltar
        </button>
      </div>
    </div>
  )
}
