import { NextResponse } from "next/server"
import { prisma } from "@/app/lib/prisma"
import { verify } from "jsonwebtoken"
import { mapUser } from "@/app/lib/mappers/user"
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

/* ---------- GET PROFILE ---------- */
export async function GET(req: Request) {
  const userId = getUserId(req)
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
      password_hash: true,
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
  const userId = getUserId(req)
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
    },
  })

  return NextResponse.json(user)
}
