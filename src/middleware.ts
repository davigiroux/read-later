import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import createMiddleware from 'next-intl/middleware'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { routing } from './i18n/routing'

const intlMiddleware = createMiddleware(routing)

const isProtectedRoute = createRouteMatcher([
  '/:locale/dashboard(.*)',
  '/:locale/settings(.*)',
  '/dashboard(.*)',
  '/settings(.*)'
])

export default clerkMiddleware(async (auth, req: NextRequest) => {
  const { userId } = await auth()

  // Handle protected routes
  if (isProtectedRoute(req) && !userId) {
    const signInUrl = new URL('/sign-in', req.url)
    signInUrl.searchParams.set('redirect_url', req.url)
    return NextResponse.redirect(signInUrl)
  }

  // Apply internationalization middleware
  return intlMiddleware(req)
})

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
}
