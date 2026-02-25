"use client";

import React, { useState } from "react";
import { PlayCircle, ShieldCheck, MapPin, Star } from "lucide-react";
import { cn } from "@/lib/utils";

// --- Data Configuration ---
interface Achiever {
  id: string;
  name: string;
  location: string;
  highestBadge: string;
  avatar: string;
  achievement: string;
  date: string;
}

const SOUL_OF_STEEL_ACHIEVERS: Achiever[] = [
  { 
    id: "1", 
    name: "Sharon Leme", 
    location: "Goa, India", 
    highestBadge: "Soul of Steel", 
    avatar: "https://i.pravatar.cc/150?u=1", 
    achievement: "Completed Spirit Path", 
    date: "Feb 2026" 
  },
  { 
    id: "2", 
    name: "Vikram Singh", 
    location: "Dehradun, India", 
    highestBadge: "Soul of Steel", 
    avatar: "https://i.pravatar.cc/150?u=2", 
    achievement: "Environmental Impact Lead", 
    date: "Dec 2025" 
  },
  { 
    id: "3", 
    name: "Sarah Chen", 
    location: "Singapore", 
    highestBadge: "Soul of Steel", 
    avatar: "https://i.pravatar.cc/150?u=3", 
    achievement: "Water Excellence Clear", 
    date: "Oct 2025" 
  },
];

export default function InsigniaSpotlight() {
  const [spotlight, setSpotlight] = useState<Achiever>(SOUL_OF_STEEL_ACHIEVERS[0]);

  return (
    <div className="space-y-6 mb-12 font-sans">
      
      {/* --- Main Spotlight Section --- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 bg-zinc-950 border border-zinc-900 rounded-none overflow-hidden min-h-[350px]">
        
        {/* Left Part: Badge & Profile Focus */}
        <div className="lg:col-span-5 p-12 flex flex-col justify-center items-center text-center border-b lg:border-b-0 lg:border-r border-zinc-900 relative bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-600/5 via-transparent to-transparent">
          <div className="relative mb-8">
            {/* Ambient Blue Glow */}
            <div className="absolute inset-0 bg-blue-600/10 blur-3xl rounded-full scale-150" />
            
            <div className="relative flex flex-col items-center">
              <img 
                src="/badge.png" 
                alt="Soul of Steel"
                className="w-32 h-32 drop-shadow-[0_0_20px_rgba(37,99,235,0.4)] object-contain"
              />
              <div className="mt-8 space-y-2">
                <h3 className="text-3xl font-black text-white leading-none">
                    {spotlight.highestBadge}
                </h3>
                <div className="flex flex-col items-center gap-1">
                   <p className="text-blue-500 font-bold text-2xl ">
                       {spotlight.name}
                   </p>
                   <div className="flex items-center gap-1 text-white text-sm font-bold">
                     {/* <MapPin size={10} className="text-blue-600" />  */}
                     {spotlight.location}
                   </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* <div className="mt-4 px-6 py-2 bg-zinc-900 border border-zinc-800 rounded-none flex items-center gap-2">
            <ShieldCheck size={14} className="text-blue-500" />
            <span className="text-[10px] font-bold text-zinc-400  tracking-widest">Authenticated Achievement</span>
          </div> */}
        </div>

        {/* Right Part: Cinematic Presentation */}
        <div className="lg:col-span-7 relative bg-zinc-950 flex items-center justify-center group cursor-pointer overflow-hidden">
          <div className="absolute inset-0 opacity-30 group-hover:opacity-50 transition-all duration-1000 group-hover:scale-105">
            <img 
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop" 
              className="w-full h-full object-cover grayscale"
              alt="Recognition Presentation"
            />
          </div>
          
          <div className="relative z-10 flex flex-col items-center">
            <div className="bg-black/40 backdrop-blur-sm p-5 rounded-none border border-white/10 group-hover:border-blue-500/50 transition-all duration-300">
               <PlayCircle size={48} className="text-white group-hover:text-blue-500 transition-colors" />
            </div>
            <p className="mt-6 text-[10px] font-bold text-zinc-500">View Presentation</p>
          </div>

          {/* Minimalist Progress UI */}
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-zinc-900">
            <div className="h-full bg-blue-600 w-1/4" />
          </div>
        </div>
      </div>

      {/* --- Hall of Fame Selectors --- */}
      <div className="bg-zinc-950 border border-zinc-900 p-6 rounded-none">
        <div className="flex items-center gap-2 mb-6 px-2">
          {/* <Star size={12} className="text-blue-600" /> */}
          <h4 className="text-sm font-bold text-white">
              Soul of Steel Recipients
          </h4>
        </div>
        <div className="flex flex-wrap gap-4">
          {SOUL_OF_STEEL_ACHIEVERS.map((operator) => (
            <button
              key={operator.id}
              onClick={() => setSpotlight(operator)}
              className={cn(
                "flex items-center gap-4 p-4 rounded-xl border transition-all duration-300 min-w-[200px]",
                spotlight.id === operator.id 
                  ? "bg-zinc-900 border-blue-900/50" 
                  : "bg-black border-zinc-900 hover:border-zinc-700"
              )}
            >
              <div className="relative">
                <img 
                  src={operator.avatar} 
                  alt={operator.name} 
                  className={cn(
                    "w-10 h-10 rounded-full transition-all object-cover",
                    spotlight.id === operator.id ? "grayscale-0" : "grayscale"
                  )}
                />
              </div>
              <div className="text-left space-y-1">
                <p className="text-sm font-bold text-white ">{operator.name}</p>
                <p className="text-xs text-white">{operator.date}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}