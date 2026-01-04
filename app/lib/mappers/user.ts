import type { users as UserModel } from "@prisma/client"


export function mapUser(user: UserModel) {
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
