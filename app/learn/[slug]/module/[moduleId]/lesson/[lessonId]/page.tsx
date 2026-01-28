import { notFound } from "next/navigation"
import { LessonRenderer } from "@/app/components/learning/LessonRenderer"
import { getLessonsByModule } from "@/app/lib/learning/getLessonsByModule"

interface Props {
  params: Promise<{
    slug: string
    moduleId: string
    lessonId: string
  }>
}

export default async function LessonPage({ params }: Props) {
  const { slug, moduleId, lessonId } = await params

  const lessons = getLessonsByModule(slug, moduleId)
  const lesson = lessons.find(l => l.id === lessonId)

  if (!lesson) notFound()

  return (
    <div className="space-y-10">
      <LessonRenderer lesson={lesson} />

      <footer className="flex justify-between pt-10">
        <button className="text-neutral-400">← Назад</button>
        <button className="rounded bg-green-600 px-6 py-2 text-white">
          Далее →
        </button>
      </footer>
    </div>
  )
}
