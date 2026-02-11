import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'ProcessaAI - Assistente Jurídico Inteligente',
  description: 'Plataforma de apoio jurídico com IA baseada na legislação brasileira',
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
