"use client";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const COLLABORATIONS = [
  {
    brand: "Red Bull",
    tag: "Endurance Partner",
    title: "Conquer Your \n Inner Terrain",
    description: "",
    image: "https://images.unsplash.com/photo-1574493202181-17762b908dc6?q=80&w=2670&auto=format&fit=crop",
    brandColor: "bg-[#ed1c24]",
    missionType: "HIMALAYAN WINTER SURVIVAL",
    gear: "Red Bull"
  },
  {
    brand: "KTM",
    tag: "Mobility Partner",
    title: "The Desert \n Extraction",
    description: "Master high-speed extraction and off-road navigation with the KTM 890 Adventure R across unforgiving terrain.",
    image: "https://images.unsplash.com/photo-1677672939515-0f94f335304c?q=80&w=2670&auto=format&fit=crop",
    brandColor: "bg-[#ff6600]",
    missionType: "LAND EXTRACTION PROTOCOL",
    gear: "KTM"
  },
  {
    brand: "GoPro",
    tag: "Visual Partner",
    title: "Deep Sea \n Stealth",
    description: "Tactical breath-hold and maritime navigation. Documented exclusively on the HERO12 Black for forensic mission review.",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=2000",
    brandColor: "bg-[#00aee1]",
    missionType: "MARITIME STEALTH MISSION",
    gear: "GoPro"
  },
  {
    brand: "Nike",
    tag: "Apparel Partner",
    title: "The HALO \n Prototype",
    description: "Master high-altitude physiological training. Testing next-gen ACG thermal utility gear in sub-zero freefall conditions.",
    image: "https://images.unsplash.com/photo-1721131981992-a5ce8ca75511?auto=format&fit=crop&q=80&w=2000",
    brandColor: "bg-white",
    missionType: "AIRBORNE INSERTION CAMP",
    gear: "Nike"
  },
  {
    brand: "HRX",
    tag: "Apparel Partner",
    title: "The HALO \n Prototype",
    description: "Master high-altitude physiological training. Testing next-gen ACG thermal utility gear in sub-zero freefall conditions.",
    image: "https://images.unsplash.com/photo-1721131981992-a5ce8ca75511?auto=format&fit=crop&q=80&w=2000",
    brandColor: "bg-white",
    missionType: "AIRBORNE INSERTION CAMP",
    gear: "HRX"
  },
];

export default function HeroDiscovery() {
  const plugin = React.useRef(
    Autoplay({ delay: 3500 })
  );

  return (
    <div className="relative w-full p-4 md:p-8 bg-zinc-950">
      <Carousel
        plugins={[plugin.current]}
        className="w-full"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent>
          {COLLABORATIONS.map((collab, index) => (
            <CarouselItem key={index}>
              <div className="relative h-[650px] w-full overflow-hidden rounded-3xl bg-zinc-900 border border-white/5">
                {/* Background Image */}
                <img
                  src={collab.image}
                  alt={collab.brand}
                  className="h-full w-full object-cover scale-105 transition-transform duration-[10000ms] hover:scale-110"
                />
                
                {/* Visual Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                {/* <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent" /> */}

                {/* Content Container */}
                <div className="absolute inset-0 p-12 flex flex-col justify-end md:justify-end">
                  
                  {/* Brand & Mission Lockup */}
                  <div className="mb-6 flex flex-wrap items-center gap-4">
                    <span className="bg-white px-3 py-1 text-xl font-black text-black uppercase tracking-tighter">
                      {collab.brand}
                    </span>
                    {/* <span className="text-zinc-500 text-[10px] font-bold tracking-[0.3em] uppercase">
                      × {collab.missionType}
                    </span> */}
                  </div>

                  <h2 className="max-w-3xl whitespace-pre-line text-6xl md:text-8xl font-black italic leading-[0.85] text-white tracking-tighter uppercase mb-6">
                    {collab.title}
                  </h2>

                  {/* <p className="max-w-lg text-lg text-zinc-400 font-medium leading-relaxed">
                    {collab.description}
                  </p> */}

                  {/* Collaboration Metadata */}
                  <div className="mt-10 flex flex-col md:flex-row items-start md:items-center gap-8 border-t border-white/10 pt-8">
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-white mb-1">Collaboration</p>
                      <p className="text-lg font-bold text-green-500">{collab.gear}</p>
                    </div>
                    {/* <div className={`h-10 w-[2px] hidden md:block ${collab.brandColor}`} /> */}
                    <div>
                      {/* <p className="text-[10px] uppercase tracking-widest text-zinc-500 mb-1">Role</p> */}
                      {/* <p className="text-sm font-bold text-white uppercase">{collab.tag}</p> */}
                    </div>
                    {/* <button className="md:ml-auto px-8 py-3 bg-white text-black text-xs font-black uppercase tracking-widest hover:invert transition-all">
                      View Mission Details
                    </button> */}
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Tactical Navigation */}
        <div className="absolute bottom-12 right-12 hidden md:flex items-center gap-2">
          <CarouselPrevious className="static h-14 w-14 translate-y-0 border-zinc-800 bg-black/50 text-white rounded-none hover:bg-white hover:text-white transition-all" />
          <CarouselNext className="static h-14 w-14 translate-y-0 border-zinc-800 bg-black/50 text-white rounded-none hover:bg-white hover:text-white transition-all" />
        </div>
      </Carousel>
    </div>
  );
}