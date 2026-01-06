import { Suspense } from "react"
import SuccessClient from "./SuccessClient"

export default function SuccessPage() {
  return (
    <Suspense fallback={<p>Checking payment...</p>}>
      <SuccessClient />
    </Suspense>
  )
}
