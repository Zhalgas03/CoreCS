"use client"

import Image from "next/image"
import { formatPrice } from "../lib/formatPrice"

type Props = {
  title: string
  author: string
  tagline?: string
  coverUrl?: string

  rating?: number
  reviewsCount?: number
  durationHours?: number

  price: number
  currency: "USD" | "EUR" | "RUB"
  onClick?: () => void
}

export default function CourseCard({
  title,
  author,
  tagline,
  coverUrl,
  rating,
  reviewsCount,
  durationHours,
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
        borderRadius: 14,
        background: "#fff",
        boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
        cursor: onClick ? "pointer" : "default",
        width: 340,
        height: 210,
      }}
    >
            {/* LEFT */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* TITLE */}
        <h3
          style={{
            fontSize: 20,
            fontWeight: 600,
            color: "#111827",
            marginBottom: 4,
          }}
        >
          {title}
        </h3>

{/* AUTHOR */}
<div
  style={{
    fontSize: 13,
    color: "#ee6730",
    marginBottom: 8,
    textShadow: `
      -0.05px -0.05px 0 #000,
       0.05px -0.05px 0 #000,
      -0.05px  0.05px 0 #000,
       0.05px  0.05px 0 #000
    `,
    fontWeight: 600,
  }}
>
  {author}
</div>


        {/* TAGLINE */}
        {tagline && (
          <div
            style={{
              fontSize: 13,
              color: "#6b7280",
              lineHeight: 1.4,
            }}
          >
            {tagline}
          </div>
        )}

        {/* ⬇️ PUSH DOWN */}
        <div style={{ flex: 1 }} />

        {/* BOTTOM */}
        <div>
          {/* META */}
          <div
            style={{
              display: "flex",
              gap: 12,
              fontSize: 11,
              color: "#6b7280",
              alignItems: "center",
              marginBottom: 6,
            }}
          >
            {rating && (
              <span>
                ⭐ <b>{rating}</b>
              </span>
            )}

            {reviewsCount && (
              <span>👤 {reviewsCount.toLocaleString()}</span>
            )}

            {durationHours && <span>⏱ {durationHours} hours</span>}
          </div>

          {/* PRICE */}
          <div
            style={{
              fontSize: 18,
              fontWeight: 600,
              color: isFree ? "#16a34a" : "#2563eb",
            }}
          >
            {isFree ? "Free" : formatPrice(price, currency)}
          </div>
        </div>
      </div>


      {/* COVER */}
      {coverUrl && (
        <div
          style={{
            position: "relative",
            width: 70,
            height: 70,
            borderRadius: 10,
            overflow: "hidden",
            background: "#f3f4f6",
            flexShrink: 0,
          }}
        >
          <Image
            src={coverUrl}
            alt={title}
            fill
            sizes="96px"
            style={{ objectFit: "cover" }}
          />
        </div>
      )}
    </div>
  )
}
