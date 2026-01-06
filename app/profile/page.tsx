import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import jwt from "jsonwebtoken"
import { prisma } from "@/app/lib/prisma"

import ProfileCard from "@/app/components/profile/ProfileCard"
import Achievements from "@/app/components/profile/Achievements"
import LearningActivity from "@/app/components/profile/LearningActivity"

type JwtPayload = {
  userId: number
}

export default async function ProfilePage() {
  /* ---------- AUTH ---------- */
  const cookieStore = await cookies()
  const token = cookieStore.get("token")?.value

  if (!token) {
    redirect("/login")
  }

  let payload: JwtPayload

  try {
    payload = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as JwtPayload
  } catch {
    redirect("/login")
  }

  /* ---------- LOAD USER ---------- */
  const user = await prisma.users.findUnique({
    where: { id: payload.userId },
    select: {
      username: true,
      avatar_url: true,
      aboutMe: true,
      created_at: true,
    },
  })

  if (!user) {
    redirect("/login")
  }

  /* ---------- RENDER ---------- */
  return (
    <div style={{ background: "#fff", padding: "72px 0" }}>
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "0 24px",
          display: "grid",
          gridTemplateColumns: "320px 1fr",
          gap: 32,
        }}
      >
        {/* LEFT */}
        <ProfileCard
          username={user.username}
          avatarUrl={user.avatar_url}
          aboutMe={user.aboutMe}
          createdAt={user.created_at.toISOString()}
        />

        {/* RIGHT */}
        <main>
          <Achievements />
          <LearningActivity />
        </main>
      </div>
    </div>
  )
}
