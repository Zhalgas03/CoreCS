import { NextResponse } from "next/server"
import { prisma } from "@/app/lib/prisma"
import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET!

export async function POST(req: Request) {
  const { email, code } = await req.json()

  /* ---------- CHECK CODE ---------- */
  const record = await prisma.email_2fa_codes.findUnique({
    where: { email },
  })

  if (!record) {
    return NextResponse.json(
      { success: false, message: "No verification code found" },
      { status: 404 }
    )
  }

  if (record.expires_at < new Date()) {
    return NextResponse.json(
      { success: false, message: "Code expired" },
      { status: 400 }
    )
  }

  if (record.code !== code) {
    return NextResponse.json(
      { success: false, message: "Invalid code" },
      { status: 401 }
    )
  }

  /* ---------- CLEANUP ---------- */
  await prisma.email_2fa_codes.delete({
    where: { email },
  })

  /* ---------- USER ---------- */
  const user = await prisma.users.findUnique({
    where: { email },
    select: {
      id: true,
      username: true,
    },
  })

  if (!user) {
    return NextResponse.json(
      { success: false, message: "User not found" },
      { status: 404 }
    )
  }

  /* ---------- JWT ---------- */
  const token = jwt.sign(
    { userId: user.id },
    JWT_SECRET,
    { expiresIn: "7d" }
  )

  /* ---------- COOKIE + RESPONSE ---------- */
  const response = NextResponse.json({ success: true })

  response.cookies.set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 дней
  })

  return response
}
