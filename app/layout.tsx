import "./lib/fontawesome"
import { Inter } from "next/font/google"
import "./globals.css"
import "bootstrap/dist/css/bootstrap.min.css"

import Navbar from "@/app/components/navbar/Navbar"
import ClientProviders from "./providers"

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
})

const NAVBAR_HEIGHT = 50

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <ClientProviders>
          <Navbar />
          <main style={{ paddingTop: NAVBAR_HEIGHT, minHeight: "100vh" }}>
            {children}
          </main>
        </ClientProviders>
      </body>
    </html>
  )
}
