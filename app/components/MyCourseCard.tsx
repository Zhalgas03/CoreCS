"use client"

type Course = {
  slug: string
  title: string
  progress: number
}

export default function MyCourseCard({ course }: { course: Course }) {
  const actionLabel =
    course.progress === 0
      ? "Start"
      : course.progress === 100
      ? "Completed"
      : "Continue"

  return (
    <div
      style={{
        border: "1px solid #e5e7eb",
        borderRadius: 12,
        padding: 16,
        background: "#fff",
      }}
    >
      <h3
        style={{
          fontSize: 18,
          fontWeight: 600,
          marginBottom: 8,
          color: "#111827",
        }}
      >
        {course.title}
      </h3>

      <div
        style={{
          height: 6,
          background: "#e5e7eb",
          borderRadius: 999,
          overflow: "hidden",
          marginBottom: 12,
        }}
      >
        <div
          style={{
            width: `${course.progress}%`,
            height: "100%",
            background: "#0f9d58",
          }}
        />
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span style={{ fontSize: 14, color: "#6b7280" }}>
          {course.progress}% completed
        </span>

        <button
          style={{
            padding: "6px 12px",
            borderRadius: 6,
            border: "1px solid #0f9d58",
            background:
              actionLabel === "Completed" ? "#e5e7eb" : "#0f9d58",
            color:
              actionLabel === "Completed" ? "#6b7280" : "#fff",
            cursor:
              actionLabel === "Completed" ? "default" : "pointer",
          }}
          disabled={actionLabel === "Completed"}
        >
          {actionLabel}
        </button>
      </div>
    </div>
  )
}
