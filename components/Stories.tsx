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
    image: "/jacob_joe_rogan.jpeg",
    type: "Founder",
    date: "1h ago"
  },
  {
    id: 2,
    category: "C.L.A.W.",
    title: "What is C.L.A.W.",
    excerpt: "Born from elite special forces training, C.L.A.W. is redefining tactical psychological endurance...",
    image: "/op_blue_freedom.jpeg",
    type: "Company",
    date: "2m ago"
  },
  {
    id: 3,
    brand: "News",
    title: "Aviator Tactical: Sight Beyond Vision",
    excerpt: "Official eyewear for the Maritime Stealth mission. Polarized for high-glare naval operations.",
    image: "/pm_congratulates_claw.jpeg",
    type: "Promotion",
    brandColor: "border-red-600"
  },
  {
    id: 4,
    brand: "Royal Enfield",
    title: "Master of G: The Mudmaster Protocol",
    excerpt: "The only timepiece capable of withstanding the vibration of a KTM extraction.",
    image: "/re_claw_conversation.jpeg",
    type: "Promotion",
    brandColor: "border-orange-500"
  },
  {
    id: 5,
    brand: "News",
    title: "Global Resilience Framework 2026",
    excerpt: "Partnering with C.L.A.W. to set new standards for civilian psychological first aid.",
    image: "/republic_day_special.jpeg",
    type: "Collaboration",
    brandColor: "border-blue-500"
  },
  {
    id: 6,
    brand: "HP Computers",
    title: "The Founding Team",
    excerpt: "Testing the limits of ergonomic hardware in high-stress simulation environments.",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1000&auto=format&fit=crop",
    type: "Promotion",
    brandColor: "border-zinc-100"
  },
  {
    id: 7,
    brand: "Nescafe",
    title: "Black Ops Brew: Stay Sharp",
    excerpt: "The fuel behind the 3:00 AM planning sessions. Pure caffeine, zero compromise.",
    image: "/major_jacob_drinking_coffee.jpg",
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
              className={`group relative overflow-hidden transition-all border-l-2 pl-4 ${story.brandColor || 'border-zinc-800'} hover:border-white`}
            >
              {/* Image Preview (Small/Compact) */}
              <div className="relative h-64 w-full mb-3 overflow-hidden rounded-sm transition-all">
                <img 
                  src={story.image} 
                  alt={story.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
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