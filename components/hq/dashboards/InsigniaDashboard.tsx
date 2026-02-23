"use client";

import React from "react";
import {
  ShieldCheck,
  Trophy,
  Medal,
  Flame,
  Waves,
  Wind,
  Mountain,
  Zap,
  ChevronRight,
  PlayCircle,
  Badge,
  Info
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { TableCell, TableRow } from "@/components/ui/table";
import InsigniaSpotlight from "./InsigniaSpotlight";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import GlobalLeaderboard from "./GlobalLeaderboard";

// --- Types ---
interface Badge {
  id: string;
  type: 'land' | 'air' | 'water' | 'spirit';
  name: string;
  date: string;
}

interface Participant {
  name: string;
  campsCompleted: number;
  marshalLevel: number;
  isGuardian: boolean;
  hasSoulOfSteel: boolean;
  recentBadges: Badge[];
  level: string;
}

// --- Dummy Data ---
const MOCK_PARTICIPANT: Participant = {
  name: "Roshan Sharma",
  campsCompleted: 14,
  marshalLevel: 3,
  isGuardian: false,
  hasSoulOfSteel: true,
  level: "Marshal 2",
  recentBadges: [
    { id: '1', type: 'land', name: 'Himalayan Endurance', date: 'Feb 2026' },
    { id: '2', type: 'air', name: 'High Altitude Jump', date: 'Jan 2026' },
    { id: '3', type: 'spirit', name: 'Inner Resilience', date: 'Dec 2025' },
    { id: '4', type: 'water', name: 'Deep Sea Survival', date: 'Nov 2025' },
  ]
};

const getRank = (count: number) => {
  if (count > 15) return "Legend";
  if (count >= 11) return "Master";
  if (count >= 6) return "Captain";
  return "Explorer";
};



export default function InsigniaDashboard() {
  const currentRank = getRank(MOCK_PARTICIPANT.campsCompleted);

  return (
    <div className="bg-zinc-950 text-zinc-100 p-8 min-h-screen">
      {/* 1. Top Navigation Bar */}
      <div className="flex items-center justify-between mb-12 border-b border-zinc-900 pb-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center">
            <UserIcon className="w-6 h-6 text-cyan-500" />
          </div>
          <div>
            <h2 className="text-xl font-bold">{MOCK_PARTICIPANT.name}</h2>
            <p className="text-xs text-zinc-500 font-semibold">{MOCK_PARTICIPANT.level}</p>
          </div>
        </div>
        <div className="flex gap-8">
          <div className="text-center">
            <p className="text-[10px] text-zinc-500 font-bold mb-1">Camps Completed</p>
            <p className="text-xl font-bold">{MOCK_PARTICIPANT.campsCompleted}</p>
          </div>
          <div className="text-center flex flex-col justify-center">
            <p className="text-sm text-zinc-500 font-bold mb-1 gap-1">
              {/* Next */}
              <Popover>
                <PopoverTrigger asChild>
                  <button className="hover:text-cyan-500 transition-colors">
                     {/* Details */}
                     <Info size={16} className="inline-block ml-1"/>
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-80 bg-zinc-950 border-zinc-800 p-5 shadow-2xl backdrop-blur-xl">
                  <div className="space-y-4">
                    <h4 className="font-bold text-white text-sm border-b border-zinc-800 pb-2">
                      Progression Codex
                    </h4>

                    {/* Main Tiers */}
                    <div className="space-y-3">
                      <p className="text-[10px] font-bold text-zinc-500  tracking-widest">Standard Ranks</p>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="flex justify-between p-2 bg-zinc-900/50 rounded-sm">
                          <span className="text-zinc-400">Explorer</span>
                          <span className="font-bold text-white">1-5</span>
                        </div>
                        <div className="flex justify-between p-2 bg-zinc-900/50 rounded-sm">
                          <span className="text-zinc-400">Captain</span>
                          <span className="font-bold text-white">6-10</span>
                        </div>
                        <div className="flex justify-between p-2 bg-zinc-900/50 rounded-sm">
                          <span className="text-zinc-400">Master</span>
                          <span className="font-bold text-white">11-15</span>
                        </div>
                        <div className="flex justify-between p-2 bg-zinc-900/50 rounded-sm">
                          <span className="text-zinc-400 text-amber-500">Legend</span>
                          <span className="font-bold text-amber-500">15+</span>
                        </div>
                      </div>
                    </div>

                    {/* Special Titles */}
                    <div className="space-y-2 pt-2 border-t border-zinc-900">
                      <p className="text-[10px] font-bold text-zinc-500  tracking-widest">Elite Titles</p>
                      <div className="space-y-2">
                        <div className="flex flex-col">
                          <span className="text-xs font-bold text-cyan-400">Marshal</span>
                          <span className="text-[10px] text-zinc-500 leading-tight">Complete Land, Air, Water, and Spirit in one cycle.</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-xs font-bold text-purple-400">Guardian</span>
                          <span className="text-[10px] text-zinc-500 leading-tight">Achieved after completing five Marshal levels.</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </p>
          </div>
        </div>
      </div>

      {/* 2. Discipline Path Selection */}
      <div className="mb-12">
        {/* <h3 className="text-sm font-bold text-zinc-500 mb-6 flex items-center gap-2">
          Your Next Badge: Guardian
        </h3> */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { label: 'Spirit Roads', icon: <Flame size={20} />, color: 'text-purple-400', bg: 'bg-purple-400/10' },
            { label: 'Land', icon: <Mountain size={20} />, color: 'text-orange-500', bg: 'bg-orange-500/10' },
            { label: 'Air', icon: <Wind size={20} />, color: 'text-blue-400', bg: 'bg-blue-400/10' },
            { label: 'Water', icon: <Waves size={20} />, color: 'text-cyan-400', bg: 'bg-cyan-400/10' },
          ].map((path) => (
            <div key={path.label} className="bg-zinc-900/40 border border-zinc-800 p-6 rounded-sm hover:border-zinc-700 transition-all cursor-pointer group">
              <div className={`${path.bg} ${path.color} w-10 h-10 flex items-center justify-center rounded-sm mb-4`}>
                {path.icon}
              </div>
              <h4 className="font-bold mb-2">{path.label}</h4>
              <div className="flex gap-1 mb-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className={`w-2 h-2 rounded-full ${i <= 3 ? 'bg-cyan-500' : 'bg-zinc-800'}`} />
                ))}
              </div>
              {/* <p className="text-[10px] text-zinc-500 font-medium leading-relaxed">
                Progress to the next tier by completing specialized environmental camps.
              </p> */}
            </div>
          ))}
        </div>
      </div>

      {/* 3. Cross-Camp Journey & Soul of Steel */}
      <InsigniaSpotlight />

      {/* 4. Leaderboards & Global Achievements */}
      <GlobalLeaderboard />
      
      {/* <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
        <div className="lg:col-span-2 bg-zinc-900/40 border border-zinc-800 p-6 rounded-sm">
          <h3 className="text-sm font-bold text-zinc-500 mb-6">Global Leaderboard</h3>
          <table className="w-full text-left">
            <thead>
              <tr className="text-xs text-zinc-600 font-bold border-b border-zinc-800">
                <th className="pb-3">Rank</th>
                <th className="pb-3">Name</th>
                <th className="pb-3">Badges</th>
                <th className="pb-3 text-right">Level</th>
              </tr>
            </thead>
            <tbody className="text-xs">
              {[
                { name: 'Marcus Thorne', level: 'Soul Of Steel', icons: [<Mountain key="1" size={12} />, <Wind key="2" size={12} />] },
                { name: 'Sarah Chen', level: 'Guardian', icons: [<Waves key="3" size={12} />, <Flame key="4" size={12} />] },
                { name: 'Alex Rivera', level: 'Marshall', icons: [<Zap key="5" size={12} />] },
                { name: 'Emily Patel', level: 'Spirit Roads', icons: [<Mountain key="6" size={12} />, <Waves key="7" size={12} />] },
                { name: 'Jack Lee', level: 'Land', icons: [<Flame key="8" size={12} />, <Wind key="9" size={12} />] },
                // { name: 'Maya Singh', level: 'Air', icons: [<Zap key="10" size={12}/>, <Mountain key="11" size={12}/>] },
              ].map((op, i) => (
                <tr key={op.name} className="border-b border-zinc-900 last:border-0">
                  <td className="py-4 font-bold">{i + 1}</td>
                  <td className="py-4 font-bold">{op.name}</td>
                  <td className="py-4 flex gap-2 text-zinc-500">{op.icons}</td>
                  <td className="py-4 text-right font-bold text-cyan-500">{op.level}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div> */}
    </div>
  );
}

function UserIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  );
}

// --- UI COMPONENTS ---

function BadgeCategoryCard({ icon: Icon, label, count, color }: any) {
  return (
    <Card className="bg-zinc-900 border-zinc-700 p-6 flex flex-col items-center text-center hover:bg-zinc-800 transition-all group">
      <div className={`p-3 rounded-full bg-zinc-950 border border-zinc-800 mb-4 group-hover:scale-110 transition-transform ${color}`}>
        <Icon size={24} />
      </div>
      <p className="text-sm font-black text-zinc-500">{label}</p>
      <h3 className="text-2xl font-black mt-1 text-white">{count}</h3>
    </Card>
  );
}

function JoinerRow({ name, level, status, progress, badges }: any) {
  return (
    <TableRow className="border-zinc-800 hover:bg-zinc-800/20">
      <TableCell className="font-bold text-white">{name}</TableCell>
      <TableCell className="text-zinc-400 font-medium ">{level}</TableCell>
      <TableCell>
        <Badge className={status === "Full-Time" ? "bg-cyan-500/10 text-cyan-500" : "bg-zinc-500/10 text-zinc-500"}>
          {status}
        </Badge>
      </TableCell>
      {/* <TableCell className="w-48">
        <div className="flex items-center gap-3">
          <div className="flex-1 h-1 bg-zinc-800 rounded-full overflow-hidden">
            <div className="h-full bg-cyan-500" style={{ width: `${progress}%` }} />
          </div>
          <span className="text-[10px] font-bold text-zinc-500">{progress}%</span>
        </div>
      </TableCell> */}
      <TableCell className="text-right font-black text-white">{badges}</TableCell>
    </TableRow>
  );
}

