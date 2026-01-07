import { NextResponse } from "next/server"

export async function GET(req: Request) {
  const url = new URL(req.url)

  // 1️⃣ Самый надёжный вариант
  let baseUrl = url.origin

  // 2️⃣ Vercel fallback (preview / prod)
  const forwardedHost = req.headers.get("x-forwarded-host")
  const forwardedProto =
    req.headers.get("x-forwarded-proto") ?? "https"

  if (forwardedHost) {
    baseUrl = `${forwardedProto}://${forwardedHost}`
  }

  const params = new URLSearchParams({
    client_id: process.env.GITHUB_CLIENT_ID!,
    redirect_uri: `${baseUrl}/api/auth/github/callback`,
    scope: "read:user user:email",
  })

  return NextResponse.redirect(
    `https://github.com/login/oauth/authorize?${params.toString()}`
  )
}
