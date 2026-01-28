import { getSidebarModules } from "./getSidebarModules"
import { oopLessons } from "./oop/lessons"

const MAX_TITLE_LENGTH = 28

function shorten(text: string, max = MAX_TITLE_LENGTH) {
  if (text.length <= max) return text
  return text.slice(0, max).trimEnd() + "…"
}

export function getSidebarViewModel(courseSlug: string) {
  const modules = getSidebarModules(courseSlug)

  return modules.map(module => ({
    id: module.id,
    index: module.index,

    // модуль — всегда короткий
    displayTitle: `${module.index}. ${shorten(module.title, 28)}`,

    lessons: module.lessons.map(lesson => {
      const fullLesson = oopLessons.find(l => l.id === lesson.id)

      const short =
        fullLesson?.shortTitle ??
        shorten(lesson.title, 28)

      return {
        id: lesson.id,
        index: lesson.index,

        displayTitle: `${module.index}.${lesson.index} ${short}`,

        // для HERO / других мест
        title: lesson.title,
        subtitle: fullLesson?.subtitle ?? "",
      }
    }),
  }))
}
