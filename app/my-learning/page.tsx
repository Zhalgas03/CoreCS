import { cookies } from "next/headers"
import jwt from "jsonwebtoken"
import { prisma } from "@/app/lib/prisma"
import { courses } from "@/app/lib/courses"
import MyLearningClient from "./MyLearningClient"


export default async function MyLearningPage() {
  
  const cookieStore = await cookies()
  const token = cookieStore.get("token")?.value

  if (!token) {
    return (
      <main style={{ padding: 32 }}>
        <h1>My Learning</h1>
        <p>You need to log in</p>
      </main>
    )
  }

  let userId: number | null = null

  try {
    const payload: any = jwt.verify(token, process.env.JWT_SECRET!)
    userId = payload.userId
  } catch {
    userId = null
  }

  if (!userId) {
    return (
      <main style={{ padding: 32 }}>
        <h1>My Learning</h1>
        <p>Invalid session</p>
      </main>
    )
  }

  // 📦 купленные курсы
  const owned = await prisma.user_courses.findMany({
    where: { user_id: userId },
    select: { course_slug: true },
  })

  // ❤️ wishlist
  const wishlist = await prisma.user_wishlist.findMany({
    where: { user_id: userId },
    select: { course_slug: true },
  })

  const ownedSlugs = owned.map(c => c.course_slug)
  const wishlistSlugs = wishlist.map(w => w.course_slug)

  const ownedCourses = courses
    .filter(c => ownedSlugs.includes(c.slug))
    .map(c => ({
      slug: c.slug,
      title: c.catalog.title,
      progress: 0, // TODO: реальный прогресс позже
    }))

  const wishlistCourses = courses
    .filter(c => wishlistSlugs.includes(c.slug))
    .map(c => ({
      slug: c.slug,
      title: c.catalog.title,
      progress: 0,
    }))

  return (
    <MyLearningClient
      ownedCourses={ownedCourses}
      wishlistCourses={wishlistCourses}
    />
  )
}
