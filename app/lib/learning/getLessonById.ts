import { oopLessons } from "./oop/lessons"

export function getLessonById(courseSlug: string, lessonId: string) {
  if (courseSlug === "oop") {
    return oopLessons.find(l => l.id === lessonId) ?? null
  }

  return null
}
