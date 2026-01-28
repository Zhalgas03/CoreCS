import { notFound } from "next/navigation"
import { LessonHero } from "@/app/components/learning/LessonHero"
import { LearningSidebar } from "@/app/components/learning/LearningSidebar"
import { getModuleById } from "@/app/lib/learning/getModuleById"
import { getLessonById } from "@/app/lib/learning/getLessonById"
import { getSidebarViewModel } from "@/app/lib/learning/getSidebarViewModel"

interface Props {
  children: React.ReactNode
  params: Promise<{
    slug: string
    moduleId: string
    lessonId?: string
  }>
}

export default async function ModuleLayout({ children, params }: Props) {
  const { slug, moduleId, lessonId } = await params

  const module = getModuleById(slug, moduleId)
  if (!module) notFound()

  const lesson = lessonId
    ? getLessonById(slug, lessonId)
    : null

  const sidebarModules = getSidebarViewModel(slug)

  return (
    <>
      {/* ✅ HERO ВЕРНУЛИ */}
      <LessonHero
        courseSlug={slug}
        moduleTitle={module.title}
        lessonTitle={lesson?.title ?? module.title}
        lessonSubtitle={lesson?.subtitle}
      />

      {/* КОНТЕНТ */}
      <div className="w-full bg-neutral-100">
        <div className="bg-white">
          <div className="mx-auto max-w-[1100px] px-8 py-10 grid grid-cols-[1fr_320px] gap-12">

            <main className="min-w-0 text-neutral-900">
              {children}
            </main>

            <aside className="bg-neutral-100">
              <div className="sticky top-10 p-6">
                <LearningSidebar
                  courseSlug={slug}
                  modules={sidebarModules}
                />
              </div>
            </aside>

          </div>
        </div>
      </div>
    </>
  )
}
