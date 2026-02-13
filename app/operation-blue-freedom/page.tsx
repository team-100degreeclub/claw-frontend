"use client";

import React from "react";
import { Shield, Target, Globe, Users, Trophy, ExternalLink, PlayCircle, MountainSnow, Waves, Plane, Wind } from "lucide-react";
import { HostCard } from "@/components/camps/HostCard";

const TEAM_MEMBERS = [
  {
    name: "Major Vivek Jacob",
    role: "Founder, C.L.A.W. Global",
    img: "/vivek_jacob.jpg",
    bio: "A former Special Forces officer with 14 years of service. After a parachute accident, he dedicated his life to helping people with disabilities find freedom through adventure.",
    specialization: ["Mission Lead", "Survival Expert"]
  },
  {
    name: "Gaurav Bali",
    role: "Special Forces Veteran",
    img: "/gaurav_bali.jpg",
    bio: "An expert in high-altitude operations and tactical training. He helps lead the team's mountaineering and land-based world record attempts.",
    specialization: ["Mountain Expert", "Trainer"]
  },
  // Add more members as needed
];

export default function OperationBlueFreedomPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* 1. Header Section */}
      <div className="relative h-[60vh] flex items-end p-10 lg:p-20 overflow-hidden">
        <iframe
          src="https://www.youtube.com/embed/yN3g8CdRgss?autoplay=1&mute=1&loop=1&playlist=yN3g8CdRgss&controls=0&modestbranding=1&showinfo=0"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 h-full w-full opacity-60 pointer-events-none"
        ></iframe>
        {/* <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" /> */}
        
        <div className="relative z-10 max-w-4xl space-y-4">
          <div className="flex items-center gap-3">
            <span className="bg-blue-600 px-3 py-1 text-[10px] font-black uppercase tracking-[0.3em]">Global Initiative</span>
            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-1">
              <Trophy className="w-3 h-3 text-blue-600" /> World Record Mission
            </span>
          </div>
          <h1 className="text-6xl lg:text-8xl font-black uppercase  tracking-tighter leading-none">
            Operation <br /> <span className="text-blue-600">Blue</span>&nbsp;&nbsp;Freedom
          </h1>
        </div>
      </div>

      {/* 2. Main Two-Column Content */}
      <main className="container mx-auto grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-16 py-20 px-6">
        
        {/* Left Column: The Team */}
        <aside className="space-y-10">
          <div className="sticky top-28 space-y-8">
            <div className="space-y-2">
              <h2 className="text-2xl font-black uppercase tracking-tight">The Veterans</h2>
              <p className="text-zinc-500 text-sm">The former Special Forces team leading this journey.</p>
            </div>
            
            <div className="space-y-6">
              {TEAM_MEMBERS.map((member) => (
                <HostCard key={member.name} {...member} />
              ))}
            </div>
          </div>
        </aside>

        {/* Right Column: Operation Details */}
        <section className="space-y-20">
          {/* About Section */}
          <div className="space-y-8">
            <div className="flex items-center gap-4 text-blue-600">
              <Shield className="w-8 h-8" />
              <div className="h-[1px] flex-1 bg-zinc-800" />
            </div>
            <div className="space-y-6 max-w-2xl">
              <h3 className="text-4xl font-black uppercase  tracking-tighter">Changing Minds, Not Just Bodies</h3>
              <p className="text-zinc-400 text-lg leading-relaxed">
                Launched in 2019, Operation Blue Freedom is a global movement started by Special Forces veterans. The goal is simple: to show the world that people with disabilities are defined by their ability, not their limitations.
              </p>
              <p className="text-zinc-500 text-sm leading-relaxed">
                By using adventure sports like scuba diving, skydiving, and mountaineering, the team helps individuals rediscover their inner strength and dignity.
              </p>
            </div>
          </div>

          {/* The Triple Records Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <RecordCard 
              icon={<MountainSnow className="w-6 h-6" />}
              title="Land"
              detail="Siachen Glacier"
              desc="The world's largest team of people with disabilities scaling the world's highest battlefield."
            />
            <RecordCard 
              icon={<Waves className="w-6 h-6" />}
              title="Water"
              detail="Ocean Floor"
              desc="Setting a global benchmark for rehabilitative scuba diving and underwater skill training."
            />
            <RecordCard 
              icon={<Plane className="w-6 h-6" />}
              title="Air"
              detail="Skydiving"
              desc="Training individuals to master high-altitude freefall and reclaim the sky."
            />
          </div>

          {/* Video Section */}
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-8 lg:p-12">
             <div className="flex flex-col lg:flex-row gap-10 items-center">
                <div className="flex-1 space-y-6">
                  <h4 className="text-2xl font-black uppercase  tracking-tight">Watch The Success</h4>
                  <p className="text-zinc-400 text-sm">See how Major Jacob and his team made history with Operation Blue Freedom.</p>
                  <a 
                    href="https://www.redbull.com/in-en/conquer-land-air-water-operation-blue-freedom" 
                    target="_blank" 
                    className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-white hover:text-blue-600 transition-colors"
                  >
                    View on Red Bull <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                <div className="relative group cursor-pointer overflow-hidden rounded-xl border border-zinc-800 shadow-2xl w-full lg:w-[560px] aspect-video">
                   <iframe
                     src="https://www.youtube.com/embed/DN8qr6l8sxw" // Placeholder YouTube video
                     frameBorder="0"
                     allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                     allowFullScreen
                     className="absolute inset-0 w-full h-full"
                   ></iframe>
                </div>
             </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function RecordCard({ icon, title, detail, desc }: any) {
  return (
    <div className="p-8 bg-zinc-900/30 border border-zinc-900 rounded-xl space-y-4 hover:border-blue-600/50 transition-all group">
      <div className="text-blue-600">{icon}</div>
      <div>
        <h4 className="text-xs font-black uppercase tracking-[0.3em] text-zinc-500 group-hover:text-white transition-colors">{title}</h4>
        <p className="text-lg font-bold uppercase  tracking-tight text-white">{detail}</p>
      </div>
      <p className="text-xs text-zinc-500 leading-relaxed font-medium">{desc}</p>
    </div>
  );
}