import { NextResponse } from "next/server"
import { prisma } from "@/app/lib/prisma"
import jwt from "jsonwebtoken"
import { cookies } from "next/headers"

export async function POST(req: Request) {
  /* ---------- TOKEN ---------- */
  const cookieStore = await cookies()
  const token = cookieStore.get("token")?.value

  if (!token) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    )
  }

  let payload: any
  try {
    payload = jwt.verify(token, process.env.JWT_SECRET!)
  } catch {
    return NextResponse.json(
      { error: "Invalid token" },
      { status: 401 }
    )
  }

  /* ---------- DATA ---------- */
  const { courseSlug } = await req.json()

  if (!courseSlug) {
    return NextResponse.json(
      { error: "Missing courseSlug" },
      { status: 400 }
    )
  }

  /* ---------- UPSERT ---------- */
  await prisma.user_wishlist.upsert({
    where: {
      user_id_course_slug: {
        user_id: payload.userId,
        course_slug: courseSlug,
      },
    },
    update: {},
    create: {
      user_id: payload.userId,
      course_slug: courseSlug,
    },
  })

  return NextResponse.json({ success: true })
}
