"use client"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMagnifyingGlass, faXmark } from "@fortawesome/free-solid-svg-icons"


type Props = {
  query: string
  isFree: boolean
  onQueryChange: (v: string) => void
  onFreeChange: (v: boolean) => void
}

export default function SearchBar({
  query,
  isFree,
  onQueryChange,
  onFreeChange,
}: Props) {
  return (
    <div
      style={{
        background: "#f3f4f6",
        padding: 14,
        borderRadius: 8,
        display: "flex",
        alignItems: "center",
        gap: 20,
      }}
    >
      {/* INPUT WRAPPER */}
      <div style={{ position: "relative", flex: 1 }}>
        {/* 🔍 ICON */}
        <FontAwesomeIcon
  icon={faMagnifyingGlass}
  style={{
    position: "absolute",
    left: 10,
    top: "50%",
    transform: "translateY(-50%)",
    color: "#888",
    fontSize: 14,
    pointerEvents: "none",
  }}
/>


        <input
          value={query}
          onChange={e => onQueryChange(e.target.value)}
          placeholder="Course title, author, or subject"
          style={{
            width: "100%",
            padding: "9px 34px 9px 32px",
            fontSize: 14,
            borderRadius: 6,
            border: "1px solid #ddd",
            color: "#333",
            outline: "none",
            backgroundColor: "#fff",
          }}
        />

        {/* ❌ CLEAR */}
        {query && (
          <button
            onClick={() => onQueryChange("")}
            type="button"
            aria-label="Clear"
            style={{
              position: "absolute",
              right: 8,
              top: "50%",
              transform: "translateY(-50%)",
              border: "none",
              background: "transparent",
              cursor: "pointer",
              fontSize: 16,
              color: "#999",
              padding: 0,
              lineHeight: 1,
            }}
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
        )}
      </div>

      {/* FREE CHECKBOX */}
      <label
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          fontSize: 14,
          whiteSpace: "nowrap",
          color: "#333",
          cursor: "pointer",
        }}
      >
        <input
          type="checkbox"
          checked={isFree}
          onChange={e => onFreeChange(e.target.checked)}
        />
        Free
      </label>

      {/* BUTTON */}
      <button
        style={{
          padding: "9px 22px",
          borderRadius: 6,
          border: "none",
          background: "#0f9d58",
          color: "#fff",
          fontWeight: 600,
          cursor: "pointer",
        }}
      >
        Search
      </button>
    </div>
  )
}
