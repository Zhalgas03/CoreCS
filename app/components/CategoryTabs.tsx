"use client"

type CategoryKey =
  | "all"
  | "math"
  | "programming"
  | "data-science"
  | "systems"

const CATEGORY_LABELS: Record<CategoryKey, string> = {
  all: "Trending",
  math: "Mathematics",
  programming: "Programming",
  "data-science": "Data Science",
  systems: "Systems",
}

type Props = {
  active: CategoryKey
  onChange: (c: CategoryKey) => void
}

export default function CategoryTabs({ active, onChange }: Props) {
  return (
    <div
      style={{
        display: "flex",
        gap: 24,
        marginTop: 12,
        borderBottom: "1px solid #e5e7eb",
      }}
    >
      {(Object.keys(CATEGORY_LABELS) as CategoryKey[]).map(key => {
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
            {CATEGORY_LABELS[key]}
          </button>
        )
      })}
    </div>
  )
}
