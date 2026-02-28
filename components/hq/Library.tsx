"use client";

import React, { useState } from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Play, Clock, Info } from "lucide-react";
import { Button } from "@/components/ui/button";

// --- Mock Data ---
const TOP_MISSION_VIDEOS = [
  { id: "m1", title: "Good to see you, Ankit", duration: "02:15", video_url: "/library_dummy.mp4" },
  { id: "m2", title: "CLAW - Adventure", duration: "05:40", video_url: "/library_dummy.mp4" },
  { id: "m3", title: "Spirit Roads", duration: "08:12", video_url: "/library_dummy.mp4" },
  { id: "m4", title: "Empowering corporate - CLAW", duration: "12:30", video_url: "/library_dummy.mp4" },
  { id: "m5", title: "Insignia", duration: "04:45", video_url: "/library_dummy.mp4" },
  { id: "m6", title: "Operation Blue Freedom", duration: "15:20", video_url: "/library_dummy.mp4" },
];

const BUILDER_VIDEOS = [
  { id: "b1", title: "Major Vivek Jacob", role: "Founder", duration: "10:30", video_url: "/library_dummy.mp4" },
  { id: "b2", title: "Raunak Laad", role: "Co-Founder", duration: "08:15", video_url: "/library_dummy.mp4" },
  { id: "b3", title: "Tiju Lukose", role: "Tech Lead", duration: "09:45", video_url: "/library_dummy.mp4" },
  { id: "b4", title: "Tiju Lukose", role: "Tech Lead", duration: "09:45", video_url: "/library_dummy.mp4" },
];

export default function Library() {
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);
  return (
    <div className="min-h-screen bg-black text-zinc-300 space-y-16 pb-24">

      {/* 1. Top Section: Mission Grid (No Category Text/Metadata) */}
      <section className="px-4 md:px-8 pt-8 scrollbar-thin">
        <div className="w-full overflow-x-auto scrollbar-thin pb-4">
          <div className="flex w-max space-x-6 pb-2">
            {TOP_MISSION_VIDEOS.map((video) => {
              const isActive = activeVideoId === video.id;

              return (
                <div
                  key={video.id}
                  className="w-[320px] group cursor-pointer"
                  onClick={() => setActiveVideoId(video.id)}
                >
                  <div className="relative aspect-video rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900 transition-all hover:border-zinc-600">
                    <video
                      src={video.video_url}
                      controls
                      className="w-full h-full object-cover"
                    />
                    {/* {isActive ? (
                    <video
                      src={video.video_url}
                      autoPlay
                      controls
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <>
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors z-10" />
                      
                      <div className="absolute inset-0 flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-all transform scale-90 group-hover:scale-100">
                        <div className="h-12 w-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white">
                          <Play fill="currentColor" size={20} />
                        </div>
                      </div>

                      <div className="w-full h-full bg-gradient-to-br from-zinc-800 to-zinc-950 flex items-center justify-center">
                        <span className="text-zinc-700 font-bold text-xl uppercase tracking-tighter">
                          C.L.A.W
                        </span>
                      </div>
                    </>
                  )} */}
                  </div>

                  <p className="mt-3 text-sm font-medium text-zinc-300 group-hover:text-white transition-colors truncate">
                    {video.title}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 2. Software Demo: Full Width Hero */}
      <section className="pb-4 md:px-8">
        <div className="space-y-2 mb-2">
            <h2 className="text-3xl font-bold text-white tracking-tight">Software Demo</h2>
            {/* <p className="text-sm text-zinc-400 max-w-lg">
              Comprehensive walkthrough of the internal operational interface and intelligence systems.
            </p> */}
          </div>
        <div className="relative w-full rounded-[32px] overflow-hidden border border-zinc-800 bg-zinc-950 aspect-[21/9] group shadow-2xl">
          <div className="absolute inset-0 from-black via-transparent to-transparent z-10" />
          <video
            src={"/library_dummy.mp4"}
            autoPlay
            controls
            className="w-full h-full object-cover"
          />
          {/* <div className="absolute inset-0 flex items-center justify-center z-20">
            <Button size="icon" className="h-20 w-20 rounded-full bg-white text-black hover:scale-110 transition-transform">
              <Play fill="currentColor" size={32} />
            </Button>
          </div> */}

          {/* <div className="absolute bottom-10 left-10 z-20 space-y-2">
            <h2 className="text-3xl font-bold text-white tracking-tight">Software Demo</h2>
            <p className="text-sm text-zinc-400 max-w-lg">
              Comprehensive walkthrough of the internal operational interface and intelligence systems.
            </p>
          </div> */}

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

        <div className="flex gap-8 overflow-x-auto scrollbar-thin pb-4 w-full">
          {BUILDER_VIDEOS.map((video) => (
            <div key={video.id} className="group space-y-4 shrink-0 w-[320px]">
              <div className="relative aspect-video rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900 transition-all hover:border-zinc-600">
                {/* <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors z-10" />
                <div className="absolute inset-0 flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-all">
                  <Play fill="currentColor" size={24} className="text-white" />
                </div>
                <div className="w-full h-full bg-gradient-to-tr from-zinc-900 to-zinc-800" /> */}

                <video
                  src={video.video_url}
                  autoPlay
                  controls
                  className="w-full h-full object-cover"
                />
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
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}