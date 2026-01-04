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
  setUser: (u: User) => void
}

const SettingsUserContext = createContext<Ctx | null>(null)

export function useSettingsUser() {
  const ctx = useContext(SettingsUserContext)
  if (!ctx) throw new Error("useSettingsUser outside provider")
  return ctx
}

export function SettingsUserProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [user, setUser] = useState<User | null>(null)

  async function refresh() {
  const token = localStorage.getItem("token")
  if (!token) return

  const res = await fetch("/api/auth/profile", {
    headers: { Authorization: `Bearer ${token}` },
  })

  const data = await res.json()

  setUser({
    username: data.username,
    email: data.email,
    is2FAEnabled: data.is2FAEnabled,
    aboutMe: data.aboutMe ?? "",
    avatarUrl: data.avatarUrl
      ? data.avatarUrl.startsWith("http")
        ? data.avatarUrl
        : `${window.location.origin}${data.avatarUrl}`
      : null,
      createdAt: data.createdAt,
  })
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
