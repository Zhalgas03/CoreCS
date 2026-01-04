import { NextResponse } from "next/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-12-15.clover",
})

export async function POST(req: Request) {
  try {
    const { courseId, title, price, currency, userId } = await req.json()

    console.log("✅ CHECKOUT RECEIVED:", {
      userId,
      courseId,
      title,
      price,
      currency,
    })

    if (!userId || !courseId || !price || !currency) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],

      line_items: [
        {
          price_data: {
            currency,
            product_data: {
              name: title,
            },
            unit_amount: Math.round(price * 100), // 👈 ТОЛЬКО ТУТ *100
          },
          quantity: 1,
        },
      ],

      metadata: {
        userId: String(userId),
        courseSlug: String(courseId),
      },

      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/courses/${courseId}`,
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.log("❌ CHECKOUT ERROR:", error)
    return NextResponse.json(
      { error: "Stripe checkout failed" },
      { status: 500 }
    )
  }
}
