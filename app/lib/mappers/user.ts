import type { users as UserModel } from "@prisma/client"


export type SafeUser = {
  id: number
  username: string
  email: string
  avatar_url: string | null
  aboutMe: string | null
  created_at: Date
  is_2fa_enabled: boolean
  role: string
  is_subscribed: boolean
}

export function mapUser(user: SafeUser) {
  return {
    id: user.id,
    username: user.username,
    email: user.email,
    avatarUrl: user.avatar_url,
    aboutMe: user.aboutMe,
    createdAt: user.created_at,
    is2FAEnabled: user.is_2fa_enabled,
    role: user.role,
    isSubscribed: user.is_subscribed,
  }
}