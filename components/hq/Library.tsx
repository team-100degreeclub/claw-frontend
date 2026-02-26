"use client";

import React from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Play, Clock, Info } from "lucide-react";
import { Button } from "@/components/ui/button";

// --- Mock Data ---
const TOP_MISSION_VIDEOS = [
  { id: "m1", title: "Good to see you, Ankit", duration: "02:15" },
  { id: "m2", title: "CLAW - Adventure", duration: "05:40" },
  { id: "m3", title: "Spirit Roads", duration: "08:12" },
  { id: "m4", title: "Empowering Corporate - CLAW", duration: "12:30" },
  { id: "m5", title: "Insignia", duration: "04:45" },
  { id: "m6", title: "Operation Blue Freedom", duration: "15:20" },
];

const BUILDER_VIDEOS = [
  { id: "b1", title: "Major Vivek Jacob", role: "Founder", duration: "10:30" },
  { id: "b2", title: "Raunak Laad", role: "Founder", duration: "08:15" },
  { id: "b3", title: "Tiju Lukose", role: "Tech Lead", duration: "09:45" },
];

export default function Library() {
  return (
    <div className="min-h-screen bg-black text-zinc-300 space-y-16 pb-24">
      
      {/* 1. Top Section: Mission Grid (No Category Text/Metadata) */}
      <section className="px-4 md:px-8 pt-8">
        <ScrollArea className="w-full whitespace-nowrap rounded-none border-none">
          <div className="flex w-max space-x-6 pb-6">
            {TOP_MISSION_VIDEOS.map((video) => (
              <div key={video.id} className="w-[320px] group cursor-pointer">
                <div className="relative aspect-video rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900 transition-all hover:border-zinc-600">
                   <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors z-10" />
                   <div className="absolute inset-0 flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-all transform scale-90 group-hover:scale-100">
                      <div className="h-12 w-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white">
                        <Play fill="currentColor" size={20} />
                      </div>
                   </div>
                   {/* Placeholder Content */}
                   <div className="w-full h-full bg-gradient-to-br from-zinc-800 to-zinc-950 flex items-center justify-center">
                     <span className="text-zinc-700 font-bold text-xl uppercase tracking-tighter">C.L.A.W</span>
                   </div>
                   {/* <div className="absolute bottom-3 right-3 z-30 bg-black/60 px-2 py-1 rounded text-[10px] font-medium text-white backdrop-blur-md tabular-nums">
                     {video.duration}
                   </div> */}
                </div>
                <p className="mt-3 text-sm font-medium text-zinc-300 group-hover:text-white transition-colors truncate">
                  {video.title}
                </p>
              </div>
            ))}
          </div>
          <ScrollBar orientation="horizontal" className="bg-zinc-900/50" />
        </ScrollArea>
      </section>

      {/* 2. Software Demo: Full Width Hero */}
      <section className="px-4 md:px-8">
        <div className="relative w-full rounded-[32px] overflow-hidden border border-zinc-800 bg-zinc-950 aspect-[21/9] group shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
          
          <div className="absolute inset-0 flex items-center justify-center z-20">
            <Button size="icon" className="h-20 w-20 rounded-full bg-white text-black hover:scale-110 transition-transform">
               <Play fill="currentColor" size={32} />
            </Button>
          </div>

          <div className="absolute bottom-10 left-10 z-20 space-y-2">
            <h2 className="text-3xl font-bold text-white tracking-tight">Software Demo</h2>
            {/* <p className="text-sm text-zinc-400 max-w-lg">
              Comprehensive walkthrough of the internal operational interface and intelligence systems.
            </p> */}
          </div>
          
          <div className="w-full h-full bg-zinc-900 flex items-center justify-center">
             <span className="text-zinc-800 font-bold text-8xl opacity-30">SYSTEM DEMO</span>
          </div>
        </div>
      </section>

      {/* 3. From the Builders: Categorized List */}
      <section className="px-4 md:px-8 space-y-8">
        <div className="flex items-center gap-3">
          <div className="w-1 h-5 bg-cyan-500 rounded-full" />
          <h3 className="text-base font-semibold text-white tracking-tight">From the Builders</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {BUILDER_VIDEOS.map((video) => (
            <div key={video.id} className="group space-y-4">
               <div className="relative aspect-video rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900 transition-all hover:border-zinc-600">
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors z-10" />
                  <div className="absolute inset-0 flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-all">
                    <Play fill="currentColor" size={24} className="text-white" />
                  </div>
                  <div className="w-full h-full bg-gradient-to-tr from-zinc-900 to-zinc-800" />
               </div>
               
               <div className="flex justify-between items-start pr-2">
                 <div className="space-y-1">
                   <h4 className="text-base font-bold text-zinc-100 group-hover:text-cyan-400 transition-colors">
                     {video.title}
                   </h4>
                   <p className="text-sm text-zinc-500 font-medium">
                     {video.role} 
                   </p>
                 </div>
                 {/* <div className="flex items-center gap-1.5 text-zinc-500 text-xs font-medium tabular-nums">
                    <Clock size={12} />
                    {video.duration}
                 </div> */}
               </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}