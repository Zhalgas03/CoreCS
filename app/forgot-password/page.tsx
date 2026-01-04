"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function ForgotPasswordPage() {
  const router = useRouter()

  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const submit = async () => {
    if (!email || isLoading) return

    setIsLoading(true)
    setError("")
    setMessage("")

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })

      if (res.ok) {
        router.push(`/reset-password?email=${encodeURIComponent(email)}`)
      } else {
        setError("Something went wrong")
      }
    } catch {
      setError("Network error")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center bg-dark">
      <div className="card p-4" style={{ maxWidth: 420, width: "100%" }}>
        <h3 className="text-center mb-3">Forgot password</h3>

        <input
          type="email"
          className="form-control mb-3"
          placeholder="Email"
          disabled={isLoading}
          onChange={(e) => setEmail(e.target.value)}
        />

        {message && <div className="alert alert-success">{message}</div>}
        {error && <div className="alert alert-danger">{error}</div>}

        <button
          className="btn btn-primary w-100 d-flex align-items-center justify-content-center gap-2"
          onClick={submit}
          disabled={isLoading}
        >
          {isLoading && (
            <span
              className="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            />
          )}
          {isLoading ? "Sending..." : "Send reset code"}
        </button>
      </div>
    </div>
  )
}
