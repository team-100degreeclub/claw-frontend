"use client";

import { Button } from "@/components/ui/button";
import { HomeIcon, Moon, PlayCircle, Sun, User, CalendarCheck } from "lucide-react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { setTheme, theme } = useTheme();
  const router = useRouter();
  setTheme("dark")
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-zinc-800 bg-black/95 backdrop-blur">
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        {/* Brand Logo */}
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => router.push("/")}>
            <Button
              variant="link"
              className="ml-10 flex items-center border-0 hover:bg-zinc-600/30 hover:cursor-pointer gap-2 text-sm font-bold tracking-widest text-zinc-300 transition-colors hover:text-white px-4"
            >
              <HomeIcon className="h-4 w-4" />
            </Button>
          {/* <img
            src="https://pbs.twimg.com/profile_images/1221190646850965504/MyqCrr0y_400x400.jpg"
            alt="C.L.A.W. Logo"
            className="h-10 w-10 rounded-full"
          /> */}
          <h1 className="text-xl font-black tracking-tighter text-white">
            C.L.A.W.{"  "}
            <span className="ml-1">
              GLOBAL
            </span>
          </h1>
          
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          <Button
            variant="default"
            onClick={() => router.push("/corporate-events")}
            className="flex items-center border-0 bg-zinc-600/30 hover:bg-zinc-600/40 hover:cursor-pointer gap-2 text-sm font-bold tracking-widest text-zinc-300 transition-colors hover:text-white px-4"
          >
            Invite Us
          </Button>
          <Button
            variant="default"
            onClick={() => router.push("/operation-blue-freedom")}
            className="flex items-center border-0 bg-blue-600/60 hover:bg-blue-600/80 hover:cursor-pointer gap-2 text-sm font-bold tracking-widest text-zinc-300 transition-colors hover:text-white px-4"
          >
            Insignia
          </Button>
          {/* <Button
          variant="default"
            className="flex items-center border-0 bg-zinc-600/30 hover:bg-zinc-600/40 hover:cursor-pointer gap-2 text-sm font-bold tracking-widest text-zinc-300 transition-colors hover:text-white px-4"
          >
            The Team
          </Button> */}
          {/* <Button
            variant="default"
            className=" border-0 bg-zinc-600/30 font-bold tracking-widest text-white hover:bg-white hover:text-white hover:bg-zinc-600/40 hover:cursor-pointer"
          >
            <User className="mr-2 h-4 w-4" />
            Login
          </Button> */}
          <div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.push("/traveller/profile")}
              className="cursor-pointer hover:bg-white/60"
            >
              <User className="h-6 w-6 text-zinc-400" color="white"/>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.push("/bookings")}
              className="cursor-pointer hover:bg-white/60"
            >
              <CalendarCheck className="h-6 w-6 text-zinc-400" color="white"/>
            </Button>
          </div>

          {/* <Button
            variant="outline"
            size="icon"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          >
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button> */}
        </div>
      </div>
    </nav>
  );
}