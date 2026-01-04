"use client"

import { useEffect, useState } from "react"
import LearningTabs, { LearningTab } from "../components/LearningTabs"
import MyCourseCard from "../components/MyCourseCard"

type Course = {
  slug: string
  title: string
  progress: number
}

export default function MyLearningPage() {
  const [courses, setCourses] = useState<Course[]>([])
  const [tab, setTab] = useState<LearningTab>("all")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // 🔥 временно: все курсы in progress
    setCourses([
      { slug: "data-science", title: "Data Science", progress: 30 },
      { slug: "ml", title: "Machine Learning", progress: 45 },
      { slug: "sql", title: "SQL Basics", progress: 10 },
    ])
    setLoading(false)
  }, [])

  if (loading) return <div>Loading…</div>

  const filteredCourses = courses.filter(course => {
    if (tab === "completed") return course.progress === 100
    if (tab === "wishlist") return false // позже
    if (tab === "in-progress") return course.progress < 100
    return true
  })

  return (
    <main style={{ padding: 32, maxWidth: 900, margin: "0 auto" }}>
      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>
        My Learning
      </h1>

      <LearningTabs active={tab} onChange={setTab} />

      <div style={{ marginTop: 24 }}>
        {filteredCourses.length === 0 ? (
          <p style={{ color: "#6b7280" }}>
            No courses here yet
          </p>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
              gap: 16,
            }}
          >
            {filteredCourses.map(course => (
              <MyCourseCard key={course.slug} course={course} />
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
