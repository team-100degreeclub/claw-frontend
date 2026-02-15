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
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="secondary" className="h-14 text-lg font-semibold bg-white/20 hover:bg-white/10 transition-all">
                Enter Profile Code
              </Button>
            </DialogTrigger>
            <DialogContent className="min-w-4xl max-w-5xl max-h-[95vh] overflow-y-auto bg-zinc-900 text-white border-zinc-800 p-8 md:p-12">
              <ProfileCodeDialog />
            </DialogContent>
          </Dialog>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="h-14 border-white/10 text-white backdrop-blur-md hover:bg-white/5">
                Join the Clan
              </Button>
            </DialogTrigger>
            <DialogContent className="min-w-4xl max-w-5xl max-h-[90vh] overflow-y-auto bg-zinc-900 text-white border-zinc-800 p-8 md:p-12">
               <JoinForm />
            </DialogContent>
          </Dialog>
        </div>

          <Link href="/hq/dashboard" className="mt-6">
              <Button variant="outline" className="w-72 h-14 border-white/10 text-white backdrop-blur-md hover:bg-white/5">
                View Dashboard
              </Button>
          </Link>
      </div>
    </main>
  );
}
