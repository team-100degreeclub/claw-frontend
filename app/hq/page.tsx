import Link from "next/link";
import { Button } from "@/components/ui/button"; // Adjust import path based on your setup

export default function HQLandingPage() {
  return (
    // Main container: Dark background, fills screen, centered content, hidden overflow for background effects
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#0D0D1F] text-white">

      {/* --- Background Effects Area --- */}

      {/* 1. The distant "Sun" glow at the top center */}
      <div className="pointer-events-none absolute inset-x-0 top-[-10%] flex justify-center">
        <div className="h-[500px] w-[500px] bg-orange-500/30 blur-[120px] rounded-full mix-blend-screen"></div>
      </div>

      {/* 2. The "Planet" curve glow at the bottom */}
      <div className="pointer-events-none absolute inset-x-0 bottom-[-30%] h-[60vh] bg-gradient-to-t from-purple-900/80 via-indigo-900/50 to-transparent blur-3xl rounded-[100%] transform scale-x-150"></div>

      {/* 3. Subtle noise texture overlay (optional, adds realism) */}
      <div className="pointer-events-none absolute inset-0 bg-[url('/noise.svg')] opacity-5 mix-blend-soft-light"></div>


      {/* --- Content Area (Z-index to sit above background) --- */}
      <div className="relative z-10 flex flex-col items-center text-center">

        {/* Main Title Group */}
        <div className="mb-16 flex flex-col items-center">
          {/* The large text with gradient and transparency effect */}
          <h1 className="text-6xl md:text-8xl font-bold uppercase tracking-[0.2em] text-transparent bg-clip-text bg-gradient-to-b from-white/90 to-white/40 drop-shadow-2xl">
            C.L.A.W. HQ
          </h1>

          {/* The glowing blue line underneath */}
          <div className="mt-2 h-[2px] w-full max-w-3xl bg-gradient-to-r from-transparent via-blue-500 to-transparent shadow-[0_0_15px_2px_rgba(59,130,246,0.6)]"></div>
        </div>


        {/* Action Buttons Group */}
        <div className="flex flex-col gap-4 min-w-[250px]">
          {/* We use the Shadcn Button, customized for the dark theme */}
          <Button
            asChild
            variant="secondary"
            className="bg-white/90 text-black hover:bg-white/100 h-12 text-md font-medium transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]"
          >
            <Link href="/hq/login">
              Enter Your Profile Code
            </Link>
          </Button>

          <Button
            asChild
            variant="outline"
            className="border-white/20 text-white hover:bg-white/10 h-12 text-md font-medium backdrop-blur-sm transition-all duration-300 hover:scale-105"
          >
            <Link href="/hq/register">
              Request Access
            </Link>
          </Button>
        </div>

      </div>

      {/* Simple Footer for Admin context */}
      <div className="absolute bottom-8 text-xs text-slate-500">
        Business Insights Division &copy; {new Date().getFullYear()}
      </div>
    </main>
  );
}