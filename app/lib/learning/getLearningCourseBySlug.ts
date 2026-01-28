import { learningCourses } from "./index"

export function getLearningCourseBySlug(slug: string) {
  return learningCourses.find(c => c.slug === slug)
}
