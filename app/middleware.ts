import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET!

// какие пути защищаем
const protectedRoutes = [
  "/my-learning",
  "/profile",
  "/settings",
]

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // если путь не защищён — пропускаем
  if (!protectedRoutes.some(p => pathname.startsWith(p))) {
    return NextResponse.next()
  }

  const token = req.cookies.get("token")?.value

  // нет токена → логин
  if (!token) {
    return NextResponse.redirect(
      new URL("/login", req.url)
    )
  }

  try {
    jwt.verify(token, JWT_SECRET)
    return NextResponse.next()
  } catch {
    // битый / истёкший токен
    return NextResponse.redirect(
      new URL("/login", req.url)
    )
  }
}

export const config = {
  matcher: [
    "/my-learning/:path*",
    "/profile/:path*",
    "/settings/:path*",
  ],
}
