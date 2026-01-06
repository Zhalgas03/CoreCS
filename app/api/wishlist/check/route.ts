import { NextResponse } from "next/server"
import { prisma } from "@/app/lib/prisma"
import jwt from "jsonwebtoken"
import { cookies } from "next/headers"

export async function GET(req: Request) {
  /* ---------- TOKEN ---------- */
  const cookieStore = await cookies()
  const token = cookieStore.get("token")?.value

  if (!token) {
    return NextResponse.json({ inWishlist: false })
  }

  let payload: any
  try {
    payload = jwt.verify(token, process.env.JWT_SECRET!)
  } catch {
    return NextResponse.json({ inWishlist: false })
  }

  /* ---------- COURSE ---------- */
  const { searchParams } = new URL(req.url)
  const courseSlug = searchParams.get("courseSlug")

  if (!courseSlug) {
    return NextResponse.json({ inWishlist: false })
  }

  /* ---------- CHECK ---------- */
  const item = await prisma.user_wishlist.findFirst({
    where: {
      user_id: payload.userId,
      course_slug: courseSlug,
    },
  })

  return NextResponse.json({
    inWishlist: Boolean(item),
  })
}
