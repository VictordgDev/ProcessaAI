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

  if (pathname.startsWith('/dashboard') || pathname.startsWith('/requests') || pathname.startsWith('/settings')) {
    if (role !== 'client') {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  if (pathname.startsWith('/inbox') || pathname.startsWith('/services') || pathname.startsWith('/profile')) {
    if (role !== 'provider') {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

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
