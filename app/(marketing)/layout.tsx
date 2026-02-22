"use client"

import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import Leaderboard from "@/components/social/Leaderboard";
import { usePathname } from "next/navigation";

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  return (
    <div className="min-h-screen flex flex-col text-white selection:bg-red-600/30">
      <Navbar />
      <div className="flex flex-grow container mx-auto py-8 px-4 lg:px-0 gap-4"> {/* Adjusted flex container with gap */}
        <main className="flex-1 min-w-0 overflow-y-auto"> {/* Main content area - now independently scrollable */}
          {children}
        </main>
        {path !== "/operation-blue-freedom" && <aside className="w-1/4 p-4 hidden lg:block overflow-y-auto h-[calc(100vh-144px)] sticky top-29"> {/* Leaderboard sidebar with fixed height, independent scrolling, and sticky position */}
          <Leaderboard />
        </aside>}
      </div>
      <Footer />
    </div>
  );
}