"use client"

export default function MyLearningHero({
  tab,
  setTab,
}: {
  tab: "all" | "wishlist" | "archived" | "tools"
  setTab: (t: any) => void
}) {
  return (
    <div
      style={{
        background: "#1b1b1b",
        color: "#fff",
        padding: "32px 24px 0",
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" ,marginTop: 40}}>
        <h1 style={{ fontSize: 50, fontWeight: 700 }}>
          My learning
        </h1>

        {/* TABS */}
        <div
          style={{
            display: "flex",
            gap: 24,
            marginTop: 24,
            borderBottom: "1px solid #3e4143",
          }}
        >
          <Tab active={tab === "all"} onClick={() => setTab("all")}>
            All courses
          </Tab>

          <Tab
            active={tab === "wishlist"}
            onClick={() => setTab("wishlist")}
          >
            Wishlist
          </Tab>

          <Tab
            active={tab === "archived"}
            onClick={() => setTab("archived")}
          >
            Archived
          </Tab>

          <Tab
            active={tab === "tools"}
            onClick={() => setTab("tools")}
          >
            Learning tools
          </Tab>
        </div>
      </div>
    </div>
  )
}

function Tab({
  active,
  children,
  onClick,
}: {
  active?: boolean
  children: string
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      style={{
        background: "none",
        border: "none",
        padding: "12px 0",
        color: active ? "#fff" : "#d1d7dc",
        fontWeight: 600,
        borderBottom: active
          ? "2px solid #fff"
          : "2px solid transparent",
        cursor: "pointer",
      }}
    >
      {children}
    </button>
  )
}
