# Refactor Plan: Route Group Migration & Homepage Relocation

## Goal

Relocate the core application from `/camps` to the root `/`, and implement **Route Groups** to handle layout logic (Navbar/Footer) automatically based on the URL.

---

## 1. Directory Structure Changes

Organize your `app` folder into the following logical groups:

* **`(marketing)/`**: Move all content from `app/camps/` to `app/(marketing)/`. The file `app/camps/page.tsx` becomes **`app/(marketing)/page.tsx`**.
* **`(hq)/`**: Create this for the **`/hq`** endpoint.
* **`(auth)/`**: Move `app/login/` and `app/signup/` here.

---

## 2. The Global Skeleton

**File:** `app/layout.tsx`

**Action:** Strip all UI components. This file should only manage the HTML shell and global providers.

```tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Business Insights Platform",
  description: "C.L.A.W. HQ - Stakeholder Dashboard",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

```

---

## 3. The Main App Layout (with Navbar)

**File:** `app/(marketing)/layout.tsx`

**Action:** Apply this layout to the new Homepage and any other standard site pages.

```tsx
import Navbar from "@/components/layout/Navbar";
// import Footer from "@/components/layout/Footer"; 

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col text-white selection:bg-red-600/30">
      <Navbar />
      <main className="container mx-auto py-8 px-4 lg:px-0 flex-grow">
        {children}
      </main>
      {/* <Footer /> */}
    </div>
  );
}

```

---

## 4. The HQ "Command Center" Layout

**File:** `app/(hq)/layout.tsx`

**Action:** Create an immersive, full-screen environment for the insights section.

```tsx
export default function HQLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0D0D1F] text-white overflow-x-hidden">
      {/* No Navbar or Container padding here - full immersion */}
      {children}
    </div>
  );
}

```

---

## 5. Implementation of the HQ Landing Page

**File:** `app/(hq)/hq/page.tsx`

**Action:** Add the space-themed landing UI.

```tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HQLandingPage() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center">
      {/* Background Lighting */}
      <div className="pointer-events-none absolute inset-x-0 top-[-5%] flex justify-center">
        <div className="h-[400px] w-[600px] bg-orange-500/15 blur-[100px] rounded-full" />
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-[-20%] h-[50vh] bg-gradient-to-t from-indigo-950 via-purple-900/20 to-transparent blur-3xl rounded-[100%] scale-x-125" />

      {/* Hero Section */}
      <div className="relative z-10 flex flex-col items-center">
        <h1 className="text-7xl md:text-9xl font-bold uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-b from-white to-white/20">
          C.L.A.W. HQ
        </h1>
        <div className="mt-4 h-[1px] w-full max-w-2xl bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_12px_rgba(34,211,238,0.8)]" />

        <div className="mt-20 flex flex-col gap-5 w-72">
          <Button asChild variant="secondary" className="h-14 text-lg font-semibold hover:bg-white transition-all">
            <Link href="/hq/auth">Enter Profile Code</Link>
          </Button>
          <Button asChild variant="outline" className="h-14 border-white/10 text-white backdrop-blur-md hover:bg-white/5">
            <Link href="/hq/join">Join the Clan</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}

```

---

## 6. Final Cleanup

1. **Delete** `components/layout/NavbarWrapper.tsx`.
2. **Check** your `Navbar.tsx` for any hardcoded `/camps` links and update them to `/`.
