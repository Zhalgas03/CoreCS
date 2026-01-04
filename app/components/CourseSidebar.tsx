"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Course } from "../lib/courses/types"
import { formatPrice } from "../lib/formatPrice"

export default function CourseSidebar({ course }: { course: Course }) {
  const router = useRouter()

  const [owned, setOwned] = useState(false)
  const [checkingAccess, setCheckingAccess] = useState(true)
  const [checkingWishlist, setCheckingWishlist] = useState(true)

  const [inWishlist, setInWishlist] = useState(false)

useEffect(() => {
  const checkAccess = async () => {
    const token = localStorage.getItem("token")

    if (!token) {
      setOwned(false)
      setInWishlist(false)
      setCheckingAccess(false)
      setCheckingWishlist(false)
      return
    }

    try {
      const [ownershipRes, wishlistRes] = await Promise.all([
        fetch(`/api/courses/ownership?courseSlug=${course.slug}`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch(`/api/wishlist/check?courseSlug=${course.slug}`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ])

      if (ownershipRes.ok) {
        const { owned } = await ownershipRes.json()
        setOwned(owned)
      }

      if (wishlistRes.ok) {
        const { inWishlist } = await wishlistRes.json()
        setInWishlist(inWishlist)
      }
    } catch (e) {
      console.error("Access check failed", e)
    } finally {
      setCheckingAccess(false)
      setCheckingWishlist(false)
    }
  }

  checkAccess()
}, [course.slug])


const toggleWishlist = async () => {
  const token = localStorage.getItem("token")
  if (!token) {
    router.push("/login")
    return
  }

  const method = inWishlist ? "DELETE" : "POST"
  const url = inWishlist
    ? "/api/wishlist/remove"
    : "/api/wishlist/add"

  await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ courseSlug: course.slug }),
  })

  setInWishlist(!inWishlist)
}




  // 💳 оплата
  const enroll = async () => {
    const token = localStorage.getItem("token")

    if (!token) {
      router.push("/login")
      return
    }

    const profileRes = await fetch("/api/auth/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (!profileRes.ok) {
      router.push("/login")
      return
    }

    const user = await profileRes.json()

    const res = await fetch("/api/stripe/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        courseId: course.slug,
        title: course.hero.title,
        price: course.pricing.price,
        currency: course.pricing.currency,
        userId: user.id,
      }),
    })

    const data = await res.json()

    if (data.url) {
      window.location.href = data.url
    } else {
      console.error("Checkout error:", data)
    }
  }

  return (
    <aside className="position-sticky" style={{ top: 40 }}>
      <div className="rounded-3 p-4 bg-white">

        {/* PRICE */}
        <div className="mb-4">
          <div className="fs-2 fw-bold mb-4">
            {formatPrice(
              course.pricing.price,
              course.pricing.currency
            )}
          </div>

          {/* ACTION BUTTON */}
          {checkingAccess ? (
            <button
              className="btn btn-secondary w-100 py-3 fs-6 mb-3"
              disabled
            >
              Checking access...
            </button>
          ) : owned ? (
            <button
              onClick={() => router.push("/my-learning")}
              className="btn btn-primary w-100 py-3 fs-6 mb-3"
            >
              Go to course
            </button>
          ) : (
            <button
              onClick={enroll}
              className="btn btn-success w-100 py-3 fs-6 mb-3"
            >
              Enroll now
            </button>
          )}

          <button
  onClick={toggleWishlist}
  disabled={checkingWishlist || owned}
  className={`btn w-100 py-3 fs-6 mb-3 ${
    inWishlist ? "btn-outline-danger" : "btn-outline-success"
  }`}
>
  {checkingWishlist
    ? "Loading…"
    : inWishlist
      ? "Remove from wishlist"
      : "Add to wishlist"}
</button>

          {/* INFO */}
          <div className="bg-light rounded-3 p-3 small">
            <p className="fw-semibold mb-2">What’s included</p>
            <ul className="list-unstyled mb-2">
              <li>• 12 lessons</li>
              <li>• 2h 21m of video</li>
              <li>• 51 quizzes</li>
            </ul>
            <a href="#" className="text-primary text-decoration-none">
              View full syllabus
            </a>
            <div className="text-muted mt-2">
              Last updated Nov 5, 2025
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}
