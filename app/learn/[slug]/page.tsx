import { notFound, redirect } from "next/navigation"
import { getLearningCourseBySlug } from "@/app/lib/learning/getLearningCourseBySlug"

interface Props {
  params: Promise<{ slug: string }>
}

export default async function LearnCoursePage({ params }: Props) {
  const { slug } = await params

  const course = getLearningCourseBySlug(slug)
  if (!course) notFound()

  redirect(`/learn/${slug}/module/${course.firstModule}`)
}
