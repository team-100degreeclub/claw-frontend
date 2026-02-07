"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

interface HostCardProps {
  name: string;
  role: string;
  img: string;
  bio: string;
  specialization?: string[];
}

export function HostCard({ name, role, img, bio, specialization }: HostCardProps) {
  return (
    <div className="group relative flex flex-col bg-zinc-950 border border-zinc-900 overflow-hidden rounded-xl transition-all duration-500 hover:shadow-[0_0_30px_rgba(220,38,38,0.1)] h-130 w-80">
      {/* 1. Image Container with Grayscale Effect */}
      <div className="relative aspect-[4/5] overflow-hidden">
        <Image
          src={img}
          alt={name}
          fill
          className="object-cover object-top transition-all duration-700 ease-in-out group-hover:scale-110"
        />
        {/* Tactical Overlay */}
        {/* <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-80" /> */}
        
        {/* Role Badge */}
        {/* <div className="absolute top-4 left-4">
          <span className="bg-black/60 backdrop-blur-md border border-zinc-800 px-3 py-1 text-[9px] font-black tracking-widest text-zinc-300">
            {role}
          </span>
        </div> */}
      </div>

      {/* 2. Content Section */}
      <div className="p-6 space-y-3 relative z-10 -mt-10 bg-zinc-950">
        <h4 className="text-2xl font-black tracking-tighter text-white transition-colors">
          {name}
        </h4>
        
        {/* Specialization Tags */}
        <div className="flex flex-wrap gap-2">
          {
            <span key={specialization && specialization[0]} className="text-sm font-bold">
              {specialization && specialization[0]}
            </span>
          }
        </div>
        <div className="flex flex-wrap gap-2">
          {specialization && specialization[1]}
        </div>

        <p className="text-sm text-zinc-400 leading-relaxed font-medium line-clamp-3">
          {bio}
        </p>

        {/* View Profile Link */}
        {/* <button className="pt-4 text-[10px] font-black tracking-[0.3em] text-zinc-500 hover:text-white transition-colors flex items-center gap-2">
          View Dossier <span className="h-[1px] w-4 bg-zinc-800 group-hover:w-8 group-hover:bg-red-600 transition-all" />
        </button> */}
      </div>
    </div>
  );
}