"use client"
import { useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"

export default function GithubCallback() {
  const router = useRouter()
  const params = useSearchParams()

  useEffect(() => {
    const token = params.get("token")
    if (token) {
      localStorage.setItem("token", token)
      router.replace("/")
    }
  }, [])

  return <p className="text-center mt-5">Signing you in…</p>
}
