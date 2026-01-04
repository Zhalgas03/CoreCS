import { Course } from "../lib/courses/types"

export default function CourseWhyStudy({
  title,
  whyStudy,
}: {
  title: string
  whyStudy: NonNullable<Course["whyStudy"]>
}) {
  return (
    <section className="py-4">
      <h2 className="h4 fw-semibold mb-3">
        Why study {title}
      </h2>

      <p className="text-secondary mb-3">
        {whyStudy.intro}
      </p>

      <ul className="list-unstyled">
        {whyStudy.benefits.map(item => (
          <li key={item} className="mb-2 d-flex align-items-start">
            <span className="text-success me-2">✓</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}
