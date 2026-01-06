import bcrypt from "bcryptjs"
import { verify } from "jsonwebtoken"
import { prisma } from "@/app/lib/prisma"
import { NextResponse } from "next/server"
import { cookies } from "next/headers"

const JWT_SECRET = process.env.JWT_SECRET!

export async function POST(req: Request) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("token")?.value

    if (!token) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      )
    }

    const payload: any = verify(token, JWT_SECRET)

    const userId = Number(payload.userId)
    if (!userId) {
      return NextResponse.json(
        { message: "Invalid token" },
        { status: 401 }
      )
    }

    const { currentPassword, newPassword } = await req.json()

    if (!currentPassword || !newPassword) {
      return NextResponse.json(
        { message: "Missing data" },
        { status: 400 }
      )
    }

    const user = await prisma.users.findUnique({
      where: { id: userId },
    })

    if (!user || !user.password_hash) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      )
    }

    const ok = await bcrypt.compare(
      currentPassword,
      user.password_hash
    )

    if (!ok) {
      return NextResponse.json(
        { message: "Invalid current password" },
        { status: 400 }
      )
    }

    const hash = await bcrypt.hash(newPassword, 10)

    await prisma.users.update({
      where: { id: userId },
      data: { password_hash: hash },
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error("CHANGE PASSWORD ERROR:", err)
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    )
  }
}
