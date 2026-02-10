"use client";

import { ScrollArea } from "@/components/ui/scroll-area"; // Assuming shadcn/ui
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Clock, Newspaper } from "lucide-react";

const STORIES = [
  {
    id: 1,
    category: "Collaboration",
    title: "Major Jacob's Story - Joe Rogan",
    excerpt: "How a career in the shadows led to the creation of a global mental resilience platform.",
    videoUrl: "https://www.youtube.com/embed/Q2UIwPyx9_0?autoplay=1&mute=1&controls=0&loop=1&playlist=Q2UIwPyx9_0",
    type: "Founder",
    date: "1h ago"
  },
  {
    id: 2,
    category: "C.L.A.W.",
    title: "What is C.L.A.W.",
    excerpt: "Born from elite special forces training, C.L.A.W. is redefining tactical psychological endurance...",
    videoUrl: "https://www.youtube.com/embed/IOErA5UpyhY?autoplay=1&mute=1&controls=0&loop=1&playlist=IOErA5UpyhY",
    type: "Company",
    date: "2m ago"
  },
  {
    id: 3,
    brand: "News",
    title: "Aviator Tactical: Sight Beyond Vision",
    excerpt: "Official eyewear for the Maritime Stealth mission. Polarized for high-glare naval operations.",
    videoUrl: "https://www.youtube.com/embed/LDsI6l5GCVo?autoplay=1&mute=1&controls=0&loop=1&playlist=LDsI6l5GCVo",
    type: "Promotion",
    brandColor: "border-red-600"
  },
  {
    id: 4,
    brand: "Royal Enfield",
    title: "Master of G: The Mudmaster Protocol",
    excerpt: "The only timepiece capable of withstanding the vibration of a KTM extraction.",
    videoUrl: "https://www.youtube.com/embed/Q2UIwPyx9_0?autoplay=1&mute=1&controls=0&loop=1&playlist=Q2UIwPyx9_0",
    type: "Promotion",
    brandColor: "border-orange-500"
  },
  {
    id: 5,
    brand: "News",
    title: "Global Resilience Framework 2026",
    excerpt: "Partnering with C.L.A.W. to set new standards for civilian psychological first aid.",
    videoUrl: "https://www.youtube.com/embed/IOErA5UpyhY?autoplay=1&mute=1&controls=0&loop=1&playlist=IOErA5UpyhY",
    type: "Collaboration",
    brandColor: "border-blue-500"
  },
  {
    id: 6,
    brand: "HP Computers",
    title: "The Founding Team",
    excerpt: "Testing the limits of ergonomic hardware in high-stress simulation environments.",
    videoUrl: "https://www.youtube.com/embed/LDsI6l5GCVo?autoplay=1&mute=1&controls=0&loop=1&playlist=LDsI6l5GCVo",
    type: "Promotion",
    brandColor: "border-zinc-100"
  },
  {
    id: 7,
    brand: "Nescafe",
    title: "Black Ops Brew: Stay Sharp",
    excerpt: "The fuel behind the 3:00 AM planning sessions. Pure caffeine, zero compromise.",
    videoUrl: "https://www.youtube.com/embed/Q2UIwPyx9_0?autoplay=1&mute=1&controls=0&loop=1&playlist=Q2UIwPyx9_0",
    type: "Promotion",
    brandColor: "border-yellow-900"
  }
];

export default function Stories() {
  return (
    <aside className="h-full w-full bg-zinc-950 border-l border-white/10 flex flex-col">
      {/* Header */}
      {/* <div className="p-6 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 bg-red-600 animate-pulse rounded-full" />
          <h2 className="text-sm font-black tracking-[0.1em] text-white">
            Stories
          </h2>
        </div>
      </div> */}

      {/* Stories Feed */}
      <ScrollArea className="flex-1 mt-2">
        <div className="p-4 space-y-6">
          {STORIES.map((story) => (
            <div 
              key={story.id} 
              className={`group relative overflow-hidden transition-all border-l-2 pl-4 ${story.brandColor || 'border-zinc-800'} hover:border-white hover:cursor-pointer`}
            >
              {/* Image Preview (Small/Compact) */}
                            <div className="relative aspect-video w-full mb-3 overflow-hidden rounded-xl bg-zinc-900 border border-white/5">
                              {story.videoUrl ? (
                                <iframe
                                  src={story.videoUrl}
                                  title={story.title}
                                  className="h-full w-full opacity-80 group-hover:opacity-100 transition-opacity"
                                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                  allowFullScreen
                                />
                              ) : (
                                <img
                                  src={story.image}
                                  alt={story.title}
                                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                              )}
                              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
                              <Badge className="absolute bottom-2 left-2 text-[8px] bg-black/80 text-white border-none rounded-none tracking-widest font-bold">
                                {story.type}
                              </Badge>
                            </div>
              {/* Text Content */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-green-500 uppercase tracking-widest">
                    {story.brand || story.category}
                  </span>
                  {/* {story.date && (
                    <div className="flex items-center gap-1 text-[10px] text-white">
                      <Clock className="h-2 w-2" />
                      {story.date}
                    </div>
                  )} */}
                </div>
                
                <h3 className="text-sm font-bold text-white leading-snug group-hover:text-zinc-300 transition-colors">
                  {story.title}
                </h3>
                
                {/* <p className="text-xs text-white/80 line-clamp-2 leading-relaxed">
                  {story.excerpt}
                </p> */}

                <div className="pt-2 flex items-center gap-1 text-[10px] font-black text-white/40 uppercase tracking-tighter cursor-pointer group-hover:text-white transition-colors">
                  Read Brief <ExternalLink className="h-3 w-3" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

    </aside>
  );
}