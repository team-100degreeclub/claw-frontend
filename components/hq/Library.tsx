"use client";

import React from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Play, Clock, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";

// Mock Data for Library Content
const VIDEO_SECTIONS = [
  {
    category: "Operational Initiatives",
    videos: [
      { id: "1", title: "Project Soul of Steel: Phase 1", duration: "12:45", thumbnail: "/vid-1.jpg", tag: "Mission" },
      { id: "2", title: "Himalayan High-Altitude Survival", duration: "08:20", thumbnail: "/vid-2.jpg", tag: "Training" },
      { id: "3", title: "Urban Resilience Protocols", duration: "15:10", thumbnail: "/vid-3.jpg", tag: "Initiative" },
      { id: "4", title: "Maritime Ops Overview", duration: "05:30", thumbnail: "/vid-4.jpg", tag: "Briefing" },
    ]
  },
  {
    category: "Corporate & Vision",
    videos: [
      { id: "5", title: "C.L.A.W. Legacy: Why We Build", duration: "04:15", thumbnail: "/vid-5.jpg", tag: "Vision" },
      { id: "6", title: "Stakeholder Intelligence 2026", duration: "22:00", thumbnail: "/vid-6.jpg", tag: "Corporate" },
      { id: "7", title: "The Special Forces Philosophy", duration: "06:45", thumbnail: "/vid-7.jpg", tag: "Philosophy" },
    ]
  }
];

export default function Library() {
  return (
    <div className="space-y-12 pb-20 animate-in fade-in duration-500">
      
      {/* Header Section */}
      <div className="border-b border-zinc-800 pb-8">
        <h2 className="text-4xl font-black text-white">
          Library
        </h2>
        <p className="text-sm text-zinc-500 font-bold mt-2">
          Documenting the Mission, the People, and the Vision
        </p>
      </div>

      {/* Video Sections */}
      {VIDEO_SECTIONS.map((section) => (
        <div key={section.category} className="space-y-6">
          <div className="flex items-center gap-4 px-2">
            <div className="h-4 w-1 bg-cyan-500" />
            <h3 className="text-sm font-black text-white ">
              {section.category}
            </h3>
          </div>

          <ScrollArea className="w-full whitespace-nowrap rounded-none border-none">
            <div className="flex w-max space-x-6 p-2">
              {section.videos.map((video) => (
                <VideoCard key={video.id} video={video} />
              ))}
            </div>
            <ScrollBar orientation="horizontal" className="bg-zinc-900" />
          </ScrollArea>
        </div>
      ))}

    </div>
  );
}

function VideoCard({ video }: { video: any }) {
  return (
    <div className="group relative w-[380px] space-y-4">
      {/* Thumbnail Container */}
      <div className="relative aspect-video overflow-hidden border border-zinc-800 bg-zinc-900 transition-all hover:border-cyan-500/50">
        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors z-10" />
        
        {/* Play Icon Overlay */}
        <div className="absolute inset-0 flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-all transform scale-90 group-hover:scale-100">
          <div className="h-14 w-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white">
            <Play fill="currentColor" size={24} />
          </div>
        </div>

        {/* Top Badges */}
        {/* <div className="absolute top-3 left-3 z-30">
          <Badge className="bg-white text-[9px] font-black border-zinc-700 rounded-none backdrop-blur-md">
            {video.tag}
          </Badge>
        </div> */}

        {/* Duration Badge */}
        {/* <div className="absolute bottom-3 right-3 z-30 bg-zinc-950/90 px-2 py-1 rounded-sm border border-zinc-800 flex items-center gap-1.5 backdrop-blur-md">
          <Clock size={10} className="text-zinc-500" />
          <span className="text-[10px] font-bold text-white font-mono">{video.duration}</span>
        </div> */}

        {/* Placeholder Thumbnail - In production replace with <Image /> */}
        <div className="w-full h-full bg-gradient-to-br from-zinc-800 to-zinc-950 flex items-center justify-center">
           <span className="text-zinc-800 font-black text-4xl  opacity-50 ">
             C.L.A.W
           </span>
        </div>
      </div>

      {/* Metadata */}
      <div className="px-1 flex justify-between items-start gap-4">
        <div className="space-y-1">
          <h4 className="text-sm font-bold text-zinc-100 group-hover:text-cyan-400 transition-colors truncate">
            {video.title}
          </h4>
          <p className="text-[10px]  font-black text-zinc-600">
            Internal Mission Briefing
          </p>
        </div>
        {/* <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-500 hover:text-white hover:bg-zinc-800">
          <Share2 size={14} />
        </Button> */}
      </div>
    </div>
  );
}