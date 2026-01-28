// app/learn/[slug]/module/[moduleId]/page.tsx

import { notFound, redirect } from "next/navigation"
import { getModuleById } from "@/app/lib/learning/getModuleById"

interface Props {
  params: Promise<{
    slug: string
    moduleId: string
  }>
}

export default async function ModulePage({ params }: Props) {
  const { slug, moduleId } = await params

  const module = getModuleById(slug, moduleId)
  if (!module || module.lessons.length === 0) notFound()

  redirect(
    `/learn/${slug}/module/${moduleId}/lesson/${module.lessons[0]}`
  )
}
