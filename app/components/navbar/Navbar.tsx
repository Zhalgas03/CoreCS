import Link from "next/link"
import Image from "next/image"
import { cookies } from "next/headers"
import jwt from "jsonwebtoken"
import { prisma } from "@/app/lib/prisma"
import UserMenu from "./UserMenu"
import ExploreDropdown from "./ExploreDropdown"
import "./navbar.css"

type JwtPayload = {
  userId: number
}

export default async function Navbar() {
  const cookieStore = await cookies()
  const token = cookieStore.get("token")?.value

  let user: {
    username: string
    avatarUrl?: string | null
  } | null = null

  if (token) {
    try {
      const payload = jwt.verify(
        token,
        process.env.JWT_SECRET!
      ) as JwtPayload

      const dbUser = await prisma.users.findUnique({
        where: { id: payload.userId },
        select: {
          username: true,
          avatar_url: true,
        },
      })

      if (dbUser) {
        user = {
          username: dbUser.username,
          avatarUrl: dbUser.avatar_url,
        }
      }
    } catch {
      user = null
    }
  }

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark py-1"
      style={{
        backgroundColor: "#1b1b1b",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1030,
      }}
    >
      <div className="container-fluid px-4 d-flex align-items-center">
        {/* LEFT */}
        <div className="d-flex align-items-center gap-4">
          <Link
            href="/"
            className="navbar-brand d-flex align-items-center gap-2 mb-0"
          >
            <Image
              src="/logo.png"
              alt="CoreCS"
              width={120}
              height={120}
              priority
              style={{ height: 32, width: "auto" }}
            />
          </Link>
<div className="explore-wrapper">
  <span className="nav-hover fw-medium">Explore</span>
  <ExploreDropdown />
</div>
          <Link
            href="/my-learning"
            className="nav-hover text-decoration-none fw-medium"
          >
            My Learning
          </Link>
        </div>

        {/* RIGHT */}
        <div className="ms-auto d-flex align-items-center gap-2">
          {user ? (
            <UserMenu user={user} />
          ) : (
            <>
              <Link
                href="/login"
                className="nav-btn-outline rounded-2 px-3 py-1 text-decoration-none fw-medium"
              >
                Login
              </Link>

              <Link
                href="/register"
                className="nav-btn-outline rounded-2 px-3 py-1 text-decoration-none fw-medium"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
