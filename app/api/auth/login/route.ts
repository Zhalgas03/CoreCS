import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { prisma } from "../../../lib/prisma"
import { sign } from "jsonwebtoken"
import { send2FACode } from "@/app/lib/mail"

const JWT_SECRET = process.env.JWT_SECRET!

async function verifyCaptcha(token: string) {
  const res = await fetch(
    "https://www.google.com/recaptcha/api/siteverify",
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        secret: process.env.RECAPTCHA_SECRET_KEY!,
        response: token,
      }),
    }
  )
  const data = await res.json()
  return data.success === true
}

export async function POST(req: Request) {
  try {
    const { email, password, captchaToken } = await req.json()

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: "Email and password are required." },
        { status: 400 }
      )
    }

    if (!captchaToken || !(await verifyCaptcha(captchaToken))) {
      return NextResponse.json(
        { success: false, message: "CAPTCHA verification failed." },
        { status: 400 }
      )
    }

    const user = await prisma.users.findUnique({
      where: { email },
    })

    if (!user || !user.password_hash) {
      return NextResponse.json(
        { success: false, message: "Invalid email or password" },
        { status: 401 }
      )
    }

    const valid = await bcrypt.compare(password, user.password_hash)
    if (!valid) {
      return NextResponse.json(
        { success: false, message: "Invalid email or password" },
        { status: 401 }
      )
    }

    /* ---------- 2FA ---------- */
    if (user.is_2fa_enabled) {
      const code = Math.floor(100000 + Math.random() * 900000).toString()
      const expires = new Date(Date.now() + 5 * 60 * 1000)

      await prisma.email_2fa_codes.upsert({
        where: { email },
        update: { code, expires_at: expires },
        create: { email, code, expires_at: expires },
      })

      // ⛔ тут пока просто console.log
      await send2FACode(email, code)

      return NextResponse.json({
        success: true,
        requires2FA: true,
      })
    }

    /* ---------- JWT ---------- */
    const token = sign(
      {
        userId: user.id,
        username: user.username,
      },
      JWT_SECRET,
      { expiresIn: "7d" }
    )


   const response = NextResponse.json({
  success: true,
  user: {
    id: user.id,
    username: user.username,
    email: user.email,
    role: user.role,
    is2FAEnabled: user.is_2fa_enabled,
  },
})

response.cookies.set("token", token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  path: "/",
  maxAge: 60 * 60 * 24 * 7, // 7 дней
})

return response

  } catch (e) {
    console.error("LOGIN ERROR:", e)
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    )
  }
  
}
