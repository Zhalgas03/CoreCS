import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import jwt from "jsonwebtoken"
import { prisma } from "@/app/lib/prisma"
import path from "path"
import fs from "fs/promises"

const JWT_SECRET = process.env.JWT_SECRET!

type JwtPayload = {
  userId: number
}

export async function POST(req: Request) {
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

  /* ---------- FILE ---------- */
  const formData = await req.formData()
  const file = formData.get("file") as File | null

  if (!file) {
    return NextResponse.json(
      { message: "No file uploaded" },
      { status: 400 }
    )
  }

  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  const filename = `${payload.userId}-${Date.now()}-${file.name}`
  const avatarsDir = path.join(
    process.cwd(),
    "public",
    "avatars"
  )

  await fs.mkdir(avatarsDir, { recursive: true })

  const filePath = path.join(avatarsDir, filename)
  await fs.writeFile(filePath, buffer)

  const avatarUrl = `/avatars/${filename}`

  /* ---------- DB ---------- */
  await prisma.users.update({
    where: { id: payload.userId },
    data: { avatar_url: avatarUrl },
  })

  return NextResponse.json({ avatarUrl })
}
