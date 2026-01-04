import bcrypt from "bcryptjs"
import { verify } from "jsonwebtoken"
import { prisma } from "@/app/lib/prisma"
import { NextResponse } from "next/server"

const JWT_SECRET = process.env.JWT_SECRET!

export async function POST(req: Request) {
  const token = req.headers.get("authorization")?.split(" ")[1]
  const payload: any = verify(token!, JWT_SECRET)

  const { currentPassword, newPassword } = await req.json()

  const user = await prisma.users.findUnique({
    where: { id: payload.userId },
  })

  const ok = await bcrypt.compare(currentPassword, user!.password_hash!)
  if (!ok) return NextResponse.json({}, { status: 401 })

  const hash = await bcrypt.hash(newPassword, 10)

  await prisma.users.update({
    where: { id: payload.userId },
    data: { password_hash: hash },
  })

  return NextResponse.json({ success: true })
}
