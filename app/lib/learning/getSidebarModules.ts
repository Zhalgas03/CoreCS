import { oopModules } from "./oop/modules"
import { oopLessons } from "./oop/lessons"

export function getSidebarModules(courseSlug: string) {
  if (courseSlug !== "oop") return []

  return oopModules.map((module, moduleIndex) => ({
    id: module.id,
    title: module.title,
    index: moduleIndex + 1,

    lessons: module.lessons
      .map((lessonId, lessonIndex) => {
        const lesson = oopLessons.find(l => l.id === lessonId)
        if (!lesson) return null

        return {
          id: lesson.id,
          title: lesson.title,
          shortTitle: lesson.shortTitle, 
          index: lessonIndex + 1,
        }
      })
      .filter(Boolean),
  }))
}
