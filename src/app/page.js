'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

export default function HomePage() {
  const [chats, setChats] = useState([])
  const [currentChatId, setCurrentChatId] = useState(null)
  const [messageInput, setMessageInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef(null)

  // Carregar chats do localStorage
  useEffect(() => {
    const saved = localStorage.getItem('chats')
    if (saved) {
      const loadedChats = JSON.parse(saved)
      setChats(loadedChats)
      if (loadedChats.length > 0) {
        setCurrentChatId(loadedChats[0].id)
      }
    }
  }, [])

  // Salvar chats no localStorage
  useEffect(() => {
    if (chats.length > 0) {
      localStorage.setItem('chats', JSON.stringify(chats))
    }
  }, [chats])

  // Auto-scroll para última mensagem
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [chats, currentChatId])

  const currentChat = chats.find(c => c.id === currentChatId)

  const createNewChat = () => {
    const newChat = {
      id: Date.now(),
      title: 'Nova Conversa',
      messages: [],
      createdAt: new Date().toISOString()
    }
    setChats([newChat, ...chats])
    setCurrentChatId(newChat.id)
  }

  const sendMessage = async () => {
    const content = messageInput.trim()
    if (!content) return

    let chatId = currentChatId
    
    // Criar novo chat se não existir
    if (!chatId) {
      const newChat = {
        id: Date.now(),
        title: content.substring(0, 30) + (content.length > 30 ? '...' : ''),
        messages: [],
        createdAt: new Date().toISOString()
      }
      setChats([newChat, ...chats])
      chatId = newChat.id
      setCurrentChatId(chatId)
    }

    // Adicionar mensagem do usuário
    const userMessage = { role: 'user', content }
    setChats(prevChats => 
      prevChats.map(chat => 
        chat.id === chatId 
          ? { 
              ...chat, 
              messages: [...chat.messages, userMessage],
              title: chat.messages.length === 0 ? content.substring(0, 30) + (content.length > 30 ? '...' : '') : chat.title
            }
          : chat
      )
    )

    setMessageInput('')
    setIsLoading(true)

    // Simular resposta da IA
    setTimeout(() => {
      const aiResponse = {
        role: 'ai',
        content: 'Esta é uma resposta simulada da IA. Para integrar uma IA real, conecte a API do OpenAI, Anthropic ou outro provedor no backend.'
      }
      
      setChats(prevChats =>
        prevChats.map(chat =>
          chat.id === chatId
            ? { ...chat, messages: [...chat.messages, aiResponse] }
            : chat
        )
      )
      setIsLoading(false)
    }, 1000)
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const diff = now - date
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    
    if (days === 0) return 'Hoje'
    if (days === 1) return 'Ontem'
    if (days < 7) return `${days} dias atrás`
    return date.toLocaleDateString('pt-BR')
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-80 bg-gray-900 text-white flex flex-col border-r border-gray-700">
        <div className="p-5 border-b border-gray-700">
          <h2 className="text-xl font-bold mb-4">PontesIA</h2>
          <button
            onClick={createNewChat}
            className="w-full py-3 px-4 bg-gray-800 hover:bg-gray-700 border border-gray-600 rounded-lg transition-colors text-sm font-medium"
          >
            + Nova Conversa
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-3">
          {chats.map(chat => (
            <div
              key={chat.id}
              onClick={() => setCurrentChatId(chat.id)}
              className={`p-3 mb-2 rounded-lg cursor-pointer transition-colors ${
                chat.id === currentChatId
                  ? 'bg-gray-700 border-l-4 border-blue-500'
                  : 'bg-gray-800 hover:bg-gray-700'
              }`}
            >
              <div className="text-sm font-medium truncate">{chat.title}</div>
              <div className="text-xs text-gray-400 mt-1">{formatDate(chat.createdAt)}</div>
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-gray-700">
          <Link 
            href="/login"
            className="block w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-lg text-center text-sm font-medium transition-colors"
          >
            Entrar / Cadastrar
          </Link>
        </div>
      </aside>

      {/* Área de Chat */}
      <main className="flex-1 flex flex-col bg-white">
        <header className="p-5 border-b border-gray-200 bg-white">
          <h1 className="text-xl font-semibold text-gray-900">Chat com IA</h1>
          <p className="text-sm text-gray-500 mt-1">Conectando clientes e prestadores de serviços</p>
        </header>

        <div className="flex-1 overflow-y-auto p-5">
          {!currentChat || currentChat.messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-3">
                Olá! Como posso ajudar você hoje?
              </h2>
              <p className="text-gray-600 mb-8">
                Digite sua mensagem abaixo para começar uma conversa
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
                <div className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 cursor-pointer transition-colors">
                  <p className="text-sm text-gray-700">💼 Encontrar prestadores de serviços</p>
                </div>
                <div className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 cursor-pointer transition-colors">
                  <p className="text-sm text-gray-700">🔍 Buscar por categoria</p>
                </div>
                <div className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 cursor-pointer transition-colors">
                  <p className="text-sm text-gray-700">📝 Criar solicitação de serviço</p>
                </div>
                <div className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 cursor-pointer transition-colors">
                  <p className="text-sm text-gray-700">❓ Como funciona a plataforma</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="max-w-4xl mx-auto space-y-6">
              {currentChat.messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex gap-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.role === 'ai' && (
                    <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold flex-shrink-0">
                      AI
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] p-4 rounded-lg ${
                      msg.role === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-900 border border-gray-200'
                    }`}
                  >
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                  </div>
                  {msg.role === 'user' && (
                    <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold flex-shrink-0">
                      U
                    </div>
                  )}
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold">
                    AI
                  </div>
                  <div className="bg-gray-100 border border-gray-200 p-4 rounded-lg">
                    <div className="flex gap-2">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        <div className="p-5 border-t border-gray-200 bg-white">
          <div className="max-w-4xl mx-auto flex gap-3">
            <textarea
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  sendMessage()
                }
              }}
              placeholder="Digite sua mensagem..."
              className="flex-1 p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={1}
              disabled={isLoading}
            />
            <button
              onClick={sendMessage}
              disabled={isLoading || !messageInput.trim()}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors font-medium"
            >
              Enviar
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}
