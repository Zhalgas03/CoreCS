"use client"

import { useState, useEffect } from "react"
import { useSettingsUser } from "./components/SettingsUserContext"

export default function SettingsProfilePage() {
  const ctx = useSettingsUser()

  if (!ctx) {
    return <div className="p-5">Loading…</div>
  }

  const { user, refresh } = ctx

  const [username, setUsername] = useState("")
  const [aboutMe, setAboutMe] = useState("")
  const [message, setMessage] = useState("")
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (!user) return
    setUsername(user.username)
    setAboutMe(user.aboutMe ?? "")
  }, [user])

  const save = async () => {
    setSaving(true)
    setMessage("")

    try {
      const res = await fetch("/api/auth/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, aboutMe }),
      })

      if (!res.ok) {
        throw new Error("Failed to update profile")
      }

      await refresh()
      setMessage("Profile updated successfully")
    } catch {
      setMessage("Something went wrong")
    } finally {
      setSaving(false)
    }
  }

  return (
    <>
      {/* HEADER */}
      <div
        style={{
          padding: "24px",
          borderBottom: "1px solid #d1d7dc",
        }}
      >
        <h1 style={{ fontSize: 24, fontWeight: 700, color: "#111827" }}>
          Public profile
        </h1>
        <p style={{ color: "#6a6f73" }}>
          Add information about yourself
        </p>
      </div>

      {/* CONTENT */}
      <div style={{ padding: 24, maxWidth: 520 }}>
        {message && (
          <div className="alert alert-success mb-4">
            {message}
          </div>
        )}

        {/* USERNAME */}
        <section style={{ marginBottom: 24 }}>
          <h3 style={{ fontSize: 18, fontWeight: 700, color: "#111827" }}>
            Username
          </h3>
          <input
            className="form-control"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
        </section>

        {/* BIO */}
        <section style={{ marginBottom: 32 }}>
          <h3 style={{ fontSize: 18, fontWeight: 700, color: "#111827" }}>
            About me
          </h3>

          <textarea
            className="form-control"
            rows={6}
            value={aboutMe}
            onChange={e => setAboutMe(e.target.value)}
          />

          <div
            style={{
              fontSize: 13,
              color: "#6a6f73",
              marginTop: 6,
            }}
          >
            Links and coupon codes are not permitted.
          </div>
        </section>

        <button
          className="btn btn-primary"
          disabled={saving}
          onClick={save}
          style={{ fontWeight: 600 }}
        >
          {saving ? "Saving…" : "Save"}
        </button>
      </div>
    </>
  )
}
