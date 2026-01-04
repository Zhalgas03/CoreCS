import { NextResponse } from "next/server"
import { prisma } from "@/app/lib/prisma"
import jwt from "jsonwebtoken"

export async function DELETE(req: Request) {
  const token = req.headers.get("authorization")?.replace("Bearer ", "")
  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  let payload: any
  try {
    payload = jwt.verify(token, process.env.JWT_SECRET!)
  } catch {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 })
  }

  const { courseSlug } = await req.json()

  await prisma.user_wishlist.deleteMany({
    where: {
      user_id: payload.userId,
      course_slug: courseSlug,
    },
  })

  return NextResponse.json({ success: true })
}
