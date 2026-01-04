import { Course } from "../lib/courses/types"
export default function CourseAudience({
  audience,
}: {
  audience: NonNullable<Course["targetAudience"]>
}) {
  return (
    <section className="py-4">
      <h2 className="h4 fw-semibold mb-3">Who this course is for</h2>
 
      <p>
        {audience.join(", ")}.
      </p>
    </section>
  )
}
