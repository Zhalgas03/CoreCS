import { NextResponse } from "next/server"
import { prisma } from "@/app/lib/prisma"
import jwt from "jsonwebtoken"

export async function GET(req: Request) {
  const token = req.headers.get("authorization")?.replace("Bearer ", "")
  if (!token) return NextResponse.json({ inWishlist: false })

  let payload: any
  try {
    payload = jwt.verify(token, process.env.JWT_SECRET!)
  } catch {
    return NextResponse.json({ inWishlist: false })
  }

  const { searchParams } = new URL(req.url)
  const courseSlug = searchParams.get("courseSlug")
  if (!courseSlug) {
    return NextResponse.json({ inWishlist: false })
  }

  const item = await prisma.user_wishlist.findFirst({
    where: {
      user_id: payload.userId,
      course_slug: courseSlug,
    },
  })

  return NextResponse.json({ inWishlist: !!item })
}
