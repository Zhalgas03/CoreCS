import { NextResponse } from "next/server"
import { prisma } from "@/app/lib/prisma"
import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET!

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const code = searchParams.get("code")

  if (!code) {
    return NextResponse.redirect(
      new URL("/login?error=github", req.url)
    )
  }

  /* ---------- 1. exchange code → access_token ---------- */
  const tokenRes = await fetch(
    "https://github.com/login/oauth/access_token",
    {
      method: "POST",
      headers: { Accept: "application/json" },
      body: new URLSearchParams({
        client_id: process.env.GITHUB_CLIENT_ID!,
        client_secret: process.env.GITHUB_CLIENT_SECRET!,
        code,
      }),
    }
  )

  const tokenData = await tokenRes.json()
  const accessToken = tokenData.access_token

  if (!accessToken) {
    return NextResponse.redirect(
      new URL("/login?error=github", req.url)
    )
  }

  /* ---------- 2. get github user ---------- */
  const userRes = await fetch(
    "https://api.github.com/user",
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/vnd.github+json",
      },
    }
  )
  const ghUser = await userRes.json()

  /* ---------- 3. get email ---------- */
  const emailRes = await fetch(
    "https://api.github.com/user/emails",
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/vnd.github+json",
      },
    }
  )

  const emails = await emailRes.json()

  const email =
    Array.isArray(emails)
      ? emails.find((e: any) => e.primary && e.verified)?.email ??
        emails.find((e: any) => e.email)?.email
      : undefined

  if (!email) {
    return NextResponse.redirect(
      new URL("/login?error=no_email", req.url)
    )
  }

  /* ---------- 4. upsert user ---------- */
  const user = await prisma.users.upsert({
    where: { email },
    update: {},
    create: {
      username: ghUser.login,
      email,
      password_hash: null,
      role: "user",
      is_subscribed: false,
      is_2fa_enabled: false,
    },
  })

  /* ---------- 5. issue JWT ---------- */
  const token = jwt.sign(
    {
      userId: user.id,
      username: user.username,
    },
    JWT_SECRET,
    { expiresIn: "7d" }
  )

  /* ---------- 6. set cookie + redirect ---------- */
  const response = NextResponse.redirect(
    new URL("/", req.url)
  )

  response.cookies.set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 дней
  })

  return response
}
