import { NextResponse } from "next/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-12-15.clover",
})

/**
 * ✅ Корректно определяем baseUrl
 * 1) Приоритет — origin запроса (самый надёжный вариант)
 * 2) Vercel Preview / Production
 * 3) Localhost
 */
function getBaseUrl(req: Request) {
  const origin = req.headers.get("origin")
  if (origin) return origin

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`
  }

  return "http://localhost:3000"
}

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

    const baseUrl = getBaseUrl(req)

    console.log("🌍 STRIPE BASE URL:", baseUrl)

    const session = await stripe.checkout.sessions.create({
      mode: "payment",

      line_items: [
        {
          price_data: {
            currency,
            product_data: {
              name: title,
            },
            unit_amount: Math.round(Number(price) * 100),
          },
          quantity: 1,
        },
      ],

      metadata: {
        userId: String(userId),
        courseSlug: String(courseId),
      },

      success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/courses/${courseId}`,
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error("❌ CHECKOUT ERROR:", error)
    return NextResponse.json(
      { error: "Stripe checkout failed" },
      { status: 500 }
    )
  }
}
