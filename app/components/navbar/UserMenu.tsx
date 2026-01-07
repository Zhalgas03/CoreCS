"use client"

import { useRef, useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import Avatar from "@/app/components/Avatar"

type Props = {
  user: {
    username: string
    avatarUrl?: string | null
  }
}

export default function UserMenu({ user }: Props) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const router = useRouter()

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", onClick)
    return () => document.removeEventListener("mousedown", onClick)
  }, [])

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" })
    window.dispatchEvent(new Event("auth-changed"))
    router.push("/login")
    
  }

  return (
    <div className="position-relative" ref={ref}>
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
            backgroundColor: "#1b1b1b",
            zIndex: 1000,
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
            onClick={logout}
            className="nav-hover py-2 px-3 w-100 text-end bg-transparent border-0"
          >
            Exit
          </button>
        </div>
      )}
    </div>
  )
}
