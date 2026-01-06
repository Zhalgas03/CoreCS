import { Suspense } from "react"
import GithubCallbackClient from "./GithubCallbackClient"

export default function GithubCallbackPage() {
  return (
    <Suspense fallback={<p className="text-center mt-5">Signing you in…</p>}>
      <GithubCallbackClient />
    </Suspense>
  )
}
