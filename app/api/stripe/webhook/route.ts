export const runtime = "nodejs"

import Stripe from "stripe"
import { createClient } from "@supabase/supabase-js"
import { NextResponse } from "next/server"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-12-15.clover",
})

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: Request) {
  console.log("🔥 WEBHOOK HIT")

  // ✅ raw body
  const body = Buffer.from(await req.arrayBuffer())

  // ✅ ПРАВИЛЬНО: берём заголовок напрямую
  const signature = req.headers.get("stripe-signature")

  if (!signature) {
    console.error("❌ Missing stripe-signature")
    return new NextResponse("Missing signature", { status: 400 })
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err) {
    console.error("❌ Invalid webhook signature", err)
    return new NextResponse("Invalid signature", { status: 400 })
  }

  console.log("🔥 EVENT TYPE:", event.type)

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session

    const userId = session.metadata?.userId
    const courseSlug = session.metadata?.courseSlug

    console.log("✅ CHECKOUT COMPLETED", { userId, courseSlug })

    if (!userId || !courseSlug) {
      console.error("❌ Missing metadata")
      return new NextResponse("Missing metadata", { status: 400 })
    }

    const { error } = await supabase
      .from("user_courses")
      .insert({
        user_id: Number(userId),
        course_slug: courseSlug,
      })

    if (error) {
      console.error("❌ Supabase error:", error)
      return new NextResponse("DB error", { status: 500 })
    }

    console.log("✅ COURSE GRANTED")
  }

  return NextResponse.json({ received: true })
}
