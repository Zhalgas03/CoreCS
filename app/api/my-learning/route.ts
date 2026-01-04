import { NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import { prisma } from "@/app/lib/prisma"

export async function GET(req: Request) {
  const auth = req.headers.get("authorization")
  if (!auth) {
    return NextResponse.json({ user: null, ownedSlugs: [] })
  }

  let payload: any
  try {
    payload = jwt.verify(
      auth.replace("Bearer ", ""),
      process.env.JWT_SECRET!
    )
  } catch {
    return NextResponse.json({ user: null, ownedSlugs: [] })
  }

  const userId = payload.userId

  const user = await prisma.users.findUnique({
    where: { id: userId },
    select: {
      id: true,
      username: true,
      user_courses: {
        select: { course_slug: true },
      },
    },
  })

  if (!user) {
    return NextResponse.json({ user: null, ownedSlugs: [] })
  }

  return NextResponse.json({
    user: {
      id: user.id,
      username: user.username,
    },
    ownedSlugs: user.user_courses.map(c => c.course_slug),
  })
}
