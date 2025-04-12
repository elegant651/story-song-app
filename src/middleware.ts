import { NextRequest, NextResponse } from 'next/server'

export async function middleware(req: NextRequest) {
  const { nextUrl: url, geo } = req



  return NextResponse.json({
    result: true,
  })
}

export const config = {
  // matcher: '/api/:path*',
  matcher: '/api/route',
}