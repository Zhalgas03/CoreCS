import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { prisma } from "../../../lib/prisma"


const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/
const EMAIL_REGEX = /^[^@]+@[^@]+\.[^@]+$/

async function verifyCaptcha(token: string): Promise<boolean> {
  const secret = process.env.RECAPTCHA_SECRET_KEY
  if (!secret) return false

  const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      secret,
      response: token,
    }),
  })

  const data = await res.json()
  return data.success === true
}

export async function POST(req: Request) {
  try {
    const { username, email, password, captchaToken } = await req.json()

    /* ---------- captcha ---------- */
    if (!captchaToken || !(await verifyCaptcha(captchaToken))) {
      return NextResponse.json(
        { success: false, message: "Captcha verification failed." },
        { status: 400 }
      )
    }

    /* ---------- basic validation ---------- */
    if (!username || !email || !password) {
      return NextResponse.json(
        { success: false, message: "All fields are required." },
        { status: 400 }
      )
    }

    if (!/[a-zA-Z]/.test(username)) {
      return NextResponse.json(
        { success: false, message: "Username must contain at least one letter." },
        { status: 400 }
      )
    }

    if (!EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { success: false, message: "Invalid email format." },
        { status: 400 }
      )
    }

    if (!PASSWORD_REGEX.test(password)) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Password must be at least 8 characters and include uppercase, lowercase letters and a number.",
        },
        { status: 400 }
      )
    }

    /* ---------- user exists ---------- */
    const existingUser = await prisma.users.findFirst({
      where: {
        OR: [{ email }, { username }],
      },
    })

    if (existingUser) {
      return NextResponse.json(
        { success: false, message: "Username or email already exists." },
        { status: 409 }
      )
    }

    /* ---------- create user ---------- */
    const passwordHash = await bcrypt.hash(password, 12)

    await prisma.users.create({
      data: {
        username,
        email,
        password_hash: passwordHash,
        role: "user",
        is_subscribed: false,
        is_2fa_enabled: false,
      },
    })

    return NextResponse.json(
      { success: true },
      { status: 200 }
    )
  } catch (err) {
    console.error("❌ Register error:", err)
    return NextResponse.json(
      { success: false, message: "Unexpected server error" },
      { status: 500 }
    )
  }
}
