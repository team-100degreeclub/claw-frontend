"use client";

import React, { act, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Library from "@/components/hq/Library";

// --- Types ---
interface Member {
  id: string;
  name: string;
  role: string;
  img: string;
  sub1?: string;
}

// --- Data ---
const DATA = {
  "About CLAW": {
    type: "text",
    title: "About CLAW",
    subtitle: "A Global Movement for Human Ability",
    description: [
      "Hi there,",

      "CLAW, which stands for Conquer Land Air Water, was founded by Major Vivek Jacob, who served in 9 Para SF of the Indian Army Special Forces. CLAW is a team of Special Forces veterans who have seen destruction at its core and at its peak and have chosen to build a better world by building stronger individuals.",
      "CLAW is not a regular camp. It is a space for awakening. A space where you reconnect with the strength, clarity, and energy that already exists within you.",
      "Most people doubt themselves long before they are truly tested. At CLAW, through real experiences across land, air, water, and mind, you begin to understand what you are actually capable of. You learn how your mind responds to fear. You learn to steady your breath, focus your energy, and move forward with awareness. You start recognising the consciousness break the limits you placed on yourself and gradually move beyond them.",
      "The goal is simple. We want you to win, not because we think you can, but because you can. No questions.",
      "Come experience this journey. Discover your inner strength. Conquer from within and the world.",
      "- Team CLAW."
    ],
    records: [
      { id: "01", category: "Land", feat: "Largest team of people with disabilities to scale Siachen Glacier (15,632 ft)." },
      { id: "02", category: "Water", feat: "World record for the largest collective of PwDs participating in open-sea scuba diving." },
      { id: "03", category: "Air", feat: "Training the first team of PwDs for high-altitude Accelerated Free Fall (Skydiving) world records." }
    ]
  },
  "Special Forces": [
    { id: "SF-01", name: "Major Vivek Jacob", role: "Founder, CLAW", sub1: "Indian Para Special Forces 9", img: "/vivek_jacob.jpg" },
    { id: "SF-02", name: "Lt Col Gaurav Bali", role: "Lt. Infantry,", sub1: "Indian Army", img: "/gaurav_bali.jpg" }
  ],
  "Core Team": [
    { id: "CT-01", name: "Anjali Sharma", role: "Operations Director", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1288&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: "CT-02", name: "Aditya S.", role: "Content Writer", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1288&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: "CT-03", name: "Neha S.", role: "Digital Marketing Specialist", img: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: "CT-04", name: "Tushar K.", role: "Graphic Designer", img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: "CT-05", name: "Rajesh K.", role: "Fullstack Developer", img: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?q=80&w=1289&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  ],
  "Super Interns": [
    { id: "IN-01", name: "Rahul V.", role: "Fullstack Developer", img: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: "IN-02", name: "Mohit K.", role: "Social Media Manager", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: "IN-03", name: "Vishal M.", role: "Graphic Designer", img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: "IN-04", name: "Rohan S.", role: "Business Development Executive", img: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?q=80&w=1289&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  ],
  "Library": []
};

export default function OperationBlueFreedomPage() {
  const [activeTab, setActiveTab] = useState<keyof typeof DATA>("About CLAW");

  return (
    // We use h-screen to lock the overall viewport
    <div className="h-[calc(100vh-144px)] w-full bg-black text-zinc-300 flex overflow-hidden selection:bg-blue-900 font-sans">

      {/* Sidebar: Fixed and Non-Scrolling */}
      <nav className="w-72 border-r border-zinc-900 p-12 flex flex-col justify-center space-y-8 bg-zinc-950/50 flex-shrink-0">
        {/* <div className="mb-10">
          <h2 className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Navigation</h2>
        </div> */}
        <div className="flex flex-col space-y-6">
          {Object.keys(DATA).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`text-left text-base font-semibold transition-all duration-200 ${activeTab === tab
                  ? "text-white translate-x-2"
                  : "text-zinc-600 hover:text-zinc-400"
                }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </nav>

      {/* Content Area: Independent Scroll */}
      <main className="flex-1 overflow-y-auto bg-black relative no-scrollbar">
        <div className={`min-h-full w-full p-16 flex flex-col justify-center ${activeTab === "Library" ? "py-0" : ""}`}>

          {activeTab === "About CLAW" ? (
            <div className="max-w-4xl space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="space-y-8">
                {DATA["About CLAW"].description.map((paragraph, index) => (
                  <p
                    key={index}
                    className={`text-lg leading-relaxed text-zinc-300 font-medium ${index === 0 ? "text-white text-xl" : ""
                      } ${paragraph.startsWith("-") ? "text-zinc-500 mt-8" : ""}`}
                  >
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Optional: Re-introducing Records in a cleaner grid */}
              {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-10 border-t border-zinc-900">
                {DATA["About CLAW"].records.map((record) => (
                  <div key={record.id} className="space-y-3">
                    <span className="text-[10px] text-zinc-700 font-mono">{record.id}</span>
                    <h4 className="text-white text-sm font-bold">{record.category}</h4>
                    <p className="text-zinc-500 text-xs leading-relaxed">{record.feat}</p>
                  </div>
                ))}
              </div> */}
            </div>
          ) : activeTab === "Library" ? (
            <div className="w-full h-full animate-in fade-in duration-500">
              <Library />
            </div>
          ) : (
            /* Team Members Grid */
            <div className="flex gap-8 overflow-x-auto pb-4 scrollbar-thin animate-in fade-in duration-500">
              {(DATA[activeTab] as Member[]).map((member) => (
                <Card
                  key={member.id}
                  className="bg-zinc-900/40 border-zinc-800 rounded-[24px] overflow-hidden group hover:border-zinc-700 transition-all duration-300 shrink-0 w-64"
                >
                  <CardHeader className="p-0">
                    <div className="aspect-[4/5] w-full overflow-hidden bg-zinc-950">
                      <img
                        src={member.img}
                        alt={member.name}
                        className="w-full h-full object-cover transition-all duration-500 scale-105 group-hover:scale-100"
                      />
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <h3 className="text-white text-base font-bold">{member.name}</h3>
                    <p className="text-zinc-500 text-sm font-medium mt-1">{member.role}</p>
                    {member.sub1 && <p className="text-zinc-500 text-sm font-medium mt-1">{member.sub1}</p>}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}