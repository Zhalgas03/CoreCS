"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

import SearchBar from "./components/SearchBar"
import CourseCard from "./components/CourseCard"
import CategoryTabs from "./components/CategoryTabs"
import { courses } from "./lib/courses"

type CategoryKey =
  | "all"
  | "math"
  | "programming"
  | "data-science"
  | "systems"

export default function Home() {
  const router = useRouter()

  const [query, setQuery] = useState("")
  const [onlyFree, setOnlyFree] = useState(false)
  const [category, setCategory] = useState<CategoryKey>("all")

  const baseFiltered = courses.filter(course => {
  const matchesQuery = course.catalog.title
    .toLowerCase()
    .includes(query.toLowerCase())

  const matchesFree = onlyFree
    ? course.pricing.price === 0
    : true

  return matchesQuery && matchesFree
})

const filteredCourses =
  category === "all"
    ? baseFiltered.slice(0, Math.ceil(baseFiltered.length / 2))
    : baseFiltered.filter(course => course.category === category)


  return (
    <main style={{ background: "#fff" }}>
      <div
        style={{
          padding: "32px 24px",
          maxWidth: 1100,
          margin: "0 auto",
        }}
      >
        <SearchBar
          query={query}
          isFree={onlyFree}
          onQueryChange={setQuery}
          onFreeChange={setOnlyFree}
        />

        {/* TITLE */}
        <h1
          style={{
            fontSize: 35,
            fontWeight: 600,
            marginTop: 24,
            color: "#111827",
          }}
        >
          Online courses
        </h1>

        {/* CATEGORIES */}
        <CategoryTabs
          active={category}
          onChange={setCategory}
        />

        {/* COURSES */}
        <div
          style={{
            marginTop: 32,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: 20,
          }}
        >
          {filteredCourses.map(course => (
            <CourseCard
              key={course.slug}
              title={course.catalog.title}
              tagline={course.hero.tagline}
              coverUrl={course.catalog.coverUrl}
              price={course.pricing.price}
              currency={course.pricing.currency}
              onClick={() =>
                router.push(`/courses/${course.slug}`)
              }
            />
          ))}

          {filteredCourses.length === 0 && (
            <div style={{ color: "#666" }}>
              Nothing found
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
