"use client"

import { SettingsUserProvider } from "@/app/settings/components/SettingsUserContext"
import { usePathname } from "next/navigation"

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  return <SettingsUserProvider>{children}</SettingsUserProvider>
}
