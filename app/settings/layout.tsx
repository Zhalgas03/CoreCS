"use client"

import { SettingsUserProvider, useSettingsUser } from "./components/SettingsUserContext"
import SettingsSidebar from "./components/SettingsSidebar"
import "@/app/lib/fontawesome"

function SettingsGate({ children }: { children: React.ReactNode }) {
  const ctx = useSettingsUser()

  if (!ctx || ctx.loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#f5f7fa",
        }}
      >
        <div style={{ color: "#6a6f73", fontSize: 16 }}>
          Loading settings…
        </div>
      </div>
    )
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f5f7fa",
        paddingTop: 80,
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "260px 1fr",
          gap: 24,
          padding: 24,
        }}
      >
        <SettingsSidebar />

        <main
          style={{
            background: "#fff",
            borderRadius: 6,
            padding: 32,
            border: "1px solid #d1d7dc",
          }}
        >
          {children}
        </main>
      </div>
    </div>
  )
}

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SettingsUserProvider>
      <SettingsGate>{children}</SettingsGate>
    </SettingsUserProvider>
  )
}
