"use client"

import { useEffect, useState } from "react"
import { useSettingsUser } from "../components/SettingsUserContext"

export default function SecurityPage() {
  const ctx = useSettingsUser()

  if (!ctx) {
    return <div className="p-5">Loading…</div>
  }

  const { user, refresh } = ctx

  if (!user) {
    return <div className="p-5">Loading…</div>
  }

  const [email, setEmail] = useState("")
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [is2FAEnabled, setIs2FAEnabled] = useState(false)
  const [message, setMessage] = useState("")
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    setEmail(user.email ?? "")
    setIs2FAEnabled(user.is2FAEnabled)
  }, [user])

  /* ---------- EMAIL ---------- */
  const saveEmail = async () => {
    setSaving(true)
    setMessage("")

    const res = await fetch("/api/auth/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    })

    if (res.ok) {
      await refresh()
      setMessage("Email updated")
    }

    setSaving(false)
  }

  /* ---------- PASSWORD ---------- */
  const changePassword = async () => {
    setSaving(true)
    setMessage("")

    const res = await fetch("/api/auth/profile/password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ currentPassword, newPassword }),
    })

    const data = await res.json()

    if (!res.ok) {
      setMessage(data.message || "Invalid current password")
      setSaving(false)
      return
    }

    setCurrentPassword("")
    setNewPassword("")
    setMessage("Password updated successfully")
    setSaving(false)
  }

  /* ---------- 2FA ---------- */
  const toggle2FA = async () => {
    const next = !is2FAEnabled
    setIs2FAEnabled(next)

    await fetch("/api/auth/profile/2fa", { method: "POST" })
    await refresh()
  }

  return (
    <>
      {/* HEADER */}
      <div style={{ padding: 24, borderBottom: "1px solid #d1d7dc" }}>
        <h1 style={{ fontSize: 24, fontWeight: 700 }}>
          Account security
        </h1>
        <p style={{ color: "#6a6f73" }}>
          Manage your login and security settings
        </p>
      </div>

      {/* CONTENT */}
      <div style={{ padding: 24, maxWidth: 560 }}>
        {message && (
          <div className="alert alert-success mb-4">
            {message}
          </div>
        )}

        {/* EMAIL */}
        <section style={{ marginBottom: 16 }}>
          <h3>Email address</h3>
          <input
            className="form-control mb-3"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <button
            className="btn btn-outline-primary"
            disabled={saving}
            onClick={saveEmail}
          >
            Change email
          </button>
        </section>

        <hr />

        {/* PASSWORD */}
        <section>
          <h3>Change password</h3>
          <input
            className="form-control mb-3"
            type="password"
            placeholder="Current password"
            value={currentPassword}
            onChange={e => setCurrentPassword(e.target.value)}
          />
          <input
            className="form-control mb-3"
            type="password"
            placeholder="New password"
            value={newPassword}
            onChange={e => setNewPassword(e.target.value)}
          />
          <button
            className="btn btn-primary"
            disabled={saving}
            onClick={changePassword}
          >
            Update password
          </button>
        </section>

        <hr />

        {/* 2FA */}
        <section style={{ marginTop: 16 }}>
          <h3>Two-factor authentication</h3>
          <div className="form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              checked={is2FAEnabled}
              onChange={toggle2FA}
            />
            <label className="form-check-label ms-2">
              Enable two-factor authentication
            </label>
          </div>
        </section>
      </div>
    </>
  )
}
