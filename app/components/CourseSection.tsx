export default function CourseSection({
  title,
  items,
}: {
  title: string
  items: string[]
}) {
  return (
    <section className="py-4">

      <h2 className="h4 fw-semibold mb-3">
        {title}
      </h2>

 
      <ul className="list-unstyled">
        {items.map(item => (
          <li
            key={item}
            className="d-flex align-items-start mb-2"
          >
            <span
              className="me-2 text-success fw-bold"
              style={{ lineHeight: "1.4" }}
            >
              ✓
            </span>

            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}
