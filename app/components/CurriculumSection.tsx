"use client"

import { useState } from "react"
import { Course } from "../lib/courses/types"

export default function CurriculumSection({
  curriculum,
}: {
  curriculum: Course["curriculum"]
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section id="curriculum" className="py-4">
      <h2 className="h4 fw-semibold mb-3">
        Course curriculum
      </h2>

      <div className="border-top">
        {curriculum.map((module, index) => {
          const isOpen = openIndex === index

          return (
            <div key={module.title} className="border-bottom py-3">
              <button
                className="w-100 d-flex justify-content-between align-items-center bg-transparent border-0 p-0 text-start"
                onClick={() =>
                  setOpenIndex(isOpen ? null : index)
                }
              >
                <div>
                  <div
                    className="fw-semibold"
                    style={{ fontSize: "1.3rem", marginBottom: -3 }}
                  >
                    {module.title}
                  </div>

                  {module.focus && (
                    <div
                      className="text-muted"
                      style={{ fontSize: "0.85rem" }}
                    >
                      {module.focus}
                    </div>
                  )}
                </div>

                <span
                  style={{
                    transition: "transform 0.2s ease",
                    transform: isOpen ? "rotate(180deg)" : "rotate(0)",
                  }}
                >
                  ▾
                </span>
              </button>

              {isOpen && (
                <ul className="mt-3 ps-0">
                  {module.topics.map((topic, i) => (
                    <li key={i} className="mb-1 d-flex">
                      <span className="me-2 text-muted">
                        {i + 1}.
                      </span>
                      <span>{topic}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}
