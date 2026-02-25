import { Toaster } from "sonner";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Inter } from 'next/font/google'

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "C.L.A.W",
  description: "C.L.A.W. HQ - Stakeholder Dashboard",
};

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter', // Define a CSS variable
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <link rel="preconnect" href="https://fonts.googleapis.com" precedence="default"/>
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" precedence="default"/>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap" rel="stylesheet" precedence="default"/>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black`}>

        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