export const HDTooltip = ({ active, payload, label, currencyCols }: any) => {
  console.log(currencyCols)
  console.log(payload)
  if (active && payload && payload.length) {
    const displayLabel = label || payload[0].name;

    return (
      <div className="bg-zinc-950/95 border border-zinc-700 p-4 shadow-[0_0_40px_rgba(0,0,0,0.7)] rounded-sm backdrop-blur-xl ring-1 ring-white/10 min-w-[200px] animate-in fade-in zoom-in-95 duration-200">

        {/* Tooltip Header */}
        <div className="flex items-center justify-between border-b border-zinc-800 pb-2 mb-3">
          {/* <p className="text-[10px] font-black text-zinc-500  tracking-[0.2em] ">
            Data Stream
          </p> */}
          <p className="text-xs font-black text-white  ">
            {displayLabel}
          </p>
        </div>

        {/* Data Points */}
        <div className="space-y-3">
          {payload.map((entry: any, index: number) => {
            // Logic to handle both normalized and raw keys
            // If data was normalized (starts with 'norm'), we look for the raw value in the payload
            const dataKey = entry.dataKey;
            const isNormalized = typeof dataKey === 'string' && dataKey.startsWith('norm');
            const rawKey = isNormalized ? dataKey.replace('norm', '').toLowerCase() : dataKey;

            // Fallback to value if mapping fails
            const displayValue = entry.payload[rawKey] ?? entry.value;

            return (
              <div key={index} className="flex items-center justify-between gap-8 group">
                <div className="flex items-center gap-2.5">
                  {/* Status Indicator */}
                  <div
                    className="w-1.5 h-1.5 rounded-full shadow-[0_0_8px_currentColor] transition-transform group-hover:scale-125"
                    style={{ color: entry.color, backgroundColor: entry.color }}
                  />
                  <span className="text-sm text-zinc-400">
                    {entry.name[0].to() + entry.name.slice(1)}
                  </span>
                </div>

                {/* Tactical Value Readout */}
                <span className="text-xs text-white  ">
                  {typeof displayValue === 'number'
                    ? (entry.name == "revenue" || currencyCols.includes(entry.dataKey)) ? displayValue.toLocaleString('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0 }) : displayValue.toLocaleString('en-IN')
                    : displayValue
                  }
                </span>
              </div>
            );
          })}
        </div>

        {/* Subtle Footer (Optional) */}
        {/* <div className="mt-4 pt-2 border-t border-zinc-900 flex justify-end">
          <div className="h-1 w-8 bg-zinc-800 rounded-full" />
        </div> */}
      </div>
    );
  }
  return null;
};