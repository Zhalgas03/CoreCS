export default function LearnRootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-900 text-white">
      {children}
    </div>
  )
}
