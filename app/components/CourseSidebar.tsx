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

  /* ---------- CHECK ACCESS + WISHLIST ---------- */
  useEffect(() => {
    const checkAccess = async () => {
      try {
        const [ownershipRes, wishlistRes] = await Promise.all([
          fetch(
            `/api/courses/ownership?courseSlug=${course.slug}`,
            { credentials: "include" }
          ),
          fetch(
            `/api/wishlist/check?courseSlug=${course.slug}`,
            { credentials: "include" }
          ),
        ])

        if (ownershipRes.ok) {
          const { owned } = await ownershipRes.json()
          setOwned(owned)
        } else {
          setOwned(false)
        }

        if (wishlistRes.ok) {
          const { inWishlist } = await wishlistRes.json()
          setInWishlist(inWishlist)
        } else {
          setInWishlist(false)
        }
      } catch (e) {
        console.error("Access check failed", e)
        setOwned(false)
        setInWishlist(false)
      } finally {
        setCheckingAccess(false)
        setCheckingWishlist(false)
      }
    }

    checkAccess()
  }, [course.slug])

  /* ---------- WISHLIST ---------- */
  const toggleWishlist = async () => {
    const method = inWishlist ? "DELETE" : "POST"
    const url = inWishlist
      ? "/api/wishlist/remove"
      : "/api/wishlist/add"

    const res = await fetch(url, {
      method,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ courseSlug: course.slug }),
    })

    if (res.status === 401) {
      router.push("/login")
      return
    }

    setInWishlist(!inWishlist)
  }

  /* ---------- ENROLL / STRIPE ---------- */
  const enroll = async () => {
    const profileRes = await fetch("/api/auth/profile", {
      credentials: "include",
    })

    if (!profileRes.ok) {
      router.push("/login")
      return
    }

    const user = await profileRes.json()

    const res = await fetch("/api/stripe/checkout", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
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

          {/* WISHLIST */}
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
    <li>• {course.curriculum.length} lessons</li>
    <li>• {course.catalog.durationHours} hours</li>
  </ul>

  <a
    href="#curriculum"
    className="text-primary text-decoration-none"
  >
    View full syllabus
  </a>
</div>

        </div>
      </div>
    </aside>
  )
}
