import { courses } from "."

export function getCourseBySlug(slug: string) {
  return courses.find(course => course.slug === slug)
}