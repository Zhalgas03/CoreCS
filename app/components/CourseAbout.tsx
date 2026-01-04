import { Course } from "../lib/courses/types"

export default function CourseAbout({
  about,
}: {
  about: Course["about"]
}) {
  return (
    <section className="py-4">
      <h2 className="h4 fw-semibold mb-3">
        About the course
      </h2>

      <div style={{ maxWidth: 720 }}>
        {about.paragraphs.map((text, idx) => (
          <p
            key={idx}
            className="mb-3"
            style={{ lineHeight: 1.6 }}
          >
            {text}
          </p>
        ))}
      </div>
    </section>
  )
}
