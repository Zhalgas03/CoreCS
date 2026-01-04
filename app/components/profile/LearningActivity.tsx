"use client"

import ProgressItem from "./ProgressItem"

export default function LearningActivity() {
  return (
    <>
      <h3 style={{ marginBottom: 16, color: "#111827" }}>
        Learning activity
      </h3>

      <div
        style={{
          background: "#fff",
          borderRadius: 18,
          padding: 24,
          boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
        }}
      >
        <ProgressItem
          title="Algorithms & Data Structures"
          value={70}
        />
        <ProgressItem
          title="Databases Basics"
          value={100}
          completed
        />
      </div>
    </>
  )
}
