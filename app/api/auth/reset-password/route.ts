import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { prisma } from "@/app/lib/prisma"

export async function POST(req: Request) {
  const { email, code, password } = await req.json()

  if (!email || !code || !password) {
    return NextResponse.json({ message: "Missing data" }, { status: 400 })
  }

  const record = await prisma.password_reset_codes.findUnique({
    where: { email },
  })

  if (
    !record ||
    record.code !== code ||
    record.expires_at < new Date()
  ) {
    return NextResponse.json({ message: "Invalid or expired code" }, { status: 400 })
  }

  const passwordHash = await bcrypt.hash(password, 10)

  await prisma.users.update({
    where: { email },
    data: { password_hash: passwordHash },
  })

  await prisma.password_reset_codes.delete({
    where: { email },
  })

  return NextResponse.json({ success: true })
}
