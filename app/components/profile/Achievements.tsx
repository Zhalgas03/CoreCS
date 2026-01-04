"use client"

import StatCard from "./StatCard"

export default function Achievements() {
  return (
    <>
      <h3 style={{ marginBottom: 16, color: "#111827" }}>
        Achievements
      </h3>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 18,
          marginBottom: 40,
        }}
      >
        <StatCard title="Courses completed" value="3" />
        <StatCard title="Certificates" value="1" />
      </div>
    </>
  )
}
