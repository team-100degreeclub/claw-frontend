"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useRouter, useParams } from "next/navigation";
import { cn } from "@/lib/utils";

// Mock Host Data
export const HOST_DATA = [
  { id: "arjun-mehta", name: "Major Arjun Mehta", rank: "Major", location: "Ladakh", nationality: "Indian", status: "Available", phone: "1234567890", joined: new Date("2020-01-01") },
  { id: "karan-singh", name: "Capt. Karan Singh", rank: "Captain", location: "Andaman", nationality: "Indian", status: "Busy", phone: "9876543210", joined: new Date("2020-06-01") },
  { id: "sarah-jenkins", name: "Lt. Col. Sarah Jenkins", rank: "Lt. Colonel", location: "New York", nationality: "American", status: "Available", phone: "01234567890", joined: new Date("2020-09-01") },
];

export function TeamSidebar() {
  const [search, setSearch] = useState("");
  const router = useRouter();
  const params = useParams();
  const activeId = params.view; // In [category]/[view], 'view' will be the hostId

  const filteredHosts = HOST_DATA.filter(host => 
    host.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full bg-zinc-900/30 backdrop-blur-xl border-r border-zinc-800 w-64">
      <div className="p-4 border-b border-zinc-800">
        <Input 
          placeholder="Search..." 
          className="bg-zinc-950 border-zinc-800 text-xs h-9"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <ScrollArea className="flex-1 p-3">
        <div className="space-y-3">
          {filteredHosts.map((host) => (
            <button
              key={host.id}
              onClick={() => router.push(`/hq/dashboard/team/${host.id}`)}
              className={cn(
                "w-full text-left p-4 rounded-sm border transition-all space-y-2 group",
                activeId === host.id 
                  ? "bg-zinc-800 border-cyan-500/50" 
                  : "bg-zinc-950 border-zinc-800 hover:border-zinc-600"
              )}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-[10px] font-bold text-zinc-500">
                  {host.name.charAt(0)}
                </div>
                <div>
                  <p className="text-xs font-bold text-white group-hover:text-cyan-400">{host.name}</p>
                  {/* <p className="text-[9px]  font-black text-zinc-600 tracking-tighter">{host.rank}</p> */}
                </div>
              </div>
              <div className="pt-2 border-t border-zinc-900 space-y-1">
                <p className="text-[9px] text-zinc-500  font-bold">Location: <span className="text-zinc-300">{host.location}</span></p>
                <p className="text-[9px] text-zinc-500  font-bold">Status: <span className={host.status === 'Available' ? "text-emerald-500" : "text-amber-500"}>{host.status}</span></p>
              </div>
            </button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}