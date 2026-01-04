import { NextResponse } from "next/server"
import { prisma } from "@/app/lib/prisma"
import { verify } from "jsonwebtoken"
import path from "path"
import fs from "fs/promises"

const JWT_SECRET = process.env.JWT_SECRET!

function getUserId(req: Request): number | null {
  const auth = req.headers.get("authorization")
  if (!auth) return null

  try {
    const token = auth.split(" ")[1]
    const payload: any = verify(token, JWT_SECRET)
    return payload.userId
  } catch {
    return null
  }
}

export async function POST(req: Request) {
  const userId = getUserId(req)
  if (!userId) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
  }

  const formData = await req.formData()
  const file = formData.get("file") as File | null

  if (!file) {
    return NextResponse.json({ message: "No file uploaded" }, { status: 400 })
  }

  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  const filename = `${userId}-${Date.now()}-${file.name}`
  const avatarsDir = path.join(process.cwd(), "public", "avatars")


  await fs.mkdir(avatarsDir, { recursive: true })

  const filePath = path.join(avatarsDir, filename)
  await fs.writeFile(filePath, buffer)

  const avatarUrl = `/avatars/${filename}`

  await prisma.users.update({
    where: { id: userId },
    data: { avatar_url: avatarUrl },
  })

  return NextResponse.json({ avatarUrl })
}
