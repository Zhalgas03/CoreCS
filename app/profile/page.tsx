"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useSettingsUser } from "@/app/settings/components/SettingsUserContext"

import ProfileCard from "@/app/components/profile/ProfileCard"
import Achievements from "@/app/components/profile/Achievements"
import LearningActivity from "@/app/components/profile/LearningActivity"

type Profile = {
  username: string
  avatarUrl?: string | null
  aboutMe?: string | null
  createdAt: string
}

export default function ProfilePage() {
  const router = useRouter()
  const { user } = useSettingsUser()

  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // ✅ 1. Берём данные сразу из контекста (БЫСТРО)
    if (user) {
      setProfile({
        username: user.username,
        avatarUrl: user.avatarUrl,
        aboutMe: user.aboutMe ?? null,
        createdAt: user.createdAt ?? new Date().toISOString(),
      })
      setLoading(false)
      return
    }

    // ✅ 2. Fallback — прямой заход на /profile
    const token = localStorage.getItem("token")
    if (!token) {
      router.push("/login")
      return
    }

    fetch("/api/auth/profile", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => {
        if (!res.ok) throw new Error("Unauthorized")
        return res.json()
      })
      .then(data => {
        setProfile(data)
        setLoading(false)
      })
      .catch(() => router.push("/login"))
  }, [user, router])

  if (loading || !profile) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          color: "#6b7280",
        }}
      >
        Loading…
      </div>
    )
  }

  return (
    <div style={{ background: "#fff", padding: "72px 0" }}>
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "0 24px",
          display: "grid",
          gridTemplateColumns: "320px 1fr",
          gap: 32,
        }}
      >
        {/* LEFT */}
        <ProfileCard
          username={profile.username}
          avatarUrl={profile.avatarUrl}
          aboutMe={profile.aboutMe}
          createdAt={profile.createdAt}
        />

        {/* RIGHT */}
        <main>
          <Achievements />
          <LearningActivity />
        </main>
      </div>
    </div>
  )
}
