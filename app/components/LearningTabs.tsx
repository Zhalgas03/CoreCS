"use client"

export type LearningTab =
  | "all"
  | "in-progress"
  | "completed"
  | "wishlist"

const TAB_LABELS: Record<LearningTab, string> = {
  all: "All courses",
  "in-progress": "In progress",
  completed: "Completed",
  wishlist: "Wishlist",
}

type Props = {
  active: LearningTab
  onChange: (t: LearningTab) => void
}

export default function LearningTabs({ active, onChange }: Props) {
  return (
    <div
      style={{
        display: "flex",
        gap: 24,
        marginTop: 12,
        borderBottom: "1px solid #e5e7eb",
      }}
    >
      {(Object.keys(TAB_LABELS) as LearningTab[]).map(key => {
        const isActive = key === active

        return (
          <button
            key={key}
            onClick={() => onChange(key)}
            style={{
              background: "none",
              border: "none",
              padding: "12px 0",
              fontSize: 16,
              fontWeight: isActive ? 600 : 500,
              cursor: "pointer",
              color: isActive ? "#0f9d58" : "#111827",
              borderBottom: isActive
                ? "3px solid #0f9d58"
                : "3px solid transparent",
            }}
          >
            {TAB_LABELS[key]}
          </button>
        )
      })}
    </div>
  )
}
