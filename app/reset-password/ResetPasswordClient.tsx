"use client"

import { useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"

export default function ResetPasswordClient() {
  const params = useSearchParams()
  const router = useRouter()

  const [email, setEmail] = useState(params.get("email") || "")
  const [code, setCode] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")

  const submit = async () => {
    setError("")
    setMessage("")

    const res = await fetch("/api/auth/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, code, password }),
    })

    if (res.ok) {
      setMessage("Password updated. You can log in.")
      setTimeout(() => router.push("/login"), 1500)
    } else {
      setError("Invalid or expired code")
    }
  }

  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center bg-dark">
      <div className="card p-4" style={{ maxWidth: 420, width: "100%" }}>
        <h3 className="text-center mb-3">Reset password</h3>

        <input
          className="form-control mb-2"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <input
          className="form-control mb-2"
          placeholder="Verification code"
          onChange={e => setCode(e.target.value)}
        />

        <input
          type="password"
          className="form-control mb-3"
          placeholder="New password"
          onChange={e => setPassword(e.target.value)}
        />

        {message && (
          <div className="alert alert-success">{message}</div>
        )}
        {error && (
          <div className="alert alert-danger">{error}</div>
        )}

        <button
          className="btn btn-success w-100"
          onClick={submit}
        >
          Reset password
        </button>
      </div>
    </div>
  )
}
