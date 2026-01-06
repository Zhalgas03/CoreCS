import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import jwt from "jsonwebtoken"
import { prisma } from "@/app/lib/prisma"

const JWT_SECRET = process.env.JWT_SECRET!

type JwtPayload = {
  userId: number
}

export async function POST() {
  /* ---------- AUTH ---------- */
  const cookieStore = await cookies()
  const token = cookieStore.get("token")?.value

  if (!token) {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    )
  }

  let payload: JwtPayload

  try {
    payload = jwt.verify(
      token,
      JWT_SECRET
    ) as JwtPayload
  } catch {
    return NextResponse.json(
      { message: "Invalid token" },
      { status: 401 }
    )
  }

  /* ---------- TOGGLE 2FA ---------- */
  const user = await prisma.users.findUnique({
    where: { id: payload.userId },
    select: { is_2fa_enabled: true },
  })

  if (!user) {
    return NextResponse.json(
      { message: "User not found" },
      { status: 404 }
    )
  }

  await prisma.users.update({
    where: { id: payload.userId },
    data: {
      is_2fa_enabled: !user.is_2fa_enabled,
    },
  })

  return NextResponse.json({ success: true })
}
