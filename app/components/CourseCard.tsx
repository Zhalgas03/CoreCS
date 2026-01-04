"use client"

import Image from "next/image"
import { formatPrice } from "../lib/formatPrice"

type Props = {
  title: string
  tagline?: string
  coverUrl?: string
  price: number
  currency: "USD" | "EUR" | "RUB"
  onClick?: () => void
}

export default function CourseCard({
  title,
  tagline,
  coverUrl,
  price,
  currency,
  onClick,
}: Props) {
  const isFree = price === 0

  return (
    <div
      onClick={onClick}
      style={{
        display: "flex",
        gap: 16,
        padding: 16,
        border: "1px solid #e5e7eb",
        borderRadius: 10,
        background: "#fff",
        cursor: onClick ? "pointer" : "default",
        height: 190,
        width: 340,
        alignItems: "flex-start", // ⬅️ всё вверх
      }}
    >
      {/* TEXT */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        {/* TITLE */}
        <h3
          style={{
            fontSize: 22,
            fontWeight: 600,
            marginBottom: 6,
            color: "#111827",
          }}
        >
          {title}
        </h3>

        {/* TAGLINE */}
        {tagline && (
          <p
            style={{
              fontSize: 13,
              color: "#6b7280",
              lineHeight: 1.4,
            }}
          >
            {tagline}
          </p>
        )}

        {/* PRICE — ВНИЗ */}
        <div
          style={{
            marginTop: "auto", // ⬅️ магия
            fontWeight: 600,
            fontSize: 20,
            color: isFree ? "#16a34a" : "#2563eb",
          }}
        >
          {isFree ? "Free" : formatPrice(price, currency)}
        </div>
      </div>

      {/* COVER */}
      {coverUrl && (
        <div
          style={{
            position: "relative",
            width: 100,
            height: 100,
            flexShrink: 0,
            borderRadius: 8,
            overflow: "hidden",
            background: "#f3f4f6",
          }}
        >
          <Image
            src={coverUrl}
            alt={title}
            fill
            sizes="100px"
            style={{ objectFit: "cover" }}
          />
        </div>
      )}
    </div>
  )
}
