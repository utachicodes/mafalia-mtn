import type React from "react"
import type { Metadata } from "next"
import { DM_Sans, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const dmSans = DM_Sans({ subsets: ["latin"] })
const geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Mafalia Teranga Network",
  description: "La plateforme des partenaires commerciaux indépendants de Mafalia",
  icons: {
    icon: "/mafalia-logo.svg",
    shortcut: "/mafalia-logo.svg",
    apple: "/mafalia-logo.svg",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr">
      <body className={`${dmSans.className} antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
