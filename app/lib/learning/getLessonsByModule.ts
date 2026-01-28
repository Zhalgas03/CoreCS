import { oopLessons } from "./oop/lessons"

export function getLessonsByModule(courseSlug: string, moduleId: string) {
  if (courseSlug === "oop") {
    return oopLessons.filter(l => l.moduleId === moduleId)
  }

  return []
}
