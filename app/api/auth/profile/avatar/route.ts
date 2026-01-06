import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import jwt from "jsonwebtoken"
import { prisma } from "@/app/lib/prisma"
import { supabase } from "@/app/lib/supabase-server"

const JWT_SECRET = process.env.JWT_SECRET!

type JwtPayload = {
  userId: number
}

export async function POST(req: Request) {
  /* ---------- AUTH ---------- */
  const cookieStore = await cookies()
  const token = cookieStore.get("token")?.value

  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
  }

  let payload: JwtPayload
  try {
    payload = jwt.verify(token, JWT_SECRET) as JwtPayload
  } catch {
    return NextResponse.json({ message: "Invalid token" }, { status: 401 })
  }

  /* ---------- FILE ---------- */
  const formData = await req.formData()
  const file = formData.get("file") as File | null

  if (!file) {
    return NextResponse.json({ message: "No file" }, { status: 400 })
  }

  const buffer = Buffer.from(await file.arrayBuffer())

  const filePath = `users/${payload.userId}/avatar.jpg`

  /* ---------- UPLOAD ---------- */
  const { error } = await supabase.storage
    .from("avatars")
    .upload(filePath, buffer, {
      upsert: true,
      contentType: file.type,
    })

  if (error) {
    console.error(error)
    return NextResponse.json({ message: "Upload failed" }, { status: 500 })
  }

  /* ---------- PUBLIC URL ---------- */
const { data } = supabase.storage
  .from("avatars")
  .getPublicUrl(filePath)

const avatarUrl = `${data.publicUrl}?t=${Date.now()}`

  /* ---------- DB ---------- */
  await prisma.users.update({
    where: { id: payload.userId },
    data: { avatar_url: avatarUrl },
  })

  return NextResponse.json({ avatarUrl })
}
