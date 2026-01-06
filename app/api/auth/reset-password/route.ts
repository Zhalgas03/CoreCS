import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { prisma } from "@/app/lib/prisma"

const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/

export async function POST(req: Request) {
  const { email, code, password } = await req.json()

  /* ---------- VALIDATION ---------- */
  if (!email || !code || !password) {
    return NextResponse.json(
      { success: false, message: "Missing data" },
      { status: 400 }
    )
  }

  if (!PASSWORD_REGEX.test(password)) {
    return NextResponse.json(
      {
        success: false,
        message:
          "Password must be at least 8 characters and include uppercase, lowercase letters and a number.",
      },
      { status: 400 }
    )
  }

  /* ---------- CHECK CODE ---------- */
  const record = await prisma.password_reset_codes.findUnique({
    where: { email },
  })

  if (
    !record ||
    record.code !== code ||
    record.expires_at < new Date()
  ) {
    return NextResponse.json(
      { success: false, message: "Invalid or expired code" },
      { status: 400 }
    )
  }

  /* ---------- UPDATE PASSWORD (ATOMIC) ---------- */
  const passwordHash = await bcrypt.hash(password, 12)

  await prisma.$transaction([
    prisma.users.update({
      where: { email },
      data: { password_hash: passwordHash },
    }),
    prisma.password_reset_codes.delete({
      where: { email },
    }),
  ])

  return NextResponse.json({ success: true })
}
