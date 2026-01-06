"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

import MyLearningHero from "./MyLearningHero"
import CourseCard from "../components/CourseCard"
import { courses } from "@/app/lib/courses"

type Course = {
  slug: string
  title: string
  progress: number
}

export default function MyLearningClient({
  ownedCourses,
  wishlistCourses,
}: {
  ownedCourses: Course[]
  wishlistCourses: Course[]
}) {
  const router = useRouter()

  const [tab, setTab] = useState<
    "all" | "wishlist" | "archived" | "tools"
  >("all")

  return (
    <>
      <MyLearningHero tab={tab} setTab={setTab} />

      <main
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "32px 0px",
        }}
      >
        {/* ================= ALL / OWNED ================= */}
        {tab === "all" && (
  <>
    {ownedCourses.length === 0 ? (
      <p>No courses yet</p>
    ) : (
      <div className="row g-4">
        {ownedCourses.map(course => {
          const fullCourse = courses.find(
            c => c.slug === course.slug
          )

          if (!fullCourse) return null

          return (
            <div key={course.slug} className="col-md-4">
              <div className="border rounded-3 p-3 h-100 d-flex flex-column">
                
                {/* TOP: ICON + TITLE */}
                <div className="d-flex gap-3 mb-3">
                  {/* MINI COVER */}
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: 8,
                      background: "#f3f4f6",
                      overflow: "hidden",
                      flexShrink: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {fullCourse.catalog.coverUrl ? (
                      <img
                        src={fullCourse.catalog.coverUrl}
                        alt={fullCourse.catalog.title}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    ) : (
                      <span>📘</span>
                    )}
                  </div>

                  <div>
                    <div className="fw-semibold">
                      {course.title}
                    </div>
                    <div className="text-muted small">
                      {fullCourse.catalog.author}
                    </div>
                  </div>
                </div>

                {/* PROGRESS */}
                <div className="mb-3">
                  <div
                    style={{
                      height: 6,
                      background: "#e5e7eb",
                      borderRadius: 4,
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        width: `${course.progress}%`,
                        height: "100%",
                        background: "#2563eb",
                      }}
                    />
                  </div>
                  <div className="text-muted small mt-1">
                    {course.progress}% completed
                  </div>
                </div>
{/* ACTION */}
<button
  className="learning-action-btn mt-auto align-self-start"
  onClick={() =>
    router.push(`/courses/${course.slug}`)
  }
>
  {course.progress === 0
    ? "Start course"
    : "Continue learning"}
</button>


              </div>
            </div>
          )
        })}
      </div>
    )}
  </>
)}


        {/* ================= WISHLIST ================= */}
        {tab === "wishlist" && (
          <>
            {wishlistCourses.length === 0 ? (
              <p>Wishlist is empty</p>
            ) : (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "repeat(auto-fill, minmax(260px, 1fr))",
                  gap: 30,
                }}
              >
                {wishlistCourses.map(item => {
                  const course = courses.find(
                    c => c.slug === item.slug
                  )
                  if (!course) return null

                  return (
                    <CourseCard
                      key={course.slug}
                      title={course.catalog.title}
                      author={course.catalog.author}
                      tagline={course.hero.tagline}
                      coverUrl={course.catalog.coverUrl}
                      rating={course.catalog.rating}
                      reviewsCount={course.catalog.reviewsCount}
                      durationHours={course.catalog.durationHours}
                      price={course.pricing.price}
                      currency={course.pricing.currency}
                      onClick={() =>
                        router.push(`/courses/${course.slug}`)
                      }
                    />
                  )
                })}
              </div>
            )}
          </>
        )}
      </main>
    </>
  )
}
