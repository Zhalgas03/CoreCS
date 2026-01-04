export default function CourseHowItWorks({
  steps,
}: {
  steps: string[]
}) {
  return (
    <section className="py-4">
      <h2 className="h4 fw-semibold mb-4">How the course works</h2>

      <div className="position-relative ps-4">
        <div
          className="position-absolute top-0 bottom-0 start-0"
          style={{ width: 2, background: "#e5e7eb" }}
        />

        {steps.map((step, idx) => (
          <div key={step} className="mb-4 d-flex gap-3">
            <div
              className="rounded-circle bg-success text-white fw-bold d-flex align-items-center justify-content-center"
              style={{ width: 28, height: 28 }}
            >
              {idx + 1}
            </div>
            <div>{step}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
