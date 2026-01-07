"use client"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import ReCAPTCHA from "react-google-recaptcha"
import { FaEye, FaEyeSlash } from "react-icons/fa"

export default function RegisterPage() {
  const router = useRouter()
  const recaptchaRef = useRef<ReCAPTCHA>(null)

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
    const loginWithGithub = () => {
    window.location.href = "/api/auth/github"
  }

  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [captchaToken, setCaptchaToken] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const isPasswordStrong = (password: string) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(password)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setError("")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match")
      return
    }

    if (!isPasswordStrong(form.password)) {
      setError(
        "Password must be at least 8 characters and include uppercase, lowercase letters, and a number"
      )
      return
    }

    if (!captchaToken) {
      setError("Please complete the CAPTCHA.")
      return
    }

    try {
      setLoading(true)

      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: form.username,
          email: form.email,
          password: form.password,
          captchaToken,
        }),
      })

      const data = await res.json()

      if (res.ok && data.success) {
        router.push("/login")
      } else {
        setError(data.message || "Registration failed")
        recaptchaRef.current?.reset()
        setCaptchaToken("")
      }
    } catch {
      setError("Network error")
      recaptchaRef.current?.reset()
      setCaptchaToken("")
    } finally {
      setLoading(false)
    }
  }

return (
  <div
    className="container-fluid d-flex align-items-center justify-content-center bg-dark"
    style={{   minHeight: "calc(100dvh - 50px)",
    position: "relative", }}
  >
    <div className="card shadow-lg p-4 auth-appear" style={{ maxWidth: 620, width: "100%", minHeight: 580 }}>
      
      
      {/* Auth switch */}
<div
  className="d-flex mb-4 rounded-3 overflow-hidden border mx-auto"
  style={{ width: 360 }}
>
  <div
    className="flex-fill text-center py-2 fw-medium"
    style={{ backgroundColor: "#111", color: "#fff" }}
  >
    Sign up
  </div>

  <Link
    href="/login"
    className="flex-fill text-center py-2 fw-medium text-decoration-none"
    style={{ backgroundColor: "#d0d0d0", color: "#666" }}
  >
    Log in
  </Link>
</div>


      <h3 className="text-center mb-4 fw-semibold">Sign Up</h3>

      {/* GitHub */}
<button
  onClick={loginWithGithub}
  className="btn btn-outline-dark mb-3 d-flex align-items-center justify-content-center gap-2"
  style={{
    width: 360,
    marginLeft: "auto",
    marginRight: "auto",
  }}
>
  <img
    src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
    width="20"
    height="20"
    alt="GitHub"
  />
  Sign in with GitHub
</button>


      <div className="text-center text-muted mb-4">or</div>

      <form onSubmit={handleSubmit}>
        
        {/* ROW 1 */}
        <div className="row g-3 mb-3">
          <div className="col-md-6">
            <input
              name="username"
              placeholder="Username"
              className="form-control form-control-lg fs-6"
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-6 position-relative">
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="form-control form-control-lg pe-5 fs-6"
              onChange={handleChange}
              required
            />
            <span
              className="position-absolute top-50 end-0 translate-middle-y me-3 text-muted"
              style={{ cursor: "pointer" }}
              onClick={() => setShowPassword(p => !p)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        </div>

        {/* ROW 2 */}
        <div className="row g-3 mb-3">
          <div className="col-md-6">
            <input
              name="email"
              type="email"
              placeholder="Email"
              className="form-control form-control-lg fs-6"
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-6 position-relative">
            <input
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm password"
              className="form-control form-control-lg pe-5 fs-6"
              onChange={handleChange}
              required
            />
            <span
              className="position-absolute top-50 end-0 translate-middle-y me-3 text-muted"
              style={{ cursor: "pointer" }}
              onClick={() => setShowConfirmPassword(p => !p)}
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        </div>

        <div className="d-flex justify-content-center my-3">
          <ReCAPTCHA
            ref={recaptchaRef}
            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
            onChange={(token) => setCaptchaToken(token || "")}
          />
        </div>

        {error && (
          <div className="alert alert-danger text-center">
            {error}
          </div>
        )}

<button
  className="btn btn-primary btn-md mb-3 d-block"
  style={{ width: 360, margin: "0 auto" }}
  disabled={loading}
>
  {loading ? "Creating account..." : "Sign Up"}
</button>


        <p className="text-center mt-3 mb-0 fs-6">
          Already have an account? <Link href="/login">Sign in</Link>
        </p>
      </form>
    </div>
  </div>
)

}
