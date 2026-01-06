"use client"

import { createContext, useContext, useEffect, useState } from "react"

type User = {
  username: string
  email: string
  is2FAEnabled: boolean
  avatarUrl?: string | null
  aboutMe?: string | null
  createdAt?: string
}

type Ctx = {
  user: User | null
  refresh: () => Promise<void>
  setUser: (u: User | null) => void
}

const SettingsUserContext = createContext<Ctx | null>(null)

/* ✅ БЕЗ throw */
export function useSettingsUser() {
  return useContext(SettingsUserContext)
}

export function SettingsUserProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [user, setUser] = useState<User | null>(null)

  async function refresh() {
    try {
      const res = await fetch("/api/auth/profile", {
        credentials: "include",
      })

      if (!res.ok) return

      const data = await res.json()

      setUser({
        username: data.username,
        email: data.email,
        is2FAEnabled: data.is2FAEnabled,
        aboutMe: data.aboutMe ?? "",
        avatarUrl: data.avatarUrl,
        createdAt: data.createdAt,
      })
    } catch {
      setUser(null)
    }
  }

  useEffect(() => {
    refresh()
  }, [])

  return (
    <SettingsUserContext.Provider value={{ user, setUser, refresh }}>
      {children}
    </SettingsUserContext.Provider>
  )
}
