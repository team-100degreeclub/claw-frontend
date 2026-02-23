"use client";

import React, { useState } from "react";
import { PlayCircle, Award, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

// --- Types & Mock Data ---
interface Operator {
  id: string;
  name: string;
  highestBadge: string;
  avatar: string;
  achievement: string;
  timeAgo: string;
}

const RECENT_ACHIEVERS: Operator[] = [
  { id: "1", name: "Shraon Leme", highestBadge: "Soul of Steel", avatar: "https://i.pravatar.cc/150?u=1", achievement: "Completed Spirit Path", timeAgo: "2h ago" },
  { id: "2", name: "Vikram Singh", highestBadge: "Legend 1", avatar: "https://i.pravatar.cc/150?u=2", achievement: "Earned Land Master", timeAgo: "5h ago" },
  { id: "3", name: "Sarah Chen", highestBadge: "Marshal 4", avatar: "https://i.pravatar.cc/150?u=3", achievement: "Water Environment Clear", timeAgo: "1d ago" },
  { id: "4", name: "Robert P.", highestBadge: "Guardian 2", avatar: "https://i.pravatar.cc/150?u=4", achievement: "15+ Camps Verified", timeAgo: "2d ago" },
];

export default function InsigniaSpotlight() {
  // 1. State to manage which person is currently in the spotlight
  const [spotlight, setSpotlight] = useState<Operator>(RECENT_ACHIEVERS[0]);

  return (
    <div className="space-y-6 mb-12">
      
      {/* --- Main Spotlight Section --- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 bg-zinc-900/40 border border-zinc-800 rounded-sm overflow-hidden min-h-[320px]">
        
        {/* Left Part: Dynamic Badge & Status */}
        <div className="lg:col-span-5 p-10 flex flex-col justify-center items-center text-center border-b lg:border-b-0 lg:border-r border-zinc-800 relative bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent">
          <div className="relative mb-6">
            {/* Glow Effect */}
            <div className="absolute inset-0 bg-amber-500/20 blur-3xl rounded-full scale-150" />
            
            {/* Dynamic Badge Icon based on spotlight */}
            <div className="relative flex flex-col items-center">
              <img 
                src="https://cdn-icons-png.flaticon.com/512/8206/8206805.png" // Placeholder for Soul of Steel shield
                alt="Badge"
                className="w-28 h-28 drop-shadow-[0_0_15px_rgba(245,158,11,0.5)]"
              />
              <div className="mt-6 space-y-1">
                <h3 className="text-3xl font-bold text-white tracking-tight">
                    {spotlight.highestBadge}
                </h3>
                <p className="text-zinc-500 font-semibold text-sm">
                    {spotlight.name}
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-4 px-6 py-2 bg-zinc-950 border border-zinc-800 rounded-full flex items-center gap-2">
            <CheckCircle2 size={14} className="text-cyan-500" />
            <span className="text-[10px] font-bold text-zinc-400">Verified Professional</span>
          </div>
        </div>

        {/* Right Part: Cinematic Video Display */}
        <div className="lg:col-span-7 relative bg-zinc-950 flex items-center justify-center group cursor-pointer overflow-hidden">
          {/* Background Image / Video Thumbnail */}
          <div className="absolute inset-0 opacity-40 group-hover:opacity-60 transition-all duration-700 group-hover:scale-105">
            <img 
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop" 
              className="w-full h-full object-cover"
              alt="Recognition Ceremony"
            />
          </div>
          
          {/* Overlay Content */}
          <div className="relative z-10 flex flex-col items-center">
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-full border border-white/20 group-hover:scale-110 transition-transform duration-300">
               <PlayCircle size={56} className="text-white fill-white/10" />
            </div>
            {/* <div className="mt-6 text-center bg-black/60 p-4 rounded-sm">
                <p className="text-sm font-bold text-white/80 mb-1">Soul of Steel</p>
                <p className="text-xs text-zinc-500 font-medium">Click to view the full presentation</p>
            </div> */}
          </div>

          {/* Video Progress Bar UI (as seen in image) */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-zinc-800">
            <div className="h-full bg-red-600 w-1/3" />
          </div>
        </div>
      </div>

      {/* --- Shoutout / Recognition Section --- */}
      <div className="bg-zinc-900/40 border border-zinc-800 p-4 rounded-sm">
        <h4 className="text-xs font-bold text-zinc-600 mb-4 px-2 tracking-widest">
            Soul Of Steels 
        </h4>
        <div className="flex flex-wrap gap-4">
          {RECENT_ACHIEVERS.map((operator) => (
            <button
              key={operator.id}
              onClick={() => setSpotlight(operator)}
              className={cn(
                "flex items-center gap-3 p-3 rounded-sm border transition-all duration-300",
                spotlight.id === operator.id 
                  ? "bg-zinc-800 border-zinc-700 ring-1 ring-amber-500/30" 
                  : "bg-zinc-950/50 border-zinc-900 hover:border-zinc-700"
              )}
            >
              <div className="relative">
                <img 
                  src={operator.avatar} 
                  alt={operator.name} 
                  className="w-10 h-10 rounded-full grayscale hover:grayscale-0 transition-all"
                />
                {/* <div className="absolute -bottom-1 -right-1 bg-amber-500 rounded-full p-0.5 border-2 border-zinc-950">
                  <Award size={10} className="text-zinc-950" />
                </div> */}
              </div>
              <div className="text-left">
                <p className="text-[11px] font-bold text-zinc-200">{operator.name}</p>
                <p className="text-[10px] text-zinc-600">{operator.timeAgo}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}