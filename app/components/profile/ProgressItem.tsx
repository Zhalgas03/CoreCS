"use client"

export default function ProgressItem({
  title,
  value,
  completed,
}: {
  title: string
  value: number
  completed?: boolean
}) {
  return (
    <div style={{ marginBottom: 20 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 8,
          fontSize: 14,
          color: "#111827",
        }}
      >
        <span>{title}</span>
        <span style={{ color: completed ? "#16a34a" : "#6b7280" }}>
          {completed ? "Completed" : `${value}%`}
        </span>
      </div>

      <div
        style={{
          height: 8,
          background: "#e5e7eb",
          borderRadius: 6,
        }}
      >
        <div
          style={{
            width: `${value}%`,
            height: "100%",
            background: completed ? "#16a34a" : "#2563eb",
            borderRadius: 6,
          }}
        />
      </div>
    </div>
  )
}
