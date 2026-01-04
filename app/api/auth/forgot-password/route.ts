import { NextResponse } from "next/server"
import { prisma } from "@/app/lib/prisma"
import { send2FACode } from "@/app/lib/mail"

export async function POST(req: Request) {
  const { email } = await req.json()

  if (!email) {
    return NextResponse.json({ message: "Email required" }, { status: 400 })
  }

  const user = await prisma.users.findUnique({ where: { email } })
  if (!user) {
    // ❗ не палим существование почты
    return NextResponse.json({ success: true })
  }

  const code = Math.floor(100000 + Math.random() * 900000).toString()
  const expires = new Date(Date.now() + 10 * 60 * 1000)

  await prisma.password_reset_codes.upsert({
    where: { email },
    update: { code, expires_at: expires },
    create: { email, code, expires_at: expires },
  })

  await send2FACode(email, code) 

  return NextResponse.json({ success: true })
}
