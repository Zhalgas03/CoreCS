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

    const userId = Number(session.metadata?.userId)
    const courseSlug = session.metadata?.courseSlug

    if (!userId || !courseSlug) {
      console.error("❌ Missing metadata", session.metadata)
      return NextResponse.json({ paid: false }, { status: 400 })
    }

    /* ===============================
       1️⃣ Проверяем, есть ли уже курс
       =============================== */
    const { data: existing } = await supabase
      .from("user_courses")
      .select("id")
      .eq("user_id", userId)
      .eq("course_slug", courseSlug)
      .maybeSingle()

    /* ===============================
       2️⃣ Добавляем курс (если нет)
       =============================== */
    if (!existing) {
      const { error: insertError } = await supabase
        .from("user_courses")
        .insert({
          user_id: userId,
          course_slug: courseSlug,
        })

      if (insertError) {
        console.error("❌ Failed to insert course", insertError)
        return NextResponse.json({ paid: false }, { status: 500 })
      }

      console.log("✅ COURSE GRANTED")
    } else {
      console.log("ℹ️ Course already exists")
    }

    /* ===============================
       3️⃣ УДАЛЯЕМ ИЗ WISHLIST
       =============================== */
    const { error: wishlistError } = await supabase
      .from("user_wishlist")
      .delete()
      .eq("user_id", userId)
      .eq("course_slug", courseSlug)

    if (wishlistError) {
      console.error("⚠️ Failed to delete from wishlist", wishlistError)
    
    } else {
      console.log("🧹 Removed from wishlist")
    }

    return NextResponse.json({ paid: true })
  } catch (err) {
    console.error("❌ verify-session error", err)
    return NextResponse.json({ paid: false }, { status: 500 })
  }
}
