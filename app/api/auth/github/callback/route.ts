import { NextResponse } from "next/server"
import { prisma } from "@/app/lib/prisma"
import { sign } from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET!

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const code = searchParams.get("code")

  if (!code) {
    return NextResponse.redirect("/login?error=github")
  }

  /* 1. exchange code → access_token */
  const tokenRes = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
    body: new URLSearchParams({
      client_id: process.env.GITHUB_CLIENT_ID!,
      client_secret: process.env.GITHUB_CLIENT_SECRET!,
      code,
    }),
  })

  const tokenData = await tokenRes.json()
  const accessToken = tokenData.access_token

  /* 2. get github user */
  const userRes = await fetch("https://api.github.com/user", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
  const ghUser = await userRes.json()

  /* 3. get email */
const emailRes = await fetch("https://api.github.com/user/emails", {
  headers: {
    Authorization: `Bearer ${accessToken}`,
    Accept: "application/vnd.github+json",
  },
})

const emails = await emailRes.json()

let email: string | undefined

if (Array.isArray(emails)) {
  email =
    emails.find((e: any) => e.primary && e.verified)?.email ??
    emails.find((e: any) => e.email)?.email
}

if (!email) {
  return NextResponse.redirect("/login?error=no_email")
}

  /* 4. upsert user */
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


  /* 5. issue JWT */
  const jwt = sign(
    { userId: user.id, email: user.email },
    JWT_SECRET,
    { expiresIn: "7d" }
  )

  /* 6. redirect to frontend with token */
  return NextResponse.redirect(
    `http://localhost:3000/github-callback?token=${jwt}`
  )
}
