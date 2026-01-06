"use client"

import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function SuccessClient() {
  const params = useSearchParams()
  const sessionId = params.get("session_id")

  const [status, setStatus] = useState<
    "loading" | "ok" | "error"
  >("loading")

  useEffect(() => {
    if (!sessionId) {
      setStatus("error")
      return
    }

    fetch(`/api/stripe/verify-session?session_id=${sessionId}`)
      .then(res => res.json())
      .then(data => {
        if (data.paid) {
          setStatus("ok")
        } else {
          setStatus("error")
        }
      })
      .catch(() => setStatus("error"))
  }, [sessionId])

  if (status === "loading") return <p>Checking payment...</p>
  if (status === "error") return <p>Payment not confirmed</p>

  return <h1>Payment successful 🎉</h1>
}
