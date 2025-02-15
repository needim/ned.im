import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const response = NextResponse.next()
  
  // 在开发环境中模拟中国地区
  if (process.env.NODE_ENV === 'development') {
    console.log('Middleware: Development environment detected')
    response.headers.set('x-user-country', 'CN')
    console.log('Middleware: Set country to CN in development')
  } else {
    // 生产环境中使用 Vercel 的地理位置检测
    const country = request.headers.get('x-vercel-ip-country') || ''
    response.headers.set('x-user-country', country)
    console.log('Middleware: Set country from Vercel:', country)
  }
  
  // 打印最终设置的 header
  console.log('Middleware: Final x-user-country header:', response.headers.get('x-user-country'))
  
  return response
}

// 配置 middleware 只在特定路径下运行
export const config = {
  matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)',
} 