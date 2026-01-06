import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import jwt from "jsonwebtoken"
import { prisma } from "@/app/lib/prisma"
import { mapUser } from "@/app/lib/mappers/user"

const JWT_SECRET = process.env.JWT_SECRET!


async function getUserIdFromCookie(): Promise<number | null> {
  const cookieStore = await cookies()
  const token = cookieStore.get("token")?.value
  if (!token) return null

  try {
    const payload: any = jwt.verify(token, JWT_SECRET)
    return payload.userId
  } catch {
    return null
  }
}

/* ---------- GET PROFILE ---------- */
export async function GET() {
  const userId = await getUserIdFromCookie()
  if (!userId) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
  }

  const user = await prisma.users.findUnique({
    where: { id: userId },
    select: {
      id: true,
      username: true,
      email: true,
      avatar_url: true,
      aboutMe: true,
      created_at: true,
      is_2fa_enabled: true,
      role: true,
      is_subscribed: true,
    },
  })

  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 })
  }

  return NextResponse.json(mapUser(user))
}


/* ---------- UPDATE PROFILE ---------- */
export async function PUT(req: Request) {
  const userId = await getUserIdFromCookie()
  if (!userId) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
  }

  const { username, email, aboutMe } = await req.json()

  const user = await prisma.users.update({
  where: { id: userId },
  data: { username, email, aboutMe },
  select: {
    id: true,
    username: true,
    email: true,
    avatar_url: true,
    aboutMe: true,
    created_at: true,
    is_2fa_enabled: true,
    role: true,
    is_subscribed: true,
  },
})


  return NextResponse.json(mapUser(user))
}

