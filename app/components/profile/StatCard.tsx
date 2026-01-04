"use client"

export default function StatCard({
  title,
  value,
}: {
  title: string
  value: string
}) {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 16,
        padding: 22,
        boxShadow: "0 6px 18px rgba(0,0,0,0.05)",
      }}
    >
      <div style={{ fontSize: 28, fontWeight: 600 }}>{value}</div>
      <div style={{ color: "#6b7280", fontSize: 14 }}>{title}</div>
    </div>
  )
}
