"use client"

import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import Avatar from "@/app/components/Avatar"
import { useRouter } from "next/navigation"
import { usePathname } from "next/navigation"
import Image from "next/image"


type User = {
  username: string
  avatarUrl?: string | null
}

export default function Navbar() {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<User | null>(null)
  const [open, setOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const pathname = usePathname()

  const hideRightPanel =
    pathname === "/login" ||
    pathname === "/register"

  const handleMyLearningClick = (e: React.MouseEvent) => {
    if (!user) {
      e.preventDefault()
      router.push("/login")
    }
  }

useEffect(() => {
  const token = localStorage.getItem("token")

  if (!token) {
    setUser(null)
    setLoading(false)
    return
  }

  setLoading(true)

  fetch("/api/auth/profile", {
    headers: { Authorization: `Bearer ${token}` },
  })
    .then(res => (res.ok ? res.json() : null))
    .then(data => {
      if (data) {
        setUser({
          username: data.username,
          avatarUrl: data.avatarUrl ?? null,
        })
      } else {
        setUser(null)
      }
    })
    .finally(() => setLoading(false))
}, [pathname])



  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("token")
    setUser(null)
    setOpen(false)
  }

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
        <Link
          href="/"
          className="navbar-brand d-flex align-items-center gap-2 mb-0"
        >
          <Image
            src="/logo.png"
            alt="CoreCS"
            width={120}         
            height={120}      
            priority
            style={{
              height: 32,
              width: "auto",
            }}
          />

        </Link>


        <Link
          href="/catalog"
          className="nav-hover text-decoration-none fw-medium"
          style={{ fontSize: "1rem" }}
        >
          Catalog
        </Link>

        <Link
          href="/my-learning"
          onClick={handleMyLearningClick}
          className="nav-hover text-decoration-none fw-medium"
          style={{ fontSize: "1rem" }}
        >
          My Learning
        </Link>
      </div>

      {/* RIGHT */}
      {!hideRightPanel && (
        <div className="ms-auto d-flex align-items-center gap-2">
          {loading ? null : user ? (
            <div className="position-relative" ref={dropdownRef}>
              <button
                onClick={() => setOpen(v => !v)}
                className="btn p-0 border-0 bg-transparent"
              >
                <Avatar
                  username={user.username}
                  imageUrl={user.avatarUrl}
                  size={36}
                />
              </button>

              {open && (
                <div
                  className="position-absolute end-0 mt-2 rounded-1 shadow p-2"
                  style={{
                    width: 150,
                    zIndex: 1000,
                    backgroundColor: "#1b1b1b",
                    fontFamily: "inherit",
                    fontSize: "0.95rem",
                    fontWeight: 500,
                    lineHeight: 1.4,
                    animation: "dropdownFade 0.15s ease-out",
                  }}
                >
                  <Link
                    href="/profile"
                    className="nav-hover d-block py-2 px-3 text-end text-decoration-none"
                    onClick={() => setOpen(false)}
                  >
                    Profile
                  </Link>

                  <Link
                    href="/settings"
                    className="nav-hover d-block py-2 px-3 text-end text-decoration-none"
                    onClick={() => setOpen(false)}
                  >
                    Settings
                  </Link>

                  <div
                    style={{
                      height: 1,
                      backgroundColor: "#2a2a2a",
                      margin: "6px 0",
                    }}
                  />

                  <button
                    onClick={handleLogout}
                    className="nav-hover py-2 px-3 w-100 text-end bg-transparent border-0"
                    style={{
                      fontSize: "0.95rem",
                      fontWeight: 500,
                    }}
                  >
                    Exit
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link
                href="/login"
                className="nav-btn-outline rounded-2 px-3 py-1 text-decoration-none fw-medium"
                style={{ fontSize: "1rem" }}
              >
                Login
              </Link>

              <Link
                href="/register"
                className="nav-btn-outline rounded-2 px-3 py-1 text-decoration-none fw-medium"
                style={{ fontSize: "1rem" }}
              >
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </div>
  </nav>
)


}
