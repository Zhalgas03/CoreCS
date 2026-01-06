"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { courses } from "@/app/lib/courses"

type Category =
  | "all"
  | "trending"
  | "math"
  | "programming"
  | "data-science"
  | "systems"

export default function ExploreDropdown() {
  const [activeCategory, setActiveCategory] =
    useState<Category | null>(null)

const visibleCourses = useMemo(() => {
  if (!activeCategory) return []

  // ALL — все курсы
  if (activeCategory === "all") {
    return courses
  }

  // TRENDING — рандомная половина
  if (activeCategory === "trending") {
    const shuffled = [...courses].sort(
      () => Math.random() - 0.5
    )

    return shuffled.slice(
      0,
      Math.ceil(shuffled.length / 2)
    )
  }

  // CATEGORY
  return courses.filter(
    course => course.category === activeCategory
  )
}, [activeCategory])


  return (
    <div
      className="explore-dropdown"
      onMouseLeave={() => setActiveCategory(null)}
    >
     {/* LEFT */}
<div className="explore-left">
  <p className="explore-title">Explore by goal</p>

  {/* ALL */}
  <span
    className={`explore-item has-arrow ${
      activeCategory === "all" ? "active" : ""
    }`}
    onMouseEnter={() => setActiveCategory("all")}
  >
    <span>All courses</span>
    <span className="arrow">›</span>
  </span>

  {/* TRENDING */}
  <span
    className={`explore-item has-arrow ${
      activeCategory === "trending" ? "active" : ""
    }`}
    onMouseEnter={() => setActiveCategory("trending")}
  >
    <span>Trending</span>
    <span className="arrow">›</span>
  </span>

  <div className="explore-separator" />

  {/* MATH */}
  <span
    className={`explore-item has-arrow ${
      activeCategory === "math" ? "active" : ""
    }`}
    onMouseEnter={() => setActiveCategory("math")}
  >
    <span>Mathematics</span>
    <span className="arrow">›</span>
  </span>

  {/* PROGRAMMING */}
  <span
    className={`explore-item has-arrow ${
      activeCategory === "programming" ? "active" : ""
    }`}
    onMouseEnter={() => setActiveCategory("programming")}
  >
    <span>Programming</span>
    <span className="arrow">›</span>
  </span>

  {/* DATA SCIENCE */}
  <span
    className={`explore-item has-arrow ${
      activeCategory === "data-science" ? "active" : ""
    }`}
    onMouseEnter={() => setActiveCategory("data-science")}
  >
    <span>Data Science</span>
    <span className="arrow">›</span>
  </span>

  {/* SYSTEMS */}
  <span
    className={`explore-item has-arrow ${
      activeCategory === "systems" ? "active" : ""
    }`}
    onMouseEnter={() => setActiveCategory("systems")}
  >
    <span>Systems</span>
    <span className="arrow">›</span>
  </span>
</div>


      {/* RIGHT */}
      {activeCategory && (
        <div className="explore-right">
          {visibleCourses.map(course => (
            <Link
              key={course.slug}
              href={`/courses/${course.slug}`}
              className="explore-item"
            >
              {course.catalog.title}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
