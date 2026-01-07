"use client"

import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"
import UserMenu from "./UserMenu"
import ExploreDropdown from "./ExploreDropdown"

type User = {
  username: string
  avatarUrl?: string | null
}

export default function NavbarClient() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

useEffect(() => {
  let mounted = true

  const loadUser = async () => {
    try {
      const res = await fetch("/api/auth/profile", {
        credentials: "include",
        cache: "no-store",
      })

      if (!mounted) return

      if (res.ok) {
        setUser(await res.json())
      } else {
        setUser(null)
      }
    } finally {
      if (mounted) setLoading(false)
    }
  }

  loadUser()

  const onAuthChange = () => {
    setLoading(true)
    loadUser()
  }

  window.addEventListener("auth-changed", onAuthChange)

  return () => {
    mounted = false
    window.removeEventListener("auth-changed", onAuthChange)
  }
}, [])

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark py-1"
      style={{
        backgroundColor: "#1b1b1b",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1030,
      }}
    >
      <div className="container-fluid px-4 d-flex align-items-center">
        {/* LEFT */}
        <div className="d-flex align-items-center gap-4">
          <Link href="/" className="navbar-brand">
            <Image
              src="/logo.png"
              alt="CoreCS"
              width={120}
              height={32}
              priority
            />
          </Link>

          <div className="explore-wrapper">
            <span className="nav-hover fw-medium">Explore</span>
            <ExploreDropdown />
          </div>

          <Link
            href="/my-learning"
            className="nav-hover text-decoration-none fw-medium"
          >
            My Learning
          </Link>
        </div>

        {/* RIGHT */}
        <div className="ms-auto d-flex align-items-center gap-2">
          {!loading && user ? (
            <UserMenu user={user} />
          ) : !loading ? (
            <>
              <Link href="/login" className="nav-btn-outline px-3 py-1">
                Login
              </Link>
              <Link href="/register" className="nav-btn-outline px-3 py-1">
                Register
              </Link>
            </>
          ) : null}
        </div>
      </div>
    </nav>
  )
}
