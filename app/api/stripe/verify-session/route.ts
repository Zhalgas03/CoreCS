import Stripe from "stripe"
import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-12-15.clover",
})


const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const sessionId = searchParams.get("session_id")

  if (!sessionId) {
    return NextResponse.json({ paid: false }, { status: 400 })
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId)

    if (session.payment_status !== "paid") {
      return NextResponse.json({ paid: false })
    }

    const userId = session.metadata?.userId
    const courseSlug = session.metadata?.courseSlug

    if (!userId || !courseSlug) {
      console.error("❌ Missing metadata", session.metadata)
      return NextResponse.json({ paid: true })
    }

    // 🔒 защита от дублей
    const { data: existing } = await supabase
      .from("user_courses")
      .select("id")
      .eq("user_id", Number(userId))
      .eq("course_slug", courseSlug)
      .maybeSingle()

    if (!existing) {
      const { error } = await supabase.from("user_courses").insert({
        user_id: Number(userId),
        course_slug: courseSlug,
      })

      if (error) {
        console.error("❌ DB insert error", error)
      } else {
        console.log("✅ COURSE GRANTED via verify-session")
      }
    } else {
      console.log("ℹ️ Course already granted")
    }

    return NextResponse.json({ paid: true })
  } catch (err) {
    console.error("❌ verify-session error", err)
    return NextResponse.json({ paid: false }, { status: 500 })
  }
}