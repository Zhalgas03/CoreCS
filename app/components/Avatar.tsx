"use client"

type AvatarProps = {
  username: string
  imageUrl?: string | null
  size?: number
}

export default function Avatar({
  username,
  imageUrl,
  size = 40,
}: AvatarProps) {
  const letter = username.charAt(0).toUpperCase()

  if (imageUrl) {
    return (
      <img
        src={imageUrl}
        alt={username}
        width={size}
        height={size}
        className="object-fit-cover"
        style={{
          borderRadius: 10, 
        }}
      />
    )
  }

  return (
    <div
      className="d-flex align-items-center justify-content-center text-white fw-semibold"
      style={{
        width: size,
        height: size,
        backgroundColor: "#0d6efd",
        fontSize: size / 2,
        borderRadius: 10,
      }}
    >

      {letter}
    </div>
  )
}
