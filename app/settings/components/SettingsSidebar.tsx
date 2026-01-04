"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useSettingsUser } from "./SettingsUserContext"

export default function SettingsSidebar() {
  const pathname = usePathname()
  const { user } = useSettingsUser()

  if (!user) return null

  return (
    <aside
      style={{
        width: 260,
        background: "#fff",
        borderRadius: 6,
        border: "1px solid #d1d7dc",
        overflow: "hidden",
      }}
    >
      {/* USER HEADER */}
      <div
        style={{
          padding: 24,
          borderBottom: "1px solid #d1d7dc",
          textAlign: "center",
        }}
      >
        {user.avatarUrl ? (
          <img
            src={user.avatarUrl}
            width={96}
            height={96}
            style={{
              borderRadius: 12,
              objectFit: "cover",
              display: "block",
              margin: "0 auto 12px",
            }}
          />
        ) : (
          <div
            style={{
              width: 96,
              height: 96,
              borderRadius: 12,
              background: "#111827",
              color: "#fff",
              fontSize: 40,
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 12px",
            }}
          >
            {user.username.charAt(0).toUpperCase()}
          </div>
        )}

        <div
          style={{
            fontWeight: 600,
            fontSize: 18,
            color: "#1c1d1f",
            marginBottom: 6,
          }}
        >
          {user.username}
        </div>

        <Link
          href={`/profile`}
          style={{
            fontSize: 14,
            color: "#1c1d1f",
            textDecoration: "underline",
          }}
        >
          View public profile
        </Link>
      </div>

      {/* NAV */}
      <nav style={{ padding: 12 }}>
        <NavItem href="/settings" active={pathname === "/settings"}>
          Profile
        </NavItem>
        <NavItem href="/settings/photo" active={pathname === "/settings/photo"}>
          Photo
        </NavItem>
        <NavItem
          href="/settings/security"
          active={pathname === "/settings/security"}
        >
          Account Security
        </NavItem>

        <NavItem muted>Subscriptions</NavItem>
        <NavItem muted>Payment methods</NavItem>
        <NavItem muted>Privacy</NavItem>
        <NavItem muted>Notification Preferences</NavItem>
        <NavItem muted>API clients</NavItem>
      </nav>
    </aside>
  )
}

/* ---------- ITEM ---------- */

function NavItem({
  href,
  active,
  muted,
  children,
}: {
  href?: string
  active?: boolean
  muted?: boolean
  children: string
}) {
  const style = {
    display: "block",
    padding: "10px 12px",
    borderRadius: 4,
    marginBottom: 4,
    fontWeight: 500,
    fontSize: 15,
    textDecoration: "none",
    background: active ? "#a1a1b3" : "transparent",
    color: muted
      ? "#9ca3af"
      : active
      ? "#ffffff"
      : "#1c1d1f",
    cursor: muted ? "default" : "pointer",
  } as const

  if (muted || !href) {
    return <div style={style}>{children}</div>
  }

  return (
    <Link href={href} style={style}>
      {children}
    </Link>
  )
}
