import { NextResponse } from "next/server"
import { prisma } from "../../../lib/prisma"
import { sign } from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET!

export async function POST(req: Request) {
  const { email, code } = await req.json()

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

  await prisma.email_2fa_codes.delete({
    where: { email },
  })

  const user = await prisma.users.findUnique({ where: { email } })
  if (!user) {
    return NextResponse.json(
      { success: false, message: "User not found" },
      { status: 404 }
    )
  }

  const token = sign(
    { userId: user.id, email: user.email },
    JWT_SECRET,
    { expiresIn: "7d" }
  )

  return NextResponse.json({
    success: true,
    token,
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
      is2FAEnabled: user.is_2fa_enabled,
    },
  })
}
