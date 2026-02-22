"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

// --- Types ---
interface Member {
  id: string;
  name: string;
  role: string;
  img: string;
}

// --- Data ---
const DATA = {
  "Ops Blue Freedom": {
    type: "text",
    title: "Operation Blue Freedom",
    subtitle: "A Global Movement for Human Ability",
    description: `Founded in 2019 by Major Vivek Jacob and a team of Special Forces veterans, Operation Blue Freedom is a social impact initiative dedicated to rehabilitating people with disabilities through adaptive adventure sports. 
    
    The mission seeks to shift the global perception from pity and charity to dignity and ability. By training individuals with diverse disabilities in elite survival and adventure skills, the team aims to prove that the human spirit is not limited by physical constraints.`,
    records: [
      { id: "01", category: "Land", feat: "Largest team of people with disabilities to scale Siachen Glacier (15,632 ft)." },
      { id: "02", category: "Water", feat: "World record for the largest collective of PwDs participating in open-sea scuba diving." },
      { id: "03", category: "Air", feat: "Training the first team of PwDs for high-altitude Accelerated Free Fall (Skydiving) world records." }
    ]
  },
  "Special Forces": [
    { id: "SF-01", name: "Major Vivek Jacob", role: "Founder & Mission Lead", img: "/vivek_jacob.jpg" },
    { id: "SF-02", name: "Gaurav Bali", role: "Combat Veteran & Mountain Expert", img: "/gaurav_bali.jpg" }
  ],
  "Core Team": [
    { id: "CT-01", name: "Anjali Sharma", role: "Operations Director", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1288&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  ],
  "Interns": [
    { id: "IN-01", name: "Rahul V.", role: "Fullstack Developer", img: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: "IN-02", name: "Mohit K.", role: "Social Media Manager", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: "IN-03", name: "Vishal M.", role: "Graphic Designer", img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: "IN-04", name: "Rohan S.", role: "Business Development Executive", img: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?q=80&w=1289&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  ]
};

export default function OperationBlueFreedomPage() {
  const [activeTab, setActiveTab] = useState<keyof typeof DATA>("Ops Blue Freedom");

  return (
    <div className="h-full w-full bg-black text-zinc-300 flex overflow-hidden selection:bg-blue-900">
      {/* Sidebar */}
      <nav className="w-72 border-r border-zinc-900 p-12 flex flex-col justify-center space-y-6">
        {Object.keys(DATA).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={`text-left font-bold transition-all ${activeTab === tab ? "text-white translate-x-2" : "text-zinc-600 hover:text-zinc-400"
              }`}
          >
            {tab}
          </button>
        ))}
      </nav>

      {/* Content Area */}
      <main className="flex-1 overflow-x-auto no-scrollbar">
        <div className="h-full flex items-center px-16 min-w-max">
          {activeTab === "Ops Blue Freedom" ? (
            <div className="flex gap-24 items-start max-w-5xl">
              {/* Mission Statement */}
              <div className=" space-y-8">
                <div>
                  {/* <h1 className="text-white text-5xl font-black leading-none mb-2">
                    {DATA["Ops Blue Freedom"].title}
                  </h1> */}
                  {/* <p className="text-blue-600 text-sm font-bold  ">
                    {DATA["Ops Blue Freedom"].subtitle}
                  </p> */}
                </div>
                <p className="text-lg leading-relaxed font-medium">
                  {DATA["Ops Blue Freedom"].description}
                </p>
              </div>

              {/* Records List */}
              {/* <div className="flex gap-12">
                {DATA["Ops Blue Freedom"].records.map((record) => (
                  <div key={record.id} className="w-64 border-l border-zinc-800 pl-8 py-2">
                    <span className="text-[10px] text-zinc-700 font-mono block mb-4">{record.id}</span>
                    <h3 className="text-white text-xs font-black   mb-3">{record.category}</h3>
                    <p className="text-zinc-500 text-[11px] leading-relaxed  tracking-tight">
                      {record.feat}
                    </p>
                  </div>
                ))}
              </div> */}
            </div>
          ) : (
            /* Team Members Grid */
            <div className="flex gap-8 px-4">
              {(DATA[activeTab] as Member[]).map((member) => (
                <Card
                  key={member.id}
                  className="w-[300px] bg-black border-zinc-900 rounded-xl overflow-hidden flex-shrink-0 py-0 bg-zinc-900/60"
                >
                  <CardHeader className="p-0">
                    <div className="aspect-[3/4] w-full overflow-hidden bg-zinc-950">
                      <img
                        src={member.img}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </CardHeader>
                  <CardContent className="pt-2 pb-4 px-2">
                    <CardTitle className="text-white text-sm font-bold">
                      {member.name}
                    </CardTitle>
                    <CardDescription className="text-zinc-500 text-xs font-semibold mt-1">
                      {member.role}
                    </CardDescription>
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