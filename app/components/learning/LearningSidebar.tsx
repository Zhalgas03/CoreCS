import Link from "next/link"

interface SidebarLessonVM {
  id: string
  displayTitle: string
}

interface SidebarModuleVM {
  id: string
  displayTitle: string
  lessons: SidebarLessonVM[]
}

interface Props {
  courseSlug: string
  modules: SidebarModuleVM[]
}

export function LearningSidebar({ courseSlug, modules }: Props) {
  return (
    <div className="sticky top-24 space-y-6">
      <h3 className="text-sm font-semibold uppercase tracking-wide text-neutral-400">
        Содержание курса
      </h3>

      <div className="space-y-6">
        {modules.map(module => (
          <div key={module.id} className="space-y-2">
            <div className="text-sm font-medium text-neutral-300">
              {module.displayTitle}
            </div>

            <div className="space-y-1">
              {module.lessons.map(lesson => (
                <Link
                  key={lesson.id}
                  href={`/learn/${courseSlug}/module/${module.id}/lesson/${lesson.id}`}
                  className="
                    block rounded-md px-3 py-2 text-sm
                    text-neutral-400
                    hover:bg-neutral-800 hover:text-white
                    transition
                  "
                >
                  {lesson.displayTitle}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
