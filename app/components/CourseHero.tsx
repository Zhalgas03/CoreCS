import { Course } from "../lib/courses/types"
import Image from "next/image"

export default function CourseHero({ course }: { course: Course }) {
  return (
    <section
      className="text-white"
      style={{
        background: "#1b1b1b",
      }}
    >
      <div className="mx-auto px-4 py-5" style={{ maxWidth: 1100 }}>
        <div className="row align-items-center">
          
          {/* LEFT: TEXT */}
          <div className="col-md-8">
            <h1 className="display-5 fw-bold mb-3">
              {course.hero.title}
            </h1>

            <p className="fs-5 text-white-50 mb-3">
              {course.hero.tagline}
            </p>

            <p className="text-white-50 mb-4" style={{ maxWidth: 720 }}>
              {course.hero.description}
            </p>

            <div className="d-flex flex-wrap gap-2 text-white-50 small">
              <span>{course.level}</span>
              <span>•</span>
              <span>{course.hero.format}</span>
              {course.hero.bundle && (
                <>
                  <span>•</span>
                  <span>{course.hero.bundle}</span>
                </>
              )}
            </div>
          </div>

         {/* RIGHT: COURSE AVATAR */}
<div className="col-md-4 d-none d-md-flex justify-content-end ">
  <div
    className="rounded-3 overflow-hidden "
    style={{
      width: 140,
      height: 140,
      background: "rgba(255,255,255,0.08)",
      position: "relative",
      marginRight: 20,
    }}
  >
    <Image
      src={course.catalog.coverUrl}
      alt={course.catalog.title}
      fill
      sizes="140px"
      style={{ objectFit: "cover" }}
      priority
    />
  </div>
</div>


        </div>
      </div>
    </section>
  )
}
