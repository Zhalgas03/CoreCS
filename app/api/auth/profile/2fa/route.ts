import { verify } from "jsonwebtoken"
import { prisma } from "@/app/lib/prisma"
import { NextResponse } from "next/server"

const JWT_SECRET = process.env.JWT_SECRET!

export async function POST(req: Request) {
  const token = req.headers.get("authorization")?.split(" ")[1]
  const payload: any = verify(token!, JWT_SECRET)

  const user = await prisma.users.findUnique({
    where: { id: payload.userId },
  })

  await prisma.users.update({
    where: { id: payload.userId },
    data: { is_2fa_enabled: !user?.is_2fa_enabled },
  })

  return NextResponse.json({ success: true })
}
