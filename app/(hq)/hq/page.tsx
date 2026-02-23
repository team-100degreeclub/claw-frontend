import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import JoinForm from "@/components/hq/JoinTheClanForm";
import ProfileCodeDialog from "@/components/hq/ProfileCodeDialog";

export default function HQLandingPage() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#050505]">
      {/* 1. Cinematic Background Layer */}
      <div 
        className="absolute inset-0 z-0 opacity-40 mix-blend-luminosity"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=3540&auto=format&fit=crop')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      
      {/* 2. Texture & Gradient Overlays */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/0 via-black/60 to-black" />
      <div className="absolute inset-0 z-[2] opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      {/* 3. Refined Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-cyan-500/5 blur-[120px] rounded-full" />

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center px-4">
        <header className="flex flex-col items-center mb-16 space-y-2">
           {/* <span className="text-[10px] font-black uppercase tracking-[0.5em] text-cyan-500/80 mb-4 animate-pulse">
            Terminal Access Restricted
          </span> */}
          <h1 className="text-6xl md:text-8xl font-light tracking-[0.2em] text-white/90 uppercase text-center">
            CLAW<span className="font-black text-white block">Headquarters</span>
          </h1>
          {/* <p className="text-zinc-500 text-sm md:text-base font-medium tracking-wide max-w-md text-center">
            Global Special Forces Collaborative Hub. <br/>
            Enter your credentials to synchronize.
          </p> */}
        </header>

        {/* Action Grid */}
        <div className="flex flex-col gap-4 w-full max-w-sm">
          <Dialog>
            <DialogTrigger asChild>
              <button className="group relative w-[full] h-16 bg-white/5 hover:bg-white/10 border border-white/10 rounded-sm transition-all duration-300 backdrop-blur-md overflow-hidden">
                {/* <div className="absolute inset-0 w-1 bg-cyan-500 -translate-x-full group-hover:translate-x-0 transition-transform duration-300  " /> */}
                <span className="text-sm font-bold text-white hover:cursor-pointer">Enter Profile Code</span>
              </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] bg-zinc-950/95 border-zinc-800 backdrop-blur-2xl p-0">
              <ProfileCodeDialog />
            </DialogContent>
          </Dialog>

          <div className="grid grid-cols-2 gap-4">
            <Dialog>
              <DialogTrigger asChild>
                <Button 
                  variant="outline" 
                  className="h-14 border-white/5 bg-white/5 hover:bg-white/10 text-white text-sm rounded-sm"
                >
                  Join the Clan
                </Button>
              </DialogTrigger>
              <DialogContent className="min-w-4xl max-w-5xl max-h-[90vh] overflow-y-auto bg-zinc-950 text-white border-zinc-800 p-8 md:p-12">
                 <JoinForm />
              </DialogContent>
            </Dialog>

            <Link href="/hq/dashboard">
              <Button 
                variant="ghost" 
                className="w-full h-14 text-zinc-500 hover:text-white hover:bg-transparent border border-transparent hover:border-white/10 text-sm font-bold  rounded-sm transition-all"
              >
                View Demo
              </Button>
            </Link>
          </div>
        </div>

        {/* Footer Meta */}
        {/* <footer className="mt-24 flex flex-col items-center space-y-4">
          <div className="h-12 w-[1px] bg-gradient-to-b from-cyan-500/50 to-transparent" />
          <div className="flex gap-8">
            <div className="flex flex-col items-center">
              <span className="text-[10px] text-zinc-600 uppercase font-bold">Latency</span>
              <span className="text-xs text-zinc-400 font-mono">12ms</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-[10px] text-zinc-600 uppercase font-bold">Node</span>
              <span className="text-xs text-zinc-400 font-mono">HQ-DXB-01</span>
            </div>
          </div>
        </footer> */}
      </div>
    </main>
  );
}