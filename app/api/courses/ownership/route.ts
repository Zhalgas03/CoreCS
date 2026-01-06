import { NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import { prisma } from "@/app/lib/prisma"
import { cookies } from "next/headers"

export async function GET(req: Request) {
  /* ---------- TOKEN FROM COOKIE ---------- */
  const cookieStore = await cookies()
  const token = cookieStore.get("token")?.value

  if (!token) {
    return NextResponse.json({ owned: false })
  }

  let payload: any
  try {
    payload = jwt.verify(
      token,
      process.env.JWT_SECRET!
    )
  } catch {
    return NextResponse.json({ owned: false })
  }

  const userId = payload.userId

  /* ---------- COURSE SLUG ---------- */
  const { searchParams } = new URL(req.url)
  const courseSlug = searchParams.get("courseSlug")

  if (!courseSlug) {
    return NextResponse.json({ owned: false })
  }

  /* ---------- OWNERSHIP CHECK ---------- */
  const owned = await prisma.user_courses.findFirst({
    where: {
      user_id: userId,
      course_slug: courseSlug,
    },
  })

  return NextResponse.json({
    owned: Boolean(owned),
  })
}
