"use client"

import { useState, useRef } from "react"
import ReCAPTCHA from "react-google-recaptcha"
import { useRouter } from "next/navigation"
import Link from "next/link"


export default function LoginPage() {
  const router = useRouter()
  const recaptchaRef = useRef<ReCAPTCHA>(null)

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [code, setCode] = useState("")
  const [captchaToken, setCaptchaToken] = useState("")
  const [needs2FA, setNeeds2FA] = useState(false)
  const [error, setError] = useState("")

  const loginWithGithub = () => {
    window.location.href = "/api/auth/github"
  }

  const submitLogin = async () => {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, captchaToken }),
    })

    const data = await res.json()

    if (data.requires2FA) {
      setNeeds2FA(true)


      setError("")
      setPassword("")
      setCode("")
      recaptchaRef.current?.reset()

      return
    }

    if (data.success) {
      router.refresh()
      router.push("/")
    } else {
      setError(data.message || "Login failed")
      recaptchaRef.current?.reset()
      setCaptchaToken("")
    }

      }

  const submit2FA = async () => {
    const res = await fetch("/api/auth/verify-2fa", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, code }),
    })

    const data = await res.json()

    if (data.success) {
      router.refresh()
      router.push("/")
    } else {
      setError(data.message || "Invalid verification code")
      setCode("") 
    }
  }

  return (
    <div
  className="container-fluid min-vh-100 d-flex align-items-center justify-content-center bg-dark"
  style={{ marginTop: "-80px" }}
>
      <div className="card shadow-lg p-4 auth-appear" style={{ maxWidth: 420, width: "100%", minHeight: 580 }}>
        <div style={{ maxWidth: 360, margin: "0 auto",}}>
        {/* Auth switch */}
{!needs2FA && (
  <div
    className="d-flex mb-4 rounded-3 overflow-hidden border mx-auto"
    style={{
      width: 360,
      backgroundColor: "#d0d0d0",
    }}
  >
    <Link
      href="/register"
      className="flex-fill text-center py-2 fw-medium text-decoration-none"
      style={{
        color: "#555",
      }}
    >
      Sign up
    </Link>

    <div
      className="flex-fill text-center py-2 fw-medium"
      style={{
        backgroundColor: "#111",
        color: "#fff",
      }}
    >
      Log in
    </div>
  </div>
)}

        <h3 className="text-center mb-4 fw-semibold">
          {needs2FA ? "Two-Factor Authentication" : "Log In"}
        </h3>

        {/* ---------- GitHub ---------- */}
        {!needs2FA && (
          <>
            <button
              className="btn btn-outline-dark w-100 mb-3 d-flex align-items-center justify-content-center gap-2"
              onClick={loginWithGithub}
            >
              <img
                src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
                width="20"
                height="20"
                alt="GitHub"
              />
              Sign in with GitHub
            </button>

            <div className="text-center text-muted mb-3">or</div>
          </>
        )}

        {/* ---------- EMAIL / PASSWORD ---------- */}
        {!needs2FA ? (
          <>
            <div className="mb-3">
              <input
                className="form-control form-control-lg fs-6"
                placeholder="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <input
                type="password"
                className="form-control form-control-lg fs-6"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          <div className="mb-2 text-end" style={{ marginTop: -10 }}>
            <Link
              href="/forgot-password"
              className="small text-secondary text-decoration-none"
            >
              Forgot password
            </Link>
          </div>



            <div className="d-flex justify-content-center my-3">
              <ReCAPTCHA
                ref={recaptchaRef}
                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
                onChange={(t) => setCaptchaToken(t || "")}
              />
            </div>

            {error && (
              <div className="alert alert-danger text-center">
                {error}
              </div>
            )}

            <button
              className="btn btn-primary btn-md w-100"
              onClick={submitLogin}
            >
              Sign In
            </button>
                      <p className="text-center mt-3 mb-0 fs-6">
           Don’t have an account? <Link href="/register">Sign up</Link>
          </p>
          </>
          
        ) : (
          <>
            <div className="mb-3">
              <input
                className="form-control form-control-lg text-center"
                placeholder="Enter 2FA code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
            </div>

            {error && (
              <div className="alert alert-danger text-center">
                {error}
              </div>
            )}

            <button
              className="btn btn-success btn-md w-100"
              onClick={submit2FA}
            >
              Verify Code
            </button>
          </>
        )}
      </div>
      </div>
    </div>
  )
}
