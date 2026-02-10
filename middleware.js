import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'

export async function middleware(request) {
  const token = await getToken({ req: request })
  const { pathname } = request.nextUrl

  // Rotas públicas
  const publicPaths = ['/', '/providers', '/pricing', '/login', '/register', '/forgot-password', '/api/auth']
  const isPublicPath = publicPaths.some(path => pathname.startsWith(path))

  if (isPublicPath) {
    return NextResponse.next()
  }

  // Verificar autenticação
  if (!token) {
    const url = new URL('/login', request.url)
    url.searchParams.set('callbackUrl', pathname)
    return NextResponse.redirect(url)
  }

  // Proteção por role
  const role = token.role

  // Rotas do cliente
  if (pathname.startsWith('/client')) {
    if (role !== 'client') {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  // Rotas do prestador
  if (pathname.startsWith('/provider')) {
    if (role !== 'provider') {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  // Rotas do admin
  if (pathname.startsWith('/admin')) {
    if (role !== 'admin') {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|images).*)',
  ],
}
