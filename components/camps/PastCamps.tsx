"use client";

import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { PlayCircle, Quote } from "lucide-react";
import { Separator } from "../ui/separator";

const PAST_CAMPS_DATA = [
  {
    id: "pc1",
    campName: "Trekking the Himalayas",
    videoUrl: "https://www.youtube.com/embed/Q2UIwPyx9_0?autoplay=1&mute=1&controls=0", // Replace with actual video IDs
    host: {
      name: "Col. Rajendra Singh",
      avatar: "https://i.pravatar.cc/150?u=ananya",
    },
    note: "It was an absolute joy watching everyone find their inner peace amidst the mountain peaks. Thank you for bringing such positive energy to this journey.",
  },
  {
    id: "pc2",
    campName: "Coastal Survival & Bonding",
    videoUrl: "https://www.youtube.com/embed/IOErA5UpyhY?autoplay=1&mute=1&controls=0",
    host: {
      name: "Capt. Rohan Mehra",
      avatar: "https://i.pravatar.cc/150?u=rohan",
    },
    note: "The way this group handled the coastal challenges was inspiring. You all proved that teamwork is the greatest tool we have. See you at the next one!",
  },
  {
    id: "pc3",
    campName: "50 is the new 20",
    videoUrl: "https://www.youtube.com/embed/LDsI6l5GCVo?autoplay=1&mute=1&controls=0",
    host: {
      name: "Lt. Sarah Jenkins",
      avatar: "https://i.pravatar.cc/150?u=sarah",
    },
    note: "The conversations we had around the campfire were the highlight of my year. Thank you for being so open and vulnerable.",
  }
];

export default function PastCamps() {
  return (
    <ScrollArea className="h-[calc(100vh-120px)] w-full">
      <div className="p-4 space-y-8">
        {PAST_CAMPS_DATA.map((camp) => (
          <div key={camp.id} className="group space-y-4">
            {/* 1. YouTube Video Container */}
            <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-zinc-900 border border-white/5">
              <iframe
                src={camp.videoUrl}
                title={camp.campName}
                className="h-full w-full opacity-80 group-hover:opacity-100 transition-opacity"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
              {/* <div className="absolute top-3 left-3">
                <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md px-2 py-1 rounded-md border border-white/10">
                    <PlayCircle className="h-3 w-3 text-zinc-400" />
                    <span className="text-[10px] font-bold text-zinc-300 tracking-wider">REPLAY</span>
                </div>
              </div> */}
            </div>

            {/* 2. Camp Details */}
            <div className="px-1 space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-white tracking-tight">
                  {camp.campName}
                </h3>
              </div>

              {/* 3. Host Info & Thank You Note */}
              <div className="bg-zinc-900/40 border border-zinc-800 p-4 rounded-2xl relative">
                {/* <Quote className="absolute top-4 right-4 h-8 w-8 text-zinc-800 -z-0" /> */}
                
                <div className="relative z-10">
                    <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                      {camp.note}
                    </p>

                    <div className="flex items-center gap-3 border-t border-zinc-800 pt-3">
                        <Avatar className="h-8 w-8 border border-zinc-700">
                            <AvatarImage src={camp.host.avatar} />
                            <AvatarFallback>{camp.host.name[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="text-[10px] text-zinc-500 font-medium">Hosted by</p>
                            <p className="text-xs font-bold text-zinc-200">{camp.host.name}</p>
                        </div>
                    </div>
                </div>
              </div>
            </div>
            {/* <Separator className="text-white bg-white w-full mt-2"/> */}
          </div>
        ))}
        
        {/* Simple Footer */}
        {/* <div className="py-10 text-center">
            <p className="text-xs text-zinc-600">You've reached the beginning of our history.</p>
        </div> */}
      </div>
    </ScrollArea>
  );
}