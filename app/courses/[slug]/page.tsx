import { notFound } from "next/navigation"
import { getCourseBySlug } from "../../lib/courses/getCourseBySlug"

import CourseHero from "../../components/CourseHero"
import CourseSection from "../../components/CourseSection"
import CourseAbout from "../../components/CourseAbout"
import CurriculumSection from "../../components/CurriculumSection"
import CourseSidebar from "../../components/CourseSidebar"

import CourseWhyStudy from "../../components/CourseWhyStudy"
import CourseAudience from "../../components/CourseAudience"
import CourseHowItWorks from "../../components/CourseHowItWorks"

export default async function CoursePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const course = getCourseBySlug(slug)

  if (!course) return notFound()

  return (
    <main>
      {/* HERO — full width */}
      <CourseHero course={course} />

      {/* WHITE CONTENT */}
      <div className="bg-white text-dark">
        <div className="mx-auto px-4 py-3" style={{ maxWidth: 1100 }}>
          <div className="row g-5">

            {/* LEFT — MAIN CONTENT */}
            <div className="col-lg-8">

              {/* WHAT YOU WILL LEARN */}
              <CourseSection
                title="What you will learn"
                items={course.learningOutcomes}
              />

              {/* ABOUT */}
              <CourseAbout about={course.about} />

              {/* WHY STUDY */}
              {course.whyStudy && (
                <CourseWhyStudy
  title={course.catalog.title}
  whyStudy={course.whyStudy}
/>
              )}

              {/* TARGET AUDIENCE */}
              {course.targetAudience && (
                <CourseAudience audience={course.targetAudience} />
              )}

              {/* HOW IT WORKS */}
              {course.howItWorks && (
                <CourseHowItWorks steps={course.howItWorks} />
              )}

              {/* PREREQUISITES */}
              {course.prerequisites && (
                <CourseSection
                  title="Prerequisites"
                  items={course.prerequisites}
                />
              )}

              {/* CURRICULUM */}
              <CurriculumSection curriculum={course.curriculum} />
            </div>

            {/* RIGHT — SIDEBAR */}
            <div className="col-lg-4">
              <CourseSidebar course={course} />
            </div>

          </div>
        </div>
      </div>
    </main>
  )
}
