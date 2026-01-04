import { NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import { prisma } from "@/app/lib/prisma"

export async function GET(req: Request) {
  const auth = req.headers.get("authorization")
  if (!auth) {
    return NextResponse.json({ owned: false })
  }

  let payload: any
  try {
    payload = jwt.verify(
      auth.replace("Bearer ", ""),
      process.env.JWT_SECRET!
    )
  } catch {
    return NextResponse.json({ owned: false })
  }

  const userId = payload.userId

  // ⬇️ получаем courseSlug из query
  const { searchParams } = new URL(req.url)
  const courseSlug = searchParams.get("courseSlug")

  if (!courseSlug) {
    return NextResponse.json({ owned: false })
  }

  // 🔎 проверка доступа
  const owned = await prisma.user_courses.findFirst({
    where: {
      user_id: userId,
      course_slug: courseSlug,
    },
  })

  return NextResponse.json({
    owned: !!owned,
  })
}
