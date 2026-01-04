"use client"

import Link from "next/link"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"


type Props = {
  username: string
  avatarUrl?: string | null
  aboutMe?: string | null
  createdAt: string
}

export default function ProfileCard({
  username,
  avatarUrl,
  aboutMe,
  createdAt,
}: Props) {
  return (
    <aside
      style={{
        position: "relative", // ⬅ важно для иконки
        background: "#fff",
        borderRadius: 18,
        padding: 28,
        boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
        height: "fit-content",
      }}
    >
      {/* EDIT ICON */}
      {/* EDIT ICON */}
<Link
  href="/settings"
  title="Edit profile"
  style={{
    position: "absolute",
    top: 18,
    right: 18,
    width: 32,
    height: 32,
    borderRadius: 8,
    display: "grid",
    placeItems: "center",
    color: "#6b7280",
    textDecoration: "none",
  }}
>
<FontAwesomeIcon icon={faPenToSquare} /></Link>


      {/* AVATAR */}
      {avatarUrl ? (
        <img
          src={avatarUrl}
          width={120}
          height={120}
          alt="Avatar"
          style={{
            borderRadius: 28,
            objectFit: "cover",
            marginBottom: 16,
          }}
        />
      ) : (
        <div
          style={{
            width: 120,
            height: 120,
            borderRadius: 28,
            background: "#2563eb",
            display: "grid",
            placeItems: "center",
            color: "#fff",
            fontSize: 48,
            fontWeight: 600,
            marginBottom: 16,
          }}
        >
          {username[0].toUpperCase()}
        </div>
      )}

      <h2 style={{ fontSize: 24, marginBottom: 4, color: "#111827" }}>
        {username}
      </h2>

      <div style={{ fontSize: 14, color: "#6b7280", marginBottom: 12 }}>
        Joined{" "}
        {new Date(createdAt).toLocaleDateString(undefined, {
          year: "numeric",
          month: "long",
        })}
      </div>

      <p style={{ fontSize: 15, color: "#374151", lineHeight: 1.6 }}>
        {aboutMe || "This user has not added a bio yet."}
      </p>
    </aside>
  )
}
